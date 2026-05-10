#!/usr/bin/env node
const fs = require("fs");
const http = require("http");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const { pathToFileURL } = require("url");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PORT = 8782;
const CDP_PORT = 9229;
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

async function runAxe(page) {
  const axeSource = require("axe-core").source;
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    const results = await window.axe.run(document, {
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
  const userData = fs.mkdtempSync(path.join(os.tmpdir(), "personal-website-qa-a11y-"));
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
    console.log(`A11y QA routes: ${routes.length}`);

    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({
        width: viewport.width,
        height: viewport.height,
        isMobile: viewport.mobile,
      });

      for (const route of routes) {
        const url = `http://127.0.0.1:${PORT}${route}`;
        await page.goto(url, { waitUntil: "networkidle0", timeout: 20000 });
        await page.waitForSelector("h1", { timeout: 8000 }).catch(() => {});

        const result = await page.evaluate(() => ({
          path: location.pathname,
          h1Count: document.querySelectorAll("h1").length,
          mainCount: document.querySelectorAll("main").length,
          headerCount: document.querySelectorAll("header").length,
          navCount: document.querySelectorAll("nav").length,
          footerCount: document.querySelectorAll("footer").length,
          skipLink: Boolean(document.querySelector(".skip-link")),
        }));
        const axe = await runAxe(page);

        const violations = axe.violations;
        const h1Ok = result.h1Count === 1;
        const landmarksOk =
          result.mainCount >= 1 && result.headerCount >= 1 && result.navCount >= 1;
        const status = violations.length === 0 && h1Ok && landmarksOk ? "PASS" : "FAIL";

        console.log(
          `${status} ${viewport.label} ${viewport.width}x${viewport.height} ${route} h1=${result.h1Count} landmarks=${result.mainCount}/${result.headerCount}/${result.navCount} violations=${violations.length}`,
        );

        if (!h1Ok || !landmarksOk || violations.length) {
          failed = true;
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
