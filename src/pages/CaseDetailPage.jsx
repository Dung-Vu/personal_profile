import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Code2,
    Cpu,
    EyeOff,
    Layers,
    LineChart,
} from "lucide-react";
import "../styles/case-detail.css";
import { projects } from "../content/projects";
import { projectMilestones } from "../content/timeline";
import { Timeline, TimelineItem } from "../components/ui/Timeline";
import { navigateTo } from "../hooks/useRoutePath";

const caseNarrative = {
    "tca-crypto-analyzer": {
        eyebrow: "Case study / market dashboard",
        thesis:
            "Trader cần một màn hình tập trung thay vì 5-6 tab chart, bảng giá và tin tức. Mình thiết kế lại hierarchy để tín hiệu quan trọng luôn ở vị trí đọc đầu tiên, chart làm context và metadata nằm gần hành động.",
        slices: ["Signal hierarchy", "Chart context", "Fast decision loop"],
        tradeoff:
            "Ưu tiên tốc độ đọc và mật độ tín hiệu hơn chi tiết từng chart. Metadata được rút gọn để giữ focus, còn drill-down tách ra khi cần phân tích sâu.",
    },
    "bonario-product-hub": {
        eyebrow: "Case study / internal tool",
        thesis:
            "Đội vận hành phải mất 3-4 màn hình để tra cứu, sửa và đồng bộ dữ liệu sản phẩm qua Odoo. Mình dựng một hub tập trung: tìm kiếm, chỉnh sửa, đồng bộ và feedback trạng thái trên cùng một layout để giảm thao tác lặp và lỗi nhập liệu.",
        slices: ["Product state", "Odoo bridge", "Operator workflow"],
        tradeoff:
            "Tập trung vào workflow vận hành thay vì dashboard phân tích. Giao diện đơn giản hóa để giảm thao tác, đổi lại thiếu visual data insight cho manager.",
    },
    "ai-operator-workflow": {
        eyebrow: "Case study / AI workflow",
        thesis:
            "Làm nhiều dự án với AI agent dễ bị mất context giữa các phiên. Mình thiết kế một vòng lặp: đọc plan -> code -> build -> browser QA -> update check-in, để mỗi phiên đều có điểm bắt đầu rõ và bằng chứng kết thúc cụ thể.",
        slices: ["Context memory", "Runtime QA", "Agent handoff"],
        tradeoff:
            "Ưu tiên context continuity và browser QA hơn tốc độ raw. Mỗi phiên có overhead doc/check-in nhưng giảm đáng kể thời gian debug lại từ đầu.",
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

function CaseProofFrame({ project }) {
    if (!project.proofMedia) return null;

    return (
        <figure className="case-proof-frame">
            <img
                src={project.proofMedia.image}
                alt={project.proofMedia.alt}
                loading="lazy"
                decoding="async"
                width="1536"
                height="1024"
            />
            <figcaption>
                <span>Proof đã redacted</span>
                <strong>{project.proofMedia.caption}</strong>
            </figcaption>
        </figure>
    );
}

function CaseProofSignals({ project }) {
    if (!project.proofSignals?.length) return null;

    return (
        <section className="case-proof-signals" aria-labelledby={`${project.slug}-proof-signals-title`}>
            <div className="case-proof-signals-head">
                <span className="route-kicker">Verification signals</span>
                <h2 id={`${project.slug}-proof-signals-title`}>
                    {project.title} proof cues
                </h2>
            </div>
            <div className="case-proof-signals-grid">
                {project.proofSignals.map((signal) => (
                    <article key={signal.label}>
                        <span>{signal.label}</span>
                        <p>{signal.text}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

function CaseFlowProof({ project }) {
    if (!project.flowProof) return null;

    return (
        <section className="case-flow-proof" aria-labelledby={`${project.slug}-flow-proof-title`}>
            <div className="case-flow-proof-head">
                <span className="route-kicker">{project.flowProof.label}</span>
                <h2 id={`${project.slug}-flow-proof-title`}>
                    {project.flowProof.title}
                </h2>
                <p>{project.flowProof.description}</p>
            </div>

            <figure className="case-flow-shot">
                <div className="case-flow-browser" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <strong>redacted-flow://{project.slug}</strong>
                </div>

                <div className="case-flow-stage">
                    <div className="case-flow-timeline" aria-label="Các bước flow đã redacted">
                        {project.flowProof.steps.map((step) => (
                            <article key={step.label} className="case-flow-step">
                                <span>{step.label}</span>
                                <strong>{step.title}</strong>
                                <p>{step.note}</p>
                            </article>
                        ))}
                    </div>

                    <aside className="case-flow-redactions" aria-label="Các trường dữ liệu đã che">
                        <div className="case-flow-redactions-head">
                            <EyeOff aria-hidden="true" />
                            <span>Dữ liệu đã che</span>
                        </div>
                        <ul>
                            {project.flowProof.redactions.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </aside>
                </div>
            </figure>
        </section>
    );
}

function DecisionLedger({ items }) {
    if (!items?.length) return null;

    return (
        <div className="decision-ledger" aria-label="Case decision ledger">
            {items.map((item) => (
                <article key={item.label}>
                    <span>{item.label}</span>
                    <p>{item.text}</p>
                </article>
            ))}
        </div>
    );
}

export function CaseDetailPage({ slug }) {
    const project = projects.find((item) => item.slug === slug);

    if (!project) {
        return (
            <section
                className="page case-detail-page case-detail-empty"
                aria-labelledby="case-detail-title"
            >
                <span className="route-kicker">404 / Case not found</span>
                <h1 id="case-detail-title">Case này chưa được publish hoặc không tồn tại.</h1>
                <p>
                    Slug <code>{slug}</code> không khớp với case nào đang public. Quay lại Work để xem danh sách case hiện có.
                </p>
                <a
                    className="route-cta primary"
                    href="/work"
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo("/work");
                    }}
                >
                    Quay lại Work <ArrowRight aria-hidden="true" />
                </a>
            </section>
        );
    }

    const narrative = caseNarrative[project.slug];

    return (
        <section className="page case-detail-page" aria-labelledby="case-detail-title">
            <a
                className="route-link case-back-link"
                href="/work"
                onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/work");
                }}
            >
                <ArrowLeft aria-hidden="true" /> Quay lại Work
            </a>

            <div className="case-detail-hero">
                <div className="case-detail-copy">
                    <span className="route-kicker">{narrative.eyebrow}</span>
                    <h1 id="case-detail-title">{project.title}</h1>
                    <p>{narrative.thesis}</p>
                    <p className="case-detail-tradeoff">{narrative.tradeoff}</p>
                    <div className="case-detail-tags" aria-label="Case focus slices">
                        {narrative.slices.map((slice) => (
                            <span key={slice}>{slice}</span>
                        ))}
                    </div>
                </div>

                <aside className="case-detail-artifact" aria-label={`${project.title} artifact`}>
                    <img
                        src={project.assets.cover}
                        alt={`${project.title} interface preview`}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        width="1200"
                        height="800"
                    />
                    <div>
                        <span>{project.type}</span>
                        <strong>{project.systemRole}</strong>
                    </div>
                </aside>
            </div>

            <div className="case-detail-proof">
                <div>
                    <span className="route-kicker">Scope & proof</span>
                    <h2>Minh chứng thực tế thay cho số liệu không có nguồn.</h2>
                </div>
                <div className="case-detail-stat-grid">
                    <CaseDetailStat label="Status" value={project.status} />
                    <CaseDetailStat label="Timeline" value={project.timeline} />
                    <CaseDetailStat label="Team" value={project.team} />
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

            <CaseProofFrame project={project} />

            <CaseProofSignals project={project} />

            <CaseFlowProof project={project} />

            <DecisionLedger items={project.decisionLedger} />

            {(project.architectureContext || project.coreChallenges) && (
                <div className="case-deep-dive">
                    <div className="deep-dive-header">
                        <span className="route-kicker">Mổ xẻ kỹ thuật</span>
                        <h2>Giải phẫu hệ thống</h2>
                    </div>

                    <div className="deep-dive-grid">
                        {project.architectureContext ? (
                            <article className="deep-dive-card">
                                <div className="card-icon">
                                    <Layers />
                                </div>
                                <h3>Architecture context</h3>
                                <p>{project.architectureContext}</p>
                            </article>
                        ) : null}

                        {project.coreChallenges ? (
                            <article className="deep-dive-card">
                                <div className="card-icon">
                                    <Cpu />
                                </div>
                                <h3>Core challenges</h3>
                                <p>{project.coreChallenges}</p>
                            </article>
                        ) : null}
                    </div>

                    {project.technicalDecisions?.length ? (
                        <div className="tech-decisions-section">
                            <h3>
                                <Code2 className="inline-icon" /> Technical decisions & trade-offs
                            </h3>
                            <div className="decisions-list">
                                {project.technicalDecisions.map((dec, idx) => (
                                    <div key={idx} className="decision-item">
                                        <h4>{dec.title}</h4>
                                        <p>{dec.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {project.businessImpact ? (
                        <div className="business-impact-banner">
                            <LineChart className="impact-icon" />
                            <div>
                                <h3>Tác động vận hành</h3>
                                <p>{project.businessImpact}</p>
                            </div>
                        </div>
                    ) : null}
                </div>
            )}

            <div className="case-detail-grid">
                <article>
                    <span>Problem</span>
                    <p>{project.problem}</p>
                </article>
                <article>
                    <span>Role</span>
                    <p>{project.role}</p>
                </article>
                <article>
                    <span>Outcome</span>
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

            {projectMilestones[project.slug] ? (
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
            ) : null}

            <div className="route-panel case-detail-route-panel">
                <span>Bước tiếp theo</span>
                <strong>Muốn áp dụng tư duy này cho sản phẩm của bạn?</strong>
                <a
                    className="route-cta primary"
                    href="/contact"
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo("/contact");
                    }}
                >
                    Gửi yêu cầu <ArrowRight aria-hidden="true" />
                </a>
            </div>
        </section>
    );
}
