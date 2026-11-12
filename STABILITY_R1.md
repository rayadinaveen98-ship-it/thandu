# THANDU Five-Chapter Stability R1 — Repair & Release Gate

**Date:** 2026-11-12. This branch is independent of the main website and approved creative chapters. Status: **repaired source prepared locally; GitHub APK build awaits upload of the new source ZIP**. The old Checkpoint 1 APK must not be used for release.

## Defects addressed

| Diagnostic ID | Remediation |
|---|---|
| C01/C05/C11/C18 | Unified one-active-chapter controller; all inactive stages `display:none`, `inert`, `aria-hidden`; old animation controllers receive their exit lifecycle events and stop rendering. |
| C02/C10 | Central route map for all five chapters and a stable, always-visible accessible Memories → Growing Years button, regardless of 320/360px width or photo discovery count. |
| C03/C08/C12/C17 | Landscape scrolling when viewport height is short; 320px Joy photo wall moved away from action controls; major CTA targets 44px minimum; inset-aware navigation. |
| C04/C16 | Native Android Back calls JS `THANDU_APP_BACK`: closes open original-photo dialogs or navigates to the previous chapter using app history. |
| C06/C07 | Extract 31 original image data references into 27 **byte-identical** local image files; deduplicate repeated content, reduce HTML from **7,296,898** to **231,794 bytes**. Load via streamed asset interception in Android WebView instead of synchronously copying the huge HTML on Android's main thread. |
| C09 | Animate the bird's SVG artwork while keeping its button's tap target stationary. |
| C13/C20 | Make the final Joy action explicit: this checkpoint ends after five chapters; the Midnight Letter is not falsely presented as implemented. |
| C14/C19 | Shared global reduced-motion CSS and improved Android console logging / renderer recovery diagnostics. |

## Verification

- **390×844 portrait:** 25 / 25 browser integration checks passed, zero JS exceptions
- **320×640 compact phone:** 25 / 25 passed, zero JS exceptions
- **800×360 landscape:** 26 / 26 passed, zero JS exceptions, page scrolling accessible
- **1440×900 desktop:** 25 / 25 passed, zero JS exceptions
- Original image-byte hashes verified for each of the 27 deduplicated JPEG/WebP assets. No facial editing, recompression or quality reduction.
- The media-path simulation intercepted `https://appassets.androidplatform.net/media/…` and successfully loaded the real 960px JPEG.
- Actual installation, GPU performance, OEM font scaling and Android gesture tests **still require a real-device QA pass**. Browser tests cannot certify them.
- An installable R1 APK is **not claimed** until the GitHub Action builds, signs, verifies and exposes the artifact.

## How to build the repaired APK

1. Download the new `THANDU_Five_Chapters_Stability_R1_Source.zip` shared in ChatGPT. This ZIP contains the exact repaired Android project, local media, `STABILITY_BUILD_MANIFEST.json` and `STABILITY_REPORT.md`.
2. Upload that ZIP to the root of **this branch** `android-stability-r1` using GitHub's Add file → Upload files control. Do not overwrite the previous `THANDU_APK_Source.zip` in the older branch.
3. The workflow `THANDU Android — Stability R1` checks the new source SHA-256, every media asset SHA-256, app versionCode **2**, Java loader and navigation integration, then compiles and verifies the installable APK.
4. Open GitHub Actions → newest successful `THANDU Android — Stability R1` run → download the artifact `THANDU-Stability-R1-Installable-APK`.
5. Extract and install `THANDU-Stability-R1-Five-Chapters.apk`, then validate each chapter on your physical Android device.

## Isolation policy

- Do **not** merge this branch into `main` before the updated APK has passed physical review.
- Original approved artwork, real-photo bytes and five thematic interactions remain intact.
- **No new chapters** were added. Letter, Universe and Keepsake remain subsequent milestones.
- The source archive contains family photographs in a **public** GitHub repository once uploaded; public sharing was previously approved by the owner, but links and ZIP history remain accessible.
