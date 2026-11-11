# THANDU — Memory Constellation V0.7

**Status:** Seventh interactive chapter + device-only photo preview, deployed as a public-safe development build. **Not the final personalized gift.**

## What was implemented

- **Seventh chapter**, `Memory Constellation`, connected after Birthday Universe and accessible from the finale and chapter tabs.
- Original animated celestial keepsake with five interactive constellations: Little Beginnings, Growing Years, In Bloom, Joyful Moments, Favourites.
- **Real local photo preview on any supported browser:** user intentionally chooses JPEG, PNG or WebP files using an explicit file-picker button. Maximum 60 photographs, up to 30 MB each.
- The browser creates short-lived `blob:` object URLs with `URL.createObjectURL`. Photos are shown directly inside this browser tab; **no network upload, backend storage, analytics, cookies or persistent client storage are used for the personal files**.
- A responsive thumbnail gallery with filter pills, live photo count, and full-size image viewer using `object-fit: contain` for unchanged aspect ratio and unmodified faces.
- The owner can manually assign a photo to a thematic cluster through the full-size viewer. No dates, ages, relationships or chronology are inferred. Group assignments exist only in memory during that tab session.
- Previous/Next/Close for photo inspection, accessible labels, keyboard-controlled gallery opening and closing, and Escape support.
- Clear-photo action revokes every `blob:` URL. Selecting a new collection replaces and revokes the old set. `pagehide` and `beforeunload` also clean up.
- Four finale choices remain legible on narrow phones after introducing the gallery action.
- Seven-chapter controller and scrollable tab navigation on mobile.

## Privacy model and limitations

**Public preview includes no personal photographs or private letter.** A visitor cannot see Thandu's personal files unless that visitor deliberately chooses images from their own device. The currently displayed images are **never transmitted to THANDU's server** by the gallery code.

This is only a **manual private-preview workflow**; it is not a final recipient-ready setup. Browser-reload/closing clears selected content, and category assignments are **not saved**. It does **not** automatically ingest the previously shared 47 unique private photos or birthday video. It does not automatically add real images to the earlier Memory Sanctuary scene.

The final recipient gift needs an approved secure delivery method: a truly private offline package or a protected hosted content store (server-enforced authorization), with only approved photo derivatives and personal writing. **The public GitHub repo and Vercel deployment remain photo-free.** File uploads to Vercel are not supported by this public preview. Merely hiding URLs or adding a client-side password is not sufficient access control.

## Face integrity

Owner's updated permission allows face-safe reframing, non-facial compositing and masks when required. **Face appearance and originals remain unchanged.** This V0.7 gallery does not crop or resample uploaded images and uses `object-fit: contain` to display natural proportions. See [IDENTITY_PRESERVATION.md](IDENTITY_PRESERVATION.md).

## Verification performed

- Confirmed seven scene IDs, navigation buttons and JS scene order match.
- Confirmed local source references, JS syntax, CSS brace balance, responsive and reduced-motion markup.
- Simulated a browser file-selection interaction: permitted image files create local blob URLs; unsupported types are skipped; gallery thumbnails, full-screen viewer, manual category assignment and filtering work; Clear revokes blob references; closing restores background interaction.
- Verified absence of fetch, XMLHttpRequest, sendBeacon and localStorage persistence code in the photo-gallery module.
- Vercel deployment status checked independently.
- **Remaining:** real phone/desktop screenshot QA, Safari/iOS private-file picker and animation checks, low-end performance audit, screen-reader audit, final approved photo content, private delivery and user approval.

## Next stage

1. Decide secure delivery (offline/private package versus server-authorized hosted link).
2. Map selected original photos and approved captions to the six narrative worlds, keeping face-safe working copies private.
3. Build final photo integration and letter outside public source, verify recipient access on real devices.
4. Complete artwork fidelity and visual QA before gifting.

**Development demo:** https://thandu.vercel.app  
**Source:** https://github.com/rayadinaveen98-ship-it/thandu
