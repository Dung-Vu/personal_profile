# Personal Profile v2 — Kế hoạch nâng cấp

> Soạn 10/10/2026. Trạng thái: **bản nháp chờ sếp duyệt**. Chưa sửa code.

## 1. Vì sao cần v2

- Nội dung dừng ở tháng 5/2026: định vị "build web app / dashboard", 3 case (TCA cũ, Product Hub, AI workflow).
- 5 tháng qua đã làm nhiều việc lớn hơn nhưng web chưa nhắc tới: hệ sinh thái Odoo ở Bonario, EVOne (ERP chuỗi xe điện), ACE ra tem (thay Excel macro), Reminder Hub (bot nhắc việc Zalo/WhatsApp), TCA v4 (đang chạy live), cách làm việc với nhiều AI agent (memory-agent, GPT Quota Hub).
- Code v1 phình to (~6.500 dòng JSX, ~15.000 dòng CSS, Lab shell, command panel, custom cursor…), sửa nội dung khó. v2 làm **gọn lại**, nội dung tách khỏi giao diện.

## 2. Định vị mới (nháp, sếp sửa chữ)

**Vũ Đình Dũng — Operations Systems Builder**
Odoo · Internal tools · AI agents

> "Mình biến cách doanh nghiệp đang vận hành thành hệ thống chạy được — rồi để AI gánh phần lặp lại."

Thông điệp xuyên suốt: _đọc đúng quy trình thật → dựng hệ thống → để AI vận hành → kiểm chứng bằng dữ liệu thật._
Người đọc mục tiêu: chủ doanh nghiệp vừa/nhỏ, quản lý vận hành, đội tuyển dụng tech.

## 3. Quyết định chính

| Hạng mục | Quyết định | Lý do |
|---|---|---|
| Stack | Giữ Vite + React 19 + Cloudflare Pages; thêm `remotion` + `@remotion/player` | Không đổi hạ tầng, deploy như cũ |
| Code | Dựng v2 mới trên nhánh `v2`, chỉ mang sang những gì còn dùng | Bỏ phần phình to của v1, nội dung tách vào `src/content/` |
| Remotion | Chỉ dùng cho **2–3 cảnh "phim cuộn"** quan trọng, không biến cả trang thành video | Chữ vẫn là HTML thật: Google đọc được, điện thoại nhẹ, người khiếm thị đọc được |
| Hiệu ứng còn lại | CSS + GSAP nhẹ | Đủ đẹp, nhẹ hơn |
| Ngôn ngữ | Tiếng Việt trước; tiếng Anh ở giai đoạn sau | Ra bản chạy sớm |
| Bảo mật nội dung | Tên khách hàng/người thật mặc định ẩn ("chuỗi showroom xe điện", "xưởng rèm") cho tới khi sếp duyệt | Nhiều dự án là nội bộ Bonario/khách hàng |
| Giảm chuyển động | Người bật `prefers-reduced-motion` thấy ảnh tĩnh của từng cảnh | Giữ chuẩn như v1 |

### Vì sao Remotion hợp cho "phim cuộn"

Một cảnh Remotion là hàm của số khung hình → cuộn tới đâu, tua tới khung đó (`playerRef.seekTo`), cuộn ngược thì tua ngược, không lệch. Cùng một cảnh đó, sau này xuất ra MP4 có nhạc + thuyết minh cho clip giới thiệu mà **không phải dựng lại**.

## 4. Cấu trúc trang v2

**Trang chủ = một câu chuyện 5 chương, cuộn để xem**

1. **Hỗn loạn** _(cảnh Remotion)_ — tin nhắn Zalo, file Excel, phiếu giấy trôi lộn xộn → cuộn xuống thì chúng hút vào thành các chấm hạt (giữ chất "signal" của v1).
2. **Đọc hệ thống** — chấm hạt xếp thành sơ đồ quy trình; 4 bước làm việc (Đọc → Dựng giao diện → Build → Kiểm chứng).
3. **Dựng lại** _(cảnh Remotion)_ — sơ đồ biến thành các hệ thống thật: Odoo, ERP, tool ra tem, bot nhắc việc; số liệu đếm lên.
4. **AI vận hành** _(cảnh Remotion)_ — nhiều agent nhận việc, làm, kiểm tra chéo, báo kết quả.
5. **Kết quả + liên hệ** — các dự án tiêu biểu, nút gửi brief.

**Trang khác:** `/work` (danh sách dự án lọc theo nhóm) · `/work/:slug` (chi tiết: bài toán → cách làm → kết quả → bằng chứng đã che dữ liệu) · `/about` (con người, timeline) · `/contact`.

**Nhóm dự án (dự kiến 6 case):**

| Nhóm | Dự án |
|---|---|
| Vận hành doanh nghiệp trên Odoo | Odoo Bonario (helpdesk, báo cáo, tồn kho, serial RFID, in label) |
| ERP riêng theo ngành | EVOne — chuỗi showroom xe điện |
| Thay Excel bằng web-app | ACE — tính rèm và ra tem |
| Bot tự động hoá | Reminder Hub — nhắc việc Zalo/WhatsApp |
| Nền tảng nội bộ | Đánh giá tuyển dụng 2 vòng (10 phòng ban) |
| Dữ liệu & AI | TCA v4 (live) · hệ AI agent làm việc nhóm (memory-agent, GPT Quota Hub) |

## 5. Lộ trình

| Giai đoạn | Nội dung | Ai duyệt | Kết quả |
|---|---|---|---|
| **P0 Nội dung** | Viết định vị, copy 5 chương, 6 case (bản che dữ liệu) | Sếp duyệt chữ + quyết định tên nào được hiện | `src/content/` mới |
| **P1 Khung** | Nhánh `v2`, design system (màu, font, khoảng cách), layout, router, nội dung thật đổ vào | Sếp xem trên máy | Web chạy được, chưa có phim |
| **P2 Phim cuộn** | 3 cảnh Remotion gắn cuộn chuột + bản tĩnh cho mobile/giảm chuyển động | Sếp xem | Trang chủ hoàn chỉnh |
| **P3 Dự án** | 6 trang case + ảnh/clip bằng chứng đã che dữ liệu | Sếp duyệt từng case | `/work` đầy đủ |
| **P4 Hoàn thiện** | SEO, ảnh share, tốc độ, kiểm tra mobile/a11y, preview Cloudflare | Sếp duyệt preview | Lên `profile.bonstu.site` |
| **P5 Clip giới thiệu** | Ghép các cảnh thành clip ~60s + nhạc + thuyết minh, xuất MP4 | Sếp duyệt | Clip cho web + LinkedIn |
| P6 (tuỳ chọn) | Bản tiếng Anh | — | — |

## 5b. Chuẩn chất lượng (sếp chốt 10/10: demo chỉ để thử cảm giác, bản thật phải chỉn chu)

**Giá trị cho người xem — kiểm bằng "bài test 10 giây":** khách lạ vào trang trong 10 giây phải trả lời được: _người này là ai, làm được gì cho mình, bằng chứng đâu, liên hệ thế nào._ Không đạt thì sửa nội dung trước, không bù bằng hiệu ứng.

- Mỗi case có **trước → sau đo được** (số thật: thời gian ra tem, số phiếu helpdesk xử lý, số module…), lấy từ dữ liệu thật; không bịa số. Thiếu số thì ghi định tính, không phóng đại.
- Mỗi chương phim phải nói **một ý**; chương nào không thêm ý thì cắt.
- Lời kêu gọi rõ: "Gửi brief" luôn trong tầm tay, kèm gợi ý cần gửi gì.

**Đẹp — làm theo quy trình thiết kế, không code mò:**
1. Chốt **styleframe** (ảnh tĩnh từng chương, cả desktop và mobile) → sếp duyệt rồi mới code.
2. Design system trước: thang chữ, lưới, khoảng cách, 3 tông màu, độ bo, bóng — dùng nhất quán.
3. Phim **dọc riêng cho mobile**, không thu nhỏ bản ngang.
4. Chi tiết nhỏ: chữ tiếng Việt không vỡ dòng xấu, không chữ mồ côi, ảnh nét trên màn hình Retina, trạng thái hover/focus/loading đầy đủ, chuyển trang mượt.
5. Mỗi giai đoạn có vòng **review chỉn chu**: chụp đủ 4 khung (360 / 768 / 1440 / 1920), so với styleframe, sửa tới khi khớp.

## 6. Tiêu chí "xong"

- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95.
- Trang chủ tải lần đầu < 250 KB JS (Remotion chỉ tải khi cuộn tới cảnh).
- Chạy mượt trên iPhone/Android tầm trung; không vỡ layout 360px → 1920px.
- Không lộ dữ liệu khách hàng, token, URL nội bộ.
- Mọi chữ trên web nằm trong `src/content/` — sửa nội dung không cần đụng code.

## 7. Cách triển khai

- Claude Code (Lee Sin): plan, viết prompt chi tiết từng giai đoạn, review, kiểm chứng.
- AGY `gemini-3.8-flash-high`: viết code từng giai đoạn **khi sếp cho phép**; mỗi giai đoạn trên nhánh `v2`, sếp xem rồi mới qua giai đoạn sau.
- Không đụng nhánh `main` / production cho tới P4.

## 8. Cần sếp chốt

1. Câu định vị ở mục 2 — đổi chữ thoải mái.
2. Danh sách tên được công khai: Bonario? EVOne/Showroom Đức Tâm? ACE? TCA?
3. Ảnh chân dung: dùng `avatar.jpg` hiện tại hay chụp/chọn ảnh mới.
