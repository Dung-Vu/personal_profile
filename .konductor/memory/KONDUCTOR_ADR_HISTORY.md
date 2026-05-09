# ADR History

This document is the durable architectural decision ledger for the repository. Use ADR format here for critical decisions that future agents must inherit.

### ADR-001: Explicit Framework Versioning

- Status: Accepted
- Context: Adopting repositories need a machine-readable way to see which Konductor workflow version is installed.
- Decision: Embed `<framework_version>` directly in `KONDUCTOR.md` and use that tag as the single framework version source for both package and adopting repositories.
- Consequences: Version state stays attached to the primary contract file, installer metadata stays smaller, and release tooling only needs to synchronize one XML tag in each contract copy.

### ADR-002: Vision Objectives As Stable WHY

- Status: Accepted
- Context: The workflow needed a stable WHY document separate from day-to-day execution instructions.
- Decision: Keep `.konductor/memory/KONDUCTOR_VISION_ROADMAP.md` as the durable intent file and keep `KONDUCTOR_WORKFLOW.md` focused on HOW.
- Consequences: Agents can separate enduring purpose from operational procedure with less prompt churn.

### ADR-003: Markdown-Only Baseline

- Status: Accepted
- Context: The SQLite archive and installed script toolchain were not being used and added unnecessary complexity.
- Decision: Standardize the framework on plain Markdown for workflow, memory, check-in, and decision history; keep ADR format embedded in `KONDUCTOR_ADR_HISTORY.md`.
- Consequences: The install footprint is smaller, easier to audit, and simpler to carry across repositories.

### ADR-004: Memory Layer Split

- Status: Accepted
- Context: The previous history file mixed roadmap, progress, reasoning, and architecture. That blurred the boundary between short-term coordination, long-term memory, and critical decisions.
- Decision: Use `docs/CHECK_IN.md` as short-term memory, `.konductor/memory/KONDUCTOR_MEMORY.md` as long-term memory, and `.konductor/memory/KONDUCTOR_ADR_HISTORY.md` for critical architectural decisions only.
- Consequences: Agents get a clearer storage model, less drift between temporary and durable context, and a smaller contract surface in normal prompts.

### ADR-005: Behavior Layer As First-Class Contract

- Status: Accepted
- Context: The Markdown-only architecture defined memory and workflow well, but coding behavior defaults were too implicit. Agents could still over-assume, over-engineer, or produce noisy diffs.
- Decision: Add explicit behavior rules to `KONDUCTOR.md`, expand `KONDUCTOR_WORKFLOW.md` with operational behavior guidance, and ship `docs/AGENT_BEHAVIOR.md` as a compact anti-pattern reference.
- Consequences: Adopters get better assumption handling, smaller diffs, and verification-first execution without adding non-Markdown runtime dependencies.

### ADR-006: Portfolio Multi-Page Direction

- Status: Accepted
- Context: The current portfolio is a one-page Signal Profile OS that combines hero, identity, stack, projects, workflow, contact, command panel, canvas, HUD, presentation mode, and mode switching in one overloaded experience.
- Decision: Refactor toward a multi-page portfolio with MVP routes `/`, `/work`, and `/contact`, while preserving the existing experimental OS experience under `/lab` as a secondary route.
- Consequences: Core routes must use real route navigation, clearer content hierarchy, restrained motion, mobile/reduced-motion support, and shared design tokens. Lab may keep cyber/experimental affordances but must not run globally or compete with core routes.

### ADR-007: Runtime Docs Follow Active Route Content

- Status: Accepted
- Context: The multi-page portfolio is now the active runtime. Home, Contact, Work, Stack, Workflow, and Lab have distinct route files, and some legacy content files still exist for reference.
- Decision: Treat `src/content/homePage.js`, `src/content/contactPage.js`, `src/content/projects.js`, and the route files in `src/pages/` as the current source of truth. Treat `src/content/homeStoryScenes.js` as legacy unless runtime imports it again.
- Consequences: README, Check-In, image briefs, and workflow docs must describe the active route/content structure instead of older `/home2` or Signal OS implementation plans.

### ADR-008: Core Route Accessibility And Motion Contract

- Status: Accepted
- Context: The portfolio now uses client-side route navigation, optional View Transitions, GSAP reveals, a mobile menu, and an archived Lab shell. A strict FE polish pass found that route focus, mobile scroll lock, reduced-motion behavior, and first-screen spacing directly affect perceived seniority and trust.
- Decision: Core routes must respect `prefers-reduced-motion`, disable View Transition under reduced motion, focus `#main-content` after client route changes, keep mobile menu scroll locked while open, and keep Lab-only motion/command affordances isolated from the primary portfolio.
- Consequences: Future navigation, shell, and motion changes must verify build, viewport layout QA, reduced-motion behavior, and keyboard/focus behavior. Lab can stay experimental, but Home/Work/Stack/Workflow/Contact must remain content-first, readable, and low-friction.

## Logging Guidance

Add a short ADR entry when a decision changes architecture, durable workflow structure, or cross-repo standards future agents must obey.

Do not use this file for short-term coordination, routine progress logging, or generic project memory.
