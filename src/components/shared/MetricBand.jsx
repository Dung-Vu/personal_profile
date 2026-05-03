import { StatCard } from "../ui/StatCard";

export function MetricBand({ items }) {
    return (
        <div
            className="metric-band reveal"
            aria-label="Capability summary"
        >
            {items.map((item) => (
                <StatCard
                    key={item.label}
                    value={item.value}
                    label={item.label}
                    trend={item.trend}
                    footnote={item.footnote}
                />
            ))}
        </div>
    );
}
