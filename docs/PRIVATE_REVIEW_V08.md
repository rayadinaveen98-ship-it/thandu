# THANDU — Private Owner Review V0.8

**Development milestone:** A **private, offline personalized review** was produced on 2026-11-11. Its personal images are **not committed here**, and it is not yet the recipient-ready final gift. A separate **Vercel Authentication-protected** deployment now exists for owner review.

## Private build contents

- Eight thematic story scenes from First Light through Memory Constellation, including a draft Midnight Letter and birthday finale.
- Owner-supplied original photographs, copied exactly to the private review bundle; no facial edits, transforms, recompression or forced photo cropping.
- Original fantasy environment artwork, independent ambient visual effects, real-photo cinematic frames and a private keepsake/gallery.
- One self-contained HTML delivery option and a folder-based offline ZIP option; both are distributed **privately to the owner**, not through this public repository.
- The optional original video is **not included** pending approval.
- Exact photo selection, associations and draft copy remain subject to owner approval.

## Engineering checks

- Private source JPEG integrity compared by SHA-256 with each uploaded original.
- Eight story scenes tested under headless Chromium at **360×740, 390×844, and 1440×900**.
- Verified hero photo loading, multi-photo navigation, letter preview, finale reveal, full gallery population and opening an original photo in a native viewer.
- No page script errors detected in those tests. No document-level horizontal overflow found at the tested viewport sizes.
- **Remaining:** real iPhone Safari and Android browser testing, deeper screen-reader accessibility testing, reduced-memory/performance checks, personally approved final message and content approvals.

## Privacy boundaries

The public GitHub repository and live Vercel development demo remain **artwork-only** with temporary manual device-local image selection. The distinct V0.8 personalized build is now hosted in a **separate Vercel project** with `ssoProtection.deploymentType = all`. Its latest deployment reports READY and includes 47 JPEG image assets plus 5 artwork files. No private photo assets, derivatives, private media manifest, or personalized HTML are committed to the public GitHub repo. The separate public THANDU website remains photo-free.

The private HTML is not DRM: anyone receiving it can extract photographs. Final sharing is therefore a separate approval and security decision. A guessed link or browser-side password is not acceptable protection for a hosted personal-gallery version.

## Next acceptance gate

1. Owner reviews photo selection, story order, portrait visibility and letter draft.
2. Remove any other-person or childhood photos not approved for recipient distribution.
3. Finalize exact message and decide whether to include the optional birthday video.
4. Confirm real recipient access to the Vercel-Authentication-protected project (a Vercel account and explicit access rights are required). Test the login flow and the complete personalized journey in a real browser, and finalize whether an offline copy is also shared.
5. Only after sign-off designate the experience recipient-ready.

See [Identity Preservation](IDENTITY_PRESERVATION.md) for the owner's approved face-safe crop/composition rules.

## Protected Vercel review milestone (2026-11-11)

- A separate Vercel project, `thandu-private`, now exists. The GitHub-linked public `thandu` project is unaffected.
- The private project's Vercel Authentication is enabled for **all deployments**; this should gate both its production domain and generated deployment URLs.
- Its production deployment `dpl_DdvBYQqZFqAwDDmnL3UARiSYP5N6` reports **READY**.
- The deployment source tree contains a private HTML build, 47 JPG files (scene-05 to scene-51), five WebP artwork files, and a static security-headers configuration. Six sample JPG source hashes checked against the owner-review originals matched; full live rendering/network checks remain outstanding.
- Important limitation: on Vercel's free plan, this protection requires Vercel-account authorization, which makes recipient access a separate setup step. A public/plain URL or secret-looking slug alone is not authorization. Do not share temporary bypass links casually; they are bearer credentials.
- Owner must still verify the real mobile experience, approve exact photo selection and wording, and decide who receives permission. The protected deployment does **not** mean those approvals have occurred.
