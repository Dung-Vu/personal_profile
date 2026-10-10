# P5 — Nháp khối "An toàn dữ liệu" và "Cách hợp tác"

Trạng thái: **ĐÃ ĐƯA LÊN** `/contact` (nội dung ở `src/content/trust.js`). Sếp giao em tự cân nhắc nên đã chỉnh so với nháp:
- Bỏ bảng giá, thay bằng một câu "báo sau khảo sát, chia giai đoạn, trả theo phần đã bàn giao".
- Cam kết AI viết lại cho đúng thực tế: "AI chỉ chạm dữ liệu thật khi được đồng ý, mọi thao tác có nhật ký" (bản nháp "AI không đọc dữ liệu khách" là sai).
- Bảo hành: "theo thời hạn ghi trong đề xuất", không chốt số tháng. Phản hồi: 1 ngày làm việc.

## Mẫu tin xin nhận xét (sếp gửi cho người dùng thật)

> Chào anh/chị, em đang làm trang giới thiệu công việc. Anh/chị cho em xin 1–2 câu về [EVOne / phần mềm ra tem / bot nhắc việc]: trước đây làm thế nào, giờ đỡ được gì? Em chỉ ghi chức danh (vd "Quản lý showroom"), không ghi tên nếu anh/chị không muốn.

Nhận được thì thêm vào `testimonials` trong `src/content/trust.js`, khối sẽ tự hiện.

---

Bản nháp gốc bên dưới để tham khảo.

Ký hiệu:
- `[XÁC NHẬN]`: đây là cam kết với khách, sếp phải xác nhận đúng với cách làm thật mới được đăng.
- `[SẾP ĐIỀN]`: chỗ còn thiếu số liệu.

Đề xuất vị trí đặt:
- Trang chủ: đặt bản rút gọn của khối "Cách hợp tác" (3 bước + một dòng chi phí), ngay trước khối Liên hệ.
- `/contact`: đặt bản đầy đủ của cả hai khối, phía trên checklist 4 ý.
- `/about`: thêm một dòng "Dữ liệu của anh/chị an toàn thế nào", trỏ sang `/contact#an-toan`.

---

## Khối 1 — Dữ liệu của anh/chị an toàn thế nào?

**Tiêu đề:** Dữ liệu của anh/chị ở yên chỗ của anh/chị.

**Dẫn:** Mình làm việc với số liệu bán hàng, kho, công nợ của doanh nghiệp, nên cách giữ dữ liệu được nói rõ từ đầu, không đợi khách hỏi.

1. **Làm trên bản sao, không làm trên dữ liệu thật.** Khi phát triển và kiểm thử, mình dùng bản sao đã che, hoặc dữ liệu giả có cùng cấu trúc. `[XÁC NHẬN]`
2. **AI không đọc dữ liệu khách hàng.** Trợ lý AI chỉ làm việc với mã nguồn và dữ liệu giả. Tên khách, số điện thoại, số tiền thật không được đưa vào công cụ AI. `[XÁC NHẬN]`
3. **Quyền vừa đủ, thu hồi khi xong.** Mình chỉ xin quyền truy cập cần cho việc đang làm, dùng tài khoản riêng có nhật ký. Bàn giao xong, anh/chị khoá lại.
4. **Có thể ký cam kết bảo mật (NDA)** trước buổi khảo sát nếu anh/chị cần. `[XÁC NHẬN]`
5. **Mã nguồn thuộc về anh/chị.** Bàn giao đủ mã nguồn, tài liệu và cách vận hành. Không khoá khách vào mình. `[XÁC NHẬN]`

**Hỏi đáp ngắn (đặt ngay dưới khối):**
- *Code do AI viết thì ai chịu trách nhiệm?*
  Mình. AI là công cụ, giống như máy tính bỏ túi của kế toán. Mọi thay đổi đều phải qua kiểm thử tự động và qua mình duyệt trước khi tới tay anh/chị. Lỗi do mình làm ra thì mình sửa, trong thời gian bảo hành `[SẾP ĐIỀN: ví dụ 3 tháng]`.
- *Nếu sau này không làm với Dũng nữa thì sao?*
  Anh/chị giữ toàn bộ mã nguồn và tài liệu. Một lập trình viên khác đọc là tiếp tục được, vì mọi thay đổi đều có ghi chép.

---

## Khối 2 — Cách hợp tác

**Tiêu đề:** Từ tin nhắn đầu tiên tới hệ thống chạy thật.

| Bước | Nội dung | Khách mất gì |
| --- | --- | --- |
| 1. Gửi yêu cầu | 4 ý ngắn: việc đang làm thế nào, chỗ đau, kết quả mong muốn, hệ thống sẵn có | 10 phút |
| 2. Mình phản hồi | Trả lời trong **24 giờ làm việc** `[XÁC NHẬN]` | — |
| 3. Buổi khảo sát | **30–60 phút, miễn phí**, gọi online hoặc gặp trực tiếp. Mình xem quy trình thật, nói thẳng nên làm hay không | 1 buổi |
| 4. Đề xuất bằng văn bản | Phạm vi, cái gì *không* làm, thời gian, chi phí chia theo giai đoạn | — |
| 5. Làm theo đợt | Mỗi đợt 1–2 tuần, cuối đợt có bản chạy được để anh/chị dùng thử | 30 phút góp ý mỗi đợt |
| 6. Bàn giao | Hướng dẫn người dùng, tài liệu, bảo hành `[SẾP ĐIỀN]`; cần thì hỗ trợ theo tháng | — |

**Hình thức:**
- **Trọn gói theo dự án.** Hợp với việc đã rõ phạm vi, ví dụ thay một file Excel bằng phần mềm.
- **Theo tháng.** Hợp với việc vận hành và cải tiến liên tục, ví dụ Odoo đang chạy cần chỉnh dần.
- **Tư vấn theo buổi.** Khi anh/chị chỉ cần người đọc quy trình và chỉ ra nên làm gì.

**Chi phí tham khảo.** `[SẾP ĐIỀN / DUYỆT]` Số dưới đây là **gợi ý của em** theo mặt bằng freelance trong nước, sếp chỉnh lại theo giá thật:

| Loại việc | Ví dụ trong profile | Thời gian | Từ |
| --- | --- | --- | --- |
| Công cụ nhỏ | Bot nhắc việc, báo cáo tự động, in tem/label | 1–3 tuần | ~10–30 triệu |
| Phần mềm thay Excel cho một quy trình | ACE ra tem | 3–6 tuần | ~30–80 triệu |
| Hệ thống nhiều phân hệ | EVOne | 2–4 tháng | ~150 triệu+ |
| Odoo vận hành và cải tiến theo tháng | Odoo Bonario | theo tháng | ~8–15 triệu/tháng |

Dòng chốt dưới bảng: *"Giá cụ thể sau buổi khảo sát. Nếu việc của anh/chị chỉ cần chỉnh lại Excel hoặc Odoo có sẵn, mình sẽ nói thẳng, không bán thêm."*

**Ý kiến của em về việc công khai giá:** nên công khai mức "từ…". Khách Việt ngại hỏi giá trước; có mốc thì họ tự lọc, và người gửi yêu cầu là người đã chấp nhận mức đó. Nếu sếp chưa muốn lộ số, thay cả bảng bằng một câu: *"Dự án nhỏ nhất thường bắt đầu từ vài chục triệu, chia theo giai đoạn, trả theo phần đã bàn giao."*

---

## Sếp cần chốt

1. Năm cam kết dữ liệu có đúng với cách sếp đang làm không, đặc biệt điểm 2 (AI không đọc dữ liệu khách).
2. Thời gian phản hồi (24 giờ?) và thời gian bảo hành.
3. Có công khai bảng giá không. Nếu có thì giữ hay chỉnh các mức em gợi ý.
4. Có nhận ký NDA không.
