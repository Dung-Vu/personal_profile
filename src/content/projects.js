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
            "Dashboard theo dõi crypto market, gom chart, tín hiệu và dữ liệu biến động vào một trải nghiệm đọc nhanh.",
        problem:
            "Trader phải mở nhiều nguồn để xem chart, biến động và tín hiệu. Việc đọc thị trường bị chậm, dễ nhiễu và khó biết thông tin nào cần ưu tiên.",
        role:
            "Thiết kế cấu trúc dashboard, tổ chức module dữ liệu, định nghĩa trạng thái hiển thị và luồng đọc tín hiệu.",
        outcome:
            "Một màn hình tập trung hơn, ưu tiên tín hiệu quan trọng, giảm thao tác chuyển tab và giúp người dùng đọc bối cảnh nhanh hơn.",
        status: "Private build",
        timeline: "Prototype + dashboard iteration",
        privateReason: "Private because market data and account context are not public.",
        team: "Solo frontend/product UI",
        evidenceNote:
            "Sanitized interface preview is used; live market/account data stays private.",
        nextProof:
            "Add a redacted demo clip or public sandbox when data can be safely mocked.",
        proofMedia: {
            image: "/assets/case-proof-tca.webp",
            alt: "Sanitized TCA Crypto Analyzer dashboard proof frame",
            caption:
                "Sanitized proof frame: market chart, signal priority, risk overview and fast-scan metrics without private account data.",
        },
        flowProof: {
            label: "Redacted flow screenshot",
            title: "Watchlist -> signal scan -> risk check",
            description:
                "Một bản chụp luồng đã che dữ liệu nhạy cảm, cho thấy cách mình giữ thứ tự đọc từ signal tới hành động.",
            steps: [
                {
                    label: "01",
                    title: "Open watchlist",
                    note: "Danh sách cặp theo dõi và trạng thái thị trường mở trước.",
                },
                {
                    label: "02",
                    title: "Scan priority",
                    note: "Signal card, invalidation và momentum được đẩy lên trước.",
                },
                {
                    label: "03",
                    title: "Check risk",
                    note: "Số liệu tài khoản, position size và vùng cảnh báo bị che.",
                },
                {
                    label: "04",
                    title: "Record action",
                    note: "Người dùng chốt hướng đọc mà không cần đổi tab.",
                },
            ],
            redactions: [
                "Account ids masked",
                "Live prices blurred",
                "Private labels removed",
            ],
        },
        decisionLedger: [
            {
                label: "Constraint",
                text: "Realtime market data changes fast, so the UI cannot force users to chase context across tabs.",
            },
            {
                label: "Decision",
                text: "Put chart context, signal priority and risk state into one reading surface.",
            },
            {
                label: "Trade-off",
                text: "Keep the first screen focused instead of exposing every raw metric at once.",
            },
            {
                label: "Result",
                text: "The dashboard reads like an operator surface: scan first, drill down only when needed.",
            },
        ],
        liveUrl: "",
        repoUrl: "",
        constraints: [
            "Luồng dữ liệu realtime dễ nhiễu",
            "Cần giữ chart và signal cùng một ngữ cảnh",
            "Tránh quá tải DOM khi giá tick liên tục",
        ],
        deliverables: [
            "Dashboard information architecture",
            "Signal-first card and chart hierarchy",
            "Runtime states for loading, empty and fast-scan flows",
        ],
        uiFocus: ["dashboard hierarchy", "signal prioritization", "fast scanning"],
        systemRole: "Signal-first market reading surface",
        signals: ["clarity", "speed", "data-density"],
        assets: {
            cover: "/assets/signal-case-tca-dashboard.webp",
        },
        links: {},
        architectureContext:
            "Hệ thống cần đọc luồng dữ liệu từ Binance Futures, gom nhiều khung thời gian và biến kết quả thành signal card dễ quét. Frontend đóng vai trò aggregator: nhận dữ liệu thô, tổ chức trạng thái và hiển thị điểm cần chú ý trước khi người dùng đi sâu vào chart.",
        coreChallenges:
            "Thách thức chính là giữ UI ổn định khi dữ liệu thay đổi liên tục, đồng thời không biến dashboard thành một bảng thông tin dày đặc khó đọc.",
        technicalDecisions: [
            {
                title: "Signal-first hierarchy",
                desc:
                    "Đẩy tín hiệu, invalidation và trạng thái rủi ro lên trước chart detail để người dùng có hướng đọc rõ ngay từ màn hình đầu.",
            },
            {
                title: "Runtime states before polish",
                desc:
                    "Thiết kế loading, empty, reconnect và fast-scan states trước khi thêm motion để dashboard vẫn dùng được khi dữ liệu chưa ổn định.",
            },
        ],
        businessImpact:
            "Giúp trải nghiệm đọc thị trường tập trung hơn: ít nhảy tab, ít nhiễu và rõ hơn về tín hiệu nào cần ưu tiên.",
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
            "Đội vận hành cần xử lý dữ liệu sản phẩm nhanh hơn nhưng thao tác đang phân tán giữa nhiều màn hình và nhiều nguồn dữ liệu.",
        role:
            "Kết nối API, dựng giao diện quản trị, tổ chức dữ liệu theo workflow và tối ưu các thao tác lặp lại.",
        outcome:
            "Một hub vận hành rõ trạng thái, dễ mở rộng và giảm phụ thuộc vào xử lý thủ công khi làm việc với dữ liệu sản phẩm.",
        status: "Internal tool",
        timeline: "Internal workflow build",
        privateReason: "Private because it touches operations data and Odoo context.",
        team: "Solo full-stack implementation support",
        evidenceNote:
            "Sanitized preview only; internal product/Odoo data cannot be published.",
        nextProof:
            "Add redacted workflow screenshots for search, edit, sync, and error states.",
        proofMedia: {
            image: "/assets/case-proof-bonario.webp",
            alt: "Sanitized Bonario Product Hub operations proof frame",
            caption:
                "Sanitized proof frame: product search, editable product state, Odoo sync status and batch queue.",
        },
        flowProof: {
            label: "Redacted flow screenshot",
            title: "Search -> edit -> sync -> verify",
            description:
                "Luồng vận hành được chụp lại theo dạng đỏ hóa để thấy rõ nhịp làm việc, còn dữ liệu nội bộ thì không lộ.",
            steps: [
                {
                    label: "01",
                    title: "Search product",
                    note: "Tìm đúng SKU hoặc record mà không nhảy qua nhiều màn hình.",
                },
                {
                    label: "02",
                    title: "Edit state",
                    note: "Field nhạy cảm được che, chỉ giữ mạch thao tác chính.",
                },
                {
                    label: "03",
                    title: "Sync Odoo",
                    note: "Trạng thái đồng bộ, queue và lỗi được gom vào cùng bề mặt.",
                },
                {
                    label: "04",
                    title: "Verify result",
                    note: "Nhìn lại feedback trước khi chuyển sang bản ghi tiếp theo.",
                },
            ],
            redactions: [
                "Product values masked",
                "Internal ids blurred",
                "Sync notes truncated",
            ],
        },
        decisionLedger: [
            {
                label: "Constraint",
                text: "Operations work was spread across product data, Odoo state and repeated manual checks.",
            },
            {
                label: "Decision",
                text: "Make one hub that keeps search, edit, sync and error feedback on the same surface.",
            },
            {
                label: "Trade-off",
                text: "Prioritize operator clarity over manager-style analytics charts.",
            },
            {
                label: "Result",
                text: "Operators get a steadier workflow with visible sync state and fewer hidden handoffs.",
            },
        ],
        liveUrl: "",
        repoUrl: "",
        constraints: [
            "Odoo API phản hồi không đồng đều",
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
        architectureContext:
            "Ứng dụng nội bộ làm cầu nối giữa React frontend và hệ thống ERP Odoo thông qua Flask API. Hub hợp nhất các thao tác tìm kiếm, chỉnh sửa, đồng bộ và phản hồi lỗi vào một bề mặt thao tác nhất quán.",
        coreChallenges:
            "Odoo payload phức tạp, trạng thái đồng bộ dễ chậm và operator cần feedback rõ để biết thao tác nào đã lưu, đang chờ hoặc cần rollback.",
        technicalDecisions: [
            {
                title: "Optimistic UI with rollback path",
                desc:
                    "Cho người dùng thấy phản hồi thao tác ngay trên giao diện, nhưng vẫn giữ trạng thái rollback và cảnh báo lỗi khi sync với Odoo không thành công.",
            },
            {
                title: "Flask middleware bridge",
                desc:
                    "Không gọi trực tiếp Odoo từ client. Flask làm lớp format payload, gom trạng thái và giữ API client dễ đọc hơn.",
            },
        ],
        businessImpact:
            "Giảm việc nhảy giữa nhiều màn hình và giúp thao tác sản phẩm nhất quán hơn, đặc biệt ở các bước tìm kiếm, chỉnh sửa và đồng bộ.",
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
            "Khi làm nhiều dự án song song với AI, context kỹ thuật, checklist kiểm thử và luồng debug dễ bị phân tán, dẫn đến output thiếu kiểm chứng.",
        role:
            "Thiết kế quy trình làm việc chuẩn hóa, viết automation scripts và thiết lập kiến trúc context-memory cho AI.",
        outcome:
            "Vòng lặp debug rõ hơn, review UI/UX có checkpoint cụ thể và context kỹ thuật được giữ lại qua nhiều phiên làm việc.",
        status: "Living system",
        timeline: "Active personal workflow",
        privateReason:
            "Publicly explainable, but exact session logs and client context stay private.",
        team: "Personal workflow system",
        evidenceNote:
            "Process can be described publicly; raw session logs and client context stay private.",
        nextProof:
            "Publish a cleaned walkthrough of plan, diff, build, browser QA, and check-in handoff.",
        proofMedia: {
            image: "/assets/case-proof-ai-workflow.webp",
            alt: "Sanitized AI Operator Workflow proof frame",
            caption:
                "Sanitized proof frame: plan, patch, build, browser QA and handoff checklist in one delivery loop.",
        },
        flowProof: {
            label: "Redacted flow screenshot",
            title: "Plan -> patch -> build -> QA -> handoff",
            description:
                "Một capture theo kiểu operator log, đủ thấy vòng lặp làm việc nhưng không lộ session hay context riêng.",
            steps: [
                {
                    label: "01",
                    title: "Read plan",
                    note: "Bối cảnh và mục tiêu được chốt trước khi chạm code.",
                },
                {
                    label: "02",
                    title: "Patch focused",
                    note: "Chỉ sửa slice cần thiết, không kéo scope ra ngoài.",
                },
                {
                    label: "03",
                    title: "Build + QA",
                    note: "Build log và browser pass được ghi lại cùng lúc.",
                },
                {
                    label: "04",
                    title: "Handoff",
                    note: "Chốt bằng check-in để phiên sau đọc tiếp được ngay.",
                },
            ],
            redactions: [
                "Session log hidden",
                "Client context hidden",
                "Private diffs truncated",
            ],
        },
        decisionLedger: [
            {
                label: "Constraint",
                text: "AI sessions lose context quickly when planning, diffs, QA and handoff notes live separately.",
            },
            {
                label: "Decision",
                text: "Treat the workflow as a state machine: plan, patch, build, browser QA, then check-in.",
            },
            {
                label: "Trade-off",
                text: "Accept a small documentation overhead to avoid debugging the same context again later.",
            },
            {
                label: "Result",
                text: "Each slice ends with verifiable output and a cleaner starting point for the next session.",
            },
        ],
        liveUrl: "",
        repoUrl: "",
        constraints: [
            "Giới hạn context window của LLM",
            "Môi trường debug phân mảnh",
            "Thiếu checkpoint verify tự động",
        ],
        deliverables: [
            "Reusable AI/CLI operating loop",
            "Browser QA and layout-check scripts",
            "Session memory and handoff documentation",
        ],
        uiFocus: ["workflow clarity", "automation hooks", "runtime verification"],
        systemRole: "Operator workflow system",
        signals: ["automation", "verification", "speed"],
        assets: {
            cover: "/assets/signal-case-ai-workflow.webp",
        },
        links: {},
        architectureContext:
            "Workflow tích hợp AI agent vào môi trường local Windows/WSL2 qua CLI, MCP và tài liệu check-in. Mục tiêu là vòng lặp khép kín: Plan -> Code -> Build -> Browser QA -> Handoff.",
        coreChallenges:
            "Context dễ xuống cấp sau nhiều lượt làm việc. Nếu không có plan, artifact và check-in, agent dễ sửa đúng cú pháp nhưng sai mục tiêu.",
        technicalDecisions: [
            {
                title: "Markdown-based state machine",
                desc:
                    "Dùng các file markdown như plan, check-in và memory làm state layer để phiên sau có thể đọc lại bối cảnh thay vì bắt đầu từ trí nhớ tạm.",
            },
            {
                title: "Artifacts & verification pipeline",
                desc:
                    "Tách planning artifact khỏi execution diff. Khi có lỗi, vòng lặp dừng ở build log hoặc browser QA thay vì đoán tiếp.",
            },
        ],
        businessImpact:
            "Giữ workflow AI thực dụng hơn: có điểm bắt đầu, có bằng chứng kết thúc và giảm rủi ro agent làm lệch mục tiêu ban đầu.",
    },
];
