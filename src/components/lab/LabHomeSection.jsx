import { ArrowRight, Home, Mail } from "lucide-react";
import { navigateTo } from "../../hooks/useRoutePath";
import { routes } from "../../routes/routes";
import { getShellModeCopy } from "../../content/shellModeCopy";
import { MetricBand } from "../shared/MetricBand";
import { ScrambleText } from "../ui/ScrambleText";

const modeOptions = ["story", "systems"];

const statusItems = ["legacy shell", "canvas", "command", "reel", "archive"];

const modeProfiles = {
    story: {
        label: "archive mode",
        title: "Lab chỉ giữ lại cảm giác Signal OS cũ.",
        detail: "Các phần portfolio chính đã chuyển ra route riêng; mode này dùng để xem lại interaction shell mà không phải đọc lại toàn bộ nội dung.",
    },
    systems: {
        label: "shell mode",
        title: "Tập trung vào control surface, mode switch và command center.",
        detail: "Dùng khi muốn kiểm tra behavior của OS shell: theme, density, motion, reel, cursor và canvas.",
    },
};

function formatLabel(value) {
    return (
        getShellModeCopy(value).modeName ??
        value[0].toUpperCase() + value.slice(1)
    );
}

export function LabHomeSection({
    copyEmail,
    density,
    jumpTo,
    labSectionCount,
    mode,
    motionProfile,
    presentationMode,
    profile,
    scrambleEnabled,
    sectionMeta,
    setMode,
    setPresentationMode,
    theme,
}) {
    const activeModeProfile = modeProfiles[mode] ?? modeProfiles.story;
    const siteRouteCount = routes.length;
    const stats = [
        {
            label: "lab sections",
            value: String(labSectionCount ?? 0).padStart(2, "0"),
        },
        {
            label: "site routes",
            value: String(siteRouteCount).padStart(2, "0"),
        },
        { label: "modes", value: String(modeOptions.length).padStart(2, "0") },
        { label: "status", value: "Archive" },
    ];

    return (
        <section
            id="home"
            className="hero chapter lab-home"
            data-chapter={sectionMeta?.displayChapter ?? "00"}
            data-scene="boot"
            data-mode-order={sectionMeta?.modeOrder}
            data-mode-tone={sectionMeta?.modeTone}
            data-mode-presentation={sectionMeta?.modePresentation}
        >
            <div className="hero-media parallax-image" aria-hidden="true">
                <img
                    src="/assets/signal-hero-generated-1536.webp"
                    alt=""
                    loading="eager"
                    decoding="async"
                />
            </div>
            <div className="hero-grid">
                <div className="hero-copy">
                    <ScrambleText
                        as="p"
                        className="system-label reveal"
                        enabled={scrambleEnabled}
                    >
                        archived motion lab
                    </ScrambleText>
                    <div
                        className="hero-status-strip reveal"
                        aria-label="Lab archive status"
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
                        Bản motion cũ, giữ lại như phòng lab.
                    </ScrambleText>
                    <p className="hero-intro reveal">
                        Trang này từng là trang chính nên chứa quá nhiều vai trò
                        cùng lúc. Bây giờ Home, About, Work, Stack, Workflow và
                        Contact đã tách riêng; Lab chỉ giữ 2 mode và 2 section
                        để xem lại shell thử nghiệm, motion và command surface
                        mà không lặp lại phần portfolio chính.
                    </p>
                    <MetricBand items={stats} />
                    <div className="hero-actions reveal">
                        <button
                            className="action primary"
                            type="button"
                            data-magnetic
                            onClick={() => navigateTo("/")}
                        >
                            <Home aria-hidden="true" />
                            <span>Về Home mới</span>
                        </button>
                        <a
                            className="action"
                            href="#archive"
                            data-magnetic
                            onClick={(event) => {
                                event.preventDefault();
                                jumpTo("#archive");
                            }}
                        >
                            <span>Mở archive map</span>
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
                        aria-label="Lab mode switch"
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
                    aria-label="Lab control snapshot"
                    data-cursor="inspect"
                >
                    <div className="card-head">
                        <span>lab.surface</span>
                        <strong>archived</strong>
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
                    <div className="hero-system-note">
                        <span>kept here</span>
                        <p>
                            Custom cursor, command panel, 2-mode switch,
                            presentation reel và signal canvas.
                        </p>
                    </div>
                    <div className="hero-system-note">
                        <span>moved out</span>
                        <p>
                            Portfolio story, case study, stack, workflow và
                            contact intake đã thuộc các route chính của site.
                        </p>
                    </div>
                    <div className="signal-bars" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    <small className="lab-home-footnote">
                        {profile.footer}
                    </small>
                </div>
            </div>
        </section>
    );
}
