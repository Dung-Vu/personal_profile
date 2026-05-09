import { useEffect, useState } from "react";
import { normalizePath } from "../routes/routes";

export function navigateTo(path) {
    const nextPath = normalizePath(path);
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    if (window.location.pathname === nextPath) {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        return;
    }

    const run = () => {
        document.documentElement.dataset.routeTransition = nextPath.startsWith("/work/")
            ? "work-case"
            : "generic";
        window.history.pushState(null, "", nextPath);
        window.dispatchEvent(new Event("popstate"));
    };

    if (document.startViewTransition && !prefersReducedMotion) {
        const transition = document.startViewTransition(run);
        transition.finished.finally(() => {
            delete document.documentElement.dataset.routeTransition;
        });
    } else {
        run();
        window.setTimeout(() => {
            delete document.documentElement.dataset.routeTransition;
        }, 350);
    }
}

export function useRoutePath() {
    const [path, setPath] = useState(() => normalizePath(window.location.pathname));

    useEffect(() => {
        const onPopState = () => setPath(normalizePath(window.location.pathname));
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [path]);

    return path;
}
