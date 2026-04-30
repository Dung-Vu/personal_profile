# Working Memory

Long-term repo memory for `personal-website`. Update only for durable constraints, recurring failures, or cross-session implementation rules.

## Foundational Stack Constraints

1. Repo path: `/mnt/d/personal-website`.
2. App stack: Vite + React 19.
3. Animation stack: GSAP + ScrollTrigger already present; do not replace without a concrete reason.
4. UI/icon stack: lucide-react present.
5. Verification: `npm run build` is the primary available local check; no lint/test scripts are currently defined.
6. Language: site copy is primarily Vietnamese. English is allowed for technical terms, project names, and short CTA labels when specified by docs.

## Product Direction

- Portfolio is now a multi-page site with routes `/`, `/about`, `/work`, `/work/:slug`, `/stack`, `/workflow`, `/contact`, and `/lab`.
- Core route positioning: Web Developer focused on websites, dashboards, internal tools, and AI-assisted delivery workflows.
- Keep `/lab` as a secondary archive for the experimental Signal OS/cyber experience; it must not be prominent in primary navigation.
- Home direction: editorial/cinematic but must state role, offer, proof, and verification loop early.
- Work direction: case theater for TCA Crypto Analyzer, Bonario Product Hub, and AI Operator Workflow, with status/timeline/proof notes and deliverables instead of unsourced metrics.
- Contact direction: clean intake console with email-first CTA, GitHub, brief template, copy email, and mailto.

## Durable Guardrails

- Do not rebuild Home as another long one-page portfolio.
- Do not use forced boot, dense HUD, global custom cursor, global mode switch, or presentation reel on core routes.
- Do not fake multi-page navigation with anchor scroll; CTAs between routes must navigate to real routes.
- Do not let effects compete with content; each effect must support page meaning or emotion.
- Do not use unsourced percentage metrics as proof; prefer status, timeline, role, deliverables, constraints, and verification notes unless real evidence is available.
- Lab Signal Map must not use unsourced numeric values for operating principles; use qualitative labels instead.
- Build mobile and reduced-motion behavior from the start, not as an afterthought.
- Lab can be motion-heavy, but it must not affect performance or UX of core routes.

## Active Hypotheses and Heuristics

- Refactor route architecture before adding cinematic Home animation.
- Move the current OS experience into `/lab` before polishing new Home/Work/Contact pages.
- Prefer data-driven page content under `src/content/` so copy is not hard-coded across JSX.
- Project credibility data now includes `deliverables`, `team`, `evidenceNote`, and `nextProof`; preserve all four when editing Work cards or case-detail pages.
- Use a shared design system for typography, tokens, spacing, interaction rules; vary art direction per route.
- Prefer one main ScrollTrigger timeline for Home desktop scrollytelling; use stacked fallback for mobile/reduced-motion.

## Known Anti-Patterns

- Large global `App.jsx` mixing route shell, content sections, OS controls, and animation state.
- Routing changes without production build verification.
- Global heavy effects running on pages where they are not needed.
- Adding animation before content/routing architecture is stable.

## Update Rule

Update this file when a new hard constraint, recurring failure mode, or durable cross-cutting implementation rule is discovered.
