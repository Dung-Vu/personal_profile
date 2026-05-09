# Image Brief — AI Generated Case Study Art

Current art assets already exist in `public/assets/`. Use this file when you want to regenerate or replace any slot.

## General Rules

- Ratio: 16:9 or 4:5
- Style: bright product/interface proof frame for core portfolio assets; dark experimental visuals only for Lab
- Color: light neutral base for case covers/proof frames, with one restrained accent per project
- No logos, no real brand names, no people
- Resolution: at least 1920x1080

## Current Asset Map

- `signal-workstation-hero-v2.webp` / `.jpg` - OG/social preview image; no longer preloaded by Home
- `signal-hero-generated-1536.webp` / `.jpg` - Lab archive hero
- `signal-about-dossier.webp` / `.jpg` - About portrait panel
- `signal-case-tca-dashboard.webp` / `.jpg` - TCA Crypto Analyzer
- `signal-case-bonario-hub.webp` / `.jpg` - Bonario Product Hub
- `signal-case-ai-workflow.webp` / `.jpg` - AI Operator Workflow
- `apple-touch-icon.png` - present and already linked in `index.html`

## 1. TCA Crypto Analyzer - Dashboard Fintech

**File:** `signal-case-tca-dashboard.webp`
**Tone:** iris (`#6a72d2`)

```text
Bright premium fintech dashboard proof frame, light neutral studio background, readable but non-real chart shapes, subtle cyan and gold accents, clean product UI hierarchy, no real data, no readable brand text --ar 16:9 --style raw --no logo,branding,people
```

## 2. Bonario Product Hub - Internal Operations Tool

**File:** `signal-case-bonario-hub.webp`
**Tone:** ocean (`#1b6265`)

```text
Bright enterprise operations hub proof frame, light neutral studio surface, product search panel, editable state cards, sync queue hints, teal and gold accents, clean admin UI hierarchy, no real product data, no readable brand text --ar 16:9 --style raw --no logo,branding,people
```

## 3. AI Operator Workflow - Development Process

**File:** `signal-case-ai-workflow.webp`
**Tone:** apricot (`#d78b47`)

```text
Bright AI-assisted delivery workflow proof frame, light neutral workspace, plan patch build browser QA and handoff panels as abstract UI cards, warm amber and cyan accents, clear staged process without readable private logs --ar 16:9 --style raw --no logo,branding,robot,face
```

## 4. Home Hero Background

**File:** `signal-workstation-hero-v2.webp`
**Tone:** neutral cool

```text
Clean portfolio social preview image, light editorial workstation mood, subtle data/interface cues, professional neutral palette, enough contrast for OG/Twitter crop, no readable private text --ar 1.91:1 --style raw --no logo,branding,people
```

## 5. Lab Archive Background

**File:** `signal-hero-generated-1536.webp`
**Tone:** archive lab

```text
Abstract motion-lab backdrop for an experimental interface, layered scanlines, faint grid, glowing signal traces, minimal control surface fragments, dark neutral palette with cold cyan accents --ar 16:9 --style raw --no text,logo,branding,people
```

## Notes

- Keep `.webp` as primary, `.jpg` as fallback.
- Put files in `public/assets/`.
- After replacing assets, update references in `src/content/profile.js`, `src/content/projects.js`, `src/content/homePage.js`, `src/pages/AboutPage.jsx`, `src/components/lab/LabHomeSection.jsx`, and `index.html` if needed.
