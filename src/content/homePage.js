export const homeHeroMeta = [
    "Web apps",
    "Dashboards",
    "Internal tools",
    "AI workflow",
];

export const homeProofPoints = [
    {
        label: "Evidence",
        value: "3 case study có proof đã redacted",
    },
    {
        label: "Build loop",
        value: "Plan, code, build, browser QA",
    },
    {
        label: "Focus",
        value: "Clear state, fast scan, usable handoff",
    },
];

export const homeTrustSignals = [
    {
        label: "Phù hợp",
        title: "Website, dashboard, internal tool",
        text: "Scope rõ, data thật, cần layout và trạng thái đọc được ngay.",
    },
    {
        label: "Phù hợp",
        title: "AI workflow với check-in",
        text: "Có plan, diff, build và browser QA để verify output.",
    },
    {
        label: "Cần làm rõ",
        title: "Brief mơ hồ, không data",
        text: "Nếu không có context để kiểm chứng, mình sẽ chốt scope trước.",
    },
];

export const homeProjects = [
    {
        id: "product-hub",
        title: "Bonario Product Hub",
        type: "B2B SaaS / Enterprise",
        summary: "Hub vận hành nội bộ nối chặt với Odoo ERP, giảm thao tác lặp và giữ trạng thái rõ cho đội vận hành.",
        toneClass: "h2-tone-ocean",
        featured: true,
        tags: ["React", "Flask", "Odoo API"],
        image: "/assets/signal-case-bonario-hub.webp",
        path: "/work/bonario-product-hub",
    },
    {
        id: "tca",
        title: "TCA Crypto Analyzer",
        type: "Fintech / Trading",
        summary: "Dashboard thị trường crypto đa khung thời gian, ưu tiên đọc nhanh tín hiệu và giữ dashboard gọn khi dữ liệu biến động.",
        toneClass: "h2-tone-iris",
        featured: false,
        tags: ["Next.js", "WebSocket", "PWA"],
        image: "/assets/signal-case-tca-dashboard.webp",
        path: "/work/tca-crypto-analyzer",
    },
    {
        id: "ai-workflow",
        title: "AI Operator Workflow",
        type: "Developer Tools",
        summary: "Quy trình làm việc có AI hỗ trợ nhưng vẫn chốt bằng build, browser QA và check-in rõ ràng cho mỗi slice.",
        toneClass: "h2-tone-apricot",
        featured: false,
        tags: ["GSAP", "LLM", "Vite"],
        image: "/assets/signal-case-ai-workflow.webp",
        path: "/work/ai-operator-workflow",
    },
];

export const homeMethods = [
    {
        id: "architecture",
        title: "Architecture First",
        desc: "Cấu trúc dữ liệu và luồng thông tin phải chốt trước khi vẽ UI hay thêm motion.",
        toneClass: "h2-tone-ocean",
        tags: ["Data flow", "State", "Navigation"],
    },
    {
        id: "ai-workflow",
        title: "AI-Assisted Workflow",
        desc: "AI dùng để giảm thao tác lặp, giữ context và đẩy nhanh debug, không thay quyết định thiết kế.",
        toneClass: "h2-tone-iris",
        tags: ["Automation", "Prompting", "QA"],
    },
];

export const homeDestinations = [
    {
        id: "workflow",
        label: "Workflow",
        eyebrow: "Process",
        desc: "Cách mình đi từ brief đến bản build chạy thật và có thể bàn giao.",
        path: "/workflow",
    },
    {
        id: "stack",
        label: "Stack",
        eyebrow: "Capability",
        desc: "Công nghệ và công cụ mình dùng để ship sản phẩm.",
        path: "/stack",
    },
    {
        id: "about",
        label: "About",
        eyebrow: "Identity",
        desc: "Thông tin cá nhân, định vị và triết lý làm việc.",
        path: "/about",
    },
    {
        id: "contact",
        label: "Contact",
        eyebrow: "Start Project",
        desc: "Gửi brief ngắn để nhận đánh giá khả thi và scope MVP.",
        path: "/contact",
    },
];
