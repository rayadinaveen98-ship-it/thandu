// THANDU Screen 01 / Arrival V2 — Node-only source and intro interaction regression tests
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';

const load = p => readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=load('index.html'),css=load('assets/arrival-v2.css'),js=load('assets/arrival-v2.js');

test('Screen 01 retains authentic photograph, separated CTA and eight unchanged scenes',()=>{
  assert.match(html,/id="arrivalHeroPhoto" src="\/media\/scene-50\.jpg"/);
  assert.match(html,/class="arrival-actions"/);
  assert.match(html,/data-next="sanctuary"/);
  assert.match(html,/id="welcomeOverlay" role="dialog" aria-modal="true"/);
  assert.match(html,/id="skipWelcome"/);
  assert.match(html,/\/assets\/arrival-v2\.css/);
  assert.match(html,/\/assets\/arrival-v2\.js/);
  const scenes=[...html.matchAll(/<section class="world [^"]*" id="([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(scenes,['arrival','sanctuary','growing','bloom','celebration','letter','universe','constellation']);
});

test('intro timing, no persistent skip or audio autoplay and CSS safety',()=>{
  assert.doesNotThrow(()=>new Script(js));
  assert.match(js,/DURATION_MS=6500/);
  assert.match(css,/--welcome-duration:6500ms/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css,/@media\(max-width:540px\)/);
  assert.match(css,/@media\(max-height:700px\)/);
  assert.doesNotMatch(js,/localStorage|sessionStorage|indexedDB|AudioContext|\.play\(/);
  assert.match(css,/object-fit:contain/);
  assert.equal((css.match(/\{/g)||[]).length,(css.match(/\}/g)||[]).length);
});

function setup(mode='normal'){
  const refs=new Map(); const timers=[]; const cleared=[];
  let focused=null, keyboard=null;
  class Element{
    constructor(id){this.id=id;this.attrs={};this.hidden=false;this.listeners={};}
    setAttribute(k,v){this.attrs[k]=String(v)}
    removeAttribute(k){delete this.attrs[k]}
    hasAttribute(k){return k in this.attrs}
    focus(){focused=this.id}
    addEventListener(k,cb){this.listeners[k]=cb}
    click(){this.listeners.click?.()}
  }
  const el=id=>refs.get(id)||refs.set(id,new Element(id)).get(id);
  const active=new Set(['welcome-active']);
  const doc={
    body:{classList:{contains:id=>active.has(id),remove:id=>active.delete(id)}},
    getElementById:el,
    querySelector:sel=>({
      '.topbar':el('topbar'),
      '.skip-link':el('skipLink'),
      '#arrival .arrival-actions .cta':el('cta')
    })[sel]||null,
    addEventListener:(name,fn)=>{if(name==='keydown')keyboard=fn}
  };
  const win={
    matchMedia:()=>({matches:mode==='reduced'}),
    setTimeout:(fn,ms)=>{timers.push({fn,ms});return timers.length},
    clearTimeout:id=>cleared.push(id)
  };
  new Function('document','window',js)(doc,win);
  return {el,timers,cleared,active,get focus(){return focused},fireKey:key=>keyboard?.({key,preventDefault(){},stopPropagation(){}})};
}

test('normal 6.5-second completion returns usable main UI and focuses title',()=>{
  const x=setup();
  assert.equal(x.timers[0].ms,6500);
  assert.ok(x.el('journey').hasAttribute('inert'));
  assert.ok(x.el('topbar').hasAttribute('inert'));
  assert.equal(x.focus,'skipWelcome');
  x.timers[0].fn();
  assert.equal(x.el('welcomeOverlay').hidden,true);
  assert.equal(x.el('journey').hasAttribute('inert'),false);
  assert.equal(x.el('topbar').hasAttribute('inert'),false);
  assert.equal(x.focus,'arrivalTitle');
});

test('Skip and Escape restore focus to the main Begin button',()=>{
  for(const command of ['click','escape']){
    const x=setup();
    if(command==='click')x.el('skipWelcome').click();else x.fireKey('Escape');
    assert.equal(x.el('welcomeOverlay').hidden,true);
    assert.equal(x.el('journey').hasAttribute('inert'),false);
    assert.equal(x.focus,'cta');
    assert.equal(x.cleared.length,1);
  }
});

test('system reduced-motion skips introduction immediately',()=>{
  const x=setup('reduced');
  assert.equal(x.timers.length,0);
  assert.equal(x.el('welcomeOverlay').hidden,true);
  assert.equal(x.active.has('welcome-active'),false);
  assert.equal(x.el('journey').hasAttribute('inert'),false);
});
