import { Suspense, lazy, useState } from "react";
import { getClipsContent, getProjectsContent, getSiteContent } from "../content/index.js";
import { localizePath, useLocale } from "../lib/i18n.js";
import { CaseClip } from "../components/CaseClip.jsx";
import { ContactBlock } from "../components/ContactBlock.jsx";
import { Link } from "../lib/router.jsx";
import NotFound from "./NotFound.jsx";
import "../styles/case.css";

const CaseSandbox = lazy(() => import("../components/sandboxes/CaseSandbox.jsx"));

export default function CaseDetail({ slug }) {
    const locale = useLocale();
    const isEn = locale === "en";
    const { ui = {} } = getSiteContent(locale);
    const { getProject, getNextProject } = getProjectsContent(locale);
    const { baLabels, clips } = getClipsContent(locale);

    const [lens, setLens] = useState("business");

    const p = getProject(slug);
    if (!p) return <NotFound />;

    const next = getNextProject(slug);
    const before = p.caseBefore ?? p.before;
    const after = p.caseAfter ?? p.after;
    const cd = ui.caseDetail || {};
    const techSec = cd.techSections || {};

    const breadcrumbAria = cd.breadcrumbAria || (isEn ? "Breadcrumb" : "Đường dẫn trang");
    const workLabel = cd.breadcrumbWork || (isEn ? "Work" : "Dự án");
    const runningPill = cd.runningPill || (isEn ? "Live" : "Đang chạy");
    const businessLensLabel = cd.businessLens || (isEn ? "Executive View" : "Góc nhìn Doanh nghiệp");
    const techLensLabel = cd.techLens || (isEn ? "Technical View" : "Góc nhìn Kỹ thuật");
    const lensAria = cd.lensLabel || (isEn ? "Viewpoint" : "Góc nhìn");
    const lensHint =
        lens === "tech"
            ? cd.techHint || (isEn ? "Showing stack, architecture, test coverage & rollback safety." : "Đang hiện công nghệ, kiến trúc, kiểm thử tự động & an toàn triển khai.")
            : cd.businessHint || (isEn ? "Showing operational outcomes, workflow & modules." : "Đang hiện kết quả vận hành, quy trình & tính năng.");

    const stackTitle = techSec.stack || (isEn ? "Core stack" : "Công nghệ cốt lõi");
    const archTitle = techSec.architecture || (isEn ? "Architecture & data flow" : "Kiến trúc & luồng dữ liệu");
    const testTitle = techSec.testing || (isEn ? "Automated testing" : "Kiểm thử tự động");
    const safetyTitle = techSec.safety || (isEn ? "Safety & rollback" : "An toàn & khôi phục");

    const problemHeading = cd.problem || (isEn ? "The Problem" : "Bài toán");
    const approachHeading = cd.approach || (isEn ? "The Approach" : "Cách làm");
    const resultHeading = cd.result || (isEn ? "The Outcome" : "Kết quả");
    const nextLabel = cd.nextLabel || (isEn ? "Next case study" : "Dự án tiếp theo");

    return (
        <main id="main" tabIndex={-1} className="page-case">
            <div className="wrap">
                <nav className="crumb" aria-label={breadcrumbAria}>
                    <Link href={localizePath("/work", locale)}>{workLabel}</Link>
                    <span aria-hidden="true">&nbsp; / &nbsp;</span>
                    <b aria-current="page">{p.name}</b>
                </nav>
                <div className="case-title">
                    <div>
                        <h1 id="case-title" className="display" style={{ viewTransitionName: `case-title-${p.slug}` }}>
                            {p.name}
                            <small>{p.subtitle}</small>
                        </h1>
                        <div className="tags">
                            <span className={`pill t-${p.tone === "mint" ? "ocean" : p.tone}`}>{p.tag}</span>
                            <span className="pill t-ocean">{runningPill}</span>
                            <span className="pill t-apricot">{p.year || "2026"}</span>
                        </div>
                    </div>
                    <dl className="facts">
                        {p.facts.map((f) => (
                            <div key={f.k}>
                                <dt>{f.k}</dt>
                                <dd>{f.v}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <dl className="metrics">
                    {p.metrics.map((m) => (
                        <div key={m.label}>
                            <dt>{m.label}</dt>
                            <dd>{m.value}</dd>
                        </div>
                    ))}
                </dl>

                {p.tech && (
                    <div className="lens-row">
                        <div className="lens-switch" role="group" aria-label={lensAria}>
                            <button
                                type="button"
                                className={lens === "business" ? "on" : undefined}
                                aria-pressed={lens === "business"}
                                onClick={() => setLens("business")}
                            >
                                {businessLensLabel}
                            </button>
                            <button
                                type="button"
                                className={lens === "tech" ? "on" : undefined}
                                aria-pressed={lens === "tech"}
                                onClick={() => setLens("tech")}
                            >
                                {techLensLabel}
                            </button>
                        </div>
                        <p className="lens-hint">{lensHint}</p>
                    </div>
                )}

                {lens === "tech" && p.tech && (
                    <section className="tech-panel" aria-labelledby="tech-panel-title">
                        <div className="tech-panel-head">
                            <div>
                                <span className="label">
                                    <span className="dot" />
                                    {techLensLabel}
                                </span>
                                <h2 id="tech-panel-title" className="tech-summary">
                                    {p.tech.summary}
                                </h2>
                            </div>
                            {Array.isArray(p.tech.stack) && p.tech.stack.length > 0 && (
                                <div className="tech-stack-wrap">
                                    <span className="label">{stackTitle}</span>
                                    <ul className="tech-stack">
                                        {p.tech.stack.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="tech-grid">
                            {Array.isArray(p.tech.architecture) && p.tech.architecture.length > 0 && (
                                <div className="tech-card">
                                    <h3>{archTitle}</h3>
                                    <ul>
                                        {p.tech.architecture.map((line) => (
                                            <li key={line}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {Array.isArray(p.tech.testing) && p.tech.testing.length > 0 && (
                                <div className="tech-card">
                                    <h3>{testTitle}</h3>
                                    <ul>
                                        {p.tech.testing.map((line) => (
                                            <li key={line}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {Array.isArray(p.tech.safety) && p.tech.safety.length > 0 && (
                                <div className="tech-card">
                                    <h3>{safetyTitle}</h3>
                                    <ul>
                                        {p.tech.safety.map((line) => (
                                            <li key={line}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                <CaseClip key={p.slug} clip={clips[p.slug]} tone={p.tone} dark={p.dark} />

                <Suspense fallback={null}>
                    <CaseSandbox key={p.slug} slug={p.slug} locale={locale} tone={p.tone} dark={p.dark} />
                </Suspense>

                {before && (
                    <section className="ba" aria-label={baLabels.title}>
                        <div className="ba-before">
                            <span className="label">{baLabels.before}</span>
                            <p>{before}</p>
                        </div>
                        <span className="ba-arrow" aria-hidden="true">
                            →
                        </span>
                        <div className={`ba-after ba-${p.tone}`}>
                            <span className="label">{baLabels.after}</span>
                            <p>{after.charAt(0).toUpperCase() + after.slice(1)}</p>
                        </div>
                    </section>
                )}

                <section className="story-row">
                    <h2>{problemHeading}</h2>
                    <p>{p.problem}</p>
                </section>
                <section className="story-row">
                    <h2>{approachHeading}</h2>
                    <div>
                        <p>{p.approach}</p>
                        <div className="case-mods">
                            {p.modulesDetail.map((m) => (
                                <div key={m.title}>
                                    <b>{m.title}</b>
                                    <span>{m.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="story-row">
                    <h2>{resultHeading}</h2>
                    <p>{p.result}</p>
                </section>

                <Link className="next" href={localizePath(`/work/${next.slug}`, locale)}>
                    <div>
                        <span className="label">{nextLabel}</span>
                        <b>{next.cardTitle}</b>
                    </div>
                    <span className="arrow" aria-hidden="true">
                        →
                    </span>
                </Link>
            </div>
            <ContactBlock />
        </main>
    );
}
