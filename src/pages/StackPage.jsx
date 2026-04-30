import { ArrowRight, Boxes, CircuitBoard, Layers3 } from "lucide-react";
import "../styles/stack.css";
import {
    stackHero,
    stackMatrix,
    stackPrinciples,
    stackStats,
} from "../content/stack";
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

export function StackPage() {
    return (
        <section
            className="route-page stack-page"
            aria-labelledby="stack-title"
        >
            <div className="stack-hero-shell">
                <div className="stack-hero-copy">
                    <span className="route-kicker">{stackHero.eyebrow}</span>
                    <h1 id="stack-title">{stackHero.headline}</h1>
                    <p>{stackHero.intro}</p>
                    <div className="route-actions">
                        <RouteLink href="/work">
                            Xem bằng chứng trong Work{" "}
                            <ArrowRight aria-hidden="true" />
                        </RouteLink>
                        <RouteLink href="/contact" variant="secondary">
                            Gửi bài toán cần build
                        </RouteLink>
                    </div>
                </div>

                <aside
                    className="stack-stats-panel"
                    aria-label="Stack quick access"
                >
                    <CircuitBoard aria-hidden="true" />
                    <div className="stack-stats-row">
                        {stackStats.map((stat) => (
                            <div key={stat.label}>
                                <strong>{stat.value}</strong>
                                <span>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="stack-quick-links">
                        <small>Evidence projects</small>
                        {stackMatrix.slice(0, 3).map((item) => {
                            const firstEvidence = item.evidence[0];
                            const href = firstEvidence
                                ? `/work/${firstEvidence.slug}`
                                : "/work";
                            return (
                                <a
                                    href={href}
                                    key={item.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigateTo(href);
                                    }}
                                >
                                    <span>{item.label}</span>
                                    <em>{item.evidence.length} case</em>
                                </a>
                            );
                        })}
                    </div>
                </aside>
            </div>

            <div className="stack-section-heading">
                <span>Capability matrix</span>
                <h2>Bốn lớp năng lực đang nối với nhau thành sản phẩm.</h2>
            </div>

            <div className="stack-matrix-grid">
                {stackMatrix.map((item) => (
                    <article
                        className="stack-capability-card"
                        data-depth={item.depth}
                        key={item.id}
                    >
                        <div className="stack-capability-topline">
                            <span>{item.label}</span>
                            <strong>{item.level}</strong>
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.detail}</p>

                        <div
                            className="stack-tool-cloud"
                            aria-label={`${item.label} tools`}
                        >
                            {item.tools.map((tool) => (
                                <span key={tool}>{tool}</span>
                            ))}
                        </div>

                        <div className="stack-evidence-list">
                            <small>Evidence</small>
                            {item.evidence.map((project) => (
                                <a
                                    href="/work"
                                    key={project.slug}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        navigateTo("/work");
                                    }}
                                >
                                    <span>{project.title}</span>
                                    <em>{project.type}</em>
                                </a>
                            ))}
                        </div>
                    </article>
                ))}
            </div>

            <div className="stack-principle-panel">
                <div>
                    <span className="route-kicker">DECISION RULES</span>
                    <h2>Stack được chọn theo khả năng làm rõ hệ thống.</h2>
                </div>
                <div className="stack-principle-list">
                    {stackPrinciples.map((principle) => (
                        <article key={principle.label}>
                            <span>{principle.label}</span>
                            <div>
                                <h3>{principle.title}</h3>
                                <p>{principle.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="stack-route-panel">
                <div className="stack-route-icon" aria-hidden="true">
                    <Boxes />
                    <Layers3 />
                </div>
                <div>
                    <span>Next layer</span>
                    <h2>
                        Stack trả lời dùng gì. Workflow trả lời mình vận hành nó
                        như thế nào.
                    </h2>
                </div>
                <RouteLink href="/workflow">
                    Mở Workflow Map <ArrowRight aria-hidden="true" />
                </RouteLink>
            </div>
        </section>
    );
}
