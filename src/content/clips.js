// Clip bằng chứng ở trang chi tiết dự án: mô phỏng đúng luồng làm việc thật của từng hệ thống.
// Toàn bộ là dữ liệu minh hoạ — tên, mã, số tiền đã thay hoặc che bằng "•••". Không dùng số liệu khách thật.
export const clipNote = "Minh hoạ luồng thật · dữ liệu đã thay/che";
export const replayLabel = "Xem lại";
// Nhãn ảnh minh hoạ giao diện ở thẻ dự án.
export const proofNote = "dữ liệu minh hoạ";
export const baLabels = { title: "Trước và sau", before: "Trước", after: "Sau" };

export const clips = {
    evone: {
        kind: "vehicle",
        title: "Hành trình của một chiếc xe",
        app: "evone · hồ sơ xe",
        vin: "RLH•••••••••4821",
        model: "Xe máy điện · mẫu •••",
        steps: [
            { t: "Nhập kho", d: "Ghi theo số khung, số máy", tone: "ocean" },
            { t: "Bán · hợp đồng trả góp", d: "Báo giá, hợp đồng, lịch thu", tone: "iris" },
            { t: "Thu kỳ 1 qua VietQR", d: "Mã đúng số tiền, tự đối soát", tone: "ocean" },
            { t: "Quầy mất mạng", d: "Vẫn bán tiếp · 3 thao tác chờ đồng bộ", tone: "apricot" },
            { t: "Có mạng lại", d: "Tự đồng bộ, không mất dữ liệu", tone: "ocean" },
        ],
        planLabel: "Lịch trả góp",
        planTotal: 12,
        planPaid: 1,
        qrLabel: "VietQR kỳ 2",
        qrNote: "Số tiền đã che",
    },
    "odoo-bonario": {
        kind: "helpdesk",
        title: "Một yêu cầu đi qua helpdesk",
        app: "odoo · helpdesk",
        cols: ["Mới", "Đang xử lý", "Đã xong"],
        ticket: { id: "HD-••42", t: "Nhập serial cho lô hàng mới", who: "Kho" },
        log: [
            "Phiếu mới tự báo đúng nhóm kho",
            "Quét RFID · serial vào Odoo",
            "In label ngay từ phiếu nhập",
            "Đóng phiếu · có người nhận, có dấu vết",
        ],
    },
    "ace-ra-tem": {
        kind: "labels",
        title: "Từ số đo của khách tới trang tem",
        app: "ace · ra tem",
        formLabel: "Khách điền",
        form: [
            ["Rộng", "3000"],
            ["Cao", "2800"],
            ["Kiểu", "Rèm 2 vế"],
            ["Vải", "Mã •••"],
        ],
        calcLabel: "Xưởng bổ sung · hệ thống tính",
        calc: ["Chia tấm", "Overlap", "Cắt vải", "Bi · ống"],
        sheetLabel: "A4 ngang · 18 tem · 6 × 3",
        filled: 14,
        tem: ["Khách •••", "Phòng khách", "Bộ 1 · 2V", "Vtr", "Cắt vải 320"],
    },
    "reminder-hub": {
        kind: "chat",
        title: "Một câu giao việc trong nhóm chat",
        app: "zalo · nhóm dự án •••",
        msgs: [
            { who: "Quản lý", text: "@Minh gửi báo giá cho khách trước 17h thứ Sáu nhé" },
            { who: "Minh", text: "Dạ em nhận ạ", me: true },
        ],
        extractLabel: "AI nhận ra",
        extract: [
            ["Người làm", "@Minh"],
            ["Việc", "Gửi báo giá"],
            ["Hạn", "T6 · 17:00"],
        ],
        remind: "Nhắc @Minh: còn 2 giờ tới hạn gửi báo giá",
        done: "Minh báo xong · việc được đóng",
    },
    tca: {
        kind: "signal",
        title: "Một cảnh báo, từ dữ liệu tới kết quả",
        app: "tca · cảnh báo",
        pipe: ["Thu thập", "Đặc trưng", "Chấm điểm", "Cảnh báo", "Đối chiếu"],
        pair: "Nguồn •••",
        side: "Cảnh báo",
        scoreLabel: "Độ tin cậy",
        plan: [
            ["Dữ liệu", "5 luồng"],
            ["Gửi tới", "Telegram · web"],
            ["Đối chiếu", "tự động"],
        ],
        result: "Kết quả thật của cảnh báo được ghi lại để chấm bản sau",
    },
    "ai-operator": {
        kind: "agents",
        title: "Một việc đi qua đội trợ lý AI",
        app: "hub · nhật ký",
        lines: [
            ["Người", "Giao việc: sửa biểu mẫu đăng ký, kèm tiêu chí xong", "human"],
            ["Claude Code", "Đọc bộ nhớ chung, lên kế hoạch, sửa code", "agent"],
            ["Kiểm thử", "Chạy kiểm thử tự động · đạt", "ok"],
            ["Codex", "Soát chéo · 1 góp ý", "warn"],
            ["Claude Code", "Sửa theo góp ý, chạy lại kiểm thử", "agent"],
            ["Trình duyệt", "Kiểm tra giao diện thật · đạt", "ok"],
            ["Bộ nhớ", "Ghi nhật ký cho phiên sau", "agent"],
            ["Người", "Duyệt và bàn giao", "human"],
        ],
    },
};
