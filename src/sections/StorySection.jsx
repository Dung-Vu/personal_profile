import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { StaticStory } from "./Story.jsx";

const loadFilm = () => import("../film/FilmStory.jsx");
const FilmStory = lazy(loadFilm);

// Mặc định hiện bản tĩnh (cũng là bản prerender). Khi trang đã tải xong, máy không bật giảm chuyển động
// và màn đủ cao thì tải phim ở nền, rồi thay vào lúc người xem chưa cuộn tới đoạn câu chuyện (không giật trang).
const MIN_H = 620;

function canFilm() {
    if (typeof window === "undefined" || window.__PRERENDER__) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return window.innerHeight >= MIN_H && window.innerWidth >= 340;
}

export function StorySection() {
    const [mode, setMode] = useState("static");
    const hostRef = useRef(null);

    useEffect(() => {
        if (!canFilm()) return;
        let alive = true;
        let onScroll;
        const above = () => {
            const el = hostRef.current?.firstElementChild;
            // Khung 0 của phim trùng bản tĩnh chương 1, nên chỉ cần người xem chưa cuộn vào đoạn này.
            return el && el.getBoundingClientRect().top >= 0;
        };
        const start = () =>
            loadFilm().then(() => {
                if (!alive) return;
                if (above()) return setMode("film");
                onScroll = () => {
                    if (above()) {
                        window.removeEventListener("scroll", onScroll);
                        setMode("film");
                    }
                };
                window.addEventListener("scroll", onScroll, { passive: true });
            });
        const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 400));
        const id = idle(start, { timeout: 2500 });

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onMotion = () => mq.matches && setMode("off");
        mq.addEventListener("change", onMotion);
        return () => {
            alive = false;
            window.cancelIdleCallback?.(id);
            if (onScroll) window.removeEventListener("scroll", onScroll);
            mq.removeEventListener("change", onMotion);
        };
    }, []);

    return (
        <div ref={hostRef} className="story-host">
            {mode === "film" ? (
                <Suspense fallback={<StaticStory />}>
                    <FilmStory onUnfit={() => setMode("off")} />
                </Suspense>
            ) : (
                <StaticStory />
            )}
        </div>
    );
}
