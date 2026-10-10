// Chụp clip bằng chứng ở trang chi tiết dự án: cảnh cuối (giảm chuyển động) + vài khung giữa lúc chạy.
// Dùng: node scripts/qa_clips.mjs [baseUrl] [outDir]  (SIZES="1440x900,390x844", TIMES="0.8,2.4,4", SLUGS="evone,tca")
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const out = process.argv[3] ?? path.join(os.tmpdir(), "profile-v2-clips");
const sizes = (process.env.SIZES ?? "1440x900,390x844").split(",").map((s) => s.split("x").map(Number));
const times = (process.env.TIMES ?? "").split(",").filter(Boolean).map(Number);
const slugs = (process.env.SLUGS ?? "evone,odoo-bonario,ace-ra-tem,reminder-hub,tca,ai-operator").split(",");
const exe = [
    process.env.CHROME_PATH,
    path.join(os.homedir(), ".cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((c) => c && fs.existsSync(c));
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({ executablePath: exe, headless: true, args: ["--hide-scrollbars"] });
const errors = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const [w, h] of sizes) {
    for (const slug of slugs) {
        // Cảnh cuối: bật giảm chuyển động, chụp clip + khối Trước → Sau.
        const page = await browser.newPage();
        page.on("pageerror", (e) => errors.push(`${slug} ${w}: ${e.message}`));
        page.on("console", (m) => m.type() === "error" && errors.push(`${slug} ${w}: ${m.text()}`));
        await page.setViewport({ width: w, height: h, deviceScaleFactor: w < 600 ? 2 : 1, isMobile: w < 600, hasTouch: w < 600 });
        await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
        await page.goto(`${base}/work/${slug}`, { waitUntil: "networkidle0" });
        await page.evaluate(() => document.fonts.ready);
        const clip = await page.$(".clip");
        const ba = await page.$(".ba");
        const a = await clip.boundingBox();
        const b = ba ? await ba.boundingBox() : a;
        const y = Math.min(a.y, b.y);
        await page.screenshot({ path: path.join(out, `${w}-${slug}-end.png`), clip: { x: 0, y, width: w, height: b.y + b.height - y + 16 }, captureBeyondViewport: true });
        await page.close();

        // Khung giữa lúc chạy.
        for (const t of times) {
            const p = await browser.newPage();
            await p.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: w < 600, hasTouch: w < 600 });
            await p.goto(`${base}/work/${slug}`, { waitUntil: "networkidle0" });
            await p.evaluate(() => document.fonts.ready);
            await p.evaluate(() => document.querySelector(".clip").scrollIntoView({ block: "start" }));
            await sleep(t * 1000);
            const el = await p.$(".clip-win");
            await el.screenshot({ path: path.join(out, `${w}-${slug}-t${String(t).replace(".", "_")}.png`) });
            await p.close();
        }
        console.log(`${w}x${h} ${slug} ok`);
    }
}
await browser.close();
console.log(errors.length ? `Lỗi console:\n${errors.join("\n")}` : "Không có lỗi console.");
