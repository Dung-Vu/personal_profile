import { useMemo, useState } from "react";
import "../styles/contact.css";
import {
    ArrowRight,
    CheckCircle2,
    ClipboardList,
    Copy,
    Github,
    Mail,
    Send,
    Sparkles,
} from "lucide-react";
import { profile } from "../profileData";
import { navigateTo } from "../hooks/useRoutePath";

const briefLines = [
    {
        label: "Context",
        text: "Sản phẩm / quy trình hiện tại đang gặp vấn đề gì?",
    },
    {
        label: "Data",
        text: "Dữ liệu, API, tool hoặc hệ thống nào đang liên quan?",
    },
    {
        label: "Goal",
        text: "Kết quả muốn đạt được sau 1-2 vòng triển khai là gì?",
    },
    {
        label: "Timeline",
        text: "Mức ưu tiên, deadline và trạng thái hiện tại ra sao?",
    },
];

const workTypes = [
    {
        title: "Website",
        detail: "Landing/site có narrative rõ, CTA sạch, visual có chủ đích.",
        tag: "story + conversion",
    },
    {
        title: "Dashboard",
        detail: "Màn hình dữ liệu dễ scan, trạng thái rõ, giảm nhiễu khi đọc nhanh.",
        tag: "data clarity",
    },
    {
        title: "Internal Tool",
        detail: "Workflow vận hành, CRUD/API, admin flow, giảm thao tác thủ công.",
        tag: "ops system",
    },
    {
        title: "AI Workflow",
        detail: "AI/CLI/MCP loop để debug, audit browser và giữ context kỹ thuật.",
        tag: "automation loop",
    },
];

const responseSteps = [
    "Thường phản hồi trong 24-48h nếu brief đủ context.",
    "Đề xuất phạm vi MVP + hướng interface rõ ràng.",
    "Chốt vòng triển khai đầu tiên có thể mở browser kiểm tra.",
];

export function ContactPage() {
    const [copied, setCopied] = useState(false);
    const [copyFailed, setCopyFailed] = useState(false);
    const mailto = useMemo(() => {
        const subject = encodeURIComponent(`Project brief for ${profile.name}`);
        const body = encodeURIComponent(
            briefLines.map((line) => `${line.label}: ${line.text}`).join("\n"),
        );
        return `mailto:${profile.email}?subject=${subject}&body=${body}`;
    }, []);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setCopyFailed(false);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopyFailed(true);
        }
    };

    return (
        <section className="page contact-page" aria-labelledby="contact-title">
            <div className="contact-layout">
                <div className="contact-copy">
                    <div className="page-kicker">Liên hệ</div>
                    <h1 id="contact-title">
                        <span className="headline-line">
                            Gửi mình bối cảnh.
                        </span>
                        <span className="headline-line">
                            Mình trả lại hướng
                        </span>
                        <span className="headline-line">
                            triển khai rõ ràng.
                        </span>
                    </h1>
                    <p>
                        Phù hợp nhất với website/landing page, dashboard dữ
                        liệu, internal tool và workflow AI cần ship nhanh nhưng
                        vẫn có cấu trúc rõ.
                    </p>

                    <div className="contact-actions">
                        <a className="route-cta primary" href={mailto}>
                            <Mail aria-hidden="true" /> Gửi yêu cầu
                        </a>
                        <button
                            type="button"
                            className="route-cta"
                            onClick={copyEmail}
                            aria-label={
                                copied
                                    ? `Copied ${profile.email}`
                                    : `Copy ${profile.email}`
                            }
                        >
                            <Copy aria-hidden="true" />{" "}
                            {copied ? "Đã sao chép" : "Sao chép email"}
                        </button>
                    </div>

                    <div
                        className="contact-response-strip"
                        aria-label="Response flow"
                    >
                        {responseSteps.map((step, index) => (
                            <div key={step}>
                                <span>
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <strong>{step}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="contact-side">
                    <aside
                        className="brief-console contact-console"
                        aria-label="Brief template"
                    >
                        <div className="contact-console-head">
                            <ClipboardList aria-hidden="true" />
                            <strong>
                                Gửi 4 ý chính để mình ước lượng scope MVP.
                            </strong>
                        </div>
                        <div className="console-body brief-line-list">
                            {briefLines.map((line) => (
                                <p key={line.label}>
                                    <span>{line.label}</span>
                                    {line.text}
                                </p>
                            ))}
                        </div>
                        <div
                            className="copy-status"
                            data-visible={copied || copyFailed}
                            aria-live="polite"
                        >
                            <CheckCircle2 aria-hidden="true" />
                            {copied ? (
                                "Cũ sao chép vào clipboard."
                            ) : (
                                <>
                                    Clipboard bị chặn. Copy thủ công:{" "}
                                    <strong>{profile.email}</strong>
                                </>
                            )}
                        </div>
                        <div className="contact-channel-grid">
                            <a className="contact-channel-card" href={mailto}>
                                <Mail aria-hidden="true" />
                                <span>Email</span>
                                <strong>{profile.email}</strong>
                            </a>
                            <a
                                className="contact-channel-card"
                                href={profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github aria-hidden="true" />
                                <span>GitHub</span>
                                <strong>{profile.githubName}</strong>
                            </a>
                        </div>
                    </aside>
                </div>
            </div>

            <div className="contact-fit-section" aria-label="Service fit">
                <div className="contact-fit-header">
                    <h2>Dự án phù hợp nhất</h2>
                    <p>
                        Mình làm tốt nhất với sản phẩm có dữ liệu/API/workflow
                        thật, cần ship từng slice và kiểm chứng bằng browser.
                    </p>
                </div>
                <div className="contact-fit-cols">
                    <div>
                        <strong>💡 Thế mạnh của mình</strong>
                        <ul>
                            <li>Website / landing có narrative + CTA rõ</li>
                            <li>Dashboard dữ liệu cần đọc nhanh, ít nhiễu</li>
                            <li>Internal tool kết nối API/Odoo/workflow</li>
                            <li>AI workflow audit, context & browser QA</li>
                            <li>
                                Dự án bắt đầu từ brief ngắn, ra bản chạy đầu
                                trong 3-10 ngày
                            </li>
                        </ul>
                    </div>
                    <div>
                        <strong>🎯 Đang tập trung vào</strong>
                        <ul>
                            <li>
                                Web application (không phải brand identity /
                                illustration)
                            </li>
                            <li>
                                Web-based dashboard & tool (không mobile native)
                            </li>
                            <li>Dự án có dữ liệu/API để verify runtime</li>
                            <li>Dự án remote, làm việc theo sprint ngắn</li>
                            <li>Brief ban đầu ≥ 48h để có scope MVP rõ ràng</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div
                className="work-type-grid contact-work-grid"
                aria-label="Suitable work types"
            >
                {workTypes.map((item) => (
                    <article
                        key={item.title}
                        aria-label={`${item.title}: ${item.detail}`}
                    >
                        <Send aria-hidden="true" />
                        <span>{item.tag}</span>
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                    </article>
                ))}
            </div>

            <div className="route-panel contact-route-panel">
                <Sparkles aria-hidden="true" />
                <span>Cần xem proof trước?</span>
                <strong>Xem lại case study trước khi gửi yêu cầu.</strong>
                <a
                    className="route-cta"
                    href="/work"
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo("/work");
                    }}
                >
                    Quay lại Work <ArrowRight aria-hidden="true" />
                </a>
            </div>
        </section>
    );
}
