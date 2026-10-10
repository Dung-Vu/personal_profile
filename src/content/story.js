// 4 chương "câu chuyện" ở trang chủ. P2 sẽ gắn phim cuộn Remotion lên đúng các chương này.
export const storyIntro = {
    label: "Câu chuyện · 4 chương",
    title: "Từ tin nhắn rời rạc tới hệ thống tự chạy.",
};

export const chapters = [
    {
        id: "hon-loan",
        no: "01",
        name: "Hỗn loạn",
        title: "Việc vận hành nằm rải rác ở Zalo, Excel và trí nhớ.",
        lead: "Đơn hỏi lại nhiều lần, file có ba bản “cuối”, số liệu nhập tay rồi sai — và không ai thấy toàn cảnh.",
    },
    {
        id: "doc-he-thong",
        no: "02",
        name: "Đọc hệ thống",
        title: "Trước khi code, mình đọc quy trình thật.",
        lead: "Ai làm gì, dữ liệu nằm đâu, chỗ nào hay sai. Mọi hệ thống đều đi qua cùng 4 bước.",
    },
    {
        id: "dung-lai",
        no: "03",
        name: "Dựng lại",
        title: "Thành những hệ thống chạy được mỗi ngày.",
        lead: "Odoo cho vận hành, ERP riêng theo ngành, web-app thay Excel, bot nhắc việc — mỗi cái giải đúng một chỗ đau.",
    },
    {
        id: "ai-van-hanh",
        no: "04",
        name: "AI vận hành",
        title: "Rồi để AI gánh phần lặp lại.",
        lead: "Nhiều agent nhận việc, làm, kiểm tra chéo bằng test và trình duyệt rồi mới báo kết quả. Con người giữ quyết định.",
    },
];

// Chương 1: mảnh vụn công việc. Bố cục: [mảnh, x%, y%, rộng px, xoay độ, độ gần 0 xa → 1 gần].
export const fragments = {
    c1: { kind: "chat", who: "L", color: "#2b7de9", meta: "Zalo", badge: "23", text: "Anh ơi đơn hôm qua giao chưa ạ?" },
    c2: { kind: "chat", who: "K", color: "#25a35a", meta: "WhatsApp · Kho", text: "Mẫu này trong kho còn bao nhiêu?" },
    c3: { kind: "chat", who: "T", color: "#8a5cd1", meta: "Zalo · Nhóm vận hành", text: "Ai đang giữ file báo cáo tuần vậy?" },
    c4: { kind: "chat", who: "H", color: "#c47a38", meta: "Helpdesk · chưa phân công", text: "Phiếu hỗ trợ này ai nhận vậy?" },
    s1: {
        kind: "sheet",
        file: "Ra_tem_v1.2_FINAL.xlsm",
        meta: "bản cuối (3)",
        rows: [["4", "Rộng", "1.240", "×1,05", "!#REF!"], ["5", "Cao", "2.600", "+15", "!#VALUE!"], ["6", "Mẫu", "—", "?", "=VLOOK…"]],
    },
    s2: {
        kind: "sheet",
        file: "Cong_no_T9.xlsx",
        meta: "14 dòng lỗi",
        rows: [["12", "Kỳ 3", "đã thu?", "—", "!#N/A"], ["13", "Kỳ 4", "…", "trễ", "xem lại"]],
    },
    n1: { kind: "note", text: "Nhớ báo giá trước 5h!!", meta: "giấy note · hôm qua" },
    n2: { kind: "note", text: "Serial nhập tay — kiểm lại!", meta: "giấy note" },
    p1: { kind: "paper", title: "Phiếu nhập kho", lines: [["Mã hàng: ", "RF-0212", " RF-0221"], ["Số lượng: 40 → 38?"], ["Người nhận: ……"]] },
};

export const fragmentLayout = {
    desktop: [
        ["c1", 6, 15, 330, -4, 1], ["s1", 33, 11, 380, 3, 0.9], ["n1", 63, 14, 230, 6, 0.8], ["c2", 72, 40, 330, 2, 0.95],
        ["s2", 50, 46, 340, -3, 0.55], ["n2", 47, 71, 210, -6, 0.4], ["c3", 63, 72, 320, 3, 0.7], ["c4", 82, 62, 290, -2, 0.35],
        ["p1", 86, 22, 200, -5, 0.3], ["c4", 4, 36, 300, 2, 0.3],
    ],
    mobile: [
        ["c1", 6, 13, 270, -3, 1], ["s1", 34, 24, 300, 4, 0.8], ["n1", 4, 36, 170, -6, 0.9], ["c3", 22, 47, 280, 2, 0.55],
        ["n2", 66, 41, 140, 7, 0.5], ["c2", -12, 58, 240, -2, 0.35], ["p1", 62, 56, 170, -4, 0.35],
    ],
};

export const chaosCount = { value: "23", label: "tin chưa đọc · 3 bản “cuối”" };

export const readNotes = {
    label: "Ghi chép sau buổi đọc",
    rows: [["Người tham gia", "5 vai trò"], ["Điểm hay sai", "nhập tay ×3"], ["Nguồn dữ liệu", "Zalo · Excel · Odoo"]],
};

export const buildLegend = [
    { tone: "ocean", label: "Vận hành & tự động hoá" },
    { tone: "iris", label: "Hệ thống riêng theo ngành" },
    { tone: "apricot", label: "Thay Excel · dữ liệu" },
];

export const aiSystems = [
    ["Odoo", "vận hành"], ["EVOne", "ERP"], ["ACE", "ra tem"], ["Reminder", "bot"], ["Tuyển dụng", "nội bộ"], ["TCA", "dữ liệu"],
];

export const steps = [
    { no: "01", title: "Đọc hệ thống", desc: "Ngồi cùng người làm, vẽ lại quy trình", hint: "ai · làm gì · ở đâu", tone: "ocean" },
    { no: "02", title: "Dựng giao diện", desc: "Màn hình theo đúng thao tác thật", hint: "bấm ít · nhìn là hiểu", tone: "iris" },
    { no: "03", title: "Build", desc: "Có test, dữ liệu thật, chạy được ngay", hint: "test · log · rollback", tone: "apricot" },
    { no: "04", title: "Kiểm chứng", desc: "Đo lại bằng số trước khi bàn giao", hint: "trước → sau", tone: "ink" },
];

export const agents = [
    { code: "CC", name: "Claude Code", role: "lên plan · review", tone: "apricot" },
    { code: "CX", name: "Codex", role: "viết code · test", tone: "mint" },
    { code: "GM", name: "Gemini", role: "dựng giao diện", tone: "iris" },
    { code: "PI", name: "Pi", role: "việc lặt vặt", tone: "mono" },
];

export const hubSteps = ["chia việc", "kiểm chéo", "bàn giao"];

export const agentLog = [
    { t: "09:12", who: "codex", what: "build + test", res: "✓ pass", ok: true },
    { t: "09:15", who: "claude", what: "review thay đổi", res: "2 góp ý" },
    { t: "09:21", who: "gemini", what: "kiểm tra trên trình duyệt", res: "✓ 0 lỗi", ok: true },
    { t: "09:23", who: "hub", what: "ghi nhật ký · chờ duyệt", res: "✓", ok: true },
];
