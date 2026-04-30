import { useEffect, useState } from "react";
import { normalizePath } from "../routes/routes";

export function navigateTo(path) {
    const nextPath = normalizePath(path);
    if (window.location.pathname === nextPath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    window.history.pushState(null, "", nextPath);
    window.dispatchEvent(new Event("popstate"));
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
