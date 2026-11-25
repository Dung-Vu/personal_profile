import { createContext, memo, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getStoryContent } from "../content/index.js";
import { useLocale } from "../lib/i18n.js";
import { Chapters } from "../sections/Story.jsx";
import { CH, SUB, clamp01, ease, mix, offsetBox } from "../lib/motion.js";
import { rng, tones } from "../lib/particles.jsx";

// Trình điều khiển khung hình React gọn nhẹ cho câu chuyện 4 chương (0 dependency).
//   0–150   hỗn loạn: mảnh trôi, tan thành hạt
//   150–300 đọc hệ thống: hạt xoay thành 4 vòng quy trình
//   300–450 dựng lại: hạt bay vào thành 6 thẻ, thẻ co về sơ đồ
//   450–600 AI vận hành: agent, dây nối, nhật ký
// (đơn vị: khung dòng thời gian 30fps; phim chạy 60fps nên khung phim = F × SUB)

export const FrameContext = createContext(0);

export function useCurrentFrame() {
    return useContext(FrameContext);
}

export function AbsoluteFill({ children, style, className }) {
    return (
        <div className={className ? `film-fill ${className}` : "film-fill"} style={style}>
            {children}
        </div>
    );
}

const RING_TONES = [tones.ocean, tones.iris, tones.apricot, tones.ink];

// Đo vị trí các mốc (mảnh, vòng, thẻ, ô hệ thống) để hạt và thẻ biết bay về đâu; đồng thời kiểm cảnh có vừa khung không.
// Chỉ mount đủ 4 chương trong đúng 1 khung đo đồng bộ trước paint; lúc cuộn bình thường chỉ giữ chương đang hoạt động.
function useGeometry(rootRef, onFit, locale) {
    const [geo, setGeo] = useState(null);
    const [measuring, setMeasuring] = useState(true);
    const [measureTick, setMeasureTick] = useState(0);
    const onFitRef = useRef(onFit);
    onFitRef.current = onFit;
    const prevLocaleRef = useRef(locale);

    useEffect(() => {
        if (prevLocaleRef.current !== locale) {
            prevLocaleRef.current = locale;
            setMeasuring(true);
            setMeasureTick((t) => t + 1);
        }
    }, [locale]);

    useLayoutEffect(() => {
        if (!measuring) return;
        const root = rootRef.current;
        if (!root || root.offsetWidth < 10 || root.offsetHeight < 10) return;

        const all = (sel) =>
            [...root.querySelectorAll(sel)]
                .filter((el) => el.offsetParent !== null)
                .map((el) => offsetBox(el, root));
        const read = root.querySelector(".stage-read");
        const ringR = parseFloat(read ? getComputedStyle(read).getPropertyValue("--ring") : "") || 60;
        const next = {
            w: root.offsetWidth,
            h: root.offsetHeight,
            frags: all('[data-m="frag"]'),
            rings: all('[data-m="ring"]').map((b) => ({ cx: b.x + b.w / 2, cy: b.y + b.h / 2 })),
            ringR,
            cards: all('[data-m="card"]'),
            sys: all('[data-m="sys"]'),
        };
        setGeo(next);
        setMeasuring(false);

        // Cảnh phải nằm gọn giữa thanh menu và thanh tiến trình; không vừa thì quay về bản tĩnh.
        const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72;
        const floor = next.h - (next.w <= 600 ? 44 : 64);
        const misfit = [".stage-read .steps", ".stage-build .bento", ".stage-build .caption", ".stage-ai .map", ".stage-ai .ai-left"].filter((sel) => {
            const el = root.querySelector(sel);
            if (!el || el.offsetParent === null) return false;
            const b = offsetBox(el, root);
            return b.y < navH - 8 || b.y + b.h > floor;
        });
        if (misfit.length) console.info("[phim] cảnh không vừa khung, dùng bản tĩnh:", misfit.join(", "));
        onFitRef.current?.(misfit.length === 0);
    }, [measuring, measureTick, rootRef]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        let alive = true;
        let raf = 0;
        let lastW = root.offsetWidth;
        let lastH = root.offsetHeight;

        const scheduleMeasure = (force = false) => {
            if (!alive || raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                if (!alive || !root) return;
                const w = root.offsetWidth;
                const h = root.offsetHeight;
                if (w < 10 || h < 10) return;
                if (!force && w === lastW && h === lastH) return;
                lastW = w;
                lastH = h;
                setMeasuring(true);
                setMeasureTick((t) => t + 1);
            });
        };

        const ro = new ResizeObserver(() => scheduleMeasure(false));
        ro.observe(root);

        const onFonts = () => scheduleMeasure(true);
        document.fonts?.ready.then(onFonts);
        document.fonts?.addEventListener?.("loadingdone", onFonts);

        return () => {
            alive = false;
            if (raf) cancelAnimationFrame(raf);
            ro.disconnect();
            document.fonts?.removeEventListener?.("loadingdone", onFonts);
        };
    }, [rootRef]);

    return { geo, measuring };
}

const seeds = (() => {
    const r = rng(42);
    return Array.from({ length: 180 }, () => ({
        ax: r(), ay: r(), a0: r() * Math.PI * 2, dir: r() < 0.5 ? -1 : 1, j: r(),
        cx: r(), cy: r(), d1: r(), d2: r(), s: r(), o: 0.45 + r() * 0.55, arc: r() - 0.5,
    }));
})();

// Lớp hạt vẽ trên 1 <canvas> ở tỉ lệ DPR (1 GPU layer, 0 React diffing, 0 DOM mutation).
const Dots = memo(function Dots({ F, geo }) {
    const canvasRef = useRef(null);
    const hasDrawnRef = useRef(false);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !geo || geo.w <= 0 || geo.h <= 0) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const bw = Math.round(geo.w * dpr);
        const bh = Math.round(geo.h * dpr);
        if (canvas.width !== bw || canvas.height !== bh) {
            canvas.width = bw;
            canvas.height = bh;
            hasDrawnRef.current = false;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const active =
            F >= 88 &&
            F <= 340 &&
            geo.frags.length > 0 &&
            geo.rings.length >= 4 &&
            geo.cards.length >= 6;

        if (!active) {
            if (hasDrawnRef.current) {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, bw, bh);
                hasDrawnRef.current = false;
            }
            return;
        }

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, geo.w, geo.h);

        const n = geo.w <= 600 ? 84 : 170;
        for (let i = 0; i < n; i++) {
            const r = seeds[i];
            const k = i % 4;
            const fr = geo.frags[i % geo.frags.length];
            const ax = fr.x + r.ax * fr.w * 0.8;
            const ay = fr.y + r.ay * fr.h * 0.8;
            const rc = geo.rings[k];
            const ang = r.a0 + (F - CH) * 0.006 * r.dir;
            const rad = geo.ringR * (1 + (r.j - 0.5) * 0.18);
            const bx = rc.cx + Math.cos(ang) * rad;
            const by = rc.cy + Math.sin(ang) * rad;
            const cd = geo.cards[i % 6];
            const cx = cd.x + (0.12 + 0.76 * r.cx) * cd.w;
            const cy = cd.y + (0.15 + 0.7 * r.cy) * cd.h;

            const s1 = 102 + r.d1 * 22;
            const s2 = 250 + r.d2 * 24;
            const t1 = ease.inOut(clamp01((F - s1) / 58));
            const t2 = ease.inOut(clamp01((F - s2) / 52));
            const op = r.o * clamp01((F - (s1 - 10)) / 14) * (1 - clamp01((F - (s2 + 46)) / 10));
            if (op <= 0.01) continue;

            let px;
            let py;
            let qx;
            let qy;
            let t;
            if (t2 > 0) {
                px = bx;
                py = by;
                qx = cx;
                qy = cy;
                t = t2;
            } else {
                px = ax;
                py = ay;
                qx = bx;
                qy = by;
                t = t1;
            }

            // Cong nhẹ giữa đường bay để không đi thẳng tắp.
            const dx = qx - px;
            const dy = qy - py;
            const bend = Math.sin(Math.PI * t) * r.arc * 0.22;
            const x = mix(px, qx, t) - dy * bend;
            const y = mix(py, qy, t) + dx * bend;
            const radius = (2 + r.s * 3.2) * 0.5;

            ctx.globalAlpha = op;
            ctx.fillStyle = RING_TONES[k];
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        hasDrawnRef.current = true;
    }, [F, geo]);

    return <canvas ref={canvasRef} className="dots-canvas" aria-hidden="true" />;
});

// Thanh tiến trình + nút nhảy 4 chương chạy trên GPU (transform: scaleX), hỗ trợ bàn phím và sáng/tối.
const FilmRail = memo(function FilmRail({ F, dark, chapters, jumpLabel, onJump }) {
    const active = Math.min(3, Math.floor(F / CH));
    return (
        <nav className={`rail film-rail film-jump${dark ? " is-dark" : ""}`} aria-label={jumpLabel}>
            {chapters.map((c, i) => {
                const p = i < active ? 1 : i === active ? clamp01((F - i * CH) / CH) : 0;
                const cls = ["film-jump-btn", i < active && "done", i === active && "on"].filter(Boolean).join(" ");
                return (
                    <button
                        key={c.id}
                        type="button"
                        className={cls}
                        aria-current={i === active ? "step" : undefined}
                        onClick={() => onJump?.(i)}
                    >
                        <span className="rail-track" aria-hidden="true">
                            <span className="rail-fill" style={{ transform: `scaleX(${p.toFixed(4)})` }} />
                        </span>
                        <span className="film-jump-label">
                            <span className="film-jump-no">{c.no}</span>{" "}
                            <span className="film-jump-name">{c.name}</span>
                        </span>
                    </button>
                );
            })}
        </nav>
    );
});

export const StoryFilm = memo(function StoryFilm({ onFit, onJump }) {
    const locale = useLocale();
    const { chapters, jumpLabel } = getStoryContent(locale);
    const F = useCurrentFrame() / SUB;
    const rootRef = useRef(null);
    const { geo, measuring } = useGeometry(rootRef, onFit, locale);

    const morph = useMemo(() => {
        if (!geo || geo.cards.length < 6 || geo.sys.length < 6) return undefined;
        return geo.cards.map((c, j) => {
            const s = geo.sys[j];
            return { dx: s.x - c.x, dy: s.y - c.y, sx: s.w / c.w, sy: s.h / c.h };
        });
    }, [geo]);

    const dk = ease.inOut(clamp01((F - 396) / 34));
    const isDark = F >= 413;

    // Báo Header cập nhật theme tối CHỈ khi trạng thái isDark thực sự lật (không observer #root).
    const prevDarkRef = useRef(null);
    useEffect(() => {
        if (prevDarkRef.current !== isDark) {
            prevDarkRef.current = isDark;
            window.dispatchEvent(new Event("story:theme"));
        }
    }, [isDark]);

    useEffect(
        () => () => {
            window.dispatchEvent(new Event("story:theme"));
        },
        [],
    );

    const railAria = jumpLabel || (locale === "en" ? "Jump to story chapter" : "Chuyển nhanh giữa 4 chương");

    return (
        <AbsoluteFill>
            <div ref={rootRef} className="film-root" data-theme={isDark ? "dark" : undefined}>
                <div className="film-night" aria-hidden="true" style={{ opacity: dk }} />
                <div className="grid-bg" aria-hidden="true" style={{ opacity: 1 - dk }} />
                <div className="grid-bg grid-dark" aria-hidden="true" style={{ opacity: dk }} />
                <Chapters F={F} morph={morph} measureAll={measuring} />
                <Dots F={F} geo={geo} />
                <FilmRail F={F} dark={isDark} chapters={chapters} jumpLabel={railAria} onJump={onJump} />
            </div>
        </AbsoluteFill>
    );
});
