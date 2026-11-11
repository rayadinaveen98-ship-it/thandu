/* THANDU / First Light V2 — every-open, skippable 6.5-second introduction.
   Pure UI sequencing: never transforms, retouches, stores or transmits photograph pixels.
 */
(() => {
  'use strict';
  const overlay=document.getElementById('welcomeOverlay');
  const skip=document.getElementById('skipWelcome');
  const journey=document.getElementById('journey');
  const header=document.querySelector('.topbar');
  const skipLink=document.querySelector('.skip-link');
  if (!overlay || !skip || !journey) return;

  const DURATION_MS=6500;
  const motionQuery=window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let active=true;
  let timer=null;

  function finishedBy(action) {
    if(!active)return;
    active=false;
    if(timer!==null){window.clearTimeout(timer);timer=null}
    overlay.hidden=true;
    overlay.setAttribute('aria-hidden','true');
    document.body.classList.remove('welcome-active');
    journey.removeAttribute('inert');
    header?.removeAttribute('inert');
    skipLink?.removeAttribute('inert');
    // The Skip button is now hidden; never leave keyboard focus inside a hidden dialog.
    const target=action==='skip'
      ?document.querySelector('#arrival .arrival-actions .cta')
      :document.getElementById('arrivalTitle');
    if(target){
      if(!target.hasAttribute('tabindex') && action!=='skip')target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
    }
  }

  function skipWelcome(){finishedBy('skip')}
  skip.addEventListener('click',skipWelcome);
  document.addEventListener('keydown',event=>{
    if(!active)return;
    if(event.key==='Escape'){
      event.preventDefault();
      event.stopPropagation();
      skipWelcome();
    }else if(event.key==='Tab'){
      // While the introduction is visible, this is its only keyboard control.
      event.preventDefault();
      skip.focus({preventScroll:true});
    }
  });

  if(motionQuery?.matches || document.body.classList.contains('motion-off')){
    // A real user accessibility preference overrides the cinematic delay.
    finishedBy('reduce');
  }else{
    // The main journey is still loaded underneath, but unavailable until the intro ends.
    journey.setAttribute('inert','');
    header?.setAttribute('inert','');
    skipLink?.setAttribute('inert','');
    skip.focus({preventScroll:true});
    timer=window.setTimeout(()=>finishedBy('complete'),DURATION_MS);
  }
})();
