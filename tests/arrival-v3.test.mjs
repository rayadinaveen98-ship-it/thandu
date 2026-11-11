/* THANDU V3 — Arrival living-world and 6.5-second introduction contract.
 * Run alongside tests/site-contract.test.mjs with Node 22.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
const get=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=get('index.html'),js=get('assets/arrival-v3.js'),css=get('assets/arrival-v3.css');
const section=html.slice(html.indexOf('id="arrival"'),html.indexOf('id="sanctuary"'));
const intro=html.slice(html.indexOf('id="welcomeOverlay"'),html.indexOf('class="skip-link"'));

test('welcome animation is meaningful, 6.5 seconds, festive and photo-free',()=>{
  assert.match(intro,/class="welcome-diya"/);
  assert.match(intro,/class="diya-flame"/);
  assert.match(intro,/class="welcome-hanging-lights"/);
  assert.match(intro,/class="welcome-garland garland-left"/);
  assert.match(intro,/id="skipWelcome"/);
  assert.doesNotMatch(intro,/<img\b|scene-50\.jpg|welcome-portrait/);
  assert.match(css,/--welcome-duration:6500ms/);
  assert.match(js,/DURATION_MS=6500/);
  assert.match(css,/@keyframes intro-flame/);
  assert.match(css,/@keyframes intro-garden-awakens/);
  assert.match(css,/@keyframes intro-buds/);
  assert.doesNotMatch(js,/localStorage|sessionStorage|indexedDB|AudioContext|\.play\(/);
});
test('Screen 01 hides authentic photo until bird or primary CTA is activated',()=>{
  assert.match(section,/id="arrivalPhotoStage" aria-hidden="true" inert/);
  assert.match(section,/id="arrivalBird" aria-label=/);
  assert.match(section,/class="arrival-bird-svg"/);
  assert.match(section,/id="arrivalPrimary" data-next="sanctuary"/);
  assert.match(section,/id="arrivalHeroPhoto" src="\/media\/scene-50\.jpg"/);
  assert.match(css,/#arrival \.arrival-photo-stage\{[^}]*opacity:0;visibility:hidden/);
  assert.match(css,/#arrival\.arrival-revealed \.arrival-photo-stage/);
  assert.match(css,/\.bird-wing\{[^}]*animation:bird-wing-rest/);
  assert.match(js,/event\.stopImmediatePropagation\(\)/);
});
test('background is visibly alive and interactive, not just a color fill',()=>{
  for(const marker of ['arrival-garden-art','arrival-touch-lantern','arrival-floating-petals','arrival-firefly-field','arrival-pool','arrival-lotus','arrival-lights'])assert.match(section,new RegExp(marker));
  for(const marker of ['firefly-dance','petal-drift','water-ripple','flower-sway','hang','bird-gentle-float'])assert.match(css,new RegExp(marker));
  assert.match(js,/lantern\.addEventListener\('click'/);
  assert.match(css,/prefers-reduced-motion:reduce/);
});
test('all later THANDU chapters remain present, and new assets load',()=>{
  const scenes=[...html.matchAll(/<section class="world [^"]*" id="([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(scenes,['arrival','sanctuary','growing','bloom','celebration','letter','universe','constellation']);
  assert.equal((html.match(/id="arrivalHeroPhoto"/g)||[]).length,1);
  assert.match(html,/href="\/assets\/arrival-v3\.css"/);
  assert.match(html,/src="\/assets\/arrival-v3\.js"/);
  assert.equal((css.match(/\{/g)||[]).length,(css.match(/\}/g)||[]).length);
  assert.doesNotThrow(()=>new Script(js));
});

function simulation(mode='normal') {
  const elements=new Map(), timers=[], keys={};let focused=null;let stopped=false;
  class Cl {
    constructor(values=[]){this.set=new Set(values)}
    contains(x){return this.set.has(x)}
    add(...x){x.forEach(v=>this.set.add(v))}
    remove(...x){x.forEach(v=>this.set.delete(v))}
  }
  class El {
    constructor(id) {this.id=id;this.attrs={};this.classList=new Cl(id==='arrival'?['current']:id==='body'?['welcome-active']:[]);
      this.listeners={};this.children=[];this.hidden=false;this.disabled=false;this.tabIndex=0;
      this.style={values:{},setProperty:(k,v)=>{this.style.values[k]=v}};this.textContent='';}
    addEventListener(k,fn,options){(this.listeners[k]??=[]).push({fn,options})}
    setAttribute(k,v){this.attrs[k]=String(v)}
    removeAttribute(k){delete this.attrs[k]}
    hasAttribute(k){return k in this.attrs}
    getAttribute(k){return this.attrs[k]||null}
    focus(){focused=this.id;doc.activeElement=this}
    click(){for(const h of this.listeners.click||[]){h.fn({target:this,preventDefault(){},stopImmediatePropagation(){stopped=true}})}}
    appendChild(el){this.children.push(el);return el}
    replaceChildren(){this.children=[]}
    remove(){}
    querySelectorAll(selector){return selector==='[data-awaken="lantern"]'?[left,right]:[]}
  }
  const getEl=id=>{if(!elements.has(id))elements.set(id,new El(id));return elements.get(id)};
  const left=new El('left'),right=new El('right');
  left.classList.add('left');right.classList.add('right');
  const body=getEl('body');
  const doc={
    activeElement:null,
    body,
    getElementById:getEl,
    createElement:()=>new El('generated'),
    querySelector:s=>({
      '.topbar':getEl('topbar'),
      '.skip-link':getEl('skipLink')
    })[s]||null,
    addEventListener:(k,fn)=>{keys[k]=fn}
  };
  const motion={matches:mode==='reduce',listeners:[],addEventListener(k,fn){this.listeners.push(fn)}};
  const win={
    innerWidth:390,innerHeight:844,
    matchMedia:q=>q.startsWith('(prefers-')?motion:{matches:false},
    setTimeout(fn,ms){timers.push({fn,ms,cleared:false});return timers.length},
    clearTimeout(n){if(timers[n-1])timers[n-1].cleared=true},
    addEventListener(){}
  };
  new Function('document','window','requestAnimationFrame','cancelAnimationFrame',js)(doc,win,()=>0,()=>{});
  const fire=ms=>{const one=timers.find(x=>x.ms===ms&&!x.cleared);if(!one)return false;one.fn();one.cleared=true;return true};
  return {getEl,keys,timers,fire,motion,left,right,get focused(){return focused},get stopped(){return stopped}};
}
test('normal timeline is skippable, and no photo appears before bird touch',()=>{
  const x=simulation();
  assert.equal(x.getEl('welcomeOverlay').hidden,false);
  assert.ok(x.getEl('journey').hasAttribute('inert'));
  assert.equal(x.focused,'skipWelcome');
  assert.equal(x.getEl('arrivalPhotoStage').hasAttribute('inert'),false); // original inert is in HTML
  assert.equal(x.fire(6500),true);
  assert.equal(x.getEl('welcomeOverlay').hidden,true);
  assert.equal(x.getEl('journey').hasAttribute('inert'),false);
  assert.equal(x.focused,'arrivalTitle');
  assert.equal(x.getEl('arrival').classList.contains('arrival-revealed'),false);
  x.getEl('arrivalBird').click();
  assert.equal(x.getEl('arrival').classList.contains('arrival-revealing'),true);
  assert.equal(x.fire(1650),true);
  assert.equal(x.getEl('arrival').classList.contains('arrival-revealed'),true);
  assert.equal(x.getEl('arrivalPrimaryLabel').textContent,'Begin the journey');
  assert.equal(x.getEl('arrivalPhotoStage').getAttribute('aria-hidden'),'false');
  assert.equal(x.getEl('arrivalBird').disabled,true);
});
test('primary action first reveals and stops automatic scene transition',()=>{
  const x=simulation('reduce');
  x.getEl('arrivalPrimary').click();
  assert.equal(x.stopped,true);
  assert.equal(x.getEl('arrival').classList.contains('arrival-revealed'),true);
  assert.equal(x.getEl('arrivalPrimaryLabel').textContent,'Begin the journey');
});
test('skip, Escape and reduced motion never trap access behind opening',()=>{
  const a=simulation();a.getEl('skipWelcome').click();
  assert.equal(a.getEl('welcomeOverlay').hidden,true);
  assert.equal(a.focused,'arrivalBird');
  const b=simulation();b.keys.keydown({key:'Escape',preventDefault(){},stopPropagation(){}});
  assert.equal(b.getEl('welcomeOverlay').hidden,true);
  const c=simulation('reduce');
  assert.equal(c.getEl('welcomeOverlay').hidden,true);
  assert.equal(c.timers.some(x=>x.ms===6500),false);
  c.getEl('arrivalBird').click();
  assert.equal(c.getEl('arrival').classList.contains('arrival-revealed'),true);
});
test('lanterns are real independently interactive buttons',()=>{
  const x=simulation('reduce');
  x.left.setAttribute('aria-pressed','false');
  x.left.click();
  assert.equal(x.left.getAttribute('aria-pressed'),'true');
  x.left.click();
  assert.equal(x.left.getAttribute('aria-pressed'),'false');
});
