import { getClipsContent } from "../content/index.js";
import { useLocale } from "../lib/i18n.js";
import { rng } from "../lib/particles.jsx";

// Ảnh minh hoạ giao diện: khung cửa sổ, sidebar, KPI và bảng.
// Có rows/kpiValues thì hiện dữ liệu giả đọc được; không có thì hiện thanh giữ chỗ phẳng (không blur).
const kpiBarStyle = {
    display: "block",
    marginTop: 6,
    height: 22,
    width: "70%",
    borderRadius: 6,
    background: "var(--paper-2)",
};

const cellBarStyle = (width) => ({
    display: "block",
    height: 9,
    width,
    borderRadius: 5,
    background: "var(--paper-2)",
});

export function ProofWindow({ proof, seed = 1, compact = false }) {
    const locale = useLocale();
    const { proofNote } = getClipsContent(locale);
    if (!proof) return null;
    const r = rng(seed);
    const w = () => `${Math.round(55 + r() * 35)}%`;
    const rows = proof.rows;
    const ariaLabel =
        locale === "en"
            ? `Illustrative interface preview of ${proof.app}, ${proofNote}`
            : `Ảnh minh hoạ giao diện ${proof.app}, ${proofNote}`;
    return (
        <div className={`win${compact ? " win-compact" : ""}`} role="img" aria-label={ariaLabel}>
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
                                {proof.kpiValues?.[i] != null ? <strong>{proof.kpiValues[i]}</strong> : <span style={kpiBarStyle} aria-hidden="true" />}
                            </div>
                        ))}
                    </div>
                    <div className="win-tbl">
                        <div>
                            {proof.cols.map((c) => (
                                <span key={c}>{c}</span>
                            ))}
                        </div>
                        {proof.statuses.map(([label, tone], i) => {
                            const row = rows?.[i];
                            return row ? (
                                <div key={i}>
                                    <span className="mono">{row?.[0] ?? ""}</span>
                                    <span>{row?.[1] ?? ""}</span>
                                    <span>{row?.[2] ?? ""}</span>
                                    <em className={`t-${tone}`}>{label}</em>
                                    <span className="muted">{row?.[3] ?? ""}</span>
                                </div>
                            ) : (
                                <div key={i}>
                                    <span style={cellBarStyle(w())} aria-hidden="true" />
                                    <span style={cellBarStyle(w())} aria-hidden="true" />
                                    <span style={cellBarStyle(w())} aria-hidden="true" />
                                    <em className={`t-${tone}`}>{label}</em>
                                    <span style={cellBarStyle(w())} aria-hidden="true" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
