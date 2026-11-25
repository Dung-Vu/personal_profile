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

// Đồng bộ title, description, canonical, og/twitter và JSON-LD theo route hiện tại.
export function applyRouteMeta(pathname) {
    const route = getRoute(pathname);
    const { meta } = route;
    const isNotFound = route.path === "/404";
    const url = getCanonicalUrl(route.path);

    document.title = meta.title;
    setMeta("name", "description", meta.desc);
    setMeta("name", "robots", meta.robots);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.desc);
    setMeta("property", "og:type", meta.ogType);
    setMeta("property", "og:url", url);
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

    let ld = document.getElementById("route-structured-data");
    if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "route-structured-data";
        document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(meta.schema);
}
