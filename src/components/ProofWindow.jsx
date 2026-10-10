import { rng } from "../lib/particles.jsx";

// Ảnh minh hoạ giao diện đã che dữ liệu: khung cửa sổ, sidebar, KPI và bảng với ô làm mờ.
export function ProofWindow({ proof, seed = 1, compact = false }) {
    const r = rng(seed);
    const w = () => `${Math.round(55 + r() * 35)}%`;
    return (
        <div className={`win${compact ? " win-compact" : ""}`} role="img" aria-label={`Ảnh minh hoạ giao diện ${proof.app}, dữ liệu đã che`}>
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
                        {proof.kpis.map((k) => (
                            <div key={k}>
                                {k}
                                <b />
                            </div>
                        ))}
                    </div>
                    <div className="win-tbl">
                        <div>
                            {proof.cols.map((c) => (
                                <span key={c}>{c}</span>
                            ))}
                        </div>
                        {proof.statuses.map(([label, tone], i) => (
                            <div key={i}>
                                <i style={{ width: w() }} />
                                <i style={{ width: w() }} />
                                <i style={{ width: w() }} />
                                <em className={`t-${tone}`}>{label}</em>
                                <i style={{ width: w() }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
