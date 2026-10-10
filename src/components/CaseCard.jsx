import { Link } from "../lib/router.jsx";
import { ProofWindow } from "./ProofWindow.jsx";

// Thẻ dự án dùng ở /work và trang chủ. size: "feature" (kèm ảnh minh hoạ) | "wide" | "small".
export function CaseCard({ project, index, size = "small", showShot = false }) {
    const no = String(index + 1).padStart(2, "0");
    const pillClass = project.tone === "mint" ? "pill t-mint" : `pill t-${project.tone}`;
    return (
        <article className={`case case-${size}${project.dark ? " case-dark" : ""}${project.slug === "evone" ? " case-ev" : ""}`}>
            <div className="cat">
                <span className={pillClass}>{project.tag}</span>
                <span className="label">Case {no}</span>
            </div>
            <h3>
                <Link href={`/work/${project.slug}`} className="case-link">
                    {project.cardTitle}
                </Link>
            </h3>
            <p className="ba">
                {project.before && (
                    <>
                        <s>{project.before}</s> <span aria-hidden="true">→</span>
                        <span className="sr-only">, thay bằng</span>{" "}
                    </>
                )}
                {project.after}
            </p>
            <div className="ms">
                {project.cardMetrics.map((m) => (
                    <div key={m.label}>
                        <b>{m.value}</b>
                        <span>{m.label}</span>
                    </div>
                ))}
            </div>
            {showShot ? (
                <div className="shot">
                    <ProofWindow proof={project.proof} seed={index + 3} compact />
                    <span className="redact">dữ liệu đã che</span>
                </div>
            ) : (
                <span className="go" aria-hidden="true">
                    →
                </span>
            )}
        </article>
    );
}
