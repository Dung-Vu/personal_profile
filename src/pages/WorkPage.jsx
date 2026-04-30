import { ArrowRight, BarChart3, Bot, Boxes, ExternalLink, Gauge, Workflow } from "lucide-react";
import "../styles/work.css";
import { projects } from "../content/projects";
import { navigateTo } from "../hooks/useRoutePath";

const caseDesign = {
    "tca-crypto-analyzer": {
        tone: "cyan",
        label: "Market Signal Surface",
        decision: "Ưu tiên một màn hình đọc nhanh: hierarchy rõ, chart/signal tách lớp, metadata luôn ở gần hành động.",
        context: "Trader cần giảm nhiễu khi theo dõi market biến động nhanh.",
        proof: ["Signal density", "Fast scan", "Dashboard hierarchy"],
        icon: BarChart3,
    },
    "bonario-product-hub": {
        tone: "amber",
        label: "Operations Control Hub",
        decision: "Biến thao tác sản phẩm lặp lại thành workflow có trạng thái, ít nhảy màn hình và dễ mở rộng theo module.",
        context: "Đội vận hành cần một hub kết nối dữ liệu sản phẩm, API và Odoo.",
        proof: ["Admin flow", "State clarity", "Odoo bridge"],
        icon: Boxes,
    },
    "ai-operator-workflow": {
        tone: "green",
        label: "Automation Lab System",
        decision: "Chuẩn hóa vòng lặp AI + CLI + browser QA để code nhanh hơn nhưng vẫn có checkpoint runtime rõ ràng.",
        context: "Nhiều agent, nhiều tool và nhiều session dễ làm mất context kỹ thuật.",
        proof: ["AI loop", "Runtime QA", "Reusable memory"],
        icon: Bot,
    },
};

const theaterStats = [
    { label: "Flagship cases", value: "03" },
    { label: "Project types", value: "Dashboard / Ops / AI" },
    { label: "Case format", value: "Bài toán -> Cách làm -> Kết quả" },
];

function WorkCaseCard({ project, index }) {
    const design = caseDesign[project.slug];
    const Icon = design.icon;

    return (
        <article className="work-case-card" data-tone={design.tone} aria-label={`${project.title} case study`}>
            <div className="case-visual">
                <img src={project.assets.cover} alt={`${project.title} interface preview`} loading="lazy" decoding="async" />
                <div className="case-visual-overlay">
                    <span className="case-number">{String(index + 1).padStart(2, "0")}</span>
                    <div className="case-signal-chip">
                        <Icon aria-hidden="true" />
                        {design.label}
                    </div>
                </div>
            </div>

            <div className="case-content">
                <div className="case-meta">
                    <span>{project.type}</span>
                    <span>{project.status}</span>
                    <span>{project.year}</span>
                </div>

                <div className="case-title-row">
                    <h2>{project.title}</h2>
                    <span>{project.systemRole}</span>
                </div>

                <p className="case-summary">{project.summary}</p>

                <dl className="case-proof-grid">
                    <div>
                        <dt>Context</dt>
                        <dd>{design.context}</dd>
                    </div>
                    <div>
                        <dt>Problem</dt>
                        <dd>{project.problem}</dd>
                    </div>
                    <div>
                        <dt>Decision</dt>
                        <dd>{design.decision}</dd>
                    </div>
                    <div>
                        <dt>Role</dt>
                        <dd>{project.role}</dd>
                    </div>
                    <div>
                        <dt>Outcome</dt>
                        <dd>{project.outcome}</dd>
                    </div>
                    <div>
                        <dt>Deliverables</dt>
                        <dd>{project.deliverables.join(" / ")}</dd>
                    </div>
                </dl>

                <dl className="case-status-grid" aria-label={`${project.title} proof status`}>
                    <div>
                        <dt>Status</dt>
                        <dd>{project.status}</dd>
                    </div>
                    <div>
                        <dt>Timeline</dt>
                        <dd>{project.timeline}</dd>
                    </div>
                    <div>
                        <dt>Proof note</dt>
                        <dd>{project.privateReason}</dd>
                    </div>
                    <div>
                        <dt>Next proof</dt>
                        <dd>{project.nextProof}</dd>
                    </div>
                </dl>

                <div className="tech-row">
                    {project.tech.map((tech) => (
                        <span key={tech}>{tech}</span>
                    ))}
                </div>

                <a className="case-detail-link" href={`/work/${project.slug}`} onClick={(e) => { e.preventDefault(); navigateTo(`/work/${project.slug}`); }}>
                    Đọc case chi tiết <ArrowRight aria-hidden="true" />
                </a>
                {project.liveUrl ? (
                    <a className="case-proof-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live proof <ExternalLink aria-hidden="true" />
                    </a>
                ) : null}
            </div>
        </article>
    );
}

export function WorkPage() {
    return (
        <section className="page work-page" aria-labelledby="work-title">
            <div className="work-hero-shell">
                <div className="work-hero">
                    <div className="page-kicker">Case Studies</div>
                    <h1 id="work-title">3 case tiêu biểu: dashboard, internal tool và AI workflow.</h1>
                    <p>
                        Mỗi case ghi rõ bối cảnh, vai trò, quyết định UI/system, kết quả và trạng thái public/private
                        để người xem biết phần nào đã ship, phần nào cần giữ nội bộ.
                    </p>
                </div>

                <aside className="work-theater-panel" aria-label="Work page evidence model">
                    <div className="theater-panel-row">
                        <Gauge aria-hidden="true" />
                        <span>Cách mình trình bày case</span>
                    </div>
                    <strong>Bài toán {"->"} Cách làm {"->"} Kết quả</strong>
                    <p>Mỗi dự án ghi rõ phạm vi, vai trò, team, trạng thái và minh chứng thực tế thay vì số liệu phần trăm không có nguồn.</p>
                    <div className="theater-stats">
                        {theaterStats.map((stat) => (
                            <div key={stat.label}>
                                <span>{stat.label}</span>
                                <strong>{stat.value}</strong>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            <div className="case-route-map" aria-label="Case theater route map">
                {projects.map((project, index) => {
                    const design = caseDesign[project.slug];
                    return (
                        <a key={project.slug} href={`#${project.slug}`} data-tone={design.tone}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <strong>{project.title}</strong>
                            <small>{design.label}</small>
                        </a>
                    );
                })}
            </div>

            <div className="work-case-list">
                {projects.map((project, index) => (
                    <div id={project.slug} key={project.slug}>
                        <WorkCaseCard project={project} index={index} />
                    </div>
                ))}
            </div>

            <div className="route-panel work-route-panel">
                <Workflow aria-hidden="true" />
                <span>Ready for next project</span>
                <strong>Cần biến quy trình phức tạp thành giao diện trực quan?</strong>
                <a className="route-cta primary" href="/contact" onClick={(e) => { e.preventDefault(); navigateTo("/contact"); }}>
                    Liên hệ <ArrowRight aria-hidden="true" />
                </a>
            </div>
        </section>
    );
}
