import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Copy, Github, Mail, RotateCcw } from "lucide-react";

const intakePrompts = [
    {
        code: "01",
        title: "Current system",
        detail: "Link hiện tại, ảnh màn hình hoặc flow đang vận hành để mình đọc đúng context trước.",
    },
    {
        code: "02",
        title: "Data and states",
        detail: "Dữ liệu nào đang có, trạng thái lỗi/loading nào quan trọng, và ai là người dùng chính.",
    },
    {
        code: "03",
        title: "Desired outcome",
        detail: "Màn hình hoặc workflow cần ra quyết định nhanh hơn ở đâu và thành công được đo bằng gì.",
    },
    {
        code: "04",
        title: "Constraints",
        detail: "Deadline, hệ thống cũ, API, thiết bị ưu tiên và các giới hạn không được phá vỡ.",
    },
];

const templateRows = [
    ["scope", "website / dashboard / internal tool"],
    ["context", "current flow, current friction, screenshots"],
    ["data", "sources, key states, integration points"],
    ["goal", "desired outcome, speed, clarity, conversion"],
    ["timeline", "target date, handoff expectations"],
];

const scopeOptions = ["Website", "Dashboard", "Internal tool", "AI workflow"];

const defaultComposer = {
    scope: scopeOptions[0],
    currentSystem: "Landing page / dashboard / internal flow đang có gì?",
    dataNotes: "Nguồn data, key states, API hoặc integration points quan trọng",
    desiredOutcome: "Người dùng cần quyết định nhanh hơn ở bước nào?",
    timeline: "Deadline / launch window / handoff expectations",
};

function buildDraft({
    currentSystem,
    dataNotes,
    desiredOutcome,
    scope,
    timeline,
}) {
    return [
        "Chào Dũng,",
        "",
        "Mình muốn trao đổi về:",
        `- Scope: ${scope}`,
        `- Current system: ${currentSystem}`,
        `- Data and states: ${dataNotes}`,
        `- Desired outcome: ${desiredOutcome}`,
        `- Timeline: ${timeline}`,
        "",
        "Nhờ bạn giúp mình định hướng UI/UX và runnable slice phù hợp.",
    ].join("\n");
}

export function IntakeConsole({ briefHref, copyEmail, profile }) {
    const [composer, setComposer] = useState(defaultComposer);
    const [copiedDraft, setCopiedDraft] = useState(false);
    const copyTimerRef = useRef(0);

    const signalCards = [
        {
            label: "reply mode",
            value: "scope -> interface -> runnable slice",
        },
        {
            label: "best fit",
            value: "website, dashboard, internal operations UI",
        },
        {
            label: "base",
            value: profile.location,
        },
    ];

    const draftBody = useMemo(() => buildDraft(composer), [composer]);
    const draftHref = useMemo(() => {
        const subject = encodeURIComponent(`Project brief - ${composer.scope}`);
        const body = encodeURIComponent(draftBody);
        return `mailto:${profile.email}?subject=${subject}&body=${body}`;
    }, [composer.scope, draftBody, profile.email]);

    useEffect(() => () => window.clearTimeout(copyTimerRef.current), []);

    const updateField = (key) => (event) => {
        setComposer((current) => ({
            ...current,
            [key]: event.target.value,
        }));
    };

    const resetComposer = () => {
        setComposer(defaultComposer);
        setCopiedDraft(false);
    };

    const handleCopyDraft = async () => {
        try {
            await navigator.clipboard.writeText(draftBody);
            setCopiedDraft(true);
            window.clearTimeout(copyTimerRef.current);
            copyTimerRef.current = window.setTimeout(
                () => setCopiedDraft(false),
                1600,
            );
        } catch {
            window.location.href = draftHref;
        }
    };

    return (
        <div
            className="intake-console reveal"
            aria-label="Project intake console"
        >
            <div className="intake-console-top">
                <div className="intake-terminal">
                    <div className="intake-terminal-top">
                        <span>intake.console</span>
                        <strong>ready_for_scope</strong>
                    </div>
                    <p>
                        Gửi brief theo format này để mình phản hồi bằng hướng
                        triển khai rõ state, rõ flow và có runnable slice sớm.
                    </p>
                </div>

                <div
                    className="contact-signal-grid"
                    aria-label="Engagement signals"
                >
                    {signalCards.map((item) => (
                        <article
                            className="contact-signal-card"
                            key={item.label}
                        >
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                        </article>
                    ))}
                </div>
            </div>

            <div className="intake-body">
                <div className="intake-prompt-grid" aria-label="Brief prompts">
                    {intakePrompts.map((item) => (
                        <article className="intake-prompt-card" key={item.code}>
                            <span>{item.code}</span>
                            <strong>{item.title}</strong>
                            <p>{item.detail}</p>
                        </article>
                    ))}
                </div>

                <aside className="intake-sidecar">
                    <div className="intake-composer">
                        <div className="intake-template-head">
                            <span>inline composer</span>
                            <strong>draft before sending</strong>
                        </div>

                        <div
                            className="scope-chip-row"
                            aria-label="Project scope presets"
                        >
                            {scopeOptions.map((value) => (
                                <button
                                    type="button"
                                    key={value}
                                    className={`scope-chip ${composer.scope === value ? "active" : ""}`}
                                    onClick={() =>
                                        setComposer((current) => ({
                                            ...current,
                                            scope: value,
                                        }))
                                    }
                                >
                                    {value}
                                </button>
                            ))}
                        </div>

                        <div className="intake-field-grid">
                            <label className="intake-field full">
                                <span>current system</span>
                                <textarea
                                    value={composer.currentSystem}
                                    onChange={updateField("currentSystem")}
                                />
                            </label>
                            <label className="intake-field">
                                <span>data and states</span>
                                <textarea
                                    value={composer.dataNotes}
                                    onChange={updateField("dataNotes")}
                                />
                            </label>
                            <label className="intake-field">
                                <span>desired outcome</span>
                                <textarea
                                    value={composer.desiredOutcome}
                                    onChange={updateField("desiredOutcome")}
                                />
                            </label>
                            <label className="intake-field full">
                                <span>timeline</span>
                                <input
                                    type="text"
                                    value={composer.timeline}
                                    onChange={updateField("timeline")}
                                />
                            </label>
                        </div>

                        <div className="intake-draft-preview">
                            <span>draft preview</span>
                            <pre>{draftBody}</pre>
                        </div>

                        <div className="contact-links intake-draft-actions">
                            <a
                                className="contact-link primary"
                                href={draftBody ? draftHref : briefHref}
                                data-magnetic
                            >
                                <Mail aria-hidden="true" />
                                <span>Open draft</span>
                                <ArrowUpRight aria-hidden="true" />
                            </a>
                            <button
                                type="button"
                                className="contact-link"
                                onClick={handleCopyDraft}
                                data-magnetic
                            >
                                <Copy aria-hidden="true" />
                                <span>
                                    {copiedDraft
                                        ? "Copied draft"
                                        : "Copy draft"}
                                </span>
                            </button>
                            <button
                                type="button"
                                className="contact-link"
                                onClick={resetComposer}
                                data-magnetic
                            >
                                <RotateCcw aria-hidden="true" />
                                <span>Reset</span>
                            </button>
                        </div>
                    </div>

                    <div className="intake-template">
                        <div className="intake-template-head">
                            <span>brief template</span>
                            <strong>paste into mail / chat</strong>
                        </div>
                        {templateRows.map(([label, value]) => (
                            <div className="terminal-line" key={label}>
                                <span>{label}</span>
                                <strong>{value}</strong>
                            </div>
                        ))}
                    </div>

                    <div className="intake-actions-panel">
                        <div className="terminal-line">
                            <span>email</span>
                            <strong>{profile.email}</strong>
                        </div>
                        <div className="terminal-line">
                            <span>github</span>
                            <strong>{profile.githubName}</strong>
                        </div>
                        <div className="contact-links">
                            <button
                                type="button"
                                className="contact-link"
                                onClick={copyEmail}
                                data-magnetic
                            >
                                <Copy aria-hidden="true" />
                                <span>Copy email</span>
                            </button>
                            <a
                                className="contact-link"
                                href={profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-magnetic
                            >
                                <Github aria-hidden="true" />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
