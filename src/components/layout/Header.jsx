import { useMemo } from "react";
import { Menu, Terminal } from "lucide-react";
import { getShellModeCopy } from "../../content/shellModeCopy";
import { getNavItems } from "../../lib/sections";

function formatLabel(value) {
    return (
        getShellModeCopy(value).modeName ??
        value[0].toUpperCase() + value.slice(1)
    );
}

export function Header({
    active,
    commandOpen,
    commandButtonRef,
    cycleDensity,
    cycleMode,
    cycleMotionProfile,
    density,
    jumpTo,
    menuOpen,
    mode,
    motionProfile,
    presentationMode,
    profile,
    setCommandOpen,
    setMenuOpen,
    togglePresentationMode,
    theme,
}) {
    const navItems = useMemo(() => getNavItems(mode), [mode]);

    return (
        <header className="shell-header">
            <a
                className="brand"
                href="#home"
                data-magnetic
                onClick={(event) => {
                    event.preventDefault();
                    jumpTo("#home");
                }}
            >
                <span className="brand-mark">VD</span>
                <span>
                    <strong>{profile.name}</strong>
                    <small>signal profile os</small>
                </span>
            </a>
            <div className="shell-controls" aria-label="Tùy chỉnh Lab shell">
                <button
                    type="button"
                    className="shell-chip"
                    data-magnetic
                    onClick={cycleMode}
                >
                    <span>Mode</span>
                    <strong>{formatLabel(mode)}</strong>
                </button>
                <button
                    type="button"
                    className="shell-chip"
                    data-magnetic
                    onClick={cycleDensity}
                >
                    <span>Density</span>
                    <strong>{formatLabel(density)}</strong>
                </button>
                <button
                    type="button"
                    className="shell-chip"
                    data-magnetic
                    onClick={cycleMotionProfile}
                >
                    <span>Motion</span>
                    <strong>{formatLabel(motionProfile)}</strong>
                </button>
                <button
                    type="button"
                    className="shell-chip"
                    data-magnetic
                    onClick={togglePresentationMode}
                >
                    <span>Reel</span>
                    <strong>{presentationMode ? "On" : "Off"}</strong>
                </button>
                <span className="shell-theme">{theme}</span>
            </div>
            <nav className="nav" aria-label="Main navigation">
                {navItems.map(({ id, modeTone, navLabel, shellHint }) => (
                    <a
                        className={active === id ? "active" : ""}
                        href={`#${id}`}
                        key={id}
                        data-mode-tone={modeTone}
                        data-magnetic
                        aria-label={`Jump to ${formatLabel(navLabel ?? id)}: ${shellHint ?? id}`}
                        title={shellHint ?? formatLabel(navLabel ?? id)}
                        onClick={(event) => {
                            event.preventDefault();
                            jumpTo(`#${id}`);
                        }}
                    >
                        {formatLabel(navLabel ?? id)}
                    </a>
                ))}
            </nav>
            <div className="header-actions">
                <button
                    className="icon-button"
                    type="button"
                    ref={commandButtonRef}
                    data-magnetic
                    onClick={() => setCommandOpen(true)}
                    aria-label="Mở command panel"
                    aria-keyshortcuts="Control+K Meta+K"
                    aria-haspopup="dialog"
                    aria-expanded={commandOpen}
                >
                    <Terminal aria-hidden="true" />
                </button>
                <button
                    className="icon-button menu-toggle"
                    type="button"
                    data-magnetic
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
                    aria-expanded={menuOpen}
                >
                    <Menu aria-hidden="true" />
                </button>
            </div>
        </header>
    );
}
