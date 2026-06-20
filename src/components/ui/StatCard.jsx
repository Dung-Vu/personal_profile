import { SurfaceCard } from "./SurfaceCard";

/**
 * StatCard — Card hiển thị số liệu + label.
 * Props:
 *   value: string | number (số chính)
 *   label: string (nhãn bên dưới)
 *   trend?: { direction: "up" | "down" | "neutral", text: string }
 *   footnote?: string
 *   variant: SurfaceCard variant
 *   className: thêm class
 */
export function StatCard({
    value,
    label,
    trend,
    footnote,
    variant = "default",
    className = "",
}) {
    const trendClass = trend ? ` trend-${trend.direction}` : "";

    return (
        <SurfaceCard variant={variant} className={`stat-card ${className}`.trim()}>
            <span className="stat-card-value">
                {value}
                {trend && (
                    <span className={`trend${trendClass}`}>
                        {trend.direction === "up" && "↑"}
                        {trend.direction === "down" && "↓"}
                        {trend.direction === "neutral" && "→"}{" "}
                        {trend.text}
                    </span>
                )}
            </span>
            <span className="stat-card-label">{label}</span>
            {footnote && <span className="stat-card-footnote">{footnote}</span>}
        </SurfaceCard>
    );
}

/**
 * StatCardRow — Grid chứa nhiều StatCard.
 * Props:
 *   children: các StatCard
 *   className: thêm class
 */
