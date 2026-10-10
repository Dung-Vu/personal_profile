// 6 case chính + "Và còn nữa". Số liệu làm tròn, tổng hợp; dữ liệu khách đã che.
// tone: màu nhóm (ocean | iris | apricot | mint). proof: cấu hình ảnh minh hoạ giao diện (rows/kpiValues là dữ liệu giả).
export const categories = [
    { id: "all", label: "Tất cả" },
    { id: "odoo", label: "Odoo" },
    { id: "erp", label: "ERP theo ngành" },
    { id: "excel", label: "Thay Excel" },
    { id: "bot", label: "Bot" },
    { id: "ai", label: "AI & dữ liệu" },
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
            { value: "1.700+", label: "xe đang quản lý" },
            { value: "Mỗi ngày", label: "sao lưu mã hoá, có bản khác máy" },
            { value: "Offline", label: "mất mạng vẫn bán, có mạng tự đồng bộ" },
        ],
        line: "ERP cho chuỗi showroom xe điện",
        modules: ["Bán hàng", "Kho xe", "Trả góp", "VietQR", "Offline"],
        metric: { value: "1.700+", label: "xe đang quản lý" },
        subtitle: "ERP riêng cho chuỗi showroom xe điện — thay sổ sách và Excel.",
        facts: [
            { k: "Vai trò", v: "Phân tích, thiết kế, xây dựng" },
            { k: "Thời gian", v: "3 tháng đầu, vẫn đang phát triển" },
            { k: "Cách làm", v: "1 người + đội trợ lý AI" },
            { k: "Nền tảng", v: "Phần mềm web, chạy cả khi mất mạng" },
        ],
        metrics: [
            { value: "1.700+", label: "xe đang được quản lý" },
            { value: "Mỗi ngày", label: "sao lưu mã hoá, có bản khác máy" },
            { value: "8.000+", label: "kiểm thử tự động trước mỗi lần cập nhật" },
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
            "Một hệ thống thay cho sổ sách và file rời rạc, đang dùng hằng ngày. Từng chiếc xe có hồ sơ từ lúc nhập kho tới bàn giao, công nợ trả góp có lịch thu rõ ràng, dữ liệu được sao lưu mã hoá mỗi ngày. Bản cập nhật có điểm quay lại nếu cần.",
        proof: {
            app: "evone · kho xe",
            side: ["Tổng quan", "Bán hàng", "Kho xe", "Trả góp", "Thu tiền", "Báo cáo"],
            active: 2,
            kpis: ["Tồn kho", "Đang giao", "Chờ đăng ký", "Bảo hành"],
            cols: ["Số khung", "Mẫu xe", "Showroom", "Trạng thái", "Cập nhật"],
            statuses: [["Trong kho", "ocean"], ["Đang giao", "apricot"], ["Đã bán", "iris"], ["Trong kho", "ocean"], ["Trong kho", "ocean"]],
            // Dữ liệu giả để minh hoạ, không phải số của khách.
            kpiValues: ["312", "18", "24", "9"],
            rows: [
                ["RLH•••4821", "Mẫu A · Xanh", "Showroom 1", "2 phút"],
                ["RLH•••3307", "Mẫu B · Trắng", "Showroom 2", "15 phút"],
                ["RLH•••1190", "Mẫu A · Đen", "Showroom 1", "1 giờ"],
                ["RLH•••5562", "Mẫu C · Đỏ", "Showroom 3", "3 giờ"],
                ["RLH•••0418", "Mẫu B · Xám", "Showroom 2", "Hôm qua"],
            ],
        },
    },
    {
        slug: "odoo-bonario",
        name: "Odoo Bonario",
        cardTitle: "Vận hành doanh nghiệp trên Odoo",
        category: "odoo",
        tag: "Odoo",
        tone: "ocean",
        before: "Yêu cầu trôi trong tin nhắn, kiểm kho và báo cáo làm tay",
        after: "yêu cầu đi qua helpdesk có hạn, tự động hoá quanh Odoo: serial RFID, in label, bot kiểm kho.",
        cardMetrics: [
            { value: "200+", label: "yêu cầu đã xử lý từ 09/2025" },
            { value: "~9/10", label: "xong trong hạn cam kết" },
        ],
        line: "Bán hàng, kho, helpdesk bớt thao tác tay",
        modules: ["Helpdesk", "Kho", "Serial RFID", "In label", "Báo cáo"],
        metric: { value: "200+", label: "yêu cầu vận hành đã xử lý" },
        subtitle: "Vận hành bán hàng, kho và helpdesk trên Odoo — bớt thao tác tay.",
        facts: [
            { k: "Vai trò", v: "Vận hành & phát triển Odoo" },
            { k: "Thời gian", v: "Từ 09/2025, đang chạy" },
            { k: "Cách làm", v: "Theo từng phiếu thật, sửa đúng chỗ tắc" },
            { k: "Nền tảng", v: "Odoo + 5 tool vệ tinh" },
        ],
        metrics: [
            { value: "200+", label: "yêu cầu vận hành đã xử lý" },
            { value: "~9/10", label: "xong trong hạn cam kết" },
            { value: "7", label: "phòng ban, khoảng 50 người dùng" },
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
            "Hơn 200 yêu cầu vận hành của 2 công ty đã đi qua helpdesk, khoảng 9/10 xong trong hạn, một nửa xong trong chưa tới một ngày. Các bước lặp lại trong bán hàng và kho có luồng tự động hoặc tool hỗ trợ.",
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
        cardTitle: "ACE — Phần mềm ra tem rèm",
        category: "excel",
        tag: "Thay Excel",
        tone: "apricot",
        before: "File Excel macro chậm, dễ sai công thức",
        after: "khách tự điền số đo, xưởng bổ sung, hệ thống tính và in tem PDF.",
        cardMetrics: [
            { value: "3", label: "lỗi công thức trong file Excel cũ được tìm ra và sửa" },
            { value: "47/47", label: "ca khớp tem sản xuất thật" },
        ],
        line: "Phần mềm tính rèm và in tem thay file macro",
        modules: ["Biểu mẫu khách", "Công thức", "Tem PDF", "18 tem/A4"],
        metric: { value: "47/47", label: "ca công thức khớp thực tế" },
        subtitle: "Thay file Excel macro bằng phần mềm web tính rèm và in tem cho xưởng.",
        facts: [
            { k: "Vai trò", v: "Phân tích, thiết kế, xây dựng" },
            { k: "Thời gian", v: "2026, đang chạy" },
            { k: "Cách làm", v: "Đối chiếu từng công thức với tem thật" },
            { k: "Nền tảng", v: "Phần mềm web, xuất PDF" },
        ],
        metrics: [
            { value: "47/47", label: "ca công thức khớp sản xuất thật" },
            { value: "18", label: "tem mỗi trang A4, có đường cắt" },
            { value: "3", label: "lỗi công thức trong file cũ được tìm ra và sửa" },
        ],
        problem:
            "Xưởng ra tem rèm bằng file Excel macro: chậm, dễ sai công thức, mỗi máy một phiên bản. Số đo khách gửi qua tin nhắn rồi nhập lại bằng tay.",
        approach:
            "Lấy tem đã sản xuất thật làm chuẩn, viết lại từng công thức và kiểm từng ca cho tới khi khớp. Khách tự điền số đo, xưởng bổ sung thông số, hệ thống tính và in tem.",
        modulesDetail: [
            { title: "Biểu mẫu khách", desc: "Khách tự điền số đo, không phải gõ lại" },
            { title: "Thông số xưởng", desc: "Xưởng bổ sung loại vải, kiểu may" },
            { title: "Công thức", desc: "Tính đúng quy tắc của xưởng, có test" },
            { title: "Tem PDF", desc: "18 tem mỗi trang A4, có đường cắt" },
        ],
        result:
            "Trong lúc đọc file macro, tìm ra 3 lỗi công thức phải sửa, trong đó có lỗi sai kích thước cắt. Bản mới khớp 47/47 ca với tem sản xuất thật, khách tự điền số đo, xưởng không còn phụ thuộc file macro trên từng máy.",
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
            { value: "~40", label: "nhóm Zalo đang theo dõi" },
            { value: "Giờ hành chính", label: "chỉ nhắc T2–T6, không làm phiền ngoài giờ" },
        ],
        line: "Nhắc việc trong nhóm Zalo",
        modules: ["Zalo", "AI đọc việc", "Nhắc đúng người", "Báo quá hạn"],
        metric: { value: "~40", label: "nhóm Zalo, chạy từ 09/2026" },
        subtitle: "Bot đọc nhóm chat, nhận ra việc được giao và tự nhắc tới hạn.",
        facts: [
            { k: "Vai trò", v: "Thiết kế, xây dựng, vận hành" },
            { k: "Thời gian", v: "Chạy thật từ 09/2026" },
            { k: "Cách làm", v: "AI đọc hội thoại, người duyệt quy tắc" },
            { k: "Nền tảng", v: "Bot Zalo + trang quản trị (đã có bản WhatsApp)" },
        ],
        metrics: [
            { value: "~40", label: "nhóm Zalo đang theo dõi" },
            { value: "220+", label: "kiểm thử tự động" },
            { value: "09/2026", label: "chạy thật từ" },
        ],
        problem:
            "Việc giao trong nhóm chat bị trôi theo tin nhắn mới. Không ai theo dõi hạn, tới lúc hỏi lại thì đã trễ.",
        approach:
            "Bot đọc hội thoại, AI nhận diện câu giao việc, người nhận và hạn chót, rồi nhắc đúng người. Bảng theo dõi cho quản lý thấy việc nào sắp quá hạn.",
        modulesDetail: [
            { title: "Đọc hội thoại", desc: "Theo dõi nhóm Zalo, có sẵn bản WhatsApp" },
            { title: "AI nhận việc", desc: "Tách người làm, việc, hạn chót" },
            { title: "Nhắc tự động", desc: "Nhắc trước hạn, báo khi quá hạn, chỉ trong giờ hành chính" },
            { title: "Bảng theo dõi", desc: "Thấy toàn cảnh việc đang mở" },
        ],
        result: "Việc giao trong khoảng 40 nhóm Zalo có người nhận, có hạn và được nhắc — chạy thật từ 09/2026. Nhịp nhắc được chỉnh theo phản hồi thật để không thành spam.",
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
        cardTitle: "TCA — Hệ dữ liệu thời gian thực",
        category: "ai",
        tag: "AI & dữ liệu",
        tone: "apricot",
        before: null,
        // chỉ hiện ở khối Trước → Sau của trang chi tiết (thẻ /work giữ câu "after" đứng một mình)
        caseBefore: "Nhiều nguồn dữ liệu chạy liên tục, đọc tay không kịp, cảnh báo nhiễu và không ai kiểm lại cảnh báo nào đúng",
        after: "Gom 5 luồng dữ liệu liên tục, chấm điểm, gửi cảnh báo và tự đối chiếu từng cảnh báo với kết quả thật.",
        cardMetrics: [
            { value: "5", label: "luồng dữ liệu gom liên tục" },
            { value: "393 → 58s", label: "thời gian một lượt tính nặng" },
        ],
        line: "Gom dữ liệu, chấm điểm, cảnh báo, đối chiếu",
        modules: ["Thu thập", "Chấm điểm", "Cảnh báo", "Đối chiếu"],
        metric: { value: "72 giờ", label: "chạy thử liên tục trước khi nghiệm thu" },
        subtitle: "Hệ dữ liệu thời gian thực: gom nhiều nguồn, chấm điểm, cảnh báo và tự kiểm lại kết quả.",
        facts: [
            { k: "Vai trò", v: "Dự án cá nhân, làm từ đầu tới cuối" },
            { k: "Thời gian", v: "Từ 02/2026, đang chạy" },
            { k: "Cách làm", v: "Đo kết quả thật rồi mới sửa mô hình" },
            { k: "Nền tảng", v: "Luồng dữ liệu + bảng theo dõi trên web + Telegram" },
        ],
        metrics: [
            { value: "5", label: "luồng dữ liệu gom liên tục" },
            { value: "~7×", label: "nhanh hơn: một lượt tính nặng từ 393 xuống 58 giây" },
            { value: "72 giờ", label: "chạy thử liên tục trước khi nghiệm thu bản mới" },
        ],
        problem:
            "Dữ liệu thị trường đến từ nhiều nguồn, cập nhật từng giây. Đọc tay thì không kịp, còn cảnh báo tự động thường nhiễu và không ai kiểm lại xem cảnh báo nào đúng.",
        approach:
            "Dựng một luồng dữ liệu chạy liên tục: gom, tính đặc trưng, chấm điểm, gửi cảnh báo và ghi lại kết quả thật của từng cảnh báo. Mỗi phiên bản mới chỉ ra đời sau khi đo lại kết quả của bản trước, và phải chạy thử 72 giờ không lỗi mới được nghiệm thu.",
        modulesDetail: [
            { title: "Thu thập", desc: "5 luồng dữ liệu, tự bù chỗ bị đứt" },
            { title: "Chấm điểm", desc: "Tính đặc trưng, chấm độ tin cậy" },
            { title: "Cảnh báo", desc: "Gửi qua Telegram và bảng theo dõi trên web" },
            { title: "Đối chiếu", desc: "Tự ghi kết quả thật của từng cảnh báo" },
        ],
        result: "Đang chạy thật, đã qua 4 phiên bản. Bài học dùng lại được cho doanh nghiệp: báo cáo, cảnh báo tồn kho hay doanh số đều cần cùng một khung — gom, chấm, báo, rồi tự kiểm lại.",
        proof: {
            app: "tca · cảnh báo",
            side: ["Tổng quan", "Cảnh báo", "Đối chiếu", "Mô hình", "Nhật ký"],
            active: 1,
            kpis: ["Luồng dữ liệu", "Cảnh báo mới", "Đã đối chiếu", "Phiên bản"],
            cols: ["Nguồn", "Loại", "Điểm", "Trạng thái", "Cập nhật"],
            statuses: [["Đang theo dõi", "iris"], ["Chờ", "apricot"], ["Đã đối chiếu", "ocean"], ["Đang theo dõi", "iris"], ["Đã đối chiếu", "ocean"]],
        },
    },
    {
        slug: "ai-operator",
        name: "AI Operator",
        cardTitle: "AI Operator",
        category: "ai",
        tag: "AI",
        tone: "mint",
        dark: true,
        before: null,
        caseBefore: "AI code nhanh nhưng dễ sai, mất ngữ cảnh giữa các phiên",
        caseAfter: "đội trợ lý AI có bộ nhớ chung, chia việc, kiểm tra chéo bằng kiểm thử và trình duyệt; người duyệt cuối.",
        after: "Vì sao một người làm được khối lượng ở trên: đội trợ lý AI có bộ nhớ chung, kiểm tra chéo trước khi bàn giao.",
        cardMetrics: [
            { value: "4+", label: "trợ lý AI phối hợp" },
            { value: "3+", label: "tháng nhật ký liên tục" },
        ],
        line: "Làm việc cùng đội trợ lý AI",
        modules: ["Bộ nhớ chung", "Chia việc", "Kiểm chéo", "Hạn mức"],
        metric: { value: "4+", label: "trợ lý AI phối hợp" },
        subtitle: "Đội trợ lý AI có bộ nhớ chung, chia việc và kiểm tra chéo trước khi bàn giao.",
        facts: [
            { k: "Vai trò", v: "Thiết kế quy trình, điều phối" },
            { k: "Thời gian", v: "Từ 2026, dùng hằng ngày" },
            { k: "Cách làm", v: "Agent làm, test kiểm, người duyệt" },
            { k: "Công cụ", v: "Claude Code, Codex, Gemini, Pi" },
        ],
        metrics: [
            { value: "4+", label: "trợ lý AI phối hợp" },
            { value: "3+", label: "tháng nhật ký làm việc liên tục" },
            { value: "1", label: "người duyệt cuối cùng" },
        ],
        problem: "Dùng AI để code thì nhanh, nhưng dễ sai và mất ngữ cảnh giữa các phiên làm việc.",
        approach:
            "Mỗi trợ lý có vai riêng, dùng chung một bộ nhớ. Kết quả phải qua kiểm thử, đóng gói và kiểm tra trên trình duyệt rồi mới báo. Quyết định cuối cùng luôn là của con người.",
        modulesDetail: [
            { title: "Bộ nhớ chung", desc: "Nhật ký giữ ngữ cảnh giữa các phiên" },
            { title: "Chia việc", desc: "Mỗi trợ lý nhận đúng loại việc nó làm tốt" },
            { title: "Kiểm chéo", desc: "Trợ lý này soát lại kết quả của trợ lý kia" },
            { title: "Điều phối hạn mức", desc: "Theo dõi hạn mức dùng của từng trợ lý" },
        ],
        result: "Đây là lý do một người làm được khối lượng của các dự án ở trên mà vẫn giữ được chất lượng.",
        proof: {
            app: "hub · nhật ký agent",
            side: ["Hôm nay", "Trợ lý", "Bộ nhớ", "Hạn mức", "Chờ duyệt"],
            active: 0,
            kpis: ["Đang chạy", "Chờ duyệt", "Đã bàn giao", "Hạn mức còn"],
            cols: ["Việc", "Trợ lý", "Kiểm tra", "Trạng thái", "Thời gian"],
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
