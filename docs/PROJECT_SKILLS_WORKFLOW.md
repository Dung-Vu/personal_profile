# Project Skills & Workflows

Repo-specific workflows for `personal-website`. Keep this file practical and command-oriented for AI coding agents.

## Custom Skills

### Multi-Page Portfolio Refactor

**Trigger phrases:** "triển khai multi-page", "tách portfolio thành nhiều trang", "refactor App.jsx", "build route architecture"

**Steps for AI Agent:**
1. Read `KONDUCTOR.md`, `docs/CHECK_IN.md`, `.konductor/memory/KONDUCTOR_MEMORY.md`, `docs/MULTI_PAGE_STRATEGY.md`, `docs/MULTI_PAGE_PHASE_PLAN.md`, and `docs/HOME_SCROLLYTELLING_RESEARCH.md`.
2. Inspect `package.json`, `src/App.jsx`, `src/main.jsx`, `src/components/`, `src/data/`, and current CSS before editing.
3. Preserve the existing one-page Signal OS experience by moving it to `/lab`; do not delete it during the first routing slice.
4. Build route-based shell and navigation before adding new page motion.
5. Prioritize MVP routes: `/`, `/work`, `/contact`; keep `/lab` secondary.
6. Run `npm run build` before reporting the slice complete.

### Cinematic Home Story

**Trigger phrases:** "build Home cinematic", "Home scroll story", "Signal Story Sequence"

**Steps for AI Agent:**
1. Confirm route `/work`, `/contact`, and `/lab` exist before wiring Home CTAs.
2. Create or update `src/content/homeStoryScenes.js` as the single source of truth for the 5 locked scenes.
3. Render Home static/responsive first; add GSAP ScrollTrigger only after layout and copy are correct.
4. Use one main desktop pin/timeline; avoid multiple competing ScrollTriggers.
5. Implement mobile and reduced-motion fallback as stacked readable sections.
6. Verify route changes clean up ScrollTrigger instances.

### Work And Contact MVP

**Trigger phrases:** "build Work page", "build Contact page", "MVP portfolio"

**Steps for AI Agent:**
1. Put project/case/contact copy in `src/content/` or equivalent data files.
2. Work page must showcase TCA Crypto Analyzer, Bonario Product Hub, and AI Operator Workflow with problem/role/decision/tech/outcome/status.
3. Contact page must include email, GitHub, suitable work types, brief template, copy email, and mailto.
4. Keep Work visual strong and Contact low-friction; do not import Lab-level OS noise into core routes.
5. Verify desktop/mobile layout and `npm run build`.

## Custom Workflows

### Verify Local Build

**Trigger phrases:** "verify", "check build", "kiểm tra build"
**Execution strictness:** HIGH

**Steps for AI Agent:**
1. Run `npm run build` from `/mnt/d/personal-website`.
2. If build fails, fix only issues related to the active task unless user approves broader cleanup.
3. Report build result and any residual risks.

### Start Dev Server

**Trigger phrases:** "run dev", "mở dev server", "start local"
**Execution strictness:** MEDIUM

**Steps for AI Agent:**
1. Run `npm run dev -- --host 0.0.0.0` from `/mnt/d/personal-website` as a tracked background process.
2. Wait for the local URL in logs.
3. Use browser/headless checks only when needed for visual/runtime validation.
4. Stop the background process when no longer needed unless user asks to keep it running.

### Konductor Update

**Trigger phrases:** "update Konductor", "reinstall Konductor", `/k-update`
**Execution strictness:** MEDIUM

**Steps for AI Agent:**
1. Run `npx konductor-workflow@latest` from repo root.
2. Re-read `KONDUCTOR.md`, `docs/CHECK_IN.md`, and `.konductor/memory/KONDUCTOR_MEMORY.md`.
3. Re-apply repo-specific customizations to `docs/PROJECT_SKILLS_WORKFLOW.md`, `docs/CHECK_IN.md`, and memory files if upstream overwrote scaffolding.
4. Summarize installed version and changed files.

## Custom Slash Commands

- `/k-init`: Read `KONDUCTOR.md`, `docs/CHECK_IN.md`, `.konductor/memory/KONDUCTOR_MEMORY.md`, `.konductor/memory/KONDUCTOR_ADR_HISTORY.md`, and the three portfolio strategy docs; summarize current status, active goals, blockers, and next implementation slice.
- `/k-update`: Run `npx konductor-workflow@latest`, then refresh repo-specific Konductor docs and summarize changes.
- `/k-history`: Summarize durable memory, ADR history, vision roadmap, and current check-in.
- `/k-compact`: Prune `docs/CHECK_IN.md` to the smallest useful active-state summary; move durable facts into `.konductor/memory/KONDUCTOR_MEMORY.md` if needed.
- `/k-checkin`: Update `docs/CHECK_IN.md` with current task, status, blockers, and next handoff point.
- `/build`: Run `npm run build` and report pass/fail with key errors.
- `/dev`: Start the Vite dev server as a tracked background process.
