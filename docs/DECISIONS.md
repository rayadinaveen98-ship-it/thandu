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

## Changelog
- 2026-11-11: Memory Constellation V0.7 preview uses session-only client-side photo selection and manual thematic grouping.
- 2026-11-11: Birthday Universe V0.6 connected as sixth public-safe chapter; detailed QA and private photo release outstanding.
- 2026-11-11: Owner approved face-safe cropping and non-facial compositing; Midnight Letter V0.5 connected as fifth scene.
- 2026-11-11: Scene Plan V1 drafted with public scene interface and private photo-to-scene mapping; still awaiting approval.
- 2026-11-11: Architecture foundation prepared for public repository. Privacy and content safeguards established. Photographs received, duplicate verified, private media manifest and Scene Plan V1 prepared; identity-preservation requirement locked.
