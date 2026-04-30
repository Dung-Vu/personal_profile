#!/usr/bin/env python3
"""Prerender SPA routes into static HTML files for SEO/OG meta tags.

Serves dist/ via http.server, crawls each route with Chrome CDP headless,
waits for React to render, then saves the full DOM HTML to dist/<route>/index.html.
"""
from __future__ import annotations

import base64
import json
import os
import socket
import struct
import subprocess
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
CHROME_CANDIDATES = [
    Path("/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"),
    Path("/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"),
]
ROUTES = [
    "/", "/about", "/work", "/work/tca-crypto-analyzer",
    "/work/bonario-product-hub", "/work/ai-operator-workflow",
    "/stack", "/workflow", "/contact", "/lab",
]
PORT = 8777
CDP_PORT = 9225


def find_chrome():
    for path in CHROME_CANDIDATES:
        if path.exists():
            return str(path)
    sys.exit("Chrome not found")


def start_static_server():
    import threading
    os.chdir(DIST)

    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(DIST), **kwargs)

    server = HTTPServer(("127.0.0.1", PORT), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    print(f"Static server on http://127.0.0.1:{PORT}")
    return server


def cdp_send(ws, method, params=None):
    msg = json.dumps({"id": 1, "method": method, "params": params or {}})
    ws.send(struct.pack("!H", len(msg)) + msg.encode())


def cdp_recv(ws):
    header = ws.recv(2)
    if len(header) < 2:
        return None
    length = struct.unpack("!H", header)[0]
    data = b""
    while len(data) < length:
        chunk = ws.recv(length - len(data))
        if not chunk:
            break
        data += chunk
    return json.loads(data)


def cdp_connect(host="127.0.0.1", port=CDP_PORT):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((host, port))
    return sock


def prerender_route(sock, route):
    """Navigate to route, wait for React, get rendered HTML."""
    # Get available pages
    cdp_send(sock, "Target.getTargets")
    resp = cdp_recv(sock)
    targets = resp.get("result", {}).get("targetInfos", [])
    page_target = next((t for t in targets if t.get("type") == "page"), None)
    if not page_target:
        print(f"  No page target for {route}")
        return None

    target_id = page_target["targetId"]
    # Attach
    cdp_send(sock, "Target.attachToTarget", {"targetId": target_id, "flatten": True})
    session_resp = cdp_recv(sock)
    session_id = session_resp.get("result", {}).get("sessionId")
    if not session_id:
        return None

    def send(method, params=None):
        cdp_send(sock, "Target.sendMessageToTarget", {
            "message": json.dumps({"id": 2, "method": method, "params": params or {}}),
            "sessionId": session_id,
        })

    def recv():
        while True:
            msg = cdp_recv(sock)
            if msg and "result" in msg:
                return msg
            if msg and "error" in msg:
                return None

    # Enable Page domain
    send("Page.enable")
    recv()
    send("Runtime.enable")
    recv()

    # Navigate
    url = f"http://127.0.0.1:{PORT}{route}"
    send("Page.navigate", {"url": url})
    recv()

    # Wait for page load
    time.sleep(1.5)
    # Wait for React to render (check for h1 or route-specific content)
    send("Runtime.evaluate", {
        "expression": "document.querySelector('h1[id]') ? 'ready' : 'waiting'",
        "returnByValue": True,
    })
    for _ in range(20):  # up to 3 seconds
        result = recv()
        if result and result.get("result", {}).get("result", {}).get("value") == "ready":
            break
        time.sleep(0.15)
        send("Runtime.evaluate", {
            "expression": "document.querySelector('h1[id]') ? 'ready' : 'waiting'",
            "returnByValue": True,
        })

    # Extra wait for dynamic content
    time.sleep(0.5)

    # Get full HTML
    send("Runtime.evaluate", {
        "expression": "document.documentElement.outerHTML",
        "returnByValue": True,
    })
    result = recv()
    html = result.get("result", {}).get("result", {}).get("value", "")
    if not html:
        print(f"  No HTML for {route}")
        return None

    # Get title for verification
    send("Runtime.evaluate", {
        "expression": "document.title",
        "returnByValue": True,
    })
    title_result = recv()
    title = title_result.get("result", {}).get("result", {}).get("value", "unknown")
    print(f"  {route} -> title: {title[:60]}")

    # Detach
    cdp_send(sock, "Target.detachFromTarget", {"sessionId": session_id})
    cdp_recv(sock)

    return html


def main():
    chrome = find_chrome()
    print(f"Chrome: {chrome}")

    # Ensure dist exists
    if not (DIST / "index.html").exists():
        sys.exit(f"No dist/index.html found. Run 'npm run build' first.")

    # Start static server
    server = start_static_server()

    # Launch Chrome headless with CDP
    user_data = str(ROOT / ".chrome-prerender")
    os.makedirs(user_data, exist_ok=True)
    chrome_args = [
        chrome,
        f"--remote-debugging-port={CDP_PORT}",
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        f"--user-data-dir={user_data}",
        "about:blank",
    ]
    proc = subprocess.Popen(chrome_args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)

    # Connect to CDP
    try:
        sock = cdp_connect()
    except Exception:
        proc.terminate()
        sys.exit("Failed to connect to Chrome CDP")

    print(f"\nPrerendering {len(ROUTES)} routes...")
    success = 0

    for route in ROUTES:
        try:
            html = prerender_route(sock, route)
            if html:
                # Clean up: remove Vite dev HMR scripts that may linger
                # For production prerender, add <!DOCTYPE html> and clean up
                if not html.startswith("<!DOCTYPE"):
                    html = "<!DOCTYPE html>\n" + html

                # Save to dist/<route>/index.html
                if route == "/":
                    # Overwrite the main index.html
                    out_path = DIST / "index.html"
                else:
                    out_dir = DIST / route.lstrip("/")
                    os.makedirs(out_dir, exist_ok=True)
                    out_path = out_dir / "index.html"

                out_path.write_text(html, encoding="utf-8")
                print(f"  Saved {out_path.relative_to(ROOT)}")
                success += 1
        except Exception as e:
            print(f"  ERROR {route}: {e}")

    sock.close()
    proc.terminate()
    server.shutdown()
    print(f"\nPrerender done: {success}/{len(ROUTES)} routes saved")

    if success < len(ROUTES):
        sys.exit(1)


if __name__ == "__main__":
    main()
