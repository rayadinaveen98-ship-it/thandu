// THANDU V0.9 source contracts: run node --test tests/site-contract.test.mjs
// Browser/device quality must be evaluated separately.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { Script, createContext } from 'node:vm';
const read = p => readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),app=read('assets/app.js'),gal=read('assets/memory-constellation.js');
const data=read('assets/photo-story-data.js'),photosScript=read('assets/photo-story-scenes.js');
const realm=createContext({window:{}});new Script(data).runInContext(realm);
const story=realm.window.THANDU_MEDIA;
const expected=['arrival','sanctuary','growing','bloom','celebration','letter','universe','constellation'];
test('eight connected cinematic chapters match main navigation and photo manifest',()=>{
 const scenes=[...html.matchAll(/<section class="world [^"]*" id="([^"]+)"/g)].map(m=>m[1]);
 const tabs=[...html.matchAll(/class="chapter-pill[^"]*"[^>]*data-to="([^"]+)"/g)].map(m=>m[1]);
 const match=app.match(/const order = \[([^\]]+)\]/);assert.ok(match);
 const order=[...match[1].matchAll(/'([^']+)'/g)].map(m=>m[1]);
 assert.deepEqual(scenes,expected);assert.deepEqual(tabs,expected);assert.deepEqual(order,expected);
 assert.deepEqual(Array.from(story.scenes,s=>s.id),expected);
});
test('a real photographed welcome is visible in initial HTML',()=>{
 assert.match(html,/id="arrivalHeroPhoto" src="\/media\/scene-50\.jpg"/);
 assert.match(html,/fetchpriority="high"/);
 assert.equal(story.scenes[0].photoIds[0],46);
 assert.equal(story.photos.find(p=>p.id===46).src,'/media/scene-50.jpg');
 assert.doesNotMatch(html,/ORIGINAL ARTWORK ONLY|NO PRIVATE PHOTOGRAPHS|PRIVATE OWNER REVIEW/);
});
test('47 originals are preloaded into the public curated gallery and chapter frames',()=>{
 assert.equal(story.photos.length,47);
 assert.deepEqual(Array.from(story.photos,p=>p.id),Array.from({length:47},(_,i)=>i+1));
 assert.equal(new Set(Array.from(story.photos,p=>p.src)).size,47);
 assert.deepEqual(Array.from(story.scenes,s=>s.photoIds.length),[1,5,5,6,8,1,1,0]);
 for(const p of story.photos)assert.match(p.src,/^\/media\/scene-\d\d\.jpg$/);
 assert.match(gal,/window\.THANDU_MEDIA\?\.photos/);
 assert.match(photosScript,/makeFrame\(scene\)/);
 assert.match(photosScript,/orb-real-photo/);
 assert.match(read('assets/sanctuary-v2.js'),/stage\.replaceChildren\(image\)/);
});
test('every image is served on main THANDU domain, with no private project navigation',()=>{
 const cfg=JSON.parse(read('vercel.json'));
 assert.ok(cfg.rewrites?.some(x=>x.source==='/media/:path*'&&x.destination==='https://thandu-photo-assets.vercel.app/assets/:path*'));
 assert.doesNotMatch(html,/thandu-private\.vercel\.app/);
 assert.equal(story.scenes.length,8);
 for(const s of story.scenes)assert.match(s.art,/^\/media\/scene-\d\d\.webp$/);
});
test('original aspect ratios and face-safe viewing are maintained',()=>{
 const css=read('assets/photo-worlds.css');
 assert.match(css,/\.photo-viewer-image-wrap img\{[^}]*object-fit:contain/);
 assert.match(css,/\.story-photo-open img\{[^}]*object-fit:contain/);
 assert.match(css,/\.gallery-local-import\{display:none!important\}/);
 assert.match(css,/prefers-reduced-motion/);
 assert.match(read('docs/IDENTITY_PRESERVATION.md'),/Never change the appearance/i);
 assert.match(read('.gitignore'),/private-assets\//);
});
test('no duplicated element ids; all linked JS/CSS local code exists and parses',()=>{
 const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size);
 const scripts=['assets/app.js','assets/photo-story-data.js','assets/photo-story-scenes.js','assets/sanctuary-v2.js','assets/celebration.js','assets/midnight-letter.js','assets/birthday-universe.js','assets/memory-constellation.js'];
 for(const p of scripts)assert.doesNotThrow(()=>new Script(read(p),{filename:p}));
 const links=[...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(m=>m[1]);
 for(const link of links)assert.ok(existsSync(new URL('..'+link,import.meta.url)),'missing local '+link);
 const styles=['styles.css','sanctuary-v2.css','journey-v3.css','celebration.css','midnight-letter.css','birthday-universe.css','memory-constellation.css','photo-worlds.css'];
 for(const p of styles){const css=read('assets/'+p);assert.equal((css.match(/\{/g)||[]).length,(css.match(/\}/g)||[]).length,'unbalanced CSS '+p)}
});
test('original interactive light/garden/letter/finale remain connected',()=>{
 assert.equal([...html.matchAll(/data-growing-memory="\d+"/g)].length,5);
 assert.match(read('assets/celebration.js'),/data-joy/);
 assert.match(read('assets/birthday-universe.js'),/phase-bloom/);
 assert.match(read('assets/midnight-letter.js'),/Escape/);
 assert.match(html,/data-next="constellation"/);
 assert.match(html,/id="galleryViewer"/);
});
