import { ArrowRight } from "lucide-react";
import { getShellModeCopy } from "../../content/shellModeCopy";

function formatLabel(value) {
    if (!value) return "Unknown";
    return value[0].toUpperCase() + value.slice(1);
}

export function Footer({
    activeRecord,
    copyToClipboard,
    copyEmail,
    jumpTo,
    mode,
    nextRecord,
    presentationMode,
    profile,
    setPresentationMode,
}) {
    const copy = getShellModeCopy(mode);

    const handleAction = (action) => {
        switch (action.kind) {
            case "copy-email":
                copyEmail();
                return;
            case "copy-summary":
                copyToClipboard(
                    `${copy.footerLead}\n${copy.footerDetail}`,
                    action.toast ?? `Đã copy ${action.label.toLowerCase()}`,
                );
                return;
            case "reel":
                setPresentationMode(true);
                jumpTo(`#${action.target ?? "home"}`);
                return;
            case "jump":
            default:
                jumpTo(`#${action.target ?? "home"}`);
        }
    };

    return (
        <footer className="site-footer">
            <div className="footer-copy">
                <span>{copy.footerLabel}</span>
                <strong>{copy.footerLead}</strong>
                <small>
                    {presentationMode ? "Reel đang chạy" : "Manual scan"}
                    {" / now "}
                    {activeRecord?.displayChapter ?? "00"}{" "}
                    {formatLabel(
                        activeRecord?.railLabel ?? activeRecord?.label,
                    )}
                    {" / next "}
                    {nextRecord?.displayChapter ?? "00"}{" "}
                    {formatLabel(nextRecord?.railLabel ?? nextRecord?.label)}
                </small>
            </div>
            <div className="footer-meta">
                <span>{copy.footerDetail}</span>
                <small>{profile.footer}</small>
            </div>
            <div className="footer-actions" aria-label="Mode actions">
                {(copy.footerActions ?? []).map((action) => (
                    <button
                        type="button"
                        key={`${action.kind ?? "jump"}-${action.target ?? action.label}`}
                        className="footer-action"
                        data-magnetic
                        onClick={() => handleAction(action)}
                    >
                        <span>{action.label}</span>
                        <strong>{action.hint}</strong>
                    </button>
                ))}
            </div>
            <button
                className="back-top"
                type="button"
                data-magnetic
                onClick={() => jumpTo("#home")}
                aria-label="Back to top"
            >
                <ArrowRight
                    aria-hidden="true"
                    style={{ transform: "rotate(-90deg)" }}
                />
            </button>
        </footer>
    );
}
