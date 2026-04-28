export const projects = [
    {
        slug: "tca-crypto-analyzer",
        title: "TCA Crypto Analyzer",
        type: "Market data dashboard",
        category: "dashboard",
        importance: "flagship",
        year: "2026",
        image: "/assets/photo-60.jpg",
        tech: ["Next.js", "Charts", "Binance API"],
        summary:
            "Dashboard theo dõi crypto market, gom biểu đồ, tín hiệu và dữ liệu biến động vào một trải nghiệm đọc nhanh.",
        problem:
            "Trader phải mở nhiều nguồn để xem chart, biến động và tín hiệu, khiến việc đọc thị trường bị chậm và dễ nhiễu.",
        role: "Thiết kế cấu trúc dashboard, tổ chức module dữ liệu, định nghĩa trạng thái hiển thị và luồng đọc tín hiệu.",
        outcome:
            "Tạo một màn hình tập trung giúp ưu tiên tín hiệu quan trọng, giảm thao tác chuyển tab và hỗ trợ ra quyết định nhanh hơn.",
        status: "Private build",
        constraints: [
            "Nhiều nguồn dữ liệu",
            "Ưu tiên tốc độ đọc",
            "Giảm chuyển tab",
        ],
        uiFocus: [
            "dashboard hierarchy",
            "signal prioritization",
            "fast scanning",
        ],
        systemRole: "Signal-first market reading surface",
        signals: ["clarity", "speed", "data-density"],
        metrics: {
            clarity: 92,
            systemComplexity: 74,
            readingSpeed: 88,
        },
        assets: {
            cover: "/assets/photo-60.jpg",
        },
        links: {},
    },
    {
        slug: "bonario-product-hub",
        title: "Bonario Product Hub",
        type: "Internal operations tool",
        category: "internal-tool",
        importance: "high",
        year: "2026",
        image: "/assets/signal-hero-generated-1536.jpg",
        tech: ["Flask", "React", "Odoo"],
        summary:
            "Công cụ web kết nối Flask, React và Odoo để tra cứu, xử lý và kiểm soát dữ liệu sản phẩm nội bộ.",
        problem:
            "Đội vận hành cần xử lý dữ liệu sản phẩm nhanh hơn nhưng thao tác đang phân tán giữa nhiều màn hình và nguồn dữ liệu.",
        role: "Kết nối API, dựng giao diện quản trị, tổ chức dữ liệu theo workflow và tối ưu các thao tác lặp lại.",
        outcome:
            "Tạo một hub rõ trạng thái, dễ mở rộng, giúp thao tác sản phẩm nhất quán hơn và giảm phụ thuộc vào xử lý thủ công.",
        status: "Internal tool",
        constraints: [
            "Nhiều nguồn dữ liệu",
            "Nhu cầu thao tác lặp",
            "Odoo integration",
        ],
        uiFocus: ["state clarity", "admin flows", "operational consistency"],
        systemRole: "Operations hub for product handling",
        signals: ["workflow", "system-state", "reliability"],
        metrics: {
            clarity: 89,
            systemComplexity: 82,
            readingSpeed: 76,
        },
        assets: {
            cover: "/assets/signal-hero-generated-1536.jpg",
        },
        links: {},
    },
    {
        slug: "ai-operator-workflow",
        title: "AI Operator Workflow",
        type: "Development workflow",
        category: "workflow",
        importance: "high",
        year: "2026",
        image: "/assets/photo-84.jpg",
        tech: ["Codex", "Claude", "MCP"],
        summary:
            "Bộ workflow dùng AI assistant, Windows, WSL2, MCP và browser audit để đọc code, sửa lỗi và kiểm tra sản phẩm nhanh hơn.",
        problem:
            "Khi làm nhiều dự án song song, context, checklist kiểm thử và cách debug dễ bị phân tán qua nhiều công cụ.",
        role: "Thiết kế quy trình làm việc với AI, CLI, script kiểm tra, browser runtime và ghi chú kỹ thuật có thể tái sử dụng.",
        outcome:
            "Rút ngắn vòng lặp debug, chuẩn hóa cách review UI/UX và giữ được context kỹ thuật qua nhiều phiên làm việc.",
        status: "Living system",
        constraints: [
            "Nhiều tool song song",
            "Context switching",
            "Debug loops",
        ],
        uiFocus: [
            "workflow clarity",
            "automation hooks",
            "runtime verification",
        ],
        systemRole: "Operator workflow system",
        signals: ["automation", "verification", "speed"],
        metrics: {
            clarity: 84,
            systemComplexity: 78,
            readingSpeed: 81,
        },
        assets: {
            cover: "/assets/photo-84.jpg",
        },
        links: {},
    },
];
