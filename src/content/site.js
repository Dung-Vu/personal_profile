// Thông tin chung của trang. Sửa chữ ở đây, không cần đụng component.
export const site = {
    name: "Vũ Đình Dũng",
    firstLine: "Vũ Đình",
    lastLine: "Dũng.",
    initials: "VĐD",
    role: "Dựng hệ thống vận hành",
    focus: ["Odoo", "Phần mềm nội bộ", "Tự động hoá bằng AI"],
    pitch: "Mình biến cách doanh nghiệp đang vận hành thành hệ thống chạy được — rồi để AI gánh phần lặp lại.",
    email: "dinhdung521@gmail.com",
    phone: "0786 915 286",
    tel: "+84786915286",
    zalo: "https://zalo.me/0786915286",
    github: "https://github.com/Dung-Vu",
    githubName: "Dung-Vu",
    domain: "profile.bonstu.site",
    avatar: "/assets/avatar-720.webp",
    year: 2026,
};

// Chữ trên nút gọi hành động (header, hero, khối liên hệ).
export const cta = { short: "Gửi yêu cầu", long: "Gửi yêu cầu cho mình" };

export const nav = [
    { label: "Câu chuyện", href: "/#cau-chuyen", match: "/" },
    { label: "Dự án", href: "/work", match: "/work" },
    { label: "Cách làm", href: "/about", match: "/about" },
    { label: "Liên hệ", href: "/contact", match: "/contact" },
];

// Dải số liệu ở trang chủ: số kết quả, làm tròn xuống, không lộ dữ liệu khách.
// Nguồn (10/2026): helpdesk Odoo 206 phiếu đã giải quyết từ 09/2025, 188/211 đúng SLA; cấu hình bot 41 nhóm Zalo.
export const stats = [
    { value: "6", label: "hệ thống đang chạy thật mỗi ngày" },
    { value: "200+", label: "yêu cầu vận hành Odoo đã xử lý từ 09/2025" },
    { value: "~9/10", label: "yêu cầu xong trong hạn đã cam kết" },
    { value: "~40", label: "nhóm Zalo được bot nhắc việc theo dõi" },
];

export const heroChips = [
    { kind: "led", title: "6 hệ thống", sub: "đang chạy mỗi ngày" },
    { kind: "pill", tone: "iris", tag: "AI", title: "4+ trợ lý AI", sub: "làm việc cùng" },
    { kind: "pill", tone: "ocean", tag: "Odoo", title: "200+ yêu cầu", sub: "đã xử lý cho 2 công ty" },
];

export const brief = {
    title: "Có một quy trình đang làm",
    accent: "bằng tay?",
    lead: "Kể mình nghe nó đang chạy thế nào. Mình sẽ nói thật: nên dựng gì, mất bao lâu, và phần nào AI gánh được.",
    checklistLabel: "Yêu cầu rõ gồm 4 ý",
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

export const briefMailto = `mailto:${site.email}?subject=${encodeURIComponent("Yêu cầu: ")}&body=${encodeURIComponent(briefBody)}`;
