export const contactBriefLines = [
    {
        key: "context",
        value: "Sản phẩm hoặc quy trình hiện tại đang kẹt ở đâu?",
    },
    {
        key: "data",
        value: "Đang có data, API, tool hay hệ thống nào liên quan?",
    },
    {
        key: "goal",
        value: "Kết quả muốn đạt sau 1-2 vòng triển khai là gì?",
    },
    {
        key: "timeline",
        value: "Mức ưu tiên, deadline và trạng thái hiện tại ra sao?",
    },
];

export const contactCapabilities = [
    {
        category: "Supported protocols (Green zone)",
        items: [
            { type: "green", text: "Website / landing có câu chuyện sản phẩm và CTA rõ" },
            { type: "green", text: "Dashboard dữ liệu cần đọc nhanh, ít nhiễu" },
            { type: "green", text: "Internal tool kết nối API / Odoo / workflow" },
            { type: "green", text: "AI workflow có audit, context và browser QA" },
            { type: "green", text: "Brief ngắn, ra bản chạy đầu tiên trong 3-10 ngày" },
        ],
    },
    {
        category: "Unsupported formats (Red zone)",
        items: [
            { type: "red", text: "Brand identity, logo, illustration thuần túy" },
            { type: "red", text: "Thiết kế mobile native app (chỉ focus web)" },
            { type: "red", text: "Dự án thiếu dữ liệu thực để verify runtime" },
            { type: "red", text: "Brief chung chung không có scope rõ ràng" },
        ],
    },
];

export const contactResponseSteps = [
    "Nhận brief và chốt scope MVP trong cùng một vòng đọc.",
    "Trả lại flow chính, data cần có và rủi ro còn lại.",
    "Nếu fit, mình sẽ đề xuất slice đầu tiên để bắt tay ngay.",
];
