import { useEffect, useRef } from "react";
import { ArrowRight, Send, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScratchCloud } from "../components/home2/ScratchCloud";
import { navigateTo } from "../hooks/useRoutePath";
import {
    homeHeroMeta,
    homeProjects,
    homeDestinations,
    homeMethods,
    homeProofPoints,
    homeTrustSignals,
} from "../content/homePage";
import { profile } from "../profileData";
import "../styles/home.css";

gsap.registerPlugin(ScrollTrigger);

function NavLink({ href, className, children }) {
    return (
        <a
            href={href}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                navigateTo(href);
            }}
        >
            {children}
        </a>
    );
}

export function HomePage() {
    const containerRef = useRef(null);

    // Đảm bảo scroll lên đầu khi vào trang
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const mm = gsap.matchMedia(containerRef);

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            // Bio section fade up
            gsap.from(".h2-bio-card", {
                scrollTrigger: {
                    trigger: ".h2-bio",
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                clearProps: "all"
            });

            // Section Titles fade up
            gsap.utils.toArray(".h2-section-row").forEach(row => {
                gsap.from(row, {
                    scrollTrigger: {
                        trigger: row,
                        start: "top 85%",
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    clearProps: "all"
                });
            });

            // Project cards stagger fade up
            gsap.from(".h2-case-card", {
                scrollTrigger: {
                    trigger: ".h2-project-grid",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                clearProps: "all"
            });

            // Method cards stagger
            gsap.from(".h2-method-card", {
                scrollTrigger: {
                    trigger: ".h2-method-cards",
                    start: "top 85%",
                },
                x: 30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: "power2.out",
                clearProps: "all"
            });

            // Destinations stagger
            gsap.from(".h2-destination-card", {
                scrollTrigger: {
                    trigger: ".h2-destination-grid",
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all"
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <div className="home2-page" aria-labelledby="h2-title" ref={containerRef}>
            <section className="h2-hero">
                <div className="h2-wrap">
                    <div className="h2-hero-stage">
                        <div className="h2-hero-copy">
                            <p className="h2-overline">Personal operating profile / online</p>

                            <h1 id="h2-title" className="h2-headline">
                                {profile.name}
                            </h1>

                            <p className="h2-subline">
                                {profile.headline}
                            </p>
                            <p className="h2-subnote">{profile.intro}</p>

                            <div
                                className="h2-hero-meta"
                                aria-label="Home focus areas"
                            >
                                {homeHeroMeta.map((item) => (
                                    <span key={item}>{item}</span>
                                ))}
                            </div>

                            <div className="h2-ctas">
                                <NavLink
                                    href="/work"
                                    className="h2-cta-primary"
                                >
                                    Xem case study{" "}
                                    <ArrowRight aria-hidden="true" />
                                </NavLink>
                                <NavLink
                                    href="/contact"
                                    className="h2-cta-secondary"
                                >
                                    Gửi brief <Send aria-hidden="true" />
                                </NavLink>
                            </div>

                        </div>

                        <article
                            className="h2-scratch-card"
                            aria-label="Interactive particle field"
                        >
                            <div className="h2-scratch-cloud">
                                <ScratchCloud motionEnabled={true} />
                                <div className="h2-scratch-overlay">
                                    <span className="h2-scratch-overlay-kicker">
                                        What I build
                                    </span>
                                    <h3 className="h2-scratch-overlay-title">
                                        Web app, dashboard, internal tool, AI workflow.
                                    </h3>
                                </div>
                            </div>
                        </article>

                        <div className="h2-proof-strip" aria-label="Home proof points">
                            {homeProofPoints.map((point) => (
                                <div className="h2-proof-item" key={point.label}>
                                    <span>{point.label}</span>
                                    <strong>{point.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="h2-bio" aria-labelledby="h2-bio-title">
                <div className="h2-wrap">
                    <div className="h2-bio-card">
                        <div className="h2-bio-content">
                            <p className="h2-section-label">Behind the builds</p>
                            <h2 id="h2-bio-title" className="h2-bio-title">{profile.headline}</h2>
                            <p className="h2-bio-copy">
                                {profile.about}
                            </p>
                        </div>
                        <div className="h2-bio-proof">
                            {homeProofPoints.map((point) => (
                                <div key={point.label} className="h2-bio-proof-item">
                                    <span>{point.label}</span>
                                    <strong>{point.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="h2-trust" aria-labelledby="h2-trust-title">
                <div className="h2-wrap h2-trust-layout">
                    <div className="h2-trust-copy">
                        <p className="h2-section-label">Fit check</p>
                        <h2 id="h2-trust-title">
                            Chọn đúng bài toán trước khi viết thêm UI.
                        </h2>
                        <p>
                            Mình hợp nhất với sản phẩm cần cấu trúc, trạng thái và bằng
                            chứng runtime. Nếu brief còn mơ hồ, bước đầu tiên là làm rõ
                            scope để không polish sai hướng.
                        </p>
                    </div>
                    <div className="h2-trust-grid">
                        {homeTrustSignals.map((item) => (
                            <article className="h2-trust-card" key={item.title}>
                                <span>{item.label}</span>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="h2-projects" aria-labelledby="h2-projects-title">
                <div className="h2-wrap">
                    <div className="h2-section-row">
                        <h2 id="h2-projects-title" className="h2-section-title">
                            Giao diện phải giải quyết bài toán vận hành.
                        </h2>
                        <NavLink href="/work" className="h2-section-link">
                            Xem tất cả dự án
                        </NavLink>
                    </div>

                    <div className="h2-project-grid">
                        {homeProjects.map((project) => {
                            const isFeatured = project.featured;
                            return (
                                <NavLink
                                    key={project.id}
                                    href={project.path}
                                    className={`h2-case-card ${project.toneClass} ${
                                        isFeatured
                                            ? "h2-case-card-featured"
                                            : "h2-case-card-editorial"
                                    }`}
                                >
                                    <div className="h2-case-media">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading={isFeatured ? "eager" : "lazy"}
                                            fetchPriority={isFeatured ? "high" : "auto"}
                                            decoding="async"
                                            width="1200"
                                            height="800"
                                        />
                                    </div>
                                    <div className={isFeatured ? "h2-case-panel" : "h2-case-overlay"}>
                                        <div className="h2-case-head">
                                            <span className="h2-case-type">{project.type}</span>
                                            <span className="h2-case-link">Xem case</span>
                                        </div>
                                        <div className="h2-case-copy">
                                            <h3 className="h2-case-title">{project.title}</h3>
                                            <p className="h2-case-summary">{project.summary}</p>
                                        </div>
                                        <div className="h2-case-tags">
                                            {project.tags.map((tag) => (
                                                <span key={tag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="h2-method" aria-labelledby="h2-method-title">
                <div className="h2-wrap h2-method-layout">
                    <div className="h2-method-intro">
                        <p className="h2-method-label">Methodology</p>
                        <h2 id="h2-method-title" className="h2-method-title">
                            Không thiết kế thừa.
                        </h2>
                        <p className="h2-method-copy">
                            Mọi line code đều phục vụ một mục đích cụ thể: chuyển tải dữ liệu, phản hồi thao tác, hoặc tối ưu luồng công việc.
                        </p>
                    </div>
                    <div className="h2-method-cards">
                        {homeMethods.map((method) => (
                            <div className={`h2-method-card ${method.toneClass}`} key={method.id}>
                                <div className="h2-method-card-panel">
                                    <h3>{method.title}</h3>
                                    <p>{method.desc}</p>
                                    <div className="h2-method-tags">
                                        {method.tags.map((tag) => (
                                            <span key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="h2-homeDestinations" aria-labelledby="h2-dest-title">
                <div className="h2-wrap">
                    <div className="h2-section-row h2-section-row-tight">
                        <h2 id="h2-dest-title" className="h2-section-title">
                            Khám phá tiếp.
                        </h2>
                    </div>
                    <div className="h2-destination-grid">
                        {homeDestinations.map((dest) => (
                            <NavLink
                                key={dest.id}
                                href={dest.path}
                                className="h2-destination-card"
                            >
                                <div className="h2-destination-content">
                                    <span className="h2-destination-eyebrow">
                                        {dest.eyebrow}
                                    </span>
                                    <h3>{dest.label}</h3>
                                    <p>{dest.desc}</p>
                                </div>
                                <div className="h2-destination-arrow">
                                    <ArrowUpRight aria-hidden="true" />
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
