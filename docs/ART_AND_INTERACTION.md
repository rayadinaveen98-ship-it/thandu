# Art Direction, Motion & Interaction

## Art benchmark

Build an experience with the depth and presence of a premium interactive art piece. Avoid ordinary cards, repetitive hero layouts, generic birthday templates, dense text panels, and effects unrelated to the story.

### Three world identities

| World | Initial color direction | Spatial language | Signature motion |
| --- | --- | --- | --- |
| Light of Stillness | pearl, champagne, lavender, pale blush | floating crystalline forms, light architecture, soft horizons | diffusing motes, breathing halo, liquid-light ripple |
| A World in Bloom | jade, teal, coral rose, peach, lilac | sculptural flora, layered branches, magical miniature landscapes | blossoms respond to touch, petals, moving light |
| The Midnight Letter | ink navy, antique gold, lunar silver | rotating rings, observatory arches, constellations | orbiting elements, traced stars, opening seal |

Color choices are directional, not locked.

## Scene composition

Every key scene has separate **far environment**, atmosphere, structural depth, midground motion, photo stage, foreground interaction, typography, and accessible controls. Use original environment art, CSS/Canvas, and selective real 3D only where dimensional interaction justifies the performance cost.

Photos are presented faithfully. Avoid fabricated facial motion, face changes, or unnecessary stylized retouching. Motion may be applied to framing, layers, light, atmosphere, and scenery.

## Interaction principles

- Touching any environment area responds immediately with localized light, particles, wind, or petals.
- No accidental chapter advance on a scenery tap; explicit Continue / Back / chapter choice.
- Discoverable glowing objects may reveal photos and messages.
- Photo spotlight presents the real image and caption without obscuring faces.
- Finale may use a deliberate interaction but must also offer a simple accessible alternative.
- Provide Restart, Replay Finale, volume control, and reduced-motion mode.

## Motion & audio

Subtle continuous life in environments; tactile feedback ideally in under 100ms; paced cinematic transitions; a skippable opening. Avoid excessive flashing and camera movement. Respect `prefers-reduced-motion`.

Sound is opt-in only. Use original or properly licensed music: delicate keys / airy chimes in Stillness, warm organic textures in Bloom, restrained nocturnal atmosphere for Midnight, and a celebratory reprise at the end. No autoplayed private voice recordings.

## Responsive and accessible

Prioritize 360–430px portrait, then landscape, tablet, and desktop. Keep text readable against complex art, respect safe-area insets, support keyboard navigation, 44px+ touch targets, semantic labels, motion alternatives, graceful WebGL failure, and adjustable effects intensity. Important content remains available if audio or animations are off.

## Look-development gate

Before full implementation, approve 1) keyframe stills; 2) an actual touch-responsive short motion test; 3) a real mobile screenshot; 4) one photo-in-scene composition using an approved photo; 5) a finale concept. No visual substitutions without review.
