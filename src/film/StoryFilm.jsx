import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { chapters } from "../content/story.js";
import { Chapters } from "../sections/Story.jsx";
import { CH, SUB, ease, mix, mixRgba, offsetBox } from "../lib/motion.js";
import { rng, tones } from "../lib/particles.jsx";

// Phim Remotion của câu chuyện 4 chương. Khung hình = kích thước khung nhìn, nên giao diện bên trong
// chính là HTML/CSS của bản tĩnh; phim chỉ thêm chuyển động theo khung + lớp hạt nối các chương.
//   0–150   hỗn loạn: mảnh trôi, tan thành hạt
//   150–300 đọc hệ thống: hạt xoay thành 4 vòng quy trình
//   300–450 dựng lại: hạt bay vào thành 6 thẻ, thẻ co về sơ đồ
//   450–600 AI vận hành: agent, dây nối, nhật ký
// (đơn vị: khung dòng thời gian 30fps; phim render 60fps nên khung phim = F × SUB)

const PAPER = [243, 242, 238, 1];
const NIGHT = [11, 13, 16, 1];
const RING_TONES = [tones.ocean, tones.iris, tones.apricot, tones.ink];

// Đo vị trí các mốc (mảnh, vòng, thẻ, ô hệ thống) để hạt và thẻ biết bay về đâu; đồng thời kiểm cảnh có vừa khung không.
function useGeometry(rootRef, onFit) {
    const [geo, setGeo] = useState(null);
    const measure = useCallback(() => {
        const root = rootRef.current;
        if (!root || root.offsetWidth < 10) return;
        const all = (sel) => [...root.querySelectorAll(sel)].filter((el) => el.offsetParent !== null).map((el) => offsetBox(el, root));
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
        onFit?.(misfit.length === 0);
    }, [rootRef, onFit]);

    useLayoutEffect(() => {
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(rootRef.current);
        document.fonts?.ready.then(measure);
        return () => ro.disconnect();
    }, [measure, rootRef]);
    return geo;
}

const seeds = (() => {
    const r = rng(42);
    return Array.from({ length: 180 }, () => ({
        ax: r(), ay: r(), a0: r() * Math.PI * 2, dir: r() < 0.5 ? -1 : 1, j: r(),
        cx: r(), cy: r(), d1: r(), d2: r(), s: r(), o: 0.45 + r() * 0.55, arc: r() - 0.5,
    }));
})();

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

// Lớp hạt: mảnh vụn (ch.1) → vòng quy trình (ch.2) → thẻ hệ thống (ch.3).
const Dots = memo(function Dots({ F, geo }) {
    if (!geo || !geo.frags.length || geo.rings.length < 4 || geo.cards.length < 6) return null;
    if (F < 88 || F > 340) return null;
    const n = geo.w <= 600 ? 84 : 170;
    const out = [];
    for (let i = 0; i < n; i++) {
        const r = seeds[i];
        const k = i % 4;
        const fr = geo.frags[i % geo.frags.length];
        const A = { x: fr.x + r.ax * fr.w * 0.8, y: fr.y + r.ay * fr.h * 0.8 };
        const rc = geo.rings[k];
        const ang = r.a0 + (F - CH) * 0.006 * r.dir;
        const rad = geo.ringR * (1 + (r.j - 0.5) * 0.18);
        const B = { x: rc.cx + Math.cos(ang) * rad, y: rc.cy + Math.sin(ang) * rad };
        const cd = geo.cards[i % 6];
        const C = { x: cd.x + (0.12 + 0.76 * r.cx) * cd.w, y: cd.y + (0.15 + 0.7 * r.cy) * cd.h };

        const s1 = 102 + r.d1 * 22;
        const s2 = 250 + r.d2 * 24;
        const t1 = ease.inOut(clamp01((F - s1) / 58));
        const t2 = ease.inOut(clamp01((F - s2) / 52));
        const op = r.o * clamp01((F - (s1 - 10)) / 14) * (1 - clamp01((F - (s2 + 46)) / 10));
        if (op <= 0.01) continue;

        const [P, Q, t] = t2 > 0 ? [B, C, t2] : [A, B, t1];
        // Cong nhẹ giữa đường bay để không đi thẳng tắp.
        const dx = Q.x - P.x;
        const dy = Q.y - P.y;
        const bend = Math.sin(Math.PI * t) * r.arc * 0.22;
        const x = mix(P.x, Q.x, t) - dy * bend;
        const y = mix(P.y, Q.y, t) + dx * bend;
        const size = 2 + r.s * 3.2;
        out.push(
            <i
                key={i}
                style={{
                    width: size,
                    height: size,
                    background: RING_TONES[k],
                    opacity: op,
                    transform: `translate3d(${(x - size / 2).toFixed(1)}px, ${(y - size / 2).toFixed(1)}px, 0)`,
                }}
            />,
        );
    }
    return (
        <div className="film-dots" aria-hidden="true">
            {out}
        </div>
    );
});

function FilmRail({ F, dark }) {
    const active = Math.min(3, Math.floor(F / CH));
    return (
        <div className={`rail film-rail${dark ? " is-dark" : ""}`} aria-hidden="true">
            {chapters.map((c, i) => (
                <div
                    key={c.id}
                    className={i < active ? "done" : i === active ? "on" : undefined}
                    style={{ "--p": `${(clamp01((F - i * CH) / CH) * 100).toFixed(1)}%` }}
                >
                    {c.name}
                </div>
            ))}
        </div>
    );
}

export function StoryFilm({ onFit }) {
    const F = useCurrentFrame() / SUB;
    const rootRef = useRef(null);
    const geo = useGeometry(rootRef, onFit);
    const morph = useMemo(() => {
        if (!geo || geo.cards.length < 6 || geo.sys.length < 6) return undefined;
        return geo.cards.map((c, j) => {
            const s = geo.sys[j];
            return { dx: s.x - c.x, dy: s.y - c.y, sx: s.w / c.w, sy: s.h / c.h };
        });
    }, [geo]);
    const dk = ease.inOut(clamp01((F - 396) / 34));
    return (
        <AbsoluteFill>
            <div ref={rootRef} className="film-root" style={{ background: mixRgba(PAPER, NIGHT, dk) }}>
                <div className="grid-bg" aria-hidden="true" style={{ opacity: 1 - dk }} />
                <div className="grid-bg grid-dark" aria-hidden="true" style={{ opacity: dk }} />
                <Chapters F={F} morph={morph} />
                <Dots F={F} geo={geo} />
                <FilmRail F={F} dark={dk > 0.5} />
            </div>
        </AbsoluteFill>
    );
}
