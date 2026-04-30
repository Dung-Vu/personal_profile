import { Search, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { getShellModeCopy } from "../../content/shellModeCopy";
import { themePacks } from "../../content/themePacks";
import { getNavItems } from "../../lib/sections";
import { useCommandPanel } from "../../hooks/useCommandPanel";
import { ScrambleText } from "../ui/ScrambleText";

const densityOptions = ["comfort", "compact"];
const modeOptions = ["story", "systems"];
const motionProfiles = ["full", "balanced", "calm"];

function formatLabel(value) {
    return (
        getShellModeCopy(value).modeName ??
        value[0].toUpperCase() + value.slice(1)
    );
}

export function CommandPanel({
    commandButtonRef,
    copyEmail,
    density,
    jumpTo,
    mode,
    motionEnabled,
    motionProfile,
    onClose,
    presentationMode,
    profile,
    setMotionEnabled,
    setDensity,
    setMode,
    setMotionProfile,
    setPresentationMode,
    setTheme,
    showToast,
    scrambleEnabled,
    theme,
}) {
    const [query, setQuery] = useState("");
    const close = useCallback(() => onClose(), [onClose]);
    const { dialogRef, firstCommandRef } = useCommandPanel(
        true,
        close,
        commandButtonRef,
    );
    const navItems = useMemo(() => getNavItems(mode), [mode]);

    const commands = useMemo(
        () => [
            {
                title: "Jump",
                items: navItems.map(
                    ({
                        id,
                        displayChapter,
                        navLabel,
                        railLabel,
                        shellHint,
                    }) => ({
                        id: `jump-${id}`,
                        label: `${displayChapter} / ${formatLabel(navLabel ?? id)}`,
                        hint: shellHint ?? "section",
                        keywords: [
                            id,
                            navLabel,
                            railLabel,
                            shellHint,
                            displayChapter,
                            "jump",
                            "section",
                        ].filter(Boolean),
                        action: () => jumpTo(`#${id}`),
                    }),
                ),
            },
            {
                title: "Modes",
                items: modeOptions.map((value) => ({
                    id: `mode-${value}`,
                    label: `mode / ${formatLabel(value)}`,
                    hint: mode === value ? "active mode" : "view mode",
                    keywords: [value, "mode", "view"],
                    action: () => {
                        setMode(value);
                        showToast(`Đã chuyển mode sang ${formatLabel(value)}`);
                    },
                })),
            },
            {
                title: "Shell",
                items: [
                    ...densityOptions.map((value) => ({
                        id: `density-${value}`,
                        label: `density / ${formatLabel(value)}`,
                        hint:
                            density === value
                                ? "active density"
                                : "layout density",
                        keywords: [value, "density", "layout"],
                        action: () => {
                            setDensity(value);
                            showToast(`Density: ${formatLabel(value)}`);
                        },
                    })),
                    ...motionProfiles.map((value) => ({
                        id: `motion-${value}`,
                        label: `motion / ${formatLabel(value)}`,
                        hint:
                            motionProfile === value
                                ? "active profile"
                                : "motion profile",
                        keywords: [value, "motion", "profile"],
                        action: () => {
                            setMotionProfile(value);
                            showToast(`Motion profile: ${formatLabel(value)}`);
                        },
                    })),
                    {
                        id: "presentation-toggle",
                        label: `reel / ${presentationMode ? "stop" : "start"}`,
                        hint: presentationMode
                            ? "presentation running"
                            : "guided autoplay",
                        keywords: [
                            "reel",
                            "presentation",
                            "autoplay",
                            presentationMode ? "stop" : "start",
                        ],
                        action: () => {
                            setPresentationMode((current) => !current);
                            showToast(
                                presentationMode
                                    ? "Đã tắt presentation reel"
                                    : "Đã bật presentation reel",
                            );
                        },
                    },
                ],
            },
            {
                title: "Theme",
                items: themePacks.map(({ id, label }) => ({
                    id: `theme-${id}`,
                    label: `theme / ${label}`,
                    hint: theme === id ? "active theme" : "theme pack",
                    keywords: [id, label, "theme", "accent"],
                    action: () => {
                        setTheme(id);
                        showToast(`Theme: ${label}`);
                    },
                })),
            },
            {
                title: "Actions",
                items: [
                    {
                        id: "copy-email",
                        label: `copy / ${profile.email}`,
                        hint: "contact",
                        keywords: ["copy", "email", profile.email],
                        action: copyEmail,
                    },
                    {
                        id: "github",
                        label: "open / GitHub",
                        hint: "external",
                        keywords: ["github", "external"],
                        action: () =>
                            window.open(
                                profile.github,
                                "_blank",
                                "noopener,noreferrer",
                            ),
                    },
                    {
                        id: "motion-toggle",
                        label: `motion toggle / ${motionEnabled ? "reduce" : "enable"}`,
                        hint: "quick toggle",
                        keywords: ["motion", "toggle", "reduce", "enable"],
                        action: () => {
                            setMotionEnabled((enabled) => !enabled);
                            showToast(
                                motionEnabled
                                    ? "Motion đã giảm"
                                    : "Motion đã bật",
                            );
                        },
                    },
                ],
            },
        ],
        [
            copyEmail,
            density,
            jumpTo,
            mode,
            motionEnabled,
            motionProfile,
            navItems,
            presentationMode,
            profile.email,
            profile.github,
            setDensity,
            setMode,
            setMotionEnabled,
            setMotionProfile,
            setPresentationMode,
            showToast,
            theme,
        ],
    );

    const filteredCommands = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return commands;

        return commands
            .map((group) => ({
                ...group,
                items: group.items.filter((command) =>
                    `${command.label} ${command.hint} ${command.keywords.join(" ")}`
                        .toLowerCase()
                        .includes(normalized),
                ),
            }))
            .filter((group) => group.items.length > 0);
    }, [commands, query]);

    return (
        <div
            className="command-panel"
            role="presentation"
            onMouseDown={onClose}
        >
            <div
                className="command-box"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="command-panel-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="command-head">
                    <ScrambleText
                        as="span"
                        id="command-panel-title"
                        enabled={scrambleEnabled}
                    >
                        command center
                    </ScrambleText>
                    <small>Mode, theme, density, motion, deep links</small>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close command panel"
                    >
                        <X aria-hidden="true" />
                    </button>
                </div>
                <div
                    className="command-status"
                    aria-label="Current shell status"
                >
                    <span>mode / {formatLabel(mode)}</span>
                    <span>density / {density}</span>
                    <span>motion / {motionProfile}</span>
                    <span>reel / {presentationMode ? "on" : "off"}</span>
                    <span>theme / {theme}</span>
                </div>
                <label className="command-search">
                    <Search aria-hidden="true" />
                    <input
                        ref={firstCommandRef}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Tìm section, GitHub, motion, theme..."
                        aria-label="Search commands"
                    />
                </label>
                <div className="command-list">
                    {filteredCommands.map((group) => (
                        <section
                            className="command-group"
                            key={group.title}
                            aria-label={group.title}
                        >
                            <p>{group.title}</p>
                            {group.items.map((command) => (
                                <button
                                    type="button"
                                    key={command.id}
                                    onClick={() => {
                                        command.action();
                                        onClose();
                                    }}
                                >
                                    <ScrambleText enabled={scrambleEnabled}>
                                        {command.label}
                                    </ScrambleText>
                                    <small>{command.hint}</small>
                                </button>
                            ))}
                        </section>
                    ))}
                    {!filteredCommands.length && (
                        <p className="command-empty">Không có lệnh phù hợp.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
