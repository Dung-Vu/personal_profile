import { useEffect } from "react";

const modeOptions = [
    ["story", "Story"],
    ["systems", "Systems"],
    ["cases", "Cases"],
    ["recruiter", "Recruiter"],
];

const bootLines = [
    "checking modules",
    "loading cases",
    "syncing signal map",
    "ready",
];

export function BootPrelude({
    mode,
    onClose,
    onSelectMode,
    theme,
    onStartPresentation,
}) {
    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === "Escape" || event.key === "Enter") {
                event.preventDefault();
                onClose();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    return (
        <div
            className="boot-prelude"
            role="dialog"
            aria-modal="true"
            aria-labelledby="boot-prelude-title"
        >
            <div className="boot-card">
                <div className="boot-topline">
                    <span id="boot-prelude-title">Signal Profile OS</span>
                    <small>{theme}</small>
                </div>

                <div className="boot-log" aria-hidden="true">
                    {bootLines.map((line, index) => (
                        <p
                            key={line}
                            style={{ animationDelay: `${index * 120}ms` }}
                        >
                            <span>&gt;</span>
                            <strong>{line}</strong>
                        </p>
                    ))}
                </div>

                <div className="boot-actions" aria-label="Quick mode select">
                    {modeOptions.map(([value, label]) => (
                        <button
                            type="button"
                            key={value}
                            className={mode === value ? "active" : ""}
                            onClick={() => {
                                onSelectMode(value);
                                onClose();
                            }}
                        >
                            {label}
                        </button>
                    ))}
                    <button type="button" onClick={onStartPresentation}>
                        Presentation
                    </button>
                </div>

                <button type="button" className="boot-skip" onClick={onClose}>
                    Skip intro
                </button>
            </div>
        </div>
    );
}
