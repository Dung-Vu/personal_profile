import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Player } from "@remotion/player";
import { storyIntro } from "../content/story.js";
import { FILM_FPS, FILM_FRAMES } from "../lib/motion.js";
import { StoryFilm } from "./StoryFilm.jsx";
import "../styles/film.css";

// Đoạn cuộn kể chuyện: khung nhìn dính lại, cuộn tới đâu tua phim tới đó (cuộn ngược thì tua ngược).
// Mỗi chương ăn SCROLL_PER × chiều cao màn hình.
const SCROLL_PER = 1.1;

function progressOf(el) {
    const rect = el.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
}

export default function FilmStory({ onUnfit }) {
    const sectionRef = useRef(null);
    const stickyRef = useRef(null);
    const playerRef = useRef(null);
    const [size, setSize] = useState(null);
    const startFrame = useRef(0);

    useLayoutEffect(() => {
        const el = stickyRef.current;
        const read = () => {
            const w = Math.round(el.clientWidth);
            const h = Math.round(el.clientHeight);
            setSize((s) => (s && s.w === w && s.h === h ? s : { w, h }));
        };
        startFrame.current = Math.round(progressOf(sectionRef.current) * (FILM_FRAMES - 1));
        read();
        const ro = new ResizeObserver(read);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Vòng tua: chỉ chạy khi đoạn phim đang trong tầm nhìn; đuổi theo vị trí cuộn cho mượt khi lăn chuột từng nấc.
    useEffect(() => {
        const section = sectionRef.current;
        let raf = 0;
        let current = startFrame.current;
        let shown = -1;
        const tick = () => {
            const target = progressOf(section) * (FILM_FRAMES - 1);
            current += (target - current) * 0.18;
            if (Math.abs(target - current) < 0.3) current = target;
            const f = Math.round(current);
            if (f !== shown && playerRef.current) {
                shown = f;
                playerRef.current.seekTo(f);
            }
            raf = requestAnimationFrame(tick);
        };
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !raf) raf = requestAnimationFrame(tick);
            if (!e.isIntersecting && raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
        });
        io.observe(section);
        return () => {
            io.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    const onFit = useCallback((fits) => !fits && onUnfit?.(), [onUnfit]);

    return (
        <section
            id="cau-chuyen"
            ref={sectionRef}
            className="film"
            aria-label={storyIntro.label}
            style={{ height: `calc(100svh + ${(4 * SCROLL_PER * 100).toFixed(0)}svh)` }}
        >
            <div className="film-sticky" ref={stickyRef}>
                {size && (
                    <Player
                        ref={playerRef}
                        component={StoryFilm}
                        inputProps={{ onFit }}
                        durationInFrames={FILM_FRAMES}
                        fps={FILM_FPS}
                        compositionWidth={size.w}
                        compositionHeight={size.h}
                        initialFrame={startFrame.current}
                        style={{ width: "100%", height: "100%" }}
                        controls={false}
                        clickToPlay={false}
                        doubleClickToFullscreen={false}
                        spaceKeyToPlayOrPause={false}
                        moveToBeginningWhenEnded={false}
                        acknowledgeRemotionLicense
                    />
                )}
            </div>
        </section>
    );
}
