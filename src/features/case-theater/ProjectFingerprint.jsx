function formatMetricLabel(value) {
    return value.replace(/([A-Z])/g, " $1").trim();
}

export function ProjectFingerprint({ metrics = {}, title }) {
    const entries = Object.entries(metrics);

    if (!entries.length) return null;

    return (
        <div
            className="project-fingerprint"
            aria-label={`${title} project metrics`}
        >
            {entries.map(([key, value]) => (
                <article key={key}>
                    <div>
                        <span>{formatMetricLabel(key)}</span>
                        <strong>{value}</strong>
                    </div>
                    <i style={{ width: `${value}%` }} aria-hidden="true" />
                </article>
            ))}
        </div>
    );
}
