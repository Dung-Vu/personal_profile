#!/usr/bin/env python3
"""Run layout overflow QA for the portfolio using Windows Chrome.

The script starts the Vite dev server, launches Windows Chrome headless with
remote debugging, checks each route at mobile/tablet/desktop viewport sizes,
and writes screenshots to artifacts/layout-qa/.
"""

from __future__ import annotations

import base64
import json
import os
import shutil
import socket
import struct
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHROME_CANDIDATES = [
    Path("C:/Program Files/Google/Chrome/Application/chrome.exe"),
    Path("C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"),
    Path("C:/Program Files/Microsoft/Edge/Application/msedge.exe"),
    Path("/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"),
    Path("/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"),
    Path("/mnt/c/Program Files/Microsoft/Edge/Application/msedge.exe"),
]
ROUTES = [
    "/",
    "/about",
    "/work",
    "/work/tca-crypto-analyzer",
    "/work/bonario-product-hub",
    "/work/ai-operator-workflow",
    "/stack",
    "/workflow",
    "/contact",
    "/lab",
]
VIEWPORTS = [
    (375, 812),
    (390, 844),
    (430, 932),
    (768, 1024),
    (1024, 768),
    (1366, 768),
    (1440, 900),
]
OUT_DIR = ROOT / "artifacts" / "layout-qa"
CDP_PORT = 9224
BASE_URL = "http://127.0.0.1:5173"


def find_chrome() -> Path:
    for path in CHROME_CANDIDATES:
        if path.exists():
            return path
    raise SystemExit("Windows Chrome/Edge not found in standard Windows or WSL install paths")


def wait_for_url(url: str, timeout: float = 20.0) -> None:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            urllib.request.urlopen(url, timeout=1).read(1)
            return
        except Exception:
            time.sleep(0.25)
    raise TimeoutError(f"Timed out waiting for {url}")


def http_json(method: str, path: str):
    req = urllib.request.Request(f"http://127.0.0.1:{CDP_PORT}{path}", method=method)
    with urllib.request.urlopen(req, timeout=10) as response:
        return json.loads(response.read())


def ws_connect(url: str) -> socket.socket:
    parsed = urllib.parse.urlparse(url)
    key = base64.b64encode(os.urandom(16)).decode()
    sock = socket.create_connection((parsed.hostname, parsed.port), timeout=10)
    sock.settimeout(None)
    path = parsed.path + (("?" + parsed.query) if parsed.query else "")
    request = (
        f"GET {path} HTTP/1.1\r\n"
        f"Host: {parsed.hostname}:{parsed.port}\r\n"
        "Upgrade: websocket\r\n"
        "Connection: Upgrade\r\n"
        f"Sec-WebSocket-Key: {key}\r\n"
        "Sec-WebSocket-Version: 13\r\n\r\n"
    )
    sock.send(request.encode())
    response = sock.recv(4096)
    if b"101" not in response.split(b"\r\n", 1)[0]:
        raise RuntimeError(f"WebSocket handshake failed: {response[:200]!r}")
    return sock


def ws_send(sock: socket.socket, payload: dict) -> None:
    data = json.dumps(payload).encode()
    header = bytearray([0x81])
    size = len(data)
    if size < 126:
        header.append(0x80 | size)
    elif size < 65536:
        header += bytes([0x80 | 126]) + struct.pack("!H", size)
    else:
        header += bytes([0x80 | 127]) + struct.pack("!Q", size)
    mask = os.urandom(4)
    header += mask
    sock.send(header + bytes(byte ^ mask[index % 4] for index, byte in enumerate(data)))


def ws_recv(sock: socket.socket) -> dict:
    header = sock.recv(2)
    if not header:
        raise EOFError("WebSocket closed")
    first, second = header
    size = second & 0x7F
    if size == 126:
        size = struct.unpack("!H", sock.recv(2))[0]
    elif size == 127:
        size = struct.unpack("!Q", sock.recv(8))[0]
    mask = sock.recv(4) if second & 0x80 else None
    data = b""
    while len(data) < size:
        data += sock.recv(size - len(data))
    if mask:
        data = bytes(byte ^ mask[index % 4] for index, byte in enumerate(data))
    return json.loads(data.decode(errors="ignore"))


class CDP:
    def __init__(self, websocket_url: str):
        self.sock = ws_connect(websocket_url)
        self.message_id = 0

    def call(self, method: str, params: dict | None = None) -> dict:
        self.message_id += 1
        ws_send(self.sock, {"id": self.message_id, "method": method, "params": params or {}})
        while True:
            message = ws_recv(self.sock)
            if message.get("id") == self.message_id:
                return message

    def close(self) -> None:
        self.sock.close()


def safe_name(route: str, width: int, height: int) -> str:
    label = "home" if route == "/" else route.strip("/").replace("/", "-")
    return f"{label}-{width}x{height}.png"


def run() -> int:
    chrome = find_chrome()
    npm = shutil.which("npm.cmd" if os.name == "nt" else "npm") or shutil.which("npm")
    if not npm:
        raise SystemExit("npm executable not found on PATH")
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    server = subprocess.Popen(
        [npm, "run", "dev", "--", "--host", "0.0.0.0"],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    chrome_proc = None
    failed = False
    try:
        wait_for_url(BASE_URL)
        chrome_proc = subprocess.Popen(
            [
                str(chrome),
                "--headless=new",
                f"--remote-debugging-port={CDP_PORT}",
                "--disable-gpu",
                "--no-first-run",
                "--user-data-dir=C:\\Temp\\chrome-hermes-mobile-qa-script",
                "--window-size=390,844",
                "about:blank",
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        wait_for_url(f"http://127.0.0.1:{CDP_PORT}/json/version")
        page = http_json("PUT", "/json/new?" + urllib.parse.quote(BASE_URL + "/"))
        cdp = CDP(page["webSocketDebuggerUrl"])
        cdp.call("Page.enable")
        cdp.call("Runtime.enable")

        expression = """
(() => {
  const maxScrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  const offenders = [...document.querySelectorAll('body *')]
    .filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width && (rect.right > innerWidth + 1 || rect.left < -1);
    })
    .slice(0, 6)
    .map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        className: String(el.className),
        text: (el.innerText || el.textContent || '').trim().slice(0, 80),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      };
    });
  return {
    path: location.pathname,
    title: document.title,
    innerWidth,
    scrollWidth: maxScrollWidth,
    overflow: maxScrollWidth > innerWidth,
    h1: document.querySelector('h1')?.innerText || '',
    offenders,
  };
})()
"""

        for width, height in VIEWPORTS:
            cdp.call(
                "Emulation.setDeviceMetricsOverride",
                {"width": width, "height": height, "deviceScaleFactor": 1, "mobile": width < 700},
            )
            for route in ROUTES:
                url = f"{BASE_URL}{route}?qa={int(time.time() * 1000)}"
                cdp.call("Page.navigate", {"url": url})
                result = None
                for _ in range(40):
                    time.sleep(0.15)
                    response = cdp.call("Runtime.evaluate", {"expression": expression, "returnByValue": True})
                    value = response.get("result", {}).get("result", {}).get("value")
                    if value and value.get("h1"):
                        result = value
                        break
                if not result:
                    failed = True
                    print(f"FAIL {width}x{height} {route}: route did not render h1")
                    continue
                shot = cdp.call("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": False})
                screenshot_path = OUT_DIR / safe_name(route, width, height)
                screenshot_path.write_bytes(base64.b64decode(shot["result"]["data"]))
                if result["path"] != route:
                    failed = True
                    print(
                        f"FAIL {width}x{height} {route}: rendered pathname {result['path']} does not match requested route"
                    )
                    continue
                status = "FAIL" if result["overflow"] else "PASS"
                print(
                    f"{status} {width}x{height} {route}: "
                    f"scrollWidth={result['scrollWidth']} innerWidth={result['innerWidth']} "
                    f"screenshot={screenshot_path.relative_to(ROOT)}"
                )
                if result["overflow"]:
                    failed = True
                    print(json.dumps(result["offenders"], ensure_ascii=False, indent=2))
        cdp.close()
    finally:
        if chrome_proc:
            chrome_proc.terminate()
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(run())
