import { getSectionModeCopy } from "../../content/sectionModeCopy";
import { ArrowRight, Mail } from "lucide-react";
import { MetricBand } from "../shared/MetricBand";
import { ScrambleText } from "../ui/ScrambleText";

const modeOptions = ["story", "systems", "cases", "recruiter"];

const statusItems = [
    "frontend",
    "dashboard",
    "automation",
    "remote",
    "available",
];

const modeProfiles = {
    story: {
        label: "story mode",
        title: "Ưu tiên narrative và năng lực đọc được trong một nhịp liền mạch.",
        detail: "Hero nghiêng về hành trình, trust surface và cách mình biến bài toán thành một câu chuyện dễ hiểu.",
    },
    systems: {
        label: "systems mode",
        title: "Nhấn vào state, structure và phần hệ thống đứng sau giao diện.",
        detail: "Tập trung hơn vào shell behavior, capability matrix, workflow output và cách UI phản ánh data shape.",
    },
    cases: {
        label: "cases mode",
        title: "Đưa case study lên foreground để người xem đọc kết quả nhanh hơn.",
        detail: "Project theater và evidence surfaces được đẩy nổi hơn để portfolio giống một showcase operating product thật.",
    },
};

function formatLabel(value) {
    return value[0].toUpperCase() + value.slice(1);
}

export function HeroSection({
    copyEmail,
    density,
    jumpTo,
    mode,
    motionProfile,
    presentationMode,
    primarySectionId,
    primarySectionLabel,
    profile,
    scrambleEnabled,
    sectionMeta,
    setMode,
    setPresentationMode,
    theme,
}) {
    const activeModeProfile = modeProfiles[mode] ?? modeProfiles.story;
    const copy = getSectionModeCopy("home", mode);

    const stats = [
        {
            label: "cases",
            value: String(profile.projects.length).padStart(2, "0"),
        },
        {
            label: "capabilities",
            value: String(profile.stack.length).padStart(2, "0"),
        },
        {
            label: "workflow",
            value: String(profile.workflow.length).padStart(2, "0"),
        },
        { label: "mode", value: formatLabel(mode) },
    ];

    return (
        <section
            id="home"
            className="hero chapter"
            data-chapter={sectionMeta?.displayChapter ?? "00"}
            data-scene="boot"
            data-mode-order={sectionMeta?.modeOrder}
            data-mode-tone={sectionMeta?.modeTone}
            data-mode-presentation={sectionMeta?.modePresentation}
        >
            <div className="hero-media parallax-image" aria-hidden="true">
                <img src={profile.heroImage} alt="" loading="eager" decoding="async" fetchPriority="high" />
            </div>
            <div className="hero-grid">
                <div className="hero-copy">
                    <ScrambleText
                        as="p"
                        className="system-label reveal"
                        enabled={scrambleEnabled}
                    >
                        {copy.label ?? "personal operating profile / online"}
                    </ScrambleText>
                    <div
                        className="hero-status-strip reveal"
                        aria-label="Live signal status"
                    >
                        {statusItems.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                    <ScrambleText
                        as="h1"
                        className="kinetic-title reveal"
                        enabled={scrambleEnabled}
                    >
                        {profile.headline}
                    </ScrambleText>
                    <p className="hero-intro reveal">
                        {copy.intro ?? profile.intro}
                    </p>
                    <MetricBand items={stats} />
                    <div className="hero-actions reveal">
                        <a
                            className="action primary"
                            href={`#${primarySectionId ?? "projects"}`}
                            data-magnetic
                            onClick={(event) => {
                                event.preventDefault();
                                jumpTo(`#${primarySectionId ?? "projects"}`);
                            }}
                        >
                            <span>
                                {copy.primaryAction ??
                                    `Mở ${primarySectionLabel ?? "projects"}`}
                            </span>
                            <ArrowRight aria-hidden="true" />
                        </a>
                        <button
                            className="action ghost"
                            type="button"
                            data-magnetic
                            onClick={copyEmail}
                        >
                            <Mail aria-hidden="true" />
                            <span>Copy email</span>
                        </button>
                    </div>
                    <div
                        className="hero-mode-switch reveal"
                        aria-label="Hero view mode switch"
                    >
                        {modeOptions.map((value) => (
                            <button
                                key={value}
                                type="button"
                                className={mode === value ? "active" : ""}
                                data-magnetic
                                onClick={() => setMode(value)}
                            >
                                {formatLabel(value)}
                            </button>
                        ))}
                    </div>
                    <div className="hero-mode-panel reveal" aria-live="polite">
                        <span>{activeModeProfile.label}</span>
                        <strong>{activeModeProfile.title}</strong>
                        <p>{activeModeProfile.detail}</p>
                        <button
                            type="button"
                            className={`hero-presentation-toggle ${presentationMode ? "active" : ""}`}
                            data-magnetic
                            onClick={() =>
                                setPresentationMode((current) => !current)
                            }
                        >
                            {presentationMode
                                ? "Stop presentation reel"
                                : "Start presentation reel"}
                        </button>
                    </div>
                </div>
                <div
                    className="identity-card hero-control-panel reveal"
                    aria-label="Profile snapshot"
                    data-cursor="inspect"
                >
                    <div className="card-head">
                        <span>control.surface</span>
                        <strong>active</strong>
                    </div>
                    <div className="hero-control-shell">
                        <div>
                            <span>theme</span>
                            <strong>{theme}</strong>
                        </div>
                        <div>
                            <span>density</span>
                            <strong>{density}</strong>
                        </div>
                        <div>
                            <span>motion</span>
                            <strong>{motionProfile}</strong>
                        </div>
                    </div>
                    <dl>
                        <div>
                            <dt>Role</dt>
                            <dd>Web Developer</dd>
                        </div>
                        <div>
                            <dt>Birth</dt>
                            <dd>{profile.birthday}</dd>
                        </div>
                        <div>
                            <dt>Base</dt>
                            <dd>{profile.location}</dd>
                        </div>
                        <div>
                            <dt>Focus</dt>
                            <dd>{profile.focus}</dd>
                        </div>
                    </dl>
                    <div className="hero-system-note">
                        <span>focus</span>
                        <p>
                            Thiết kế shell rõ trạng thái, UI đậm tính vận hành
                            và luồng kiểm chứng được trong runtime.
                        </p>
                    </div>
                    <div className="signal-bars" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </div>
        </section>
    );
}
