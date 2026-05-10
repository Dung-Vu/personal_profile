#!/usr/bin/env node
/**
 * Prerender SPA routes into static HTML files for SEO.
 * Uses puppeteer-core to connect to a headless Chrome with CDP.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { pathToFileURL } = require("url");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PORT = 8777;
const CDP_PORT = 9225;

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
      let filePath = path.join(DIST, url.pathname === "/" ? "index.html" : url.pathname);
      if (!fs.existsSync(filePath)) filePath = path.join(DIST, "index.html");

      const ext = path.extname(filePath);
      const mime = {
        ".html": "text/html", ".js": "application/javascript",
        ".css": "text/css", ".svg": "image/svg+xml",
        ".webp": "image/webp", ".jpg": "image/jpeg",
        ".png": "image/png", ".json": "application/json",
        ".webmanifest": "application/manifest+json",
      }[ext] || "application/octet-stream";

      try {
        res.writeHead(200, { "Content-Type": mime });
        res.end(fs.readFileSync(filePath));
      } catch {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fs.readFileSync(path.join(DIST, "index.html")));
      }
    });
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

async function main() {
  const { prerenderRoutes } = await import(
    pathToFileURL(path.join(ROOT, "src/routes/siteRoutes.js")).href
  );

  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.error("dist/index.html not found. Run 'npm run build' first.");
    process.exit(1);
  }

  const server = await startServer();
  console.log(`Static server on http://127.0.0.1:${PORT}`);

  const userData = path.join(ROOT, ".chrome-prerender");
  fs.mkdirSync(userData, { recursive: true });

  const chromeCandidates = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
    "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/mnt/c/Program Files/Microsoft/Edge/Application/msedge.exe",
  ];
  const chromeExe = chromeCandidates.find((candidate) => fs.existsSync(candidate));
  if (!chromeExe) {
    console.error("Chrome/Edge executable not found.");
    server.close();
    process.exit(1);
  }

  const chrome = spawn(chromeExe, [
    `--remote-debugging-port=${CDP_PORT}`,
    "--headless=new", "--no-sandbox", "--disable-gpu",
    `--user-data-dir=${userData}`, "about:blank",
  ], { stdio: "ignore" });

  // Wait for Chrome CDP to be ready
  console.log("Waiting for Chrome...");
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    try {
      await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${CDP_PORT}/json/version`, (res) => {
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () => resolve(data));
        }).on("error", reject);
      });
      console.log("Chrome CDP ready");
      break;
    } catch {
      if (i === 14) {
        console.error("Chrome failed to start");
        chrome.kill(); server.close(); process.exit(1);
      }
    }
  }

  // Connect puppeteer-core
  const puppeteer = require("puppeteer-core");
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${CDP_PORT}`,
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();
  let success = 0;

  console.log(`\nPrerendering ${prerenderRoutes.length} routes...`);

  for (const route of prerenderRoutes) {
    try {
      const url = `http://127.0.0.1:${PORT}${route}`;
      await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });

      // Wait for React to render h1 with id
      await page.waitForFunction(
        () => document.querySelector("h1[id]"),
        { timeout: 8000 }
      ).catch(() => {});

      await new Promise((r) => setTimeout(r, 500));

      const html = await page.content();
      const title = await page.title();
      console.log(`  ${route} -> ${title.slice(0, 70)}`);

      const finalHtml = html.startsWith("<!DOCTYPE") ? html : "<!DOCTYPE html>\n" + html;

      let outPath;
      if (route === "/") {
        outPath = path.join(DIST, "index.html");
      } else if (route === "/404") {
        outPath = path.join(DIST, "404.html");
      } else {
        const outDir = path.join(DIST, route.replace(/^\//, ""));
        fs.mkdirSync(outDir, { recursive: true });
        outPath = path.join(outDir, "index.html");
      }

      fs.writeFileSync(outPath, finalHtml);
      console.log(`  Saved ${path.relative(ROOT, outPath)}`);
      if (route === "/404") {
        const nested404 = path.join(DIST, "404", "index.html");
        fs.mkdirSync(path.dirname(nested404), { recursive: true });
        fs.writeFileSync(nested404, finalHtml);
        console.log(`  Saved ${path.relative(ROOT, nested404)}`);
      }
      success++;
    } catch (e) {
      console.error(`  ERROR ${route}:`, e.message);
    }
  }

  await page.close();
  await browser.disconnect();
  chrome.kill();
  server.close();

  console.log(`\nPrerender done: ${success}/${prerenderRoutes.length}`);
  process.exit(success === prerenderRoutes.length ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
