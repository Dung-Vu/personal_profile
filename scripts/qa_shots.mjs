// Chụp màn hình các trang ở 360 / 768 / 1440 / 1920 để so với styleframe.
// Dùng: node scripts/qa_shots.mjs [baseUrl] [outDir] [route...]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const out = process.argv[3] ?? path.join(os.tmpdir(), "profile-v2-shots");
const routes = process.argv.slice(4).length ? process.argv.slice(4) : ["/", "/work", "/work/evone", "/about", "/contact", "/404"];
const widths = (process.env.WIDTHS ?? "360,768,1440,1920").split(",").map(Number);

const candidates = [
    process.env.CHROME_PATH,
    path.join(os.homedir(), ".cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];
const executablePath = candidates.find((c) => c && fs.existsSync(c));
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox", "--hide-scrollbars"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

for (const w of widths) {
    const h = w <= 400 ? 800 : w <= 800 ? 1024 : w >= 1900 ? 1080 : 900;
    await page.setViewport({ width: w, height: h, deviceScaleFactor: w >= 1400 ? 1 : 2, isMobile: w < 600, hasTouch: w < 600 });
    for (const r of routes) {
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
await browser.close();
console.log(errors.length ? `\nLỖI:\n${[...new Set(errors)].join("\n")}` : "\nKhông có lỗi console / tràn ngang.");
