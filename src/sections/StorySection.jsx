import { Suspense, lazy, startTransition, useEffect, useRef, useState } from "react";
import { StaticStory } from "./Story.jsx";

const loadFilm = () => import("../film/FilmStory.jsx");
const FilmStory = lazy(loadFilm);

// Mặc định hiện bản tĩnh (cũng là bản prerender). Khi người xem bắt đầu tương tác, máy không bật giảm chuyển động
// và màn đủ cao thì tải phim, rồi thay vào lúc người xem chưa cuộn tới đoạn câu chuyện (không giật trang).
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
                // Gắn phim trong transition: React chia nhỏ việc render, không khoá luồng chính một mạch.
                const show = () => startTransition(() => setMode("film"));
                if (above()) return show();
                onScroll = () => {
                    if (above()) {
                        window.removeEventListener("scroll", onScroll);
                        show();
                    }
                };
                window.addEventListener("scroll", onScroll, { passive: true });
            });
        // Chỉ tải phim khi người xem bắt đầu tương tác (di chuột, chạm, cuộn, phím): trang vừa mở không phải gánh
        // việc dựng phim, còn người xem thì luôn kịp có phim trước khi cuộn qua hết phần hero.
        const events = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"];
        let started = false;
        const kick = () => {
            if (started) return;
            started = true;
            events.forEach((e) => window.removeEventListener(e, kick));
            start();
        };
        events.forEach((e) => window.addEventListener(e, kick, { passive: true }));

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onMotion = () => mq.matches && setMode("off");
        mq.addEventListener("change", onMotion);
        return () => {
            alive = false;
            events.forEach((e) => window.removeEventListener(e, kick));
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
