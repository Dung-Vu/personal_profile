// 6 case chính + "Và còn nữa". Số liệu làm tròn, tổng hợp; dữ liệu khách đã che.
// tone: màu nhóm (ocean | iris | apricot | mint). proof (EVOne): cấu hình ảnh minh hoạ giao diện (rows/kpiValues là dữ liệu giả).
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
        year: "2026",
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
        tech: {
            summary:
                "Ứng dụng web offline-first dùng sổ cái định danh theo số khung (VIN), hàng đợi đồng bộ cục bộ khi mất mạng và sinh mã VietQR động cho từng kỳ trả góp.",
            stack: [
                "Web App (Offline-First)",
                "Hàng đợi đồng bộ cục bộ",
                "Sổ cái theo số khung (VIN)",
                "VietQR động",
                "Phân quyền theo vai trò (RBAC)",
                "Sao lưu mã hoá khác máy",
            ],
            architecture: [
                "Mỗi chiếc xe mang một hồ sơ định danh theo số khung/số máy xuyên suốt từ nhập kho, điều chuyển showroom, hợp đồng tới bàn giao.",
                "Quầy bán ghi thao tác vào hàng đợi cục bộ khi mất mạng và tự đồng bộ theo thứ tự khi có kết nối lại, tránh mất phiếu hay trùng đơn.",
                "Lịch trả góp sinh payload VietQR động theo đúng số tiền và mã kỳ để đối soát công nợ tự động.",
            ],
            testing: [
                "8.000+ kiểm thử tự động chạy trước mỗi lần phát hành, phủ tồn kho, lịch trả góp, phân quyền và luồng đồng bộ offline.",
                "Kiểm tra hồi quy tự động cho các ca biên: điều chuyển chéo showroom, huỷ hợp đồng và thanh toán lệch kỳ.",
            ],
            safety: [
                "Sao lưu cơ sở dữ liệu có mã hoá mỗi ngày và lưu thêm bản dự phòng khác máy.",
                "Phân quyền chặt theo vai trò (bán hàng, kho, kế toán, quản lý) kèm điểm quay lại trước mỗi lần cập nhật.",
            ],
        },
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
        year: "2025–2026",
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
        tech: {
            summary:
                "Giữ luồng Odoo gốc làm trục chính, nối thêm 5 tool vệ tinh gọn nhẹ cho đồng bộ serial RFID, in nhãn nhập kho và bot đối soát tồn kho.",
            stack: [
                "Odoo (Bán hàng · Kho · Helpdesk)",
                "5 tool vệ tinh",
                "Đồng bộ Serial RFID",
                "In label từ phiếu nhập",
                "Bot đối soát tồn kho",
                "Nhật ký SLA Helpdesk",
            ],
            architecture: [
                "Dữ liệu bán hàng, kho và helpdesk nằm chuẩn trên Odoo; các thao tác lặp nặng được tách sang 5 tool vệ tinh gọn nhẹ nối trực tiếp vào Odoo.",
                "Tool đọc file máy quét RFID đẩy serial thẳng vào phiếu nhập kho và in nhãn ngay tại thao tác nhập.",
                "Bot kiểm kho nhận file quét, đối chiếu tự động với tồn sổ sách trên Odoo và trả báo cáo chênh lệch theo một mẫu thống nhất.",
            ],
            testing: [
                "Mọi chỉnh sửa luồng Odoo và tool vệ tinh đều chạy thử trên bản sao dữ liệu trước khi đưa lên cho 7 phòng ban (~50 người dùng).",
                "Đối chiếu serial nhập kho và số liệu báo cáo trên mẫu thật cùng người vận hành trước khi đóng phiếu.",
            ],
            safety: [
                "Toàn bộ yêu cầu vận hành đi qua phiếu Helpdesk có người nhận, hạn SLA và dấu vết thay đổi (200+ phiếu từ 09/2025).",
                "Sao lưu trước khi sửa dữ liệu thật và phân quyền vừa đủ theo đúng phạm vi từng phòng ban.",
            ],
        },
    },
    {
        slug: "ace-ra-tem",
        name: "ACE Ra tem",
        year: "2026",
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
        tech: {
            summary:
                "Chuyển toàn bộ quy tắc tính rèm từ Excel macro sang bộ máy công thức thuần (pure formula engine) trên web kèm trình xuất PDF 18 tem/A4 có đường cắt.",
            stack: [
                "Phần mềm web",
                "Pure Formula Engine",
                "47 ca chuẩn sản xuất (Golden Fixtures)",
                "Xuất PDF A4 (18 tem/trang)",
                "Biểu mẫu khách hàng",
            ],
            architecture: [
                "Tách 2 chặng: khách tự điền số đo qua biểu mẫu web, xưởng chỉ bổ sung mã vải và kiểu may thay vì gõ lại từ tin nhắn.",
                "Bộ công thức tách độc lập khỏi giao diện, nhận thông số và tính nhất quán chia tấm, overlap, kích thước cắt vải và phụ kiện.",
                "Trình tạo PDF dàn chuẩn 18 tem trên trang A4 ngang (lưới 6 × 3) kèm đường cắt sẵn cho xưởng in ngay.",
            ],
            testing: [
                "Bộ kiểm thử đối chiếu tự động 47/47 ca thực tế với tem đã sản xuất thật làm chuẩn (golden fixtures).",
                "Quá trình kiểm chứng đã phát hiện và sửa 3 lỗi công thức ẩn trong file macro cũ, gồm lỗi sai kích thước cắt.",
            ],
            safety: [
                "Một phiên bản công thức thống nhất trên web thay cho nhiều file macro lệch nhau trên từng máy xưởng.",
                "Mọi chỉnh sửa công thức về sau đều phải vượt qua trọn bộ 47 ca chuẩn trước khi áp dụng.",
            ],
        },
    },
    {
        slug: "reminder-hub",
        name: "Reminder Hub",
        year: "2026",
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
            { value: "09/2026", label: "bắt đầu chạy thật" },
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
        tech: {
            summary:
                "Bot thu nhận hội thoại từ ~40 nhóm Zalo (sẵn bản WhatsApp), dùng AI trích xuất người nhận/đầu việc/hạn chót và lập lịch nhắc gọn trong giờ hành chính.",
            stack: [
                "Bot Zalo (sẵn bản WhatsApp)",
                "AI trích xuất việc & hạn chót",
                "Bộ lập lịch giờ hành chính",
                "Trang quản trị theo dõi",
                "220+ kiểm thử tự động",
            ],
            architecture: [
                "Luồng nhận tin nhắn theo dõi ~40 nhóm Zalo và lọc tin trao đổi thường khỏi câu giao việc có hành động.",
                "Tầng AI bóc tách có cấu trúc người nhận, đầu việc và hạn chót theo bộ quy tắc do người vận hành duyệt.",
                "Bộ lập lịch gửi nhắc trước hạn và cảnh báo quá hạn trong giờ hành chính T2–T6, đồng bộ lên bảng theo dõi trên web.",
            ],
            testing: [
                "220+ kiểm thử tự động phủ bóc tách hạn chót, khung giờ hành chính, chống nhắc trùng và đóng việc.",
                "Tinh chỉnh nhịp nhắc theo phản hồi thực tế từ các nhóm chạy thật từ 09/2026 để giữ hữu ích, không gây nhiễu.",
            ],
            safety: [
                "Khóa cứng khung giờ hành chính ở tầng lập lịch — không gửi tin làm phiền buổi tối hoặc cuối tuần.",
                "Ghi nhật ký gửi nhắc và cho phép bật/tắt nhanh từng nhóm ngay từ trang quản trị.",
            ],
        },
    },
    {
        slug: "tca",
        name: "TCA v4",
        year: "2026",
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
        tech: {
            summary:
                "Đường ống dữ liệu thời gian thực gom 5 luồng liên tục, tính đặc trưng, chấm độ tin cậy, gửi cảnh báo qua Telegram/web và tự đối chiếu từng cảnh báo với kết quả thật.",
            stack: [
                "5 luồng dữ liệu liên tục",
                "Tính đặc trưng & chấm điểm",
                "Cảnh báo Telegram + Web",
                "Tự động đối chiếu kết quả",
                "Nghiệm thu chạy thử 72 giờ",
            ],
            architecture: [
                "Tầng thu thập gom 5 luồng dữ liệu song song, tự phát hiện khoảng đứt và bù dữ liệu khi nguồn gián đoạn.",
                "Tối ưu đường tính đặc trưng giúp một lượt tính nặng giảm gần 7 lần, từ 393 giây xuống còn 58 giây.",
                "Mỗi cảnh báo phát tới Telegram và bảng theo dõi web đều được lưu định danh để vòng đối chiếu sau tự chấm kết quả thật.",
            ],
            testing: [
                "Mỗi phiên bản mới phải vượt qua 72 giờ chạy thử liên tục (soak test) không lỗi mới được nghiệm thu.",
                "Cả 4 phiên bản được nâng cấp dựa trên dữ liệu đối chiếu thực tế của phiên bản liền trước.",
            ],
            safety: [
                "Tự bù dữ liệu khi đứt luồng và ghi log rõ từng chặng thu thập/chấm điểm để truy vết nhanh.",
                "Tách biệt môi trường chạy thử 72 giờ khỏi kênh cảnh báo thật cho tới khi đạt ngưỡng ổn định.",
            ],
        },
    },
    {
        slug: "ai-operator",
        name: "AI Operator",
        year: "2026",
        cardTitle: "AI Operator",
        category: "ai",
        tag: "AI",
        tone: "mint",
        dark: true,
        before: null,
        caseBefore: "AI code nhanh nhưng dễ sai, mất ngữ cảnh giữa các phiên",
        caseAfter: "đội trợ lý AI có bộ nhớ chung, chia việc, kiểm tra chéo bằng kiểm thử và trình duyệt; người duyệt cuối.",
        after: "Vì sao một người làm được các hệ thống trong danh mục dự án: đội trợ lý AI có bộ nhớ chung, kiểm tra chéo trước khi bàn giao.",
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
        result: "Đây là lý do một người làm được khối lượng của các dự án khác trong trang Dự án mà vẫn giữ được chất lượng.",
        tech: {
            summary:
                "Hệ điều phối 4+ trợ lý AI chuyên vai trên cùng một bộ nhớ dự án chung, kiểm tra chéo bằng test tự động và trình duyệt trước cổng duyệt cuối của con người.",
            stack: [
                "Claude Code · Codex · Gemini · Pi",
                "Bộ nhớ ngữ cảnh chung",
                "Chia việc theo vai trò",
                "Kiểm thử & soát chéo",
                "Kiểm tra trình duyệt",
                "Cổng duyệt cuối: Con người",
            ],
            architecture: [
                "Các trợ lý đọc và ghi vào cùng một bộ nhớ dự án (3+ tháng nhật ký liên tục) để giữ mạch ngữ cảnh qua nhiều phiên.",
                "Phân vai rõ ràng: lập kế hoạch & soát chéo, viết code & kiểm thử, dựng giao diện và xử lý đầu việc phụ trợ.",
                "Theo dõi hạn mức sử dụng từng trợ lý để điều phối nhịp chạy liên tục không bị đứt đoạn.",
            ],
            testing: [
                "Đầu ra bắt buộc vượt qua kiểm thử tự động, đóng gói và một lượt soát chéo độc lập bởi trợ lý khác.",
                "Mọi thay đổi giao diện được kiểm tra trực tiếp trên trình duyệt thật trước khi báo hoàn tất.",
            ],
            safety: [
                "Mặc định trợ lý chỉ thao tác trên mã nguồn và dữ liệu giả, không tự ý chạm dữ liệu thật hay phát hành.",
                "1 người duyệt cuối cùng kiểm tra diff, nhật ký và kết quả test trước mọi lần bàn giao.",
            ],
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
