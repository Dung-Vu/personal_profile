import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Send, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
import { ScratchCloud } from "../components/home2/ScratchCloud";
import { navigateTo } from "../hooks/useRoutePath";
import "../styles/home.css";

const heroMeta = [
    "Front-end architecture",
    "Art-directed UI",
    "AI-assisted workflows",
];

const projectArtDirections = [
    {
        id: "product-hub",
        title: "Bonario Product Hub",
        type: "B2B SaaS / Enterprise",
        summary: "Hệ thống quản lý sản phẩm nội bộ tích hợp chặt chẽ với Odoo ERP, tập trung vào UX vận hành nhanh và kiến trúc dữ liệu ổn định.",
        toneClass: "h2-tone-ocean",
        featured: true,
        tags: ["React", "Flask", "Odoo API"],
        image: "/assets/signal-case-bonario-hub.webp",
        path: "/work/bonario-product-hub",
    },
    {
        id: "tca",
        title: "TCA Crypto Analyzer",
        type: "Fintech / Trading",
        summary: "PWA scanner tín hiệu Crypto đa khung thời gian. Xử lý real-time data, biểu đồ phức tạp và logic quản trị rủi ro tự động.",
        toneClass: "h2-tone-iris",
        featured: false,
        tags: ["Next.js", "WebSocket", "PWA"],
        image: "/assets/signal-case-tca-dashboard.webp",
        path: "/work/tca-crypto-analyzer",
    },
    {
        id: "ai-workflow",
        title: "AI Operator Workflow",
        type: "Developer Tools",
        summary: "Quy trình làm việc có sự hỗ trợ của AI: từ khâu đọc context, dựng state đến khi build ra bản slice chạy thật trên browser.",
        toneClass: "h2-tone-apricot",
        featured: false,
        tags: ["GSAP", "LLM", "Vite"],
        image: "/assets/signal-case-ai-workflow.webp",
        path: "/work/ai-operator-workflow",
    },
];

const destinations = [
    {
        id: "workflow",
        label: "Workflow",
        eyebrow: "Process",
        desc: "Cách mình đi từ brief đến bản build chạy thật.",
        path: "/workflow",
    },
    {
        id: "stack",
        label: "Stack",
        eyebrow: "Capability",
        desc: "Công nghệ và công cụ mình dùng để ship sản phẩm.",
        path: "/stack",
    },
    {
        id: "about",
        label: "About",
        eyebrow: "Identity",
        desc: "Thông tin cá nhân, định vị và triết lý làm việc.",
        path: "/about",
    },
    {
        id: "contact",
        label: "Contact",
        eyebrow: "Start Project",
        desc: "Gửi brief ngắn để nhận đánh giá khả thi và scope MVP.",
        path: "/contact",
    },
];

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
                            <p className="h2-overline">Art-directed Portfolio</p>

                            <h1 id="h2-title" className="h2-headline">
                                Giao diện không chỉ để ngắm.
                                <span>Nó phải định hướng hành vi.</span>
                            </h1>

                            <p className="h2-subline">
                                Một trải nghiệm UI tốt là cách nó kể câu chuyện của dữ liệu, tối ưu luồng vận hành và phản hồi tức thì với người dùng.
                            </p>

                            <div
                                className="h2-hero-meta"
                                aria-label="Home focus areas"
                            >
                                {heroMeta.map((item) => (
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
                                        Interactive Space
                                    </span>
                                    <h3 className="h2-scratch-overlay-title">
                                        Thử quét tay qua các hạt.
                                    </h3>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="h2-bio" aria-labelledby="h2-bio-title">
                <div className="h2-wrap">
                    <div className="h2-bio-card">
                        <div className="h2-bio-content">
                            <p className="h2-section-label">Behind the builds</p>
                            <h2 id="h2-bio-title" className="h2-bio-title">
                                Web Developer & AI Workflow Builder.
                            </h2>
                            <p className="h2-bio-copy">
                                Mình chuyên xây dựng các bề mặt giao diện, dashboard và công cụ vận hành (internal tool) tập trung vào luồng xử lý dữ liệu. Không chỉ làm web tĩnh, mình ưu tiên kiến trúc có thể mở rộng và tối ưu hóa workflow hàng ngày bằng AI.
                            </p>
                        </div>
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
                        {projectArtDirections.map((project) => {
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
                                        <img src={project.image} alt={project.title} loading="lazy" />
                                    </div>
                                    <div className={isFeatured ? "h2-case-panel" : "h2-case-overlay"}>
                                        <div className="h2-case-head">
                                            <span className="h2-case-type">{project.type}</span>
                                            <span className="h2-case-link">View case</span>
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
                        {/* Static method cards to match original layout conceptually */}
                        <div className="h2-method-card h2-tone-ocean">
                            <div className="h2-method-card-panel">
                                <h3>Architecture First</h3>
                                <p>Cấu trúc dữ liệu và luồng thông tin phải được chốt trước khi vẽ bất kỳ UI nào.</p>
                                <div className="h2-method-tags">
                                    <span>Data Flow</span>
                                    <span>State Management</span>
                                </div>
                            </div>
                        </div>
                        <div className="h2-method-card h2-tone-iris">
                            <div className="h2-method-card-panel">
                                <h3>AI-Assisted Workflow</h3>
                                <p>Sử dụng AI không phải để viết hộ, mà để giảm tải thao tác lặp lại và mở rộng khả năng debug.</p>
                                <div className="h2-method-tags">
                                    <span>Automations</span>
                                    <span>Prompt Engineering</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="h2-destinations" aria-labelledby="h2-dest-title">
                <div className="h2-wrap">
                    <div className="h2-section-row h2-section-row-tight">
                        <h2 id="h2-dest-title" className="h2-section-title">
                            Khám phá tiếp.
                        </h2>
                    </div>
                    <div className="h2-destination-grid">
                        {destinations.map((dest) => (
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
