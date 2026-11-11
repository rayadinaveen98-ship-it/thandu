# THANDU — Screen 01 V3: The Festival of Little Lights

**Status:** Implemented in GitHub review branch `arrival-v2-cinematic-intro`. **NOT YET DEPLOYED** to Vercel due to the Hobby team's deployment quota (402: `api-deployments-free-per-day`). **Do not present V2's old URL as V3.** This replaces the V2 Arrival design direction.

## Owner feedback that drove this revision

The V2 welcome felt like a static dark/color background with an arch, orbit, and photograph. The owner asked for a **vibrant, celebratory, genuinely living environment with rich visual layers**. The intro must begin in almost-total darkness, awaken via a candle or diya flame, and gradually bring beautiful background objects to life. **No photograph is permitted during the intro.**

Once Screen 01 appears, its authentic photograph must **not appear immediately**. A **glowing bird should perch there and invite touch**, and touching it reveals Thandu's photo. Screen 01 should contain genuine background animation and interactions, not decoration pasted over a flat background. Retain the emotional promise, but make the experience more joyous and dimensional.

## V3 creative contract

### Opening sequence — exactly 6.5 seconds

| Timeline | What happens | Meaning |
| --- | --- | --- |
| 0.0–0.7s | Almost-total darkness. A diya bowl and wick emerge. | A quiet beginning, no photo |
| 0.7–1.7s | A single warm flame ignites and grows. | One light can change a world |
| 1.7–3.0s | The first light spreads. Celestial glow, lamps and ribbons become visible. | Wonder starts moving |
| 3.0–4.5s | Colored flowers, garlands, hanging fairy lights and lanterns awake. | The night becomes a celebration |
| 4.5–5.8s | A living garden and festive space resolve in the candle glow. | A world just for Thandu |
| 5.8–6.5s | The title “A world awakens for Thandu.” resolves; dissolve into Screen 01. | A clear personal invitation |

- There is **no real-photo image element anywhere inside the welcome overlay**, and no synthetic face.
- Accessible Skip button always available; Escape works.
- The scene underneath is inert during intro, released after end or skip.
- Fresh page load replays the intro. There is **no persistent skip flag**.
- If the OS requests reduced motion, skip intro entirely, without blocking the journey.
- Sound remains off unless separately chosen; none autoplays.
- Falling back after a JS error should not permanently obscure page (CSS intro visibility clears after 6.5s).

### Resting Screen 01 — a living celebration garden

The background is built of independent layers: an original art foundation, floral canopies that gently sway, decorative string lights that fluctuate, hanging lanterns, drifting petals and fireflies, a reflective pool with moving ripples, a luminous memory arch and warm dust. Users can **tap either lantern to brighten/dim it**; these are real buttons with accessible labels/pressed state. Pointer movement adds restrained parallax to scenery only, not to any human photograph.

### The bird and the precious first memory

- In the unrevealed state, a **decorative sealed/veiled memory gateway** sits on the right of the desktop composition. It contains no visible facial pixels.
- An original articulated SVG bird perches on a flowering branch close to the gateway. Wings and tail subtly animate. The bird is a real **keyboard-operable button**.
- **Touch bird → flight/particle trail → veil opens → original Thandu diya photo appears in warm-gold frame**. The face and original file are unchanged.
- The primary action provides a transparent alternative: **Reveal the surprise**. The first click on it reveals the same memory and **does not navigate**; once revealed, its label becomes **Begin the journey**, and subsequent clicks navigate to Little Beginnings.
- The full-size photo viewer remains available after reveal. Photo stage is initially `inert` and `aria-hidden`, and becomes accessible after reveal.
- No new scenes added; all **eight existing chapters and their logic remain intact**.
- If a visitor prefers reduced motion, the bird/CTA reveal happens immediately rather than animating flight.
- Interactive lanterns and bird controls use explicit accessible labels and keyboard focus rings.

## Layout and quality gates

**Desktop ≥1020px:** Editorial text on left, meaningful festival background across screen, bird perched between text and right portal. CTA in a separate action zone. No photo/CTA or headline overlap. Memory reveal remains visually dominant after bird departs.

**Mobile ≤760px:** Text at top, centered portal, smaller perched bird on portal edge, primary action beneath portal and above chapter rail. Short viewports use shorter portrait height and suppress optional copy but **never** hide the primary action. Ambient object count reduced on phone.

**Checks completed at source level:**
- No photo in intro; real portrait hidden on initial scene
- 6.5s timer, Skip, Escape, reduced-motion route
- Bird + alternative CTA gating
- Active lighting buttons, separate ambient layers, bounded particle counts
- Eight-scene integrity, no duplicate IDs, JS syntax, CSS brace balance
- Simulated normal/skip/escape/reduced-reveal and lantern interaction paths

**Still outstanding:** Running the Node tests in actual GitHub Actions, receiving a fresh Vercel preview after quota reset, taking actual desktop and mobile screenshots, and user visual approval. These are release gates; do **not** claim V3 is visible on the earlier V2 preview.

## Vercel deployment blocker

On 2026-11-11 the team returned HTTP 402:
`Resource is limited - try again in 24 hours (more than 100, code: "api-deployments-free-per-day")`.
A manual static deployment attempt was also rejected with the same quota. **No paid plan or upgrade is authorized.** Continue source and test refinement, then perform a **single** preview deployment after the allowance resets. Leave current `main` production unchanged until visual QA and owner approval.

## Assets and code

- `index.html`: candle-lit intro, articulated bird and veiled photo, lanterns and atmosphere
- `assets/arrival-v3.css`: living background, layered festival architecture, animation timing, reduced motion, phone responsiveness
- `assets/arrival-v3.js`: orchestration, intro skip, bird-to-photo reveal, two-step CTA, interactive lanterns, ambient behavior
- `tests/arrival-v3.test.mjs`: intro, interactions, accessibility and non-regression contracts

**Replaced V2 assets** remain in Git history; no longer referenced from `index.html` on this branch. No new private photographs added to Git or modified. Public display uses the existing metadata-free image service `/media/scene-50.jpg`.

**Next:** once Screen 01 is visually reviewed and approved, merge this branch to `main`, then begin Screen 02 individual audit.
