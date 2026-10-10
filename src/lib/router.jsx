import { useSyncExternalStore } from "react";
import { normalizePath } from "../routes/siteRoutes.js";

// Router nhỏ dùng history API — đủ cho 5 loại trang, không cần thư viện.
const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn());

function subscribe(fn) {
    listeners.add(fn);
    window.addEventListener("popstate", fn);
    return () => {
        listeners.delete(fn);
        window.removeEventListener("popstate", fn);
    };
}

const getPath = () => normalizePath(window.location.pathname);

export function usePath() {
    return useSyncExternalStore(subscribe, getPath, () => "/");
}

// Cuộn tới #hash; thử lại vài khung vì trang lazy có thể chưa render xong.
export function scrollToHash(hash, tries = 30) {
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) {
        el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        return;
    }
    if (tries > 0) requestAnimationFrame(() => scrollToHash(hash, tries - 1));
}

export function navigate(href) {
    const url = new URL(href, window.location.href);
    const samePage = normalizePath(url.pathname) === getPath();
    if (url.href !== window.location.href) window.history.pushState({}, "", url);
    if (url.hash) {
        scrollToHash(url.hash);
    } else if (!samePage) {
        window.scrollTo(0, 0);
    }
    emit();
}

export function Link({ href, onClick, children, ...rest }) {
    const handle = (e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (rest.target === "_blank") return;
        e.preventDefault();
        navigate(href);
    };
    return (
        <a href={href} onClick={handle} {...rest}>
            {children}
        </a>
    );
}
