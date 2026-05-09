import {
    ArrowRight,
    BrainCircuit,
    CheckCircle2,
    Compass,
    Sparkles,
    TerminalSquare
} from "lucide-react";
import "../styles/about.css";
import { aboutBeliefs, aboutNotes, aboutProcess, aboutProfile } from "../content/about";
import { careerTimeline } from "../content/timeline";
import { Timeline, TimelineItem } from "../components/ui/Timeline";
import { navigateTo } from "../hooks/useRoutePath";

function RouteLink({ href, children }) {
    return (
        <a
            className="route-cta-light"
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

export function AboutPage() {
    return (
        <section
            className="route-page about-page"
            aria-labelledby="about-title"
        >
            <div className="about-editorial-grid">
                
                {/* LEFT: Sticky Sidebar */}
                <aside className="editorial-sidebar">
                    <div className="editorial-portrait">
                        <img
                            src="/assets/signal-about-dossier.webp"
                            alt="Developer workspace dossier"
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                            width="900"
                            height="1200"
                        />
                    </div>
                    
                    <div className="editorial-hero">
                        <span className="bento-header">
                            <TerminalSquare size={16} /> {aboutProfile.eyebrow}
                        </span>
                        <h1 id="about-title">
                            Vũ Đình Dũng.
                        </h1>
                        <p>{aboutProfile.headline}</p>
                        <p>{aboutProfile.intro}</p>
                    </div>

                    <div className="editorial-beliefs">
                        <h3>Core Beliefs</h3>
                        {aboutBeliefs.map((belief, idx) => (
                            <div className="belief-item" key={idx}>
                                <h4>{belief.title}</h4>
                                <p>{belief.text}</p>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* RIGHT: Scrollable Content & Bento Grid */}
                <div className="editorial-content">
                    
                    <div className="bento-grid">
                        
                        {/* Bento Box 1: Meta Dossier */}
                        <div className="bento-box span-2">
                            <span className="bento-header">
                                <Sparkles size={16} /> Operating Context
                            </span>
                            <h3>Focus & Work Style</h3>
                            <div className="bento-stats">
                                {aboutProfile.stats.map((stat, idx) => (
                                    <div className="stat-item" key={idx}>
                                        <strong>{stat.value}</strong>
                                        <span>{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="process-grid bento-meta-footer">
                                {aboutProfile.meta.slice(0,4).map((meta, idx) => (
                                    <div className="stat-item" key={idx}>
                                        <span className="meta-label">{meta.label}</span>
                                        <span className="meta-value">{meta.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bento Box 2: Working Path */}
                        <div className="bento-box span-2">
                            <span className="bento-header">
                                <Compass size={16} /> Methodology
                            </span>
                            <h3>Từ bối cảnh đến interface chạy được.</h3>
                            <div className="process-grid">
                                {aboutProcess.map((item) => (
                                    <div className="process-step" key={item.step}>
                                        <span>{item.step}</span>
                                        <h4>{item.title}</h4>
                                        <p>{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bento Box 3: AI Philosophy */}
                        <div className="bento-box">
                            <span className="bento-header">
                                <BrainCircuit size={16} /> AI-ASSISTED
                            </span>
                            <h3>Bộ tăng tốc vòng lặp.</h3>
                            <ul className="bento-list">
                                {aboutNotes.map((note, idx) => (
                                    <li key={idx}>
                                        <CheckCircle2 size={18} />
                                        <span>{note}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Bento Box 4: Next Step */}
                        <div className="bento-box">
                            <span className="bento-header">
                                <ArrowRight size={16} /> NEXT STEP
                            </span>
                            <h3>Kiểm chứng bằng sản phẩm thật.</h3>
                            <p>Đọc case study để xem cách mình giải quyết bài toán UI/UX và logic vận hành.</p>
                            <RouteLink href="/work">
                                Xem case study <ArrowRight size={16} />
                            </RouteLink>
                        </div>

                    </div>

                    {/* Timeline Section */}
                    <div className="editorial-timeline-wrapper">
                        <div className="timeline-section-heading">
                            <small>Kinh nghiệm</small>
                            <h2>Hành trình từ những dự án đầu tiên đến hệ thống hiện tại.</h2>
                        </div>
                        <Timeline>
                            {careerTimeline.map((entry, idx) => (
                                <TimelineItem
                                    key={entry.date}
                                    date={entry.date}
                                    title={entry.title}
                                    subtitle={entry.subtitle}
                                    description={entry.description}
                                    tags={entry.tags}
                                    status={entry.status}
                                    index={idx}
                                />
                            ))}
                        </Timeline>
                    </div>

                </div>
            </div>
        </section>
    );
}
