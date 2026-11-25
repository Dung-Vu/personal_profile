// 6 flagship case studies + "And more". Aggregated, rounded numbers; client data redacted.
// tone: category color (ocean | iris | apricot | mint). proof (EVOne): simulated UI preview (rows/kpiValues are sample data).
export const categories = [
    { id: "all", label: "All" },
    { id: "odoo", label: "Odoo" },
    { id: "erp", label: "Vertical ERP" },
    { id: "excel", label: "Excel Replacement" },
    { id: "bot", label: "Bot" },
    { id: "ai", label: "AI & Data" },
];

export const projects = [
    {
        slug: "evone",
        name: "EVOne",
        year: "2026",
        cardTitle: "EVOne — Vertical ERP for EV Showroom Chains",
        category: "erp",
        tag: "Vertical ERP",
        tone: "iris",
        before: "Paper logs + Excel sheets for sales, stock, and installments",
        after: "one system: VIN-indexed inventory, installment ledgers, dynamic VietQR, and offline sales.",
        cardMetrics: [
            { value: "1,700+", label: "vehicles actively tracked" },
            { value: "Daily", label: "encrypted backups with offsite copy" },
            { value: "Offline", label: "sell without Wi-Fi, auto-syncs online" },
        ],
        line: "ERP for EV showroom chains",
        modules: ["Sales", "Vehicles", "Installments", "VietQR", "Offline"],
        metric: { value: "1,700+", label: "vehicles tracked" },
        subtitle: "Purpose-built ERP for electric vehicle showrooms — replacing paper logs and Excel.",
        facts: [
            { k: "Role", v: "Analysis, design, end-to-end build" },
            { k: "Timeline", v: "First 3 months, actively evolving" },
            { k: "Delivery", v: "1 builder + AI agent crew" },
            { k: "Platform", v: "Offline-first web application" },
        ],
        metrics: [
            { value: "1,700+", label: "vehicles actively tracked" },
            { value: "Daily", label: "encrypted backups with offsite copy" },
            { value: "8,000+", label: "automated tests before every release" },
        ],
        problem:
            "A multi-branch EV showroom chain ran sales, vehicle stock, and installment receivables across paper logs and disconnected Excel sheets. Every vehicle passed through multiple roles and handoffs, yet nobody could see its full lifecycle.",
        approach:
            "Walked the exact flow from showroom floor to warehouse, then built each module in the order teams actually work. Every release is guarded by automated tests before deployment.",
        modulesDetail: [
            { title: "VIN-indexed stock", desc: "One record per vehicle from intake to handover" },
            { title: "Installment ledger", desc: "Due schedules, reminders, and reconciliation" },
            { title: "Dynamic VietQR", desc: "Exact-amount payment QR per installment" },
            { title: "Showroom sales", desc: "Quotes, contracts, and delivery sign-off" },
            { title: "Offline mode", desc: "Keep selling offline; auto-syncs when reconnected" },
            { title: "Role permissions", desc: "Each role sees only its own operational scope" },
        ],
        result:
            "One production system replacing paper books and scattered spreadsheets every day. Each vehicle has an unbroken record from warehouse intake to handover, installment schedules are clear, backups run encrypted daily with an offsite copy, and every release keeps a rollback point.",
        tech: {
            summary:
                "Offline-first web ERP built around a VIN-indexed vehicle ledger, local mutation sync queue for network outages, and dynamic VietQR installment payloads.",
            stack: [
                "Offline-First Web App",
                "Local Sync Queue",
                "VIN-Indexed Ledger",
                "Dynamic VietQR",
                "Role-Based Access (RBAC)",
                "Encrypted Offsite Backups",
            ],
            architecture: [
                "Every vehicle carries a single VIN-indexed record from warehouse intake and inter-branch transfer through contract signing and handover.",
                "Showroom counters queue writes locally during connectivity drops and reconcile sequentially once back online, preventing lost or duplicate orders.",
                "Installment schedules generate exact-amount dynamic VietQR payloads per period for clean payment reconciliation.",
            ],
            testing: [
                "8,000+ automated tests gate every release across inventory states, installment math, access rules, and offline sync flows.",
                "Automated regression suites cover edge cases including cross-showroom transfers, cancellations, and partial repayments.",
            ],
            safety: [
                "Daily encrypted database backups replicated to a separate offsite location.",
                "Strict role-scoped permissions (sales, inventory, accounting, management) with rollback checkpoints on every deployment.",
            ],
        },
        proof: {
            app: "evone · inventory",
            side: ["Overview", "Sales", "Inventory", "Installments", "Payments", "Reports"],
            active: 2,
            kpis: ["In stock", "Delivering", "Pending reg.", "Warranty"],
            cols: ["VIN", "Model", "Showroom", "Status", "Updated"],
            statuses: [["In stock", "ocean"], ["Delivering", "apricot"], ["Sold", "iris"], ["In stock", "ocean"], ["In stock", "ocean"]],
            // Simulated preview data, not real client numbers.
            kpiValues: ["312", "18", "24", "9"],
            rows: [
                ["RLH•••4821", "Model A · Blue", "Showroom 1", "2m ago"],
                ["RLH•••3307", "Model B · White", "Showroom 2", "15m ago"],
                ["RLH•••1190", "Model A · Black", "Showroom 1", "1h ago"],
                ["RLH•••5562", "Model C · Red", "Showroom 3", "3h ago"],
                ["RLH•••0418", "Model B · Gray", "Showroom 2", "Yesterday"],
            ],
        },
    },
    {
        slug: "odoo-bonario",
        name: "Odoo Bonario",
        year: "2025–2026",
        cardTitle: "Business Operations on Odoo",
        category: "odoo",
        tag: "Odoo",
        tone: "ocean",
        before: "Requests lost in chat, manual stock audits and reporting",
        after: "tracked helpdesk with SLAs plus automation around Odoo: RFID serials, label printing, and stock-check bots.",
        cardMetrics: [
            { value: "200+", label: "ops tickets delivered since 09/2025" },
            { value: "~9/10", label: "completed within committed SLA" },
        ],
        line: "Less manual work across sales & stock",
        modules: ["Helpdesk", "Stock", "RFID Serial", "Labels", "Reports"],
        metric: { value: "200+", label: "ops tickets delivered" },
        subtitle: "Sales, warehouse, and helpdesk operations on Odoo — stripping out repetitive manual steps.",
        facts: [
            { k: "Role", v: "Odoo operations & development" },
            { k: "Timeline", v: "Since 09/2025, running live" },
            { k: "Delivery", v: "Ticket-driven, fixing real bottlenecks" },
            { k: "Platform", v: "Odoo + 5 satellite tools" },
        ],
        metrics: [
            { value: "200+", label: "ops tickets delivered" },
            { value: "~9/10", label: "completed within committed SLA" },
            { value: "7", label: "departments, ~50 active users" },
        ],
        problem:
            "Sales, inventory, and helpdesk already lived on Odoo, yet operators still handled key steps manually: announcing orders, typing serials, printing slips, and reconciling counts. Reports drifted across personal spreadsheets.",
        approach:
            "Followed real helpdesk tickets to spot recurring friction, then automated the exact bottleneck instead of rewriting Odoo. Where native Odoo felt clunky, built focused satellite tools wired directly into it.",
        modulesDetail: [
            { title: "Order alerts", desc: "New orders notify the right owner and channel" },
            { title: "RFID serial sync", desc: "Push scanner serials directly into Odoo" },
            { title: "Label printing", desc: "Print labels straight from stock receipts" },
            { title: "Stock-check bot", desc: "Upload scan file, get instant stock reconciliation" },
            { title: "Standard reports", desc: "One canonical template replacing manual copies" },
            { title: "Internal helpdesk", desc: "Every ticket has an owner, SLA, and audit trail" },
        ],
        result:
            "Over 200 operational requests across 2 companies delivered through Helpdesk — roughly 9 out of 10 on time, and half closed in under a day. Repetitive sales and warehouse steps now run on automated flows or dedicated tools.",
        tech: {
            summary:
                "Native Odoo workflows preserved at the core, extended with 5 lightweight satellite tools for RFID serial sync, warehouse label printing, and automated stock audits.",
            stack: [
                "Odoo (Sales · Inventory · Helpdesk)",
                "5 Satellite Tools",
                "RFID Serial Sync",
                "Receipt Label Printing",
                "Stock Reconciliation Bot",
                "Helpdesk SLA Audit Trail",
            ],
            architecture: [
                "Core sales, warehouse, and helpdesk data stays native in Odoo; high-friction manual steps are offloaded to 5 focused satellite tools.",
                "RFID scanner exports sync serial numbers directly into Odoo stock receipts and trigger immediate label printing.",
                "Inventory audit bot ingests scan files, reconciles counts against Odoo stock balances, and outputs one standardized variance report.",
            ],
            testing: [
                "Workflow edits and satellite tools are validated on staging copies before rolling out across 7 departments (~50 users).",
                "Serial imports and report outputs are cross-checked against live warehouse samples with operators prior to sign-off.",
            ],
            safety: [
                "Every change flows through tracked Helpdesk tickets with owner, SLA deadline, and full audit history (200+ tickets since 09/2025).",
                "Pre-change backups and least-privilege access scoped to each department's workflow.",
            ],
        },
    },
    {
        slug: "ace-ra-tem",
        name: "ACE Labels",
        year: "2026",
        cardTitle: "ACE — Curtain Cutting & Label App",
        category: "excel",
        tag: "Excel Replacement",
        tone: "apricot",
        before: "Slow, fragile Excel macro sheets prone to formula errors",
        after: "customers enter dimensions, the workshop adds specs, and the app calculates and prints PDF labels.",
        cardMetrics: [
            { value: "3", label: "legacy Excel formula bugs caught and fixed" },
            { value: "47/47", label: "cases matching real production labels" },
        ],
        line: "Curtain math & PDF labels replacing macros",
        modules: ["Intake Form", "Formulas", "PDF Labels", "18/A4"],
        metric: { value: "47/47", label: "cases match live production" },
        subtitle: "Replacing fragile Excel macros with a web app for curtain cutting math and print-ready labels.",
        facts: [
            { k: "Role", v: "Analysis, design, end-to-end build" },
            { k: "Timeline", v: "2026, running live" },
            { k: "Delivery", v: "Verified formula-by-formula against real labels" },
            { k: "Platform", v: "Web application with PDF export" },
        ],
        metrics: [
            { value: "47/47", label: "cases match live production labels" },
            { value: "18", label: "labels per A4 sheet with cut guides" },
            { value: "3", label: "legacy spreadsheet bugs uncovered and fixed" },
        ],
        problem:
            "The workshop generated curtain cutting labels via Excel macros: sluggish, fragile formulas, and drifting copies on every workstation. Customer measurements arrived over chat and had to be retyped by hand.",
        approach:
            "Used real printed production labels as ground truth, rewrote every formula cleanly, and tested every edge case until outputs matched 100%. Customers enter dimensions themselves; staff only add workshop specs.",
        modulesDetail: [
            { title: "Customer intake", desc: "Clients enter dimensions directly, zero retyping" },
            { title: "Workshop specs", desc: "Staff add fabric codes and stitching styles" },
            { title: "Formula engine", desc: "Workshop cutting rules backed by automated tests" },
            { title: "PDF label sheet", desc: "18 cut-guided labels per landscape A4 page" },
        ],
        result:
            "Auditing the legacy macro uncovered 3 latent formula errors, including a fabric cut-size defect. The web app matches 47/47 production fixtures, lets clients submit measurements directly, and ends workstation macro drift.",
        tech: {
            summary:
                "Pure deterministic formula engine replacing legacy Excel macros, paired with a customer measurement form and an 18-label-per-A4 PDF generator.",
            stack: [
                "Web Application",
                "Pure Formula Engine",
                "47 Production Golden Fixtures",
                "PDF Generator (18 labels/A4)",
                "Customer Input Form",
            ],
            architecture: [
                "Two-stage intake: customers submit room measurements directly via web form, and workshop staff only add fabric codes and stitching specs.",
                "Calculation logic is isolated as pure functions computing panel splits, overlap, fabric cut sizes, and hardware counts deterministically.",
                "PDF renderer outputs print-ready landscape A4 sheets laid out at 18 cut-guided labels per page (6 × 3 grid).",
            ],
            testing: [
                "Every formula verified against 47/47 real production label fixtures with zero variance.",
                "Fixture auditing uncovered and fixed 3 latent formula bugs in the legacy macro spreadsheet, including a fabric cut-size error.",
            ],
            safety: [
                "Single canonical formula version hosted on the web — eliminating version drift across workshop computers.",
                "Any future rule change must pass the entire golden fixture suite before going live.",
            ],
        },
    },
    {
        slug: "reminder-hub",
        name: "Reminder Hub",
        year: "2026",
        cardTitle: "Reminder Hub",
        category: "bot",
        tag: "Bot",
        tone: "ocean",
        before: "Tasks assigned in group chats buried under new messages",
        after: "AI extracts task + deadline, nudges the owner, and escalates overdue work.",
        cardMetrics: [
            { value: "~40", label: "Zalo groups monitored" },
            { value: "Work hours", label: "Mon–Fri nudges only, zero after-hours noise" },
        ],
        line: "Task reminders inside Zalo groups",
        modules: ["Zalo", "AI Triage", "Nudges", "Overdue"],
        metric: { value: "~40", label: "Zalo groups, live since 09/2026" },
        subtitle: "A chat bot that detects delegated tasks in group threads and follows up before deadlines slip.",
        facts: [
            { k: "Role", v: "Design, build, operations" },
            { k: "Timeline", v: "Live in production since 09/2026" },
            { k: "Delivery", v: "AI reads threads, humans approve rules" },
            { k: "Platform", v: "Zalo bot + web dashboard (WhatsApp-ready)" },
        ],
        metrics: [
            { value: "~40", label: "Zalo groups monitored" },
            { value: "220+", label: "automated tests" },
            { value: "09/2026", label: "production launch" },
        ],
        problem:
            "Action items assigned inside busy group chats disappear within hours. Nobody tracks due dates systematically, and misses only surface after the deadline has passed.",
        approach:
            "The bot monitors group threads while AI extracts the task, owner, and deadline, scheduling timely nudges. A management dashboard surfaces upcoming and overdue tasks in one view.",
        modulesDetail: [
            { title: "Thread ingestion", desc: "Monitors Zalo groups, WhatsApp adapter ready" },
            { title: "AI extraction", desc: "Captures owner, task summary, and deadline" },
            { title: "Smart nudges", desc: "Pre-deadline and overdue alerts during work hours only" },
            { title: "Ops dashboard", desc: "Full visibility across all open commitments" },
        ],
        result: "Tasks delegated across ~40 Zalo groups now carry an explicit owner, deadline, and follow-up — running live since 09/2026 with cadence tuned from real user feedback to avoid spam.",
        tech: {
            summary:
                "Zalo group ingestion bot (with WhatsApp support ready) using structured AI extraction for assignees and deadlines plus a strict business-hours scheduler.",
            stack: [
                "Zalo Bot (WhatsApp-ready)",
                "AI Task & Deadline Extraction",
                "Business-Hours Scheduler",
                "Web Ops Dashboard",
                "220+ Automated Tests",
            ],
            architecture: [
                "Message ingestion across ~40 Zalo groups filters normal chatter from actionable task assignments.",
                "AI extraction normalizes assignee, task summary, and deadline into structured records governed by human-approved rules.",
                "Scheduler dispatches pre-deadline nudges and overdue alerts strictly during Mon–Fri business hours, mirrored on a management dashboard.",
            ],
            testing: [
                "220+ automated tests cover deadline parsing, business-hour windows, deduplication, and completion state transitions.",
                "Reminder cadence tuned against live feedback since 09/2026 to keep alerts useful rather than noisy.",
            ],
            safety: [
                "Hard business-hours guardrails enforced in the scheduler prevent off-hours or weekend notifications.",
                "Full delivery logs and per-group toggle controls allow managers to audit or pause any channel instantly.",
            ],
        },
    },
    {
        slug: "tca",
        name: "TCA v4",
        year: "2026",
        cardTitle: "TCA — Real-Time Data Pipeline",
        category: "ai",
        tag: "AI & Data",
        tone: "apricot",
        before: null,
        // Shown only in Before → After on CaseDetail (Work card displays `after` standalone).
        caseBefore: "Multiple live feeds impossible to watch manually, noisy alerts, and zero tracking of which signals were right",
        after: "Ingests 5 continuous data streams, scores signals, sends alerts, and auto-reconciles every alert against real outcomes.",
        cardMetrics: [
            { value: "5", label: "live data streams ingested" },
            { value: "393 → 58s", label: "heavy compute pass runtime" },
        ],
        line: "Ingest, score, alert, and auto-reconcile",
        modules: ["Ingest", "Scoring", "Alerts", "Reconcile"],
        metric: { value: "72h", label: "continuous soak before release" },
        subtitle: "Real-time data system: multi-stream ingestion, scoring, alerting, and automated outcome verification.",
        facts: [
            { k: "Role", v: "Solo project, end-to-end" },
            { k: "Timeline", v: "Since 02/2026, running live" },
            { k: "Delivery", v: "Measure real outcomes before tuning" },
            { k: "Platform", v: "Data pipeline + web dashboard + Telegram" },
        ],
        metrics: [
            { value: "5", label: "live data streams ingested" },
            { value: "~7×", label: "faster: heavy compute pass cut from 393s to 58s" },
            { value: "72h", label: "clean soak test required before every release" },
        ],
        problem:
            "Market data arrives from multiple sources every second. Manual monitoring can't keep up, while naive alert bots flood channels with noise and never score their own accuracy.",
        approach:
            "Built a continuous pipeline: ingest, compute features, score confidence, dispatch alerts, and log real outcomes for every alert. Each new version ships only after measuring the previous one and passing a 72-hour clean soak test.",
        modulesDetail: [
            { title: "Ingestion", desc: "5 live streams with automatic gap backfill" },
            { title: "Scoring", desc: "Feature extraction and confidence grading" },
            { title: "Alerting", desc: "Dispatched to Telegram and web dashboard" },
            { title: "Reconciliation", desc: "Automatically logs real outcomes per alert" },
        ],
        result: "Running live across 4 iterations. The exact same pattern applies directly to business ops: inventory or revenue alerts only stay trustworthy when you ingest, score, notify, and measure outcomes.",
        tech: {
            summary:
                "Real-time data pipeline ingesting 5 continuous streams, computing features and confidence scores, dispatching Telegram/web alerts, and auto-reconciling real outcomes.",
            stack: [
                "5 Continuous Data Streams",
                "Feature & Scoring Engine",
                "Telegram + Web Alerts",
                "Automated Outcome Reconciliation",
                "72-Hour Soak Gate",
            ],
            architecture: [
                "Ingestion layer aggregates 5 concurrent feeds with automatic gap detection and backfill on transient disconnects.",
                "Optimized feature computation cut heavy processing runs by ~7×, dropping from 393s down to 58s.",
                "Every alert dispatched to Telegram and the web dashboard is logged so the reconciliation loop scores it against actual outcomes.",
            ],
            testing: [
                "Every release candidate must complete a clean 72-hour continuous soak test before promotion.",
                "All 4 major iterations were driven by measured post-alert accuracy from the previous version.",
            ],
            safety: [
                "Automated gap recovery and per-stage structured logging keep ingestion and scoring transparent.",
                "Staging soak runs stay isolated from live alert channels until the 72-hour gate passes.",
            ],
        },
    },
    {
        slug: "ai-operator",
        name: "AI Operator",
        year: "2026",
        cardTitle: "AI Operator",
        category: "ai",
        tag: "AI",
        tone: "mint",
        dark: true,
        before: null,
        caseBefore: "AI writes code fast, yet easily hallucinates or loses context across sessions",
        caseAfter: "a crew of AI agents sharing workspace memory, dividing tasks, cross-checking with tests and real browsers; human final approval.",
        after: "How one builder ships every system in this portfolio: a crew of AI agents with shared memory and cross-verification before handover.",
        cardMetrics: [
            { value: "4+", label: "coordinated AI agents" },
            { value: "3+", label: "months of continuous work logs" },
        ],
        line: "Shipping alongside an AI agent crew",
        modules: ["Shared Memory", "Delegation", "Cross-Check", "Quotas"],
        metric: { value: "4+", label: "coordinated AI agents" },
        subtitle: "A coordinated crew of AI agents sharing memory, splitting roles, and cross-checking work before delivery.",
        facts: [
            { k: "Role", v: "Workflow design & orchestration" },
            { k: "Timeline", v: "Since 2026, used daily" },
            { k: "Delivery", v: "Agents execute, tests verify, human approves" },
            { k: "Tools", v: "Claude Code, Codex, Gemini, Pi" },
        ],
        metrics: [
            { value: "4+", label: "coordinated AI agents" },
            { value: "3+", label: "months of continuous work logs" },
            { value: "1", label: "human final approver" },
        ],
        problem: "Using AI to code is fast, yet single-session prompts drift, introduce quiet bugs, and forget project decisions between runs.",
        approach:
            "Each assistant holds a focused role on top of one shared project memory. Outputs must pass automated tests, builds, and real browser checks before reporting back. Final release decisions always stay human.",
        modulesDetail: [
            { title: "Shared memory", desc: "Persistent logs preserving context across sessions" },
            { title: "Role routing", desc: "Each agent handles the work it performs best" },
            { title: "Cross-review", desc: "One assistant audits another's output" },
            { title: "Quota balancing", desc: "Tracks model limits across active runs" },
        ],
        result: "This workflow is how a solo builder delivers and maintains the full portfolio on the Work page without compromising verification or reliability.",
        tech: {
            summary:
                "Role-specialized multi-agent orchestration across 4+ AI assistants sharing a persistent workspace memory, mandatory cross-review + browser QA, and a final human approval gate.",
            stack: [
                "Claude Code · Codex · Gemini · Pi",
                "Shared Workspace Memory",
                "Role-Specialized Routing",
                "Automated Tests & Cross-Review",
                "Browser QA",
                "Human Final Approval Gate",
            ],
            architecture: [
                "All assistants read and update one shared project memory (3+ months of continuous work logs) to eliminate cross-session context loss.",
                "Tasks route by strength: planning & review, coding & unit tests, UI execution, and utility automation.",
                "Per-agent quota monitoring keeps multi-step runs balanced across models without stalling mid-task.",
            ],
            testing: [
                "Every agent output must pass automated tests, build checks, and an independent peer review pass from another assistant.",
                "UI changes are verified in a real browser across desktop and mobile viewports before sign-off.",
            ],
            safety: [
                "Agents operate on source code and synthetic data by default — never touching production data without explicit approval.",
                "One human reviewer inspects logs, diffs, and verification output before anything ships.",
            ],
        },
    },
];

export const extras = [
    { title: "Recruiting", desc: "2-round candidate evaluation across 10 departments" },
    { title: "RFID Stock Bot", desc: "Upload scan file, get instant Odoo stock reconciliation" },
    { title: "Meeting Recap", desc: "Turns meeting recordings into structured notes and actions" },
    { title: "Ops Hub", desc: "Monitors workstation health and software licenses" },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getNextProject = (slug) => {
    const i = projects.findIndex((p) => p.slug === slug);
    return projects[(i + 1) % projects.length];
};

// Chapter 3 bento cards: 5 flagship cases + Recruiting (internal platform); EVOne featured.
const recruiting = {
    name: "Recruiting",
    tag: "Internal Tool",
    tone: "iris",
    line: "2-round candidate scoring by rubric",
    modules: ["Round 1", "Round 2", "Rubrics", "Summary"],
    metric: { value: "10", label: "departments sharing it" },
};
export const bento = [
    getProject("odoo-bonario"),
    { ...getProject("evone"), feature: true },
    getProject("ace-ra-tem"),
    getProject("reminder-hub"),
    recruiting,
    getProject("tca"),
];
