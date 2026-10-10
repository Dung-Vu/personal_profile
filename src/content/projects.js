// 6 case chính + "Và còn nữa". Số liệu làm tròn, tổng hợp; dữ liệu khách đã che.
// tone: màu nhóm (ocean | iris | apricot | mint). proof: cấu hình ảnh minh hoạ giao diện đã che dữ liệu.
export const categories = [
    { id: "all", label: "Tất cả" },
    { id: "odoo", label: "Odoo" },
    { id: "erp", label: "ERP theo ngành" },
    { id: "excel", label: "Thay Excel" },
    { id: "bot", label: "Bot" },
    { id: "ai", label: "Dữ liệu & AI" },
];

export const projects = [
    {
        slug: "evone",
        name: "EVOne",
        cardTitle: "EVOne — ERP cho chuỗi showroom xe điện",
        category: "erp",
        tag: "ERP theo ngành",
        tone: "iris",
        before: "Sổ sách + Excel cho bán hàng, kho xe, trả góp",
        after: "một hệ thống: kho theo số khung, công nợ trả góp, VietQR, làm việc cả khi mất mạng.",
        cardMetrics: [
            { value: "1.400+", label: "commit trong 3 tháng" },
            { value: "8.000+", label: "test tự động" },
            { value: "1.700+", label: "xe đang quản lý" },
        ],
        line: "ERP cho chuỗi showroom xe điện",
        modules: ["Bán hàng", "Kho xe", "Trả góp", "VietQR", "Offline"],
        metric: { value: "8.000+", label: "test tự động" },
        subtitle: "ERP riêng cho chuỗi showroom xe điện — thay sổ sách và Excel.",
        facts: [
            { k: "Vai trò", v: "Phân tích, thiết kế, build" },
            { k: "Thời gian", v: "3 tháng đầu, vẫn đang phát triển" },
            { k: "Cách làm", v: "1 người + đội AI agent" },
            { k: "Nền tảng", v: "Web-app, chạy cả khi mất mạng" },
        ],
        metrics: [
            { value: "1.400+", label: "commit trong 3 tháng" },
            { value: "8.000+", label: "test tự động" },
            { value: "1.700+", label: "xe đang được quản lý" },
        ],
        problem:
            "Chuỗi showroom quản lý bán hàng, kho xe và công nợ trả góp bằng sổ sách và nhiều file Excel. Mỗi chiếc xe đi qua nhiều người, nhiều bước, nhưng không ai nhìn thấy toàn bộ hành trình của nó.",
        approach:
            "Đọc quy trình từ quầy bán đến kho, rồi dựng từng phần theo đúng thứ tự công việc thật. Mỗi thay đổi đều có test tự động canh trước khi đưa lên.",
        modulesDetail: [
            { title: "Kho theo số khung", desc: "Mỗi xe một hồ sơ từ lúc nhập đến lúc giao" },
            { title: "Công nợ trả góp", desc: "Lịch thu, nhắc kỳ, đối soát" },
            { title: "VietQR động", desc: "Mã thanh toán đúng số tiền từng kỳ" },
            { title: "Bán hàng", desc: "Báo giá, hợp đồng, giao xe" },
            { title: "Làm việc offline", desc: "Mất mạng vẫn bán được, có mạng tự đồng bộ" },
            { title: "Phân quyền", desc: "Mỗi vai trò thấy đúng phần việc của mình" },
        ],
        result:
            "Một hệ thống thay cho sổ sách và file rời rạc, đang dùng hằng ngày. Từng chiếc xe có lịch sử rõ ràng, công nợ được nhắc đúng hạn — và mọi thay đổi đều được hơn 8.000 test kiểm tra trước khi tới tay người dùng.",
        proof: {
            app: "evone · kho xe",
            side: ["Tổng quan", "Bán hàng", "Kho xe", "Trả góp", "Thu tiền", "Báo cáo"],
            active: 2,
            kpis: ["Tồn kho", "Đang giao", "Chờ đăng ký", "Bảo hành"],
            cols: ["Số khung", "Mẫu xe", "Showroom", "Trạng thái", "Cập nhật"],
            statuses: [["Trong kho", "ocean"], ["Đang giao", "apricot"], ["Đã bán", "iris"], ["Trong kho", "ocean"], ["Trong kho", "ocean"]],
        },
    },
    {
        slug: "odoo-bonario",
        name: "Odoo Bonario",
        cardTitle: "Vận hành doanh nghiệp trên Odoo",
        category: "odoo",
        tag: "Odoo",
        tone: "ocean",
        before: "Thông báo, báo cáo, kiểm kho làm tay",
        after: "tự động hoá quanh Odoo: helpdesk, serial RFID, in label, bot kiểm kho.",
        cardMetrics: [
            { value: "5", label: "tool vệ tinh" },
            { value: "30+", label: "phiếu & task từ 07/2026" },
        ],
        line: "Bán hàng, kho, helpdesk bớt thao tác tay",
        modules: ["Helpdesk", "Kho", "Serial RFID", "In label", "Báo cáo"],
        metric: { value: "5", label: "tool vệ tinh quanh Odoo" },
        subtitle: "Vận hành bán hàng, kho và helpdesk trên Odoo — bớt thao tác tay.",
        facts: [
            { k: "Vai trò", v: "Vận hành & phát triển Odoo" },
            { k: "Thời gian", v: "Từ 07/2026, đang chạy" },
            { k: "Cách làm", v: "Theo từng phiếu thật, sửa đúng chỗ tắc" },
            { k: "Nền tảng", v: "Odoo + tool vệ tinh" },
        ],
        metrics: [
            { value: "5", label: "tool vệ tinh nối với Odoo" },
            { value: "30+", label: "phiếu helpdesk & task vận hành" },
            { value: "07/2026", label: "bắt đầu vận hành" },
        ],
        problem:
            "Bán hàng, kho và helpdesk đã chạy trên Odoo nhưng còn nhiều bước làm tay: báo đơn, nhập serial, in phiếu, kiểm kho. Báo cáo nằm rải rác, mỗi người giữ một bản.",
        approach:
            "Đi theo từng phiếu helpdesk thật để thấy chỗ hay tắc, rồi tự động hoá đúng chỗ đó thay vì làm lại cả hệ thống. Việc Odoo làm chưa gọn thì dựng tool vệ tinh nhỏ nối vào Odoo.",
        modulesDetail: [
            { title: "Thông báo đơn hàng", desc: "Đơn mới tự báo đúng người, đúng nhóm" },
            { title: "Serial RFID", desc: "Đồng bộ serial từ máy quét vào Odoo" },
            { title: "In label", desc: "In nhãn ngay từ phiếu nhập kho" },
            { title: "Bot kiểm kho", desc: "Gửi file quét, nhận đối soát tồn kho" },
            { title: "Báo cáo chuẩn hoá", desc: "Một mẫu thay cho nhiều bản tự làm" },
            { title: "Helpdesk nội bộ", desc: "Phiếu có người nhận, có hạn, có dấu vết" },
        ],
        result:
            "Các bước lặp lại trong bán hàng và kho đã có luồng tự động hoặc tool hỗ trợ. Yêu cầu vận hành đi qua helpdesk, có người nhận và có dấu vết — không còn trôi trong tin nhắn.",
        proof: {
            app: "odoo · helpdesk",
            side: ["Thảo luận", "Bán hàng", "Kho", "Helpdesk", "Báo cáo"],
            active: 3,
            kpis: ["Phiếu mới", "Đang xử lý", "Chờ phản hồi", "Đã xong"],
            cols: ["Mã phiếu", "Chủ đề", "Người nhận", "Trạng thái", "Cập nhật"],
            statuses: [["Mới", "apricot"], ["Đang xử lý", "iris"], ["Đã xong", "ocean"], ["Đang xử lý", "iris"], ["Đã xong", "ocean"]],
        },
    },
    {
        slug: "ace-ra-tem",
        name: "ACE Ra tem",
        cardTitle: "ACE — Web-app ra tem rèm",
        category: "excel",
        tag: "Thay Excel",
        tone: "apricot",
        before: "File Excel macro chậm, dễ sai công thức",
        after: "khách tự điền số đo, xưởng bổ sung, hệ thống tính và in tem PDF.",
        cardMetrics: [
            { value: "47/47", label: "ca công thức khớp thực tế" },
            { value: "18", label: "tem / trang A4" },
        ],
        line: "Web-app tính rèm và in tem thay file macro",
        modules: ["Form khách", "Công thức", "Tem PDF", "18 tem/A4"],
        metric: { value: "47/47", label: "ca công thức khớp thực tế" },
        subtitle: "Thay file Excel macro bằng web-app tính rèm và in tem cho xưởng.",
        facts: [
            { k: "Vai trò", v: "Phân tích, thiết kế, build" },
            { k: "Thời gian", v: "2026, đang chạy" },
            { k: "Cách làm", v: "Đối chiếu từng công thức với tem thật" },
            { k: "Nền tảng", v: "Web-app, xuất PDF" },
        ],
        metrics: [
            { value: "47/47", label: "ca công thức khớp sản xuất thật" },
            { value: "18", label: "tem mỗi trang A4, có đường cắt" },
            { value: "1", label: "luồng từ khách điền tới in tem" },
        ],
        problem:
            "Xưởng ra tem rèm bằng file Excel macro: chậm, dễ sai công thức, mỗi máy một phiên bản. Số đo khách gửi qua tin nhắn rồi nhập lại bằng tay.",
        approach:
            "Lấy tem đã sản xuất thật làm chuẩn, viết lại từng công thức và kiểm từng ca cho tới khi khớp. Khách tự điền số đo, xưởng bổ sung thông số, hệ thống tính và in tem.",
        modulesDetail: [
            { title: "Form khách", desc: "Khách tự điền số đo, không phải gõ lại" },
            { title: "Thông số xưởng", desc: "Xưởng bổ sung loại vải, kiểu may" },
            { title: "Công thức", desc: "Tính đúng quy tắc của xưởng, có test" },
            { title: "Tem PDF", desc: "18 tem mỗi trang A4, có đường cắt" },
        ],
        result:
            "47/47 ca kiểm thử công thức khớp với tem sản xuất thật. Xưởng không còn phụ thuộc vào file macro trên từng máy.",
        proof: {
            app: "ace · ra tem",
            side: ["Đơn mới", "Số đo", "Thông số", "In tem", "Lịch sử"],
            active: 3,
            kpis: ["Đơn hôm nay", "Chờ bổ sung", "Đã tính", "Đã in"],
            cols: ["Mã đơn", "Khách", "Kiểu rèm", "Trạng thái", "Cập nhật"],
            statuses: [["Đã in", "ocean"], ["Chờ bổ sung", "apricot"], ["Đã tính", "iris"], ["Đã in", "ocean"], ["Đã tính", "iris"]],
        },
    },
    {
        slug: "reminder-hub",
        name: "Reminder Hub",
        cardTitle: "Reminder Hub",
        category: "bot",
        tag: "Bot",
        tone: "ocean",
        before: "Việc giao trong nhóm chat bị trôi",
        after: "AI nhận ra việc + hạn chót, tự nhắc và báo quá hạn.",
        cardMetrics: [
            { value: "2", label: "nền tảng chat" },
            { value: "130+", label: "test" },
        ],
        line: "Nhắc việc trên Zalo & WhatsApp",
        modules: ["Zalo", "WhatsApp", "AI đọc việc", "Báo quá hạn"],
        metric: { value: "2", label: "nền tảng chat, chạy từ 09/2026" },
        subtitle: "Bot đọc nhóm chat, nhận ra việc được giao và tự nhắc tới hạn.",
        facts: [
            { k: "Vai trò", v: "Thiết kế, build, vận hành" },
            { k: "Thời gian", v: "Chạy thật từ 09/2026" },
            { k: "Cách làm", v: "AI đọc hội thoại, người duyệt quy tắc" },
            { k: "Nền tảng", v: "Bot + dashboard quản trị" },
        ],
        metrics: [
            { value: "2", label: "nền tảng chat: Zalo & WhatsApp" },
            { value: "130+", label: "test tự động" },
            { value: "09/2026", label: "chạy thật từ" },
        ],
        problem:
            "Việc giao trong nhóm chat bị trôi theo tin nhắn mới. Không ai theo dõi hạn, tới lúc hỏi lại thì đã trễ.",
        approach:
            "Bot đọc hội thoại, AI nhận diện câu giao việc, người nhận và hạn chót, rồi nhắc đúng người. Dashboard cho quản lý thấy việc nào sắp quá hạn.",
        modulesDetail: [
            { title: "Đọc hội thoại", desc: "Theo dõi nhóm Zalo và WhatsApp" },
            { title: "AI nhận việc", desc: "Tách người làm, việc, hạn chót" },
            { title: "Nhắc tự động", desc: "Nhắc trước hạn, báo khi quá hạn" },
            { title: "Dashboard", desc: "Thấy toàn cảnh việc đang mở" },
        ],
        result: "Việc giao trong chat có người nhận, có hạn và được nhắc — chạy thật từ 09/2026 trên cả Zalo và WhatsApp.",
        proof: {
            app: "reminder · việc đang mở",
            side: ["Tổng quan", "Nhóm chat", "Việc", "Quá hạn", "Cài đặt"],
            active: 2,
            kpis: ["Việc mở", "Sắp tới hạn", "Quá hạn", "Đã xong"],
            cols: ["Việc", "Người nhận", "Nhóm", "Trạng thái", "Hạn"],
            statuses: [["Đang mở", "iris"], ["Sắp tới hạn", "apricot"], ["Đã xong", "ocean"], ["Đang mở", "iris"], ["Đã xong", "ocean"]],
        },
    },
    {
        slug: "tca",
        name: "TCA v4",
        cardTitle: "TCA v4",
        category: "ai",
        tag: "Dữ liệu & AI",
        tone: "apricot",
        before: null,
        // chỉ hiện ở khối Trước → Sau của trang chi tiết (thẻ /work giữ câu "after" đứng một mình)
        caseBefore: "Đọc nhiều nguồn dữ liệu rời rạc, tín hiệu nhiễu, khó biết cái nào đúng",
        after: "Phân tích thị trường Binance Futures: thu thập dữ liệu, chấm xác suất, theo dõi kết quả thật.",
        cardMetrics: [
            { value: "Live", label: "tca.bonstu.site" },
            { value: "500+", label: "commit · 4 phiên bản" },
        ],
        line: "Phân tích thị trường, đang chạy live",
        modules: ["Thu thập", "Chấm điểm", "Tín hiệu", "Theo dõi"],
        metric: { value: "4", label: "phiên bản · 500+ commit" },
        subtitle: "Hệ phân tích thị trường: thu thập, chấm điểm, ra tín hiệu và theo dõi kết quả thật.",
        facts: [
            { k: "Vai trò", v: "Dự án cá nhân, làm từ đầu tới cuối" },
            { k: "Thời gian", v: "Từ 02/2026, đang chạy" },
            { k: "Cách làm", v: "Đo kết quả thật rồi mới sửa mô hình" },
            { k: "Nền tảng", v: "Pipeline dữ liệu + web dashboard" },
        ],
        metrics: [
            { value: "Live", label: "đang chạy tại tca.bonstu.site" },
            { value: "500+", label: "commit từ 02/2026" },
            { value: "4", label: "phiên bản đã qua" },
        ],
        problem:
            "Đọc thị trường crypto cần nhiều nguồn dữ liệu, tín hiệu nhiễu và khó kiểm chứng xem cái nào thật sự đúng.",
        approach:
            "Thu thập dữ liệu, tính đặc trưng, chấm xác suất, ra tín hiệu kèm kế hoạch và theo dõi kết quả thật. Mỗi phiên bản mới chỉ ra đời sau khi đo lại kết quả của bản trước.",
        modulesDetail: [
            { title: "Thu thập", desc: "Gom dữ liệu thị trường liên tục" },
            { title: "Chấm điểm", desc: "Tính đặc trưng và xác suất" },
            { title: "Tín hiệu", desc: "Kèm điểm vào, cắt lỗ, chốt lời" },
            { title: "Theo dõi", desc: "Ghi lại kết quả thật từng tín hiệu" },
        ],
        result: "Đang chạy live, đã qua 4 phiên bản. Tài khoản, vị thế và lợi nhuận không công khai.",
        proof: {
            app: "tca · tín hiệu",
            side: ["Thị trường", "Tín hiệu", "Theo dõi", "Mô hình", "Nhật ký"],
            active: 1,
            kpis: ["Đang theo dõi", "Tín hiệu mới", "Đã đóng", "Phiên bản"],
            cols: ["Cặp", "Hướng", "Điểm", "Trạng thái", "Cập nhật"],
            statuses: [["Đang theo dõi", "iris"], ["Chờ", "apricot"], ["Đã đóng", "ocean"], ["Đang theo dõi", "iris"], ["Đã đóng", "ocean"]],
        },
    },
    {
        slug: "ai-operator",
        name: "AI Operator",
        cardTitle: "AI Operator",
        category: "ai",
        tag: "Cách làm",
        tone: "mint",
        dark: true,
        before: null,
        caseBefore: "AI code nhanh nhưng dễ sai, mất ngữ cảnh giữa các phiên",
        caseAfter: "đội agent có bộ nhớ chung, chia việc, kiểm tra chéo bằng test và trình duyệt; người duyệt cuối.",
        after: "Vì sao một người làm được khối lượng ở trên: đội AI agent có bộ nhớ chung, kiểm tra chéo trước khi bàn giao.",
        cardMetrics: [
            { value: "4+", label: "agent phối hợp" },
            { value: "3+", label: "tháng nhật ký liên tục" },
        ],
        line: "Làm việc cùng đội AI agent",
        modules: ["Bộ nhớ chung", "Chia việc", "Kiểm chéo", "Quota"],
        metric: { value: "4+", label: "agent phối hợp" },
        subtitle: "Đội AI agent có bộ nhớ chung, chia việc và kiểm tra chéo trước khi bàn giao.",
        facts: [
            { k: "Vai trò", v: "Thiết kế quy trình, điều phối" },
            { k: "Thời gian", v: "Từ 2026, dùng hằng ngày" },
            { k: "Cách làm", v: "Agent làm, test kiểm, người duyệt" },
            { k: "Công cụ", v: "Claude Code, Codex, Gemini, Pi" },
        ],
        metrics: [
            { value: "4+", label: "AI agent phối hợp" },
            { value: "3+", label: "tháng nhật ký làm việc liên tục" },
            { value: "1", label: "người duyệt cuối cùng" },
        ],
        problem: "Dùng AI để code thì nhanh, nhưng dễ sai và mất ngữ cảnh giữa các phiên làm việc.",
        approach:
            "Mỗi agent có vai riêng, dùng chung một bộ nhớ. Kết quả phải qua test, build và kiểm tra trên trình duyệt rồi mới báo. Quyết định cuối cùng luôn là của con người.",
        modulesDetail: [
            { title: "Bộ nhớ chung", desc: "Nhật ký giữ ngữ cảnh giữa các phiên" },
            { title: "Chia việc", desc: "Mỗi agent nhận đúng loại việc nó làm tốt" },
            { title: "Kiểm chéo", desc: "Agent này review kết quả agent kia" },
            { title: "Điều phối quota", desc: "Theo dõi hạn mức từng agent" },
        ],
        result: "Đây là lý do một người làm được khối lượng của các dự án ở trên mà vẫn giữ được chất lượng.",
        proof: {
            app: "hub · nhật ký agent",
            side: ["Hôm nay", "Agent", "Bộ nhớ", "Quota", "Chờ duyệt"],
            active: 0,
            kpis: ["Đang chạy", "Chờ duyệt", "Đã bàn giao", "Quota còn"],
            cols: ["Việc", "Agent", "Kiểm tra", "Trạng thái", "Thời gian"],
            statuses: [["Đã bàn giao", "ocean"], ["Chờ duyệt", "apricot"], ["Đang chạy", "iris"], ["Đã bàn giao", "ocean"], ["Đã bàn giao", "ocean"]],
        },
    },
];

export const extras = [
    { title: "Tuyển dụng", desc: "Đánh giá ứng viên 2 vòng cho 10 phòng ban" },
    { title: "Bot kiểm kho RFID", desc: "Gửi file quét, nhận đối soát với Odoo" },
    { title: "Meeting Recap", desc: "Ghi âm cuộc họp thành biên bản và việc cần làm" },
    { title: "Ops Hub", desc: "Theo dõi sức khoẻ và bản quyền máy trạm" },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getNextProject = (slug) => {
    const i = projects.findIndex((p) => p.slug === slug);
    return projects[(i + 1) % projects.length];
};

// Thẻ bento ở chương 3: 5 case + Tuyển dụng (nền tảng nội bộ), EVOne là thẻ nổi bật.
const recruiting = {
    name: "Tuyển dụng",
    tag: "Nền tảng nội bộ",
    tone: "iris",
    line: "Đánh giá ứng viên 2 vòng, chấm theo tiêu chí",
    modules: ["Vòng 1", "Vòng 2", "Tiêu chí", "Tổng hợp"],
    metric: { value: "10", label: "phòng ban dùng chung" },
};
export const bento = [
    getProject("odoo-bonario"),
    { ...getProject("evone"), feature: true },
    getProject("ace-ra-tem"),
    getProject("reminder-hub"),
    recruiting,
    getProject("tca"),
];
