#!/usr/bin/env node
const fs = require("fs");
const http = require("http");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const { pathToFileURL } = require("url");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PORT = 8781;
const CDP_PORT = 9228;
const VIEWPORTS = [
  { label: "mobile", width: 390, height: 844, mobile: true },
  { label: "desktop", width: 1440, height: 900, mobile: false },
];

function safeRemove(target) {
  try {
    fs.rmSync(target, { recursive: true, force: true });
  } catch {
    // best effort only
  }
}

function findChrome() {
  const candidates = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
    "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/mnt/c/Program Files/Microsoft/Edge/Application/msedge.exe",
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
      let filePath = path.join(DIST, url.pathname === "/" ? "index.html" : url.pathname);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        const directoryIndex = path.join(filePath, "index.html");
        filePath = fs.existsSync(directoryIndex)
          ? directoryIndex
          : path.join(DIST, "index.html");
      } else if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST, "index.html");
      }

      const ext = path.extname(filePath);
      const mime = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".svg": "image/svg+xml",
        ".webp": "image/webp",
        ".jpg": "image/jpeg",
        ".png": "image/png",
        ".json": "application/json",
        ".webmanifest": "application/manifest+json",
      }[ext] || "application/octet-stream";

      try {
        const body = fs.readFileSync(filePath);
        res.writeHead(200, { "Content-Type": mime });
        res.end(body);
      } catch {
        const fallback = fs.readFileSync(path.join(DIST, "index.html"));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fallback);
      }
    });
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

async function waitForCdp() {
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${CDP_PORT}/json/version`, (res) => {
          res.resume();
          res.on("end", resolve);
        }).on("error", reject);
      });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error("Chrome CDP not ready");
}

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.error("dist/index.html not found. Run 'npm run build' first.");
    process.exit(1);
  }

  const { prerenderRoutes } = await import(
    pathToFileURL(path.join(ROOT, "src/routes/siteRoutes.js")).href
  );
  const routes = prerenderRoutes.filter((route) => route !== "/lab");

  const chromeExe = findChrome();
  if (!chromeExe) {
    console.error("Chrome/Edge executable not found.");
    process.exit(1);
  }

  const server = await startServer();
  const userData = fs.mkdtempSync(path.join(os.tmpdir(), "personal-website-qa-perf-"));
  const chrome = spawn(
    chromeExe,
    [
      `--remote-debugging-port=${CDP_PORT}`,
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      `--user-data-dir=${userData}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let browser;
  try {
    await waitForCdp();
    const puppeteer = require("puppeteer-core");
    browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${CDP_PORT}`,
      defaultViewport: { width: 390, height: 844 },
    });

    let failed = false;
    console.log(`Perf QA routes: ${routes.length}`);

    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({
        width: viewport.width,
        height: viewport.height,
        isMobile: viewport.mobile,
      });
      await page.evaluateOnNewDocument(() => {
        window.__perf = { lcp: 0, cls: 0, longtasks: [] };
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const value = entry.renderTime || entry.loadTime || entry.startTime;
            window.__perf.lcp = Math.max(window.__perf.lcp, value);
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.__perf.cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__perf.longtasks.push(entry.duration);
          }
        }).observe({ type: "longtask", buffered: true });
      });

      for (const route of routes) {
        const url = `http://127.0.0.1:${PORT}${route}`;
        await page.goto(url, { waitUntil: "networkidle0", timeout: 20000 });
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const result = await page.evaluate(() => {
          const nav = performance.getEntriesByType("navigation")[0];
          const perf = window.__perf || { lcp: 0, cls: 0, longtasks: [] };
          const maxLongTask = perf.longtasks.length ? Math.max(...perf.longtasks) : 0;
          const totalLongTask = perf.longtasks.reduce((sum, value) => sum + value, 0);

          return {
            path: location.pathname,
            title: document.title,
            h1: document.querySelector("h1")?.innerText || document.querySelector("h1")?.textContent || "",
            lcp: Math.round(perf.lcp || 0),
            cls: Number((perf.cls || 0).toFixed(3)),
            maxLongTask: Math.round(maxLongTask),
            totalLongTask: Math.round(totalLongTask),
            domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
            load: Math.round(nav.loadEventEnd - nav.startTime),
          };
        });

        const lcpOk = result.lcp === 0 || result.lcp <= 2500;
        const clsOk = result.cls <= 0.1;
        const longTaskWarn = result.maxLongTask > 50;
        const status = lcpOk && clsOk ? "PASS" : "FAIL";
        const longTaskText = longTaskWarn ? ` longtask=${result.maxLongTask}ms` : "";
        console.log(
            `${status} ${viewport.label} ${viewport.width}x${viewport.height} ${route} lcp=${result.lcp}ms cls=${result.cls}${longTaskText}`,
        );
        if (!result.h1) {
          console.log(`  missing h1 on ${viewport.label} ${route}`);
        }
        if (!lcpOk || !clsOk) {
          failed = true;
        }
      }

      await page.close();
    }

    await browser.disconnect();
    chrome.kill();
    server.close();
    safeRemove(userData);
    process.exit(failed ? 1 : 0);
  } catch (error) {
    if (browser) await browser.disconnect().catch(() => {});
    chrome.kill();
    server.close();
    safeRemove(userData);
    console.error(error);
    process.exit(1);
  }
}

main();
