# Working Memory

Long-term repo memory for `personal-website`. Keep this file for durable constraints, recurring failures, and cross-session rules.

## Foundational Stack Constraints

1. Repo path: `D:\personal-website`.
2. App stack: Vite 7 + React 19.
3. Animation stack: GSAP + ScrollTrigger already present; do not replace without a concrete reason.
4. UI/icon stack: lucide-react present.
5. Verification: `npm run build` is the primary local check; `npm run qa:mobile` and `npm run qa:layout` map to the same viewport QA script.
6. Content language: site copy is primarily Vietnamese; English is fine for technical terms, project names, and short CTA labels.
7. On this Windows/Codex setup, run layout QA as `python scripts\mobile_qa.py`; the npm aliases call `python3` and may not match the local shell.
8. Git safe-directory is configured for `D:/personal-website`, so `git status --short` should work in the Codex sandbox.

## Product Direction

- Portfolio is a multi-page site with routes `/`, `/about`, `/work`, `/work/:slug`, `/stack`, `/workflow`, `/contact`, `/lab`, and `/404`.
- Core positioning: Web Developer for websites, dashboards, internal tools, and AI-assisted delivery workflows.
- Keep `/lab` as secondary archive for the experimental Signal OS shell; do not make it prominent in primary navigation.
- Home is editorial and route-driven. It should state role, offer, proof, and verification loop early.
- Active Home content lives in `src/content/homePage.js`.
- Contact payload and capability gates live in `src/content/contactPage.js`.
- `src/content/homeStoryScenes.js` is legacy context only; current runtime does not import it.
- Work cases are TCA Crypto Analyzer, Bonario Product Hub, and AI Operator Workflow, with status/timeline/proof notes instead of unsourced metrics.

## Durable Guardrails

- Do not rebuild Home as another long one-page portfolio.
- Do not fake multi-page navigation with anchor scroll; CTAs between routes must navigate to real routes.
- Do not use forced boot, dense HUD, global custom cursor, global mode switch, or presentation reel on core routes.
- Do not let effects compete with content; each effect must support page meaning or motion intent.
- Do not use unsourced percentage metrics as proof; prefer status, timeline, role, deliverables, constraints, and verification notes unless real evidence exists.
- Lab may keep motion-heavy affordances, but it must not affect performance or UX of core routes.
- Build mobile and reduced-motion behavior from the start, not as an afterthought.
- Route navigation must respect `prefers-reduced-motion`: no View Transition under reduced motion, and same-route smooth scroll only when motion is allowed.
- Client route changes should move focus to `#main-content`; do not force focus to the page `h1` on initial load.
- Mobile menu open state must lock body scroll with the same class the shell toggles.
- Keep Contact brief-first; terminal/API styling is allowed only as a supporting visual, not the primary interaction model.

## Active Heuristics

- Prefer data-driven page content under `src/content/` so copy is not hard-coded across JSX.
- Prefer one main ScrollTrigger timeline for Home desktop scrollytelling; keep mobile stacked and readable.
- Keep route metadata in `src/App.jsx` aligned with current page copy.
- Unknown `/work/:slug` routes should use 404 metadata, not Home metadata.
- Use `public/assets/` as the single image inventory for the portfolio.
- Treat `homeStoryScenes.js` as archive unless code starts importing it again.
- Treat `signal-workstation-hero-v2` as OG/social preview unless it is restored to first-viewport Home usage; do not preload it while unused by the initial Home viewport.

## Known Anti-Patterns

- Large global `App.jsx` mixing route shell, content sections, OS controls, and animation state.
- Routing changes without production build verification.
- Global heavy effects running on pages where they are not needed.
- Adding animation before content/routing architecture is stable.

## Update Rule

Update this file when a new hard constraint, recurring failure mode, or durable cross-cutting implementation rule is discovered.
