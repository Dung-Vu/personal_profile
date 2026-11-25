import { getCanonicalUrl, getRoute } from "../routes/siteRoutes.js";

function setMeta(attr, key, content) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

function syncAlternates(alternates) {
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (!alternates) return;
    const entries = [
        ["vi", alternates.vi],
        ["en", alternates.en],
        ["x-default", alternates.xDefault],
    ];
    for (const [hreflang, href] of entries) {
        if (!href) continue;
        const link = document.createElement("link");
        link.rel = "alternate";
        link.hreflang = hreflang;
        link.href = href;
        document.head.appendChild(link);
    }
}

// Đồng bộ lang, title, description, canonical, hreflang, og/twitter và JSON-LD theo route hiện tại.
export function applyRouteMeta(pathname) {
    const route = getRoute(pathname);
    const { meta } = route;
    const isNotFound = route.path === "/404";
    const url = getCanonicalUrl(route.path);

    document.documentElement.lang = meta.lang || "vi";
    document.title = meta.title;
    setMeta("name", "description", meta.desc);
    setMeta("name", "robots", meta.robots);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.desc);
    setMeta("property", "og:type", meta.ogType);
    setMeta("property", "og:url", url);
    if (meta.siteName) setMeta("property", "og:site_name", meta.siteName);
    setMeta("property", "og:locale", meta.ogLocale || (meta.lang === "en" ? "en_US" : "vi_VN"));
    setMeta("property", "og:image", meta.image);
    setMeta("property", "og:image:alt", meta.imageAlt);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.desc);
    setMeta("name", "twitter:image", meta.image);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (isNotFound) {
        canonical?.remove();
    } else if (canonical) {
        canonical.href = url;
    } else {
        const link = document.createElement("link");
        link.rel = "canonical";
        link.href = url;
        document.head.appendChild(link);
    }

    syncAlternates(isNotFound ? null : meta.alternates);

    let ld = document.getElementById("route-structured-data");
    if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "route-structured-data";
        document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(meta.schema);
}
