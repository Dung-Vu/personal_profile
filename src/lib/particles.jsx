import { memo } from "react";

// Random có seed (mulberry32) — cùng seed thì cùng kết quả, nên bản prerender khớp bản chạy.
export function rng(seed) {
    return () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export const tones = { ocean: "#1b6265", iris: "#5b63c9", apricot: "#c47a38", ink: "#0f1115", mint: "#7be8c8" };

// Hạt trang trí. list: [{ x, y, s, c, o }] — x/y là %, hoặc px khi unit="px".
export const Particles = memo(function Particles({ list, unit = "%", className = "particles" }) {
    return (
        <div className={className} aria-hidden="true">
            {list.map((p, i) => (
                <i
                    key={i}
                    style={{
                        left: `${p.x.toFixed(2)}${unit}`,
                        top: `${p.y.toFixed(2)}${unit}`,
                        width: p.s.toFixed(1) + "px",
                        height: p.s.toFixed(1) + "px",
                        background: p.c,
                        opacity: p.o.toFixed(2),
                    }}
                />
            ))}
        </div>
    );
});
