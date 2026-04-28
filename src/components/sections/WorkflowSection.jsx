import { getSectionModeCopy } from "../../content/sectionModeCopy";
import { WorkflowPipeline } from "../../features/workflow-pipeline/WorkflowPipeline";
import { Chapter } from "./Chapter";

export function WorkflowSection({
    mode,
    profile,
    scrambleEnabled,
    sectionMeta,
}) {
    const copy = getSectionModeCopy("workflow", mode);

    return (
        <Chapter
            id="workflow"
            chapter={sectionMeta?.displayChapter ?? "04"}
            label={copy.label ?? "workflow engine"}
            summary={copy.summary}
            title={
                copy.title ?? "Đi từ vấn đề tới bản chạy được, có kiểm chứng."
            }
            scene="workflow"
            modeOrder={sectionMeta?.modeOrder}
            modeTone={sectionMeta?.modeTone}
            presentation={sectionMeta?.modePresentation}
            scrambleEnabled={scrambleEnabled}
        >
            <WorkflowPipeline workflow={profile.workflow} />
        </Chapter>
    );
}
