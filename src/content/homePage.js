export const homeHeroMeta = [
    "Web apps",
    "Dashboards",
    "Internal tools",
    "AI workflow",
];

export const homeProofPoints = [
    {
        label: "Ship profile",
        value: "3 case studies + live routes",
    },
    {
        label: "Build loop",
        value: "Plan -> code -> build -> verify",
    },
    {
        label: "Focus",
        value: "Readable state, clear flow, real runtime",
    },
];

export const homeTrustSignals = [
    {
        label: "Best fit",
        title: "Website, dashboard, internal tool",
        text: "Scope rõ, data thật, cần layout và trạng thái đọc được ngay.",
    },
    {
        label: "Best fit",
        title: "AI workflow với check-in",
        text: "Có plan, diff, build và browser QA để verify output.",
    },
    {
        label: "Not fit",
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

export const homeStoryScenes = [
    {
        id: "noise",
        step: "01",
        kicker: "Identity",
        headline: "Giao diện không chỉ để ngắm.",
        subheadline: "Nó phải định hướng hành vi.",
        body: "Một trải nghiệm UI tốt là cách nó kể câu chuyện của dữ liệu, tối ưu luồng vận hành và phản hồi tức thì với người dùng.",
        accent: "ocean",
        ctas: [
            { label: "Xem case study", path: "/work", primary: true },
            { label: "Gửi brief", path: "/contact", primary: false },
        ],
    },
    {
        id: "structure",
        step: "02",
        kicker: "Behind the builds",
        headline: "Web Developer & AI Workflow Builder.",
        body: "Mình chuyên xây dựng các bề mặt giao diện, dashboard và công cụ vận hành (internal tool) tập trung vào luồng xử lý dữ liệu. Không chỉ làm web tĩnh, mình ưu tiên kiến trúc có thể mở rộng và tối ưu hóa workflow hàng ngày bằng AI.",
        accent: "iris",
        route: "/about",
    },
    {
        id: "build",
        step: "03",
        kicker: "Case Studies",
        headline: "Giao diện phải giải quyết bài toán vận hành.",
        body: "Từ dữ liệu rời rạc đến dashboard và tool dùng được thật. Ít màn hình hơn, nhiều quyết định rõ hơn.",
        accent: "ocean",
        route: "/work",
    },
    {
        id: "verify",
        step: "04",
        kicker: "Methodology",
        headline: "Không thiết kế thừa.",
        body: "Mọi line code đều phục vụ một mục đích cụ thể: chuyển tải dữ liệu, phản hồi thao tác, hoặc tối ưu luồng công việc. AI giúp tăng tốc, nhưng runtime mới quyết định.",
        accent: "iris",
        route: "/workflow",
    },
    {
        id: "choose",
        step: "05",
        kicker: "Explore",
        headline: "Khám phá tiếp.",
        body: "Bạn muốn bắt đầu từ đâu? Xem bằng chứng, xem quy trình, hoặc gửi brief ngắn để bắt đầu.",
        accent: "apricot",
    },
];
