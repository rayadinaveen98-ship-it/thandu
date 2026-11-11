/* THANDU — Little Beginnings, authentic photo-led memory sanctuary. */
(()=>{
'use strict';
const area=document.getElementById('sanctuary');
if(!area)return;
const portals=[...area.querySelectorAll('.memory-orb')];
const modal=document.getElementById('memoryReveal');
const title=document.getElementById('memoryTitle');
const desc=document.getElementById('memoryDescription');
const status=document.getElementById('memoryStatus');
const stage=document.getElementById('memoryStage');
const close=document.getElementById('memoryClose');
const prev=document.getElementById('memoryPrevious');
const next=document.getElementById('memoryNext');
const titles=['FIRST LIGHT','LITTLE JOYS','GROWING YEARS','WARM MOMENTS','BRIGHT DAYS'];
const symbols=['✧','✺','❈','❀','✦'];
const descriptions=[
'A little photograph, kept just as it was captured.',
'A gentle glimpse from the very beginning.',
'Another moment from the growing collection of memories.',
'A familiar image, held in a world of soft light.',
'One more authentic moment in the constellation.'
];
const photoIds=window.THANDU_MEDIA?.scenes.find(scene=>scene.id==='sanctuary')?.photoIds || [];
const photoMap=new Map((window.THANDU_MEDIA?.photos||[]).map(photo=>[photo.id,photo]));
let chosen=0;
let activeOrigin=null;
const seen=new Set();
function showMemory(index){
 chosen=(index+portals.length)%portals.length;
 const button=portals[chosen];
 activeOrigin=button;
 seen.add(chosen);
 button.classList.add('revealed');
 button.setAttribute('aria-pressed','true');
 title.textContent=titles[chosen];
 desc.textContent=descriptions[chosen];
 const photo=photoMap.get(photoIds[chosen]);
 if(photo) {
  const image=document.createElement('img');
  image.src=photo.src;
  image.alt='Original photograph from Little Beginnings, memory '+(chosen+1)+' of five';
  image.decoding='async';
  image.style.objectFit='contain';
  stage.replaceChildren(image);
 }
 status.textContent=seen.size+' OF '+portals.length+' MEMORIES DISCOVERED';
 if(seen.size===portals.length){
  status.textContent='ALL FIVE MEMORIES FOUND · CONTINUE TO GROWING YEARS';
 }
 modal.hidden=false;
 document.body.classList.add('memory-dialog-open');
 document.querySelector('.lower-nav')?.setAttribute('inert','');
 document.querySelector('.topbar')?.setAttribute('inert','');
 close.focus({preventScroll:true});
}
portals.forEach((button,index)=>button.addEventListener('click',()=>showMemory(index)));
function dismiss(){
 if(modal.hidden)return;
 modal.hidden=true;
 document.body.classList.remove('memory-dialog-open');
 document.querySelector('.lower-nav')?.removeAttribute('inert');
 document.querySelector('.topbar')?.removeAttribute('inert');
 if(activeOrigin&&area.classList.contains('current'))activeOrigin.focus({preventScroll:true});
}
close.addEventListener('click',dismiss);
prev.addEventListener('click',()=>portals[(chosen+portals.length-1)%portals.length].click());
next.addEventListener('click',()=>portals[(chosen+1)%portals.length].click());
modal.addEventListener('click',e=>{if(e.target===modal)dismiss()});
document.addEventListener('keydown',e=>{
 if(modal.hidden)return;
 if(e.key==='Escape'){e.preventDefault();dismiss();return;}
 if(e.key==='Tab'){
  const focusable=[prev,close,next];
  const first=focusable[0],last=focusable[focusable.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
 }
});
let raf=0;
area.addEventListener('pointermove',e=>{
 if(!area.classList.contains('current')||document.body.classList.contains('motion-off')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 if(raf)cancelAnimationFrame(raf);
 const r=area.getBoundingClientRect();
 const x=((e.clientX-r.left)/r.width-.5)*150;
 const y=((e.clientY-r.top)/r.height-.5)*90;
 raf=requestAnimationFrame(()=>{area.style.setProperty('--sx',x.toFixed(1)+'px');area.style.setProperty('--sy',y.toFixed(1)+'px');});
},{passive:true});
area.addEventListener('pointerleave',()=>{area.style.setProperty('--sx','0px');area.style.setProperty('--sy','0px')},{passive:true});
})();