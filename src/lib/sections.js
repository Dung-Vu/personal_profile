import { sceneConfig } from "../content/sceneConfig";

function resolveModeValue(record, mode, key, fallback) {
    const value = record[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
        return value[mode] ?? fallback;
    }

    return value ?? fallback;
}

export function getSectionRecords(mode = "story") {
    const records = sceneConfig
        .filter((record) => record.modeVisibility?.includes(mode) ?? true)
        .map((record) => ({
            ...record,
            modeOrder: resolveModeValue(
                record,
                mode,
                "modeOrder",
                Number.MAX_SAFE_INTEGER,
            ),
            modePresentation: resolveModeValue(
                record,
                mode,
                "modePresentation",
                "full",
            ),
            modeTone: resolveModeValue(record, mode, "modeTone", "secondary"),
            navLabel: resolveModeValue(record, mode, "navLabel", record.label),
            railLabel: resolveModeValue(
                record,
                mode,
                "railLabel",
                record.railLabel ?? record.label,
            ),
            shellHint: resolveModeValue(
                record,
                mode,
                "shellHint",
                record.label,
            ),
        }))
        .sort(
            (left, right) =>
                left.modeOrder - right.modeOrder ||
                left.chapter.localeCompare(right.chapter),
        );

    return records.map((record, index) => ({
        ...record,
        displayChapter: index === 0 ? "00" : String(index).padStart(2, "0"),
    }));
}

export const sectionRecords = getSectionRecords();

export function getSections(mode = "story") {
    return getSectionRecords(mode).map(({ id, displayChapter, scene }) => [
        id,
        displayChapter,
        scene,
    ]);
}

export const sections = getSections();

export function getNavItems(mode = "story") {
    return getSectionRecords(mode).filter(({ id }) => id !== "home");
}

export const navItems = getNavItems();
