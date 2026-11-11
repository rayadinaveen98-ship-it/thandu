# Product & Narrative Architecture

## Objective

Create an original, personal, **non-romantic** birthday gift with emotional specificity and extraordinary visual atmosphere. The experience should feel like entering a crafted miniature world, not scrolling a tribute page.

**Working title:** THANDU — The World She Brings to Life. Title remains unapproved.

**Primary audience:** one intended recipient. **Platforms:** phone-first web; tablet and laptop responsive.

**Experience philosophy:**

1. Show, don't dump: a sequence of meaningful discoveries, not a feature-heavy home screen.
2. Personal before spectacular: artwork serves real photographs and approved memories.
3. Agency matters: scenery reacts to touches; advances occur only through intentional controls.
4. Slow emotion, fast feedback: maintain ambiance without forcing long transitions.
5. No fabrication: do not invent childhood memories, events, dates, personality facts, or quotes.
6. Respectful tone: supportive, warm, affectionate, lightly playful only when appropriate.

## Proposed story arc (not yet approved)

| Act | Environment | Experience | Content |
| --- | --- | --- | --- |
| 00. Invitation | threshold between worlds | short cinematic entry and opt-in audio | greeting / nickname |
| 01. Quiet Light | Light of Stillness | interactive halo and gentle reveal | introductory portrait, calm presence |
| 02. Story So Far | memory corridor across worlds | spatial photo discovery | childhood-to-present journey, chronology only when supported |
| 03. Living Garden | A World in Bloom | interactions wake flowers and scenery | positive qualities, candid moments |
| 04. New Horizon | evolving sky and landscape | immersive panoramic transition | present life and wishes for the future |
| 05. Midnight Letter | celestial observatory | open an interactive sealed letter | approved personal note |
| 06. Birthday Finale | three worlds converge | celebration with replay option | birthday message |
| 07. Keepsake | accessible gallery | explore photos and moments freely | approved images and captions |

**Proposed duration:** approximately 5–8 minutes for first completion; replay and gallery should be untimed.

## Content model

- `chapter`: title, world type, message, interaction, assets
- `memory`: photo reference, optional confirmed era, approved caption, accessible text
- `message`: private approved copy associated with a chapter
- `sound`: original/licensed optional track or cue
- `finale`: birthday message and ending animation

A content manifest should drive the scenes so copy and photos can be refined without rebuilding the rendering engine.

## Deliberately undecided

Photo counts and hero selections; exact life stages; final chapter order; whether some scenes are omitted; approved letter text; whether a playful moment fits; the primary visual world; private vs publicly accessible delivery. These choices follow photo review and sender approval.
