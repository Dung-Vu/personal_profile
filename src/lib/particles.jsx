import { memo, useMemo } from "react";

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

// Dựng lệnh đường tròn SVG gọn cho một tập điểm: [{ cx, cy, r }].
export function circlesPath(items) {
    let d = "";
    for (let i = 0; i < items.length; i++) {
        const { cx, cy, r } = items[i];
        const dia = (r * 2).toFixed(1);
        const rr = r.toFixed(1);
        d += `M${(cx - r).toFixed(1)},${cy.toFixed(1)}a${rr},${rr} 0 1,0 ${dia},0a${rr},${rr} 0 1,0 -${dia},0`;
    }
    return d;
}

// Hạt trang trí render bằng 1 <svg> gồm 1 <path> cho mỗi màu (giảm mạnh số DOM node trong SSR HTML).
// list: [{ x, y, s, c, o }] — x/y là % của viewBox (vw × vh), s là đường kính (px ở tỉ lệ gốc).
export const Particles = memo(function Particles({ list, vw = 1440, vh = 900, className = "particles" }) {
    const layers = useMemo(() => {
        const groups = new Map();
        for (let i = 0; i < list.length; i++) {
            const p = list[i];
            let g = groups.get(p.c);
            if (!g) {
                g = { c: p.c, sumO: 0, items: [] };
                groups.set(p.c, g);
            }
            g.sumO += p.o;
            g.items.push({ cx: (p.x / 100) * vw, cy: (p.y / 100) * vh, r: p.s * 0.5 });
        }
        return [...groups.values()].map((g) => ({
            c: g.c,
            o: Number((g.sumO / g.items.length).toFixed(2)),
            d: circlesPath(g.items),
        }));
    }, [list, vw, vh]);

    return (
        <svg
            className={className}
            viewBox={`0 0 ${vw} ${vh}`}
            preserveAspectRatio="xMidYMid slice"
            width="100%"
            height="100%"
            aria-hidden="true"
        >
            {layers.map((layer) => (
                <path key={layer.c} d={layer.d} fill={layer.c} fillOpacity={layer.o} />
            ))}
        </svg>
    );
});
