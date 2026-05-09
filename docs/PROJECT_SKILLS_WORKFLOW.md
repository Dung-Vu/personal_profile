# Project Skills & Workflows

Repo-specific workflows for `personal-website`. Keep this file current, compact, and command-first.

## Current Source Of Truth

- Route shell: `src/App.jsx` and `src/routes/routes.js`
- Route pages: `src/pages/*.jsx`
- Route data: `src/content/*.js` (`homePage.js`, `contactPage.js`, `projects.js`, `workflow.js`, `workflowPage.js`, `about.js`, `stack.js`)
- Live coordination: `docs/CHECK_IN.md`
- Build gate: `npm run build`

## Custom Skills

### Portfolio Content Refresh

**Trigger phrases:** "update portfolio copy", "refresh route content", "sync docs with runtime"

**Steps for AI Agent:**
1. Read `README.md`, `docs/CHECK_IN.md`, `src/routes/routes.js`, and the route files that will change.
2. Update active content in `src/content/` first; keep `Lab` secondary and archival.
3. If Home copy changes, edit `src/content/homePage.js` and the relevant JSX in `src/pages/HomePage.jsx`.
4. If case study data changes, edit `src/content/projects.js` and the matching detail page.
5. If contact payload or brief fields change, edit `src/content/contactPage.js` and `src/pages/ContactPage.jsx`.
6. Run `npm run build`.

### Home / Work / Contact Update

**Trigger phrases:** "edit Home", "edit Work", "edit Contact", "portfolio slice"

**Steps for AI Agent:**
1. Home: keep the editorial intro, case links, methodology, and route choices in sync with `src/content/homePage.js`.
2. Work: keep 3 case studies aligned with `src/content/projects.js` and `src/pages/WorkPage.jsx`.
3. Contact: keep payload fields, mailto, GitHub, and capability gates aligned with `src/content/contactPage.js` and `src/pages/ContactPage.jsx`.
4. Keep motion restrained on core routes; Home desktop may use GSAP, mobile must stay readable.
5. Verify responsive output and build.

### Verification Loop

**Trigger phrases:** "verify", "check build", "layout QA", "sanity check"

**Steps for AI Agent:**
1. Run `npm run build`.
2. If viewport-sensitive changes land, run `npm run qa:mobile`.
3. If the route shell changes, inspect desktop and mobile runtime screenshots.
4. Report only the checks that actually ran.

## Custom Workflows

### Start Dev Server

**Trigger phrases:** "run dev", "start local", "open app"

**Steps for AI Agent:**
1. Run `npm run dev` from repo root.
2. Use the local `127.0.0.1` URL from Vite output.
3. Stop the server when no longer needed unless the user asks to keep it running.

### Update Check-In

**Trigger phrases:** "update check-in", "refresh status", "k-checkin"

**Steps for AI Agent:**
1. Read `docs/CHECK_IN.md`.
2. Move finished work into Completed Work.
3. Keep active claims short and current.
4. Record only durable notes that future agents need for the next slice.

### Konductor Update

**Trigger phrases:** "update Konductor", "reinstall Konductor", `/k-update`

**Steps for AI Agent:**
1. Run `npx konductor-workflow@latest` from repo root if the workflow package needs refresh.
2. Re-read `KONDUCTOR.md`, `docs/CHECK_IN.md`, and the `.konductor/memory/*` files relevant to the current slice.
3. Re-apply repo-specific notes to this file if upstream scaffolding changed.

## Custom Slash Commands

- `/k-init`: Read `KONDUCTOR.md`, `docs/CHECK_IN.md`, and the core memory files, then summarize current status and next slice.
- `/k-update`: Refresh the framework, then restore repo-specific workflow notes.
- `/k-history`: Review durable memory, ADR history, and current check-in.
- `/k-compact`: Prune `docs/CHECK_IN.md` to the smallest useful live state.
- `/k-checkin`: Refresh `docs/CHECK_IN.md` with current status, blockers, and handoff point.
- `/build`: Run `npm run build` and report pass/fail.
- `/dev`: Start the Vite dev server.
