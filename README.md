# THANDU — A Journey Through Light

An original, interactive cinematic birthday journey for Thandu, designed with real memories, living fantasy environments, and a warm birthday ending.

## Current locked direction — 2026-11-11

**ONE public app: https://thandu.vercel.app. Real photographs must appear from the opening scene and throughout the story.**

The owner explicitly approved **public presentation of the personal photo experience**, replacing the earlier split-public/private plan. The final app must merge the rich environmental animation and interactions of public **V0.7** with the actual original-photo storytelling of private **V0.8**, and remain a single experience at the main URL.

**Work status:** the main Vercel site **still serves V0.7 artwork-only**. The separately Vercel-authenticated V0.8 contains 47 photographs but is not yet merged into the public experience. The approved next work is **V0.9 Unified Public Birthday Experience**; do not claim it is deployed until verified.

**Read the authoritative plan:** [UNIFIED_PUBLIC_V09_PLAN.md](docs/UNIFIED_PUBLIC_V09_PLAN.md)  
**Stage-by-stage execution:** [ROADMAP_AND_ACCEPTANCE.md](docs/ROADMAP_AND_ACCEPTANCE.md)

## Intended visitor journey — eight scenes

1. **First Light** — original recipient photo visible **from first load** inside the cinematic welcome.
2. **Little Beginnings** — authentic childhood photographs in the luminous memory sanctuary.
3. **Growing Years** — real memories discovered through lantern-lit architecture.
4. **A World in Bloom** — true photos among interactive garden scenery.
5. **The Joy She Brings** — actual birthday and joyful photographs in the illuminated courtyard.
6. **The Midnight Letter** — photo-adjacent quiet personal letter, sender-approved wording.
7. **Birthday Universe** — hero photo and grand light / bloom / star finale.
8. **Memory Constellation** — complete curated original-photo keepsake (47 images), gallery and replay.

Real photos are part of the main interactive worlds, not a final slideshow, upload picker, separate site or optional add-on. All scenes have deliberate Continue/Previous controls, responsive layout, reduced-motion support and optional sound off by default.

## Architecture and deployment

- **Code:** public GitHub `rayadinaveen98-ship-it/thandu`, `main` branch.
- **App:** existing public Vercel project `navin7/thandu`, permanent URL `https://thandu.vercel.app`.
- **Media:** publish **approved display copies** with unnecessary EXIF/GPS metadata removed and original appearance/faces preserved, preferably via the main project's public Vercel Blob storage. Originals remain archived untouched outside public Git history. The public CDN media can be copied, so consent and sensitivity review still matter.
- **Legacy staging:** `thandu-private` remains for owner review / rollback, **not** a visitor destination. No auth or cross-site routing in final user experience.

## Creative and safety rules

- Never invent a childhood biography or pretend the sender witnessed events before they met.
- Warm and supportive, **not romantic**.
- The owner explicitly allows creative crops, reframes and non-facial compositing. Never alter facial appearance, regenerate faces, distort proportions, hide eyes or damage source originals. See [Identity Preservation](docs/IDENTITY_PRESERVATION.md).
- Review group/child photographs for public suitability before making display copies openly accessible.
- The optional source MP4 and final birthday letter require separate content approval.

## Previous verified milestones

- [Public V0.7 Memory Constellation](docs/MEMORY_CONSTELLATION_V07.md)
- [Private V0.8 Photo Journey](docs/PRIVATE_REVIEW_V08.md)
- [Birthday Universe V0.6](docs/BIRTHDAY_UNIVERSE_V06.md)
- [Midnight Letter V0.5](docs/MIDNIGHT_LETTER_V05.md)
- [Design decision register](docs/DECISIONS.md)
- [Scene content contract](docs/SCENE_CONTENT_CONTRACT.md)
- [Photo-composition rules](docs/IDENTITY_PRESERVATION.md)

**Current objective:** integrate, not expand. A publicly accessible site with her real photograph visible on the opening screen is the first release gate.
