# Check-In

Short-term live coordination for `personal-website`. Keep this file compact.

## Active Claims

| Owner | Task | Started | Status |
| :---- | :--- | :------ | :----- |
| none | - | - | idle |

## Completed Work (2026-05-09)

- Repositioned Home around one sharper promise: web app, dashboard, internal tool with clear flow/state/runtime proof
- Added Home proof strip and stronger bio proof block
- Reworked Work list into stronger case dossiers with status, deliverables and next-proof cues
- Rewrote Case Detail pages into evidence-first dossiers and moved proof higher in the page
- Rebuilt Contact into a clearer intake flow: email CTA, copyable brief sample, response contract, fit check
- Cleaned Stack, Workflow, About, Profile and project content to use one consistent voice
- Removed inflated unsourced outcome claims from project detail copy
- Updated route meta and `index.html` social/SEO copy to match new positioning
- Added canonical/social meta updates per route, sitemap, light browser theme metadata, and mobile polish for Contact/Stack/Workflow
- Added proof image assets, Home trust signal block, and decision-ledger sections for Work + Case Detail
- Swapped proof images to WebP and removed project-local PNG copies
- Aligned all three Case Detail pages back to the bright portfolio direction: light surfaces, softer accents, readable trade-off copy, and no dark editorial panels
- Replaced the three Case Detail hero cover assets with generated light-mode WebP covers:
  `signal-case-tca-dashboard.webp`, `signal-case-bonario-hub.webp`, `signal-case-ai-workflow.webp`
- Tightened Case Detail first-screen spacing and later normalized top padding with the other bright core routes
- Hid `.case-back-link` on desktop/tablet and kept it visible on mobile only (`<= 680px`)
- Added a second proof layer to each case: redacted flow screenshot panel with per-case flow steps and privacy-safe notes
- Added view-transition driven route navigation, with stronger Work -> Case detail motion
- Tightened `/contact` with a clearer fit strip and sharper response language
- Added `npm run assets:audit` and compressed `case-proof-ai-workflow.webp` down to 108.8KB
- Completed strict FE polish pass focused on premium UI/UX, copy, motion, accessibility, mobile spacing, route meta and perceived performance
- Moved Home proof/visual cue into mobile first fold and reduced Work first-card washed-out presentation
- De-emphasized `/lab` from the primary portfolio, added Lab skip link, and clarified archive messaging
- Removed unused Home preload for `signal-workstation-hero-v2.webp`; it now remains an OG/social image asset only
- Updated route navigation to respect `prefers-reduced-motion`, avoid View Transition under reduced motion, and focus `#main-content` after client navigation
- Fixed mobile menu scroll lock via `body.route-menu-open`
- Added `/404` route metadata and made unknown `/work/:slug` use 404 meta instead of Home meta
- Reduced mobile top whitespace on About, Work, Stack, Workflow, Contact, and Case Detail routes
- Fixed Case Detail mobile back-link contrast
- Added Git `safe.directory` for `D:/personal-website` so `git status` works in the Codex sandbox
- Pruned unused Home legacy/prototype source before the next website upgrade: old Signal OS Home components, dormant `homeStoryScenes` data, temporary design bundles, old login mockups, and recovered text dumps
- Restored desktop nav secondary labels so `Capabilities` and `Delivery loop` stay visible outside mobile, and kept the compact mobile nav behavior intact
- Added route graph links on Stack and Workflow footers so the site now pushes into Work and Contact from capability/process pages too
- Extended prerender output to include `/404` as both `dist/404.html` and `dist/404/index.html` for cleaner static-host fallback
- Centralized route/meta data in `src/routes/siteRoutes.js`, generated `public/sitemap.xml` from that registry, and kept App/prerender in sync from the same source
- Added proof-signal bands to Work cards and Case Detail pages so each case now carries one more visible verification layer
- Split heavy Lab subcomponents behind lazy imports so the archive shell stays lighter; `LabPage` chunk shrank while canvas/command/hud became separate chunks

## Completed Work (2026-05-10)

- Expanded project dossiers with `measuredImpact`, `beforeAfter`, `artifactGallery`, `qaEvidence`, `constraintsResolved`, and social preview images
- Reworked Work + Case Detail into fixed proof flow: Problem, Constraint, Decision, Artifact, Runtime proof, Result
- Added Contact presets for `Website`, `Dashboard`, and `Internal tool`, with preset-driven `mailto` subject/body and copy payload
- Centralized route SEO/schema data further in `src/routes/siteRoutes.js`, including JSON-LD, keywords, canonical, and robots per route
- Added `build:static`, `qa:perf`, and `qa:a11y` scripts with local browser harnesses
- Tightened route contrast and ARIA semantics after axe pass

## Verification

- `npm run build` passed
- `npm run prerender` passed
- `npm run qa:perf` passed
- `npm run qa:a11y` passed
- `npm run assets:audit` passed with zero WebP review candidates
- `python scripts\mobile_qa.py` passed across 70 configured route/viewport checks
- Manual browser check on `artifacts/layout-qa/home-1366x768.png` confirmed desktop nav labels now show `Capabilities` and `Delivery loop`
- `node -c scripts\prerender.cjs` passed after the 404 prerender update
- `npm run prerender` passed after syncing Chrome path handling and route registry
- `npm run assets:audit` now reports zero WebP review candidates
- QA screenshots refreshed in `artifacts/layout-qa/`
- Manual scroll check passed for Home trust section and TCA case proof / decision ledger
- Browser probe confirmed Case Detail hero covers are light after replacement: TCA luma 240, Bonario luma 245, AI workflow luma 237
- Manual screenshot review covered Home mobile, Work desktop, Contact mobile, Stack mobile, Workflow mobile, About mobile, Case Detail mobile, and Lab mobile
- `git status --short` now works after marking the repo safe

## Current Status

- Repo path: `d:\personal-website`
- Stack: Vite 7 + React 19 + GSAP/ScrollTrigger + lucide-react
- Routes: `/`, `/about`, `/work`, `/work/:slug`, `/stack`, `/workflow`, `/contact`, `/lab`, `/404`
- Website is now focused on production polish, trust, proof, and conversion; deployment concerns intentionally untouched
- Case proof depth, route handoff, contact conversion, reduced-motion behavior, mobile spacing, route graph links, 404 prerender, route registry sync, proof signals, Lab code-splitting, and WebP audit are now in place
- Source tree no longer carries the unused Home transformation-story prototype files
- Dev server was started at `http://127.0.0.1:5173/` during the final polish pass

## Next Steps

- Keep the main portfolio bright, refined and trust-focused. Lab can stay darker/experimental.
- Next polish candidate: tune remaining Lab visual contrast only if Lab will be shown directly; otherwise keep it archived.
- If contact needs another push later, tune response timing or remove any leftover friction from the brief sample flow.
- Re-run `npm run assets:audit` after future visual/content changes and keep WebP under the current limits.

## New Session Brief

- Start from real source, not memory only.
- Read this file first, then inspect `src/pages/CaseDetailPage.jsx`, `src/styles/case-detail.css`, `src/content/projects.js`, and current browser screenshots.
- Run `npm run build` for any code/style/content change.
- Run `python scripts\mobile_qa.py` on this Windows/Codex setup after layout-affecting changes.
- Do not focus on deployment unless explicitly requested.
