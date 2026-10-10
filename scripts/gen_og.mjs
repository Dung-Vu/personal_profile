// Sinh ảnh share 1200×630 (trang chủ + từng case) từ nội dung trong src/content/. Chạy tay khi đổi nội dung:
//   node scripts/gen_og.mjs   → public/og/home.jpg, public/og/<slug>.jpg
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { projects } from "../src/content/projects.js";
import { site } from "../src/content/site.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/og");
const exe = [
    process.env.CHROME_PATH,
    path.join(os.homedir(), ".cache/puppeteer/chrome-headless-shell/mac_arm-150.0.7871.24/chrome-headless-shell-mac-arm64/chrome-headless-shell"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((c) => c && fs.existsSync(c));
const avatar = `data:image/webp;base64,${fs.readFileSync(path.join(ROOT, "public/assets/avatar-720.webp")).toString("base64")}`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

const tones = {
    ocean: ["#1b6265", "#dcebea"],
    iris: ["#474fb3", "#e7e8f8"],
    apricot: ["#8f531c", "#f5e6d5"],
    mint: ["#1b6265", "#d9f6ec"],
};

const css = `
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;background:#f3f2ee;color:#0f1115;font-family:"Be Vietnam Pro",sans-serif;-webkit-font-smoothing:antialiased}
.card{position:relative;width:1200px;height:630px;padding:64px 72px;display:flex;flex-direction:column}
.dots{position:absolute;inset:0;background-image:radial-gradient(rgba(15,17,21,.13) 1.2px,transparent 1.3px);background-size:26px 26px;mask-image:linear-gradient(90deg,transparent 45%,#000 100%)}
.mono{font-family:"JetBrains Mono",monospace;font-size:19px;letter-spacing:.14em;text-transform:uppercase;color:#6b6f76}
.mono i{display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--c);margin-right:14px;vertical-align:2px}
.foot{position:absolute;left:72px;right:72px;bottom:56px;display:flex;justify-content:space-between;align-items:center;font-size:22px;color:#33373f}
.who{display:flex;align-items:center;gap:16px;font-weight:600}
.who img{width:52px;height:52px;border-radius:50%;object-fit:cover;object-position:50% 18%}
.url{font-family:"JetBrains Mono",monospace;font-size:20px;color:#6b6f76}
.home h1{font-size:118px;line-height:.96;letter-spacing:-.045em;font-weight:800;margin-top:28px}
.home h1 span{color:#1b6265}
.home p{font-size:29px;line-height:1.42;color:#33373f;max-width:660px;margin-top:30px}
.portrait{position:absolute;right:72px;top:64px;width:330px;height:420px;border-radius:28px;overflow:hidden;background:#e7e8f0}
.portrait img{width:100%;height:100%;object-fit:cover;object-position:50% 20%}
.chips{display:flex;gap:12px;margin-top:30px}
.chips b{font-family:"JetBrains Mono",monospace;font-weight:500;font-size:19px;padding:8px 16px;border-radius:99px}
.case .tag{display:inline-block;font-family:"JetBrains Mono",monospace;font-size:19px;font-weight:500;padding:8px 16px;border-radius:99px;background:var(--s);color:var(--c);letter-spacing:.06em;text-transform:uppercase}
.case h1{font-size:96px;line-height:1;letter-spacing:-.04em;font-weight:800;margin-top:30px}
.case h2{font-size:38px;line-height:1.2;letter-spacing:-.02em;font-weight:600;color:#33373f;margin-top:16px;max-width:900px}
.metrics{display:flex;gap:56px;margin-top:46px}
.metrics div{border-left:3px solid var(--c);padding-left:20px}
.metrics b{display:block;font-size:52px;font-weight:800;letter-spacing:-.03em;line-height:1}
.metrics span{display:block;font-size:20px;color:#6b6f76;margin-top:10px}
.bar{position:absolute;left:0;top:0;bottom:0;width:12px;background:var(--c)}
`;

const foot = (url) => `<div class="foot"><div class="who"><img src="${avatar}">${esc(site.name)} · ${esc(site.role)}</div><span class="url">${esc(url)}</span></div>`;

const homeHtml = () => `
<div class="card home" style="--c:#1b6265"><div class="dots"></div>
  <div class="mono"><i></i>${esc(site.role)}</div>
  <h1>${esc(site.firstLine)}<br><span>${esc(site.lastLine)}</span></h1>
  <p>${esc(site.pitch)}</p>
  <div class="chips">${site.focus.map((f, i) => `<b style="background:${["#dcebea", "#e7e8f8", "#f5e6d5"][i]};color:${["#1b6265", "#474fb3", "#8f531c"][i]}">${esc(f)}</b>`).join("")}</div>
  <div class="portrait"><img src="${avatar}"></div>
  <div class="foot"><span></span><span class="url">${esc(site.domain)}</span></div>
</div>`;

const caseHtml = (p) => {
    const [c, s] = tones[p.tone] ?? tones.ocean;
    return `
<div class="card case" style="--c:${c};--s:${s}"><div class="bar"></div><div class="dots"></div>
  <div><span class="tag">${esc(p.tag)}</span></div>
  <h1>${esc(p.name)}</h1>
  <h2>${esc(p.line)}</h2>
  <div class="metrics">${p.cardMetrics.map((m) => `<div><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join("")}</div>
  ${foot(`${site.domain}/work/${p.slug}`)}
</div>`;
};

fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: exe, headless: true });
const jobs = [["home", homeHtml()], ...projects.map((p) => [p.slug, caseHtml(p)])];
for (const [name, body] of jobs) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.setContent(
        `<!doctype html><html lang="vi"><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;800&family=JetBrains+Mono:wght@400;500&display=block"><style>${css}</style></head><body>${body}</body></html>`,
        { waitUntil: "load" },
    );
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, `${name}.jpg`), type: "jpeg", quality: 88 });
    await page.close();
    console.log(`  og/${name}.jpg`);
}
await browser.close();
