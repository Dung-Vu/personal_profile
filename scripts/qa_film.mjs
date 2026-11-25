// Chụp phim cuộn ở nhiều vị trí cuộn để soát từng khung.
// Dùng: node scripts/qa_film.mjs [baseUrl] [outDir]  (LOCALE=vi|en, SIZES="1440x900,390x844", STOPS="0,0.2,...")
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { findChrome } from "./find_chrome.cjs";

const locale = process.env.LOCALE === "en" ? "en" : "vi";
const homeRoute = locale === "en" ? "/en" : "/";
const base = process.argv[2] ?? "http://127.0.0.1:4173";
const out = process.argv[3] ?? path.join(os.tmpdir(), "profile-v3-film");
const sizes = (process.env.SIZES ?? "1440x900,390x844").split(",").map((s) => s.split("x").map(Number));
const stops = (process.env.STOPS ?? "0,0.2,0.3,0.4,0.5,0.62,0.7,0.78,0.86,1").split(",").map(Number);
const exe = findChrome();
fs.mkdirSync(out, { recursive: true });

const errors = [];
const browser = await puppeteer.launch({ executablePath: exe, headless: true, args: ["--no-sandbox", "--hide-scrollbars"] });
try {
    const page = await browser.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

    for (const [w, h] of sizes) {
        await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: w < 600, hasTouch: w < 600 });
        await page.goto(base + homeRoute, { waitUntil: "networkidle0" });
        await page.evaluate(() => document.fonts.ready);
        // Phim chỉ tải khi người xem tương tác.
        await page.mouse.move(w / 2, h / 2);
        await page.mouse.move(w / 2 + 20, h / 2 + 20);
        const film = await page.waitForSelector(".film .film-root", { timeout: 6000 }).catch(() => null);
        if (!film) {
            if (w >= 1181 && h >= 820) {
                errors.push(`${w}x${h} (${locale}): không tìm thấy .film .film-root trên màn desktop`);
            } else {
                console.log(`${w}x${h} (${locale}): không bật phim (bản tĩnh)`);
            }
            continue;
        }
        for (const p of stops) {
            const scrolled = await page.evaluate((pos) => {
                const el = document.querySelector(".film");
                if (!el) return false;
                const top = el.getBoundingClientRect().top + scrollY;
                scrollTo(0, top + pos * (el.offsetHeight - innerHeight));
                return true;
            }, p);
            if (!scrolled) {
                errors.push(`${w}x${h} (${locale}): thiếu phần tử .film khi cuộn tới ${p}`);
                break;
            }
            await new Promise((r) => setTimeout(r, 900));
            const prefix = locale === "en" ? "film-en" : "film";
            const name = `${prefix}-${w}x${h}-${String(Math.round(p * 100)).padStart(3, "0")}.png`;
            await page.screenshot({ path: path.join(out, name) });
        }
        console.log(`${w}x${h} (${locale}): ${stops.length} khung`);
    }
} finally {
    await browser.close();
}

if (errors.length) {
    console.error("Lỗi:\n" + [...new Set(errors)].join("\n"));
    process.exitCode = 1;
} else {
    console.log("Không có lỗi console.");
}
