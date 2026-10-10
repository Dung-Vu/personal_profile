# v2 — Nháp số liệu & nội dung case (P0)

> Soạn 10/10/2026 từ git + nhật ký làm việc. Nguyên tắc sếp chốt: **không đưa dự án của công ty**; số liệu chỉ ở mức "vừa đủ" — làm tròn, tổng hợp, không lộ dữ liệu khách/nội bộ.
> Ký hiệu: ✅ dùng được ngay · ⚠️ cần sếp xác nhận (số gần đúng hoặc hơi sâu) · ✏️ sếp bổ sung nếu muốn.

## Số tổng (dải số liệu ở trang chủ)

| Số | Ý nghĩa | Trạng thái |
|---|---|---|
| **15+** | hệ thống & tool nội bộ đã dựng trong 2026 | ✅ |
| **6** | hệ thống đang chạy production hằng ngày | ⚠️ (EVOne, TCA, Reminder Hub, ACE, Odoo, Tuyển dụng) |
| **2.000+** | commit trong 2026 (EVOne + TCA + ACE + Reminder Hub) | ✅ |
| **9.000+** | test tự động bảo vệ các hệ thống | ✅ |

## Case chính (6)

### 1. Odoo Bonario — Vận hành doanh nghiệp
- **Bài toán:** quy trình bán hàng, kho, helpdesk chạy trên Odoo nhưng nhiều thao tác tay, báo cáo rời rạc.
- **Đã làm:** tự động hoá thông báo đơn hàng, chuẩn hoá báo cáo, đồng bộ serial RFID, in label phiếu nhập kho, bot kiểm kho RFID, xử lý helpdesk nội bộ.
- **Số hiển thị:** 30+ phiếu helpdesk & task vận hành xử lý từ 07/2026 ⚠️ · 5 tool vệ tinh nối với Odoo ✅
- **Che:** tên khách, giá, cấu hình rule cụ thể.

### 2. EVOne — ERP cho chuỗi showroom xe điện
- **Bài toán:** chuỗi showroom quản lý bán hàng, kho xe, công nợ trả góp bằng sổ sách và Excel.
- **Đã làm:** ERP riêng: bán hàng, kho theo số khung/số máy, công nợ trả góp, VietQR động, làm việc offline.
- **Số hiển thị:** 1.400+ commit trong 3 tháng ✅ · 8.000+ test tự động ✅ · quản lý 1.700+ xe ⚠️ (dữ liệu khách — sếp quyết có hiện không)
- **Che:** doanh thu, số khách, công nợ.

### 3. ACE — Thay file Excel macro bằng web-app ra tem rèm
- **Bài toán:** xưởng ra tem rèm bằng file Excel macro: chậm, dễ sai công thức.
- **Đã làm:** form khách tự điền số đo → xưởng bổ sung thông số → tính công thức → in tem PDF 18 tem/trang.
- **Số hiển thị:** 47/47 ca kiểm thử công thức khớp với sản xuất thật ✅ · 18 tem/trang A4 có đường cắt ✅ · ✏️ thời gian ra tem trước/sau (nếu sếp có)

### 4. Reminder Hub — Bot nhắc việc trên Zalo & WhatsApp
- **Bài toán:** việc giao trong nhóm chat bị trôi, không ai theo dõi deadline.
- **Đã làm:** bot đọc hội thoại, AI nhận diện giao việc + deadline, tự nhắc và báo quá hạn; dashboard quản trị.
- **Số hiển thị:** 2 nền tảng chat ✅ · chạy production từ 09/2026 ✅ · 130+ test ✅ · ✏️ số việc đã nhắc (nếu muốn)

### 5. TCA v4 — Phân tích thị trường Binance Futures
- **Bài toán:** đọc thị trường crypto cần nhiều nguồn, tín hiệu nhiễu.
- **Đã làm:** thu thập dữ liệu, tính đặc trưng, chấm xác suất, ra tín hiệu kèm entry/SL/TP và theo dõi kết quả thật.
- **Số hiển thị:** đang chạy live tại tca.bonstu.site ✅ · 500+ commit từ 02/2026, đã qua 4 phiên bản ✅
- **Che:** tài khoản, vị thế, lợi nhuận.

### 6. AI Operator — Làm việc cùng đội AI agent
- **Bài toán:** dùng AI code nhanh nhưng dễ sai, mất ngữ cảnh giữa các phiên.
- **Đã làm:** quy trình nhiều agent (Claude Code, Codex, Gemini…) có bộ nhớ chung, chia việc, kiểm tra chéo bằng test/build/browser trước khi bàn giao; dashboard điều phối quota.
- **Số hiển thị:** 4+ AI agent phối hợp ✅ · nhật ký làm việc liên tục 3+ tháng ✅
- **Đây là "vũ khí" xuyên suốt** — giải thích vì sao 1 người làm được khối lượng ở trên.

## "Và còn nữa" (thẻ nhỏ, 1 dòng mỗi cái)

- Nền tảng đánh giá tuyển dụng 2 vòng cho 10 phòng ban ✅
- Bot kiểm kho RFID: gửi file quét → nhận đối soát với Odoo ✅
- Meeting Recap: audio → biên bản họp + action items ✅
- Ops Hub: kiểm tra sức khoẻ & bản quyền máy trạm ✅

## Cần sếp trả lời (ngắn)

1. Các mục ⚠️: giữ, bỏ hay làm tròn hơn?
2. Có muốn thêm số ✏️ nào không? Không có cũng được — case vẫn đứng vững bằng mô tả.
