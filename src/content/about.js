export const about = {
    label: "Cách làm",
    title: "Đọc quy trình thật trước, rồi mới viết code.",
    lead: "Mình là Dũng, sinh năm 2001, làm việc tại Việt Nam, nhận cả việc từ xa. Việc mình làm: ngồi cùng người vận hành, hiểu họ đang làm gì, rồi dựng hệ thống giúp họ làm ít bước hơn.",
    principles: [
        { no: "01", title: "Hiểu việc trước", desc: "Ai làm gì, dữ liệu nằm đâu, chỗ nào hay sai — vẽ ra được rồi mới bắt đầu." },
        { no: "02", title: "Giải đúng chỗ đau", desc: "Không làm lại cả hệ thống nếu chỉ cần sửa một bước. Odoo làm được thì dùng Odoo." },
        { no: "03", title: "Có test, có dấu vết", desc: "Mỗi thay đổi có commit, có test tự động. Dễ kiểm, dễ quay lại." },
        { no: "04", title: "Đo bằng số", desc: "Trước và sau phải so được. Không có số thì nói thẳng là chưa đo." },
    ],
    timeline: [
        { time: "2021 – 2023", title: "Làm giao diện web", desc: "Tự học, nhận việc tự do, làm giao diện web." },
        { time: "2023 – 2024", title: "Bảng điều khiển & công cụ nội bộ", desc: "Chuyển sang làm công cụ cho người vận hành dùng hằng ngày." },
        { time: "2024 – 2025", title: "Làm trọn hệ thống & tích hợp", desc: "Flask, Odoo, tự động hoá — nối các hệ thống rời với nhau." },
        { time: "2025 – nay", title: "Hệ thống vận hành + trợ lý AI", desc: "Vận hành Odoo cho 2 công ty từ 09/2025, hơn 200 yêu cầu đã xử lý. Dựng ERP, bot, phần mềm web thay Excel cùng đội trợ lý AI." },
    ],
    toolbox: [
        { group: "Vận hành", items: ["Odoo", "Helpdesk", "Kho & serial", "Báo cáo"] },
        { group: "Xây dựng", items: ["React", "Node", "Python", "PostgreSQL"] },
        { group: "AI", items: ["Claude Code", "Codex", "Gemini", "Pi"] },
        { group: "Kiểm chứng", items: ["Test tự động", "Kiểm tra trình duyệt", "Nhật ký", "Khôi phục bản cũ"] },
    ],
};
