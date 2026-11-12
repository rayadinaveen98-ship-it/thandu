# THANDU — Android Checkpoint 1 (five chapters)

**Android build completed successfully on 2026-11-12.** This branch is separate from `main` and changes nothing in the public website or owner's approved web screens.

## Source provenance

The full working Android project and identical, fully embedded web experience are packaged as **`THANDU_APK_Source.zip` (5.4 MB)** in the ChatGPT conversation. It contains the entire `app/` directory, Gradle settings and original assets. It cannot be substituted with the existing GitHub web frontend because that web frontend does **not** contain the latest approved five-chapter offline experience.

**Required HTML SHA-256:** `40166a234e0143c777a5db6ade16788879d3879ce8688fd971f1b4186fdee97c`

**What is in the APK source:** Welcome V4, First Light, Memories, Growing Years, A World in Bloom and The Joy She Brings V1. It is a five-chapter testing checkpoint with the welcome, not the final eight-chapter gift.

## Successful Android build — 2026-11-12

- Source archive uploaded and committed on branch `android-checkpoint-1` at commit `2a3fe3e007a19a9466684d355490021679faccbb`.
- First GitHub Actions build failed during Android SDK initialization because a third-party setup action tried to install removed package `tools`.
- Corrected workflow commit: `b76c7752d0bd7c05a847bc5b6889d04771e05c63`. Uses the runner's preinstalled SDK and installs Android API 35.
- **Successful workflow run:** https://github.com/rayadinaveen98-ship-it/thandu/actions/runs/43140024347
- **Verified artifact:** `THANDU-Five-Chapters-Android-APK` (artifact ID `13909770065`).
- **Installable debug APK:** `THANDU-Five-Chapters-Review.apk`, 5,563,657 bytes.
- SHA-256 of APK: `c28cce1c5d38e9a1d174b2795a650cabd14bdab6beb90307aff282e9168aee28`.
- Embedded HTML SHA-256: `40166a234e0143c777a5db6ade16788879d3879ce8688fd971f1b4186fdee97c` — **exact match to approved offline source**.
- GitHub build confirmed dex, manifest, local HTML, APK archive validity and debug signature. Downloaded artifact independently inspected and CRC passed.
- **Actual installation and live on-device animation/performance QA remain pending.** This is a debug build, not a production-signed release.

## Reproducing the build (one user upload)

1. Download **`THANDU_APK_Source.zip`** from the current ChatGPT response.
2. Open [this branch on GitHub](https://github.com/rayadinaveen98-ship-it/thandu/tree/android-checkpoint-1), click **Add file → Upload files**, and upload that ZIP **at the root of this branch** without changing its filename. Confirm the branch selector says `android-checkpoint-1` and commit directly to that branch. **The repo is public: uploading will make the embedded photographs publicly downloadable in the ZIP and retain them in Git history.** Do not upload if this is unacceptable.
3. GitHub Actions workflow [THANDU Android — Five Chapter APK Checkpoint](../.github/workflows/thandu-android-checkpoint.yml) is configured to run automatically on that upload. It checks the ZIP, extracts the project, verifies the embedded HTML checksum, installs Android API 35, compiles and signs an Android **debug** APK, then verifies the APK contains the identical HTML.
4. Download the **THANDU-Five-Chapters-Android-APK** artifact from the successful Actions run. Extract **THANDU-Five-Chapters-Review.apk** and install it on an Android device. Debug APKs are not Play Store production signed.

If the workflow does not automatically run, open Actions → select the checkpoint workflow → Run workflow and choose `android-checkpoint-1`, **after** the ZIP has been uploaded.

## Quality and scope

- The Android shell uses a full-screen Android WebView. Source photos, artworks, CSS and JS are bundled; **no internet permission is required**.
- It does not change the approved original web HTML or render faces synthetically.
- The workflow checks the ZIP integrity, the exact HTML SHA-256, the APK archive, `classes.dex`, `AndroidManifest.xml`, embedded HTML and debug signature.
- **No physical device APK testing has been performed yet.** First validate smoothness, initial 6.5s welcome, bird touch target, full-screen photo viewing, navigation and app background/resume on the real device.
- If the network or GitHub Actions is unavailable, Android Studio can open the project from the ZIP locally.

## Remaining work after this checkpoint

- Chapter 6: Midnight Letter
- Chapter 7: Birthday Universe
- Chapter 8: Memory Constellation / final keepsake
- Unified Android / web integration and complete physical QA before the final gift

**This branch is an independent Android checkpoint.** Never merge unfinished Android assets into the main THANDU website as a substitute for proper visual approval.
