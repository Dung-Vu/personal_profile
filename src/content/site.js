// Thông tin chung của trang. Sửa chữ ở đây, không cần đụng component.
export const site = {
    name: "Vũ Đình Dũng",
    firstLine: "Vũ Đình",
    lastLine: "Dũng.",
    initials: "VĐD",
    role: "Operations Systems Builder",
    focus: ["Odoo", "Internal tools", "AI agents"],
    pitch: "Mình biến cách doanh nghiệp đang vận hành thành hệ thống chạy được — rồi để AI gánh phần lặp lại.",
    email: "dinhdung521@gmail.com",
    github: "https://github.com/Dung-Vu",
    githubName: "Dung-Vu",
    domain: "profile.bonstu.site",
    avatar: "/assets/avatar-720.webp",
    year: 2026,
};

export const nav = [
    { label: "Câu chuyện", href: "/#cau-chuyen", match: "/" },
    { label: "Dự án", href: "/work", match: "/work" },
    { label: "Cách làm", href: "/about", match: "/about" },
    { label: "Liên hệ", href: "/contact", match: "/contact" },
];

// Dải số liệu ở trang chủ: làm tròn, tổng hợp, không lộ dữ liệu khách.
export const stats = [
    { value: "15+", label: "hệ thống & tool nội bộ dựng trong năm 2026" },
    { value: "6", label: "hệ thống đang chạy thật mỗi ngày" },
    { value: "2.000+", label: "commit, mọi thay đổi đều có dấu vết" },
    { value: "9.000+", label: "test tự động canh trước mỗi lần bàn giao" },
];

export const heroChips = [
    { kind: "led", title: "6 hệ thống", sub: "đang chạy mỗi ngày" },
    { kind: "pill", tone: "iris", tag: "AI", title: "4+ agent", sub: "làm việc cùng" },
    { kind: "pill", tone: "ocean", tag: "Odoo", title: "Vận hành Bonario", sub: "từ 07/2026" },
];

export const brief = {
    title: "Có một quy trình đang làm",
    accent: "bằng tay?",
    lead: "Kể mình nghe nó đang chạy thế nào. Mình sẽ nói thật: nên dựng gì, mất bao lâu, và phần nào AI gánh được.",
    checklistLabel: "Brief tốt gồm 4 ý",
    checklistTitle: "Không cần viết dài — gạch đầu dòng là đủ.",
    checklist: [
        { title: "Việc đang làm thế nào", desc: "Ai làm, dùng Zalo, Excel hay phần mềm gì" },
        { title: "Chỗ đang đau", desc: "Chậm, hay sai, hay mất dấu ở đâu" },
        { title: "Kết quả mong muốn", desc: "Đo bằng gì: thời gian, số lỗi, số người phải làm" },
        { title: "Hệ thống sẵn có", desc: "Odoo, Google Sheet, phần mềm riêng…" },
    ],
    note: "Ảnh chụp màn hình đã che dữ liệu nhạy cảm là đủ để bắt đầu.",
};

const briefBody = [
    "Chào Dũng,",
    "",
    "1. Việc đang làm thế nào:",
    "",
    "2. Chỗ đang đau:",
    "",
    "3. Kết quả mong muốn:",
    "",
    "4. Hệ thống sẵn có:",
    "",
].join("\n");

export const briefMailto = `mailto:${site.email}?subject=${encodeURIComponent("Brief: ")}&body=${encodeURIComponent(briefBody)}`;
