# Personal Website — Vũ Đình Dũng

Vite + React 19 portfolio cho website, dashboard, internal tool và AI-assisted workflow. Hiện site có route `/`, `/about`, `/work`, `/work/:slug`, `/stack`, `/workflow`, `/contact`, `/lab`, và `/404`.

## Run

```powershell
npm install
npm run dev
```

Build production:

```powershell
npm run build
```

Optional scripts:

```powershell
npm run preview
npm run qa:mobile
npm run qa:layout
npm run prerender
npm run assets:generate
```

## Edit Content

Active copy/data nằm trong `src/content/`.

- `profile.js` - identity, links, hero image
- `projects.js` - 3 case study và detail data
- `about.js`, `stack.js`, `workflow.js`, `workflowPage.js`, `contactPage.js` - copy và data theo route
- `homePage.js` - active Home content cho hero meta, projects, destinations, và scene copy
- `homeStoryScenes.js` - legacy snapshot, không được runtime current import

## Architecture

- `src/App.jsx` - route switch, lazy load, per-route meta
- `src/routes/routes.js` - route registry và normalize path
- `src/pages/` - route pages
- `src/components/home2/` - current Home hero/interactive layer
- `src/components/lab/` - archive Signal OS shell
- `src/components/sections/` - shared section primitives
- `src/features/` - workflow, case theater, capability matrix, intake console
- `src/hooks/` - motion, routing, shell state, interaction helpers
- `src/styles/` - global CSS + route CSS

## Routes

| Path | Page | Use |
| --- | --- | --- |
| `/` | HomePage | Editorial home, case links, workflow and contact entry points |
| `/about` | AboutPage | Fit, beliefs, process, timeline |
| `/work` | WorkPage | 3 case studies |
| `/work/:slug` | CaseDetailPage | Deep case narrative |
| `/stack` | StackPage | Capability matrix |
| `/workflow` | WorkflowPage | 4-step delivery pipeline |
| `/contact` | ContactPage | Low-friction brief intake, email CTA, copyable brief sample |
| `/lab` | LabPage | Archived Signal OS shell |
| `/404` | NotFoundPage | Fallback |

## UX / Motion

- Home dùng GSAP ScrollTrigger cho desktop, fallback stacked cho mobile và reduced motion.
- Route navigation tôn trọng `prefers-reduced-motion`; same-route scroll dùng smooth only khi motion không bị reduce.
- Client route change focus chuyển về `#main-content`, không ép focus vào `h1` ở lần load đầu.
- Lab giữ experimental shell, command panel, cursor, presentation mode và signal canvas.
- Route meta update ở `src/App.jsx` cho title, description, canonical và social tags.
- `Ctrl/Cmd+K` mở command panel trong Lab shell.

## SEO / Sharing

- `public/sitemap.xml` liệt kê routes chính và case detail routes.
- `index.html` giữ OG/Twitter image, alt text và `color-scheme` cho browser UI sáng.

## Assets

Current art assets nằm trong `public/assets/` và đã được map vào runtime.

- `signal-workstation-hero-v2.webp` / `.jpg` - OG/social preview image, not preloaded on Home
- `signal-hero-generated-1536.webp` / `.jpg` - Lab archive hero
- `signal-about-dossier.webp` / `.jpg` - About portrait panel
- `signal-case-tca-dashboard.webp` / `.jpg` - TCA case art
- `signal-case-bonario-hub.webp` / `.jpg` - Bonario case art
- `signal-case-ai-workflow.webp` / `.jpg` - AI workflow case art
- `case-proof-tca.webp` - redacted TCA proof frame
- `case-proof-bonario.webp` - redacted Bonario proof frame
- `case-proof-ai-workflow.webp` - redacted AI workflow proof frame
- `apple-touch-icon.png` - present

See `docs/IMAGE_BRIEF.md` if you want regenerate any slot.

## Screenshots

Runtime screenshots live in `screenshots/`:

- `desktop-runtime.png`
- `mobile-runtime.png`
- `projects-scroll.png`
- `workflow-stack.png`

Fresh QA captures also live in `artifacts/layout-qa/`.
