# THANDU — Vercel Deployment & Iteration Workflow

**Status:** First deployable public-safe interactive foundation created on 2026-11-11. NOT the final birthday gift.

## Project URLs

- Live preview (public artwork only): https://thandu.vercel.app
- Vercel project: https://vercel.com/navin7/thandu
- Source: https://github.com/rayadinaveen98-ship-it/thandu
- Vercel project ID: `prj_VbGZEAl1zb3plFkUJri56Ydsy8AB`
- Team: `navin7` (Hobby)
- Production branch: `main` 
- Initial deployment commit: `34ba42402f6f6c93ead04f80280227b7bbe533fd` — static HTML/CSS/JS
- Initial deployment record: `dpl_24HxsSyYnxdEjuoe2JSQCZndhAtv` — READY

## Normal iteration

1. Build and test the change.
2. Push a reviewed commit to `main` (or create a feature branch to generate a Vercel preview).
3. Vercel's Git integration builds and deploys automatically.
4. Inspect the latest deployment status and runtime behavior.
5. Test mobile 390×844, 360×740, desktop 1440×900, accessibility, links and interactions.
6. Don't call it done until the changed deployment is confirmed READY and its URL tested.

**Do not confuse READY with end-to-end visual QA.** The platform confirms output was deployed; browser/performance testing is separate.

## Public preview safety

The current Vercel site has **no access protection** and contains **only non-sensitive, generated artwork / authored CSS and JS**, no original photographs or video of Manasa and no private letter. Anyone with the URL may be able to view the deployed build. No personal material should be added to its publicly deployed `main` branch.

For the final birthday gift: decide and test either a genuinely protected hosting arrangement (server-side auth) or an offline private delivery package **before** any personal photographs are included. Client-side passwords, a secret-looking URL and robots/noindex are NOT privacy controls. Preview builds and deployment artifacts must be considered separately.

See [Identity Preservation](IDENTITY_PRESERVATION.md). Photographs must never be facially changed, stretched or synthetically animated without explicit permission.

## What the deployed app contains today

- Three connected interactive scenes: The Arrival, Memory Sanctuary (empty memory portals), A World in Bloom.
- Responsive UI, a live scene controller, navigation, pointer-responsive particle effects, garden petals, and motion setting.
- No personal photos, no birthday letter, no fully developed cinematic finale.
- No account system, analytics or backend.
- Static HTML/CSS/JS foundation; framework choice is still subject to production architecture decisions.

## Next planned work

- Refine scene imagery, contrast, typography and portal composition against the approved keyframes.
- Replace static background illusions with richer independent layers.
- Integrate the tested motion pilots rather than merely reproducing their rough concepts.
- Implement content-driven scene contract, private asset integration strategy, and a guarded release pipeline.
- Review in actual mobile browsers before the recipient receives the final gift.
