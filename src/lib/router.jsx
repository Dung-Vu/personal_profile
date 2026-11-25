import { useSyncExternalStore } from "react";
import { normalizePath } from "../routes/siteRoutes.js";

// Router nhỏ dùng history API — đủ cho 5 loại trang, không cần thư viện.
const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn());

function onPopState() {
    emit();
    if (window.location.hash) {
        scrollToHash(window.location.hash);
    }
}

function subscribe(fn) {
    if (listeners.size === 0) {
        window.addEventListener("popstate", onPopState);
    }
    listeners.add(fn);
    return () => {
        listeners.delete(fn);
        if (listeners.size === 0) {
            window.removeEventListener("popstate", onPopState);
        }
    };
}

const getPath = () => normalizePath(window.location.pathname);

// Lúc prerender lúc build (không có window), route lấy từ biến này.
let serverPath = "/";
export const setServerPath = (pathname) => {
    serverPath = normalizePath(pathname);
};

export function usePath() {
    return useSyncExternalStore(subscribe, getPath, () => serverPath);
}

// Cuộn tới #hash; thử lại vài khung vì trang lazy có thể chưa render xong.
export function scrollToHash(hash, tries = 30) {
    if (!hash) return;
    let id;
    try {
        id = decodeURIComponent(hash.slice(1));
    } catch {
        return;
    }
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        return;
    }
    if (tries > 0) requestAnimationFrame(() => scrollToHash(hash, tries - 1));
}

export function navigate(href) {
    const url = new URL(href, window.location.href);
    if (url.href !== window.location.href) window.history.pushState({}, "", url);
    if (url.hash) {
        scrollToHash(url.hash);
    } else {
        window.scrollTo(0, 0);
    }
    emit();
}

export function Link({ href, onClick, children, ...rest }) {
    const handle = (e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (Boolean(rest.download) || rest.download === "" || (rest.target && rest.target !== "_self")) return;
        if (!href) return;
        let url;
        try {
            url = new URL(href, window.location.href);
        } catch {
            return;
        }
        if ((url.protocol !== "http:" && url.protocol !== "https:") || url.origin !== window.location.origin) return;
        e.preventDefault();
        navigate(href);
    };
    return (
        <a href={href} onClick={handle} {...rest}>
            {children}
        </a>
    );
}
