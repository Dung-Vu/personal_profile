import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "assets");
const CHROME_CANDIDATES = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];

const css = String.raw`
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 100%; height: 100%; background: #07080b; }
  body {
    font-family: "Segoe UI", "Inter", Arial, sans-serif;
    color: #dff8ff;
    overflow: hidden;
  }
  .frame {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background:
      radial-gradient(circle at 78% 34%, rgba(94, 231, 255, 0.20), transparent 28%),
      radial-gradient(circle at 54% 82%, rgba(184, 255, 106, 0.09), transparent 34%),
      linear-gradient(135deg, #07080b 0%, #0b1118 48%, #061016 100%);
  }
  .noise {
    position: absolute;
    inset: 0;
    opacity: .16;
    background-image:
      linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: linear-gradient(90deg, transparent 0%, black 42%, black 100%);
  }
  .scanline {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(0deg, rgba(255,255,255,.045) 0 1px, transparent 1px 5px);
    mix-blend-mode: screen;
    opacity: .22;
    pointer-events: none;
  }
  .vignette {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(7,8,11,.98) 0%, rgba(7,8,11,.86) 28%, rgba(7,8,11,.18) 72%, rgba(7,8,11,.28) 100%),
      radial-gradient(circle at center, transparent 36%, rgba(0,0,0,.54) 100%);
    pointer-events: none;
  }
  .monitor {
    position: absolute;
    border: 1px solid rgba(94,231,255,.30);
    border-radius: 18px;
    background: linear-gradient(145deg, rgba(7,12,18,.96), rgba(10,24,32,.96));
    box-shadow: 0 38px 110px rgba(0,0,0,.58), 0 0 60px rgba(94,231,255,.16);
    overflow: hidden;
  }
  .monitor::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(255,255,255,.08), transparent 38%);
    pointer-events: none;
  }
  .window-bar {
    height: 38px;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 18px;
    border-bottom: 1px solid rgba(255,255,255,.08);
    background: rgba(255,255,255,.035);
    color: rgba(223,248,255,.54);
    font: 600 11px/1 "Segoe UI", sans-serif;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  .dot { width: 9px; height: 9px; border-radius: 50%; background: #5ee7ff; box-shadow: 0 0 16px currentColor; }
  .dot:nth-child(2) { color: #b8ff6a; background: #b8ff6a; }
  .dot:nth-child(3) { color: #ffcf8a; background: #ffcf8a; }
  .code-lines { padding: 22px; display: grid; gap: 10px; }
  .code-line {
    height: 10px;
    border-radius: 20px;
    background: linear-gradient(90deg, rgba(94,231,255,.86), rgba(184,255,106,.28), rgba(255,255,255,.04));
    opacity: var(--o, .75);
    width: var(--w, 80%);
  }
  .chart {
    position: relative;
    height: 180px;
    margin: 16px 20px;
    border-radius: 12px;
    border: 1px solid rgba(94,231,255,.18);
    background:
      linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px),
      rgba(255,255,255,.025);
    background-size: 100% 25%, 10% 100%, auto;
  }
  .spark {
    position: absolute;
    inset: 20px 18px;
    clip-path: polygon(0 78%, 9% 62%, 17% 70%, 26% 42%, 34% 52%, 42% 26%, 52% 44%, 61% 22%, 70% 35%, 81% 18%, 92% 28%, 100% 12%, 100% 100%, 0 100%);
    background: linear-gradient(180deg, rgba(94,231,255,.72), rgba(94,231,255,.04));
    filter: drop-shadow(0 0 22px rgba(94,231,255,.48));
  }
  .candles {
    position: absolute;
    inset: 18px 18px 18px 18px;
    display: flex;
    align-items: end;
    gap: 12px;
  }
  .candle {
    position: relative;
    width: 12px;
    height: var(--h);
    border-radius: 3px;
    background: var(--c, #5ee7ff);
    box-shadow: 0 0 18px color-mix(in srgb, var(--c, #5ee7ff), transparent 45%);
  }
  .candle::before {
    content: "";
    position: absolute;
    left: 5px;
    top: -18px;
    width: 2px;
    height: calc(var(--h) + 34px);
    background: currentColor;
    opacity: .55;
  }
  .panel {
    border: 1px solid rgba(255,255,255,.10);
    border-radius: 16px;
    background: rgba(255,255,255,.045);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
  }
  .label {
    color: rgba(223,248,255,.58);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
  .value { color: #f2fcff; font-size: 28px; font-weight: 800; }
  .table { display: grid; gap: 10px; padding: 16px; }
  .row {
    display: grid;
    grid-template-columns: 1.3fr .8fr .6fr .7fr;
    align-items: center;
    gap: 12px;
    min-height: 38px;
    padding: 8px 10px;
    border-radius: 10px;
    background: rgba(255,255,255,.045);
    color: rgba(236,252,255,.78);
    font-size: 14px;
  }
  .chip {
    justify-self: start;
    border-radius: 999px;
    padding: 5px 10px;
    background: rgba(94,231,255,.14);
    color: var(--accent, #5ee7ff);
    border: 1px solid color-mix(in srgb, var(--accent, #5ee7ff), transparent 62%);
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
  }
  .keyboard {
    position: absolute;
    right: 160px;
    bottom: 86px;
    width: 530px;
    height: 135px;
    transform: perspective(680px) rotateX(54deg) rotateZ(-3deg);
    border-radius: 22px;
    background: linear-gradient(145deg, #111820, #05080c);
    border: 1px solid rgba(94,231,255,.18);
    box-shadow: 0 34px 70px rgba(0,0,0,.72);
    display: grid;
    grid-template-columns: repeat(14, 1fr);
    gap: 7px;
    padding: 18px;
  }
  .key {
    border-radius: 6px;
    background: linear-gradient(#18232d, #090d13);
    border: 1px solid rgba(255,255,255,.055);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 0 10px rgba(94,231,255,.05);
  }
  .desk-glow {
    position: absolute;
    right: 20px;
    bottom: -130px;
    width: 920px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(94,231,255,.23), transparent 62%);
    filter: blur(10px);
  }
`;

function findChrome() {
    for (const candidate of CHROME_CANDIDATES) {
        try {
            return candidate;
        } catch {
            // noop
        }
    }
    return CHROME_CANDIDATES[0];
}

function lines(count) {
    return Array.from({ length: count }, (_, index) => {
        const width = [84, 68, 92, 54, 76, 62, 88, 46][index % 8];
        const opacity = [0.84, 0.48, 0.68, 0.35, 0.76][index % 5];
        return `<span class="code-line" style="--w:${width}%;--o:${opacity}"></span>`;
    }).join("");
}

function candles(colors = ["#5ee7ff", "#b8ff6a", "#ff6b6b"]) {
    const heights = [62, 98, 74, 128, 92, 140, 108, 78, 155, 118, 168, 136, 104, 150, 124, 174, 116];
    return heights.map((height, index) => {
        const color = colors[index % colors.length];
        return `<span class="candle" style="--h:${height}px;--c:${color};color:${color}"></span>`;
    }).join("");
}

function heroScene({ og = false } = {}) {
    return `
    <div class="frame">
      <div class="desk-glow"></div>
      <div class="noise"></div>
      <div class="monitor" style="right:${og ? 96 : 170}px;top:${og ? 54 : 120}px;width:${og ? 500 : 680}px;height:${og ? 315 : 420}px;transform:rotateY(-7deg) rotateZ(.5deg)">
        <div class="window-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span style="margin-left:10px">signal.dashboard</span></div>
        <div class="chart"><div class="spark"></div><div class="candles">${candles()}</div></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:0 20px 20px">
          <div class="panel" style="padding:14px"><div class="label">latency</div><div class="value">42ms</div></div>
          <div class="panel" style="padding:14px"><div class="label">signals</div><div class="value" style="color:#5ee7ff">18</div></div>
          <div class="panel" style="padding:14px"><div class="label">build</div><div class="value" style="color:#b8ff6a">ok</div></div>
        </div>
      </div>
      <div class="monitor" style="right:${og ? 430 : 760}px;top:${og ? 115 : 190}px;width:${og ? 335 : 450}px;height:${og ? 250 : 340}px;transform:rotateY(12deg) rotateZ(-1.5deg);opacity:.92">
        <div class="window-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span style="margin-left:10px">src/App.jsx</span></div>
        <div class="code-lines">${lines(18)}</div>
      </div>
      <div class="keyboard">${Array.from({ length: 70 }, () => `<span class="key"></span>`).join("")}</div>
      ${og ? `<div style="position:absolute;left:80px;bottom:72px;color:#f4fbff;text-shadow:0 8px 30px rgba(0,0,0,.55)">
        <div style="font-size:34px;font-weight:800">Vũ Đình Dũng</div>
        <div style="margin-top:8px;font-size:18px;color:#9eefff;font-weight:700;letter-spacing:.02em">Web Developer</div>
      </div>` : ""}
      <div class="vignette"></div>
      <div class="scanline"></div>
    </div>`;
}

function labScene() {
    return `
    <div class="frame" style="background:
      radial-gradient(circle at 72% 44%, rgba(184,255,106,.22), transparent 30%),
      radial-gradient(circle at 48% 70%, rgba(94,231,255,.12), transparent 34%),
      linear-gradient(135deg,#07080b,#07110e 54%,#0c1318)">
      <div class="noise"></div>
      <div class="monitor" style="right:120px;top:95px;width:760px;height:500px;border-color:rgba(184,255,106,.28);box-shadow:0 38px 110px rgba(0,0,0,.62),0 0 70px rgba(184,255,106,.12)">
        <div class="window-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span style="margin-left:10px">motion-lab.archive</span></div>
        <pre style="margin:0;padding:28px;color:#b8ff6a;font:600 18px/1.45 Consolas,monospace;white-space:pre-wrap;text-shadow:0 0 18px rgba(184,255,106,.22)">$ boot --archive signal-os
loading motion surfaces... ok
linking command panel... ok
canvas.signal.waveform:
  ╭─╮   ╭──╮      ╭╮     ╭────╮
──╯ ╰───╯  ╰──────╯╰─────╯    ╰──
mode: archived experiment
status: readable / isolated / stable</pre>
        <div style="position:absolute;left:38px;right:38px;bottom:38px;height:140px;border:1px solid rgba(184,255,106,.18);border-radius:16px;background:rgba(184,255,106,.035);overflow:hidden">
          ${Array.from({ length: 34 }, (_, i) => `<span style="position:absolute;bottom:0;left:${i * 3}%;width:1.4%;height:${28 + Math.round(Math.sin(i * .72) * 22 + Math.cos(i * .31) * 18 + 42)}%;background:#b8ff6a;box-shadow:0 0 16px rgba(184,255,106,.48);opacity:${.28 + (i % 5) * .12}"></span>`).join("")}
        </div>
      </div>
      <div class="vignette"></div>
      <div class="scanline"></div>
    </div>`;
}

function aboutScene() {
    return `
    <div class="frame" style="background:
      radial-gradient(circle at 42% 30%, rgba(255,207,138,.18), transparent 28%),
      radial-gradient(circle at 72% 68%, rgba(94,231,255,.10), transparent 28%),
      linear-gradient(145deg,#07080b,#14100c 54%,#08090c)">
      <div class="noise" style="mask-image:none;opacity:.12"></div>
      <div style="position:absolute;inset:70px 62px;border-radius:26px;border:1px solid rgba(255,207,138,.18);background:rgba(255,255,255,.035);box-shadow:0 40px 120px rgba(0,0,0,.58);overflow:hidden">
        <div style="position:absolute;left:38px;top:46px;width:54%;height:52%;border-radius:18px;background:linear-gradient(145deg,#101820,#07090d);border:1px solid rgba(94,231,255,.18);box-shadow:0 0 45px rgba(94,231,255,.08)">
          <div class="window-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span style="margin-left:10px">technical notes</span></div>
          <div class="code-lines">${lines(13)}</div>
        </div>
        <div style="position:absolute;right:44px;top:60px;width:32%;height:45%;border-radius:18px;background:#f1d7aa;transform:rotate(3deg);box-shadow:0 28px 80px rgba(0,0,0,.38);padding:28px;color:#1b1711">
          <div style="font-size:15px;font-weight:800;letter-spacing:.08em;text-transform:uppercase">dossier</div>
          ${Array.from({ length: 8 }, (_, i) => `<span style="display:block;margin-top:${i ? 13 : 24}px;width:${[82,62,74,54,88,42,69,58][i]}%;height:8px;background:rgba(27,23,17,.25);border-radius:20px"></span>`).join("")}
        </div>
        <div style="position:absolute;left:70px;bottom:78px;width:56%;height:170px;border-radius:24px;background:linear-gradient(145deg,#151a1e,#07080b);border:1px solid rgba(255,207,138,.18);transform:perspective(700px) rotateX(48deg) rotateZ(-5deg);box-shadow:0 32px 70px rgba(0,0,0,.48)"></div>
        <div style="position:absolute;right:115px;bottom:88px;width:110px;height:148px;border-radius:18px;background:linear-gradient(145deg,#15181d,#07080b);border:1px solid rgba(94,231,255,.14);box-shadow:0 20px 44px rgba(0,0,0,.42)"></div>
      </div>
      <div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(7,8,11,.72),transparent 54%)"></div>
      <div class="scanline"></div>
    </div>`;
}

function tcaScene() {
    return dashboardShell({
        accent: "#5ee7ff",
        title: "TCA Crypto Analyzer",
        nav: ["Markets", "Signals", "Watchlist", "Risk"],
        stats: [["BTC", "+2.8%"], ["ETH", "+1.4%"], ["SOL", "-0.6%"]],
        rows: [
            ["BTCUSDT", "Long bias", "82", "active"],
            ["ETHUSDT", "Breakout", "74", "watch"],
            ["BNBUSDT", "Range", "51", "cooldown"],
            ["SOLUSDT", "Volatility", "68", "review"],
        ],
    });
}

function bonarioScene() {
    return dashboardShell({
        accent: "#ffca5f",
        title: "Bonario Product Hub",
        nav: ["Products", "Sync", "Pricing", "Odoo"],
        stats: [["SKU", "482"], ["Sync", "OK"], ["Queue", "17"]],
        rows: [
            ["BR-2048", "Redacted product", "Synced", "edit"],
            ["BR-1180", "Sanitized item", "Draft", "review"],
            ["BR-3321", "Hidden price", "Queued", "sync"],
            ["BR-0874", "Private catalog", "Error", "fix"],
        ],
    });
}

function aiWorkflowScene() {
    return `
    <div class="frame" style="background:
      radial-gradient(circle at 72% 36%, rgba(184,255,106,.16), transparent 34%),
      radial-gradient(circle at 28% 80%, rgba(0,200,150,.14), transparent 30%),
      linear-gradient(135deg,#07080b,#07120f 52%,#090e14)">
      <div class="noise" style="mask-image:none"></div>
      <div style="position:absolute;inset:54px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:22px">
        ${terminal("codex.session", ["read repo context", "apply focused patch", "npm run build", "layout qa pass"], "#b8ff6a")}
        ${terminal("vscode.diff", ["src/App.jsx +12 -4", "assets updated", "metadata adjusted", "no secrets found"], "#5ee7ff")}
        ${terminal("mcp.check", ["filesystem ok", "playwright ready", "browser screenshot", "handoff clean"], "#00c896")}
        <div class="panel" style="padding:26px;display:grid;grid-template-columns:1fr 1fr;gap:18px">
          <div style="grid-column:1/-1" class="label">operator loop</div>
          ${["Plan", "Patch", "Build", "Audit"].map((item, i) => `<div style="border-radius:16px;padding:22px;background:rgba(184,255,106,.06);border:1px solid rgba(184,255,106,.14)"><div class="value" style="font-size:24px;color:${i === 3 ? "#00c896" : "#eaffd3"}">${item}</div><div class="label" style="margin-top:8px">step ${String(i + 1).padStart(2, "0")}</div></div>`).join("")}
        </div>
      </div>
      <div class="scanline"></div>
    </div>`;
}

function terminal(title, entries, accent) {
    return `<div class="monitor" style="position:relative;inset:auto;width:100%;height:100%;border-color:${accent}44;box-shadow:0 20px 70px rgba(0,0,0,.35),0 0 42px ${accent}20">
      <div class="window-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span style="margin-left:10px">${title}</span></div>
      <pre style="margin:0;padding:24px;color:${accent};font:700 19px/1.65 Consolas,monospace;text-shadow:0 0 18px ${accent}33">${entries.map((entry) => `$ ${entry}`).join("\n")}</pre>
    </div>`;
}

function dashboardShell({ accent, title, nav, stats, rows }) {
    return `
    <div class="frame" style="background:
      radial-gradient(circle at 82% 30%, ${accent}24, transparent 30%),
      linear-gradient(135deg,#07080b,#0b1016 55%,#080b10)">
      <div class="noise" style="mask-image:none;opacity:.11"></div>
      <div style="position:absolute;inset:48px;border-radius:24px;border:1px solid ${accent}33;background:rgba(7,11,16,.96);box-shadow:0 36px 110px rgba(0,0,0,.58);display:grid;grid-template-columns:230px 1fr;overflow:hidden">
        <aside style="border-right:1px solid rgba(255,255,255,.08);padding:28px;background:rgba(255,255,255,.025)">
          <div style="font-size:20px;font-weight:900;color:#f5fcff">${title}</div>
          <div style="margin-top:30px;display:grid;gap:12px">${nav.map((item, i) => `<div style="padding:12px 14px;border-radius:12px;background:${i === 1 ? `${accent}1f` : "rgba(255,255,255,.035)"};color:${i === 1 ? accent : "rgba(223,248,255,.66)"};font-weight:800">${item}</div>`).join("")}</div>
        </aside>
        <main style="padding:30px;display:grid;grid-template-rows:auto 1fr auto;gap:22px">
          <div style="display:grid;grid-template-columns:1fr 220px;gap:18px;align-items:center">
            <div style="height:44px;border-radius:999px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.045);color:rgba(223,248,255,.48);display:flex;align-items:center;padding:0 18px;font-weight:700">Search / filter sanitized data</div>
            <div style="height:44px;border-radius:999px;background:${accent};color:#061014;font-weight:900;display:flex;align-items:center;justify-content:center">Action queue</div>
          </div>
          <div style="display:grid;grid-template-columns:1.15fr .85fr;gap:22px;min-height:0">
            <div class="panel" style="padding:22px">
              <div class="label">primary signal surface</div>
              <div class="chart" style="height:300px;margin:18px 0 0;border-color:${accent}33"><div class="spark" style="background:linear-gradient(180deg,${accent}cc,${accent}08)"></div><div class="candles">${candles([accent, "#b8ff6a", "#ff6b6b"])}</div></div>
            </div>
            <div class="panel" style="padding:22px;display:grid;gap:16px">
              ${stats.map(([label, value]) => `<div><div class="label">${label}</div><div class="value" style="color:${accent}">${value}</div></div>`).join("")}
            </div>
          </div>
          <div class="panel table" style="--accent:${accent}">
            ${rows.map((row) => `<div class="row"><strong>${row[0]}</strong><span>${row[1]}</span><span>${row[2]}</span><span class="chip">${row[3]}</span></div>`).join("")}
          </div>
        </main>
      </div>
      <div class="scanline"></div>
    </div>`;
}

function iconScene() {
    return `
    <div style="width:180px;height:180px;background:#07080b;display:grid;place-items:center">
      <div style="width:158px;height:158px;border-radius:50%;background:linear-gradient(135deg,#5ee7ff,#b8ff6a);padding:5px;box-shadow:0 0 34px rgba(94,231,255,.30)">
        <div style="width:100%;height:100%;border-radius:50%;background:radial-gradient(circle at 62% 25%,#10222a,#07080b 66%);display:grid;place-items:center;color:#9eefff;font:900 58px/1 'Segoe UI',Arial,sans-serif;letter-spacing:-3px;text-shadow:0 0 22px rgba(94,231,255,.55)">VD</div>
      </div>
    </div>`;
}

function documentFor(markup) {
    return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${markup}</body></html>`;
}

async function render(page, { name, width, height, html, formats }) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.setContent(documentFor(html), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);

    for (const format of formats) {
        const output = path.join(OUT_DIR, `${name}.${format.ext}`);
        await page.screenshot({
            path: output,
            type: format.type,
            quality: format.quality,
            captureBeyondViewport: false,
            omitBackground: false,
        });
        const stat = await fs.stat(output);
        console.log(`${path.relative(ROOT, output)} ${Math.round(stat.size / 1024)}KB`);
    }
}

async function main() {
    await fs.mkdir(OUT_DIR, { recursive: true });
    const browser = await puppeteer.launch({
        executablePath: findChrome(),
        headless: "new",
        args: ["--no-sandbox", "--disable-gpu", "--font-render-hinting=none"],
    });
    const page = await browser.newPage();

    const webpJpg = [
        { ext: "webp", type: "webp", quality: 86 },
        { ext: "jpg", type: "jpeg", quality: 88 },
    ];

    await render(page, {
        name: "signal-workstation-hero-v2",
        width: 1200,
        height: 630,
        html: heroScene({ og: true }),
        formats: webpJpg,
    });
    await render(page, {
        name: "signal-hero-generated-1536",
        width: 1536,
        height: 864,
        html: labScene(),
        formats: webpJpg,
    });
    await render(page, {
        name: "signal-about-dossier",
        width: 900,
        height: 1200,
        html: aboutScene(),
        formats: webpJpg,
    });
    await render(page, {
        name: "signal-case-tca-dashboard",
        width: 1200,
        height: 800,
        html: tcaScene(),
        formats: webpJpg,
    });
    await render(page, {
        name: "signal-case-bonario-hub",
        width: 1200,
        height: 800,
        html: bonarioScene(),
        formats: webpJpg,
    });
    await render(page, {
        name: "signal-case-ai-workflow",
        width: 1200,
        height: 800,
        html: aiWorkflowScene(),
        formats: webpJpg,
    });
    await render(page, {
        name: "apple-touch-icon",
        width: 180,
        height: 180,
        html: iconScene(),
        formats: [{ ext: "png", type: "png" }],
    });

    await browser.close();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
