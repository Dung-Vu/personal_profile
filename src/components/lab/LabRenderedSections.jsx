import { LabArchiveSection } from "./LabArchiveSection";
import { LabHomeSection } from "./LabHomeSection";

const sectionComponents = {
    home: LabHomeSection,
    archive: LabArchiveSection,
};

export function LabRenderedSections({ appContext, sectionRecords }) {
    return sectionRecords.map((record) => {
        const Section = sectionComponents[record.id];
        if (!Section) return null;
        return <Section key={record.id} sectionMeta={record} {...appContext} />;
    });
}
