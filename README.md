# Personal Website — Vũ Đình Dũng

Profile cá nhân tại [profile.bonstu.site](https://profile.bonstu.site): Vite 7 + React 19, CSS thuần, kết hợp trình diễn câu chuyện cuộn nhẹ viết trực tiếp bằng React (không phụ thuộc thư viện video/animation ngoài).

## Chạy

```bash
pnpm install
pnpm dev            # http://127.0.0.1:5173
pnpm build          # sinh sitemap + build client/SSR + prerender mọi route vào dist/
pnpm preview        # xem dist/ ở http://127.0.0.1:4173
```

`pnpm build` gồm 4 bước, không cần trình duyệt nên chạy được trên Cloudflare Pages:

1. `node scripts/generate_sitemap.mjs` — sinh `public/sitemap.xml` từ danh sách route dùng chung.
2. `vite build` — bundle client (có manifest).
3. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` — bản render phía server.
4. `node scripts/prerender.mjs` — render từng route (bao gồm `404.html`) thành HTML tĩnh, chèn title/description/canonical/OG/JSON-LD riêng và CSS/preload của từng trang.

## Sửa nội dung

Phần lớn nội dung chính (thông tin cá nhân, dự án, câu chuyện, hợp tác, hỏi đáp) tập trung trong `src/content/`; một số nhãn giao diện cố định nằm trong component tương ứng.

| File | Nội dung |
| --- | --- |
| `site.js` | Tên, vai trò, liên hệ, số liệu trang chủ, mẫu yêu cầu |
| `projects.js` | 6 dự án: thẻ, chi tiết, năm thực hiện, số liệu, trước → sau, danh mục bổ sung |
| `clips.js` | Clip minh hoạ luồng thật ở trang chi tiết dự án (dữ liệu đã thay/che) |
| `story.js`, `about.js` | Câu chuyện 4 chương ở trang chủ, trang Cách làm |
| `trust.js` | Quy trình hợp tác, cam kết an toàn dữ liệu, hỏi đáp (trang Liên hệ & khối cuối trang) |

Đổi tên/số liệu dự án thì chạy lại `node scripts/gen_og.mjs` để sinh lại ảnh share trong `public/og/`.

## Cấu trúc

- `src/App.jsx` — điều hướng lazy-load theo route, bọc `ErrorBoundary`, đồng bộ meta và focus/thông báo chuyển trang.
- `src/routes/siteRoutes.js` — nguồn sự thật duy nhất cho danh sách route, module trang và meta SEO/JSON-LD, dùng chung cho app, sitemap và prerender.
- `src/sections/`, `src/film/` — trang chủ: hero, câu chuyện 4 chương và phim cuộn nhẹ theo tiến độ cuộn (lazy-load khi tới vùng xem, tự chuyển về bản tĩnh khi bật giảm chuyển động hoặc màn hình thấp).
- `src/components/CaseClip.jsx` — clip minh hoạ chạy một lần khi cuộn tới; cảnh cuối là bản tĩnh.
- `public/_headers` — header bảo mật (CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) và chính sách cache (`/static/*`, `/fonts/*.woff2` immutable; HTML luôn kiểm tra lại).

## QA

```bash
pnpm qa:a11y                                   # axe WCAG 2.1 AA, mobile + desktop
pnpm qa:perf                                   # LCP / CLS từng route
WIDTHS=360,768,1440,1920 node scripts/qa_shots.mjs http://127.0.0.1:4173 <thư-mục>
node scripts/qa_clips.mjs http://127.0.0.1:4173 <thư-mục>   # clip trang dự án
node scripts/qa_film.mjs                       # phim cuộn trang chủ
```

Chuẩn "xong": Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95; JS tải lần đầu ở trang chủ < 250 KB; không vỡ layout 360 → 1920px; không lộ dữ liệu khách, token, URL nội bộ.
