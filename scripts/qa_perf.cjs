#!/usr/bin/env node
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { pathToFileURL } = require("node:url");
const { findChrome } = require("./find_chrome.cjs");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.resolve(ROOT, "dist");
const DIST_PREFIX = DIST + path.sep;
const NOT_FOUND_HTML = path.join(DIST, "404.html");
const PORT = 8781;
const CDP_PORT = 9228;
const VIEWPORTS = [
  { label: "mobile", width: 390, height: 844, mobile: true },
  { label: "desktop", width: 1440, height: 900, mobile: false },
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function safeRemove(target) {
  try {
    fs.rmSync(target, { recursive: true, force: true });
  } catch {
    // best effort only
  }
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
      let pathname;
      try {
        pathname = decodeURIComponent(url.pathname);
      } catch {
        res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Bad Request");
        return;
      }

      const normalized = pathname.replace(/\/+$/, "") || "/";
      const rawPath = normalized === "/" ? "/index.html" : normalized;
      const resolved = path.resolve(DIST, "." + rawPath);
      if (!resolved.startsWith(DIST_PREFIX)) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
      }

      let filePath = resolved;
      let statusCode = 200;
      // Giống Cloudflare Pages: /en → en.html, /en/work/evone → en/work/evone.html, /work/evone → work/evone.html; đường dẫn lạ → 404.html (HTTP 404).
      if (normalized !== "/" && fs.existsSync(`${filePath}.html`) && fs.statSync(`${filePath}.html`).isFile()) {
        filePath = `${filePath}.html`;
        if (filePath === NOT_FOUND_HTML) statusCode = 404;
      } else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        const directoryIndex = path.join(filePath, "index.html");
        if (fs.existsSync(directoryIndex)) {
          filePath = directoryIndex;
        } else {
          filePath = NOT_FOUND_HTML;
          statusCode = 404;
        }
      } else if (!fs.existsSync(filePath)) {
        filePath = NOT_FOUND_HTML;
        statusCode = 404;
      }

      if (!filePath.startsWith(DIST_PREFIX)) {
        res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Forbidden");
        return;
      }

      const ext = path.extname(filePath);
      const mime = MIME[ext] || "application/octet-stream";

      try {
        const body = fs.readFileSync(filePath);
        res.writeHead(statusCode, { "Content-Type": mime });
        res.end(body);
      } catch {
        if (fs.existsSync(NOT_FOUND_HTML)) {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
          res.end(fs.readFileSync(NOT_FOUND_HTML));
        } else {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("Not Found");
        }
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
    console.error("dist/index.html not found. Run 'pnpm build' first.");
    process.exit(1);
  }

  const { prerenderRoutes } = await import(
    pathToFileURL(path.join(ROOT, "src/routes/siteRoutes.js")).href
  );
  const routes = prerenderRoutes;
  const chromeExe = findChrome({ preferFullChrome: true });

  const server = await startServer();
  const userData = fs.mkdtempSync(path.join(os.tmpdir(), "personal-website-qa-perf-"));
  const chromeArgs = [
    `--remote-debugging-port=${CDP_PORT}`,
    "--no-sandbox",
    "--disable-gpu",
    `--user-data-dir=${userData}`,
    "about:blank",
  ];
  if (!path.basename(chromeExe).includes("headless-shell")) {
    chromeArgs.splice(1, 0, "--headless=new");
  }
  const chrome = spawn(chromeExe, chromeArgs, { stdio: "ignore" });

  let browser;
  let failed = false;
  let passed = 0;
  const total = routes.length * VIEWPORTS.length;
  try {
    await waitForCdp();
    const puppeteer = require("puppeteer-core");
    browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${CDP_PORT}`,
      defaultViewport: { width: 390, height: 844 },
    });

    console.log(`Perf QA routes: ${routes.length} (${total} checks across mobile + desktop)`);

    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      try {
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

          const lcpOk = result.lcp > 0 && result.lcp <= 2500;
          const clsOk = result.cls <= 0.1;
          const h1Ok = Boolean(result.h1.trim());
          const longTaskWarn = result.maxLongTask > 50;
          const ok = lcpOk && clsOk && h1Ok;
          const status = ok ? "PASS" : "FAIL";
          if (ok) passed++;
          const longTaskText = longTaskWarn ? ` longtask=${result.maxLongTask}ms` : "";
          console.log(
            `${status} ${viewport.label} ${viewport.width}x${viewport.height} ${route} lcp=${result.lcp}ms cls=${result.cls}${longTaskText}`,
          );
          if (!h1Ok) {
            console.log(`  missing h1 on ${viewport.label} ${route}`);
          }
          if (!ok) {
            failed = true;
          }
        }
      } finally {
        await page.close().catch(() => {});
      }
    }
    console.log(`Perf QA summary: ${passed}/${total} passed`);
  } catch (error) {
    failed = true;
    console.error(error);
  } finally {
    if (browser) await browser.disconnect().catch(() => {});
    chrome.kill();
    server.close();
    safeRemove(userData);
  }

  process.exit(failed ? 1 : 0);
}

main();
