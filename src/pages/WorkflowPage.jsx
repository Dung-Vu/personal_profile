import { ArrowRight, GitBranch, Terminal } from "lucide-react";
import "../styles/workflow.css";
import { workflowHandoff, workflowHero, workflowSteps, workflowToolchain } from "../content/workflowPage";
import { navigateTo } from "../hooks/useRoutePath";

export function WorkflowPage() {
    return (
        <section className="route-page workflow-scrolly-page" aria-labelledby="workflow-title">
            
            {/* HERO SECTION: The Engine Start */}
            <header className="workflow-hero-center">
                <div className="hero-kicker">
                    <Terminal size={14} />
                    <span>{workflowHero.eyebrow}</span>
                </div>
                <h1 id="workflow-title">{workflowHero.headline}</h1>
                <p>{workflowHero.intro}</p>
                
                <div className="hero-scroll-hint">
                    <div className="scroll-dot"></div>
                    <span>Xem 4 bước delivery</span>
                </div>
            </header>

            {/* THE PIPELINE */}
            <div className="pipeline-container">
                {/* The vertical track with a sticky glowing head */}
                <div className="pipeline-track-wrapper">
                    <div className="pipeline-track"></div>
                    <div className="pipeline-progress-head"></div>
                </div>

                <div className="pipeline-nodes">
                    {workflowSteps.map((step, index) => (
                        <article className="pipeline-node" key={step.id}>
                            
                            {/* Left Side: Massive Outline Number */}
                            <div className="node-number-wrapper">
                                <span className="node-outline-number">{step.step}</span>
                            </div>

                            {/* Right Side: Content Dossier */}
                            <div className="node-content">
                                <div className="node-header">
                                    <span className="node-signal">Phase // {step.signal}</span>
                                    <h2>{step.title}</h2>
                                    <p>{step.detail}</p>
                                </div>

                                <div className="node-validation">
                                    <span className="validation-label">Validation Criteria:</span>
                                    <ul className="validation-list">
                                        {step.checks.map((check) => (
                                            <li key={check}>
                                                <span className="check-box"></span>
                                                {check}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="node-deliverable">
                                    <span className="deliverable-label">Expected Output:</span>
                                    <strong className="deliverable-value">{step.deliverable}</strong>
                                </div>
                            </div>

                        </article>
                    ))}
                </div>
            </div>

            {/* TOOLCHAIN STRIP - Horizontal scrolling/layout */}
            <div className="toolchain-strip">
                <div className="strip-intro">
                    <span className="kicker">TOOLCHAIN ARCHITECTURE</span>
                    <h2>Tool được chia theo vòng lặp, không liệt kê thành danh sách khoe công nghệ.</h2>
                </div>
                
                <div className="toolchain-grid">
                    {workflowToolchain.map((group) => (
                        <article className="toolchain-card" key={group.title}>
                            <div className="card-top">
                                <GitBranch size={16} />
                                <h3>{group.title}</h3>
                            </div>
                            <p>{group.text}</p>
                            <div className="tool-tags">
                                {group.tools.map((tool) => (
                                    <span className="tool-tag" key={tool}>{tool}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* HANDOFF RULE - The Sign-off Document */}
            <div className="handoff-signoff">
                <div className="signoff-header">
                    <span className="kicker">DELIVERY PROTOCOL</span>
                    <h2>Một slice chỉ xong khi người sau có thể đọc tiếp và làm tiếp.</h2>
                </div>
                <ul className="signoff-rules">
                    {workflowHandoff.map((item, i) => (
                        <li key={i}>
                            <span className="rule-index">0{i + 1}</span>
                            <span className="rule-text">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* FOOTER CTA */}
            <footer className="workflow-footer-cta">
                <div className="cta-info">
                    <h2>Sẵn sàng triển khai?</h2>
                    <p>Nếu flow này hợp với bài toán của bạn, hãy gửi mình context và mục tiêu cần đạt.</p>
                </div>
                <a href="/contact" className="workflow-cta-btn" onClick={(e) => { e.preventDefault(); navigateTo("/contact"); }}>
                    Gửi yêu cầu bắt đầu <ArrowRight size={16} />
                </a>
            </footer>

        </section>
    );
}
