# THANDU — Connected Living Journey V0.3

**Status:** First unified, public-safe art-and-interaction build deployed to Vercel. **Not** the finished birthday experience. No user photographs, video, private captions or letter have been uploaded.

## Live development environment

- https://thandu.vercel.app
- GitHub source branch: `main`
- Vercel project: `navin7/thandu`
- Three linked chapters: The Arrival → Memory Sanctuary V2 → A World in Bloom.

## Work completed in this integration

1. **One recurring guiding light:** dedicated interaction in the Arrival, with an independently animated golden light traveling across intentional chapter changes. Reduced-motion mode switches chapters directly.
2. **Artwork:** original `assets/garden-canopy.svg` floral vector, layered with the live garden backdrop rather than pasted over real photographs. Existing celestial arch and sanctuary layers remain separate.
3. **Bloom interaction:** five distinctive blossoms with separately transforming petals, progress, completion reward, and replay. No fake click area or pre-rendered flower-opening video.
4. **Memory Sanctuary:** the five named portal stages, an actual discovery counter, and a larger memory-viewing dialogue with Next, Previous and Close. No real photos in the public site.
5. **Accessibility and input:** visible chapter tabs, keyboard Left/Right from tab buttons, browser-compatible transition fallback, support for reduced motion, meaningful aria labels.
6. **Engineering cleanup:** eliminated the legacy duplicate portal handler; modal navigation behind the open photo stage is suppressed; canvas animation pauses when effects are off or the page is hidden and resumes when appropriate.

## Verification

- JavaScript syntax confirmed for the updated source.
- Interaction smoke tests exercised first load, all five memory portals with viewer controls, navigation across all three scenes, completing all five flowers, and replay.
- HTML/source inspected to exclude personal JPEGs, original HEICs and videos.
- Vercel's production deployment from the commit has reported **READY**.
- **Still to verify:** full live mobile screenshots and motion/frame rate, real-device touch behavior, Safari/iPhone, assistive technology audit, full cross-browser QA. A READY deploy does not prove visual quality.

## Creative limitations

- This remains layered **2.5D/CSS/Canvas/SVG visual artwork**, not a modeled 3D scene.
- Some of the richer original concept matte paintings have not been separated into individually animated elements yet.
- Only the first three chapters exist as connected experiences. Celebration, the Midnight Letter, finale, gallery, and approved photo integration remain unfinished.
- Some text and photo portal content are placeholders. The completed gift must be authored from approved copy and approved, protected assets.

## Privacy and identity rules

- Public GitHub and public preview contain **no private photographs or personal media**.
- The owner has instructed that every pictured face is preserved exactly, with no deformation, AI regeneration, beautification, expression change or facial motion without specific permission.
- The photo-bearing birthday gift must use an agreed access method before any deployment; public code/repo does not imply consent to publish childhood images.

## Next stage

**Visual polish and truthful media integration:** compare live scenes to approved keyframes on real devices; refine structural depth and clarity; build a private photo-safe media adapter; then continue to Joy, Letter, and Finale without diverting into unrelated features.
