import { usePath } from "./router.jsx";

export const LOCALES = ["vi", "en"];

function cleanPath(p = "/") {
    const clean = String(p || "/").split(/[?#]/)[0].replace(/\/+$/, "");
    return clean || "/";
}

export function getLocale(pathname = "/") {
    const clean = cleanPath(pathname);
    return clean === "/en" || clean.startsWith("/en/") ? "en" : "vi";
}

export function stripLocale(pathname = "/") {
    const clean = cleanPath(pathname);
    if (clean === "/en") return "/";
    if (clean.startsWith("/en/")) {
        return clean.slice(3) || "/";
    }
    return clean;
}

export function localizePath(basePath = "/", locale = "vi") {
    const raw = String(basePath || "/");
    const hashIdx = raw.indexOf("#");
    const hash = hashIdx >= 0 ? raw.slice(hashIdx) : "";
    const beforeHash = hashIdx >= 0 ? raw.slice(0, hashIdx) : raw;
    const queryIdx = beforeHash.indexOf("?");
    const query = queryIdx >= 0 ? beforeHash.slice(queryIdx) : "";
    const pathPart = queryIdx >= 0 ? beforeHash.slice(0, queryIdx) : beforeHash;
    const normalized = stripLocale(pathPart.startsWith("/") ? pathPart : `/${pathPart}`);
    if (locale === "en") {
        const enPath = normalized === "/" ? "/en" : `/en${normalized}`;
        return `${enPath}${query}${hash}`;
    }
    return `${normalized}${query}${hash}`;
}

export function switchLocalePath(currentPathname = "/", targetLocale = "en", hash = "") {
    const raw = String(currentPathname || "/");
    const base = stripLocale(raw);
    const localized = localizePath(base, targetLocale === "en" ? "en" : "vi");
    let rawHash = String(hash || "").trim();
    if (!rawHash) {
        const idx = raw.indexOf("#");
        if (idx >= 0) rawHash = raw.slice(idx).trim();
    }
    if (!rawHash || rawHash === "#") return localized;
    const normalizedHash = rawHash.startsWith("#") ? rawHash : `#${rawHash}`;
    return `${localized}${normalizedHash}`;
}

export function useLocale() {
    return getLocale(usePath());
}
