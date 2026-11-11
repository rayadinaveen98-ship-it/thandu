# Design Decision Register

| ID | Decision | Status | Rationale |
| --- | --- | --- | --- |
| D-001 | Use `thandu` as public GitHub repository on `main` | Confirmed | Repository created and visibility accepted by owner |
| D-002 | Keep all personal photographs, childhood photos, source contact sheets, letters, and private captions outside public Git | Confirmed safeguard | Public commits may remain accessible even after deletion |
| D-003 | Keep three visual directions available | Confirmed | Design selection happens after stronger visual tests and photo/story mapping |
| D-004 | Explore one evolving three-world experience | Proposed | Unifies calmness, energy and personal letter without three disconnected apps |
| D-005 | Mobile-first web as primary delivery | Proposed | One-tap access, responsive experience, no APK needed |
| D-006 | Use React/TS/Vite with selective 3D | Proposed | Allows advanced visuals while retaining performance and accessibility |
| D-007 | Pause app implementation until photo review and key storyboard sign-off | Confirmed workflow | Avoid rework and preserve creative direction |
| D-008 | Delivery access mode | Open | Public repository ≠ consent for publicly displaying personal photographs |
| D-009 | **No facial alteration or deformation of any kind without explicit per-operation approval** | **Locked — owner instruction, 2026-11-11** | Original faces and identities must be preserved in every scene, animation, export, and prototype. See [Identity Preservation](IDENTITY_PRESERVATION.md). |
| D-010 | Keep detailed photo-by-photo analysis, contact sheets, video and personal image identifiers outside public Git | Confirmed safeguard | Images and contextual identifiers are private; public storyboard contains only generic structure. |
| D-011 | Keep source photographs and video outside public Git even though the owner permits discretion | Confirmed safeguard | Public visibility makes third-party images and childhood photos copyable; a private manifest is equally suitable for design and can feed an approved deployment later |
| D-012 | Use one travelling light as a visual continuity object across the three worlds | Proposed in Scene Plan V1 | Provides meaningful cinematic transitions instead of disconnected pages |
| D-013 | Use short guided journey, then free-exploration keepsake | Proposed in Scene Plan V1 | Preserves emotional pacing and optional photo access |

| D-014 | Artistic crops, reframing, masks and non-facial compositing are allowed; source faces must remain faithfully unchanged | **Locked — owner instruction, 2026-11-11** | Creative presentation is flexible, but facial appearance and originals remain protected; see [Identity Preservation](IDENTITY_PRESERVATION.md) |

| D-015 | Use one deliberate progressive reveal in Birthday Universe, then allow replay and revisiting chapters | Implemented in V0.6 preview | Emotional climax without forcing multiple interactions or blocking reduced-motion users |

| D-016 | Gallery accepts only explicit local photo selection; never uploads or persists image bytes on public Vercel | Implemented for V0.7 preview | Validates face-faithful presentation without publishing private childhood photos. Recipient delivery policy still needs approval |

| D-017 | **Single public recipient experience at https://thandu.vercel.app**; no separate private journey/link/login, photographs included in the real site | **Locked — owner 2026-11-11; supersedes D-008 private delivery preference** | Owner explicitly approved public display of the photos and asked to merge V0.7 effects and V0.8 content. See [unified V0.9 plan](UNIFIED_PUBLIC_V09_PLAN.md) |
| D-018 | **Real recipient photo visible from first scene**, then photos in all suitable chapters; gallery holds the approved 47 | **Locked — owner 2026-11-11** | The experience must be personal throughout, not an artwork-only preview plus empty gallery |
| D-019 | Keep raw originals unmodified and out of public Git history; publish metadata-stripped public display copies through one app's media delivery | **Locked workflow** | Public display approval does not require uploading raw originals or location metadata; review other people's/children's images before publication |
| D-020 | V0.9 uses one eight-scene unified frontend and merges the strongest parts of V0.7 public engine and V0.8 private narrative | **Locked direction** | No duplicate frontends, no new product features, no blank photo stages |

| D-021 | Screen 01 V3 opens from darkness with a real diya flame and blooms into a living, colorful celebration within 6.5 seconds; no photo appears during introduction | **Locked — owner 2026-11-11** | Replaces dark, static, center-photo V2 intro; see [Screen 01 V3](ARRIVAL_SCREEN_V3.md) |
| D-022 | Screen 01's real portrait remains fully veiled on initial load. A softly animated glowing bird on a flowering perch **must be touched** to reveal it; explicit accessible CTA offers equivalent reveal | **Locked — owner 2026-11-11** | No unsolicited early face reveal, no decorative dead controls, and no face edits |
| D-023 | Screen 01 scenery itself must feel alive and interact: petal drift, swaying floral canopy, lanterns that light on touch, moving water and scattered fireflies | **Locked — owner 2026-11-11** | Separate animated environment layers, not a static flat-color backdrop; reduced-motion support mandatory |

## Changelog
- 2026-11-11: **Locked Screen 01 V3 requirement:** vibrant living celebration instead of static blue V2; candle-led 6.5s intro without photo; touch the glowing bird to reveal the first real memory; rest of app unchanged.
- 2026-11-11: **Latest decision** — owner approved a single **public** THANDU V0.9 photo-led website. D-017 through D-020 supersede incompatible earlier private-only requirements; prior V0.7 and V0.8 work is retained for merging.
- 2026-11-11: Memory Constellation V0.7 preview uses session-only client-side photo selection and manual thematic grouping.
- 2026-11-11: Birthday Universe V0.6 connected as sixth public-safe chapter; detailed QA and private photo release outstanding.
- 2026-11-11: Owner approved face-safe cropping and non-facial compositing; Midnight Letter V0.5 connected as fifth scene.
- 2026-11-11: Scene Plan V1 drafted with public scene interface and private photo-to-scene mapping; still awaiting approval.
- 2026-11-11: Architecture foundation prepared for public repository. Privacy and content safeguards established. Photographs received, duplicate verified, private media manifest and Scene Plan V1 prepared; identity-preservation requirement locked.
