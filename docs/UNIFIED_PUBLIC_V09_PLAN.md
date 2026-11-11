# THANDU — Unified Public Birthday Experience V0.9 / LOCKED REPLAN

**Decision date: 2026-11-11.** This document **supersedes the earlier split-public/private-release plan**. It is the current implementation contract, not evidence that the merge has already been deployed.

## 1. Non-negotiable product direction

**ONE visitor experience, ONE permanent URL: https://thandu.vercel.app.** No Vercel Authentication, no login, no switching to thandu-private.vercel.app, no external photo-upload step, no second recipient-facing app.

The publicly accessible experience must combine the **individually animated, cinematic environments/interaction engine from V0.7** and the **real photograph / narrative content selection and gallery model from offline V0.8**.

The owner explicitly approved making the photo-bearing recipient experience publicly accessible on **2026-11-11**, overriding prior no-public-photo delivery constraints. A separate `thandu-private` Vercel deployment remains an owner-review/rollback artifact and **must not appear as a visitor-facing destination**. No changes to Vercel project/domain settings or public photo uploads have been made merely by adopting this plan.

**From the first screen:** an authentic recipient photograph is visible within the environmental architecture as soon as the page loads. A visitor must not need to tap an empty orb, visit the keepsake, upload a file, or authenticate to see the photos.

## 2. Final visitor journey (8 scenes)

| Order | World | Photographic storytelling | Meaningful interaction |
| --- | --- | --- | --- |
| 01 | **First Light — Arrival** | **Original photograph from the very first frame**, framed in a luminous gateway. Photo is visually substantial on narrow phones, not below an inaccessible fold. | Tap light for environmental particles; explicit Begin/Continue. |
| 02 | **Little Beginnings — Memory Sanctuary** | Curated childhood/baby portraits; real photos sit within individually lit sanctuary frames. | Select memories, view original in proper proportions, Continue at any time. |
| 03 | **Growing Years** | Selected school-age, youth and early growing-up photos (no invented dates or claims). | Touch lanterns or memory windows, visible next control. |
| 04 | **A World in Bloom** | Adult garden, sari and floral portraits have a protected photographic focal area, with live flowers in their *surroundings*. | Interactive flower/seed/branch blooms; photos stay still. |
| 05 | **The Joy She Brings** | Curated smiles, celebrations and birthday photographs with animated lanterns and gifts around their frames. | Three distinct light/petal/star discoveries and replayable reveal. |
| 06 | **The Midnight Letter** | A quiet existing portrait presented beside the paper letter, not behind the text. | Open the sealed letter, read/close, continue. Wording requires approval. |
| 07 | **Birthday Universe** | Strong selected hero portrait inside the unifying celestial-floral world during the birthday reveal. | Bring the worlds together → progressive light/bloom/starlight → Happy Birthday wish, replay. |
| 08 | **Memory Constellation** | **All 47 original moments available** in a curated gallery, even if only a selection are shown in the guided chapters. | Theme filters, previous/next, original-aspect viewer, return/replay. |

**Private editorial mapping already exists** in the V0.8 photo manifest and private story map. Use it as a starting point without inventing biography or chronological precision. The main journey should be edited for emotion and pacing, **not** show 47 photos sequentially or duplicate every photo in multiple scenes. The gallery provides full access to the collection.

**Optional existing MP4:** explicitly excluded from core V0.9; review later and include only if suitable. No forced video or audio autoplay.

## 3. Design system and scene merger

- The *app shell, scene orchestration, keyboard/touch controls, full-screen transitions, reduced-motion preferences, and ambient particles* come from the GitHub public V0.7 frontend.
- The *editorial photo sequence, real portrait framing, story selection, gallery content and true photographic dimensions* come from the private offline V0.8 build.
- A **single scene data contract** supplies `id`, `chapter`, `art`, `heroPhoto`, `supportingPhotos`, `approvedCopy`, `interactions`, `reducedMotionFallback` and `next` to both mobile and desktop layouts.
- Maintain **one source implementation**; do not copy two page engines together, swap to an unrelated static photo slideshow, or keep a permanent photo-only frontend.
- The same travelling golden light links each scene. Real-photo frames are always meaningful elements of the world, not thumbnails pasted over a canvas or hidden until the final gallery.
- Face-safe cropping/masking and non-facial compositing are approved. **Never deform, regenerate, retouch, warp or obstruct any face.** Archive originals untouched.
- Distinguish environmental backdrop animations from photographic pixels: no simulated facial motion. User-controlled photo carousel. Single clear primary action per scene.
- Phone portrait layout is the main approval surface (including 360px, 390px, and iPhone 15), with desktop composed independently rather than stretched.
- Remove `PRIVATE OWNER REVIEW`, `Choose photos`, `preview wording`, and all owner-only/debug labels from the recipient build.

## 4. Public media pipeline / one app

**Ownership:** One GitHub code repository (`rayadinaveen98-ship-it/thandu`), one public Vercel project (`navin7/thandu`), one primary URL (`https://thandu.vercel.app`).

**Asset delivery recommendation:** An attached **public Vercel Blob store** serves the 47 approved, web-optimized presentation copies; the GitHub app keeps only the non-sensitive asset manifest/URLs and code. This avoids re-uploading 47 media files on every Git-triggered deployment and avoids the history permanence of pushing original family JPEGs into the public code repo. Vercel Blob is accessible on Hobby within free usage limits, and stores return stable public URLs. Monitor actual usage and do not upgrade to paid service without owner approval. A static-asset deployment with the *same* main project is a fallback if Blob provisioning or upload is unavailable; don't create another visitor app.

**Before first public asset upload:**
1. Make derivatives, **not edits to originals**, and ensure photos are selected for public release. Owner permits public release in principle, but review any pictures containing other children or unrelated adults and any especially sensitive image before selecting a public version.
2. Remove EXIF/GPS/device metadata from public copies while preserving facial appearance; verify the resulting rendered pixels, face proportions, orientation, alpha and aspect.
3. Assign opaque file names and stable identifiers; publish only images used in the app and approved gallery, not hidden unused originals or a raw contact sheet.
4. Supply real metadata-free image URLs in a shared scene manifest and test every one, including error/fallback states.
5. Mark `noindex` if desired, **but never call a public image private**. CDN images and page screenshots can be copied and cached even after deletion.

The public gallery should **prepopulate** the actual 47 photos. Remove the local file chooser from the recipient flow; owner-only device selection can remain in a development tool, not visible on the gift.

## 5. Fixed implementation gates — no new scope

**Gate A — One code path:** Convert the public scene engine to a shared 8-scene contract, add Growing Years, preserve all previously working transitions, six-world effects and controls, simplify to one navigation system. No personal photos uploaded yet.

**Gate B — Photo from the opening:** Attach true photo manifest, integrate immediate visible first hero and selected authentic photo stages into every suitable world. Every memory frame supports open/next/previous; preserve facial fidelity. Replace the empty public Keepsake with the curated 47-photo gallery.

**Gate C — Emotion and visual polish:** Unify artwork from the approved concept paintings with independent motion layers; improve clarity, text sizes, depth, touch behavior, continuity, quiet letter and finale. No synthetic people. Approved personal letter replaces draft copy; do not invent shared memories.

**Gate D — Public release and quality:** Publish approved presentation copies to public media delivery. Verify all URLs / metadata / full flow. Test iPhone Safari, Android Chrome, desktop, slow/mobile network, reduced motion, accessibility, frame rate and memory use. Then deploy to the **existing** `thandu.vercel.app` URL and confirm from unauthenticated browser that photos appear **on first load**.

**Gate E — Recipient readiness:** Final editorial review, valid greeting, no private draft labels, no missing/broken image, no overflow, no inaccessible next/close controls, no forced sound. Keep a rollback deployment. Publish no new features beyond these gates.

## 6. Acceptance checklist (must actually pass)

- Loading `https://thandu.vercel.app` in a fresh anonymous browser shows **a real photograph without any extra click**.
- The first screen has an elegant layout where photograph, intro and Begin action are visibly legible on a phone.
- The visitor remains on **one domain**, one journey, with all eight story scenes linked and the gallery populated.
- Every intended photo is served by the site; no selection or upload is required.
- Photos are artistically framed, can be viewed in true proportions, and preserve face identity.
- No invented personal history, no romantic language, no private-review/development labels.
- The cinematic effects are meaningful and responsive rather than one flat slideshow or overly busy collage.
- No console errors, asset 404s, blank scenes or broken navigation. Graceful reduced-motion/low-power fallback works.
- The birthday letter is sender-approved, and public media choices have been reviewed where third-party people/children are pictured.
- One codebase and one Vercel site receive future improvements; the old protected deployment is not part of recipient navigation.

## 7. Honest current status

At the time of this plan, **the main public Vercel site is still the old V0.7 artwork-only app**. The personalized V0.8 exists separately in a Vercel-Authentication-protected project and an offline bundle. Merely committing this document does **not** make photographs appear on the main site.

**No new app, extra feature, additional chapter or separate URL is approved.** The only task is merging the proven parts into a single usable experience with real photographs throughout.

**Source/owner safety:** Preserve the original uploaded files and face-preservation rule. The owner's explicit public-photo approval replaces the earlier default of private delivery, but does not require posting raw originals or metadata into Git history.
