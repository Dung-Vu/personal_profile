import { useMemo, useState } from "react";
import "../styles/contact.css";
import {
    ArrowRight,
    CheckCircle2,
    Copy,
    Github,
    Mail,
    Terminal,
    Server,
    Database,
    Zap
} from "lucide-react";
import { profile } from "../profileData";
import { navigateTo } from "../hooks/useRoutePath";

const briefLines = [
    {
        key: "context",
        value: "Sản phẩm / quy trình hiện tại đang gặp vấn đề gì?",
    },
    {
        key: "data",
        value: "Dữ liệu, API, tool hoặc hệ thống nào đang liên quan?",
    },
    {
        key: "goal",
        value: "Kết quả muốn đạt được sau 1-2 vòng triển khai là gì?",
    },
    {
        key: "timeline",
        value: "Mức ưu tiên, deadline và trạng thái hiện tại ra sao?",
    },
];

const capabilities = [
    {
        category: "Supported Protocols (Green Zone)",
        items: [
            { type: "green", text: "Website / landing có narrative + CTA rõ" },
            { type: "green", text: "Dashboard dữ liệu cần đọc nhanh, ít nhiễu" },
            { type: "green", text: "Internal tool kết nối API/Odoo/workflow" },
            { type: "green", text: "AI workflow audit, context & browser QA" },
            { type: "green", text: "Brief ngắn, ra bản chạy đầu tiên trong 3-10 ngày" }
        ]
    },
    {
        category: "Unsupported Formats (Red Zone)",
        items: [
            { type: "red", text: "Brand identity, Logo, Illustration thuần túy" },
            { type: "red", text: "Thiết kế Mobile Native App (chỉ focus Web)" },
            { type: "red", text: "Dự án thiếu dữ liệu thực tế để Verify Runtime" },
            { type: "red", text: "Brief chung chung không có scope rõ ràng" }
        ]
    }
];

export function ContactPage() {
    const [copied, setCopied] = useState(false);
    const [copyFailed, setCopyFailed] = useState(false);
    
    const mailto = useMemo(() => {
        const subject = encodeURIComponent(`Project Payload for ${profile.name}`);
        const body = encodeURIComponent(
            "```json\n{\n" +
            briefLines.map((line) => `  "${line.key}": "${line.value}"`).join(",\n") +
            "\n}\n```"
        );
        return `mailto:${profile.email}?subject=${subject}&body=${body}`;
    }, []);

    const copyPayload = async () => {
        const payloadText = "{\n" + briefLines.map((line) => `  "${line.key}": "${line.value}"`).join(",\n") + "\n}";
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
            
            {/* HERO SECTION */}
            <header className="endpoint-hero">
                <div className="hero-kicker">
                    <Terminal size={14} />
                    <span>INITIALIZE CONNECTION</span>
                </div>
                <h1 id="endpoint-title">Khởi tạo luồng công việc mới.</h1>
                <p>
                    Gửi một Request Payload đầy đủ ngữ cảnh. Hệ thống sẽ phản hồi hướng giải quyết (MVP Scope) trong vòng 24-48h.
                </p>
            </header>

            {/* THE CONSOLE GRID */}
            <div className="endpoint-grid">
                
                {/* Left: The JSON Payload Editor */}
                <div className="payload-terminal">
                    <div className="terminal-header">
                        <div className="terminal-dots">
                            <span></span><span></span><span></span>
                        </div>
                        <span className="terminal-title">request_payload.json</span>
                    </div>
                    
                    <div className="terminal-body">
                        <span className="code-line"><span className="code-syntax">{"{"}</span></span>
                        {briefLines.map((line, idx) => (
                            <span className="code-line indent" key={line.key}>
                                <span className="code-key">"{line.key}"</span>
                                <span className="code-syntax">: </span>
                                <span className="code-value">"{line.value}"</span>
                                {idx < briefLines.length - 1 && <span className="code-syntax">,</span>}
                            </span>
                        ))}
                        <span className="code-line"><span className="code-syntax">{"}"}</span></span>
                    </div>

                    <div className="terminal-footer">
                        <button 
                            className="terminal-action-btn" 
                            onClick={copyPayload}
                            aria-label="Copy JSON Payload"
                        >
                            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                            {copied ? "[200 OK] Payload Copied" : "Copy Payload Format"}
                        </button>
                        {copyFailed && <span className="error-text">Clipboard blocked. Please copy manually.</span>}
                    </div>
                </div>

                {/* Right: Endpoints */}
                <div className="endpoint-routes">
                    <div className="routes-label">Available Endpoints</div>
                    
                    <a className="route-card" href={mailto}>
                        <div className="route-method post">POST</div>
                        <div className="route-path">/contact/email</div>
                        <div className="route-icon"><Mail size={18} /></div>
                        <div className="route-detail">{profile.email}</div>
                    </a>

                    <a className="route-card" href={profile.github} target="_blank" rel="noopener noreferrer">
                        <div className="route-method get">GET</div>
                        <div className="route-path">/profile/github</div>
                        <div className="route-icon"><Github size={18} /></div>
                        <div className="route-detail">{profile.githubName}</div>
                    </a>

                    <div className="route-card disabled">
                        <div className="route-method options">WSS</div>
                        <div className="route-path">/live/chat</div>
                        <div className="route-detail">Connection Offline</div>
                    </div>
                </div>
            </div>

            {/* SYSTEM CAPABILITIES */}
            <div className="capabilities-section">
                <div className="capabilities-header">
                    <Server size={20} />
                    <h2>System Capabilities</h2>
                    <p>Đảm bảo yêu cầu của bạn khớp với thông số kỹ thuật của hệ thống để tránh lãng phí thời gian.</p>
                </div>

                <div className="capabilities-grid">
                    {capabilities.map((group) => (
                        <div className="capability-group" key={group.category}>
                            <h3>{group.category}</h3>
                            <ul className="capability-list">
                                {group.items.map((item, idx) => (
                                    <li key={idx}>
                                        <span className={`status-dot ${item.type}`}></span>
                                        <span className="cap-text">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* FOOTER CTA */}
            <footer className="endpoint-footer">
                <div className="footer-content">
                    <Zap size={24} className="footer-icon" />
                    <div className="footer-text">
                        <h2>Kiểm chứng qua Case Study</h2>
                        <p>Bạn vẫn chưa chắc chắn? Hãy xem qua cách hệ thống này đã giải quyết các bài toán thực tế.</p>
                    </div>
                </div>
                <a href="/work" className="endpoint-cta-btn" onClick={(e) => { e.preventDefault(); navigateTo("/work"); }}>
                    Đọc Case Studies <ArrowRight size={16} />
                </a>
            </footer>

        </section>
    );
}
