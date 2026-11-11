// THANDU public preview contract tests.
// Run: node --test tests/site-contract.test.mjs
// Uses only Node built-ins. This is not a substitute for real-browser visual QA.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { Script } from 'node:vm';

const load = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const html = load('index.html');
const app = load('assets/app.js');
const celebration = load('assets/celebration.js');
const sanctuary = load('assets/sanctuary-v2.js');
const letter = load('assets/midnight-letter.js');
const universe = load('assets/birthday-universe.js');

test('six guided scenes match the chapter navigation and the scene controller', () => {
  const scenes = [...html.matchAll(/<section class="world [^"]*" id="([^"]+)"/g)].map(m => m[1]);
  const tabs = [...html.matchAll(/class="chapter-pill[^"]*"[^>]*data-to="([^"]+)"/g)].map(m => m[1]);
  const orderMatch = app.match(/const order = \[([^\]]+)\]/);
  assert.ok(orderMatch, 'app controller must define scene order');
  const controllerOrder = [...orderMatch[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
  assert.deepEqual(scenes, ['arrival', 'sanctuary', 'bloom', 'celebration', 'letter', 'universe']);
  assert.deepEqual(tabs, scenes);
  assert.deepEqual(controllerOrder, scenes);
});

test('HTML IDs are unique and all celebration hooks exist', () => {
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, 'duplicate element IDs');
  for (const id of ['joyGarland','joyStatus','joyRelease','joyFinalMessage','joyReplay','joyContinue','celebration','letter','letterSeal','letterReveal','letterClose','letterReadAgain','letterPaperTitle','letterContinue','universe','universeStart','universeProgress','universeWish','universeAgain','universeReplay']) {
    assert.ok(ids.includes(id), 'missing celebration hook: ' + id);
  }
  assert.equal([...html.matchAll(/data-joy="[^"]+"/g)].length, 3);
  assert.match(html, /id="memoryReveal"[^>]+aria-modal="true"/);
});

test('the scripts parse without syntax errors', () => {
  for (const [name, content] of [['app', app], ['celebration', celebration], ['sanctuary', sanctuary], ['letter', letter], ['universe', universe]]) {
    assert.doesNotThrow(() => new Script(content, { filename: name + '.js' }));
  }
});

test('all local CSS/JS/image references exist', () => {
  const references = [
    ...[...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(m => m[1]),
    ...[...load('assets/celebration.css').matchAll(/url\(['"]?(\/assets\/[^'")]+)['"]?\)/g)].map(m => m[1]),
    ...[...load('assets/journey-v3.css').matchAll(/url\(['"]?(\/assets\/[^'")]+)['"]?\)/g)].map(m => m[1]),
    ...[...load('assets/midnight-letter.css').matchAll(/url\(['"]?(\/assets\/[^'")]+)['"]?\)/g)].map(m => m[1]),
    ...[...load('assets/birthday-universe.css').matchAll(/url\(['"]?(\/assets\/[^'")]+)['"]?\)/g)].map(m => m[1])
  ];
  for (const filename of references) {
    assert.ok(existsSync(new URL('..' + filename, import.meta.url)), 'missing: ' + filename);
  }
});

test('public preview embeds no private recipient photographs or videos', () => {
  const siteSources = [html, app, celebration, sanctuary, letter, universe];
  for (const source of siteSources) {
    assert.doesNotMatch(source, /data:image\/jpeg;base64|\.heic\b|\.jpe?g\b|\.mp4\b/i);
  }
  assert.match(load('.gitignore'), /private-assets\//);
  assert.match(load('docs/IDENTITY_PRESERVATION.md'), /Never change the appearance|Never deform|Never.*alter/i);
});

test('new visual scene explicitly supports motion reduction', () => {
  const css = load('assets/celebration.css');
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /body\.motion-off/);
  assert.match(celebration, /aria-pressed/);
  assert.match(celebration, /animationDisabled/);
  assert.match(load('assets/midnight-letter.css'), /prefers-reduced-motion/);
  assert.match(letter, /Escape/);
  assert.match(letter, /aria|inert/);
  assert.match(load('assets/birthday-universe.css'), /prefers-reduced-motion/);
  assert.match(universe, /Escape|reset|replay/i);
  assert.match(html, /data-next="letter"/);
});
