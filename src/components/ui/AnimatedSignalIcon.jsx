import { fallbackIcon, iconMap } from "../../lib/icons";

export function AnimatedSignalIcon({ name, label, compact = false }) {
  const Icon = iconMap[name] ?? fallbackIcon;

  return (
    <span className={`animated-signal-icon ${compact ? "compact" : ""}`} aria-label={label} role="img">
      <span className="icon-orbit" aria-hidden="true" />
      <span className="icon-pulse" aria-hidden="true" />
      <Icon aria-hidden="true" />
    </span>
  );
}
