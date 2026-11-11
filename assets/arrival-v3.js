/* THANDU — Arrival V3 / A World of Little Lights
   6.5s candle-lit welcome → lively festival garden → bird-triggered real-photo reveal.
   No synthetic face animation, image processing, audio autoplay or persistent skip flags.
 */
(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const overlay=$('welcomeOverlay'), skip=$('skipWelcome'), journey=$('journey');
  const header=document.querySelector('.topbar'), skipLink=document.querySelector('.skip-link');
  const arrival=$('arrival'), bird=$('arrivalBird'), primary=$('arrivalPrimary');
  const photo=$('arrivalPhotoStage'), photoButton=$('arrivalHeroOpen');
  const primaryLabel=$('arrivalPrimaryLabel'), hint=$('arrivalBirdHint');
  const caption=$('arrivalActionCaption'), status=$('arrivalLiveStatus');
  const festival=$('arrivalFestival');
  if(!overlay||!skip||!journey||!arrival||!bird||!primary||!photo) return;

  const DURATION_MS=6500, REVEAL_MS=1650;
  const motionQuery=window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const motionOff=()=>!!motionQuery?.matches||document.body.classList.contains('motion-off');
  let introActive=true, introTimer=null, revealTimer=null, revealing=false, revealed=false;
  let nextFrame=0;

  function completeWelcome(reason='time'){
    if(!introActive)return;
    introActive=false;
    if(introTimer!==null){window.clearTimeout(introTimer);introTimer=null}
    overlay.hidden=true;
    overlay.setAttribute('aria-hidden','true');
    document.body.classList.remove('welcome-active');
    journey.removeAttribute('inert');
    header?.removeAttribute('inert');
    skipLink?.removeAttribute('inert');
    const spark=$('welcomeAwakeningParticles');if(spark)spark.replaceChildren();
    const target=reason==='skip'?bird:$('arrivalTitle');
    if(target){
      if(reason!=='skip'&&!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
    }
  }

  function completeReveal(){
    if(revealTimer!==null){window.clearTimeout(revealTimer);revealTimer=null}
    revealing=false;revealed=true;
    arrival.classList.remove('arrival-revealing');
    arrival.classList.add('arrival-revealed');
    photo.removeAttribute('inert');
    photo.setAttribute('aria-hidden','false');
    photoButton?.removeAttribute('tabindex');
    bird.disabled=true;
    bird.setAttribute('aria-hidden','true');
    bird.tabIndex=-1;
    primaryLabel.textContent='Begin the journey';
    caption.textContent='The first memory is here. Discover the story.';
    status.textContent='The first photograph of Thandu is revealed. Begin the journey or open the photograph.';
    if(document.activeElement===bird || document.activeElement===primary){
      primary.focus({preventScroll:true});
    }
  }

  function revealMemory(){
    if(revealed||revealing)return;
    if(introActive)completeWelcome('skip');
    revealing=true;
    arrival.classList.add('arrival-revealing');
    status.textContent='The little bird carries a trail of light toward the hidden memory.';
    if(!motionOff())burstAt(73,53,36,23);
    if(motionOff())completeReveal();
    else revealTimer=window.setTimeout(completeReveal,REVEAL_MS);
  }

  bird.addEventListener('click',revealMemory);
  // Prevent the Journey Controller's static [data-next] listener from
  // navigating before this explicit two-stage photo reveal has completed.
  primary.addEventListener('click',event=>{
    if(!revealed){
      event.preventDefault();
      event.stopImmediatePropagation();
      revealMemory();
    }
  },true);

  // Always appear on every *fresh* page load; never persist a visited flag.
  function skipWelcome(){completeWelcome('skip')}
  skip.addEventListener('click',skipWelcome);
  document.addEventListener('keydown',event=>{
    if(introActive){
      if(event.key==='Escape'){
        event.preventDefault();event.stopPropagation();skipWelcome();
      }else if(event.key==='Tab'){
        event.preventDefault();event.stopPropagation();
        skip.focus({preventScroll:true});
      }
    }
  },true);

  // Decorative particles are bounded, passive, and switch off for reduced motion.
  function createField(rootId,count,kind,seed){
    const root=$(rootId);if(!root||motionOff())return;
    const flowerColors=['#f6acc7','#e988ba','#ffd0b8','#e4a0d0','#fff0bf'];
    for(let i=0;i<count;i++){
      const x=((i*37+seed*11)%94)+3, y=((i*61+seed*7)%82)+7;
      const element=document.createElement('span');
      element.className=kind==='firefly'?'festival-firefly':kind==='petal'?'festival-petal':'intro-spark';
      element.setAttribute('aria-hidden','true');
      element.style.setProperty('--x',x+'%');
      element.style.setProperty('--y',y+'%');
      element.style.setProperty('--dx',((i%2?1:-1)*(35+i%7*19))+'px');
      element.style.setProperty('--dy',(kind==='petal'?270+(i%8)*65:-(18+i%9*8))+'px');
      element.style.setProperty('--sz',kind==='petal'?(12+i%5*6)+'px':(3+i%4*3)+'px');
      element.style.setProperty('--dur',(kind==='petal'?11+i%9:kind==='firefly'?3+i%5:2+i%4)+'s');
      element.style.setProperty('--delay',(-i*.57)+'s');
      if(kind==='petal'){
        element.textContent=i%3===0?'❀':'✿';
        element.style.setProperty('--color',flowerColors[i%flowerColors.length]);
      }
      root.appendChild(element);
    }
  }

  function burstAt(xPercent,yPercent,count=20,radius=17){
    if(motionOff()||!arrival.classList.contains('current'))return;
    const limit=Math.min(count,window.innerWidth<640?22:44);
    for(let i=0;i<limit;i++){
      const angle=(Math.PI*2*i/limit)+Math.random()*.21;
      const d=radius*(.55+Math.random()*1.22);
      const dot=document.createElement('span');
      dot.className='arrival-reveal-spark';
      dot.setAttribute('aria-hidden','true');
      dot.style.setProperty('--x',xPercent+'%');
      dot.style.setProperty('--y',yPercent+'%');
      dot.style.setProperty('--dx',Math.cos(angle)*d+'vw');
      dot.style.setProperty('--dy',Math.sin(angle)*d+'vh');
      dot.style.setProperty('--sz',(4+Math.random()*6)+'px');
      dot.style.setProperty('--dur',(900+Math.random()*600)+'ms');
      arrival.appendChild(dot);
      dot.addEventListener('animationend',()=>dot.remove(),{once:true});
      window.setTimeout(()=>dot.remove(),1700);
    }
  }

  const lanterns=[...arrival.querySelectorAll('[data-awaken="lantern"]')];
  lanterns.forEach(lantern=>{
    lantern.addEventListener('click',()=>{
      const lit=lantern.getAttribute('aria-pressed')==='true';
      lantern.setAttribute('aria-pressed',String(!lit));
      const direction=lantern.classList.contains('left')?'left':'right';
      lantern.setAttribute('aria-label',(lit?'Light the ':'Dim the ')+direction+' lantern');
      if(!lit)burstAt(direction==='left'?8:90,direction==='left'?35:43,15,7);
    });
  });

  function pointerParallax(event){
    if(motionOff()||!arrival.classList.contains('current'))return;
    if(nextFrame)return;
    const x=(event.clientX/window.innerWidth-.5)*22;
    const y=(event.clientY/window.innerHeight-.5)*18;
    nextFrame=requestAnimationFrame(()=>{
      nextFrame=0;
      festival?.style.setProperty('--parallax-x',x.toFixed(1)+'px');
      festival?.style.setProperty('--parallax-y',y.toFixed(1)+'px');
    });
  }
  if(window.matchMedia?.('(hover: hover) and (pointer: fine)').matches){
    arrival.addEventListener('pointermove',pointerParallax,{passive:true});
  }
  const fieldSize=window.innerWidth<640?12:24;
  createField('arrivalFireflyField',fieldSize+5,'firefly',5);
  createField('arrivalFloatingPetals',fieldSize,'petal',3);
  createField('welcomeAwakeningParticles',window.innerWidth<640?12:25,'intro',9);

  // Prefers-reduced-motion users should never be trapped behind the intro
  // and should receive an instantaneous, fully usable photo reveal.
  if(motionOff()){
    completeWelcome('reduce');
  }else{
    journey.setAttribute('inert','');
    header?.setAttribute('inert','');
    skipLink?.setAttribute('inert','');
    skip.focus({preventScroll:true});
    introTimer=window.setTimeout(()=>completeWelcome('time'),DURATION_MS);
  }

  motionQuery?.addEventListener?.('change',event=>{
    if(event.matches && introActive)completeWelcome('reduce');
    if(event.matches && revealing)completeReveal();
  });

  // The older global motion switch can turn animation off during this scene.
  // Clear temporary particle elements when leaving the page.
  window.addEventListener('pagehide',()=>{
    if(introTimer!==null)window.clearTimeout(introTimer);
    if(revealTimer!==null)window.clearTimeout(revealTimer);
    if(nextFrame)cancelAnimationFrame(nextFrame);
  });
})();
