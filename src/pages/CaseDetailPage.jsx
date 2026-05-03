import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Layers, Cpu, Code2, LineChart } from "lucide-react";
import "../styles/case-detail.css";
import { projects } from "../content/projects";
import { projectMilestones } from "../content/timeline";
import { Timeline, TimelineItem } from "../components/ui/Timeline";
import { navigateTo } from "../hooks/useRoutePath";

const caseNarrative = {
    "tca-crypto-analyzer": {
        eyebrow: "CASE STUDY / MARKET DASHBOARD",
        thesis: "Trader cần một màn hình tập trung thay vì 5-6 tab chart, bảng giá, tin tức. Mình thiết kế lại hierarchy để tín hiệu quan trọng nhất luôn ở vị trí đọc đầu tiên, chart theo sau làm context, và metadata nằm gần điểm hành động.",
        slices: ["Signal hierarchy", "Chart context", "Fast decision loop"],
        tradeoff: "Đánh đổi: ưu tiên tốc độ đọc và mật độ tín hiệu hơn là chi tiết từng chart. Metadata được rút gọn để giữ focus, trader cần drill-down khi muốn phân tích sâu.",
    },
    "bonario-product-hub": {
        eyebrow: "CASE STUDY / INTERNAL TOOL",
        thesis: "Đội vận hành mất 3-4 màn hình để tra cứu, sửa, đồng bộ dữ liệu sản phẩm qua Odoo. Mình dựng một hub tập trung: tìm kiếm, chỉnh sửa, đồng bộ và feedback trạng thái trên cùng một layout để giảm thao tác lặp và lỗi nhập liệu.",
        slices: ["Product state", "Odoo bridge", "Operator workflow"],
        tradeoff: "Đánh đổi: tập trung vào workflow vận hành thay vì dashboard phân tích. Giao diện đơn giản hóa để giảm thao tác, đổi lại thiếu visual data insight cho manager.",
    },
    "ai-operator-workflow": {
        eyebrow: "CASE STUDY / AI WORKFLOW",
        thesis: "Làm nhiều dự án với AI agent dễ bị mất context giữa các phiên. Mình thiết kế một vòng lặp: đọc plan → code → build → browser QA → update check-in, để mỗi phiên đều có điểm bắt đầu rõ và bằng chứng kết thúc cụ thể.",
        slices: ["Context memory", "Runtime QA", "Agent handoff"],
        tradeoff: "Đánh đổi: ưu tiên context continuity và browser QA hơn là tốc độ raw. Mỗi phiên có overhead doc/check-in nhưng giảm đáng kể thời gian debug lại từ đầu.",
    },
};

function CaseDetailStat({ label, value }) {
    return (
        <div>
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

export function CaseDetailPage({ slug }) {
    const project = projects.find((item) => item.slug === slug);

    if (!project) {
        return (
            <section className="page case-detail-page case-detail-empty" aria-labelledby="case-detail-title">
                <span className="route-kicker">404 / CASE NOT FOUND</span>
                <h1 id="case-detail-title">Case này chưa được publish hoặc không tồn tại.</h1>
                <p>Slug <code>{slug}</code> không khớp với case nào đang public. Quay lại Work để xem danh sách case hiện có.</p>
                <a className="route-cta primary" href="/work" onClick={(e) => { e.preventDefault(); navigateTo("/work"); }}>
                    Quay lại Work <ArrowRight aria-hidden="true" />
                </a>
            </section>
        );
    }

    const narrative = caseNarrative[project.slug];

    return (
        <section className="page case-detail-page" aria-labelledby="case-detail-title">
            <a className="route-link case-back-link" href="/work" onClick={(e) => { e.preventDefault(); navigateTo("/work"); }}>
                <ArrowLeft aria-hidden="true" /> Quay lại Work
            </a>

            <div className="case-detail-hero">
                <div className="case-detail-copy">
                    <span className="route-kicker">{narrative.eyebrow}</span>
                    <h1 id="case-detail-title">{project.title}</h1>
                    <p>{narrative.thesis}</p>
                    {narrative.tradeoff ? <p className="case-detail-tradeoff">{narrative.tradeoff}</p> : null}
                    <div className="case-detail-tags" aria-label="Case focus slices">
                        {narrative.slices.map((slice) => (
                            <span key={slice}>{slice}</span>
                        ))}
                    </div>
                </div>

                <aside className="case-detail-artifact" aria-label={`${project.title} artifact`}>
                    <img src={project.assets.cover} alt={`${project.title} interface preview`} loading="lazy" decoding="async" />
                    <div>
                        <span>{project.type}</span>
                        <strong>{project.systemRole}</strong>
                    </div>
                </aside>
            </div>

            {/* Editorial Deep Dive Section */}
            {(project.architectureContext || project.coreChallenges) && (
                <div className="case-deep-dive">
                    <div className="deep-dive-header">
                        <span className="route-kicker">ENGINEERING TEARDOWN</span>
                        <h2>Giải phẫu hệ thống</h2>
                    </div>
                    
                    <div className="deep-dive-grid">
                        {project.architectureContext && (
                            <article className="deep-dive-card">
                                <div className="card-icon"><Layers /></div>
                                <h3>Architecture Context</h3>
                                <p>{project.architectureContext}</p>
                            </article>
                        )}
                        
                        {project.coreChallenges && (
                            <article className="deep-dive-card">
                                <div className="card-icon"><Cpu /></div>
                                <h3>Core Challenges</h3>
                                <p>{project.coreChallenges}</p>
                            </article>
                        )}
                    </div>

                    {project.technicalDecisions && project.technicalDecisions.length > 0 && (
                        <div className="tech-decisions-section">
                            <h3><Code2 className="inline-icon" /> Technical Decisions & Trade-offs</h3>
                            <div className="decisions-list">
                                {project.technicalDecisions.map((dec, idx) => (
                                    <div key={idx} className="decision-item">
                                        <h4>{dec.title}</h4>
                                        <p>{dec.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {project.businessImpact && (
                        <div className="business-impact-banner">
                            <LineChart className="impact-icon" />
                            <div>
                                <h3>Business Impact</h3>
                                <p>{project.businessImpact}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="case-detail-grid">
                <article>
                    <span>Bài toán</span>
                    <p>{project.problem}</p>
                </article>
                <article>
                    <span>Vai trò</span>
                    <p>{project.role}</p>
                </article>
                <article>
                    <span>Kết quả</span>
                    <p>{project.outcome}</p>
                </article>
                <article>
                    <span>Deliverables</span>
                    <ul>
                        {project.deliverables.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </article>
                <article>
                    <span>Constraints</span>
                    <ul>
                        {project.constraints.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </article>
                <article>
                    <span>Team / Scope</span>
                    <p>{project.team}</p>
                </article>
                <article>
                    <span>Evidence note</span>
                    <p>{project.evidenceNote}</p>
                </article>
            </div>

            {projectMilestones[project.slug] && (
                <>
                    <div className="timeline-section-heading">
                        <small>Milestones</small>
                        <h2>Các mốc triển khai chính của dự án.</h2>
                    </div>
                    <Timeline>
                        {projectMilestones[project.slug].map((ms, idx) => (
                            <TimelineItem
                                key={ms.date}
                                date={ms.date}
                                title={ms.title}
                                description={ms.description}
                                status={ms.status}
                                index={idx}
                            />
                        ))}
                    </Timeline>
                </>
            )}

            <div className="case-detail-proof">
                <div>
                    <span className="route-kicker">Scope & proof</span>
                    <h2>Minh chứng thực tế thay cho số liệu không có nguồn.</h2>
                </div>
                <div className="case-detail-stat-grid">
                    <CaseDetailStat label="Status" value={project.status} />
                    <CaseDetailStat label="Timeline" value={project.timeline} />
                    <CaseDetailStat label="Proof note" value={project.privateReason} />
                    <CaseDetailStat label="Next proof" value={project.nextProof} />
                </div>
                <ul>
                    {project.uiFocus.map((item) => (
                        <li key={item}>
                            <CheckCircle2 aria-hidden="true" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="route-panel case-detail-route-panel">
                <span>Next project</span>
                <strong>Muốn áp dụng tư duy kỹ thuật này cho sản phẩm của bạn?</strong>
                <a className="route-cta primary" href="/contact" onClick={(e) => { e.preventDefault(); navigateTo("/contact"); }}>
                    Gửi yêu cầu <ArrowRight aria-hidden="true" />
                </a>
            </div>
        </section>
    );
}
