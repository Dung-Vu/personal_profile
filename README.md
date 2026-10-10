# Personal Website — Vũ Đình Dũng

Profile cá nhân tại [profile.bonstu.site](https://profile.bonstu.site): Vite 7 + React 19, CSS thuần, phim cuộn dựng bằng Remotion. Kế hoạch v2 ở `docs/V2_PLAN.md`.

## Chạy

```bash
pnpm install
pnpm dev            # http://127.0.0.1:5173
pnpm build          # build client + prerender mọi route vào dist/
pnpm preview        # xem dist/ ở http://127.0.0.1:4173
```

`pnpm build` gồm 3 bước, không cần trình duyệt nên chạy được trên Cloudflare Pages:

1. `vite build` — bundle client (có manifest).
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` — bản render phía server.
3. `scripts/prerender.mjs` — render từng route thành HTML tĩnh, chèn title/description/canonical/OG/JSON-LD riêng và CSS của trang lazy.

## Sửa nội dung

Mọi chữ nằm trong `src/content/` — sửa nội dung không cần đụng component.

| File | Nội dung |
| --- | --- |
| `site.js` | Tên, vai trò, liên hệ, số liệu trang chủ, brief |
| `projects.js` | 6 case: thẻ, chi tiết, số liệu, trước → sau |
| `clips.js` | Clip bằng chứng ở trang case (dữ liệu minh hoạ đã che) |
| `story.js`, `about.js` | Câu chuyện trang chủ, trang Cách làm |

Đổi tên/số liệu case thì chạy lại `node scripts/gen_og.mjs` để sinh lại ảnh share trong `public/og/`.

## Cấu trúc

- `src/App.jsx` — chọn trang theo route (trang phụ lazy-load), đồng bộ meta.
- `src/routes/siteRoutes.js` — danh sách route + meta SEO, dùng chung cho app, sitemap và prerender.
- `src/sections/`, `src/film/` — trang chủ: hero, câu chuyện 5 chương, phim cuộn Remotion (chỉ tải khi cuộn tới, có bản tĩnh khi giảm chuyển động).
- `src/components/CaseClip.jsx` — clip bằng chứng chạy một lần khi cuộn tới; cảnh cuối là bản tĩnh.
- `public/_headers` — cache: `/static/*` (file có hash) vĩnh viễn, HTML luôn kiểm tra lại.

## QA

```bash
pnpm qa:a11y                                   # axe WCAG 2.1 AA, mobile + desktop
pnpm qa:perf                                   # LCP / CLS từng route
WIDTHS=360,768,1440,1920 node scripts/qa_shots.mjs http://127.0.0.1:4173 <thư-mục>
node scripts/qa_clips.mjs http://127.0.0.1:4173 <thư-mục>   # clip trang case
node scripts/qa_film.mjs                       # phim cuộn trang chủ
```

Chuẩn "xong": Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95; JS tải lần đầu ở trang chủ < 250 KB; không vỡ layout 360 → 1920px; không lộ dữ liệu khách, token, URL nội bộ.
