import { useEffect, useMemo, useRef, useState } from "react";
import { clipNote, replayLabel } from "../content/clips.js";
import { rng } from "../lib/particles.jsx";
import "../styles/clip.css";

// Clip bằng chứng: mỗi dự án một cảnh mô phỏng luồng làm việc thật, chạy một lần khi cuộn tới rồi đứng ở cảnh cuối.
// Bản mặc định (prerender, giảm chuyển động) chính là cảnh cuối — animation chỉ gắn khi máy cho phép chuyển động.
// Mỗi phần tử .k có --d (giây bắt đầu), --t (thời lượng) và --k (kiểu: k-up | k-pop | k-fill | k-draw | k-blip).
const k = (d, kind, t) => ({ "--d": `${d}s`, ...(kind && { "--k": kind }), ...(t && { "--t": `${t}s` }) });

function useClipPlay(ref) {
    const [state, setState] = useState("still");
    useEffect(() => {
        const el = ref.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setState("armed");
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setState("playing");
                    io.disconnect();
                }
            },
            // Chạy ngay khi mép trên clip vào tới ~88% chiều cao màn hình: người xem không phải nhìn khung trống.
            { threshold: 0, rootMargin: "0px 0px -12% 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [ref]);
    return state;
}

// Mã QR giả (không quét được): lưới ngẫu nhiên có 3 ô định vị, chỉ để gợi hình.
function FakeQR({ seed = 7 }) {
    const cells = useMemo(() => {
        const r = rng(seed);
        const n = 21;
        const out = [];
        const finder = (x, y) => [[0, 0], [n - 7, 0], [0, n - 7]].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!finder(x, y) && r() < 0.45) out.push([x, y]);
        return out;
    }, [seed]);
    return (
        <svg viewBox="0 0 21 21" className="cl-qrsvg" aria-hidden="true" shapeRendering="crispEdges">
            {[[0, 0], [14, 0], [0, 14]].map(([x, y]) => (
                <g key={`${x}-${y}`}>
                    <rect x={x + 0.5} y={y + 0.5} width="6" height="6" fill="none" stroke="currentColor" />
                    <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
                </g>
            ))}
            {cells.map(([x, y]) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
            ))}
        </svg>
    );
}

function Vehicle({ c }) {
    return (
        <div className="cl-vehicle">
            <div className="cl-stack">
                <div className="cl-vin k" style={k(0.1)}>
                    <span className="cl-lbl">Số khung</span>
                    <b>{c.vin}</b>
                    <small>{c.model}</small>
                </div>
                <ol className="cl-time">
                    {c.steps.map((s, i) => (
                        <li key={s.t} className="k" style={k(0.6 + i * 0.8)}>
                            <i className={`cl-dot t-${s.tone}`} />
                            <b>{s.t}</b>
                            <span>{s.d}</span>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="cl-stack">
                <div className="cl-box k" style={k(1.3)}>
                    <span className="cl-lbl">{c.planLabel}</span>
                    <div className="cl-plan">
                        {Array.from({ length: c.planTotal }, (_, i) => (
                            <i key={i} className={i < c.planPaid ? "paid k" : undefined} style={i < c.planPaid ? k(2.3 + i * 0.2, "k-pop") : undefined} />
                        ))}
                    </div>
                    <small>
                        {c.planPaid}/{c.planTotal} kỳ đã thu
                    </small>
                </div>
                <div className="cl-box cl-qr k" style={k(2)}>
                    <FakeQR />
                    <div>
                        <b>{c.qrLabel}</b>
                        <small>{c.qrNote}</small>
                    </div>
                </div>
                <div className="cl-sync">
                    <span aria-hidden="true" className="cl-ghost cl-off k" style={k(3, "k-blip", 1.6)}>
                        Mất mạng · 3 chờ đồng bộ
                    </span>
                    <span className="cl-on k" style={k(4.6)}>
                        ✓ Đã đồng bộ
                    </span>
                </div>
            </div>
        </div>
    );
}

function Helpdesk({ c }) {
    const at = [0.3, 2.1, 3.9];
    return (
        <div className="cl-desk">
            <div className="cl-board">
                {c.cols.map((col, ci) => (
                    <div key={col} className="cl-lane">
                        <span className="cl-lbl">{col}</span>
                        <div className={`cl-slot${ci < 2 ? " is-empty" : ""}`}>
                            <article
                                aria-hidden={ci < 2 || undefined}
                                className={`cl-ticket k${ci < 2 ? " cl-ghost" : ""}`}
                                style={ci < 2 ? k(at[ci], "k-blip", at[ci + 1] - at[ci] + 0.15) : k(at[ci])}
                            >
                                <span className="cl-mono">{c.ticket.id}</span>
                                <b>{c.ticket.t}</b>
                                <em className={`pill t-${["apricot", "iris", "ocean"][ci]}`}>{col}</em>
                            </article>
                        </div>
                        {Array.from({ length: [2, 1, 2][ci] }, (_, j) => (
                            <div key={j} className="cl-fill">
                                <i />
                                <i />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <ol className="cl-log">
                {c.log.map((l, i) => (
                    <li key={l} className="k" style={k(0.7 + i * 1.15)}>
                        <i />
                        {l}
                    </li>
                ))}
            </ol>
        </div>
    );
}

function Labels({ c }) {
    return (
        <div className="cl-ace">
            <div className="cl-box cl-form k" style={k(0.1)}>
                <span className="cl-lbl">{c.formLabel}</span>
                {c.form.map(([kk, v], i) => (
                    <div key={kk}>
                        <span>{kk}</span>
                        <b className="k" style={k(0.5 + i * 0.35)}>
                            {v}
                        </b>
                    </div>
                ))}
            </div>
            <div className="cl-calc">
                <span className="cl-lbl k" style={k(1.8)}>
                    {c.calcLabel}
                </span>
                {c.calc.map((x, i) => (
                    <span key={x} className="cl-chip k" style={k(2 + i * 0.25, "k-pop")}>
                        {x}
                    </span>
                ))}
            </div>
            <div className="cl-sheet k" style={k(2.9)}>
                <span className="cl-lbl">{c.sheetLabel}</span>
                <div className="cl-grid">
                    {Array.from({ length: 18 }, (_, i) =>
                        i < c.filled ? (
                            <i key={i} className="tem k" style={k(3.3 + i * 0.12, "k-pop")}>
                                <b />
                                <b />
                                <b />
                            </i>
                        ) : (
                            <i key={i} />
                        ),
                    )}
                </div>
                <div className="cl-tem k" style={k(5.2, "k-pop")}>
                    {c.tem.map((t, i) => (
                        <span key={t} className={i === 3 ? "on" : undefined}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Chat({ c }) {
    return (
        <div className="cl-chat">
            <div className="cl-thread">
                {c.msgs.map((m, i) => (
                    <div key={m.text} className={`cl-msg k${m.me ? " me" : ""}`} style={k(0.2 + i * 0.9)}>
                        <span>{m.who}</span>
                        <p>{m.text}</p>
                    </div>
                ))}
                <div className="cl-msg bot k" style={k(3.7)}>
                    <span>Bot nhắc việc</span>
                    <p>{c.remind}</p>
                </div>
                <div className="cl-done k" style={k(4.9)}>
                    ✓ {c.done}
                </div>
            </div>
            <div className="cl-box cl-extract k" style={k(1.5)}>
                <span className="cl-lbl">{c.extractLabel}</span>
                {c.extract.map(([kk, v], i) => (
                    <div key={kk} className="k" style={k(1.9 + i * 0.35)}>
                        <span>{kk}</span>
                        <b>{v}</b>
                    </div>
                ))}
                <em className="pill t-ocean k" style={k(3.1, "k-pop")}>
                    Đã lên lịch nhắc
                </em>
            </div>
        </div>
    );
}

function Signal({ c }) {
    const W = 600;
    const H = 260;
    const { points, mark } = useMemo(() => {
        const r = rng(11);
        let y = 150;
        const pts = Array.from({ length: 48 }, (_, i) => {
            y = Math.max(30, Math.min(H - 20, y + (r() - (i > 30 ? 0.68 : 0.5)) * 34));
            return [(i * W) / 47, y];
        });
        return { points: pts.map(([x, yy]) => `${x.toFixed(1)},${yy.toFixed(1)}`).join(" "), mark: pts[30] };
    }, []);
    return (
        <div className="cl-signal">
            <ol className="cl-pipe">
                {c.pipe.map((s, i) => (
                    <li key={s} className="k" style={k(0.2 + i * 0.45)}>
                        <i>{String(i + 1).padStart(2, "0")}</i>
                        {s}
                    </li>
                ))}
            </ol>
            <div className="cl-sig">
                <div className="cl-box cl-chart k" style={k(0.6)}>
                    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
                        {[0.25, 0.5, 0.75].map((f) => (
                            <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} />
                        ))}
                        <polyline className="k" style={k(1, "k-draw", 1.8)} points={points} pathLength="100" />
                        <circle className="cl-mark k" style={k(2.9, "k-pop")} cx={mark[0]} cy={mark[1]} r="7" />
                    </svg>
                </div>
                <div className="cl-box cl-card k" style={k(3)}>
                    <div className="cl-head">
                        <b>{c.pair}</b>
                        <em className="pill t-ocean">{c.side}</em>
                    </div>
                    <span className="cl-lbl">{c.scoreLabel}</span>
                    <div className="cl-bar">
                        <i className="k" style={k(3.4, "k-fill", 0.9)} />
                    </div>
                    {c.plan.map(([kk, v]) => (
                        <div key={kk} className="cl-row">
                            <span>{kk}</span>
                            <b>{v}</b>
                        </div>
                    ))}
                    <small className="k" style={k(4.4)}>
                        {c.result}
                    </small>
                </div>
            </div>
        </div>
    );
}

function Agents({ c }) {
    return (
        <ol className="cl-agents">
            {c.lines.map(([who, what, type], i) => (
                <li key={i} className={`k is-${type}`} style={k(0.3 + i * 0.65)}>
                    <span className="cl-mono">{String(i + 1).padStart(2, "0")}</span>
                    <b>{who}</b>
                    <span>{what}</span>
                    <i aria-hidden="true">{type === "ok" ? "✓" : type === "warn" ? "!" : "·"}</i>
                </li>
            ))}
        </ol>
    );
}

const scenes = { vehicle: Vehicle, helpdesk: Helpdesk, labels: Labels, chat: Chat, signal: Signal, agents: Agents };

export function CaseClip({ clip, tone, dark }) {
    const ref = useRef(null);
    const state = useClipPlay(ref);
    const [run, setRun] = useState(0);
    const Scene = scenes[clip.kind];
    return (
        <figure ref={ref} className={`proof proof-${tone} clip clip-${clip.kind}${dark ? " clip-dark" : ""} is-${state}`}>
            <div className="clip-win">
                <div className="clip-bar">
                    <i />
                    <i />
                    <i />
                    <span>{clip.app}</span>
                    {state !== "still" && (
                        <button type="button" className="clip-replay" onClick={() => setRun((n) => n + 1)}>
                            ↻ {replayLabel}
                        </button>
                    )}
                </div>
                <div className="clip-body" key={run}>
                    <Scene c={clip} />
                </div>
            </div>
            <figcaption>
                <b>{clip.title}</b>
                <span>{clipNote}</span>
            </figcaption>
        </figure>
    );
}
