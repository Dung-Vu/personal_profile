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
    contactBriefPresets,
    contactCapabilities as capabilities,
    contactResponseSteps,
} from "../content/contactPage";

export function ContactPage() {
    const [selectedPresetId, setSelectedPresetId] = useState(contactBriefPresets[0].id);
    const [copied, setCopied] = useState(false);
    const [copyFailed, setCopyFailed] = useState(false);

    const activePreset = useMemo(
        () =>
            contactBriefPresets.find((preset) => preset.id === selectedPresetId) ??
            contactBriefPresets[0],
        [selectedPresetId],
    );

    const payloadText = useMemo(
        () =>
            "{\n" +
            activePreset.briefLines
                .map((line) => `  "${line.key}": "${line.value}"`)
                .join(",\n") +
            "\n}",
        [activePreset],
    );

    const mailto = useMemo(() => {
        const subject = encodeURIComponent(activePreset.subject);
        const body = encodeURIComponent(
            `${activePreset.intro}\n\n${payloadText}\n`,
        );
        return `mailto:${profile.email}?subject=${subject}&body=${body}`;
    }, [activePreset, payloadText]);

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
                        <span>PROJECT BRIEF</span>
                    </div>
                    <h1 id="endpoint-title">Gửi brief trong 2 phút, nhận hướng triển khai rõ.</h1>
                    <p>
                        Mình phù hợp với website, dashboard và internal tool có dữ liệu thật, người dùng rõ và mục tiêu cần chốt thành bản chạy được.
                    </p>
                    <div className="endpoint-preset-switch" aria-label="Brief presets">
                        {contactBriefPresets.map((preset) => (
                            <button
                                key={preset.id}
                                type="button"
                                aria-pressed={selectedPresetId === preset.id}
                                className={
                                    selectedPresetId === preset.id
                                        ? "preset-chip active"
                                        : "preset-chip"
                                }
                                onClick={() => {
                                    setSelectedPresetId(preset.id);
                                    setCopied(false);
                                    setCopyFailed(false);
                                }}
                            >
                                <span>{preset.label}</span>
                                <small>{preset.badge}</small>
                            </button>
                        ))}
                    </div>
                    <div className="endpoint-preset-copy">
                        <strong>{activePreset.label}</strong>
                        <p>{activePreset.intro}</p>
                        <span>{activePreset.summary}</span>
                    </div>
                    <div className="endpoint-hero-actions">
                        <a className="endpoint-primary-link" href={mailto}>
                            Gửi email <Mail size={16} aria-hidden="true" />
                        </a>
                        <button className="endpoint-secondary-link" type="button" onClick={copyPayload}>
                            {copied ? "Đã copy mẫu brief" : `Copy ${activePreset.label}`}
                            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        </button>
                    </div>

                <div className="endpoint-trust-strip" aria-label="Contact fit summary">
                    <article>
                        <span>Phản hồi</span>
                        <strong>24-48h nếu brief đủ context</strong>
                    </article>
                    <article>
                        <span>Phù hợp</span>
                        <strong>Website, dashboard, internal tool</strong>
                    </article>
                    <article>
                        <span>Cần có</span>
                        <strong>Bối cảnh, dữ liệu, deadline, mục tiêu</strong>
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
                        {activePreset.briefLines.map((line, idx) => (
                            <span className="code-line indent" key={line.key}>
                                <span className="code-key">"{line.key}"</span>
                                <span className="code-syntax">: </span>
                                <span className="code-value">"{line.value}"</span>
                                {idx < activePreset.briefLines.length - 1 ? (
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
                            aria-label="Copy mẫu brief"
                            type="button"
                        >
                            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                            {copied ? "Đã copy mẫu brief" : `Copy ${activePreset.label}`}
                        </button>
                        {copyFailed ? (
                            <span className="error-text">Trình duyệt chặn clipboard. Bạn có thể bôi đen và copy trực tiếp.</span>
                        ) : null}
                    </div>
                </div>

                <div className="endpoint-routes">
                    <div className="routes-label">Kênh liên hệ</div>

                    <a className="route-card" href={mailto}>
                        <div className="route-method post">Email</div>
                        <div className="route-path">Gửi brief qua email</div>
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
                        <div className="route-method get">GitHub</div>
                        <div className="route-path">Xem source public</div>
                        <div className="route-icon">
                            <Github size={18} />
                        </div>
                        <div className="route-detail">{profile.githubName}</div>
                    </a>

                    <div className="response-contract">
                        <span>Sau khi gửi brief</span>
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
                    Đọc case study <ArrowRight size={16} />
                </a>
            </footer>
        </section>
    );
}
