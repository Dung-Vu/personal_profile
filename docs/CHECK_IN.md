# Check-In

Short-term live coordination for `personal-website`. Keep compact; move durable rules to `.konductor/memory/KONDUCTOR_MEMORY.md` and architectural decisions to `.konductor/memory/KONDUCTOR_ADR_HISTORY.md`.

## Active Claims

| Owner       | Task                                                                                        | Started         | Status    |
| :---------- | :------------------------------------------------------------------------------------------ | :-------------- | :-------- |
| Vegeta      | Final review gap closure: microcopy, trade-offs, H1, progress tracker                       | 2026-04-30 live | completed |
| Vegeta      | 7-item review completion: about-proof, 404, contact-rebalance, rails, chrome, orbit, labels | 2026-04-30 live | completed |
| Vegeta      | Nice-to-have: route meta, Be Vietnam Pro font, project highlights                           | 2026-04-30 live | completed |
| Vegeta      | CSS refactor: Lab CSS split, core bundle 127→74.68 KB                                       | 2026-04-30 live | completed |
| Vegeta      | Image audit: 18 fixes (SEO meta, WCAG, 404, responsive, fonts)                              | 2026-04-30 live | completed |
| Vegeta      | Asset cleanup: 8 unused images removed (~834 KB), docs synced                               | 2026-04-30 live | completed |
| Antigravity | ScratchCloud Particle Engine Redesign (Cybernetic Shard)                                    | 2026-05-01 live | completed |

## Current Status

- Repo path: `/mnt/d/personal-website` / `d:\personal-website`.
- Stack: Vite + React 19 + GSAP/ScrollTrigger + lucide-react.
- Konductor installed: `konductor-workflow@0.2.11`.
- Implemented routes: `/`, `/about`, `/work`, `/work/:slug`, `/stack`, `/workflow`, `/contact`, `/lab`, `/404`, and `/home2`.
- Active Work: **Home2 Production Migration**. Transitioning the homepage to a high-end editorial split layout (`devl.dev` inspired), featuring an interactive particle field on the left and scrollable content/login on the right.

## Asset Inventory

`public/assets/` — 12 files remaining (8 unused deleted 2026-04-30). See `docs/IMAGE_BRIEF.md` for full gen specs.

## Latest QA / Fixes

- **ScratchCloud Redesign (Cybernetic Shard)**:
    - Completely replaced the legacy human silhouette mask with a highly abstract, geometric "Cybernetic Shard" (Monolith Prism).
    - Features 3D isometric shading, holographic wireframes, glowing orbital rings, a data beam, and an hourglass ambient stardust field.
    - Resolves the "uncanny valley" issue of the previous silhouette attempt while maintaining a "Maxping" professional tech aesthetic.
- **Home2 UI/UX Refinement**:
    - Extracted theme-aware sticky headers, optimized CSS grid constraints, and ensured the particle canvas mounts cleanly via `OffscreenCanvas`.

## Next Implementation Slice

- **Finalize Home2 Split Layout**:
    - Adjust CSS in `home.css` (or `home2.css`) to lock the `ScratchCloud` canvas to the left half of the viewport (fixed position).
    - Ensure the right half contains the actual scrollable content (e.g., identity details, auth form) following the `devl.dev` reference structure.
    - Implement responsive degradation (stacking vertically on mobile).

## Open Questions

- Should `/home2` completely replace `/` (Home) after the split layout is finalized?
- Do we need to integrate a real authentication flow into the new layout, or is it purely aesthetic/portfolio representation?

## Known Tech Debt

- `ScratchCloud.jsx` particle counts (10,000+) are high. It performs well on desktop due to `OffscreenCanvas`, but mobile device thermal throttling/FPS should be monitored once the split layout is responsive.
- Mobile QA uses Windows Chrome from WSL through `npm run qa:mobile`; keep Chrome path assumptions in sync if Windows install path changes.
