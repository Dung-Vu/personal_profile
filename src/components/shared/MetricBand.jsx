export function MetricBand({ items }) {
    return (
        <div
            className="hero-metric-band reveal"
            aria-label="Capability summary"
        >
            {items.map((item) => (
                <article key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                </article>
            ))}
        </div>
    );
}
