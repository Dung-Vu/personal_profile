import { getClipsContent, getSiteContent } from "../content/index.js";
import { localizePath, useLocale } from "../lib/i18n.js";
import { Link } from "../lib/router.jsx";
import { ProofWindow } from "./ProofWindow.jsx";

// Thẻ dự án dùng ở /work và trang chủ. size: "feature" (kèm ảnh minh hoạ) | "wide" | "small".
export function CaseCard({ project, index, size = "small", showShot = false, as: Heading = "h3", transition = true }) {
    const locale = useLocale();
    const isEn = locale === "en";
    const { ui = {} } = getSiteContent(locale);
    const { proofNote } = getClipsContent(locale);

    const no = String(index + 1).padStart(2, "0");
    const pillClass = project.tone === "mint" ? "pill t-mint" : `pill t-${project.tone}`;
    const href = localizePath(`/work/${project.slug}`, locale);
    const casePrefix = ui.work?.casePrefix || "Case";
    const replacedSr = ui.work?.replacedBySr || (isEn ? ", replaced by" : ", thay bằng");

    return (
        <article className={`case case-${size}${project.dark ? " case-dark" : ""}${project.slug === "evone" ? " case-ev" : ""}`}>
            <div className="cat">
                <span className={pillClass}>{project.tag}</span>
                <span className="label">
                    {casePrefix} {no}
                </span>
            </div>
            <Heading style={transition ? { viewTransitionName: `case-title-${project.slug}` } : undefined}>
                <Link href={href} className="case-link">
                    {project.cardTitle}
                </Link>
            </Heading>
            <p className="ba">
                {project.before && (
                    <>
                        <s>{project.before}</s> <span aria-hidden="true">→</span>
                        <span className="sr-only">{replacedSr}</span>{" "}
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
                    <span className="redact">{proofNote}</span>
                </div>
            ) : (
                <span className="go" aria-hidden="true">
                    →
                </span>
            )}
        </article>
    );
}
