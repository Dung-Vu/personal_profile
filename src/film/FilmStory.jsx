import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { storyIntro } from "../content/story.js";
import { FILM_FRAMES } from "../lib/motion.js";
import { FrameContext, StoryFilm } from "./StoryFilm.jsx";
import "../styles/film.css";

// Đoạn cuộn kể chuyện: khung nhìn dính lại, cuộn tới đâu tua phim tới đó (cuộn ngược thì tua ngược).
// Mỗi chương ăn SCROLL_PER × chiều cao màn hình.
const SCROLL_PER = 1.1;
// Hằng số tắt dần theo thời gian thực (tương đương hệ số 0.18 ở 60Hz, đồng nhất giữa 30/60/120Hz).
const DAMP_K = 12;

function progressOf(el) {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
}

export default function FilmStory({ onUnfit }) {
    const sectionRef = useRef(null);
    const stickyRef = useRef(null);
    const [ready, setReady] = useState(false);
    const [frame, setFrame] = useState(0);
    const initialFrameRef = useRef(0);

    // Kiểm kích thước khung dính (bỏ qua w <= 0 || h <= 0 để không bao giờ vỡ layout khi thu nhỏ/ẩn).
    useLayoutEffect(() => {
        const el = stickyRef.current;
        if (!el) return;
        let raf = 0;

        const read = () => {
            const w = Math.round(el.clientWidth);
            const h = Math.round(el.clientHeight);
            if (w <= 0 || h <= 0) return;
            setReady(true);
        };

        const initial = Math.round(progressOf(sectionRef.current) * (FILM_FRAMES - 1));
        initialFrameRef.current = initial;
        setFrame(initial);
        read();

        const ro = new ResizeObserver(() => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                read();
            });
        });
        ro.observe(el);
        return () => {
            if (raf) cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, []);

    // Vòng tua theo sự kiện: chỉ chạy rAF khi cuộn/đổi cỡ và tự dừng hoàn toàn khi đã tới đích (0Hz lúc nghỉ).
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let raf = 0;
        let visible = false;
        let lastTime = 0;
        let current = initialFrameRef.current;
        let shown = initialFrameRef.current;

        const stop = () => {
            if (raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
            lastTime = 0;
        };

        const commit = (nextFrame) => {
            if (nextFrame !== shown) {
                shown = nextFrame;
                setFrame(nextFrame);
            }
        };

        const snap = () => {
            const target = progressOf(section) * (FILM_FRAMES - 1);
            current = target;
            commit(Math.round(current));
        };

        const tick = (now) => {
            raf = 0;
            if (!visible || document.hidden) {
                lastTime = 0;
                return;
            }
            const dt = lastTime ? Math.min(0.05, Math.max(0, (now - lastTime) / 1000)) : 1 / 60;
            lastTime = now;

            const target = progressOf(section) * (FILM_FRAMES - 1);
            const alpha = 1 - Math.exp(-DAMP_K * dt);
            current += (target - current) * alpha;
            if (Math.abs(target - current) < 0.05) {
                current = target;
            }

            commit(Math.round(current));

            if (current !== target) {
                raf = requestAnimationFrame(tick);
            } else {
                lastTime = 0;
            }
        };

        const wake = () => {
            if (!visible || document.hidden || raf) return;
            raf = requestAnimationFrame(tick);
        };

        const onVis = () => {
            if (document.hidden) {
                stop();
            } else if (visible) {
                snap();
            }
        };

        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            if (visible) {
                // Khớp tức thì vị trí biên/đích khi vào lại khung nhìn để cuộn nhanh không bị tua ngược từ khung cũ.
                if (!document.hidden) snap();
                wake();
            } else {
                stop();
                snap();
            }
        });
        io.observe(section);

        window.addEventListener("scroll", wake, { passive: true });
        window.addEventListener("resize", wake, { passive: true });
        document.addEventListener("visibilitychange", onVis);

        return () => {
            stop();
            io.disconnect();
            window.removeEventListener("scroll", wake);
            window.removeEventListener("resize", wake);
            document.removeEventListener("visibilitychange", onVis);
        };
    }, []);

    const onFit = useCallback(
        (fits) => {
            if (!fits) onUnfit?.();
        },
        [onUnfit],
    );

    return (
        <section
            id="cau-chuyen"
            ref={sectionRef}
            className="film"
            aria-label={storyIntro.label}
            style={{ height: `calc(100svh + ${(4 * SCROLL_PER * 100).toFixed(0)}svh)` }}
        >
            <div className="film-sticky" ref={stickyRef}>
                {ready && (
                    <FrameContext.Provider value={frame}>
                        <StoryFilm onFit={onFit} />
                    </FrameContext.Provider>
                )}
            </div>
        </section>
    );
}
