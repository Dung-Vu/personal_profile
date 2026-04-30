import {
    ArrowRight,
    BrainCircuit,
    CheckCircle2,
    Compass,
    Sparkles,
} from "lucide-react";
import "../styles/about.css";
import { aboutNotes, aboutProcess, aboutProfile } from "../content/about";
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

export function AboutPage() {
    return (
        <section
            className="route-page about-page"
            aria-labelledby="about-title"
        >
            <div className="about-hero-shell">
                <div className="about-hero-copy">
                    <span className="route-kicker">{aboutProfile.eyebrow}</span>
                    <h1 id="about-title">
                        <span className="headline-line">
                            Mình build website,
                        </span>
                        <span className="headline-line">
                            dashboard và internal tool —
                        </span>
                        <span className="headline-line">
                            rõ cấu trúc, chạy thật.
                        </span>
                    </h1>
                    <p>{aboutProfile.intro}</p>
                    <div className="route-actions">
                        <RouteLink href="/work">
                            Xem cách mình triển khai{" "}
                            <ArrowRight aria-hidden="true" />
                        </RouteLink>
                        <RouteLink href="/contact" variant="secondary">
                            Gửi bối cảnh dự án
                        </RouteLink>
                    </div>
                </div>

                <aside
                    className="about-dossier-card"
                    aria-label="About dossier"
                >
                    <div className="about-portrait-mark" aria-hidden="true">
                        <img
                            className="about-dossier-image"
                            src="/assets/signal-about-dossier.webp"
                            alt=""
                            loading="eager"
                            decoding="async"
                        />
                        <span></span>
                        <Sparkles />
                    </div>
                    <div className="about-dossier-list">
                        {aboutProfile.meta.map((item) => (
                            <div key={item.label}>
                                <span>{item.label}</span>
                                <strong>{item.value}</strong>
                            </div>
                        ))}
                    </div>
                    <div className="about-dossier-stats">
                        {aboutProfile.stats.map((stat) => (
                            <div key={stat.label}>
                                <strong>{stat.value}</strong>
                                <small>{stat.label}</small>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            <div className="about-section-heading">
                <span>Kinh nghiệm</span>
                <h2>
                    Hành trình từ những dự án đầu tiên đến hệ thống hiện tại.
                </h2>
            </div>

            <div className="about-belief-grid">
                <article className="about-belief-card">
                    <span>2021–2023</span>
                    <h3>Xây nền tảng Frontend</h3>
                    <p>
                        Bắt đầu với HTML/CSS/JavaScript, học React qua các dự án
                        thực tế. Xây các landing page, website tĩnh và component
                        UI đầu tiên, tập trung vào responsive và cross-browser.
                    </p>
                </article>
                <article className="about-belief-card">
                    <span>2023–2024</span>
                    <h3>Dashboard & Internal Tools</h3>
                    <p>
                        Chuyển sang xây dựng dashboard dữ liệu và công cụ nội
                        bộ. Làm việc với Chart.js/Recharts, thiết kế layout đọc
                        nhanh, kết nối REST API và xử lý dữ liệu thời gian thực.
                    </p>
                </article>
                <article className="about-belief-card">
                    <span>2024–2025</span>
                    <h3>Full-stack & Tích hợp hệ thống</h3>
                    <p>
                        Mở rộng sang Flask, Odoo API và workflow automation.
                        Dựng các hub vận hành kết nối nhiều dịch vụ, thiết kế
                        state machine cho quy trình phức tạp và tối ưu trải
                        nghiệm admin.
                    </p>
                </article>
                <article className="about-belief-card">
                    <span>2025–nay</span>
                    <h3>AI-assisted Development</h3>
                    <p>
                        Kết hợp AI agent (Codex, Claude, MCP) vào workflow phát
                        triển. Dùng AI để tăng tốc phân tích và refactor, giữ
                        browser QA và build verification làm tiêu chuẩn kiểm
                        chứng cuối cùng.
                    </p>
                </article>
            </div>

            <div
                className="about-highlight-strip"
                aria-label="Project highlights"
            >
                <h2>Đã ship những gì</h2>
                <div className="about-highlight-grid">
                    <article>
                        <strong>TCA Crypto Analyzer</strong>
                        <span>Dashboard crypto</span>
                        <p>
                            Một màn hình tập trung thay vì 5-6 tab: chart, tín
                            hiệu, metadata — tất cả trong một layout scan nhanh.
                        </p>
                        <a
                            href="/work/tca-crypto-analyzer"
                            onClick={(e) => {
                                e.preventDefault();
                                navigateTo("/work/tca-crypto-analyzer");
                            }}
                        >
                            Xem case →
                        </a>
                    </article>
                    <article>
                        <strong>Bonario Product Hub</strong>
                        <span>Internal tool</span>
                        <p>
                            Hub vận hành kết nối Flask, React và Odoo: tìm kiếm,
                            chỉnh sửa, đồng bộ — giảm 3-4 màn hình xuống một
                            layout.
                        </p>
                        <a
                            href="/work/bonario-product-hub"
                            onClick={(e) => {
                                e.preventDefault();
                                navigateTo("/work/bonario-product-hub");
                            }}
                        >
                            Xem case →
                        </a>
                    </article>
                    <article>
                        <strong>AI Operator Workflow</strong>
                        <span>Workflow system</span>
                        <p>
                            Vòng lặp plan → code → build → browser QA →
                            check-in. Mỗi phiên có context rõ và bằng chứng kết
                            thúc.
                        </p>
                        <a
                            href="/work/ai-operator-workflow"
                            onClick={(e) => {
                                e.preventDefault();
                                navigateTo("/work/ai-operator-workflow");
                            }}
                        >
                            Xem case →
                        </a>
                    </article>
                </div>
            </div>

            <div className="about-process-panel">
                <div className="about-process-intro">
                    <span className="route-kicker">WORKING PATH</span>
                    <h2>Từ bối cảnh đến interface chạy được.</h2>
                    <p>
                        Mình không bắt đầu bằng effect. Mình bắt đầu bằng câu
                        hỏi: màn hình này cần giúp ai ra quyết định gì nhanh
                        hơn?
                    </p>
                </div>

                <div className="about-process-list">
                    {aboutProcess.map((item) => (
                        <article className="about-process-step" key={item.step}>
                            <span>{item.step}</span>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="about-ai-panel">
                <div>
                    <BrainCircuit aria-hidden="true" />
                    <span className="route-kicker">
                        AI-ASSISTED, HUMAN-VERIFIED
                    </span>
                    <h2>
                        Dùng AI như bộ tăng tốc vòng lặp, không phải người cầm
                        lái.
                    </h2>
                </div>
                <ul>
                    {aboutNotes.map((note) => (
                        <li key={note}>
                            <CheckCircle2 aria-hidden="true" />
                            <span>{note}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="about-route-panel">
                <Compass aria-hidden="true" />
                <div>
                    <span>Next step</span>
                    <h2>
                        Nếu muốn kiểm chứng bằng sản phẩm thật, đi tiếp sang
                        Work.
                    </h2>
                </div>
                <RouteLink href="/work">
                    Xem case studies <ArrowRight aria-hidden="true" />
                </RouteLink>
            </div>
        </section>
    );
}
