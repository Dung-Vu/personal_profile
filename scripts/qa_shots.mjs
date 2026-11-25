// Chụp màn hình các trang ở 360 / 768 / 1440 / 1920 để so với styleframe.
// Dùng: node scripts/qa_shots.mjs [baseUrl] [outDir] [route...]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { prerenderRoutes } from "../src/routes/siteRoutes.js";
import { findChrome } from "./find_chrome.cjs";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const out = process.argv[3] ?? path.join(os.tmpdir(), "profile-v2-shots");
const routes = process.argv.slice(4).length ? process.argv.slice(4) : prerenderRoutes;
const widths = (process.env.WIDTHS ?? "360,768,1440,1920").split(",").map(Number);

const executablePath = findChrome();
fs.mkdirSync(out, { recursive: true });

const errors = [];
const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox", "--hide-scrollbars"] });
try {
    const page = await browser.newPage();
    let currentRoute = "";
    page.on("pageerror", (e) => errors.push(`${currentRoute}: ${e.message}`));
    page.on("console", (m) => {
        if (m.type() !== "error") return;
        // Bỏ qua thông báo HTTP 404 dự kiến của chính trang /404 khi server trả đúng status 404.
        if (currentRoute === "/404" && m.location()?.url === `${base}/404` && m.text().includes("404")) return;
        errors.push(`${currentRoute}: ${m.text()}`);
    });

    for (const w of widths) {
        const h = w <= 400 ? 800 : w <= 800 ? 1024 : w >= 1900 ? 1080 : 900;
        await page.setViewport({ width: w, height: h, deviceScaleFactor: w >= 1400 ? 1 : 2, isMobile: w < 600, hasTouch: w < 600 });
        for (const r of routes) {
            currentRoute = r;
            await page.goto(base + r, { waitUntil: "networkidle0" });
            await page.evaluate(() => document.fonts.ready);
            await new Promise((res) => setTimeout(res, 300));
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
            if (overflow > 0) errors.push(`${r} @${w}: tràn ngang ${overflow}px`);
            const name = `${w}${r === "/" ? "-home" : r.replace(/\//g, "-")}.png`;
            await page.screenshot({ path: path.join(out, name), fullPage: true });
            console.log("ok", name);
        }
    }
} finally {
    await browser.close();
}

if (errors.length) {
    console.error(`\nLỖI:\n${[...new Set(errors)].join("\n")}`);
    process.exitCode = 1;
} else {
    console.log("\nKhông có lỗi console / tràn ngang.");
}
