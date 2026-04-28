# Signal Profile OS

Static Vite + React personal profile website for Vũ Đình Dũng. The current build is a componentized "Signal Profile OS" experience with guarded desktop motion, mobile fallbacks, command panel navigation, and a canvas signal background.

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

Change profile copy, projects, and links in `src/profileData.js`.

## Architecture

- `src/App.jsx` wires the shell, motion state, command panel, and sections.
- `src/components/layout/` contains header, progress rail, command panel, transition gate, and footer.
- `src/components/sections/` contains hero, identity, stack, projects, workflow, and contact sections.
- `src/components/canvas/SignalCanvas.jsx` owns the particle canvas runtime.
- `src/hooks/` owns active-section tracking, command focus trap, GSAP setup, magnetic elements, motion preference, and scroll velocity.
- Styling stays in `styles.css`; no Tailwind migration was added.

## UX / UI Features

- GSAP reveal animations with `gsap.context()` cleanup.
- Desktop-only custom cursor, magnetic elements, command text scramble, horizontal projects, workflow reveal cards, and parallax imagery.
- Reduced-motion and `motion-muted` fallbacks disable heavy motion.
- Canvas particles react to pointer repulsion and scroll velocity, and pause work when the tab is hidden.
- Command panel opens from the terminal button or `Ctrl/Cmd+K`, traps focus, closes on `Escape`, and returns focus to the trigger.
- Responsive profile, stack, project, workflow, and contact modules with no mobile horizontal overflow.

## Screenshots

Runtime screenshots are refreshed in `screenshots/`:

- `desktop-runtime.png`
- `mobile-runtime.png`
- `projects-scroll.png`
- `workflow-stack.png`

## Image Credits

Generated project asset:

- `signal-hero-generated.png` - generated specifically for this website with a dark developer workstation / signal-system prompt.
- `signal-hero-generated-1536.jpg` - optimized runtime derivative generated locally from the PNG source.

Images were downloaded through Picsum's public image service, which references Unsplash source pages:

- `photo-60.jpg` - Vadim Sherbakov, `https://unsplash.com/photos/Hi9GSwWkCJk`
- `photo-84.jpg` - Johnny Lam, `https://unsplash.com/photos/63qfL0TciY8`
- `photo-89.jpg` - Vectorbeast, `https://unsplash.com/photos/rsJtMXn3p_c`
- `photo-1067.jpg` - Kevin Young, `https://unsplash.com/photos/-icmOdYWXuQ`
