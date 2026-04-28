import { useEffect, useState } from "react";

const getMedia = (query) =>
    typeof window === "undefined" ? null : window.matchMedia(query);

export function useMotionPreference(motionEnabled) {
    const [prefersReduced, setPrefersReduced] = useState(false);
    const [pointerFine, setPointerFine] = useState(false);
    const [desktopWidth, setDesktopWidth] = useState(false);

    useEffect(() => {
        const reducedQuery = getMedia("(prefers-reduced-motion: reduce)");
        const pointerQuery = getMedia("(hover: hover) and (pointer: fine)");
        if (!reducedQuery || !pointerQuery) return undefined;

        const sync = () => {
            setPrefersReduced(reducedQuery.matches);
            setPointerFine(pointerQuery.matches);
            setDesktopWidth(window.innerWidth > 780);
        };

        sync();
        reducedQuery.addEventListener("change", sync);
        pointerQuery.addEventListener("change", sync);
        window.addEventListener("resize", sync);

        return () => {
            reducedQuery.removeEventListener("change", sync);
            pointerQuery.removeEventListener("change", sync);
            window.removeEventListener("resize", sync);
        };
    }, []);

    const canAnimate = motionEnabled && !prefersReduced;
    const canUseDesktopMotion = canAnimate && pointerFine && desktopWidth;

    useEffect(() => {
        document.body.classList.toggle("motion-muted", !canAnimate);
        document.body.classList.toggle("wow-motion", canUseDesktopMotion);

        return () => {
            document.body.classList.remove("motion-muted");
            document.body.classList.remove("wow-motion");
        };
    }, [canAnimate, canUseDesktopMotion]);

    return { prefersReduced, pointerFine, canAnimate, canUseDesktopMotion };
}
