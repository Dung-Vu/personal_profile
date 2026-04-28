import { getSectionModeCopy } from "../../content/sectionModeCopy";
import { CapabilityMatrix } from "../../features/capability-matrix/CapabilityMatrix";
import { Chapter } from "./Chapter";

export function StackSection({ mode, profile, scrambleEnabled, sectionMeta }) {
    const copy = getSectionModeCopy("stack", mode);

    return (
        <Chapter
            id="stack"
            chapter={sectionMeta?.displayChapter ?? "02"}
            label={copy.label ?? "stack matrix"}
            summary={copy.summary}
            title={
                copy.title ?? "Kỹ thuật dùng để tạo ra sản phẩm chạy được thật."
            }
            scene="stack"
            modeOrder={sectionMeta?.modeOrder}
            modeTone={sectionMeta?.modeTone}
            presentation={sectionMeta?.modePresentation}
            scrambleEnabled={scrambleEnabled}
        >
            <CapabilityMatrix capabilities={profile.stack} />
        </Chapter>
    );
}
