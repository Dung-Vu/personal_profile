export function ProjectFingerprint({ project }) {
    const entries = [
        ["Status", project.status],
        ["Timeline", project.timeline],
        ["Proof note", project.privateReason],
    ].filter(([, value]) => Boolean(value));

    if (!entries.length) return null;

    return (
        <div className="project-fingerprint" aria-label={`${project.title} proof status`}>
            {entries.map(([label, value]) => (
                <article key={label}>
                    <div>
                        <span>{label}</span>
                        <strong>{value}</strong>
                    </div>
                </article>
            ))}
        </div>
    );
}
