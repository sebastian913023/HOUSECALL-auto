// Generates LABELED PLACEHOLDER frames (not real footage) at build time.
// Replace public/frames with approved footage frames, then set
// sequence.ext / frameCount / isPlaceholder in src/content.ts and remove the
// "prebuild" script from package.json. No text is baked into frames.
import { mkdirSync, writeFileSync, rmSync } from "node:fs";

const FRAMES = 72;
const dir = new URL("../public/frames/", import.meta.url);
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });

for (let i = 0; i < FRAMES; i++) {
  const p = i / (FRAMES - 1);
  const w = Math.round(360 + p * 520);
  const h = Math.round(150 + p * 230);
  const x = Math.round(640 - w / 2 + (1 - p) * 180);
  const y = Math.round(720 * 0.58 - h / 2 - p * 40);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
<defs><radialGradient id="v" cx="50%" cy="50%" r="75%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>
<rect width="1280" height="720" fill="#14120f"/>
<rect y="500" width="1280" height="220" fill="#1d1a16"/>
<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#d9622b" fill-opacity=".9"/>
<rect x="${x + Math.round(w / 12)}" y="${y + Math.round(h / 8)}" width="${Math.round((w * 10) / 12)}" height="${Math.round((h * 3) / 8)}" fill="#2b2722"/>
<rect width="1280" height="720" fill="url(#v)"/>
</svg>`;
  writeFileSync(new URL(`f_${String(i).padStart(4, "0")}.svg`, dir), svg);
}
console.log(`Generated ${FRAMES} placeholder frames in public/frames`);
