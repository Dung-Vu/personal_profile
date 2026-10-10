import { useLayoutEffect, useRef, useState } from "react";
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

// Bản tĩnh 4 chương. P2 sẽ phủ phim cuộn lên trên; bản này giữ lại cho mobile yếu và người bật giảm chuyển động.

function Caption({ chapter, className = "", children, headingId }) {
    return (
        <div className={`caption ${className}`}>
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

function Stage({ index, dark, className = "", children }) {
    const chapter = chapters[index];
    return (
        <section
            id={chapter.id}
            className={`stage ${className}`}
            data-theme={dark ? "dark" : undefined}
            aria-labelledby={`${chapter.id}-title`}
        >
            <div className="grid-bg" aria-hidden="true" />
            {children(chapter)}
            <Rail active={index} />
        </section>
    );
}

/* ---------- Chương 1: hỗn loạn ---------- */

function Fragment({ item }) {
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
}

function FragmentSet({ layout, className }) {
    return (
        <div className={`frags ${className}`} aria-hidden="true">
            {layout.map(([key, x, y, w, rot, d], i) => {
                const item = fragments[key];
                const s = 0.72 + d * 0.28;
                return (
                    <div
                        key={i}
                        className={`frag ${item.kind}`}
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: w,
                            transform: `rotate(${rot}deg) scale(${s.toFixed(3)})`,
                            filter: d < 0.95 ? `blur(${((1 - d) * 3.2).toFixed(1)}px)` : undefined,
                            opacity: (0.45 + d * 0.55).toFixed(2),
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

function ChapterChaos() {
    return (
        <Stage index={0} className="stage-chaos">
            {(c) => (
                <>
                    <FragmentSet layout={fragmentLayout.desktop} className="only-desk" />
                    <FragmentSet layout={fragmentLayout.mobile} className="only-mob" />
                    <Particles list={chaosDots} />
                    <div className="count label" aria-hidden="true">
                        <b>{chaosCount.value}</b>
                        {chaosCount.label}
                    </div>
                    <Caption chapter={c} className="cap-panel" headingId={`${c.id}-title`} />
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

function ChapterRead() {
    return (
        <Stage index={1} className="stage-read">
            {(c) => (
                <>
                    <Caption chapter={c} className="cap-top" headingId={`${c.id}-title`} />
                    <aside className="out" aria-label={readNotes.label}>
                        <span className="label">{readNotes.label}</span>
                        {readNotes.rows.map(([k, v]) => (
                            <div className="row" key={k}>
                                <span>{k}</span>
                                <span>{v}</span>
                            </div>
                        ))}
                    </aside>
                    <ol className="steps">
                        {steps.map((s, i) => (
                            <li key={s.no} className={`step tone-${s.tone}`}>
                                <span className="q label">{s.hint}</span>
                                <div className="core-wrap">
                                    <div className="ring" aria-hidden="true">
                                        {rings[i].map((p, k) => (
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
                                    <span className="core">{s.no}</span>
                                </div>
                                <div className="txt">
                                    <h3>{s.title}</h3>
                                    <p>{s.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </>
            )}
        </Stage>
    );
}

/* ---------- Chương 3: dựng lại ---------- */

function BentoCard({ item }) {
    return (
        <article className={`card${item.feature ? " feature" : ""}`}>
            <div className="top">
                <span className={`pill t-${item.tone}`}>{item.tag}</span>
                <span className="live">đang chạy</span>
            </div>
            <h3>{item.name}</h3>
            <p className="line">{item.line}</p>
            <div className="mods">
                {item.modules.map((m) => (
                    <span key={m}>{m}</span>
                ))}
            </div>
            <div className="metric">
                <b>{item.metric.value}</b>
                <span>{item.metric.label}</span>
            </div>
        </article>
    );
}

function ChapterBuild() {
    return (
        <Stage index={2} className="stage-build">
            {(c) => (
                <>
                    <Caption chapter={c} className="cap-side" headingId={`${c.id}-title`}>
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
                        {bento.map((item) => (
                            <BentoCard key={item.name} item={item} />
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
function useWires(mapRef) {
    const [paths, setPaths] = useState([]);
    useLayoutEffect(() => {
        const map = mapRef.current;
        if (!map) return;
        const draw = () => {
            const M = map.getBoundingClientRect();
            const hub = map.querySelector(".hub")?.getBoundingClientRect();
            if (!hub || M.width < 10) return;
            const rel = (r) => ({ x: r.left - M.left + r.width / 2, top: r.top - M.top, bottom: r.bottom - M.top });
            const hx = hub.left - M.left + hub.width / 2;
            const ht = hub.top - M.top;
            const hb = hub.bottom - M.top;
            const out = [];
            const wire = (x0, y0, x1, y1, hot) => {
                const my = (y0 + y1) / 2;
                out.push({ d: `M${x0.toFixed(1)},${y0.toFixed(1)} C${x0.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`, hot });
            };
            map.querySelectorAll(".agent").forEach((el, i) => {
                const a = rel(el.getBoundingClientRect());
                wire(a.x, a.bottom, hx + (i - 1.5) * 40, ht, [30, 0, 62, 0][i]);
            });
            map.querySelectorAll(".sys").forEach((el, i) => {
                const s = rel(el.getBoundingClientRect());
                wire(hx + (i - 2.5) * 30, hb, s.x, s.top, [0, 48, 0, 0, 70, 0][i]);
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

function ChapterAI() {
    const mapRef = useRef(null);
    const paths = useWires(mapRef);
    return (
        <Stage index={3} dark className="stage-ai">
            {(c) => (
                <>
                    <div className="glow" aria-hidden="true" />
                    <div className="ai-left">
                        <Caption chapter={c} className="cap-side" headingId={`${c.id}-title`} />
                        <div className="log" aria-label="Nhật ký làm việc của các agent (minh hoạ)">
                            <span className="h">
                                <span>nhật ký hôm nay</span>
                                <span>● đang chạy</span>
                            </span>
                            {agentLog.map((row) => (
                                <div key={row.t}>
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
                            {paths.map((p, i) => (
                                <g key={i}>
                                    <path d={p.d} className="wire" />
                                    {p.hot > 0 && <path d={p.d} className="pulse" pathLength="100" style={{ strokeDashoffset: -p.hot }} />}
                                </g>
                            ))}
                        </svg>
                        <ul className="row agents" aria-label="Các AI agent">
                            {agents.map((a) => (
                                <li key={a.code} className="agent">
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
                        <div className="hub">
                            <span className="label">Điều phối</span>
                            <b>Bộ nhớ chung</b>
                            <div className="hub-steps">
                                {hubSteps.map((s) => (
                                    <span key={s}>{s}</span>
                                ))}
                            </div>
                        </div>
                        <ul className="row systems" aria-label="Các hệ thống đang chạy">
                            {aiSystems.map(([name, kind]) => (
                                <li key={name} className="sys">
                                    {name}
                                    <small>{kind}</small>
                                </li>
                            ))}
                        </ul>
                        <div className="human">
                            <i aria-hidden="true">D</i>Duyệt cuối cùng: con người
                        </div>
                    </div>
                </>
            )}
        </Stage>
    );
}

export function Story() {
    return (
        <div id="cau-chuyen" className="story" aria-label={storyIntro.label}>
            <ChapterChaos />
            <ChapterRead />
            <ChapterBuild />
            <ChapterAI />
        </div>
    );
}
