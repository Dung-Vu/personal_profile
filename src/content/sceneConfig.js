export const sceneConfig = [
    {
        id: "home",
        chapter: "00",
        scene: "boot",
        label: "lab",
        railLabel: {
            story: "entry",
            systems: "shell",
        },
        shellHint: {
            story: "legacy Signal OS entry",
            systems: "shell controls overview",
        },
        modeVisibility: ["story", "systems"],
        modeOrder: { story: 0, systems: 0 },
        modePresentation: {
            story: "full",
            systems: "full",
        },
        modeTone: {
            story: "secondary",
            systems: "primary",
        },
    },
    {
        id: "archive",
        chapter: "01",
        scene: "workflow",
        label: "archive",
        navLabel: {
            story: "archive",
            systems: "route map",
        },
        railLabel: {
            story: "archive",
            systems: "routes",
        },
        shellHint: {
            story: "content moved to the main sitemap",
            systems: "map of current portfolio routes",
        },
        modeVisibility: ["story", "systems"],
        modeOrder: { story: 1, systems: 1 },
        modePresentation: {
            story: "full",
            systems: "full",
        },
        modeTone: {
            story: "support",
            systems: "secondary",
        },
    },
];

