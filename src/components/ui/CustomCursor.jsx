import { useEffect, useRef, useState } from "react";

export function CustomCursor({
    activeSection,
    enabled,
    mode,
    presentationMode,
}) {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [variant, setVariant] = useState("idle");

    useEffect(() => {
        if (!enabled) {
            setVariant("idle");
            return undefined;
        }

        let dotX = window.innerWidth / 2;
        let dotY = window.innerHeight / 2;
        let ringX = dotX;
        let ringY = dotY;
        let raf = 0;

        const render = () => {
            ringX += (dotX - ringX) * 0.18;
            ringY += (dotY - ringY) * 0.18;
            if (dotRef.current)
                dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
            if (ringRef.current)
                ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            raf = window.requestAnimationFrame(render);
        };

        const move = (event) => {
            dotX = event.clientX;
            dotY = event.clientY;
        };

        const over = (event) => {
            const target = event.target.closest("[data-cursor], a, button");
            if (!target) {
                setVariant("idle");
                return;
            }

            const cursorMode = target.getAttribute("data-cursor");
            if (cursorMode) {
                setVariant(cursorMode);
                return;
            }

            setVariant("active");
        };

        const down = (event) => {
            if (event.target.closest("a, button, [data-cursor]")) {
                setVariant("drag");
            }
        };

        const up = () => {
            setVariant("idle");
        };

        const onVisibility = () => {
            if (document.visibilityState === "visible") {
                if (!raf) raf = window.requestAnimationFrame(render);
            } else {
                window.cancelAnimationFrame(raf);
                raf = 0;
            }
        };

        window.addEventListener("pointermove", move, { passive: true });
        window.addEventListener("pointerover", over, { passive: true });
        window.addEventListener("pointerout", over, { passive: true });
        window.addEventListener("pointerdown", down, { passive: true });
        window.addEventListener("pointerup", up, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);
        raf = window.requestAnimationFrame(render);

        return () => {
            window.cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerover", over);
            window.removeEventListener("pointerout", over);
            window.removeEventListener("pointerdown", down);
            window.removeEventListener("pointerup", up);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <div
            className={`custom-cursor variant-${variant} mode-${mode} ${presentationMode ? "presentation" : ""}`}
            data-active-section={activeSection}
            aria-hidden="true"
        >
            <span ref={ringRef} className="cursor-ring" />
            <span ref={dotRef} className="cursor-dot" />
        </div>
    );
}
