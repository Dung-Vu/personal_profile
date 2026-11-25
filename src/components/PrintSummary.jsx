import { getAboutContent, getProjectsContent, getSiteContent, getTrustContent } from "../content/index.js";

// Single-page A4 executive capability sheet: hidden on screen (display:none via print.css),
// visible ONLY in @media print. Deliberately avoids <h1> and landmark tags (<main>/<header>/<footer>/<aside>)
// so a11y audits on all 21 routes maintain strict h1=1 and zero duplicate-landmark warnings.
export function PrintSummary({ locale = "vi" }) {
    const lang = locale === "en" ? "en" : "vi";
    const isEn = lang === "en";
    const { site, stats, ui = {} } = getSiteContent(lang);
    const { about } = getAboutContent(lang);
    const { projects } = getProjectsContent(lang);
    const { collab, safety, promise } = getTrustContent(lang);

    const labels = {
        docTag: ui.print?.title || (isEn ? "Executive Capability Summary" : "Hồ sơ năng lực tóm tắt"),
        metrics: isEn ? "Key Verified Metrics" : "Số liệu đang chạy thật",
        systems: ui.print?.selectedWork || (isEn ? "6 Live Production Systems" : "6 hệ thống tiêu biểu đang chạy thật"),
        principles: ui.print?.principles || (isEn ? "4 Working Principles" : "4 nguyên tắc làm việc"),
        toolbox: isEn ? "Core Toolbox" : "Bộ công cụ chính",
        collabSafety: isEn ? "Engagement & Data Safety" : "Cách hợp tác & an toàn dữ liệu",
        footerNote:
            ui.print?.summaryNote ||
            (isEn
                ? `Generated from ${site.domain} · Rounded, anonymized operational figures; client data protected.`
                : `Xuất từ ${site.domain} · Số liệu tổng hợp, làm tròn và ẩn danh để bảo vệ dữ liệu khách hàng.`),
    };

    return (
        <div className="print-sheet" aria-hidden="true">
            <div className="ps-top">
                <div>
                    <div className="ps-eyebrow">{labels.docTag}</div>
                    <div className="ps-name">{site.name}</div>
                    <div className="ps-role">
                        {site.role} · {(site.focus || []).join(" · ")}
                    </div>
                </div>
                <div className="ps-contact">
                    <div>{site.domain}</div>
                    <div>{site.email}</div>
                    <div>{site.phone} (Zalo)</div>
                    <div>github.com/{site.githubName}</div>
                </div>
            </div>

            <p className="ps-pitch">{site.pitch}</p>

            <div className="ps-block">
                <div className="ps-heading">{labels.metrics}</div>
                <div className="ps-stats">
                    {stats.map((st) => (
                        <div key={st.label} className="ps-stat">
                            <strong>{st.value}</strong>
                            <span>{st.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="ps-block">
                <div className="ps-heading">{labels.systems}</div>
                <div className="ps-projects">
                    {projects.slice(0, 6).map((p) => (
                        <div key={p.slug} className="ps-project">
                            <div className="ps-project-head">
                                <strong>{p.cardTitle || p.name}</strong>
                                <span>
                                    {p.tag} · {p.year || "2026"}
                                </span>
                            </div>
                            <p className="ps-project-line">{p.subtitle || p.line}</p>
                            {p.metric && (
                                <div className="ps-project-metric">
                                    <b>{p.metric.value}</b> {p.metric.label}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="ps-cols">
                <div className="ps-block">
                    <div className="ps-heading">{labels.principles}</div>
                    <ul className="ps-list">
                        {about.principles.map((pr) => (
                            <li key={pr.no}>
                                <strong>
                                    {pr.no}. {pr.title}:
                                </strong>{" "}
                                {pr.desc}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="ps-block">
                    <div className="ps-heading">{labels.toolbox}</div>
                    <div className="ps-toolbox">
                        {about.toolbox.map((tb) => (
                            <div key={tb.group} className="ps-tool-row">
                                <strong>{tb.group}:</strong> <span>{tb.items.join(" · ")}</span>
                            </div>
                        ))}
                    </div>

                    <div className="ps-heading ps-heading-sub">{labels.collabSafety}</div>
                    <ul className="ps-list ps-list-tight">
                        <li>
                            <strong>{isEn ? "Formats:" : "Hình thức:"}</strong>{" "}
                            {collab.forms.map((f) => f.title).join(" · ")}
                        </li>
                        <li>
                            <strong>{isEn ? "Data safety:" : "Dữ liệu:"}</strong>{" "}
                            {safety.items.map((it) => it.title).join(" · ")}
                        </li>
                        <li>
                            <strong>{isEn ? "Commitment:" : "Cam kết:"}</strong> {promise.join(" · ")}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="ps-foot">{labels.footerNote}</div>
        </div>
    );
}

export default PrintSummary;
