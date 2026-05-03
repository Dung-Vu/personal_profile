import { ArrowRight, Terminal } from "lucide-react";
import "../styles/stack.css";
import {
    stackHero,
    stackMatrix,
    stackPrinciples,
    stackStats,
} from "../content/stack";
import { navigateTo } from "../hooks/useRoutePath";

export function StackPage() {
    return (
        <section className="route-page stack-blueprint-page" aria-labelledby="stack-title">
            
            {/* HERO SECTION - Full Width, Technical Vibe */}
            <header className="stack-hero-block">
                <div className="hero-meta">
                    <Terminal size={14} />
                    <span>{stackHero.eyebrow}</span>
                </div>
                <h1 id="stack-title">{stackHero.headline}</h1>
                <p className="hero-intro">{stackHero.intro}</p>
                
                <div className="hero-stats-row">
                    {stackStats.map((stat) => (
                        <div className="hero-stat-item" key={stat.label}>
                            <strong>{stat.value}</strong>
                            <span>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* PRINCIPLES GRID - 3 Columns */}
            <div className="stack-principles-section">
                <div className="section-label">
                    <span>// Decision Rules</span>
                    <div className="hairline-divider"></div>
                </div>
                <div className="principles-grid">
                    {stackPrinciples.map((principle) => (
                        <article className="principle-card" key={principle.label}>
                            <span className="principle-number">{principle.label}</span>
                            <h3>{principle.title}</h3>
                            <p>{principle.text}</p>
                        </article>
                    ))}
                </div>
            </div>

            {/* MATRIX GRID - The Core Blueprints */}
            <div className="stack-matrix-section">
                <div className="section-label">
                    <span>// Capability Matrix</span>
                    <div className="hairline-divider"></div>
                </div>

                <div className="blueprint-matrix-grid">
                    {stackMatrix.map((item) => (
                        <article className="blueprint-card" data-depth={item.depth} key={item.id}>
                            <div className="blueprint-card-header">
                                <div className="blueprint-badges">
                                    <span className="badge-label">[{item.label}]</span>
                                    <span className="badge-level">Lvl {item.level}</span>
                                </div>
                                <h2>{item.title}</h2>
                                <p>{item.detail}</p>
                            </div>

                            <div className="blueprint-packages">
                                <div className="packages-header">
                                    <span>Packages / Stack</span>
                                    <span>{item.tools.length} Items</span>
                                </div>
                                <ul className="packages-list">
                                    {item.tools.map((tool) => (
                                        <li key={tool}>
                                            <span className="bracket">{"<"}</span>
                                            {tool}
                                            <span className="bracket">{"/>"}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {item.evidence.length > 0 && (
                                <div className="blueprint-traces">
                                    <span>Traces:</span>
                                    <div className="traces-links">
                                        {item.evidence.map((project) => (
                                            <a 
                                                href={`/work/${project.slug}`} 
                                                key={project.slug}
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    navigateTo(`/work/${project.slug}`); 
                                                }}
                                            >
                                                {project.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>

            {/* ROUTE CTA */}
            <footer className="stack-footer-cta">
                <div className="cta-info">
                    <h2>Tiếp theo: Workflow</h2>
                    <p>Stack trả lời dùng gì. Workflow trả lời mình vận hành nó như thế nào.</p>
                </div>
                <a href="/workflow" className="blueprint-cta-btn" onClick={(e) => { e.preventDefault(); navigateTo("/workflow"); }}>
                    Xem Workflow Map <ArrowRight size={16} />
                </a>
            </footer>

        </section>
    );
}
