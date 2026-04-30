import { getSectionModeCopy } from "../../content/sectionModeCopy";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CaseStudyRail } from "../../features/case-theater/CaseStudyRail";
import { ProjectFingerprint } from "../../features/case-theater/ProjectFingerprint";
import { useCaseTheaterMotion } from "../../hooks/useCaseTheaterMotion";
import { Chapter } from "./Chapter";

const caseRows = [
    ["Context", "systemRole"],
    ["Bài toán", "problem"],
    ["Vai trò", "role"],
    ["UI focus", "uiFocus"],
    ["Kết quả", "outcome"],
];

function renderValue(project, key) {
    const value = project[key];
    if (Array.isArray(value)) return value.join(" / ");
    return value;
}

export function ProjectsSection({
    canAnimate,
    mode,
    profile,
    scrambleEnabled,
    sectionMeta,
}) {
    const [activeProject, setActiveProject] = useState(0);
    const projectCount = profile.projects.length;
    const project = profile.projects[activeProject];
    const copy = getSectionModeCopy("projects", mode);

    useCaseTheaterMotion(activeProject, canAnimate);

    const moveProject = (direction) => {
        const nextIndex = Math.min(
            projectCount - 1,
            Math.max(0, activeProject + direction),
        );
        setActiveProject(nextIndex);
    };

    return (
        <Chapter
            id="projects"
            chapter={sectionMeta?.displayChapter ?? "03"}
            label={copy.label ?? "selected cases"}
            summary={copy.summary}
            title={
                copy.title ??
                "Dự án được trình bày như các case study có bối cảnh, vai trò và kết quả."
            }
            scene="projects"
            modeOrder={sectionMeta?.modeOrder}
            modeTone={sectionMeta?.modeTone}
            presentation={sectionMeta?.modePresentation}
            scrambleEnabled={scrambleEnabled}
        >
            <div className="project-nav" aria-label="Project navigation">
                <span>
                    {String(activeProject + 1).padStart(2, "0")} /{" "}
                    {String(projectCount).padStart(2, "0")}
                </span>
                <div className="project-progress" aria-hidden="true">
                    <i
                        style={{
                            width: `${((activeProject + 1) / projectCount) * 100}%`,
                        }}
                    />
                </div>
                <div className="project-arrows">
                    <button
                        type="button"
                        onClick={() => moveProject(-1)}
                        disabled={activeProject === 0}
                        aria-label="Previous project"
                    >
                        <ArrowLeft aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        onClick={() => moveProject(1)}
                        disabled={activeProject === projectCount - 1}
                        aria-label="Next project"
                    >
                        <ArrowRight aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div className="case-theater-shell">
                <CaseStudyRail
                    activeProject={activeProject}
                    onSelectProject={setActiveProject}
                    projects={profile.projects}
                />

                <div className="case-theater-stage">
                    <article
                        className="project-theater-card reveal"
                        key={project.slug}
                        data-cursor="inspect"
                    >
                        <div className="project-theater-media parallax-image">
                            <img
                                src={project.image}
                                alt={`${project.title} interface preview`}
                                loading="eager"
                                decoding="async"
                            />
                            <div className="project-theater-badges">
                                <span>{project.status}</span>
                                <span>{project.category}</span>
                                <span>{project.importance}</span>
                            </div>
                        </div>

                        <div className="project-theater-body">
                            <div className="project-meta theater-meta">
                                <span className="project-type">
                                    {project.type}
                                </span>
                                <span>{project.year}</span>
                            </div>

                            <div className="project-theater-headline">
                                <h3>{project.title}</h3>
                                <p>{project.summary}</p>
                            </div>

                            <ProjectFingerprint project={project} />

                            <div
                                className="case-study-grid case-study-grid-expanded"
                                aria-label={`${project.title} case study details`}
                            >
                                {caseRows.map(([label, key]) => (
                                    <div className="case-study-row" key={key}>
                                        <span>{label}</span>
                                        <p>{renderValue(project, key)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="project-evidence-grid">
                                <div>
                                    <span>constraints</span>
                                    <div className="tech-list">
                                        {project.constraints.map((item) => (
                                            <span key={item}>{item}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span>signals</span>
                                    <div className="tech-list">
                                        {project.signals.map((item) => (
                                            <span key={item}>{item}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span>tech strip</span>
                                    <div className="tech-list">
                                        {project.tech.map((tech) => (
                                            <span key={tech}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </Chapter>
    );
}
