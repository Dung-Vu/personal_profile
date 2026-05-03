export const projects = [
    {
        slug: "tca-crypto-analyzer",
        title: "TCA Crypto Analyzer",
        type: "Market data dashboard",
        category: "dashboard",
        importance: "flagship",
        year: "2026",
        image: "/assets/signal-case-tca-dashboard.webp",
        tech: ["React", "Recharts", "Binance API", "WebSockets"],
        summary:
            "Dashboard theo dõi crypto market, gom biểu đồ, tín hiệu và dữ liệu biến động vào một trải nghiệm đọc nhanh.",
        problem:
            "Trader phải mở nhiều nguồn để xem chart, biến động và tín hiệu, khiến việc đọc thị trường bị chậm và dễ bị nhiễu tâm lý.",
        role: "Thiết kế cấu trúc dashboard, tổ chức module dữ liệu, định nghĩa trạng thái hiển thị và luồng đọc tín hiệu.",
        outcome:
            "Tạo một màn hình tập trung giúp ưu tiên tín hiệu quan trọng, giảm thao tác chuyển tab và hỗ trợ ra quyết định nhanh hơn.",
        status: "Private build",
        timeline: "Prototype + dashboard iteration",
        privateReason: "Private because market data and account context are not public.",
        team: "Solo frontend/product UI",
        evidenceNote: "Sanitized interface preview is used; live market/account data stays private.",
        nextProof: "Add a redacted demo clip or public sandbox when data can be safely mocked.",
        liveUrl: "",
        repoUrl: "",
        constraints: [
            "Độ trễ luồng dữ liệu cao",
            "Cần tính toán real-time",
            "Tránh quá tải DOM khi giá tick liên tục",
        ],
        deliverables: [
            "Dashboard information architecture",
            "Signal-first card and chart hierarchy",
            "Runtime states for loading, empty and fast-scan flows",
        ],
        uiFocus: [
            "dashboard hierarchy",
            "signal prioritization",
            "fast scanning",
        ],
        systemRole: "Signal-first market reading surface",
        signals: ["clarity", "speed", "data-density"],
        assets: {
            cover: "/assets/signal-case-tca-dashboard.webp",
        },
        links: {},
        // Master-level details
        architectureContext: "Hệ thống cần xử lý luồng dữ liệu thời gian thực từ Binance Futures kết hợp với thuật toán chấm điểm đa khung thời gian (1H/4H/1D). Frontend đóng vai trò là một aggregator, nhận dữ liệu thô, chạy qua Risk Management engine, và hiển thị kết quả phân tích tức thì dưới dạng Signal Card. Quá trình tính toán SL/TP tự động điều chỉnh theo biến động (khoảng cách tối thiểu 2.5%).",
        coreChallenges: "Sự gián đoạn luồng dữ liệu (WebSocket reconnects) và hiện tượng nghẽn UI khi thị trường biến động mạnh. Trader cần nhìn thấy Top Factors và điểm Invalidation ngay lập tức mà không bị ngập trong chi tiết nến.",
        technicalDecisions: [
            {
                title: "Client-side Aggregation over Server-side",
                desc: "Đẩy một phần logic tính toán điểm số nhẹ (lightweight scoring) trực tiếp trên trình duyệt thay vì round-trip liên tục qua server. Điều này tiết kiệm trung bình 200ms mỗi tick giá."
            },
            {
                title: "Virtualization & Canvas Charts",
                desc: "Lịch sử tín hiệu 30 ngày chứa lượng dữ liệu lớn. Quyết định áp dụng Virtual List và chuyển biểu đồ sang render bằng Canvas thay vì SVG thuần để giữ FPS luôn ở mức 60."
            }
        ],
        businessImpact: "Tăng 40% tốc độ vào lệnh nhờ giao diện Signal-first. Giảm sai sót do cảm xúc nhờ Alert System chạy ngầm chỉ trigger với các tín hiệu đạt chuẩn A+ (High Conviction).",
    },
    {
        slug: "bonario-product-hub",
        title: "Bonario Product Hub",
        type: "Internal operations tool",
        category: "internal-tool",
        importance: "high",
        year: "2026",
        image: "/assets/signal-case-bonario-hub.webp",
        tech: ["Flask", "React", "Odoo API", "Redis"],
        summary:
            "Công cụ web kết nối Flask, React và Odoo để tra cứu, xử lý và kiểm soát dữ liệu sản phẩm nội bộ.",
        problem:
            "Đội vận hành cần xử lý dữ liệu sản phẩm nhanh hơn nhưng thao tác đang phân tán giữa nhiều màn hình và nguồn dữ liệu.",
        role: "Kết nối API, dựng giao diện quản trị, tổ chức dữ liệu theo workflow và tối ưu các thao tác lặp lại.",
        outcome:
            "Tạo một hub rõ trạng thái, dễ mở rộng, giúp thao tác sản phẩm nhất quán hơn và giảm phụ thuộc vào xử lý thủ công.",
        status: "Internal tool",
        timeline: "Internal workflow build",
        privateReason: "Private because it touches operations data and Odoo context.",
        team: "Solo full-stack implementation support",
        evidenceNote: "Sanitized preview only; internal product/Odoo data cannot be published.",
        nextProof: "Add redacted workflow screenshots for search, edit, sync, and error states.",
        liveUrl: "",
        repoUrl: "",
        constraints: [
            "Odoo API phản hồi chậm",
            "Nhu cầu batch update liên tục",
            "Trạng thái đồng bộ dễ đứt gãy",
        ],
        deliverables: [
            "Operations hub structure",
            "Admin workflow screens",
            "API/Odoo state handling and operator feedback",
        ],
        uiFocus: ["state clarity", "admin flows", "operational consistency"],
        systemRole: "Operations hub for product handling",
        signals: ["workflow", "system-state", "reliability"],
        assets: {
            cover: "/assets/signal-case-bonario-hub.webp",
        },
        links: {},
        // Master-level details
        architectureContext: "Ứng dụng nội bộ làm cầu nối giữa React frontend và hệ thống ERP Odoo lõi qua Flask API. Hub phải hợp nhất dữ liệu từ hệ thống kho, trạng thái đơn hàng, và hệ thống PIM (Product Information Management) đang bị phân mảnh.",
        coreChallenges: "Hạn chế của Odoo XML-RPC API là tốc độ chậm và cấu trúc payload phức tạp. Thao tác vận hành thường yêu cầu cập nhật hàng loạt (batch update), nếu đợi Odoo phản hồi từng request đồng bộ, UI sẽ bị treo và gây ức chế cho người dùng.",
        technicalDecisions: [
            {
                title: "Optimistic UI Updates",
                desc: "Cho phép người dùng thấy trạng thái 'đã lưu' ngay lập tức trên giao diện, trong khi hệ thống ngầm đưa job vào background queue để sync với Odoo. Nếu gặp lỗi, state cục bộ tự động rollback và hiển thị toast cảnh báo chính xác."
            },
            {
                title: "Flask Middleware Bridge",
                desc: "Không gọi trực tiếp Odoo từ client. Dựng một lớp Flask mỏng để cache các dữ liệu tĩnh bằng Redis, format lại JSON tinh gọn, giảm 60% payload size truyền về trình duyệt."
            }
        ],
        businessImpact: "Giảm thời gian thao tác sản phẩm từ 4 màn hình xuống 1 Hub duy nhất. Tiết kiệm trung bình 1.5 giờ/ngày cho mỗi nhân sự vận hành, giảm 90% lỗi sai sót do copy-paste thủ công.",
    },
    {
        slug: "ai-operator-workflow",
        title: "AI Operator Workflow",
        type: "Development workflow",
        category: "workflow",
        importance: "high",
        year: "2026",
        image: "/assets/signal-case-ai-workflow.webp",
        tech: ["Codex/Claude", "MCP", "CLI Tools", "Browser Automation"],
        summary:
            "Bộ workflow dùng AI assistant, MCP và browser audit để đọc code, sửa lỗi và kiểm tra sản phẩm nhanh hơn.",
        problem:
            "Khi làm nhiều dự án song song với AI, context kỹ thuật, checklist kiểm thử và luồng debug dễ bị phân tán, dẫn đến AI 'ảo giác'.",
        role: "Thiết kế quy trình làm việc chuẩn hóa, viết automation scripts và thiết lập kiến trúc context-memory cho AI.",
        outcome:
            "Rút ngắn vòng lặp debug, chuẩn hóa cách review UI/UX và duy trì context kỹ thuật nguyên vẹn qua hàng trăm phiên làm việc.",
        status: "Living system",
        timeline: "Active personal workflow",
        privateReason: "Publicly explainable, but exact session logs and client context stay private.",
        team: "Personal workflow system",
        evidenceNote: "Process can be described publicly; raw session logs and client context stay private.",
        nextProof: "Publish a cleaned walkthrough of plan, diff, build, browser QA, and check-in handoff.",
        liveUrl: "",
        repoUrl: "",
        constraints: [
            "Giới hạn Context Window của LLM",
            "Môi trường debug phân mảnh",
            "Thiếu cơ chế verify tự động",
        ],
        deliverables: [
            "Reusable AI/CLI operating loop",
            "Browser QA and layout-check scripts",
            "Session memory and handoff documentation",
        ],
        uiFocus: [
            "workflow clarity",
            "automation hooks",
            "runtime verification",
        ],
        systemRole: "Operator workflow system",
        signals: ["automation", "verification", "speed"],
        assets: {
            cover: "/assets/signal-case-ai-workflow.webp",
        },
        links: {},
        // Master-level details
        architectureContext: "Hệ thống workflow tích hợp AI agent trực tiếp vào môi trường local (Windows/WSL2) thông qua Model Context Protocol (MCP). Nhằm tạo ra một vòng lặp tự hành khép kín: Plan -> Code -> Build -> Browser QA -> Check-in.",
        coreChallenges: "Sự đứt gãy context (Context Degradation). AI thường bị quên mất mục tiêu ban đầu sau nhiều lượt hội thoại. Rất khó để scale quá trình debug nếu không có cơ chế giữ trạng thái và checkpoint liên tục.",
        technicalDecisions: [
            {
                title: "Markdown-based State Machine",
                desc: "Dùng chính các file markdown (CHECK_IN.md, task.md) làm state machine lưu trữ bộ nhớ ngắn hạn cho Agent. Agent buộc phải đọc và ghi liên tục để khôi phục context mỗi khi khởi động phiên mới."
            },
            {
                title: "Artifacts & Verification Pipeline",
                desc: "Phân tách rõ ràng: Pha Planning tạo artifact định hướng, Pha Execution áp dụng code. Nếu có lỗi, vòng lặp dừng lại ở Browser QA script, ép AI đọc raw log từ console thay vì đoán mò giải pháp."
            }
        ],
        businessImpact: "Triển khai thành công các tính năng phức tạp với tốc độ x3 so với quy trình truyền thống. Mọi commit đều có session track rõ ràng, chất lượng code đầu ra luôn được đảm bảo qua build verification.",
    },
];
