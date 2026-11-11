# THANDU — Midnight Letter / Connected Journey V0.5

**Status:** Interactive public-safe preview committed to `main`; **not** the complete gift. **No private photographs, video, or personal letter have been published.**

## Creative direction

After the bright courtyard, the journey deliberately becomes quieter: a moonlit celestial observatory, layered gilded rings, an illuminated sealed envelope and a warm paper letter. The guiding-light transition continues into the fifth chapter. The letter is **non-romantic**, respectful and supportive, with **explicitly provisional** placeholder writing until the owner approves the final note.

## Implemented

- Added fifth scene: `Arrival → Little Beginnings → World in Bloom → Joy → Midnight Letter`.
- Created original `assets/midnight-observatory.svg` atmospheric architecture.
- Implemented layered rotating celestial orbits, wax seal and animated folding envelope with CSS, separate from the backdrop.
- A fully accessible button opens the letter. The paper can be read without audio, timers or forced text-reveal animation.
- Close and read-from-start controls, click-outside closing, Escape, reduced-motion alternative, and focus management.
- Navigation from the Joy courtyard's birthday reveal directly to the letter, as well as main chapter navigation.
- The private image/video collection is intentionally absent from all public code and deployment assets.

## Testing performed

- Verified five HTML scene sections, five matching chapter tabs and JavaScript controller order.
- Verified no duplicate HTML IDs, all letter hooks exist, and all new scripts parse.
- Verified JS logic under a simulated DOM: seal opens, letter reveals, background controls become inert, Escape closes, focus returns to the seal, and read-from-start scrolls to the top.
- Verified original `midnight-observatory.svg` exists, letter CSS braces match and prefers-reduced-motion and manual motion controls are respected.
- Verified public preview HTML and scene JavaScript contain no embedded JPEGs, HEIC photos, or videos.
- **Real-phone and live-browser visual QA remain open.** Successful Vercel builds alone are not visual acceptance.

## User-approved photo composition change — recorded 2026-11-11

The owner permits artistic crops, reframing, masks and compositing as necessary **outside the facial area**. Faces must never be altered, regenerated, retouched, distorted or obscured without explicit new permission. Original files remain unmodified. See [THANDU Rule 001](IDENTITY_PRESERVATION.md). This authorization is **not** permission to publish personal media to the public repository or preview.

## Next milestone

Create a coherent **Birthday Universe** finale that reunites celestial, floral and celebratory worlds. After that, implement a private media delivery strategy, insert approved imagery with face-safe compositions, add the approved personal message and perform complete device QA before recipient delivery.
