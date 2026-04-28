import { AnimatedSignalIcon } from "../../components/ui/AnimatedSignalIcon";

function formatStatus(value) {
    return value[0].toUpperCase() + value.slice(1);
}

export function WorkflowPipeline({ workflow }) {
    return (
        <>
            <div
                className="workflow-pipeline reveal"
                aria-label="Workflow pipeline"
            >
                {workflow.map((step, index) => (
                    <div className="workflow-step-wrap" key={step.id}>
                        <article
                            className="workflow-node workflow-pipeline-node"
                            data-cursor="inspect"
                        >
                            <div className="workflow-node-head">
                                <AnimatedSignalIcon
                                    name={step.icon}
                                    label={step.title}
                                    compact
                                />
                                <span>{step.step}</span>
                            </div>
                            <div className="workflow-node-body">
                                <p className="workflow-status-pill">
                                    {formatStatus(step.status)}
                                </p>
                                <h3>{step.title}</h3>
                                <p>{step.detail}</p>
                            </div>
                            <div className="workflow-node-output">
                                <span>output</span>
                                <strong>{step.output}</strong>
                            </div>
                        </article>
                        {index < workflow.length - 1 && (
                            <span
                                className="workflow-link"
                                aria-hidden="true"
                            />
                        )}
                    </div>
                ))}
            </div>

            <div
                className="workflow-output-grid reveal"
                aria-label="Workflow outputs"
            >
                {workflow.map((step) => (
                    <article
                        className="workflow-output-item"
                        key={`${step.id}-output`}
                    >
                        <span>{step.step}</span>
                        <strong>{step.output}</strong>
                        <p>{step.title}</p>
                    </article>
                ))}
            </div>
        </>
    );
}
