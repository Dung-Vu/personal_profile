function makeBriefLines(entries) {
    return entries.map((entry) => ({
        key: entry.key,
        value: entry.value,
    }));
}

export const contactBriefPresets = [
    {
        id: "website",
        label: "Website",
        badge: "Public site",
        subject: "Website brief for Vũ Đình Dũng",
        intro:
            "Dùng khi bạn cần website, landing hoặc portfolio có câu chuyện rõ, CTA rõ và proof thật.",
        summary:
            "Scope nên chốt từ flow nội dung, asset có sẵn và hành động muốn người xem thực hiện.",
        briefLines: makeBriefLines([
            {
                key: "context",
                value: "Website đang muốn kể câu chuyện gì và người xem là ai?",
            },
            {
                key: "data",
                value: "Đã có copy, asset, analytics hoặc brand system nào chưa?",
            },
            {
                key: "goal",
                value: "CTA chính là lấy lead, giới thiệu năng lực hay chốt niềm tin?",
            },
            {
                key: "timeline",
                value: "Cần bản chạy đầu tiên trong bao lâu và có milestone nào cố định?",
            },
        ]),
    },
    {
        id: "dashboard",
        label: "Dashboard",
        badge: "Data surface",
        subject: "Dashboard brief for Vũ Đình Dũng",
        intro:
            "Dùng khi sản phẩm cần đọc số liệu nhanh, ít nhiễu và có trạng thái đủ rõ để vận hành.",
        summary:
            "Scope nên chốt từ nguồn dữ liệu, mức realtime và danh sách hành động người dùng phải làm.",
        briefLines: makeBriefLines([
            {
                key: "context",
                value: "Dashboard đang theo dõi quy trình, KPI hay dữ liệu thị trường nào?",
            },
            {
                key: "data",
                value: "Nguồn API, refresh rate và trạng thái fallback đang là gì?",
            },
            {
                key: "goal",
                value: "Người dùng phải scan, compare hay ra quyết định nhanh ở màn nào?",
            },
            {
                key: "timeline",
                value: "Có release window, demo day hoặc deadline vận hành nào cần giữ?",
            },
        ]),
    },
    {
        id: "internal-tool",
        label: "Internal tool",
        badge: "Ops workflow",
        subject: "Internal tool brief for Vũ Đình Dũng",
        intro:
            "Dùng khi đội vận hành cần tool nội bộ để search, edit, sync hoặc xử lý queue rõ trạng thái.",
        summary:
            "Scope nên chốt từ hệ thống liên quan, quyền thao tác và feedback nào người dùng cần nhìn thấy.",
        briefLines: makeBriefLines([
            {
                key: "context",
                value: "Workflow nội bộ đang kẹt ở bước search, edit, sync hay verify nào?",
            },
            {
                key: "data",
                value: "Tool phải nối API, Odoo, spreadsheet hay hệ thống nào khác?",
            },
            {
                key: "goal",
                value: "Giảm thao tác tay, giảm lỗi nhập hay tăng tốc xử lý batch?",
            },
            {
                key: "timeline",
                value: "Ai là operator chính và cần feedback ở mức nào trước khi ship?",
            },
        ]),
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
