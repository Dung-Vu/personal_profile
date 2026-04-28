import { AnimatedSignalIcon } from "../../components/ui/AnimatedSignalIcon";

const legend = [
    ["UI", "Interface structure"],
    ["Data", "Reading and shaping information"],
    ["Systems", "API and operational logic"],
    ["Delivery", "Automation and verification loops"],
];

function toDisplayLabel(value) {
    return value[0].toUpperCase() + value.slice(1);
}

export function CapabilityMatrix({ capabilities }) {
    return (
        <div className="capability-shell reveal">
            <aside className="capability-legend-panel">
                <p>Capability matrix</p>
                <h3>UI, data, systems và delivery phải nối được với nhau.</h3>
                <div className="capability-legend-grid">
                    {legend.map(([title, detail]) => (
                        <article key={title}>
                            <strong>{title}</strong>
                            <span>{detail}</span>
                        </article>
                    ))}
                </div>
            </aside>

            <div
                className="capability-matrix"
                aria-label="Capability matrix nodes"
            >
                {capabilities.map((item) => (
                    <article
                        className="capability-node"
                        key={item.id}
                        data-cursor="inspect"
                    >
                        <div className="capability-node-head">
                            <AnimatedSignalIcon
                                name={item.icon}
                                label={item.label}
                                compact
                            />
                            <div>
                                <span>{item.label}</span>
                                <strong>{item.title}</strong>
                            </div>
                        </div>

                        <p>{item.detail}</p>

                        <div className="capability-node-meta">
                            <span>{toDisplayLabel(item.cluster)}</span>
                            <span>{toDisplayLabel(item.depth)}</span>
                            <span>{item.relatedProjects.length} projects</span>
                            <span>
                                {item.relatedWorkflowSteps.length} steps
                            </span>
                        </div>

                        <div
                            className="capability-node-strip"
                            aria-hidden="true"
                        >
                            <i className="cluster" />
                            <i className="depth" />
                            <i className="status" />
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
