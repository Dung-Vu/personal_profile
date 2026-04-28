function formatCaseNumber(index) {
    return String(index + 1).padStart(2, "0");
}

export function CaseStudyRail({ activeProject, onSelectProject, projects }) {
    return (
        <aside
            className="case-theater-rail reveal"
            aria-label="Case study selector"
        >
            <div className="case-theater-intro">
                <span>case theater</span>
                <h3>
                    Chọn case để xem bối cảnh, system role và quyết định UI nổi
                    bật.
                </h3>
            </div>

            <div className="case-theater-list">
                {projects.map((project, index) => (
                    <button
                        type="button"
                        key={project.slug}
                        className={index === activeProject ? "active" : ""}
                        onClick={() => onSelectProject(index)}
                    >
                        <span>{formatCaseNumber(index)}</span>
                        <div>
                            <strong>{project.title}</strong>
                            <small>{project.type}</small>
                        </div>
                        <i>{project.status}</i>
                    </button>
                ))}
            </div>
        </aside>
    );
}
