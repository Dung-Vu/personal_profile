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
const PORT = 8782;
const CDP_PORT = 9229;
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

async function runAxe(page) {
  const axeSource = require("axe-core").source;
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    // Clip bằng chứng chạy animation khi cuộn tới: tua hết về cảnh cuối rồi mới chấm (giữa chừng chữ còn mờ dở).
    document.querySelectorAll(".clip").forEach((el) => el.getAnimations({ subtree: true }).forEach((a) => a.finish()));
    // Mảnh chat/Excel trôi ở chương 1 là hình trang trí (aria-hidden, cố ý mờ theo chiều sâu):
    // chữ trong đó thuộc diện "incidental" của WCAG 1.4.3 nên không chấm tương phản.
    const results = await window.axe.run({ exclude: [[".frags"]] }, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
      },
    });

    return {
      violations: results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.map((node) => node.target),
      })),
      passes: results.passes.length,
    };
  });
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
  const userData = fs.mkdtempSync(path.join(os.tmpdir(), "personal-website-qa-a11y-"));
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

    console.log(`A11y QA routes: ${routes.length} (${total} checks across mobile + desktop)`);

    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      try {
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
          isMobile: viewport.mobile,
        });

        for (const route of routes) {
          const url = `http://127.0.0.1:${PORT}${route}`;
          const expectedLang = route === "/en" || route.startsWith("/en/") ? "en" : "vi";
          await page.goto(url, { waitUntil: "networkidle0", timeout: 20000 });
          await page.waitForSelector("h1", { timeout: 8000 }).catch(() => {});

          const result = await page.evaluate(() => ({
            path: location.pathname,
            lang: document.documentElement.lang,
            h1Count: document.querySelectorAll("h1").length,
            mainCount: document.querySelectorAll("main").length,
            headerCount: document.querySelectorAll("header").length,
            navCount: document.querySelectorAll("nav").length,
            footerCount: document.querySelectorAll("footer").length,
            skipLink: Boolean(document.querySelector(".skip")),
          }));
          const axe = await runAxe(page);

          const violations = axe.violations;
          const h1Ok = result.h1Count === 1;
          const langOk = result.lang === expectedLang;
          const landmarksOk =
            result.mainCount >= 1 && result.headerCount >= 1 && result.navCount >= 1;
          const skipOk = result.skipLink;
          const ok = violations.length === 0 && h1Ok && langOk && landmarksOk && skipOk;
          const status = ok ? "PASS" : "FAIL";
          if (ok) passed++;

          console.log(
            `${status} ${viewport.label} ${viewport.width}x${viewport.height} ${route} lang=${result.lang} h1=${result.h1Count} landmarks=${result.mainCount}/${result.headerCount}/${result.navCount} skip=${skipOk ? "ok" : "missing"} violations=${violations.length}`,
          );

          if (!ok) {
            failed = true;
            if (!langOk) {
              console.log(`  - expected lang="${expectedLang}" but got "${result.lang}" on ${viewport.label} ${route}`);
            }
            if (!skipOk) {
              console.log(`  - missing .skip link on ${viewport.label} ${route}`);
            }
            for (const violation of violations) {
              const targets = violation
                .nodes
                .map((node) => node.join(" > "))
                .slice(0, 4)
                .join(" | ");
              console.log(
                `  - ${violation.id} (${violation.impact}) nodes=${violation.nodes.length}: ${violation.help}${targets ? ` [${targets}]` : ""}`,
              );
            }
          }
        }
      } finally {
        await page.close().catch(() => {});
      }
    }
    console.log(`A11y QA summary: ${passed}/${total} passed`);
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
