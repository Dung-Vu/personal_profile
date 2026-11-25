// Chụp clip bằng chứng ở trang chi tiết dự án: cảnh cuối (giảm chuyển động) + vài khung giữa lúc chạy.
// Dùng: node scripts/qa_clips.mjs [baseUrl] [outDir]  (SIZES="1440x900,390x844", TIMES="0.8,2.4,4", SLUGS="evone,tca")
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { projects } from "../src/content/projects.js";
import { findChrome } from "./find_chrome.cjs";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const out = process.argv[3] ?? path.join(os.tmpdir(), "profile-v2-clips");
const sizes = (process.env.SIZES ?? "1440x900,390x844").split(",").map((s) => s.split("x").map(Number));
const times = (process.env.TIMES ?? "").split(",").filter(Boolean).map(Number);
const slugs = process.env.SLUGS ? process.env.SLUGS.split(",").filter(Boolean) : projects.map((p) => p.slug);
const exe = findChrome();
fs.mkdirSync(out, { recursive: true });

const errors = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const attachErrors = (page, label) => {
    page.on("pageerror", (e) => errors.push(`${label}: ${e.message}`));
    page.on("console", (m) => m.type() === "error" && errors.push(`${label}: ${m.text()}`));
};

const browser = await puppeteer.launch({ executablePath: exe, headless: true, args: ["--no-sandbox", "--hide-scrollbars"] });
try {
    for (const [w, h] of sizes) {
        for (const slug of slugs) {
            // Cảnh cuối: bật giảm chuyển động, chụp clip + khối Trước → Sau.
            const page = await browser.newPage();
            try {
                attachErrors(page, `${slug} ${w} end`);
                await page.setViewport({ width: w, height: h, deviceScaleFactor: w < 600 ? 2 : 1, isMobile: w < 600, hasTouch: w < 600 });
                await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
                await page.goto(`${base}/work/${slug}`, { waitUntil: "networkidle0" });
                await page.evaluate(() => document.fonts.ready);
                const clip = await page.$(".clip");
                if (!clip) {
                    errors.push(`${slug} ${w}: thiếu phần tử .clip`);
                } else {
                    const a = await clip.boundingBox();
                    if (!a) {
                        errors.push(`${slug} ${w}: .clip không có boundingBox`);
                    } else {
                        const ba = await page.$(".ba");
                        const b = (ba ? await ba.boundingBox() : null) ?? a;
                        const y = Math.min(a.y, b.y);
                        const height = Math.max(a.y + a.height, b.y + b.height) - y + 16;
                        await page.screenshot({
                            path: path.join(out, `${w}-${slug}-end.png`),
                            clip: { x: 0, y, width: w, height },
                            captureBeyondViewport: true,
                        });
                    }
                }
            } finally {
                await page.close();
            }

            // Khung giữa lúc chạy.
            for (const t of times) {
                const p = await browser.newPage();
                try {
                    attachErrors(p, `${slug} ${w} t=${t}`);
                    await p.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: w < 600, hasTouch: w < 600 });
                    await p.goto(`${base}/work/${slug}`, { waitUntil: "networkidle0" });
                    await p.evaluate(() => document.fonts.ready);
                    const hasClip = await p.evaluate(() => {
                        const el = document.querySelector(".clip");
                        if (!el) return false;
                        el.scrollIntoView({ block: "start" });
                        return true;
                    });
                    if (!hasClip) {
                        errors.push(`${slug} ${w} t=${t}: thiếu phần tử .clip`);
                        continue;
                    }
                    await sleep(t * 1000);
                    const el = await p.$(".clip-win");
                    if (!el) {
                        errors.push(`${slug} ${w} t=${t}: thiếu phần tử .clip-win`);
                        continue;
                    }
                    await el.screenshot({ path: path.join(out, `${w}-${slug}-t${String(t).replace(".", "_")}.png`) });
                } finally {
                    await p.close();
                }
            }
            console.log(`${w}x${h} ${slug} ok`);
        }
    }
} finally {
    await browser.close();
}

if (errors.length) {
    console.error(`Lỗi:\n${[...new Set(errors)].join("\n")}`);
    process.exitCode = 1;
} else {
    console.log("Không có lỗi console.");
}
