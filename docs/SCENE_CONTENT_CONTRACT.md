# Scene and Media Contract — Public Interface Only

**No personal image files or real personal identifiers should be committed to this public repository.** This document describes the shape of the app's content. A populated, private manifest stays outside this repo until a specific, approved secure delivery plan exists.

## Suggested data model

```ts
type SceneKind = 'threshold' | 'sanctuary' | 'early-memories' |
  'path' | 'garden' | 'celebration' | 'letter' | 'finale' | 'constellation';

type ApprovedMedia = {
  id: string;                 // stable opaque ID, not original name
  kind: 'photo' | 'video';
  uri: string;                // resolved only from the approved private delivery channel
  width: number;
  height: number;
  alt: string;
  caption?: string;           // user-approved copy, never AI-inferred biography
  publishApproved: boolean;   // false by default
  containsOtherPeople?: boolean;
};

type JourneyScene = {
  id: string;
  kind: SceneKind;
  visualPreset: 'stillness' | 'bloom' | 'midnight' | 'hybrid';
  title?: string;
  body?: string;              // approved writing only
  mediaIds: string[];         // IDs refer to a separate, approved asset manifest
  requiredDiscoveries: number;
  transitions: {
    enter: string;
    exit: string;
  };
  audioCue?: string;
  allowSkip: boolean;
};

type ExperienceState = {
  sceneIndex: number;
  discoveries: Record<string, string[]>;
  audioConsent: boolean;
  reducedMotion: boolean;
  effectsQuality: 'low' | 'medium' | 'high';
  journeyFinished: boolean;
};
```

## Runtime rules

- **Privacy default:** no public fallback for missing private media, no client-embedded passwords, no URL obscurity mistaken for access control.
- **Media immutability:** originals remain unmodified. A render-time uniform scale preserves appearance and aspect; no face warps, filter edits, makeup, synthetic expressions, or motion.
- **Progress:** scene change only on explicit action; discovery progress never gates basic navigation.
- **State:** persist only local journey settings, not personal information. Mute is default.
- **Performance:** load one active world's large visual assets at a time; prefetch only the next approved scene where reasonable.
- **Accessibility:** keyboard and touch alternatives; readable letter without forced animation; reduced-motion and low-effects rendering modes.
- **Publishing:** a public Git repository is separate from the access policy of any eventual website. Reviewed personal media must not be hosted publicly without explicit consent.

## Private asset pipeline (outside public Git)

1. Private photo inventory with checksums and image dimensions.
2. Owner selects which photographs/videos may be used and how.
3. Owner approves all text and the delivery's actual access policy.
4. The build receives a *separate* approved manifest and media directory or protected object store.
5. Validate the compiled/dist output to ensure it contains **only** approved media and no EXIF/GPS or debug traces.
6. Test the recipient-view link and access controls with a device not logged in as the owner.

## QA gate: face fidelity

The original photograph must remain faithful in the final composition. Do not run AI restoration, beautification, face animation, custom face masking, or other image editing. If a requested artistic treatment alters any facial pixels, require a specific before/after preview and explicit authorization **before** applying it.
