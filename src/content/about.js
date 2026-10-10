export const about = {
    label: "Cách làm",
    title: "Đọc quy trình thật trước, rồi mới viết code.",
    lead: "Mình là Dũng, sinh năm 2001, làm việc từ Việt Nam và remote. Việc mình làm: ngồi cùng người vận hành, hiểu họ đang làm gì, rồi dựng hệ thống giúp họ làm ít bước hơn.",
    principles: [
        { no: "01", title: "Hiểu việc trước", desc: "Ai làm gì, dữ liệu nằm đâu, chỗ nào hay sai — vẽ ra được rồi mới bắt đầu." },
        { no: "02", title: "Giải đúng chỗ đau", desc: "Không làm lại cả hệ thống nếu chỉ cần sửa một bước. Odoo làm được thì dùng Odoo." },
        { no: "03", title: "Có test, có dấu vết", desc: "Mỗi thay đổi có commit, có test tự động. Dễ kiểm, dễ quay lại." },
        { no: "04", title: "Đo bằng số", desc: "Trước và sau phải so được. Không có số thì nói thẳng là chưa đo." },
    ],
    timeline: [
        { time: "2021 – 2023", title: "Nền tảng frontend", desc: "Tự học, nhận việc freelance, làm giao diện web." },
        { time: "2023 – 2024", title: "Dashboard & tool nội bộ", desc: "Chuyển sang làm công cụ cho người vận hành dùng hằng ngày." },
        { time: "2024 – 2025", title: "Full-stack & tích hợp", desc: "Flask, Odoo, tự động hoá — nối các hệ thống rời với nhau." },
        { time: "2025 – nay", title: "Hệ thống vận hành + AI agent", desc: "Dựng ERP, bot, web-app thay Excel cùng đội AI agent. Vận hành Odoo ở Bonario từ 07/2026." },
    ],
    toolbox: [
        { group: "Vận hành", items: ["Odoo", "Helpdesk", "Kho & serial", "Báo cáo"] },
        { group: "Build", items: ["React", "Node", "Python", "PostgreSQL"] },
        { group: "AI", items: ["Claude Code", "Codex", "Gemini", "Pi"] },
        { group: "Kiểm chứng", items: ["Test tự động", "Kiểm tra trình duyệt", "Log", "Rollback"] },
    ],
};
