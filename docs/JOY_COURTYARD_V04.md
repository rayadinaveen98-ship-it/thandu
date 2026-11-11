# THANDU — The Joy She Brings / Connected Journey V0.4

**Status:** First-pass live interactive scene, deployed on the artwork-only public development site. **Not the finished birthday gift.**

## What is actually built

- Four connected scenes on `https://thandu.vercel.app`: Arrival → Memory Sanctuary → A World in Bloom → **The Joy She Brings**.
- New original ornamental pavilion illustration, separate from the dynamic light and birthday-stage components.
- An original CSS-built tiered centerpiece, chandelier, individually constructed lightbulbs, a responsive floral arch, starfield and live atmospheric highlights.
- Three **distinct independent controls** (Lanterns, Petals, Starlight); activating each changes a separate environmental system and advances progress. Repeated taps are safe.
- Once all three are activated, an explicit **Release the birthday starlight** button unlocks a celebratory reveal. **Replay** restores the three interactions.
- A handoff button from Bloom to Celebration, after Bloom's five flowers have opened. The main navigation always allows visiting the new chapter directly.
- Keyboard and touch accessible buttons; motion disabled via global control or `prefers-reduced-motion`.
- No audio autoplay, no user data collection, no recipient photos or video, and no generated likenesses.
- Dependency-free regression test file `tests/site-contract.test.mjs` for scene wiring and public-asset safety.

## What V0.4 is NOT

- Not finished photorealistic 3D, not an approved photo montage, not the final cake and birthday letter, not the cinematic universe finale.
- Architecture artwork and centerpiece are CSS/2.5D elements with individual live interactions, **not a film-like fully modeled 3D environment**.
- The look still needs actual phone screenshot QA, iPhone Safari coverage, performance measurements, accessibility testing, and owner visual approval.
- Vercel READY indicates static deployment succeeded; it does not prove interaction or frame-rate quality.

## QA scope this stage

- Verified 4 scenes, 4 tabs, and controller order agree; no duplicate HTML ids.
- Verified JavaScript syntax and references to local CSS, JS and SVG assets.
- Simulated the three independent celebration discoveries, gated reveal and replay; confirmed all return to initial state.
- Confirmed public-source HTML/JS contains no personal JPEG/HEIC or video paths.
- Vercel Git-connected deployment confirmed READY. 
- The regression test script is committed; automatic CI execution has **not** been configured.

## Photo preservation

**Rule 001 remains locked**: no AI face processing, changing expressions, cropping or distorting faces, synthetic facial animation, or unauthorized editing. Final approved photos belong in a private asset-delivery path, not the public repository. Public repo and site do not imply consent to publish the personal photos.

## Next production targets

1. Conduct **real browser/mobile visual QA**; refine legibility and depth of the four connected scenes.
2. Design the Midnight Letter as a fully accessible, interactive scene with placeholder copy until the sender approves the real message.
3. Create a visually cohesive world-merging birthday finale and replay / memory-gallery entry points.
4. Decide final photo hosting/access control, then integrate only approved, unchanged original assets into a secure recipient build.

**Site:** https://thandu.vercel.app  
**Source:** https://github.com/rayadinaveen98-ship-it/thandu
