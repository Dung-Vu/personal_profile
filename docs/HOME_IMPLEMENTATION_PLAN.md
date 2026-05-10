# Home Implementation Notes

## Current State

Home route `/` is now an editorial, route-driven entry point. It is implemented in `src/pages/HomePage.jsx` and driven by `src/content/homePage.js`.

Legacy Signal OS Home experiments were pruned from source. Current Home runtime should stay in `HomePage.jsx`, `homePage.js`, `ScratchCloud.jsx`, and `home.css`.

## Active Pieces

- `src/pages/HomePage.jsx` - hero, scratch cloud, bio block, project cards, methodology, destination cards
- `src/content/homePage.js` - active copy/data for Home
- `src/components/home2/ScratchCloud.jsx` - ambient motion layer
- `src/styles/home.css` - Home layout and responsive motion styling

## Current Arc

`Hero -> Bio -> Trust -> Projects -> Method -> Destinations`

## Runtime Rules

- Home desktop may use GSAP/ScrollTrigger.
- Mobile and reduced-motion must stay stacked and readable.
- Mobile first fold should show copy, primary CTA, secondary CTA, and a visible proof/visual cue without forcing a long blank lead-in.
- CTA paths must go to real routes, not anchor-only stand-ins.
- Home must stay lighter than Lab; Lab remains the archive shell.

## Validation

- `npm run build`
- `npm run qa:mobile`
- Desktop and mobile browser check on `/`

## Notes

- If Home copy changes, update `src/content/homePage.js` first.
- If Home layout changes, keep text overflow and card heights stable on mobile.
- If the Home model changes again, update this note and keep `docs/CHECK_IN.md` short.
