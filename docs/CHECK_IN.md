# Check-In

Short-term live coordination for `personal-website`. Keep compact; move durable rules to `.konductor/memory/KONDUCTOR_MEMORY.md` and architectural decisions to `.konductor/memory/KONDUCTOR_ADR_HISTORY.md`.

## Active Claims

| Owner  | Task                                                                                        | Started              | Status                       |
| :----- | :------------------------------------------------------------------------------------------ | :------------------- | :--------------------------- |
| Codex  | Recover interrupted routing implementation                                                  | 2026-04-28 14:39 +07 | completed                    |
| Codex  | Browser QA routing baseline                                                                 | 2026-04-28 14:47 +07 | completed                    |
| Codex  | Home static polish slice                                                                    | 2026-04-28 15:00 +07 | completed                    |
| Codex  | Work case theater polish slice                                                              | 2026-04-28 15:12 +07 | completed                    |
| Codex  | Contact intake console polish slice                                                         | 2026-04-28 15:22 +07 | completed                    |
| Codex  | Mobile QA fallback + responsive hardening                                                   | 2026-04-28 15:32 +07 | completed-with-tooling-limit |
| Codex  | Home GSAP cinematic enhancement                                                             | 2026-04-28 15:40 +07 | completed                    |
| Codex  | Live implementation plan + auto-continue workflow                                           | 2026-04-28 15:50 +07 | active                       |
| Codex  | About editorial identity route                                                              | 2026-04-28 15:55 +07 | completed                    |
| Codex  | Stack technical capability matrix                                                           | 2026-04-28 16:10 +07 | completed                    |
| Codex  | Workflow operating manual route                                                             | 2026-04-28 16:18 +07 | completed                    |
| Codex  | Navigation IA pass for 7 routes                                                             | 2026-04-28 16:28 +07 | completed                    |
| Codex  | Work interaction polish                                                                     | 2026-04-28 16:40 +07 | completed                    |
| Codex  | Contact interaction polish                                                                  | 2026-04-28 16:50 +07 | completed                    |
| Codex  | Lab section rendering split                                                                 | 2026-04-28 17:00 +07 | completed                    |
| Codex  | Motion/perf/a11y QA                                                                         | 2026-04-28 17:08 +07 | completed                    |
| Codex  | Final polish/content lock                                                                   | 2026-04-28 17:15 +07 | completed                    |
| Codex  | Windows Chrome mobile QA + overflow hardening                                               | 2026-04-28 23:00 +07 | completed                    |
| Codex  | CSS polish and visual QA hardening                                                          | 2026-04-28 23:25 +07 | completed                    |
| Codex  | Layout QA gate desktop/tablet/mobile                                                        | 2026-04-28 23:40 +07 | completed                    |
| Codex  | Work beauty/layout pass                                                                     | 2026-04-29 00:10 +07 | completed                    |
| Codex  | Home/Contact beauty/content pass                                                            | 2026-04-29 00:34 +07 | completed                    |
| Codex  | Full 5-item visual/content/assets/case-route pass                                           | 2026-04-29 00:54 +07 | completed                    |
| Codex  | Smoothness/performance route split pass                                                     | 2026-04-29 01:15 +07 | completed                    |
| Codex  | Lab duplicate-content reduction                                                             | 2026-04-29 00:57 +07 | completed                    |
| Codex  | Runtime smoothness asset/vendor QA pass                                                     | 2026-04-29 01:44 +07 | completed                    |
| Codex  | Harsh review positioning/trust/accessibility pass                                           | 2026-04-29 02:18 +07 | completed                    |
| Codex  | Harsh review follow-up cleanup/metadata pass                                                | 2026-04-29 02:45 +07 | completed                    |
| Codex  | Proof/positioning implementation pass                                                       | 2026-04-29 live      | completed                    |
| Vegeta | Review-driven credibility/evidence/reduce-jargon pass                                       | 2026-04-30 live      | completed                    |
| Vegeta | Concrete thesis + route meta + service-fit + deliverables pass                              | 2026-04-30 live      | completed                    |
| Vegeta | Final review gap closure: microcopy, trade-offs, H1, progress tracker                       | 2026-04-30 live      | completed                    |
| Vegeta | 7-item review completion: about-proof, 404, contact-rebalance, rails, chrome, orbit, labels | 2026-04-30 live      | completed                    |
| Vegeta | Nice-to-have: route meta, Be Vietnam Pro font, project highlights                           | 2026-04-30 live      | completed                    |
| Vegeta | CSS refactor: Lab CSS split, core bundle 127→74.68 KB                                       | 2026-04-30 live      | completed                    |
| Vegeta | Image audit: 18 fixes (SEO meta, WCAG, 404, responsive, fonts)                              | 2026-04-30 live      | completed                    |
| Vegeta | Asset cleanup: 8 unused images removed (~834 KB), docs synced                               | 2026-04-30 live      | completed                    |

## Current Status

- Repo path: `/mnt/d/personal-website`.
- Stack: Vite + React 19 + GSAP/ScrollTrigger + lucide-react.
- Konductor installed: `konductor-workflow@0.2.11`.
- Implemented routes: `/`, `/about`, `/work`, `/work/:slug`, `/stack`, `/workflow`, `/contact`, `/lab`, `/404`.
- Core shell: `src/components/layout/SiteShell.jsx` with custom History API routing + skip-link (WCAG 2.4.1).
- `/lab` archived and removed from primary nav; still accessible at URL.
- All known CSS cascade bugs resolved (route CSS lazy-load override pattern fixed for home, work, contact, case-detail).
- Verification: `npm run build` + `npm run qa:layout` (80/80 PASS) + `git diff --check` passed.

## Asset Inventory

`public/assets/` — 12 files remaining (8 unused deleted 2026-04-30):

| File                              | Status                                   | Size   |
| --------------------------------- | ---------------------------------------- | ------ |
| `signal-workstation-hero-v2.webp` | ⚠️ Placeholder AI                        | 78 KB  |
| `signal-workstation-hero-v2.jpg`  | ⚠️ OG image, wrong ratio (need 1200×630) | 221 KB |
| `signal-hero-generated-1536.webp` | ⚠️ Placeholder AI                        | 58 KB  |
| `signal-hero-generated-1536.jpg`  | backup only, not referenced in code      | 143 KB |
| `signal-about-dossier.webp`       | ⚠️ Placeholder AI                        | 72 KB  |
| `signal-about-dossier.jpg`        | backup only                              | 214 KB |
| `signal-case-tca-dashboard.webp`  | ⚠️ Placeholder AI                        | 88 KB  |
| `signal-case-tca-dashboard.jpg`   | backup only                              | 240 KB |
| `signal-case-bonario-hub.webp`    | ⚠️ Placeholder AI                        | 74 KB  |
| `signal-case-bonario-hub.jpg`     | backup only                              | 221 KB |
| `signal-case-ai-workflow.webp`    | ⚠️ Placeholder AI                        | 85 KB  |
| `signal-case-ai-workflow.jpg`     | backup only                              | 239 KB |

**Missing:** `apple-touch-icon.png` (180×180) — link in index.html, file not created yet.
See `docs/IMAGE_BRIEF.md` for full gen specs.

## Latest QA / Fixes

- Proof/positioning implementation pass:
    - Added Home proof strip for offer/proof/verification loop so the landing page reads as a Web Developer portfolio before an aesthetic concept.
    - Added project `deliverables` data and surfaced deliverables in Work cards and case-detail pages.
    - Converted Work status/proof cards to semantic `dl/dt/dd` and tightened external-link `rel` values to `noopener noreferrer`.
    - Updated global footer into a clearer availability/contact CTA with email-first action.
    - Tuned large hero typography and case-detail proof/stat styling for readability.
    - Validation: `npm run build`, `npm run qa:layout`, and `git diff --check` passed.

- Review-driven credibility/evidence/reduce-jargon pass:
    - Added `team`, `evidenceNote`, and `nextProof` fields to all three project records; surfaced them in Work cards (`dl` grid) and case-detail pages.
    - Replaced legacy Signal Map unsourced numeric values (92/88/90/86) with qualitative labels (Primary/System/Runtime/Delivery) and dropped the percentage bar.
    - Rewrote About, Stack, and Workflow hero headlines/intro to focus on concrete capability and outputs instead of abstract philosophy and duplicated claims.
    - Reduced case-detail hero H1 from `clamp(3.3rem, 9vw, 8rem)` to `clamp(2.9rem, 7.2vw, 6.4rem)`; restructured case-detail grid from 5-column to 4-column with `span 2` for better readability.
    - Converted case-status-grid from 3-column to 2-column to fit 4 cards cleanly; extended case-proof-grid accent borders to child 7-8.
    - Fixed 3 missing commas in `about.js`, `stack.js`, `workflowPage.js` after content rewrites.
    - Validation: `npm run build` (50.6s, all 14 chunks), `npm run qa:layout` (80/80 PASS across 10 routes × 7 viewports), `git diff --check` passed.

- Concrete thesis + route meta + service-fit + deliverables pass:
    - Rewrote case narrative thesis for all 3 projects: concrete problem description with specifics (5-6 tabs, 3-4 screens, multi-agent context loss) instead of abstract framing.
    - Updated project `problem` fields to match with more concrete details.
    - Added route-level `document.title` via `useRouteTitle` hook in `App.jsx` so each route gets its own SEO-friendly title.
    - Added service-fit section on Contact page: "Dự án phù hợp nhất" (✅ Nhận) and "Chưa phù hợp" (❌) with 5 concrete bullet points each.
    - Added concrete `deliverables` per workflow step and rendered them in Workflow page instead of generic `output` labels.
    - Rewrote About beliefs from abstract philosophy to concrete practices with specifics (4 states, GSAP when useful, diff review, component/route/state alignment).
    - Added CSS for `.contact-fit-section` with responsive 2-col/1-col grid.
    - Validation: `npm run build` (34.4s), `npm run qa:layout` (80/80 PASS), `git diff --check` passed.

- Final review gap closure: microcopy, trade-offs, H1, progress tracker:
    - Bumped global microcopy labels from `0.72rem` → `0.78rem` and `0.7rem` → `0.76rem`; reduced letter-spacing from `0.12em` → `0.1em` for better readability at small sizes.
    - Added `tradeoff` (đánh đổi) to each case narrative — TCA (speed vs depth), Bonario (workflow vs analytics), AI (context continuity vs raw speed).
    - Rendered trade-off as italic left-bordered callout in CaseDetailPage with dedicated CSS.
    - Reduced Stack and Workflow H1 from `clamp(3.3rem,9vw,8rem)` to `clamp(2.8rem,7.2vw,6.4rem)`.
    - Updated `docs/HARSH_PORTFOLIO_REVIEW_2026-04-29.md` with full progress tracker table for all 10 việc.
    - Validation: `npm run build` (61s), `npm run qa:layout` (80/80 PASS).

- 7-item review completion pass (#11-#17):
    - #11 About: added dossier stats strip (3+ năm, Web+API, Build-first), Projects count, Response time to meta.
    - #12 Router: improved 404 state in CaseDetailPage — shows "404 / CASE NOT FOUND" with invalid slug echoed.
    - #13 Contact: removed console-bar and asset frame, compacted console panel to secondary sidebar role.
    - #14 Stack+Workflow: added quick evidence links to Stack right rail, deliverable preview per step to Workflow right rail.
    - #15 Work cards: removed case-terminal signal readout overlay, removed redundant proof-strip, reduced proof-grid from 8→6 items.
    - #16 Home: reduced motion-field opacity 0.38→0.22, scene-orbit 0.42→0.24 + size 12→10rem, atmosphere 0.4→0.25.
    - #17 Labels: removed `text-transform:uppercase` from all major label groups, reduced letter-spacing 0.12→0.06em.
    - Validation: `npm run build` (68s), `npm run qa:layout` (80/80 PASS).

- Harsh review follow-up cleanup/metadata pass:
    - Removed stale unsourced project percentage metrics from project data and legacy `ProjectFingerprint` rendering.
    - Reworked legacy project proof into status/timeline/proof-note cards.
    - Added meaningful Contact artwork alt/caption, fixed Person schema URL, added real SVG favicon, and pointed manifest icons to it.
    - Renamed remaining core copy labels away from Signal/Intake jargon in active routes and archived Lab copy.
    - Validation: `npm run build`, `npm run qa:layout`, and `git diff --check` passed.

- Harsh review response pass:
    - Home hero now states Web Developer / Dashboard / Internal Tool / AI Workflow immediately instead of opening as a cinematic concept.
    - Work cards and case-detail pages replaced unsourced percentage-style proof with status, timeline, role, outcome, and private/public proof context.
    - `/lab` is removed from primary navigation, marked as an archive concept, and the boot prelude no longer auto-opens.
    - Global focus-visible and reduced-motion safety were hardened; nav/footer targets meet larger touch target sizing.
    - Static SEO/share basics added: canonical, manifest link, absolute OG image URL, `public/robots.txt`, and `public/manifest.webmanifest`.
    - Validation: `npm run build`, `npm run qa:layout`, and `git diff --check` passed.

- Added `/stack` as a Technical Capability Matrix:
    - `src/content/stack.js`, `src/pages/StackPage.jsx`, route metadata, `App.jsx`, and Stack CSS.
    - Browser smoke: active nav Stack, 4 capability cards, 3 decision principles, no desktop overflow.
    - CTA smoke: `/stack` route panel navigates to `/workflow`.
- Added `/workflow` as an Operating Manual:
    - `src/content/workflowPage.js`, `src/pages/WorkflowPage.jsx`, route metadata, `App.jsx`, and Workflow CSS.
    - Browser smoke: active nav Workflow, 4 process steps, 3 toolchain groups, no desktop overflow.
- Navigation IA pass for 7 visible routes:
    - Core routes keep subtitles: Home, About, Work, Contact.
    - Secondary routes are compact in desktop nav: Stack, Workflow, Lab.
    - Browser smoke: 7 nav links, secondary subtitles hidden, active state works, no desktop overflow.
    - Direct route smoke covered `/`, `/about`, `/work`, `/contact`, `/stack`, `/workflow`, `/lab` sanity.
- Work interaction polish:
    - Case cards are keyboard-focusable and expose descriptive case-study labels.
    - Case cards now get controlled hover/focus depth, accent glow, and subtle cover-image response.
    - Route-map anchors now get keyboard-visible focus and an accent underline scan.
    - Reduced-motion guard disables Work transforms/transitions.
    - Browser smoke `/work`: active nav Work, 3 focusable case cards, focusable route-map anchors, no desktop overflow.
- Contact interaction polish:
    - Copy email button now exposes an accessible label with copied state.
    - Channel cards and work-type cards now have clearer hover/focus affordance.
    - Work-type cards are keyboard-focusable with descriptive labels.
    - Reduced-motion guard covers Contact transforms/transitions and copy-status movement.
    - Browser smoke `/contact`: active nav Contact, copy feedback visible, 2 channel cards, 4 focusable work-type cards, no desktop overflow.
- Lab section rendering split:
    - Added `src/components/lab/LabRenderedSections.jsx` as the first safe Lab component boundary.
    - `src/pages/LabPage.jsx` no longer owns the section switch/map directly.
    - Browser smoke `/lab`: h1 renders, 6 Lab sections mount, no desktop overflow, no runtime dialog remains after boot skip state.
- Motion/perf/a11y QA:
    - Verified `/lab` -> `/` cleanup removes Lab document-level mode dataset on core route.
    - Desktop smoke covered `/`, `/about`, `/work`, `/stack`, `/workflow`, `/contact`, and `/lab` across latest pass.
    - Keyboard focus checked on shell nav, Work case/route-map controls, and Contact channel/work-type cards.
    - No horizontal overflow found in checked desktop routes.
- Final polish/content lock:
    - Updated `index.html` public metadata for current Vietnamese portfolio positioning.
    - Final smoke `/`: document title correct, 7 nav links render, no desktop overflow.
- Windows Chrome mobile QA + overflow hardening:
    - Found Windows Chrome at `/mnt/c/Program Files/Google/Chrome/Application/chrome.exe`.
    - Captured 390x844 headless screenshots for `/`, `/about`, `/work`, `/stack`, `/workflow`, `/contact`, and `/lab` under `C:\Temp\chrome-mobile-qa`.
    - First visual pass showed clipping on Home/About/Work/Workflow/Contact/Lab; patched small-screen width/min-width/text wrapping rules in `src/styles/routes.css`.
    - CDP metric pass at 390px confirmed `scrollWidth <= innerWidth` for all 7 routes after patch.
- CSS polish and visual QA hardening:
    - Kept repo-focused only; removed deploy fallback configs from this pass because deployment is user-managed.
    - Added `scripts/mobile_qa.py` and `npm run qa:mobile` for repeatable Windows Chrome CDP screenshot/overflow QA.
    - `npm run qa:mobile` passed for all 7 routes at `390x844`, `375x812`, `430x932`, and `768x1024`.
    - Screenshots are written to `artifacts/mobile-qa/`; `artifacts/` is ignored by git.
    - Tightened mobile hero typography, line-height, paragraph contrast, CTA spacing, panel padding, and Lab boot card sizing.
- Layout QA gate desktop/tablet/mobile:
    - Extended QA automation with `npm run qa:layout` across `375x812`, `390x844`, `430x932`, `768x1024`, `1024x768`, `1366x768`, and `1440x900`.
    - Screenshots are written to `artifacts/layout-qa/`; overflow metric passed for all 7 routes at all 7 viewports.
    - Added intermediate desktop nav compaction for 1121-1420px to reduce crowding.
    - Moved shell menu/tablet layout breakpoint to 1120px, so 1024px uses a safer compact nav state.
    - Reduced Home/Work/Contact hero scale at laptop/tablet widths to avoid cramped headlines and CTA pressure.
- Work beauty/layout pass:
    - Tightened Work hero grid alignment and evidence panel rhythm.
    - Improved Vietnamese headline line-height and secondary nav label contrast.
    - Reworked Work evidence stats from input-like blocks into quieter editorial separators.
    - `npm run build` and `npm run qa:layout` passed after the CSS pass.
- Home/Contact beauty/content pass:
    - Audited regenerated Home/About/Contact screenshots before editing.
    - Split Home and Contact hero headlines into controlled `.headline-line` rows for stronger editorial rhythm.
    - Polished global scrollbar, primary CTA depth, Contact layout spacing, and channel-card typography.
    - Fixed Contact email card wrapping by switching channel cards to a one-column stack and verifying the full email stays on one line at 1440px.
    - `npm run build` passed; `npm run qa:layout` passed for all 7 routes across all 7 viewports after restarting stale Vite servers.
- Full 5-item visual/content/assets/case-route pass:
    - Audited current screenshots, content, routing shape, and asset usage before changing files.
    - Tightened Home/About hero copy rhythm and added `/work/:slug` case detail pages on the existing History API router.
    - Added `Open case file` CTAs from Work cards and a desktop/mobile-safe case-detail layout.
    - Removed 7 unused large generated PNG assets after confirming source code uses the optimized JPG versions.
    - `npm run build` and `npm run qa:layout` passed after the pass; direct browser smoke covered `/work/tca-crypto-analyzer`.
- Lab duplicate-content reduction:
    - Audited `/lab` against the current sitemap and confirmed the legacy Signal OS was re-rendering the old Home/Identity/Stack/Projects/Workflow/Contact content.
    - Reduced Lab scene config to two sections: legacy Lab entry and archive route map.
    - Added Lab-only `LabHomeSection` and `LabArchiveSection`; `/lab` now points users to Home/About/Work/Stack/Workflow/Contact instead of duplicating their content.
    - Rewrote Lab shell mode copy so Story/Systems/Cases/Recruiter modes describe OS controls, visual archive, and route exits rather than full portfolio narratives.
    - `npm run build` passed; Windows direct `npm run qa:layout` is blocked by Windows Store `python3.exe`, then WSL `npm run qa:layout` passed for all 7 routes across all 7 viewport sizes.
- Runtime smoothness asset/vendor QA pass:
    - Generated WebP runtime derivatives for the large signal artwork and switched rendered in-app images from JPG to WebP.
    - Added a high-priority Home hero preload/fetch priority while keeping JPG social preview metadata intact.
    - Added Vite manual chunks for React, lucide icons, and GSAP so route code stays small and stable vendor code can be cached separately.
    - Extended `npm run qa:layout` to cover `/work/tca-crypto-analyzer`, `/work/bonario-hub`, and `/work/ai-workflow`.
    - `npm run build` and `npm run qa:layout` passed for 10 routes across all 7 viewport sizes.
- Latest build output:
    - `dist/index.html` 2.85 kB / gzip 1.09 kB.
    - CSS bundle 122.68 kB / gzip 22.14 kB.
    - Route entry `index-DgLQY2AP.js` 14.80 kB / gzip 5.87 kB, plus `vendor-react`, `vendor-icons`, and deferred `vendor-motion` chunks.

## Next Implementation Slice

Review the refreshed local site at `http://127.0.0.1:5173/`, then decide whether to do a second pass on real project screenshots, richer case evidence, or final copy tightening. All planned implementation slices in `docs/IMPLEMENTATION_PLAN.md` remain completed for this pass.

Final-ready status:

1. Sitemap implemented: `/`, `/about`, `/work`, `/stack`, `/workflow`, `/contact`, `/lab`.
2. Production build passes.
3. Desktop smoke checks passed for the implemented routes across the latest QA pass.
4. Windows Chrome layout QA automation passed for 7 viewport sizes across all 7 routes.
5. Current focus stays on repo quality and CSS polish; deploy config is intentionally user-managed.

## Open Questions

- Keep the current custom History API router or switch to `react-router-dom` before project detail routes?
- Should project detail pages happen before or after final navigation IA polish?

## Known Tech Debt

- `src/pages/LabPage.jsx` still contains the large OS shell/control logic; content duplication is removed, but the shell can later be split further if Lab needs more maintenance.
- Work proof now includes team, evidence note, and next-proof direction alongside deliverables; next credibility jump needs real sanitized screenshots, repo/demo links where safe, or deeper process artifacts.
- Mobile QA uses Windows Chrome from WSL through `npm run qa:mobile`; keep Chrome path assumptions in sync if Windows install path changes.
- Git has user-authored docs deletions/modifications and several page/style files may appear untracked in current repo state; do not revert them.
