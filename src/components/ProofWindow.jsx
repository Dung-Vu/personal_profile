import { proofNote } from "../content/clips.js";
import { rng } from "../lib/particles.jsx";

// Ảnh minh hoạ giao diện: khung cửa sổ, sidebar, KPI và bảng.
// Có rows/kpiValues thì hiện dữ liệu giả đọc được; không có thì làm mờ ô như cũ.
export function ProofWindow({ proof, seed = 1, compact = false }) {
    const r = rng(seed);
    const w = () => `${Math.round(55 + r() * 35)}%`;
    const rows = proof.rows;
    return (
        <div className={`win${compact ? " win-compact" : ""}`} role="img" aria-label={`Ảnh minh hoạ giao diện ${proof.app}, ${proofNote}`}>
            <div className="win-bar">
                <i />
                <i />
                <i />
                <span>{proof.app}</span>
            </div>
            <div className="win-body">
                <div className="win-side">
                    {proof.side.map((s, i) => (
                        <span key={s} className={i === proof.active ? "on" : undefined}>
                            {s}
                        </span>
                    ))}
                </div>
                <div className="win-main">
                    <div className="win-kp">
                        {proof.kpis.map((k, i) => (
                            <div key={k}>
                                {k}
                                {proof.kpiValues ? <strong>{proof.kpiValues[i]}</strong> : <b />}
                            </div>
                        ))}
                    </div>
                    <div className="win-tbl">
                        <div>
                            {proof.cols.map((c) => (
                                <span key={c}>{c}</span>
                            ))}
                        </div>
                        {proof.statuses.map(([label, tone], i) =>
                            rows ? (
                                <div key={i}>
                                    <span className="mono">{rows[i][0]}</span>
                                    <span>{rows[i][1]}</span>
                                    <span>{rows[i][2]}</span>
                                    <em className={`t-${tone}`}>{label}</em>
                                    <span className="muted">{rows[i][3]}</span>
                                </div>
                            ) : (
                                <div key={i}>
                                    <i style={{ width: w() }} />
                                    <i style={{ width: w() }} />
                                    <i style={{ width: w() }} />
                                    <em className={`t-${tone}`}>{label}</em>
                                    <i style={{ width: w() }} />
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
