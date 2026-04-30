import { ArrowRight, GitBranch, ListChecks, Radar } from "lucide-react";
import "../styles/workflow.css";
import { workflowHandoff, workflowHero, workflowSteps, workflowToolchain } from "../content/workflowPage";
import { navigateTo } from "../hooks/useRoutePath";

function RouteLink({ href, children, variant = "primary" }) {
    return (
        <a
            className={variant === "primary" ? "route-cta" : "route-link"}
            href={href}
            onClick={(event) => {
                event.preventDefault();
                navigateTo(href);
            }}
        >
            {children}
        </a>
    );
}

export function WorkflowPage() {
    return (
        <section className="route-page workflow-page" aria-labelledby="workflow-title">
            <div className="workflow-hero-shell">
                <div className="workflow-hero-copy">
                    <span className="route-kicker">{workflowHero.eyebrow}</span>
                    <h1 id="workflow-title">{workflowHero.headline}</h1>
                    <p>{workflowHero.intro}</p>
                    <div className="route-actions">
                        <RouteLink href="/contact">
                            Gửi context để bắt đầu <ArrowRight aria-hidden="true" />
                        </RouteLink>
                        <RouteLink href="/stack" variant="secondary">
                            Xem stack hỗ trợ workflow
                        </RouteLink>
                    </div>
                </div>

                <aside className="workflow-radar-card" aria-label="Workflow deliverables">
                    <Radar aria-hidden="true" />
                    <strong>Đầu ra mỗi bước</strong>
                    <div className="workflow-deliverable-list">
                        {workflowSteps.map((step) => (
                            <div key={step.id}>
                                <span>{step.step}</span>
                                <small>{step.deliverable}</small>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            <div className="workflow-section-heading">
                <span>Process map</span>
                <h2>Mỗi bước là một node trong đường đi từ bối cảnh đến sản phẩm dùng được.</h2>
            </div>

            <div className="workflow-timeline">
                {workflowSteps.map((step) => (
                    <article className="workflow-step-card" data-signal={step.signal} key={step.id}>
                        <div className="workflow-step-index">{step.step}</div>
                        <div>
                            <span>{step.status}</span>
                            <h3>{step.title}</h3>
                            <p>{step.detail}</p>
                            <div className="workflow-check-list">
                                {step.checks.map((check) => (
                                    <small key={check}>{check}</small>
                                ))}
                            </div>
                            <strong>{step.deliverable}</strong>
                        </div>
                    </article>
                ))}
            </div>

            <div className="workflow-toolchain-panel">
                <div>
                    <span className="route-kicker">TOOLCHAIN</span>
                    <h2>Tool được chia theo vòng lặp, không gom thành danh sách khoe công nghệ.</h2>
                </div>
                <div className="workflow-toolchain-grid">
                    {workflowToolchain.map((group) => (
                        <article key={group.title}>
                            <GitBranch aria-hidden="true" />
                            <h3>{group.title}</h3>
                            <p>{group.text}</p>
                            <div>
                                {group.tools.map((tool) => (
                                    <span key={tool}>{tool}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="workflow-handoff-panel">
                <div>
                    <ListChecks aria-hidden="true" />
                    <span className="route-kicker">HANDOFF RULE</span>
                    <h2>Một slice chỉ xong khi người sau có thể đọc tiếp và làm tiếp.</h2>
                </div>
                <ul>
                    {workflowHandoff.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="workflow-route-panel">
                <div>
                    <span>Ready state</span>
                    <h2>Nếu flow này hợp với bài toán của bạn, gửi mình context và mục tiêu cần đạt.</h2>
                </div>
                <RouteLink href="/contact">
                    Gửi yêu cầu <ArrowRight aria-hidden="true" />
                </RouteLink>
            </div>
        </section>
    );
}
