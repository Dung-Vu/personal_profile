# Image Generation Brief

> **Mục đích:** Danh sách toàn bộ hình ảnh cần gen/thay thế trong portfolio.  
> Tất cả file hiện có là **AI-generated placeholder** — không có ảnh thật của developer hay screenshot sản phẩm thực.  
> Đây là nội dung chặn lớn nhất về credibility.

---

## 1. Hero Background — `signal-workstation-hero-v2.webp`

| Trường                | Chi tiết                                                                                                                                                                                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**              | `/public/assets/signal-workstation-hero-v2.webp` (+ `.jpg`)                                                                                                                                                                                                       |
| **Dùng ở**            | `src/content/profile.js` → `HeroSection.jsx` (trang chủ Lab OS, hero toàn màn hình)                                                                                                                                                                               |
| **Kích thước render** | 100vw × 100vh, `object-fit: cover`, `object-position: center right`                                                                                                                                                                                               |
| **CSS overlay**       | Gradient trái sang phải: đậm 96% → nhạt 18%, nên phần trái bị che nhiều                                                                                                                                                                                           |
| **Mô tả cần**         | Không gian làm việc của developer: màn hình dual monitor hiển thị code/dashboard dark theme, bàn phím, ánh đèn màu lạnh (cyan/xanh teal). **Phần phải khung hình** cần visual rõ — phần trái bị gradient che. Không cần ảnh người, chỉ cần không gian + thiết bị. |
| **Tone màu**          | Dark, cold — nền `#07080b`, accent cyan `#5ee7ff`, không dùng warm tone                                                                                                                                                                                           |
| **Ảnh hiện tại**      | Placeholder AI — `signal-workstation-hero-v2.webp` 78 KB / `.jpg` 221 KB                                                                                                                                                                                          |

---

## 2. Lab Hero Background — `signal-hero-generated-1536.webp`

| Trường                | Chi tiết                                                                                                                                                                                |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**              | `/public/assets/signal-hero-generated-1536.webp`                                                                                                                                        |
| **Dùng ở**            | `src/components/lab/LabHomeSection.jsx` (trang Lab archive, hero full-screen)                                                                                                           |
| **Kích thước render** | 100vw × 100vh, cùng CSS overlay như hero chính                                                                                                                                          |
| **Mô tả cần**         | Terminal/code interface dark: màn hình hiển thị log output, ASCII art, signal waveform hoặc oscilloscope UI. Vibe "motion lab / archived experiment". Thiên về abstract hơn hero chính. |
| **Tone màu**          | Dark với accent xanh lá `#b8ff6a` hoặc cyan                                                                                                                                             |
| **Ảnh hiện tại**      | Placeholder AI — `signal-hero-generated-1536.webp` 58 KB / `.jpg` 143 KB                                                                                                                |

---

## 3. Identity / About Portrait — `signal-about-dossier.webp`

| Trường                | Chi tiết                                                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**              | `/public/assets/signal-about-dossier.webp` (+ `.jpg`)                                                                                                                                                                           |
| **Dùng ở**            | `src/components/sections/IdentitySection.jsx` (Home OS, phần About trong trang chính)                                                                                                                                           |
| **Kích thước render** | Panel trái ~`minmax(18rem, 0.38fr)`, `object-fit: cover` trong portrait panel có overlay gradient                                                                                                                               |
| **CSS overlay**       | Overlay tối ở đáy + border cyan mờ                                                                                                                                                                                              |
| **Mô tả cần**         | **Ưu tiên nhất:** Ảnh thật của developer (Vũ Đình Dũng) — ngồi làm việc với laptop, dark background, ánh đèn màu lạnh. Hoặc nếu không có ảnh thật: ảnh workspace gọn gàng có "dossier" feel — sổ tay, laptop, ghi chú kỹ thuật. |
| **Alt text hiện tại** | `"Developer workspace dossier with interface sketches and signal maps."`                                                                                                                                                        |
| **Tone màu**          | Warm amber `#ffcf8a` (trang About dùng `--about-accent: #ffcf8a`)                                                                                                                                                               |
| **Ảnh hiện tại**      | Placeholder AI ~74KB — **ảnh thật của developer sẽ tăng trust cao nhất**                                                                                                                                                        |

---

## 4. Case Study — TCA Crypto Analyzer — `signal-case-tca-dashboard.webp`

| Trường                | Chi tiết                                                                                                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **File**              | `/public/assets/signal-case-tca-dashboard.webp` (+ `.jpg`)                                                                                                                                                                                             |
| **Dùng ở**            | `WorkPage.jsx` (card preview), `CaseDetailPage.jsx` (artifact panel)                                                                                                                                                                                   |
| **Kích thước render** | Card: `minmax(18rem, 0.72fr)` chiều cao tối thiểu 18rem. Detail: aside panel trong grid 2 cột                                                                                                                                                          |
| **Mô tả cần**         | **Screenshot thật của TCA dashboard** (sanitized — xóa account info/API key). Hiển thị: chart crypto, bảng signal, số liệu biến động. Dark theme, cyan accent. Nếu chưa có ảnh thật: mockup dashboard có candlestick chart + signal list rõ hierarchy. |
| **Tone màu**          | Cyan `#5ee7ff` — `--case-accent: #00d4ff`                                                                                                                                                                                                              |
| **Ảnh hiện tại**      | Placeholder AI — `signal-case-tca-dashboard.webp` 88 KB / `.jpg` 240 KB — **credibility blocker số 1**                                                                                                                                                 |

---

## 5. Case Study — Bonario Product Hub — `signal-case-bonario-hub.webp`

| Trường                | Chi tiết                                                                                                                                                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**              | `/public/assets/signal-case-bonario-hub.webp` (+ `.jpg`)                                                                                                                                                                                              |
| **Dùng ở**            | `WorkPage.jsx`, `CaseDetailPage.jsx`                                                                                                                                                                                                                  |
| **Kích thước render** | Như TCA ở trên                                                                                                                                                                                                                                        |
| **Mô tả cần**         | **Screenshot thật của Bonario Hub** (sanitized — blur dữ liệu sản phẩm/giá). Hiển thị: admin panel, product list có status chips, search/filter bar. Amber/warm accent. Nếu chưa có: mockup admin dashboard với table + action buttons + sidebar nav. |
| **Tone màu**          | Amber `#ffca5f` — `--case-accent: #ffb84d`                                                                                                                                                                                                            |
| **Ảnh hiện tại**      | Placeholder AI — `signal-case-bonario-hub.webp` 74 KB / `.jpg` 221 KB — **credibility blocker số 2**                                                                                                                                                  |

---

## 6. Case Study — AI Operator Workflow — `signal-case-ai-workflow.webp`

| Trường                | Chi tiết                                                                                                                                                                                                              |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**              | `/public/assets/signal-case-ai-workflow.webp` (+ `.jpg`)                                                                                                                                                              |
| **Dùng ở**            | `WorkPage.jsx`, `CaseDetailPage.jsx`                                                                                                                                                                                  |
| **Kích thước render** | Như TCA ở trên                                                                                                                                                                                                        |
| **Mô tả cần**         | **Screenshot thật của terminal workflow**: Claude/Codex session, Windows Terminal với output MCP/CLI, VSCode với diff. Hoặc: collage 2-3 terminal windows — AI prompt, build output, browser QA result. Green accent. |
| **Tone màu**          | Green `#b8ff6a` / `#00c896` — `--case-accent: #00c896`                                                                                                                                                                |
| **Ảnh hiện tại**      | Placeholder AI — `signal-case-ai-workflow.webp` 85 KB / `.jpg` 239 KB — credibility blocker                                                                                                                           |

---

## 7. OG Image / Social Preview — `signal-workstation-hero-v2.jpg`

| Trường             | Chi tiết                                                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**           | `/public/assets/signal-workstation-hero-v2.jpg`                                                                                                             |
| **Dùng ở**         | `index.html` — `og:image`, `twitter:image` (cùng file với hero nhưng `.jpg`)                                                                                |
| **Kích thước cần** | **1200 × 630px** — kích thước chuẩn OG card cho Facebook/LinkedIn/Twitter                                                                                   |
| **Mô tả cần**      | Phiên bản landscape 1200×630 của hero image. Thêm overlay text nhỏ: "Vũ Đình Dũng — Web Developer" góc dưới trái. Safe zone: 80px từ mỗi cạnh (tránh crop). |
| **Ảnh hiện tại**   | `signal-workstation-hero-v2.jpg` 221 KB — tỉ lệ không đúng OG spec (cần crop/export lại ở 1200×630)                                                         |

---

## 8. Apple Touch Icon — `apple-touch-icon.png`

| Trường             | Chi tiết                                                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **File**           | `/public/assets/apple-touch-icon.png`                                                                                                                                          |
| **Dùng ở**         | `index.html` — `<link rel="apple-touch-icon">`                                                                                                                                 |
| **Kích thước cần** | **180 × 180px PNG**                                                                                                                                                            |
| **Mô tả cần**      | Icon "VD" trên nền tròn dark `#07080b` với gradient cyan→green border. Monogram "VD" màu `#9eefff`, font bold. **File này chưa tồn tại** — link trong HTML sẽ 404 đến khi tạo. |
| **Ảnh hiện tại**   | **Không có** (đã thêm link vào HTML nhưng chưa có file)                                                                                                                        |

---

## 9. ~~Không dùng~~ — Đã xóa (2026-04-30)

Tổng dung lượng giải phóng: **~834 KB**

| File                         | Lý do xóa                                                                   | Dung lượng |
| ---------------------------- | --------------------------------------------------------------------------- | ---------- |
| `signal-contact-intake.webp` | Không được reference sau khi `.contact-asset-frame` bị xóa khỏi contact.css | 70 KB      |
| `signal-contact-intake.jpg`  | Như trên                                                                    | 206 KB     |
| `figma-hero-small.jpg`       | Không được reference ở bất kỳ đâu trong codebase                            | 51 KB      |
| `figma-hero-tiny.jpg`        | Không được reference ở bất kỳ đâu trong codebase                            | 10 KB      |
| `photo-60.jpg`               | Stock photo Unsplash, không được reference                                  | 84 KB      |
| `photo-84.jpg`               | Stock photo Unsplash, không được reference                                  | 94 KB      |
| `photo-89.jpg`               | Stock photo Unsplash, không được reference                                  | 137 KB     |
| `photo-1067.jpg`             | Stock photo Unsplash, không được reference                                  | 181 KB     |

---

## Ưu tiên gen

| Thứ tự   | File                                       | Lý do                                         |
| -------- | ------------------------------------------ | --------------------------------------------- |
| 🔴 **1** | `apple-touch-icon.png`                     | File thiếu — 404 ngay bây giờ                 |
| 🔴 **2** | `signal-case-tca-dashboard.webp`           | Case study credibility — placeholder AI lộ rõ |
| 🔴 **3** | `signal-case-bonario-hub.webp`             | Case study credibility                        |
| 🔴 **4** | `signal-case-ai-workflow.webp`             | Case study credibility                        |
| 🟡 **5** | `signal-about-dossier.webp`                | Ảnh thật của developer >> AI placeholder      |
| 🟡 **6** | `signal-workstation-hero-v2.webp` + `.jpg` | Hero + OG image (OG cần đúng 1200×630)        |
| 🟢 **7** | `signal-hero-generated-1536.webp`          | Lab page — thấp priority nhất                 |

---

## Quy ước kỹ thuật

- **Format:** Xuất cả `.webp` (serve chính) và `.jpg` (fallback). HTML dùng `.webp` trực tiếp không có `<picture>`, nên `.jpg` chỉ là backup thủ công.
- **Nén:** webp quality 82–88 là tối ưu. Hero ≤ 200KB, case covers ≤ 150KB.
- **Đặt vào:** `/public/assets/` (không phải `src/assets/`) — Vite copy thẳng vào `/dist/assets/`.
- **Dark background:** Tất cả ảnh dùng trên nền `#07080b` nên ảnh có nền sáng sẽ bị lộ viền xấu. Ưu tiên ảnh nền tối hoặc transparent.
