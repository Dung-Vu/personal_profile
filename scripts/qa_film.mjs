// Chụp phim cuộn ở nhiều vị trí cuộn để soát từng khung.
// Dùng: node scripts/qa_film.mjs [baseUrl] [outDir]  (SIZES="1440x900,390x844", STOPS="0,0.1,...")
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const out = process.argv[3] ?? path.join(os.tmpdir(), "profile-v2-film");
const sizes = (process.env.SIZES ?? "1440x900,390x844").split(",").map((s) => s.split("x").map(Number));
const stops = (process.env.STOPS ?? "0,0.2,0.3,0.4,0.5,0.62,0.7,0.78,0.86,1").split(",").map(Number);
const exe = [
    process.env.CHROME_PATH,
    path.join(os.homedir(), ".cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((c) => c && fs.existsSync(c));
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({ executablePath: exe, headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

for (const [w, h] of sizes) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: w < 600, hasTouch: w < 600 });
    await page.goto(base + "/", { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    const film = await page.waitForSelector(".film .film-root", { timeout: 6000 }).catch(() => null);
    if (!film) {
        console.log(`${w}x${h}: không bật phim (bản tĩnh)`);
        continue;
    }
    for (const p of stops) {
        await page.evaluate((p) => {
            const el = document.querySelector(".film");
            const top = el.getBoundingClientRect().top + scrollY;
            scrollTo(0, top + p * (el.offsetHeight - innerHeight));
        }, p);
        await new Promise((r) => setTimeout(r, 900));
        const name = `film-${w}x${h}-${String(Math.round(p * 100)).padStart(3, "0")}.png`;
        await page.screenshot({ path: path.join(out, name) });
    }
    console.log(`${w}x${h}: ${stops.length} khung`);
}
await browser.close();
console.log(errors.length ? "Lỗi:\n" + [...new Set(errors)].join("\n") : "Không có lỗi console.");
