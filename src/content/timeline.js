/**
 * Career timeline data — dùng cho About page.
 * Mỗi entry có: date, title, subtitle, description, tags, status.
 */
export const careerTimeline = [
    {
        date: "2021–2023",
        title: "Xây nền tảng Frontend",
        subtitle: "Freelance / Tự học",
        description:
            "Bắt đầu với HTML/CSS/JavaScript, học React qua các dự án thực tế. Xây landing page, website tĩnh và component UI đầu tiên, tập trung vào responsive và cross-browser.",
        tags: ["HTML/CSS", "JavaScript", "React", "Responsive"],
        status: "past",
    },
    {
        date: "2023–2024",
        title: "Dashboard & Internal Tools",
        subtitle: "Project-based Developer",
        description:
            "Chuyển sang xây dựng dashboard dữ liệu và công cụ nội bộ. Làm việc với Chart.js/Recharts, thiết kế layout đọc nhanh, kết nối REST API và xử lý dữ liệu thời gian thực.",
        tags: ["Chart.js", "Recharts", "REST API", "Dashboard"],
        status: "past",
    },
    {
        date: "2024–2025",
        title: "Full-stack & Tích hợp hệ thống",
        subtitle: "Full-stack Developer",
        description:
            "Mở rộng sang Flask, Odoo API và workflow automation. Dựng các hub vận hành kết nối nhiều dịch vụ, thiết kế state machine cho quy trình phức tạp và tối ưu trải nghiệm admin.",
        tags: ["Flask", "Odoo", "React", "Automation"],
        status: "past",
    },
    {
        date: "2025–nay",
        title: "AI-assisted Development",
        subtitle: "AI-accelerated Developer",
        description:
            "Kết hợp AI agent (Codex, Claude, MCP) vào workflow phát triển. Dùng AI để tăng tốc phân tích và refactor, giữ browser QA và build verification làm tiêu chuẩn kiểm chứng cuối cùng.",
        tags: ["AI Agents", "MCP", "Browser QA", "Build Verification"],
        status: "current",
    },
];

/**
 * Project milestone templates — dùng cho CaseDetail page.
 * Key là project slug, value là mảng milestone.
 */
export const projectMilestones = {
    "tca-crypto-analyzer": [
        {
            date: "Khởi động",
            title: "Phân tích bài toán & data source",
            description:
                "Khảo sát Binance API endpoints, xác định hierarchy tín hiệu: ưu tiên price action → chart context → metadata. Thiết kế IA cho một màn hình đọc nhanh thay vì multi-tab.",
            status: "milestone",
        },
        {
            date: "MVP",
            title: "Dashboard core: signal + chart + metadata",
            description:
                "Dựng layout 3-zone: signal cards trên cùng, chart ở giữa, metadata strip dưới cùng. Kết nối Recharts với Binance WebSocket cho dữ liệu real-time.",
            status: "milestone",
        },
        {
            date: "Polish",
            title: "Runtime states & responsive QA",
            description:
                "Thêm loading skeleton, error boundary, empty state cho từng zone. Tối ưu mobile viewport: stack dọc thay vì grid ngang. Browser QA trên 3 thiết bị.",
            status: "milestone",
        },
        {
            date: "Hiện tại",
            title: "Private build — đang dùng thực tế",
            description:
                "Dashboard đang chạy ở chế độ private build. Dữ liệu real-time + mock fallback. Sẵn sàng mở rộng thêm indicator module khi cần.",
            status: "current",
        },
    ],
    "bonario-product-hub": [
        {
            date: "Khởi động",
            title: "Audit workflow hiện tại & pain points",
            description:
                "Theo dõi thao tác của đội vận hành: mất 3-4 màn hình để tra cứu → sửa → đồng bộ sản phẩm. Xác định các bước lặp nhiều nhất để ưu tiên tự động hóa.",
            status: "milestone",
        },
        {
            date: "MVP",
            title: "Hub tập trung: search → edit → sync",
            description:
                "Dựng Flask API bridge với Odoo, React UI với search nhanh + inline edit + sync status feedback. Gom 3 màn hình xuống 1 layout có state rõ ràng.",
            status: "milestone",
        },
        {
            date: "Polish",
            title: "Error handling & batch operations",
            description:
                "Thêm retry logic cho Odoo sync, batch edit UI, và notification toast cho từng trạng thái đồng bộ. Tối ưu query performance cho danh sách > 1000 sản phẩm.",
            status: "milestone",
        },
        {
            date: "Hiện tại",
            title: "Internal tool — đang vận hành",
            description:
                "Hub đang được đội vận hành sử dụng hàng ngày. Cấu trúc sẵn sàng mở rộng: thêm module import/export CSV, bulk tagging, và audit log.",
            status: "current",
        },
    ],
    "ai-operator-workflow": [
        {
            date: "Khởi động",
            title: "Xác định vấn đề: mất context giữa các phiên AI",
            description:
                "Làm nhiều dự án với AI agent dễ bị lặp lại bước setup và debug. Thiết kế vòng lặp: đọc plan → code → build → QA → check-in để giữ context continuity.",
            status: "milestone",
        },
        {
            date: "MVP",
            title: "Workflow loop: plan → code → build → browser QA",
            description:
                "Triển khai vòng lặp 4 bước với check-in docs. Mỗi phiên có context injection từ phiên trước. Build verification và browser snapshot làm bằng chứng kết thúc.",
            status: "milestone",
        },
        {
            date: "Polish",
            title: "Agent handoff & multi-project memory",
            description:
                "Thêm cơ chế handoff giữa các agent (plan → code → review), memory persistence qua project, và automated quality gates (lint, build, visual diff).",
            status: "milestone",
        },
        {
            date: "Hiện tại",
            title: "Đang áp dụng cho tất cả dự án",
            description:
                "Workflow này đang được dùng để phát triển TCA, Bonario Hub và chính portfolio site này. Mỗi phiên có CHECK_IN.md ghi lại tiến độ và bằng chứng QA.",
            status: "current",
        },
    ],
};
