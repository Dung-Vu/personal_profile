# Home Implementation Notes

## Current State

Home route `/` is now an editorial, route-driven entry point. It is implemented in `src/pages/HomePage.jsx` and driven by `src/content/homePage.js`.

`src/content/homeStoryScenes.js` is legacy context from the earlier Signal OS shape. It is kept for reference, but current runtime does not import it.

## Active Pieces

- `src/pages/HomePage.jsx` - hero, scratch cloud, bio block, project cards, methodology, destination cards
- `src/content/homePage.js` - active copy/data for Home
- `src/components/home2/ScratchCloud.jsx` - ambient motion layer
- `src/styles/home.css` - Home layout and responsive motion styling

## Current Arc

`Noise -> Structure -> Build -> Verify -> Choose`

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
- If the scene model changes again, archive the old shape here and keep `docs/CHECK_IN.md` short.
