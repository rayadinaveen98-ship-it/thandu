# THANDU — Memory Sanctuary Pilot V1

**Status:** Working private interactive prototype. **This is not the finished birthday app and is not approved for public deployment.**

## Purpose
Continue from the completed Arrival + Bloom motion pilots with a *real photo-safe memory experience*. The new pilot demonstrates how genuine childhood-to-present photos can live inside a cinematic sanctuary without being cropped, distorted, retouched, or face-animated.

## Actual independently animated elements
- Hanging lanterns have individual pendulum motion.
- Original vector arch lines have a separate pointer-responsive parallax transform.
- A moving gold memory-thread/rune path travels behind interactable objects.
- Sky illumination, mist, and falling petals animate on separate layers from the underlying original matte painting.
- Five focusable memory sparks trigger localized particles, progress updates, and a distinct memory stage.
- Canvas-based ripples and spark bursts react to scene touches.
- An accessible Next / Previous / Close / Reset experience, with a motion toggle.

The background is still **one original static matte painting**. This is a controllable **2.5D layer pilot**, not a fully modeled 3D environment. The interactive decor is real independent geometry/animations, not optical movement of the actual portraits.

## Photo-integrity behavior

**LOCKED:** No face deformation or alteration without explicit permission. The private review build includes **five unmodified original JPEG files as exact embedded bytes**. No compression/re-encoding, AI restoration, generative reconstruction, warping, face animation, filters, or crop. The in-browser image uses natural aspect with `object-fit: contain`; independent atmospheric effects are outside the photograph.

Do not place any private JPEG bytes, contact sheets, source names, data URIs, or personal captions in this public repository. A separate no-photo review build reproduces the visual mechanics without private images.

## QA performed
- Screenshot-based inspection on Chromium desktop **1440×900** and mobile **390×844** and **360×740**.
- All five memory stages load; landscape and portrait images retain correct natural dimensions and browser `object-fit: contain`.
- Explicit Next/Previous, close/replay, and motion toggle checked; no document horizontal overflow at tested sizes.
- No script errors detected in the tested flows.
- Embedded photo JPEG data decoded byte-for-byte against the originals.
- Not verified yet on the recipient's particular device or iPhone Safari. Full UX, low-end-device and accessibility audits remain.

## Asset gate
The private portrait preview is **only a draft scene test**, not a release/publication approval. The final photos and distribution access mode must be approved separately.

## Next
1. Owner reviews the sanctuary's photo visibility, interaction and overall aesthetic.
2. Refine framing, motion density and cross-scene visual continuity.
3. Combine accepted three pilots into one journey controller (Arrival → Sanctuary → Bloom).
4. Produce real scene motion for celebration and Midnight Letter.
5. Only after asset and letter approval, prepare a private recipient-view build with appropriate protection.

**Current output:** self-contained private HTML review, public-safe no-photo variant, notes and local screenshot QA. Neither variant has been committed as production application code yet.
