import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BarChart3, Bot, Boxes, ExternalLink, Workflow, ArrowDownToLine } from "lucide-react";
import "../styles/work.css";
import { projects } from "../content/projects";
import { navigateTo } from "../hooks/useRoutePath";

gsap.registerPlugin(ScrollTrigger);

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

function WorkCaseDossier({ project, index }) {
    const design = caseDesign[project.slug];
    const Icon = design.icon;

    return (
        <article className="dossier-card" id={project.slug} data-tone={design.tone} aria-label={`${project.title} case study`}>
            {/* Visual Header */}
            <div className="dossier-visual">
                <img src={project.assets.cover} alt={`${project.title} interface preview`} loading="lazy" decoding="async" />
                <div className="dossier-visual-overlay">
                    <div className="dossier-badge">
                        <Icon size={14} aria-hidden="true" />
                        <span>{design.label}</span>
                    </div>
                    <span className="dossier-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
            </div>

            <div className="dossier-body">
                {/* Meta Strip */}
                <div className="dossier-meta-strip">
                    <span className="dossier-type">{project.type}</span>
                    <span className="dossier-divider">/</span>
                    <span className="dossier-role">{project.systemRole}</span>
                    <span className="dossier-divider">/</span>
                    <span className="dossier-year">{project.year}</span>
                </div>

                {/* Title */}
                <div className="dossier-header">
                    <h2>{project.title}</h2>
                    <p className="dossier-summary">{project.summary}</p>
                </div>

                {/* The Core Analytical Grid */}
                <div className="dossier-grid">
                    <div className="dossier-block span-2">
                        <h3>Context & Problem</h3>
                        <p><strong>{design.context}</strong></p>
                        <p>{project.problem}</p>
                    </div>

                    {/* Highlighted Decision Block */}
                    <div className="dossier-block highlight span-2">
                        <h3>Key Decision</h3>
                        <p className="dossier-decision-text">{design.decision}</p>
                    </div>

                    <div className="dossier-block">
                        <h3>Outcome</h3>
                        <p>{project.outcome}</p>
                    </div>

                    <div className="dossier-block">
                        <h3>Status / Proof</h3>
                        <ul className="dossier-list">
                            <li><span>State:</span> {project.status}</li>
                            <li><span>Note:</span> {project.privateReason || project.nextProof}</li>
                        </ul>
                    </div>
                </div>

                {/* Tech & Actions */}
                <div className="dossier-footer">
                    <div className="dossier-tech">
                        {project.tech.map((tech) => (
                            <span key={tech}>{tech}</span>
                        ))}
                    </div>
                    <div className="dossier-actions">
                        {project.liveUrl && (
                            <a className="dossier-link secondary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                Live proof <ExternalLink size={14} aria-hidden="true" />
                            </a>
                        )}
                        <a className="dossier-link primary" href={`/work/${project.slug}`} onClick={(e) => { e.preventDefault(); navigateTo(`/work/${project.slug}`); }}>
                            Đọc case chi tiết <ArrowRight size={14} aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}

export function WorkPage() {
    const containerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const ctx = gsap.context(() => {
            gsap.from(".dossier-card", {
                scrollTrigger: {
                    trigger: ".work-editorial-content",
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                clearProps: "all"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="route-page work-editorial-page" aria-labelledby="work-title" ref={containerRef}>
            <div className="work-split-layout">
                
                {/* LEFT: Sticky Sidebar (Editorial Manifesto & Index) */}
                <aside className="work-sidebar">
                    <div className="work-sidebar-sticky">
                        <div className="work-manifesto">
                            <span className="work-kicker">Case Studies</span>
                            <h1 id="work-title">Giao diện là hệ quả của dữ liệu.</h1>
                            <p>
                                Mình không chỉ thiết kế UI, mình thiết kế cách hệ thống vận hành. 
                                Dưới đây là 3 case study tiêu biểu minh họa cho phương pháp tiếp cận: 
                                <strong> Bài toán {"->"} Quyết định {"->"} Kết quả</strong>.
                            </p>
                        </div>

                        {/* Route Map / Table of Contents */}
                        <nav className="work-index-nav" aria-label="Case studies index">
                            <span className="index-label">
                                <ArrowDownToLine size={14} /> Điểm chạm nổi bật
                            </span>
                            <ul>
                                {projects.map((project, index) => {
                                    const design = caseDesign[project.slug];
                                    return (
                                        <li key={project.slug}>
                                            <a href={`#${project.slug}`} data-tone={design.tone}>
                                                <span className="index-num">{String(index + 1).padStart(2, "0")}</span>
                                                <span className="index-name">{project.title}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* CTA block in sidebar */}
                        <div className="sidebar-cta-block">
                            <Workflow size={18} aria-hidden="true" />
                            <h4>Sẵn sàng cho dự án mới</h4>
                            <p>Cần biến quy trình phức tạp thành giao diện trực quan?</p>
                            <a href="/contact" className="sidebar-cta-link" onClick={(e) => { e.preventDefault(); navigateTo("/contact"); }}>
                                Liên hệ ngay <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                </aside>

                {/* RIGHT: Scrollable Content (Dossiers) */}
                <div className="work-editorial-content">
                    <div className="work-dossier-list">
                        {projects.map((project, index) => (
                            <WorkCaseDossier key={project.slug} project={project} index={index} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

