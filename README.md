# Personal Website — Vũ Đình Dũng

Vite + React 19 portfolio with 7 routes (`/`, `/about`, `/work`, `/stack`, `/workflow`, `/contact`, `/lab`), GSAP cinematic motion, and a Signal-OS aesthetic.

## Run

Install dependencies once, then run the Vite dev server:

```powershell
npm install
npm run dev
```

For production output:

```powershell
npm run build
```

## Edit Content

All content is managed in `src/content/`. Key files:

- `profile.js` — name, hero image, social links
- `projects.js` — 3 case studies with cover images
- `about.js`, `stack.js`, `workflow.js` — per-route copy and data
- `homeStoryScenes.js` — GSAP scrollytelling scenes (desktop)

## Architecture

- `src/App.jsx` — custom History API router, lazy-loaded route pages
- `src/components/layout/SiteShell.jsx` — global shell with skip-link, header, footer
- `src/components/layout/` — Header, Footer, CommandPanel, ProgressRail, TransitionGate, PresentationHud
- `src/components/sections/` — HeroSection, IdentitySection, ProjectsSection, ContactSection, Chapter
- `src/components/lab/` — archived Lab OS sections (LabHomeSection, LabRenderedSections)
- `src/features/` — CapabilityMatrix, CaseTheater, IntakeConsole, SignalMap, WorkflowPipeline
- `src/hooks/` — motion hooks (GSAP, parallax, scroll velocity, magnetic), UI hooks (command panel, active section, theme)
- `src/styles/` — CSS bundle: tokens → base → layout → sections → overlays → responsive; route CSS files lazy-loaded per page

## Routes

| Path          | Page           | Description                                              |
| ------------- | -------------- | -------------------------------------------------------- |
| `/`           | HomePage       | Hero, identity, projects, workflow overview, contact CTA |
| `/about`      | AboutPage      | Developer bio, beliefs, dossier stats                    |
| `/work`       | WorkPage       | 3 case study cards                                       |
| `/work/:slug` | CaseDetailPage | Full case narrative                                      |
| `/stack`      | StackPage      | Technical capability matrix                              |
| `/workflow`   | WorkflowPage   | 5-step operating workflow                                |
| `/contact`    | ContactPage    | Intake console + service fit guide                       |
| `/lab`        | LabPage        | Archived Signal OS motion lab                            |
| `/404`        | NotFoundPage   | 404 fallback                                             |

## UX / Motion

- GSAP ScrollTrigger cinematic scrollytelling on Home (desktop only, `fine` pointer, ≥4GB RAM, ≥6 cores, ≥1120px)
- Reduced-motion and `motion-muted` fallbacks for all animated sections
- Desktop custom cursor, magnetic elements, command text scramble
- CommandPanel via `Ctrl/Cmd+K`, focus trap, Escape to close
- WCAG 2.4.1 skip-to-content link, WCAG 2.1 SC 4.1.2 aria compliance
- All route pages set `document.title` via `useRouteTitle` hook

## Screenshots

Runtime screenshots are refreshed in `screenshots/`:

- `desktop-runtime.png`
- `mobile-runtime.png`
- `projects-scroll.png`
- `workflow-stack.png`

## Images

All images live in `public/assets/` and are served at `/assets/filename`. Current images are AI-generated placeholders.
See `docs/IMAGE_BRIEF.md` for replacement specs, dimensions, and generation prompts per slot.

**Active image slots:**

| File                              | Used in                                       | Size   |
| --------------------------------- | --------------------------------------------- | ------ |
| `signal-workstation-hero-v2.webp` | HeroSection (Home hero bg)                    | 78 KB  |
| `signal-workstation-hero-v2.jpg`  | `og:image`, `twitter:image` in index.html     | 221 KB |
| `signal-hero-generated-1536.webp` | LabHomeSection (Lab hero bg)                  | 58 KB  |
| `signal-about-dossier.webp`       | IdentitySection (portrait panel)              | 72 KB  |
| `signal-case-tca-dashboard.webp`  | WorkPage + CaseDetailPage (TCA cover)         | 88 KB  |
| `signal-case-bonario-hub.webp`    | WorkPage + CaseDetailPage (Bonario cover)     | 74 KB  |
| `signal-case-ai-workflow.webp`    | WorkPage + CaseDetailPage (AI Workflow cover) | 85 KB  |

**Missing file (link exists, file does not):**

- `apple-touch-icon.png` — referenced in `<link rel="apple-touch-icon">`, needs to be created (180×180px PNG)
