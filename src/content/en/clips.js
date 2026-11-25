// Case detail proof clips: simulate each system's real workflow.
// All values are simulated — names, codes, and amounts are replaced or redacted with "•••". Never real client figures.
export const clipNote = "Real workflow simulation · sample/redacted data";
export const replayLabel = "Replay";
// Label on the UI preview window inside case cards.
export const proofNote = "sample data";
export const baLabels = { title: "Before and after", before: "Before", after: "After" };

export const clips = {
    evone: {
        kind: "vehicle",
        title: "Lifecycle of a single vehicle",
        app: "evone · vehicle ledger",
        vin: "RLH•••••••••4821",
        model: "Electric scooter · model •••",
        steps: [
            { t: "Stock intake", d: "Logged by VIN and engine number", tone: "ocean" },
            { t: "Sale · installment plan", d: "Quote, contract, due schedule", tone: "iris" },
            { t: "Term 1 paid via VietQR", d: "Exact-amount QR, auto-reconciled", tone: "ocean" },
            { t: "Showroom offline", d: "Keep selling · 3 actions queued", tone: "apricot" },
            { t: "Back online", d: "Auto-synced with zero data loss", tone: "ocean" },
        ],
        planLabel: "Installment schedule",
        planTotal: 12,
        planPaid: 1,
        qrLabel: "Term 2 VietQR",
        qrNote: "Amount redacted",
    },
    "odoo-bonario": {
        kind: "helpdesk",
        title: "One ops request through Helpdesk",
        app: "odoo · helpdesk",
        cols: ["New", "In Progress", "Done"],
        ticket: { id: "HD-••42", t: "Import serials for incoming batch" },
        log: [
            "New ticket auto-routes to warehouse team",
            "RFID scan · serials pushed into Odoo",
            "Labels printed directly from stock receipt",
            "Ticket closed · owner and audit trail logged",
        ],
    },
    "ace-ra-tem": {
        kind: "labels",
        title: "From customer dimensions to print sheet",
        app: "ace · label sheet",
        formLabel: "Customer input",
        form: [
            ["Width", "3000"],
            ["Height", "2800"],
            ["Style", "2-panel drape"],
            ["Fabric", "Code •••"],
        ],
        calcLabel: "Workshop specs · auto-calculated",
        calc: ["Panel split", "Overlap", "Fabric cut", "Rings · rod"],
        sheetLabel: "A4 landscape · 18 labels · 6 × 3",
        filled: 14,
        tem: ["Client •••", "Living room", "Set 1 · 2P", "Plain fabric", "Cut 320"],
    },
    "reminder-hub": {
        kind: "chat",
        title: "One assignment inside a group chat",
        app: "zalo · project group •••",
        msgs: [
            { who: "Manager", text: "@Minh please send the client quote before 5pm Friday" },
            { who: "Minh", text: "Got it, on it", me: true },
        ],
        extractLabel: "AI extracted",
        extract: [
            ["Owner", "@Minh"],
            ["Task", "Send client quote"],
            ["Due", "Fri · 17:00"],
        ],
        remind: "Reminder @Minh: 2 hours left to send client quote",
        done: "Minh marked done · task closed",
    },
    tca: {
        kind: "signal",
        title: "One alert, from raw feed to real outcome",
        app: "tca · alert",
        pipe: ["Ingest", "Features", "Score", "Alert", "Reconcile"],
        pair: "Source •••",
        side: "Alert",
        scoreLabel: "Confidence",
        plan: [
            ["Streams", "5 live feeds"],
            ["Delivery", "Telegram · web"],
            ["Reconcile", "automated"],
        ],
        result: "Actual alert outcome is recorded to grade the next version",
    },
    "ai-operator": {
        kind: "agents",
        title: "One task moving through the AI crew",
        app: "hub · work log",
        lines: [
            ["Human", "Assign task: fix signup form, with acceptance criteria", "human"],
            ["Claude Code", "Read shared memory, draft plan, edit code", "agent"],
            ["Tests", "Run automated test suite · pass", "ok"],
            ["Codex", "Cross-review diff · 1 note", "warn"],
            ["Claude Code", "Apply fix and re-run automated tests", "agent"],
            ["Browser", "Verify live UI across viewports · pass", "ok"],
            ["Memory", "Append decision log for next session", "agent"],
            ["Human", "Review and approve handover", "human"],
        ],
    },
};
