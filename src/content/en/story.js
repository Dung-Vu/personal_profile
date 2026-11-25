// 4-chapter home story (shared between static view and scroll-driven film).
export const storyIntro = {
    label: "Story · 4 chapters",
};

export const jumpLabel = "Jump to chapter";

export const storyLabels = {
    live: "live",
    logAria: "AI agent work log (simulated)",
    logTitle: "today's log",
    logStatus: "● live",
    agentsAria: "AI assistants",
    hubLabel: "Orchestrator",
    hubTitle: "Shared memory",
    systemsAria: "Live production systems",
    humanGate: "Final approval: human",
};

export const chapters = [
    {
        id: "hon-loan",
        no: "01",
        name: "Chaos",
        title: "Operations scattered across chat, Excel, and memory.",
        lead: "Orders chased twice, three “final” files, manual entry errors — and nobody sees the whole picture.",
    },
    {
        id: "doc-he-thong",
        no: "02",
        name: "Read the Flow",
        title: "Before writing code, I map real work.",
        lead: "Who does what, where data lives, what breaks. Every system follows the same 4 steps.",
    },
    {
        id: "dung-lai",
        no: "03",
        name: "Rebuild",
        title: "Into systems teams run every day.",
        lead: "Odoo for operations, vertical ERP, web apps replacing Excel, chat bots — each built for one real bottleneck.",
    },
    {
        id: "ai-van-hanh",
        no: "04",
        name: "AI Operations",
        title: "Then let AI carry the repetition.",
        lead: "AI agents build, test, cross-review, and verify in the browser before reporting back. Humans keep final say.",
    },
];

// Chapter 1 fragments. Layout tuple: [key, x%, y%, width px, rotation deg, depth 0 far -> 1 near].
export const fragments = {
    c1: { kind: "chat", who: "L", color: "#2b7de9", meta: "Zalo", badge: "23", text: "Hey, did yesterday's order ship yet?" },
    c2: { kind: "chat", who: "K", color: "#25a35a", meta: "WhatsApp · Stock", text: "How many units left in stock?" },
    c3: { kind: "chat", who: "T", color: "#8a5cd1", meta: "Zalo · Ops Group", text: "Who has the latest weekly report?" },
    c4: { kind: "chat", who: "H", color: "#c47a38", meta: "Helpdesk · unassigned", text: "Who is picking up this ticket?" },
    c5: { kind: "chat", who: "M", color: "#0f766e", meta: "Zalo · Finance", text: "Which order matches today's deposit?" },
    s1: {
        kind: "sheet",
        file: "Cut_Labels_v1.2_FINAL.xlsm",
        meta: "final (3)",
        rows: [["4", "Width", "1,240", "×1.05", "!#REF!"], ["5", "Height", "2,600", "+15", "!#VALUE!"], ["6", "Model", "—", "?", "=VLOOK…"]],
    },
    s2: {
        kind: "sheet",
        file: "Receivables_Sep.xlsx",
        meta: "14 errors",
        rows: [["12", "Term 3", "paid?", "—", "!#N/A"], ["13", "Term 4", "…", "late", "check"]],
    },
    n1: { kind: "note", text: "Send quote before 5pm!!", meta: "sticky note · yesterday" },
    n2: { kind: "note", text: "Serial typed by hand — recheck!", meta: "sticky note" },
    p1: { kind: "paper", title: "Warehouse Slip", lines: [["SKU: ", "RF-0212", " RF-0221"], ["Qty: 40 → 38?"], ["Signed: ……"]] },
};

export const fragmentLayout = {
    desktop: [
        ["c1", 6, 15, 330, -4, 1], ["s1", 33, 11, 380, 3, 0.9], ["n1", 63, 14, 230, 6, 0.8], ["c2", 72, 40, 330, 2, 0.95],
        ["s2", 50, 46, 340, -3, 0.55], ["n2", 47, 71, 210, -6, 0.4], ["c3", 63, 72, 320, 3, 0.7], ["c4", 82, 62, 290, -2, 0.35],
        ["p1", 86, 22, 200, -5, 0.3], ["c5", 4, 36, 300, 2, 0.3],
    ],
    mobile: [
        ["c1", 6, 13, 270, -3, 1], ["s1", 34, 24, 300, 4, 0.8], ["n1", 4, 36, 170, -6, 0.9], ["c3", 22, 47, 280, 2, 0.55],
        ["n2", 66, 41, 140, 7, 0.5], ["c2", -12, 58, 240, -2, 0.35], ["p1", 62, 56, 170, -4, 0.35],
    ],
};

export const chaosCount = { value: "23", label: "unread chats · 3 “final” files" };

export const readNotes = {
    label: "Post-walkthrough notes",
    rows: [["People involved", "5 roles"], ["Error hotspot", "manual entry ×3"], ["Data sources", "Zalo · Excel · Odoo"]],
};

export const buildLegend = [
    { tone: "ocean", label: "Operations & automation" },
    { tone: "iris", label: "Vertical industry ERP" },
    { tone: "apricot", label: "Excel replacement · data" },
];

export const aiSystems = [
    ["Odoo", "ops"], ["EVOne", "ERP"], ["ACE", "labels"], ["Reminder", "bot"], ["Recruiting", "internal"], ["TCA", "data"],
];

export const steps = [
    { no: "01", title: "Map the workflow", desc: "Sit with operators and trace real steps", hint: "who · what · where", tone: "ocean" },
    { no: "02", title: "Design the flow", desc: "Sketch screens around real habits", hint: "fewer clicks · clear", tone: "iris" },
    { no: "03", title: "Build & test", desc: "Real data, automated tests, ready to run", hint: "tests · logs · rollback", tone: "apricot" },
    { no: "04", title: "Verify in numbers", desc: "Measure before and after handover", hint: "before → after", tone: "ink" },
];

export const agents = [
    { code: "CC", name: "Claude Code", role: "plan · review", tone: "apricot" },
    { code: "CX", name: "Codex", role: "code · tests", tone: "mint" },
    { code: "GM", name: "Gemini", role: "UI · browser QA", tone: "iris" },
    { code: "PI", name: "Pi", role: "utility tasks", tone: "mono" },
];

export const hubSteps = ["delegate", "cross-check", "handover"];

export const agentLog = [
    { t: "09:12", who: "codex", what: "build + unit tests", res: "✓ pass", ok: true },
    { t: "09:15", who: "claude", what: "review diff", res: "2 notes" },
    { t: "09:21", who: "gemini", what: "browser QA pass", res: "✓ 0 err", ok: true },
    { t: "09:23", who: "hub", what: "log memory · await sign-off", res: "✓", ok: true },
];
