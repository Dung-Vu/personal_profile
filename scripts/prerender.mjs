// Prerender mọi route thành HTML tĩnh lúc build — không cần trình duyệt, nên chạy được trên Cloudflare Pages.
// Cần chạy sau: vite build (client, có manifest) và vite build --ssr src/entry-server.jsx --outDir dist-ssr.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getCanonicalUrl, getRouteMeta, prerenderRoutes } from "../src/routes/siteRoutes.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const manifest = JSON.parse(fs.readFileSync(path.join(DIST, ".vite/manifest.json"), "utf8"));
const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
const { render } = await import(pathToFileURL(path.join(ROOT, "dist-ssr/entry-server.js")).href);

// Trang lazy của từng route: chèn sẵn CSS (tránh nháy chưa có style) và modulepreload chunk JS.
const pageOf = (route) =>
    route === "/" ? null
    : route === "/work" ? "src/pages/Work.jsx"
    : route.startsWith("/work/") ? "src/pages/CaseDetail.jsx"
    : route === "/about" ? "src/pages/About.jsx"
    : route === "/contact" ? "src/pages/Contact.jsx"
    : "src/pages/NotFound.jsx";

function assetsOf(key) {
    const css = new Set();
    const js = new Set();
    const seen = new Set();
    const walk = (k, top) => {
        if (seen.has(k) || !manifest[k]) return;
        seen.add(k);
        const m = manifest[k];
        if (m.isEntry) return; // entry đã có sẵn trong index.html
        if (!template.includes(m.file)) js.add(m.file);
        (m.css ?? []).forEach((c) => css.add(c));
        (m.imports ?? []).forEach((i) => walk(i, false));
    };
    if (key) walk(key, true);
    return { css: [...css], js: [...js] };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const setAttr = (html, selector, value) => html.replace(selector, (tag) => tag.replace(/content="[^"]*"/, `content="${esc(value)}"`));

function headFor(route) {
    const meta = getRouteMeta(route);
    const url = getCanonicalUrl(route);
    let h = template;
    h = h.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
    h = setAttr(h, /<meta name="description"[^>]*>/, meta.desc);
    h = setAttr(h, /<meta name="robots"[^>]*>/, meta.robots);
    h = setAttr(h, /<meta property="og:type"[^>]*>/, meta.ogType);
    h = setAttr(h, /<meta property="og:url"[^>]*>/, url);
    h = setAttr(h, /<meta property="og:title"[^>]*>/, meta.title);
    h = setAttr(h, /<meta property="og:description"[^>]*>/, meta.desc);
    h = setAttr(h, /<meta property="og:image"[^>]*>/, meta.image);
    h = setAttr(h, /<meta property="og:image:alt"[^>]*>/, meta.imageAlt);
    h = setAttr(h, /<meta name="twitter:title"[^>]*>/, meta.title);
    h = setAttr(h, /<meta name="twitter:description"[^>]*>/, meta.desc);
    h = setAttr(h, /<meta name="twitter:image"[^>]*>/, meta.image);
    h = h.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${esc(url)}" />`);
    h = h.replace(
        /(<script id="route-structured-data" type="application\/ld\+json">)[\s\S]*?(<\/script>)/,
        (_, a, b) => `${a}${JSON.stringify(meta.schema).replace(/</g, "\\u003c")}${b}`,
    );
    // Ảnh chân dung chỉ là LCP ở trang chủ; trang khác bỏ preload để không tranh băng thông.
    if (route !== "/") h = h.replace(/\s*<link rel="preload" as="image"[^>]*>/, "");
    const { css, js } = assetsOf(pageOf(route));
    const extra = [
        ...css.map((f) => `<link rel="stylesheet" crossorigin href="/${f}">`),
        ...js.map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`),
    ].join("\n    ");
    if (extra) h = h.replace("</head>", `    ${extra}\n  </head>`);
    const kind = route === "/" ? "home" : route.split("/")[1];
    return h.replace('<html lang="vi">', `<html lang="vi" data-route="${kind}">`);
}

let ok = 0;
for (const route of prerenderRoutes) {
    const body = await render(route);
    const html = headFor(route).replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    const outs =
        route === "/" ? ["index.html"]
        : route === "/404" ? ["404.html"]
        : [`${route.slice(1)}.html`]; // Cloudflare Pages phục vụ /work/evone từ work/evone.html, không chuyển hướng thêm "/"
    for (const o of outs) {
        const file = path.join(DIST, o);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
    }
    if (!body.includes("<h1")) throw new Error(`${route}: thiếu <h1> sau khi render`);
    console.log(`  ${route} -> ${getRouteMeta(route).title.slice(0, 70)}`);
    ok++;
}
console.log(`Prerender xong ${ok}/${prerenderRoutes.length} route.`);
// Manifest chỉ dùng lúc build, không đưa lên host.
fs.rmSync(path.join(DIST, ".vite"), { recursive: true, force: true });
