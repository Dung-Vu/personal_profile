# Konductor Guide

Human-facing guide for using the repo-local Konductor workflow in `personal-website`.

## Read Order

1. `KONDUCTOR.md` - compact machine contract.
2. `docs/CHECK_IN.md` - current live state and handoff.
3. `README.md` - runtime architecture, scripts, routes, assets.
4. `.konductor/memory/KONDUCTOR_MEMORY.md` - durable constraints.
5. `.konductor/memory/KONDUCTOR_ADR_HISTORY.md` - major decisions.

## Current Repo Shape

- Product: Vite + React 19 personal portfolio.
- Core routes: `/`, `/about`, `/work`, `/work/:slug`, `/stack`, `/workflow`, `/contact`.
- Archive route: `/lab`.
- Build gate: `npm run build`.
- Visual QA: `npm run qa:mobile` or `npm run qa:layout`.

## What To Update

- Live task progress: `docs/CHECK_IN.md`.
- Repeatable repo workflows: `docs/PROJECT_SKILLS_WORKFLOW.md`.
- Home architecture notes: `docs/HOME_IMPLEMENTATION_PLAN.md`.
- Image slots and generation prompts: `docs/IMAGE_BRIEF.md`.
- Durable rules or architectural decisions: `.konductor/memory/*`.

## Repo Commands

- `/k-init` - read contract, memory, and check-in; summarize status.
- `/k-update` - refresh Konductor scaffolding and re-apply repo notes.
- `/k-history` - review memory, roadmap, ADR, and live state.
- `/k-compact` - prune `docs/CHECK_IN.md`.
- `/k-checkin` - refresh live status and handoff.
- `/build` - run `npm run build`.
- `/dev` - start Vite dev server.

## Operating Rules

- Treat source files as truth before docs.
- Keep `/lab` archival and secondary.
- Keep Home, Work, Workflow, Stack, and Contact aligned with `src/content/`.
- Do not cite old `/home2` plans as current runtime unless code imports them.
- Report exact verification commands that ran.

