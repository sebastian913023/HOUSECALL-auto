# HouseCall Automotive Repairs: cinematic site (local prototype)

React 19 + TypeScript + Vite + GSAP ScrollTrigger. Rough draft for iteration. Not deployed.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build (http://localhost:4173)
npm run frames     # regenerate PLACEHOLDER frames (needs ffmpeg)
```

## Where to edit

| Want to change | Edit |
|---|---|
| All copy, phone, email, prices, FAQ, hero beats | `src/content.ts` |
| Scroll length, frame count, frame path, phone crop focal point | `sequence` in `src/content.ts` |
| Colors, type scale, spacing | `:root` tokens at top of `src/styles.css` |
| Scroll-to-frame logic | `src/components/ScrollSequence.tsx` |
| Services / FAQ / Contact sections | `src/components/Sections.tsx` |
| Hero footage | replace `public/frames/f_0000.* ... f_NNNN.*` (and remove the `prebuild` script), then set `frameCount` and `isPlaceholder: false` |

## How the hero works

Normal page scroll with a bounded sticky scene (`.seq`, 380vh tall). One ScrollTrigger maps progress 0 to 1 to a frame index and to three text beats, so it is deterministic in both directions, after resize, and after a fast jump. A poster `<img>` shows immediately, frames load 6 at a time, and the canvas always draws the nearest already-decoded frame, so there are no blank frames. The site never sits behind a loader. Under `prefers-reduced-motion`, the pin is removed and all beats show in normal flow. No smooth-scroll library is used (one animation system only).

Method choice: image sequence on canvas. At 72 tiny placeholder SVG frames it is negligible. This is NOT yet measured with real footage. Real frames will be much larger, so re-test video-with-currentTime against frames once approved assets exist.

## Real vs placeholder

| Item | Status |
|---|---|
| Phone call/text links, email link | Real (from your saved details) |
| Rates (jump start, lockout, tire, fuel, battery) and repair list | From your earlier site. Confirm they are current |
| Hero footage | PLACEHOLDER (generated boxes, labeled on screen) |
| Estimate form | NOT connected. Shows an honest "not sent" message |
| Business hours | None supplied; FAQ says to call or text |
| Reviews, stats, credentials | None included (none invented) |

## Asset manifest and generation records

| Asset | Source | Notes |
|---|---|---|
| `public/frames/*.jpg` (72) | `scripts/make-placeholder-frames.sh` (ffmpeg) | Placeholder only. No AI generation ran. |

Higgsfield was not available in this session, so no generation jobs exist (no job IDs, prompts, or credits spent). Real photos of your truck and work are still needed.

## Assumptions

- Canonical name is "HouseCall Automotive Repairs" (per your Sep 2026 decision).
- Palette: charcoal with safety orange. Change in `:root`.
- Tagline and positioning copy taken from your existing site.
- Inter is named in the font stack but not bundled. It falls back to system fonts.

## Deploy (not done)

Vite is auto-detected by Vercel (build `npm run build`, output `dist`). No environment variables are required today. When the estimate form gets an endpoint, keep any secret server-side, never in browser code. Large approved footage should live in durable asset hosting rather than git.
