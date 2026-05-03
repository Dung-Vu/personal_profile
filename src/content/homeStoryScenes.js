export const transformationScenes = [
    {
        id: "signal",
        step: "01",
        label: "Signal",
        kicker: "Messy input",
        headline: "Tín hiệu thô cần được đọc trước khi được thiết kế.",
        body: "Brief rời rạc, dữ liệu khó nhìn, trạng thái mơ hồ và nhiều thao tác thủ công thường là điểm bắt đầu.",
        proof: {
            label: "Raw feed",
            value: "brief + spreadsheet + API + vận hành thực tế",
        },
        route: {
            label: "Xem case study",
            path: "/work",
        },
        visual: "signal",
        accent: {
            bg: "#05080d",
            line: "#5ee7ff",
            soft: "rgba(94, 231, 255, 0.16)",
        },
        strips: ["brief chưa rõ", "data thô", "state thiếu tên"],
    },
    {
        id: "system",
        step: "02",
        label: "System",
        kicker: "Structured surface",
        headline: "Hệ thống tốt làm cho bước tiếp theo trở nên hiển nhiên.",
        body: "Mình chuyển tín hiệu thành information architecture, trạng thái giao diện, dashboard/tool surface và hành động có thể dùng được.",
        proof: {
            label: "Interface proof",
            value: "navigation, empty/error/loading state, CTA rõ",
        },
        route: {
            label: "Xem stack",
            path: "/stack",
        },
        visual: "system",
        accent: {
            bg: "#071426",
            line: "#78a9ff",
            soft: "rgba(120, 169, 255, 0.17)",
        },
        strips: ["state map", "operator view", "action path"],
    },
    {
        id: "runtime",
        step: "03",
        label: "Runtime",
        kicker: "Verified build",
        headline: "Bản chạy trên browser mới là nơi mọi quyết định bị kiểm tra.",
        body: "AI giúp tăng tốc, nhưng mình vẫn chốt bằng build, route, layout QA và kiểm tra mobile để giao diện thật sự vận hành.",
        proof: {
            label: "Runtime loop",
            value: "build pass + browser check + mobile layout",
        },
        route: {
            label: "Xem workflow",
            path: "/workflow",
        },
        visual: "runtime",
        accent: {
            bg: "#07170f",
            line: "#36d399",
            soft: "rgba(54, 211, 153, 0.16)",
        },
        strips: ["npm build", "route check", "mobile QA"],
    },
];

export const routeDeck = [
    {
        id: "work",
        label: "Work",
        eyebrow: "Case studies",
        body: "Xem bối cảnh, vai trò, kết quả và proof của từng dự án.",
        path: "/work",
        tone: "primary",
    },
    {
        id: "workflow",
        label: "Workflow",
        eyebrow: "Build process",
        body: "Cách mình đi từ brief đến slice chạy được và kiểm chứng được.",
        path: "/workflow",
        tone: "standard",
    },
    {
        id: "stack",
        label: "Stack",
        eyebrow: "Tools & skills",
        body: "React, Vite, Flask/Odoo, automation và các lựa chọn thực dụng.",
        path: "/stack",
        tone: "standard",
    },
    {
        id: "contact",
        label: "Contact",
        eyebrow: "Start a project",
        body: "Gửi brief ngắn để chốt scope MVP hoặc bước tiếp theo.",
        path: "/contact",
        tone: "standard",
    },
];

export const secondaryHomeRoutes = [
    {
        id: "lab",
        label: "Lab archive",
        path: "/lab",
    },
];

export const homeStoryScenes = transformationScenes;
