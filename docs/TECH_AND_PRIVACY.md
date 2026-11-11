# Technical Architecture, Asset Safety and Delivery

## Proposed implementation (not yet begun)

- React + TypeScript + Vite mobile-first static web application
- Scene manifest + lightweight state controller, separate from renderer
- CSS/Web Animations for UI, 2D Canvas for tactile particles, Three.js/React Three Fiber **only when needed** for spatial structures
- Optimized image derivatives (AVIF/WebP/JPEG fallback) in an approved distribution flow; lazy-load later chapters
- Opt-in audio engine with mute / state persistence
- No backend, accounts, analytics, behavioral tracking, or personal data collection by default

```text
Approved content manifest / local asset mapping
                  |
          Experience controller
            /      |       \
       Scene     Memory     Audio
       engine    viewer    engine
            \      |       /
     Accessibility, privacy, performance
                  |
       Mobile / tablet / desktop web
```

Expected source modules after the visual/photo approvals:

```text
src/app/               boot, navigation, chapter state
src/experience/scenes/ portal, timeline, stillness, bloom, letter, finale
src/experience/effects touch reactions, atmosphere, spatial layers
src/content/           approved non-sensitive manifest
src/components/        controls, memory viewers, overlays
src/audio/             playback and cues
src/styles/            tokens and responsive rules
public/art/            non-sensitive, redistributable environmental art
scripts/               local, non-destructive preprocessing tools
tests/                 flow, accessibility and visual QA
private-assets/        locally held originals (ignored; NEVER commit)
```

## Public repository guardrails

This repository is **public**. Public code can be copied, indexed, forked and retained indefinitely. Any personal childhood / portrait images, unapproved captions, relationship details, private correspondence, original photos, EXIF metadata, and contact sheets belong **outside Git**.

Do not upload personal content in issues, pull requests, commit messages, releases or automation logs. .gitignore only prevents a subset of accidental commits and cannot undo already-published history.

When approval allows use in the finished app, generate resized metadata-stripped derivatives locally. Publishing those to a publicly accessible site would still make them accessible to its visitors. Decide the actual distribution model explicitly before any photo or letter is deployed.

### Delivery options to evaluate

1. Offline package for one-to-one sharing (less convenient; requires target phone test).
2. Hosted site protected with **real server-side access control**.
3. Public/unlisted site with only explicitly approved shareable content.

A guessed URL, client-only password screen or `noindex` is **not** access control.

## Performance targets (targets, not guaranteed measurements)

Immediate visible loading shell; progressive scenic loads; responsive tapping; 60fps where capable with effect-quality downshifts on slower devices; graceful static scene if WebGL fails. Test Android Chrome, iPhone Safari when available, desktop Chrome/Edge, narrow and wide screens, reduced-motion, and slow connections.

## Release checklist

- Approved photos and captions only; no personal originals or EXIF metadata in deploy
- No blank screens or broken assets
- No console errors in main flows
- Intentional navigation and replay
- Sound muted until consent
- Good readability, keyboard and touch accessibility
- Distribution security confirmed with the *actual hosted build*
- Recipient-view test; no accidental public sharing
