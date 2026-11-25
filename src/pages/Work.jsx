import { useState } from "react";
import { getProjectsContent, getSiteContent } from "../content/index.js";
import { useLocale } from "../lib/i18n.js";
import { CaseCard } from "../components/CaseCard.jsx";
import { ContactBlock } from "../components/ContactBlock.jsx";
import "../styles/work.css";

const sizes = { evone: "feature", "odoo-bonario": "wide", "ace-ra-tem": "wide" };

export default function Work() {
    const locale = useLocale();
    const isEn = locale === "en";
    const { site, ui = {} } = getSiteContent(locale);
    const { categories, extras, projects } = getProjectsContent(locale);
    const workUi = ui.work || {};

    const [cat, setCat] = useState("all");
    const list = cat === "all" ? projects : projects.filter((p) => p.category === cat);

    const eyebrow = workUi.label || (isEn ? `Work · ${site.year}` : `Dự án · ${site.year}`);
    const title = workUi.heading || (isEn ? "Production systems running every day." : "Những hệ thống đang chạy thật mỗi ngày.");
    const lead =
        workUi.lead ||
        (isEn
            ? "Every case follows the same frame: problem, approach, measurable outcome. Client data is redacted."
            : "Mỗi dự án kể theo cùng một khung: bài toán, cách làm, kết quả đo được. Dữ liệu khách hàng đã được che.");
    const filterAria = workUi.filterAria || (isEn ? "Filter systems by category" : "Lọc dự án theo nhóm");
    const countText = workUi.countTpl
        ? workUi.countTpl.replace("{n}", String(list.length))
        : isEn
          ? `Showing ${list.length} systems`
          : `Đang hiện ${list.length} dự án`;
    const moreLabel = workUi.moreLabel || (isEn ? "And more" : "Và còn nữa");

    return (
        <main id="main" tabIndex={-1} className="page-work">
            <div className="page">
                <div className="wrap">
                    <div className="head">
                        <div>
                            <span className="label">
                                <span className="dot" />
                                {eyebrow}
                            </span>
                            <h1 id="work-title" className="h2 page-title">
                                {title}
                            </h1>
                        </div>
                        <p className="lead">{lead}</p>
                    </div>
                    <div className="filters" role="group" aria-label={filterAria}>
                        {categories.map((c) => {
                            const n = c.id === "all" ? projects.length : projects.filter((p) => p.category === c.id).length;
                            return (
                                <button key={c.id} type="button" className={cat === c.id ? "on" : undefined} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
                                    {c.label}
                                    <em>{String(n).padStart(2, "0")}</em>
                                </button>
                            );
                        })}
                    </div>
                    <p className="sr-only" aria-live="polite">
                        {countText}
                    </p>
                    <div className={`case-grid${cat === "all" ? "" : " is-filtered"}`}>
                        {list.map((p) => {
                            const index = projects.indexOf(p);
                            const size = cat === "all" ? sizes[p.slug] ?? "small" : "wide";
                            return <CaseCard key={p.slug} project={p} index={index} size={size} showShot={cat === "all" && p.slug === "evone"} as="h2" />;
                        })}
                    </div>
                    <div className="more">
                        <h2 className="label">{moreLabel}</h2>
                        <div className="more-grid">
                            {extras.map((e) => (
                                <div className="mini" key={e.title}>
                                    <b>{e.title}</b>
                                    <span>{e.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ContactBlock />
        </main>
    );
}
