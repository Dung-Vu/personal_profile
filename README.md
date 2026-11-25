# Personal Website — Vũ Đình Dũng (v3)

Profile cá nhân song ngữ **Việt / Anh** tại [profile.bonstu.site](https://profile.bonstu.site): Vite 7 + React 19, CSS thuần, prerender tĩnh 21 route lên Cloudflare Pages (kèm Cloudflare Pages Function `/api/brief` gửi yêu cầu về Telegram), câu chuyện cuộn 4 chương không phụ thuộc thư viện video/animation ngoài, công cụ tính công thức rèm trực tiếp ở case ACE và bộ khảo sát vận hành 60 giây.

## Tính năng chính (v3)

- **Song ngữ VI / EN toàn trang (21 route prerender + `hreflang`)**: 10 route tiếng Việt (`/`, `/work`, `/work/<slug>`, `/about`, `/contact`), 10 route tiếng Anh tương ứng (`/en`, `/en/work`, `/en/work/<slug>`, `/en/about`, `/en/contact`) và `/404`. Mỗi route đều có `<html lang>`, `og:locale` (`vi_VN` / `en_US`), `<link rel="alternate" hreflang="vi|en|x-default">`, JSON-LD đúng ngôn ngữ và View Transitions API khi chuyển trang (tự tắt khi bật `prefers-reduced-motion`).
- **Công thức tính rèm trực tiếp (`ACE Ra Tem`)**: chạy trực tiếp trên trình duyệt (lazy-load riêng cho case `ace-ra-tem`) cho phép đổi kích thước, kiểu may, độ nhún, khổ vải để xem khổ cắt, số khoen và tem xưởng tính theo công thức thật.
- **Business ↔ Technical Lens**: nút chuyển góc nhìn Doanh nghiệp / Kỹ thuật ngay trong trang chi tiết từng dự án (`project.tech`: stack, kiến trúc, kiểm thử tự động, an toàn & rollback).
- **60-Second Ops Diagnostic (`#khao-sat-60s`) + gửi yêu cầu trực tiếp `/api/brief` → Telegram**: khảo sát 4 bước tính số giờ thao tác tay/tháng minh bạch theo công thức, gợi ý lộ trình và 2 dự án gần nhất, điền sẵn vào biểu mẫu 4 ý và gửi thẳng về Telegram qua Cloudflare Pages Function (có sẵn cơ chế fallback mượt về Zalo / Email khi chưa cấu hình bot hoặc mất kết nối).
- **In hồ sơ tóm tắt 1 trang PDF (`PrintSummary`)**: nút **Tải hồ sơ tóm tắt (PDF)** trên trang Cách làm gọi `window.print()`, hiển thị bản tóm tắt A4 gọn gàng chỉ trong `@media print` (`src/styles/print.css`).
- **Khối nhận xét khách hàng (`testimonials`)**: hỗ trợ sẵn ở `src/content/trust.js` và `src/content/en/trust.js`; mặc định để `[]` (ẩn sạch không tạo khung rỗng) cho tới khi thêm lời nhận xét thật.

## Chạy cục bộ

```bash
pnpm install
pnpm dev            # http://127.0.0.1:5173
pnpm build          # sinh sitemap + build client/SSR + prerender 21 route vào dist/
pnpm preview        # xem dist/ ở http://127.0.0.1:4173
```

`pnpm build` gồm 4 bước, không cần trình duyệt nên chạy mượt trên Cloudflare Pages:

1. `node scripts/generate_sitemap.mjs` — sinh `public/sitemap.xml` (20 route indexable kèm `xhtml:link hreflang`).
2. `vite build` — bundle client (có manifest).
3. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` — bản render phía server.
4. `node scripts/prerender.mjs` — render 21 route (`index.html`, `en.html`, `work.html`, `en/work.html`, `work/<slug>.html`, `en/work/<slug>.html`, ..., `404.html`), chèn `<html lang>`, title/description/canonical/`hreflang`/OG/JSON-LD và CSS/preload riêng cho từng trang.

## Cấu hình `/api/brief` → Telegram (Cloudflare Pages Function)

Endpoint `POST /api/brief` nằm tại `functions/api/brief.js` (thuần Web Fetch API ESM, kiểm tra `Origin`, `Content-Type`, giới hạn payload `<= 8192` byte, honeypot `website`, timing check và HTML-escape sạch trước khi gọi Telegram Bot API).

### 1. Chạy thử cục bộ với Wrangler

```bash
cp .dev.vars.example .dev.vars
# Điền TELEGRAM_BOT_TOKEN và TELEGRAM_CHAT_ID vào .dev.vars (đã được .gitignore)
pnpm build
npx wrangler pages dev dist
```

### 2. Cấu hình trên Cloudflare Pages (Production & Preview)

Vào **Cloudflare Dashboard → Workers & Pages → `personal-profile` → Settings → Environment variables**, thêm 2 biến dạng **Encrypted (Secret)**:

- `TELEGRAM_BOT_TOKEN` — token bot lấy từ `@BotFather`.
- `TELEGRAM_CHAT_ID` — ID tài khoản hoặc nhóm Telegram nhận thông báo yêu cầu.

Khi chưa cấu hình 2 biến này, `/api/brief` trả `503 { ok: false, fallback: true, reason: "not_configured" }` và giao diện tự động mở khung nội dung đã soạn sẵn kèm nút **Chép & mở Zalo** / **Gửi qua email** để không mất dữ liệu người dùng.

## Sửa nội dung & nhận xét khách hàng

Toàn bộ nội dung song ngữ tập trung trong `src/content/` (tiếng Việt), `src/content/en/` (tiếng Anh) và được nối thống nhất qua `src/content/index.js`:

| File | Nội dung |
| --- | --- |
| `src/content/index.js` | Bộ nạp song ngữ (`getSiteContent`, `getProjectsContent`, `getStoryContent`, `getClipsContent`, `getAboutContent`, `getTrustContent`) |
| `site.js` / `en/site.js` | Tên, vai trò, liên hệ, số liệu trang chủ, mẫu yêu cầu và toàn bộ chuỗi `ui` |
| `projects.js` / `en/projects.js` | 6 dự án: thẻ, chi tiết, trước → sau, số liệu, góc nhìn kỹ thuật (`tech`), danh mục bổ sung |
| `clips.js` / `en/clips.js` | Clip minh hoạ luồng thật ở trang chi tiết dự án (dữ liệu đã thay/che) |
| `story.js` / `en/story.js` | Câu chuyện 4 chương ở trang chủ & nhãn thanh nhảy chương |
| `about.js` / `en/about.js` | Trang Cách làm (nguyên tắc, chặng đường, bộ công cụ) |
| `trust.js` / `en/trust.js` | Quy trình hợp tác, cam kết an toàn dữ liệu, hỏi đáp và mảng `testimonials` |

- **Thêm nhận xét khách hàng thật**: thêm phần tử `{ quote, who, org, metric? }` vào mảng `testimonials` trong `src/content/trust.js` và `src/content/en/trust.js`.
- **Cập nhật ảnh OG**: nếu đổi tên/số liệu dự án, chạy lại `node scripts/gen_og.mjs` để sinh ảnh share trong `public/og/`.

## Cấu trúc chính

- `functions/api/brief.js` — Cloudflare Pages Function nhận yêu cầu 4 ý và gửi Telegram.
- `src/routes/siteRoutes.js` — nguồn sự thật duy nhất cho 21 route song ngữ, `ROUTE_MODULES`, `hreflang`, meta SEO và JSON-LD.
- `src/lib/i18n.js`, `src/lib/router.jsx`, `src/lib/meta.js` — phát hiện/đổi ngôn ngữ theo URL, router hỗ trợ View Transitions API, đồng bộ `<head>` & `hreflang`.
- `src/App.jsx` — điều hướng song ngữ, `ErrorBoundary` song ngữ, lazy-load trang và `PrintSummary`.
- `src/components/sandboxes/` — công cụ tính công thức rèm trực tiếp cho `ace-ra-tem` (`CaseSandbox`, `AceLabelSandbox`), `OpsDiagnostic`, `Testimonials`.
- `src/sections/`, `src/film/` — Hero, câu chuyện 4 chương kèm thanh nhảy chương trên cả bản phim cuộn và bản tĩnh.
- `public/_headers` — header bảo mật (CSP gồm `connect-src 'self'; media-src 'self'`, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) và chính sách cache.

## QA

```bash
pnpm qa:a11y                                   # axe WCAG 2.1 AA + kiểm tra lang/h1/landmarks (42 lượt: 21 route × mobile/desktop)
pnpm qa:perf                                   # LCP / CLS từng route (42 lượt: 21 route × mobile/desktop)
WIDTHS=360,768,1440,1920 node scripts/qa_shots.mjs http://127.0.0.1:4173 <thư-mục>        # toàn bộ VI + EN chính (thêm ALL_ROUTES=1 để chụp đủ 21 route)
node scripts/qa_clips.mjs http://127.0.0.1:4173 <thư-mục>                                # clip trang dự án (hỗ trợ LOCALE=en)
node scripts/qa_film.mjs http://127.0.0.1:4173 <thư-mục>                                 # phim cuộn trang chủ (hỗ trợ LOCALE=en)
```

Chuẩn "xong": Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95; 42/42 pass trên `qa:a11y` và `qa:perf`; JS tải lần đầu ở trang chủ < 250 KB; 0px tràn ngang từ `360px` → `1920px`; không lộ dữ liệu khách, token hay URL nội bộ.
