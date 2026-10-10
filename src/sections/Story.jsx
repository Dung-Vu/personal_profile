import { memo, useLayoutEffect, useRef, useState } from "react";
import {
    agentLog,
    agents,
    aiSystems,
    buildLegend,
    chaosCount,
    chapters,
    fragmentLayout,
    fragments,
    hubSteps,
    readNotes,
    steps,
    storyIntro,
} from "../content/story.js";
import { bento } from "../content/projects.js";
import { Particles, rng, tones } from "../lib/particles.jsx";
import { CH, ease, fade, mix, mixRgba, motion, offsetBox } from "../lib/motion.js";

// 4 chương câu chuyện. Không truyền F → bản tĩnh (prerender, giảm chuyển động, màn thấp).
// Truyền F (khung hình của phim) → cùng giao diện đó nhưng chuyển động theo khung; phim cuộn ở src/film/.

function Caption({ chapter, className = "", children, headingId, style }) {
    return (
        <div className={`caption ${className}`} style={style}>
            <span className="label">
                <b>{chapter.no}</b>&nbsp; / &nbsp;{chapter.name}
            </span>
            <h2 className="h2" id={headingId}>
                {chapter.title}
            </h2>
            <p className="lead">{chapter.lead}</p>
            {children}
        </div>
    );
}

function Rail({ active }) {
    return (
        <div className="rail" aria-hidden="true">
            {chapters.map((c, i) => (
                <div key={c.id} className={i < active ? "done" : i === active ? "on" : undefined}>
                    {c.name}
                </div>
            ))}
        </div>
    );
}

function Stage({ index, dark, className = "", m, children }) {
    const chapter = chapters[index];
    return (
        <section
            id={m.film ? undefined : chapter.id}
            className={`stage ${className}`}
            data-theme={dark ? "dark" : undefined}
            data-chapter={index}
            aria-labelledby={`${chapter.id}-title`}
        >
            {!m.film && <div className="grid-bg" aria-hidden="true" />}
            {children(chapter)}
            {!m.film && <Rail active={index} />}
        </section>
    );
}

/* ---------- Chương 1: hỗn loạn ---------- */

const Fragment = memo(function Fragment({ item }) {
    if (item.kind === "chat") {
        return (
            <>
                <span className="av" style={{ background: item.color }}>
                    {item.who}
                </span>
                <div>
                    <div className="meta">
                        {item.meta}
                        {item.badge && <span className="badge">{item.badge}</span>}
                    </div>
                    <div className="bub">{item.text}</div>
                </div>
            </>
        );
    }
    if (item.kind === "sheet") {
        return (
            <>
                <div className="bar">
                    {item.file}
                    <span className="meta">{item.meta}</span>
                </div>
                <div className="cells">
                    {["", "A", "B", "C", "D"].map((h, i) => (
                        <span key={i} className="h">
                            {h}
                        </span>
                    ))}
                    {item.rows.flatMap((row, ri) =>
                        row.map((cell, ci) => (
                            <span key={`${ri}-${ci}`} className={ci === 0 ? "h" : cell.startsWith("!") ? "err" : undefined}>
                                {cell.replace(/^!/, "")}
                            </span>
                        )),
                    )}
                </div>
            </>
        );
    }
    if (item.kind === "note") {
        return (
            <>
                {item.text}
                <div className="meta">{item.meta}</div>
            </>
        );
    }
    return (
        <>
            <b>{item.title}</b>
            {item.lines.map((line, i) => (
                <span key={i} className="paper-line">
                    {line.length === 3 ? (
                        <>
                            {line[0]}
                            <s>{line[1]}</s>
                            {line[2]}
                        </>
                    ) : (
                        line[0]
                    )}
                </span>
            ))}
        </>
    );
});

function FragmentSet({ layout, className, m }) {
    return (
        <div className={`frags ${className}`} aria-hidden="true">
            {layout.map(([key, x, y, w, rot, d], i) => {
                const item = fragments[key];
                const s = 0.72 + d * 0.28;
                // Phim: trôi lên theo chiều sâu, rồi co lại và tan thành hạt (khung 95 → 140).
                const q = m.out(95 + i * 2.5, 128 + i * 2.5, ease.inOut);
                const drift = m.film ? -Math.min(m.L, 130) * 0.32 * d : 0;
                const blur = d < 0.95 ? (1 - d) * 3.2 : 0;
                return (
                    <div
                        key={i}
                        className={`frag ${item.kind}`}
                        data-m="frag"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: w,
                            transform: m.film
                                ? `translateY(${drift.toFixed(1)}px) rotate(${rot}deg) scale(${(s * (1 - 0.5 * q)).toFixed(3)})`
                                : `rotate(${rot}deg) scale(${s.toFixed(3)})`,
                            filter: blur + q * 4 > 0.05 ? `blur(${(blur + q * 4).toFixed(1)}px)` : undefined,
                            opacity: ((0.45 + d * 0.55) * (1 - q)).toFixed(2),
                            zIndex: Math.round(d * 10),
                        }}
                    >
                        <Fragment item={item} />
                    </div>
                );
            })}
        </div>
    );
}

const chaosDots = (() => {
    const r = rng(3);
    const cols = [tones.ocean, tones.iris, tones.apricot];
    return Array.from({ length: 90 }, (_, i) => {
        const t = Math.pow(r(), 1.6);
        return { x: 20 + r() * 75, y: 10 + r() * 75, s: 2 + r() * 3.5, c: cols[i % 3], o: 0.25 + t * 0.6 };
    });
})();

function ChapterChaos({ m }) {
    const total = Number(chaosCount.value);
    const count = m.film ? Math.round(mix(total - 6, total, m.in(0, 90, ease.lin))) : total;
    const out = m.out(98, 124);
    return (
        <Stage index={0} className="stage-chaos" m={m}>
            {(c) => (
                <>
                    <FragmentSet layout={fragmentLayout.desktop} className="only-desk" m={m} />
                    <FragmentSet layout={fragmentLayout.mobile} className="only-mob" m={m} />
                    <div className="chaos-dots" style={m.film ? { opacity: 1 - m.out(92, 128) } : undefined}>
                        <Particles list={chaosDots} />
                    </div>
                    <div className="count label" aria-hidden="true" style={fade(m, 1, m.out(90, 116), 12)}>
                        <b>{count}</b>
                        {chaosCount.label}
                    </div>
                    <Caption chapter={c} className="cap-panel" headingId={`${c.id}-title`} style={fade(m, 1, out)} />
                </>
            )}
        </Stage>
    );
}

/* ---------- Chương 2: đọc hệ thống ---------- */

function ring(seed, tone, count) {
    const r = rng(seed);
    return Array.from({ length: count }, () => {
        const a = r() * Math.PI * 2;
        const k = 1 + (r() - 0.5) * 0.16;
        return { cx: Math.cos(a) * k, cy: Math.sin(a) * k, s: 2 + r() * 3.2, o: 0.35 + r() * 0.6, c: tones[tone] };
    });
}
const rings = steps.map((s, i) => ring(11 + i, s.tone, 46));

const StaticRing = memo(function StaticRing({ list }) {
    return (
        <div className="ring" aria-hidden="true">
            {list.map((p, k) => (
                <i
                    key={k}
                    style={{
                        left: `calc(50% + ${p.cx.toFixed(3)} * var(--ring))`,
                        top: `calc(50% + ${p.cy.toFixed(3)} * var(--ring))`,
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

function ChapterRead({ m }) {
    const out = m.out(104, 128);
    return (
        <Stage index={1} className="stage-read" m={m}>
            {(c) => (
                <>
                    <Caption chapter={c} className="cap-top" headingId={`${c.id}-title`} style={fade(m, m.in(-14, 16), out)} />
                    <aside className="out" aria-label={readNotes.label} style={fade(m, m.in(12, 38), out, 16)}>
                        <span className="label">{readNotes.label}</span>
                        {readNotes.rows.map(([k, v]) => (
                            <div className="row" key={k}>
                                <span>{k}</span>
                                <span>{v}</span>
                            </div>
                        ))}
                    </aside>
                    <ol className="steps">
                        {steps.map((s, i) => {
                            const core = m.in(14 + i * 6, 34 + i * 6, ease.back);
                            const coreOut = m.out(112 + i * 2, 132 + i * 2);
                            const txt = m.in(24 + i * 6, 48 + i * 6);
                            return (
                                <li
                                    key={s.no}
                                    className={`step tone-${s.tone}`}
                                    style={m.film ? { "--cx": m.in(36 + i * 6, 62 + i * 6) * (1 - out) } : undefined}
                                >
                                    <span className="q label" style={fade(m, txt, out, 10)}>
                                        {s.hint}
                                    </span>
                                    <div className="core-wrap" data-m="ring">
                                        {!m.film && <StaticRing list={rings[i]} />}
                                        <span
                                            className="core"
                                            style={
                                                m.film
                                                    ? {
                                                          opacity: Math.min(1, core * 1.4) * (1 - coreOut),
                                                          transform: `translate(-50%, -50%) scale(${(0.4 + 0.6 * core).toFixed(3)})`,
                                                      }
                                                    : undefined
                                            }
                                        >
                                            {s.no}
                                        </span>
                                    </div>
                                    <div className="txt" style={fade(m, txt, out, 14)}>
                                        <h3>{s.title}</h3>
                                        <p>{s.desc}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </>
            )}
        </Stage>
    );
}

/* ---------- Chương 3: dựng lại ---------- */

const CardBody = memo(function CardBody({ item }) {
    return (
        <>
            <div className="top">
                <span className={`pill t-${item.tone}`}>{item.tag}</span>
                <span className="live">đang chạy</span>
            </div>
            <h3>{item.name}</h3>
            <p className="line">{item.line}</p>
            <div className="mods">
                {item.modules.map((x) => (
                    <span key={x}>{x}</span>
                ))}
            </div>
            <div className="metric">
                <b>{item.metric.value}</b>
                <span>{item.metric.label}</span>
            </div>
        </>
    );
});

const CARD_BG = [251, 250, 248, 1];
const FEATURE_BG = [15, 17, 21, 1];
const NODE_BG = [255, 255, 255, 0.035];

// Phim: thẻ hiện ra khi hạt bay tới, rồi co về đúng ô hệ thống ở chương 4 (morph = độ lệch đã đo).
function BentoCard({ item, j, m, morph }) {
    let style;
    let inner;
    if (m.film) {
        const a = m.in(8 + j * 5, 32 + j * 5);
        const p = morph ? m.out(98 + j * 2, 130 + j * 2, ease.inOut) : 0;
        const gone = m.out(140 + j * 2, 152 + j * 2, ease.lin);
        style = {
            opacity: a * (1 - gone),
            transform:
                p > 0
                    ? `translate(${(morph.dx * p).toFixed(1)}px, ${(morph.dy * p).toFixed(1)}px) scale(${mix(1, morph.sx, p).toFixed(4)}, ${mix(1, morph.sy, p).toFixed(4)})`
                    : `translateY(${((1 - a) * 16).toFixed(1)}px) scale(${mix(0.94, 1, a).toFixed(4)})`,
            transformOrigin: p > 0 ? "0 0" : undefined,
        };
        if (p > 0) {
            // Thẻ đổi sang dạng khung tối sớm hơn đường bay, để giữa chừng không còn khối trắng lớn.
            const pc = ease.out(Math.min(1, p * 2.2));
            style.background = mixRgba(item.feature ? FEATURE_BG : CARD_BG, NODE_BG, pc);
            style.borderColor = mixRgba([15, 17, 21, 0.1], [123, 232, 200, 0.4], pc);
            style.boxShadow = "none";
        }
        inner = { opacity: 1 - m.out(94 + j, 106 + j) };
    }
    return (
        <article className={`card${item.feature ? " feature" : ""}`} data-m="card" style={style}>
            <div className="card-in" style={inner}>
                <CardBody item={item} />
            </div>
        </article>
    );
}

function ChapterBuild({ m, morph }) {
    return (
        <Stage index={2} className="stage-build" m={m}>
            {(c) => (
                <>
                    <Caption
                        chapter={c}
                        className="cap-side"
                        headingId={`${c.id}-title`}
                        style={fade(m, m.in(-12, 18), m.out(92, 114))}
                    >
                        <div className="legend">
                            {buildLegend.map((l) => (
                                <span key={l.tone}>
                                    <i style={{ background: tones[l.tone] }} />
                                    {l.label}
                                </span>
                            ))}
                        </div>
                    </Caption>
                    <div className="bento">
                        {bento.map((item, j) => (
                            <BentoCard key={item.name} item={item} j={j} m={m} morph={morph?.[j]} />
                        ))}
                    </div>
                </>
            )}
        </Stage>
    );
}

/* ---------- Chương 4: AI vận hành ---------- */

const agentColors = {
    apricot: ["#2a2118", "#e3a46b"],
    mint: ["#16241f", "#7be8c8"],
    iris: ["#1b1d33", "#9aa1ff"],
    mono: ["#232323", "#dddddd"],
};

// Dây nối agent → hub → hệ thống, tính theo vị trí thật của các ô (đo lại khi đổi kích thước).
// Đo theo offset nên không bị lệch khi các ô đang chạy hiệu ứng.
function useWires(mapRef) {
    const [paths, setPaths] = useState([]);
    useLayoutEffect(() => {
        const map = mapRef.current;
        if (!map) return;
        const draw = () => {
            const hubEl = map.querySelector(".hub");
            if (!hubEl || map.offsetWidth < 10) return;
            const hub = offsetBox(hubEl, map);
            // .hub được canh giữa bằng translate(-50%, -50%) nên offset là góc đã dời.
            const centered = getComputedStyle(hubEl).position === "absolute";
            const hx = centered ? hub.x : hub.x + hub.w / 2;
            const ht = centered ? hub.y - hub.h / 2 : hub.y;
            const hb = ht + hub.h;
            const out = [];
            const wire = (x0, y0, x1, y1, hot) => {
                const my = (y0 + y1) / 2;
                out.push({ d: `M${x0.toFixed(1)},${y0.toFixed(1)} C${x0.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`, hot });
            };
            map.querySelectorAll(".agent").forEach((el, i) => {
                const a = offsetBox(el, map);
                wire(a.x + a.w / 2, a.y + a.h, hx + (i - 1.5) * 40, ht, [30, 0, 62, 0][i]);
            });
            map.querySelectorAll(".sys").forEach((el, i) => {
                const s = offsetBox(el, map);
                wire(hx + (i - 2.5) * 30, hb, s.x + s.w / 2, s.y, [0, 48, 0, 0, 70, 0][i]);
            });
            setPaths(out);
        };
        draw();
        const ro = new ResizeObserver(draw);
        ro.observe(map);
        return () => ro.disconnect();
    }, [mapRef]);
    return paths;
}

function ChapterAI({ m }) {
    const mapRef = useRef(null);
    const paths = useWires(mapRef);
    const dark = !m.film || m.L >= -15;
    const pulseOn = m.in(58, 72);
    return (
        <Stage index={3} dark={dark} className="stage-ai" m={m}>
            {(c) => (
                <>
                    <div className="glow" aria-hidden="true" style={m.film ? { opacity: m.in(-20, 30) } : undefined} />
                    <div className="ai-left">
                        <Caption chapter={c} className="cap-side" headingId={`${c.id}-title`} style={fade(m, m.in(0, 24))} />
                        <div className="log" aria-label="Nhật ký làm việc của các agent (minh hoạ)" style={fade(m, m.in(30, 46), 0, 14)}>
                            <span className="h">
                                <span>nhật ký hôm nay</span>
                                <span>● đang chạy</span>
                            </span>
                            {agentLog.map((row, i) => (
                                <div key={row.t} style={fade(m, m.in(34 + i * 9, 46 + i * 9), 0, 6)}>
                                    <span>{row.t}</span>
                                    <span className="who">{row.who}</span>
                                    <span>{row.what}</span>
                                    <span className={row.ok ? "ok" : undefined}>{row.res}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="map" ref={mapRef}>
                        <svg className="wires" aria-hidden="true">
                            {paths.map((p, i) => {
                                const draw = m.in(28 + i * 2, 58 + i * 2, ease.inOut);
                                return (
                                    <g key={i}>
                                        <path
                                            d={p.d}
                                            className="wire"
                                            pathLength="100"
                                            style={m.film ? { strokeDasharray: 100, strokeDashoffset: 100 * (1 - draw) } : undefined}
                                        />
                                        {p.hot > 0 && (
                                            <path
                                                d={p.d}
                                                className="pulse"
                                                pathLength="100"
                                                style={
                                                    m.film
                                                        ? { animation: "none", opacity: pulseOn, strokeDashoffset: -((p.hot + m.L * 0.9) % 100) }
                                                        : { strokeDashoffset: -p.hot }
                                                }
                                            />
                                        )}
                                    </g>
                                );
                            })}
                        </svg>
                        <ul className="row agents" aria-label="Các AI agent">
                            {agents.map((a, i) => (
                                <li key={a.code} className="agent" style={fade(m, m.in(8 + i * 5, 30 + i * 5), 0, -18)}>
                                    <span className="ic" style={{ background: agentColors[a.tone][0], color: agentColors[a.tone][1] }} aria-hidden="true">
                                        {a.code}
                                    </span>
                                    <div>
                                        <b>{a.name}</b>
                                        <small>{a.role}</small>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="hub" style={m.film ? { opacity: m.in(18, 40), "--hs": mix(0.9, 1, m.in(18, 44, ease.back)) } : undefined}>
                            <span className="label">Điều phối</span>
                            <b>Bộ nhớ chung</b>
                            <div className="hub-steps">
                                {hubSteps.map((s) => (
                                    <span key={s}>{s}</span>
                                ))}
                            </div>
                        </div>
                        <ul className="row systems" aria-label="Các hệ thống đang chạy">
                            {aiSystems.map(([name, kind], i) => (
                                <li key={name} className="sys" data-m="sys" style={m.film ? { opacity: m.in(-18 + i * 2, -6 + i * 2, ease.lin) } : undefined}>
                                    {name}
                                    <small>{kind}</small>
                                </li>
                            ))}
                        </ul>
                        <div className="human" style={fade(m, m.in(96, 116), 0, 10)}>
                            <i aria-hidden="true">D</i>Duyệt cuối cùng: con người
                        </div>
                    </div>
                </>
            )}
        </Stage>
    );
}

// Cả 4 chương. F = khung hình của phim (null = tĩnh); morph = độ lệch thẻ → ô hệ thống, do phim đo.
export function Chapters({ F = null, morph }) {
    return (
        <>
            <ChapterChaos m={motion(F, 0)} />
            <ChapterRead m={motion(F, CH)} />
            <ChapterBuild m={motion(F, CH * 2)} morph={morph} />
            <ChapterAI m={motion(F, CH * 3)} />
        </>
    );
}

export function StaticStory() {
    return (
        <div id="cau-chuyen" className="story" aria-label={storyIntro.label}>
            <Chapters />
        </div>
    );
}
