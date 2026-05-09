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
- Rebuilt Contact into a clearer intake flow: email CTA, copyable brief payload, response contract, fit check
- Cleaned Stack, Workflow, About, Profile and project content to use one consistent voice
- Removed inflated unsourced outcome claims from project detail copy
- Updated route meta and `index.html` social/SEO copy to match new positioning
- Added canonical/social meta updates per route, sitemap, light browser theme metadata, and mobile polish for Contact/Stack/Workflow
- Added proof image assets, Home trust signal block, and decision-ledger sections for Work + Case Detail
- Swapped proof images to WebP and removed project-local PNG copies
- Aligned all three Case Detail pages back to the bright portfolio direction: light surfaces, softer accents, readable trade-off copy, and no dark editorial panels
- Replaced the three Case Detail hero cover assets with generated light-mode WebP covers:
  `signal-case-tca-dashboard.webp`, `signal-case-bonario-hub.webp`, `signal-case-ai-workflow.webp`
- Tightened Case Detail first-screen spacing: `.case-detail-page` top padding is now `84px` on desktop instead of roughly `114px`
- Hid `.case-back-link` on desktop/tablet and kept it visible on mobile only (`<= 680px`)
- Added a second proof layer to each case: redacted flow screenshot panel with per-case flow steps and sanitized notes
- Added view-transition driven route navigation, with stronger Work -> Case detail motion
- Tightened `/contact` with a clearer fit strip and sharper response language
- Added `npm run assets:audit` and compressed `case-proof-ai-workflow.webp` down to 108.8KB

## Verification

- `npm run build` passed
- `python3 scripts/mobile_qa.py` passed across all configured routes and viewports
- `npm run assets:audit` now reports zero WebP review candidates
- QA screenshots refreshed in `artifacts/layout-qa/`
- Manual scroll check passed for Home trust section and TCA case proof / decision ledger
- Browser probe confirmed Case Detail hero covers are light after replacement: TCA luma 240, Bonario luma 245, AI workflow luma 237
- Browser probe confirmed Case Detail top padding is `84px`

## Current Status

- Repo path: `d:\personal-website`
- Stack: Vite 7 + React 19 + GSAP/ScrollTrigger + lucide-react
- Routes: `/`, `/about`, `/work`, `/work/:slug`, `/stack`, `/workflow`, `/contact`, `/lab`, `/404`
- Website is now focused on production polish, trust, proof, and conversion; deployment concerns intentionally untouched
- Case proof depth, route handoff, contact conversion and WebP audit are the next polish layer now in place

## Next Steps

- Keep the main portfolio bright, refined and trust-focused. Lab can stay darker/experimental.
- Next polish candidate: swap any redacted flow screenshot to short clip only if new assets are worth the weight.
- If contact needs another push later, tune response timing or remove any leftover friction from the payload flow.
- Re-run `npm run assets:audit` after future visual/content changes and keep WebP under the current limits.

## New Session Brief

- Start from real source, not memory only.
- Read this file first, then inspect `src/pages/CaseDetailPage.jsx`, `src/styles/case-detail.css`, `src/content/projects.js`, and current browser screenshots.
- Run `npm run build` for any code/style/content change.
- Run `python3 scripts/mobile_qa.py` after layout-affecting changes.
- Do not focus on deployment unless explicitly requested.
