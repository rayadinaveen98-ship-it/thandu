# THANDU — Production Roadmap

**CURRENT LOCKED DIRECTION (2026-11-11): [Unified Public Birthday Experience V0.9](UNIFIED_PUBLIC_V09_PLAN.md).**

One public website — **https://thandu.vercel.app** — with **real photos from the opening scene** and cinematic interactions integrated throughout. The previous split-public/private-delivery plan is superseded. This roadmap records actual implementation status; a completed plan document does not imply a deployed feature.

## Current implementation

| Deliverable | Verified status |
| --- | --- |
| Main public eight-scene frontend | **V0.9 integration deployed** at https://thandu.vercel.app with eight worlds, original opening photo and chapter-photo stages |
| Personalized eight-scene V0.8 | Completed for owner review, with 47 original photos; currently **separate**, protected Vercel project + offline bundle |
| Single eight-scene **unified** frontend with photos throughout | **Implemented and deployed**. Eight scene routes, photo manifest, authentic opening image, five memory portals, guided chapter frames and 47-photo public Keepsake |
| Public display-safe media pipeline | **Implemented**. 47 already-prepared JPEGs without EXIF plus five original WebP environments served via same-domain `/media/` rewrite to independent static image service; public image returned HTTP 200 |
| Approved sender letter and full recipient review | Pending |
| Public merged V0.9 release | **Deployed for owner review**; release approval and real phone visual QA not complete |

## Current fixed work — one integration sprint

| Gate | Work | State |
| --- | --- | --- |
| **A** | Merge seven public worlds and eight private chapters into one app shell / manifest; create Growing Years; preserve motion, accessibility and navigation | **Implemented** |
| **B** | Show first real hero photograph **immediately on landing**, then selected real-photo scenes and all 47 in final Keepsake | **Implemented**; first photo URL checked 200, gallery smoke test passed 47 thumbnails |
| **C** | Unify cinematic layers, face-safe framing, letter/finale, transitions and recipient copy | **Partially implemented**; CSS/art integrated; final personal letter and design sign-off pending |
| **D** | Publish approved sanitized display assets through public CDN; run anonymous access, phone/desktop, image-loading, accessibility and performance tests | **Partially verified**; 47 JPEGs have no EXIF, public first-photo and artwork URLs returned HTTP 200, 29/29 structural checks and 7/7 gallery smoke tests passed; real-device QA pending |
| **E** | Final content/third-party photo approval, recipient copy, rollback check, release on **existing** https://thandu.vercel.app | **Not started** |

**No additional feature or new app scope is authorized for V0.9.** The seven prior worlds, V0.8 private editorial photo manifest and already-built effects remain assets to reuse, not implementations to throw away.

## Release acceptance (required, not aspirational)

1. First photo appears *on the first screen* on a fresh anonymous phone browser; no file picker, extra link or sign-in.
2. Eight chronological/poetic thematic scenes flow on the **same website**, with real photos in all suitable scenes.
3. Gallery includes all approved 47 images; all photos open in original aspect ratio. No face editing.
4. Real phone and desktop pass for navigation, image resolution, touch targets, text contrast, controls, reduced motion and video/audio default-off.
5. No factual invention in the personal message, no unapproved sensitive/group photos, no stale "private owner review" labels.
6. Deployment, URL, anonymous accessibility and asset serving verified independently.

## Prior milestones and source references

- [V0.7 Memory Constellation](MEMORY_CONSTELLATION_V07.md) — live photo-free interactive world
- [V0.8 private owner review](PRIVATE_REVIEW_V08.md) — integrated real photos in a separate owner-review build
- [Birthday Universe](BIRTHDAY_UNIVERSE_V06.md) and [Midnight Letter](MIDNIGHT_LETTER_V05.md) — prior world interactions
- [Face-safe photo composition policy](IDENTITY_PRESERVATION.md) — remains binding, even with public approval
- [Unified V0.9 integration contract](UNIFIED_PUBLIC_V09_PLAN.md) — **current source of truth**
