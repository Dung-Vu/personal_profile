// Prerender mọi route (21 route: 10 VI + 10 EN + /404) thành HTML tĩnh lúc build — không cần trình duyệt, chạy được trên Cloudflare Pages.
// Cần chạy sau: vite build (client, có manifest) và vite build --ssr src/entry-server.jsx --outDir dist-ssr.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROUTE_MODULES, getCanonicalUrl, getRouteMeta, prerenderRoutes } from "../src/routes/siteRoutes.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const DIST_SSR = path.join(ROOT, "dist-ssr");

const VITE_MANIFEST = path.join(DIST, ".vite/manifest.json");
const SAVED_MANIFEST = path.join(DIST_SSR, "client-manifest.json");
const DIST_INDEX = path.join(DIST, "index.html");
const SAVED_TEMPLATE = path.join(DIST_SSR, "client-template.html");

fs.mkdirSync(DIST_SSR, { recursive: true });

let manifestPath;
if (fs.existsSync(VITE_MANIFEST)) {
    fs.copyFileSync(VITE_MANIFEST, SAVED_MANIFEST);
    manifestPath = VITE_MANIFEST;
} else if (fs.existsSync(SAVED_MANIFEST)) {
    manifestPath = SAVED_MANIFEST;
} else {
    throw new Error("Không tìm thấy manifest client (dist/.vite/manifest.json hoặc dist-ssr/client-manifest.json). Hãy chạy `pnpm build` trước.");
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

let template = fs.existsSync(DIST_INDEX) ? fs.readFileSync(DIST_INDEX, "utf8") : "";
if (template.includes('<div id="root"></div>')) {
    fs.writeFileSync(SAVED_TEMPLATE, template);
} else if (fs.existsSync(SAVED_TEMPLATE)) {
    template = fs.readFileSync(SAVED_TEMPLATE, "utf8");
}
if (!template.includes('<div id="root"></div>')) {
    throw new Error('Template HTML thiếu điểm gắn <div id="root"></div>. Hãy chạy `vite build` trước khi prerender.');
}

const { render } = await import(pathToFileURL(path.join(DIST_SSR, "entry-server.js")).href);

function resolveManifestKey(key) {
    if (!key) return null;
    if (manifest[key]) return key;
    const baseName = path.basename(key, path.extname(key));
    // Vite có thể gom chunk động chia sẻ dưới khóa "_Home-<hash>.js" (không có trường src).
    const entryDynamic = manifest["index.html"]?.dynamicImports ?? [];
    for (const k of entryDynamic) {
        const m = manifest[k];
        if (m && (m.src === key || (m.isDynamicEntry && m.name === baseName))) return k;
    }
    for (const [k, m] of Object.entries(manifest)) {
        if (m && (m.src === key || (m.isDynamicEntry && m.name === baseName))) return k;
    }
    throw new Error(`Không tìm thấy chunk cho ${key} trong client-manifest.json`);
}

function assetsOf(key) {
    const css = new Set();
    const js = new Set();
    const seen = new Set();
    const walk = (k) => {
        if (seen.has(k) || !manifest[k]) return;
        seen.add(k);
        const m = manifest[k];
        if (m.isEntry) return; // entry đã có sẵn trong index.html
        if (!template.includes(m.file)) js.add(m.file);
        (m.css ?? []).forEach((c) => css.add(c));
        (m.imports ?? []).forEach((i) => walk(i));
    };
    const resolvedKey = resolveManifestKey(key);
    if (resolvedKey) walk(resolvedKey);
    return { css: [...css], js: [...js] };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const setAttr = (html, selector, value) =>
    html.replace(selector, (tag) => tag.replace(/content="[^"]*"/, () => `content="${esc(value)}"`));

function routeKind(route) {
    const base = route === "/en" ? "/" : route.startsWith("/en/") ? route.slice(3) : route;
    if (base === "/") return "home";
    if (base === "/404") return "404";
    return base.split("/")[1] || "home";
}

function headFor(route) {
    const meta = getRouteMeta(route);
    const url = getCanonicalUrl(route);
    const lang = meta.lang || "vi";
    const ogLocale = meta.ogLocale || (lang === "en" ? "en_US" : "vi_VN");
    let h = template;
    h = h.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(meta.title)}</title>`);
    h = setAttr(h, /<meta name="description"[^>]*>/, meta.desc);
    h = setAttr(h, /<meta name="robots"[^>]*>/, meta.robots);
    h = setAttr(h, /<meta property="og:type"[^>]*>/, meta.ogType);
    h = setAttr(h, /<meta property="og:url"[^>]*>/, url);
    if (meta.siteName) h = setAttr(h, /<meta property="og:site_name"[^>]*>/, meta.siteName);
    h = setAttr(h, /<meta property="og:title"[^>]*>/, meta.title);
    h = setAttr(h, /<meta property="og:description"[^>]*>/, meta.desc);
    h = setAttr(h, /<meta property="og:image"[^>]*>/, meta.image);
    h = setAttr(h, /<meta property="og:image:alt"[^>]*>/, meta.imageAlt);
    h = setAttr(h, /<meta property="og:locale"[^>]*>/, ogLocale);
    h = setAttr(h, /<meta name="twitter:title"[^>]*>/, meta.title);
    h = setAttr(h, /<meta name="twitter:description"[^>]*>/, meta.desc);
    h = setAttr(h, /<meta name="twitter:image"[^>]*>/, meta.image);
    // Dọn hreflang sẵn có (nếu có) trước khi chèn mới.
    h = h.replace(/\s*<link\b(?=[^>]*\brel="alternate")(?=[^>]*\bhreflang=)[^>]*>/g, () => "");
    if (route === "/404") {
        h = h.replace(/\s*<link rel="canonical"[^>]*>/, () => "");
    } else {
        const hreflangs = meta.alternates
            ? [
                  `<link rel="alternate" hreflang="vi" href="${esc(meta.alternates.vi)}" />`,
                  `<link rel="alternate" hreflang="en" href="${esc(meta.alternates.en)}" />`,
                  `<link rel="alternate" hreflang="x-default" href="${esc(meta.alternates.xDefault)}" />`,
              ].join("\n    ")
            : "";
        const canonicalBlock = hreflangs
            ? `<link rel="canonical" href="${esc(url)}" />\n    ${hreflangs}`
            : `<link rel="canonical" href="${esc(url)}" />`;
        h = h.replace(/<link rel="canonical"[^>]*>/, () => canonicalBlock);
    }
    h = h.replace(
        /(<script id="route-structured-data" type="application\/ld\+json">)[\s\S]*?(<\/script>)/,
        (_, a, b) => `${a}${JSON.stringify(meta.schema).replace(/</g, "\\u003c")}${b}`,
    );
    // Ảnh chân dung chỉ là LCP ở trang chủ (cả VI `/` và EN `/en`); trang khác bỏ preload để không tranh băng thông.
    if (route !== "/" && route !== "/en") {
        h = h.replace(/\s*<link\b(?=[^>]*\brel="preload")(?=[^>]*\bas="image")[^>]*>/, () => "");
    }
    const { css, js } = assetsOf(ROUTE_MODULES[route]);
    const extra = [
        ...css.map((f) => `<link rel="stylesheet" crossorigin href="/${f}">`),
        ...js.map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`),
    ].join("\n    ");
    if (extra) h = h.replace("</head>", () => `    ${extra}\n  </head>`);
    const kind = routeKind(route);
    return h.replace(/<html\s+lang="[^"]*"[^>]*>/, () => `<html lang="${esc(lang)}" data-route="${esc(kind)}">`);
}

// React 19 tự chèn <link rel="preload" as="image" .../> không có media query vào đầu #root khi gặp img fetchPriority="high".
// Bỏ thẻ trùng/thiếu media trong body để trang chủ chỉ giữ preload desktop-only ở <head> và không phát preload dư trong #root.
const REACT_FLOAT_IMG_PRELOAD = /<link\b(?=[^>]*\brel="preload")(?=[^>]*\bas="image")[^>]*\/?>/g;

let ok = 0;
for (const route of prerenderRoutes) {
    const body = (await render(route)).replace(REACT_FLOAT_IMG_PRELOAD, () => "");
    const html = headFor(route).replace('<div id="root"></div>', () => `<div id="root" data-ssr="${route}">${body}</div>`);
    // Cloudflare Pages phục vụ /en từ en.html, /en/work từ en/work.html, /work/evone từ work/evone.html, không chuyển hướng thêm "/".
    const outs =
        route === "/" ? ["index.html"]
        : route === "/404" ? ["404.html"]
        : [`${route.slice(1)}.html`];
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
// Manifest chỉ dùng lúc build, không đưa lên host (đã lưu bản sao tại dist-ssr/client-manifest.json cho lần chạy prerender độc lập).
fs.rmSync(path.join(DIST, ".vite"), { recursive: true, force: true });
