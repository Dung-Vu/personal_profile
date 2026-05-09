import { useMemo, useState } from "react";
import "../styles/contact.css";
import {
    ArrowRight,
    CheckCircle2,
    Copy,
    Github,
    Mail,
    Server,
    Terminal,
    Zap,
} from "lucide-react";
import { profile } from "../profileData";
import { navigateTo } from "../hooks/useRoutePath";
import {
    contactBriefLines as briefLines,
    contactCapabilities as capabilities,
    contactResponseSteps,
} from "../content/contactPage";

export function ContactPage() {
    const [copied, setCopied] = useState(false);
    const [copyFailed, setCopyFailed] = useState(false);

    const payloadText = useMemo(
        () =>
            "{\n" +
            briefLines
                .map((line) => `  "${line.key}": "${line.value}"`)
                .join(",\n") +
            "\n}",
        [],
    );

    const mailto = useMemo(() => {
        const subject = encodeURIComponent(`Project brief for ${profile.name}`);
        const body = encodeURIComponent("```json\n" + payloadText + "\n```");
        return `mailto:${profile.email}?subject=${subject}&body=${body}`;
    }, [payloadText]);

    const copyPayload = async () => {
        try {
            await navigator.clipboard.writeText(payloadText);
            setCopied(true);
            setCopyFailed(false);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopyFailed(true);
        }
    };

    return (
        <section className="route-page endpoint-page" aria-labelledby="endpoint-title">
            <header className="endpoint-hero">
                <div className="hero-kicker">
                    <Terminal size={14} />
                    <span>INITIALIZE PROJECT BRIEF</span>
                </div>
                <h1 id="endpoint-title">Gửi brief ngắn, nhận hướng triển khai rõ.</h1>
                <p>
                    Mình phù hợp với website, dashboard và internal tool cần flow rõ, state rõ và có thể kiểm chứng bằng runtime.
                </p>
                <div className="endpoint-hero-actions">
                    <a className="endpoint-primary-link" href={mailto}>
                        Gửi email <Mail size={16} aria-hidden="true" />
                    </a>
                    <button className="endpoint-secondary-link" type="button" onClick={copyPayload}>
                        {copied ? "Đã copy payload" : "Copy brief format"}
                        {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    </button>
                </div>

                <div className="endpoint-trust-strip" aria-label="Contact fit summary">
                    <article>
                        <span>Reply</span>
                        <strong>24-48h nếu brief đủ context</strong>
                    </article>
                    <article>
                        <span>Best fit</span>
                        <strong>Website, dashboard, internal tool</strong>
                    </article>
                    <article>
                        <span>Need</span>
                        <strong>Context, data, deadline, target outcome</strong>
                    </article>
                </div>
            </header>

            <div className="endpoint-grid">
                <div className="payload-terminal">
                    <div className="terminal-header">
                        <div className="terminal-dots">
                            <span />
                            <span />
                            <span />
                        </div>
                        <span className="terminal-title">project_brief.json</span>
                    </div>

                    <div className="terminal-body">
                        <span className="code-line">
                            <span className="code-syntax">{"{"}</span>
                        </span>
                        {briefLines.map((line, idx) => (
                            <span className="code-line indent" key={line.key}>
                                <span className="code-key">"{line.key}"</span>
                                <span className="code-syntax">: </span>
                                <span className="code-value">"{line.value}"</span>
                                {idx < briefLines.length - 1 ? (
                                    <span className="code-syntax">,</span>
                                ) : null}
                            </span>
                        ))}
                        <span className="code-line">
                            <span className="code-syntax">{"}"}</span>
                        </span>
                    </div>

                    <div className="terminal-footer">
                        <button
                            className="terminal-action-btn"
                            onClick={copyPayload}
                            aria-label="Copy JSON Payload"
                            type="button"
                        >
                            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                            {copied ? "[200 OK] Payload Copied" : "Copy Payload Format"}
                        </button>
                        {copyFailed ? (
                            <span className="error-text">Clipboard blocked. Please copy manually.</span>
                        ) : null}
                    </div>
                </div>

                <div className="endpoint-routes">
                    <div className="routes-label">Available endpoints</div>

                    <a className="route-card" href={mailto}>
                        <div className="route-method post">POST</div>
                        <div className="route-path">/contact/email</div>
                        <div className="route-icon">
                            <Mail size={18} />
                        </div>
                        <div className="route-detail">{profile.email}</div>
                    </a>

                    <a
                        className="route-card"
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="route-method get">GET</div>
                        <div className="route-path">/profile/github</div>
                        <div className="route-icon">
                            <Github size={18} />
                        </div>
                        <div className="route-detail">{profile.githubName}</div>
                    </a>

                    <div className="response-contract">
                        <span>What happens next</span>
                        <ol>
                            {contactResponseSteps.map((step) => (
                                <li key={step}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

            <div className="capabilities-section">
                <div className="capabilities-header">
                    <Server size={20} />
                    <h2>Fit check trước khi bắt đầu.</h2>
                    <p>
                        Mình nhận những project có đủ context để đi tới bản chạy được. Nếu brief còn mơ hồ, bước đầu tiên sẽ là làm rõ scope.
                    </p>
                </div>

                <div className="capabilities-grid">
                    {capabilities.map((group) => (
                        <div className="capability-group" key={group.category}>
                            <h3>{group.category}</h3>
                            <ul className="capability-list">
                                {group.items.map((item) => (
                                    <li key={item.text}>
                                        <span className={`status-dot ${item.type}`} />
                                        <span className="cap-text">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="endpoint-footer">
                <div className="footer-content">
                    <Zap size={24} className="footer-icon" />
                    <div className="footer-text">
                        <h2>Muốn kiểm chứng cách mình làm trước?</h2>
                        <p>Đọc case study để xem cách mình nối bài toán, quyết định kỹ thuật và proof runtime.</p>
                    </div>
                </div>
                <a
                    href="/work"
                    className="endpoint-cta-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo("/work");
                    }}
                >
                    Đọc case studies <ArrowRight size={16} />
                </a>
            </footer>
        </section>
    );
}
