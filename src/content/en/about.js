export const about = {
    label: "Approach",
    title: "Map real operations first, then write code.",
    lead: "I'm Dung, born in 2001, based in Vietnam and working remotely with teams anywhere. My job is sitting with the people running daily operations, understanding how work actually happens, and building systems that cut out manual steps.",
    principles: [
        { no: "01", title: "Understand the work first", desc: "Who does what, where data lives, where mistakes happen — map it clearly before writing a single line." },
        { no: "02", title: "Fix the real bottleneck", desc: "Don't rebuild an entire system when one step is broken. If Odoo handles it cleanly, stay on Odoo." },
        { no: "03", title: "Tests and paper trails", desc: "Every change ships with commits and automated tests — easy to verify, easy to roll back." },
        { no: "04", title: "Measure in numbers", desc: "Before and after should be comparable. If something hasn't been measured yet, I say so straight." },
    ],
    timeline: [
        { time: "2021 – 2023", title: "Web interfaces", desc: "Self-taught freelance frontend development and production web UI." },
        { time: "2023 – 2024", title: "Dashboards & internal tools", desc: "Shifted focus to daily-use internal tools for operations teams." },
        { time: "2024 – 2025", title: "Full systems & integrations", desc: "Flask, Odoo, and automation scripts connecting disconnected workflows." },
        { time: "2025 – present", title: "Operations systems + AI crew", desc: "Running Odoo operations for 2 companies since 09/2025 (200+ tickets delivered). Building vertical ERPs, bots, and web apps replacing Excel alongside an AI agent crew." },
    ],
    toolbox: [
        { group: "Operations", items: ["Odoo", "Helpdesk", "Stock & serials", "Reporting"] },
        { group: "Engineering", items: ["React", "Node", "Python", "PostgreSQL"] },
        { group: "AI", items: ["Claude Code", "Codex", "Gemini", "Pi"] },
        { group: "Verification", items: ["Automated tests", "Browser QA", "Audit logs", "Rollback points"] },
    ],
};
