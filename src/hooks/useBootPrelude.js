import { useCallback, useEffect, useState } from "react";

function canShowPrelude() {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useBootPrelude(enabled = true) {
    const [bootOpen, setBootOpen] = useState(() => enabled && canShowPrelude());

    useEffect(() => {
        if (!enabled || !canShowPrelude()) {
            setBootOpen(false);
            return undefined;
        }

        setBootOpen(true);
        const timer = window.setTimeout(() => setBootOpen(false), 1650);
        return () => window.clearTimeout(timer);
    }, [enabled]);

    const closeBoot = useCallback(() => {
        setBootOpen(false);
    }, []);

    return { bootOpen, closeBoot };
}
