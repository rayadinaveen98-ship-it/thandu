# THANDU — Screen 01 V2: First Light / The Arrival Portal

**Stage:** Design + coded prototype on `arrival-v2-cinematic-intro`, pending owner's real visual approval. Other seven screens are strictly out of scope.

## Purpose

The first screen is a *personal invitation to a journey of original memories*, not a generic fantasy-themed landing page. Within three seconds of arriving at the resting state the visitor should understand the sender's intent: **Thandu, her real photograph, a warm light, a story worth exploring.**

## Content locked for trial

- Brand: `THANDU` / small supporting label `A JOURNEY THROUGH LIGHT`
- Eyebrow: `AN INVITATION INTO WONDER`
- H1: `Every beautiful journey begins with a little light.` (keep existing sentence)
- Lead: `For Thandu — a story of little moments, bright days, and everything yet to come.`
- Primary CTA: `Begin the journey` → existing Little Beginnings world.
- Secondary light remains clickable with clear intent, but not a competing primary CTA.
- First portrait: `/media/scene-50.jpg` (original-appearance diya photograph). No face edits, recompression or synthetic motion.

## Desktop composition (≥ 980px wide)

- **Top:** minimal brand left / existing motion toggle right; no more extra large labels.
- **Left 8–50%:** headline in editorial serif, 45–61px; approximately 2–3 lines at the target width. Eyebrow 10px / 0.2em tracking. Supporting line 14–16px, readable, warm ivory, max 530px.
- **Right 54–90%:** large luminous photograph in its own warm-gold arch. Portrait window uses `object-fit:contain`; natural face proportions preserved. Decorative gateway subtly follows the photo frame.
- **Primary CTA:** in dedicated left-bottom action area beneath text (not inside image, with ≥24px spacing). Minimum height 48px.
- **Visual metaphor:** the *same small golden light* exists during intro and then at the edge of the photo-world, where it guides the next scene.
- **Suppress clutter:** right moon ≤135px at ≤25% opacity; halve grid/pillar contrast; reduce halo opacity. No tiny unreadable copy under the portrait.
- **Journey rail:** remains at bottom, active chapter distinguishable and all 8 still accessible.

## Mobile portrait composition (360–430px wide)

- **Header:** single-line THANDU brand and small visible motion toggle; top-left safe area.
- **Top centered:** eyebrow / 2–3 lines of headline / supporting sentence in a compact readable stack, at least ~11–12px for supporting copy.
- **Middle:** authentic portrait in dominant, warm frame, 145–210% larger *in displayed area* than prior phone implementation where possible; never crop eyes or lips.
- **Below photo:** primary CTA lives outside the frame and clears the bottom chapter rail by at least 16px.
- **Bottom:** scrollable 8-stage chapter rail with tappable next/previous arrows. Do not reduce tap targets below 44px.
- **Short viewport:** reduce frame/headline height carefully; if 320–360px width or under ~690px height, prioritise photo and CTA over decorative scenery. No horizontal overflow.
- **Reduced motion:** no extended opening sequence; present the finished, usable screen immediately.

## Mandatory opening animation — 6.5 seconds, every fresh page load

Theme: **A Little Light Becomes a World**. The same original photo is revealed in the intro and then carried visually into the resting first screen.

| Time | Visual | Narrative meaning |
| --- | --- | --- |
| 0–0.7 s | Velvet-indigo darkness; faint distant pinpoints | A quiet beginning |
| 0.7–1.7 s | One golden spark lights up; subtle halo breathes | One meaningful light |
| 1.7–2.9 s | Architectural arch and star orbits form around the light | A world made for her |
| 2.9–4.2 s | Real diya photograph fades in within gold-framed portal | Her actual presence |
| 4.2–5.7 s | `For Thandu.` and `A Journey Through Light` appear in carefully spaced typography | A personal invitation |
| 5.7–6.5 s | The intro yields into finished First Light screen | Seamless, interactive beginning |

- **Every reload** starts the intro. No `localStorage` skip or one-time visit flag.
- **Skip intro** is visible and keyboard accessible immediately; Escape also skips. Focus is kept inside the intro while showing.
- Body, header and route UI are inert while welcome is up, released once skipped/completed. Focus is returned to primary CTA on explicit skip.
- **No audio autoplay**; motion and sound choices remain separate. No cinematic boom, no fake photo movement or generated faces.
- `prefers-reduced-motion: reduce` and JS failure mode both allow the scene to be reached without waiting.
- Use CSS compositor animations where possible (opacity and transform), limited particle count, no expensive real-time full-screen shaders.
- Never block image loading until intro ends; the authentic hero image is preloaded in the document head.

## Quality gates before owner sign-off

1. Desktop 1440×900: headline, CTA, portrait and rail never overlap.
2. 390×844 and 360×740: actual face naturally visible, CTA not clipped, navigation not covering the portrait.
3. 320px width and shorter height: text remains readable and button remains reachable.
4. Tab, Escape, Skip intro, reduced motion, reload replay, no autoplay sound.
5. Touching the guiding light and Begin both navigate to Little Beginnings.
6. No loss of existing photo viewer, sanctuary portals or chapters 2–8.
7. Intro runs ~6.5 seconds when not skipped, no persistent skip flag.
8. Live screenshot validation and real-device approval are mandatory before merge into public main.

## Explicit scope

This stage only includes Screen 01 visual hierarchy, opening animation and related accessibility. Do **not** change story flow, photo source IDs, other screen artwork or any of the seven later chapter interactions.
