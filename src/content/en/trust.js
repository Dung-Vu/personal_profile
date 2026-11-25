// Collaboration model, data safety, and FAQ — shown in full on /en/contact, summarized in ContactBlock.
// Only state practices actually followed in production. No unverified promises.

// Short commitment line directly beneath contact CTAs.
export const promise = ["Reply within 1 business day", "Free 30–60 min discovery call", "Straight advice if you don't need custom code"];

export const collab = {
    label: "How we work",
    title: "From first message to a live system.",
    steps: [
        { title: "Send a brief", desc: "4 short points via Zalo, form, or email: current workflow, pain points, target outcome, existing tools.", cost: "10 min" },
        { title: "Discovery call", desc: "30–60 minutes, free, online or in person. We inspect the real workflow and decide honestly whether to build.", cost: "1 session" },
        { title: "Written proposal", desc: "Clear scope, explicit non-goals, timeline, and phased pricing.", cost: "Review & approve" },
        { title: "Iterative delivery", desc: "1–2 week sprints, each ending with working software your team can test and critique.", cost: "30 min / sprint" },
        { title: "Handover", desc: "Operator guides, runbooks, and bug-fix warranty per the written proposal.", cost: "—" },
    ],
    forms: [
        { title: "Fixed-scope project", desc: "Best when scope is clear — e.g. replacing a fragile Excel macro with a web app." },
        { title: "Monthly retainer", desc: "Best for ongoing operations and steady improvements — e.g. evolving a live Odoo setup." },
        { title: "Advisory session", desc: "Best when you only need someone to audit a workflow and map out the right fix." },
    ],
    price: "Quoted after the discovery call, broken into phases and billed on delivered milestones. If cleaning up your existing Excel or Odoo setup is enough, I will tell you straight instead of overselling.",
};

export const safety = {
    id: "an-toan",
    label: "Data safety",
    title: "Your data stays where it belongs.",
    lead: "I work with real sales, inventory, and receivables data, so security boundaries are agreed upfront.",
    items: [
        { title: "Staging first, always", desc: "Build and test on copies or synthetic data. Nothing touches production until verified." },
        { title: "Backups before every change", desc: "Every live data modification is preceded by a backup and a tested rollback path." },
        { title: "AI only touches live data with consent", desc: "By default, AI assistants work strictly on source code and mock data. Any production action is logged." },
        { title: "Least-privilege access", desc: "I only request permissions required for the active task. Once shipped, you revoke access." },
        { title: "You own the source code", desc: "Full source code and documentation handed over. NDA available on request." },
    ],
};

export const faq = {
    label: "Straight answers",
    items: [
        {
            q: "If AI helps write the code, who is accountable?",
            a: "I am. AI is a tool, like an accountant's spreadsheet. Every change passes automated tests and my own review before reaching you. If something breaks, I fix it.",
        },
        {
            q: "Can one person really deliver on schedule?",
            a: "I take on a small number of projects at once and state timelines clearly in writing. My AI crew handles repetitive execution, which is how one builder delivers the scope shown on the Work page.",
        },
        {
            q: "What happens if we stop working together later?",
            a: "You keep the entire codebase and documentation. Every change is logged cleanly so another engineer can pick it up immediately.",
        },
    ],
};

// Real operator testimonials. Only add with explicit consent; empty array hides the block cleanly.
// Shape: { quote: "…", who: "Showroom Manager", org: "EV Showroom Chain" }
export const testimonials = [];
