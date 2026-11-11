# THANDU — Protected Hosted Owner Review V0.9

**Status (2026-11-11):** V0.8 personalized owner-review experience was deployed to a **separate** Vercel project using direct deployment uploads, **not** by committing private media to GitHub. The public development preview remains photo-free.

## Access boundary

- Vercel project: `thandu-private` (independent of public project `thandu`).
- **Vercel Authentication enabled for All Deployments**, including production, **before** the private files were uploaded.
- Anonymous users cannot load the protected project under normal Vercel enforcement. Vercel team members with access may sign in.
- For guest review, Vercel issues a temporary shareable link which **acts as a bearer credential**: anyone with that full link can access its deployment until expiry. Never post guest links in public GitHub, documents or social channels. Reissue an invite near the intended gift time.
- Not a DRM system; authorized viewers can save photographs. The birthday owner must approve final content and recipient distribution.

## Verified deployment data

- Deployment: `dpl_DdvBYQqZFqAwDDmnL3UARiSYP5N6`; deployment state **READY**.
- Tree contains 54 static source files: 47 original JPEG photographs, 5 original WebP artworks, index.html and vercel.json.
- User-supplied JPEGs were copied byte-for-byte from the V0.8 standalone source with no facial alterations or re-encoding. File hashes were used to verify upload references.
- Protected root HTML and one representative JPEG returned HTTP 200 through authorized access. This does **not** replace full real-device testing.
- Headers configured to discourage indexing and caching; **these headers are not substitutes for access control**.
- No private photo bytes, manifest, personal letter or temporary share credentials were committed to the public repository.

## Architecture and iteration

The **public** `thandu.vercel.app` remains Git-linked and photo-free.

The **private** V0.9 hosted copy is an upload-based deployment, **not Git-connected**. Changes to the private photo-bearing experience require a new approved private deployment rather than simply pushing to the public repository.

## Remaining approval and QA

- Review and approve all included childhood/family images and their chapter placement.
- Replace the draft letter with approved sibling-appropriate text.
- Decide whether to include the optional birthday video.
- Test on recipient's actual browser and phone, including portrait/landscape, image loading and guest-link access.
- Generate a fresh private invite near gifting time; currently generated invite expires on November 12, 2026.
- Do not disable All Deployments authentication while private media is present.

Refer to [Identity Preservation](IDENTITY_PRESERVATION.md) and [Private Owner Review V0.8](PRIVATE_REVIEW_V08.md).
