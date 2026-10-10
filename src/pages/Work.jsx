import { useState } from "react";
import { categories, extras, projects } from "../content/projects.js";
import { CaseCard } from "../components/CaseCard.jsx";
import { ContactBlock } from "../components/ContactBlock.jsx";
import "../styles/work.css";

const sizes = { evone: "feature", "odoo-bonario": "wide", "ace-ra-tem": "wide" };

export default function Work() {
    const [cat, setCat] = useState("all");
    const list = cat === "all" ? projects : projects.filter((p) => p.category === cat);
    return (
        <>
            <main id="main" className="page page-work">
                <div className="wrap">
                    <div className="head">
                        <div>
                            <span className="label">
                                <span className="dot" />
                                Dự án · 2026
                            </span>
                            <h1 id="work-title" className="h2 page-title">
                                Những hệ thống đang chạy thật mỗi ngày.
                            </h1>
                        </div>
                        <p className="lead">Mỗi dự án kể theo cùng một khung: bài toán, cách làm, kết quả đo được. Dữ liệu khách hàng đã được che.</p>
                    </div>
                    <div className="filters" role="group" aria-label="Lọc dự án theo nhóm">
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
                        Đang hiện {list.length} dự án
                    </p>
                    <div className={`case-grid${cat === "all" ? "" : " is-filtered"}`}>
                        {list.map((p) => {
                            const index = projects.indexOf(p);
                            const size = cat === "all" ? sizes[p.slug] ?? "small" : "wide";
                            return <CaseCard key={p.slug} project={p} index={index} size={size} showShot={cat === "all" && p.slug === "evone"} />;
                        })}
                    </div>
                    <div className="more">
                        <h2 className="label">Và còn nữa</h2>
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
            </main>
            <ContactBlock />
        </>
    );
}
