# THANDU Rule 001 — Facial Identity Preservation

**Status: LOCKED — direct instruction from the project owner, 2026-11-11.**

The photographs and videos are entrusted personal materials. **Never deform, reconstruct, alter, retouch, or animate anyone's face without explicit, specific approval from the owner.** This applies to the recipient, children, and any other pictured person, and applies to previews, scene keyframes, production artwork, generated images, and delivered files.

## Absolutely prohibited without specific approval

- Face morphing, face swaps, face or eye shape modifications, digital makeup, smoothing, skin texture replacement, expression or smile changes, de-aging / age progression.
- Synthetic speaking, blinking, gaze shifts, facial movement, AI-generated portrait recreation, video face animation, generative expansion or reconstruction of faces, beauty filters.
- AI restoration or upscaling that invents or changes facial details.
- Distorting the image's aspect ratio; cinematic warps or displacement touching faces.
- Unapproved crops that cut, cover, or obscure a face, or color grading, filters, or relighting that alter how the face itself appears.
- Claims that synthetic shots depict her actual history.

## Safe creative direction

- Keep source photographs and video untouched; work on independent **background and foreground scene layers**.
- Build responsive light, particles, flower growth, architecture, sky, camera movement, sound, transitions, and interface independently of the photograph.
- Display source imagery at its original aspect ratio, without stretching. Translation and uniform render-time scaling only; avoid cropping faces or covering them with overlays.
- A scene may frame a photo inside a dimensional environment, provided it does **not** change facial appearance.
- Any photo optimization that changes pixels, any reframe affecting a face, or any proposed correction **requires preview and permission first**. Metadata-only removal may be part of an approved export workflow but does not justify pixel changes.

## Approval gate (must be recorded before exception)

1. Show original asset and exact proposed modified result side-by-side.
2. Specify the operation, scope, exact images, and why it is needed.
3. Obtain the owner's explicit approval **for that operation**.
4. Preserve the original, provide an undo path, and check the final render.
5. If uncertain, do not apply the edit. Approval for one image or operation does not generalize to others.

## Quality acceptance

- Original images remain unmodified, and are never committed to this public repository.
- No face receives generative processing or facial animation.
- Photo aspect ratios preserved across desktop and mobile.
- No interface layer obscures eyes / faces.
- No personal photos, drafts, thumbnails, contact sheets, or videos appear in public commits, issues, deployment logs, or releases without an explicit publication decision.
- This rule takes precedence over animation style, visual spectacle, convenience, and performance optimization.
