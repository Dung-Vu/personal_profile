// Cách hợp tác, an toàn dữ liệu, hỏi đáp — hiện đầy đủ ở /contact, bản rút gọn ở khối Liên hệ.
// Chỉ ghi điều đang làm thật. Cam kết nào chưa chắc thì không đưa lên.

// Dòng cam kết ngắn ngay dưới nút liên hệ.
export const promise = ["Trả lời trong 1 ngày làm việc", "Buổi khảo sát 30–60 phút miễn phí", "Nói thẳng nếu không cần làm"];

export const collab = {
    label: "Cách hợp tác",
    title: "Từ tin nhắn đầu tiên tới hệ thống chạy thật.",
    steps: [
        { title: "Gửi yêu cầu", desc: "4 ý ngắn qua Zalo hoặc email: việc đang làm thế nào, chỗ đau, kết quả mong muốn, hệ thống sẵn có.", cost: "10 phút" },
        { title: "Buổi khảo sát", desc: "30–60 phút, miễn phí, gọi online hoặc gặp trực tiếp. Mình xem quy trình thật và nói thẳng nên làm hay không.", cost: "1 buổi" },
        { title: "Đề xuất bằng văn bản", desc: "Phạm vi, những gì không làm, thời gian và chi phí chia theo giai đoạn.", cost: "Đọc và chốt" },
        { title: "Làm theo đợt", desc: "Mỗi đợt 1–2 tuần, cuối đợt có bản chạy được để anh/chị dùng thử và góp ý.", cost: "30 phút mỗi đợt" },
        { title: "Bàn giao", desc: "Hướng dẫn người dùng, tài liệu vận hành, bảo hành sửa lỗi theo thời hạn ghi trong đề xuất.", cost: "—" },
    ],
    forms: [
        { title: "Trọn gói theo dự án", desc: "Khi phạm vi đã rõ, ví dụ thay một file Excel bằng phần mềm." },
        { title: "Theo tháng", desc: "Khi cần vận hành và cải tiến liên tục, ví dụ Odoo đang chạy cần chỉnh dần." },
        { title: "Tư vấn theo buổi", desc: "Khi chỉ cần người đọc quy trình và chỉ ra nên làm gì." },
    ],
    price: "Chi phí báo sau buổi khảo sát, chia theo giai đoạn, trả theo phần đã bàn giao. Việc chỉ cần chỉnh lại Excel hoặc Odoo có sẵn thì mình nói thẳng, không bán thêm.",
};

export const safety = {
    id: "an-toan",
    label: "Dữ liệu",
    title: "Dữ liệu của anh/chị ở yên chỗ của anh/chị.",
    lead: "Mình làm việc với số liệu bán hàng, kho, công nợ của doanh nghiệp, nên cách giữ dữ liệu được nói rõ từ đầu.",
    items: [
        { title: "Làm trên bản thử trước", desc: "Phát triển và kiểm thử trên bản sao hoặc dữ liệu giả. Chỉ đưa lên hệ thống thật khi đã chạy đúng." },
        { title: "Sao lưu trước mỗi thay đổi", desc: "Trước khi sửa dữ liệu thật luôn có bản sao lưu và cách quay lại." },
        { title: "AI chỉ chạm dữ liệu thật khi được đồng ý", desc: "Mặc định trợ lý AI làm trên mã nguồn và dữ liệu giả. Mọi thao tác trên hệ thống thật đều có nhật ký." },
        { title: "Quyền vừa đủ", desc: "Chỉ xin quyền cần cho việc đang làm. Xong việc, anh/chị thu hồi." },
        { title: "Mã nguồn thuộc về anh/chị", desc: "Bàn giao đủ mã nguồn và tài liệu. Có thể ký cam kết bảo mật (NDA) nếu cần." },
    ],
};

export const faq = {
    label: "Hỏi thẳng",
    items: [
        {
            q: "Code do AI viết thì ai chịu trách nhiệm?",
            a: "Mình. AI là công cụ, như máy tính của kế toán. Mọi thay đổi phải qua kiểm thử tự động và qua mình duyệt rồi mới tới tay anh/chị. Lỗi do mình làm ra thì mình sửa.",
        },
        {
            q: "Một người làm thì có kịp không?",
            a: "Mình nhận ít việc cùng lúc và nói rõ thời gian trong đề xuất. Đội trợ lý AI gánh phần lặp lại, nên một người vẫn làm được khối lượng như các dự án ở trang Dự án.",
        },
        {
            q: "Sau này không làm với Dũng nữa thì sao?",
            a: "Anh/chị giữ toàn bộ mã nguồn và tài liệu. Mọi thay đổi đều có ghi chép, lập trình viên khác đọc là làm tiếp được.",
        },
    ],
};

// Nhận xét của người dùng thật. Chỉ thêm khi đã được người đó đồng ý; mảng rỗng thì khối không hiện.
// Mẫu: { quote: "…", who: "Quản lý showroom", org: "Chuỗi showroom xe điện" }
export const testimonials = [];
