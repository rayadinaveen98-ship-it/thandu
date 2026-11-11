/* THANDU V0.9 — one public story with original-appearance photos from the first frame.
 * Media lives under /media/ on the same main domain; no upload, tracking or face editing.
 */
(() => {
  'use strict';
  const story = window.THANDU_MEDIA;
  if (!story || !Array.isArray(story.photos) || story.photos.length !== 47) return;
  const photos = new Map(story.photos.map(photo => [photo.id, photo]));
  const chapters = new Map(story.scenes.map(scene => [scene.id, scene]));
  const $ = id => document.getElementById(id);
  const states = new Map();
  const fallback = '/media/scene-00.webp';
  const imageURL = id => photos.get(id)?.src || fallback;

  // Dedicated viewer preserves the photo's natural proportions and does not touch pixels.
  const dialog = document.createElement('dialog');
  dialog.className = 'story-photo-viewer';
  dialog.setAttribute('aria-label','Photographic memory');
  dialog.innerHTML = '<div class="photo-viewer-panel">' +
    '<header class="photo-viewer-head"><span id="photoViewerCaption">A little moment</span>' +
    '<button type="button" id="photoViewerClose" aria-label="Close photograph">✕</button></header>' +
    '<div class="photo-viewer-image-wrap"><img id="photoViewerImage" alt="Original photograph in natural proportions"></div>' +
    '<footer class="photo-viewer-controls">' +
    '<button type="button" id="photoViewerPrevious">← Previous</button>' +
    '<span id="photoViewerCount" aria-live="polite"></span>' +
    '<button type="button" id="photoViewerNext">Next →</button></footer></div>';
  document.body.appendChild(dialog);
  const fullImage = $('photoViewerImage');
  let viewerList = [], viewerPosition = 0, opener = null;
  function renderViewer() {
    const id=viewerList[viewerPosition];if(!photos.has(id))return;
    fullImage.src=imageURL(id);
    fullImage.alt='Original photograph '+id+' of the THANDU birthday journey, displayed without reshaping';
    $('photoViewerCount').textContent=(viewerPosition+1)+' / '+viewerList.length;
    $('photoViewerPrevious').disabled=viewerList.length<2;
    $('photoViewerNext').disabled=viewerList.length<2;
    $('photoViewerCaption').textContent='A little moment to keep ✧';
  }
  function openViewer(list,index,from) {
    if (!list?.length) return;
    viewerList=[...list];viewerPosition=Math.max(0,Math.min(index,viewerList.length-1));
    opener=from;
    renderViewer();
    if (typeof dialog.showModal==='function') dialog.showModal();
    else dialog.setAttribute('open','');
    $('photoViewerClose').focus({preventScroll:true});
  }
  const closeViewer=()=>{if(dialog.open&&typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open')};
  $('photoViewerClose').addEventListener('click',closeViewer);
  $('photoViewerPrevious').addEventListener('click',()=>{viewerPosition=(viewerPosition-1+viewerList.length)%viewerList.length;renderViewer()});
  $('photoViewerNext').addEventListener('click',()=>{viewerPosition=(viewerPosition+1)%viewerList.length;renderViewer()});
  dialog.addEventListener('close',()=>{if(opener?.isConnected)opener.focus({preventScroll:true})});
  dialog.addEventListener('click',event=>{if(event.target===dialog)closeViewer()});
  fullImage.addEventListener('error',()=>{fullImage.alt='This photograph is unavailable; try the next memory'});

  function paintFrame(world,idx=0) {
    const state=states.get(world);if(!state)return;
    const selected=state.list[Math.max(0,Math.min(idx,state.list.length-1))];
    state.index=Math.max(0,Math.min(idx,state.list.length-1));
    state.image.src=imageURL(selected);
    state.image.alt='Photograph '+selected+' from '+state.label+'; original appearance preserved';
    state.open.setAttribute('aria-label','Open photograph '+(state.index+1)+' in '+state.label);
    state.caption.textContent=state.label;
    state.counter.textContent=(state.index+1)+' / '+state.list.length;
    state.prev.disabled=state.list.length<2;
    state.next.disabled=state.list.length<2;
    if(world==='growing')document.querySelectorAll('[data-growing-memory]').forEach((button,i)=>{
      button.classList.toggle('lit',i===state.index);
      button.setAttribute('aria-pressed',String(i===state.index));
    });
  }
  function makeFrame(scene) {
    const world=$(scene.id),list=scene.photoIds;
    if(!world||!list.length)return;
    const frame=document.createElement('div');
    frame.className='story-photo-stage';
    frame.dataset.world=scene.id;
    frame.setAttribute('aria-label','Original photograph memories in '+scene.label);
    frame.innerHTML='<div class="story-photo-halo" aria-hidden="true"></div>'+
      '<div class="story-frame-crown" aria-hidden="true">✧</div>'+
      '<button type="button" class="story-photo-open" aria-label="Open full size photograph">'+
      '<img alt="" decoding="async"><span class="story-zoom" aria-hidden="true">↗</span></button>'+
      '<div class="story-photo-caption"><span class="story-caption-text"></span><span class="story-caption-number"></span></div>'+
      '<div class="story-frame-actions"><button type="button" class="frame-prev" aria-label="Previous photograph">←</button>'+
      '<span class="frame-dots" aria-hidden="true">✦</span>'+
      '<button type="button" class="frame-next" aria-label="Next photograph">→</button></div>';
    world.appendChild(frame);
    const state={
      label:scene.label,list:[...list],index:0,
      image:frame.querySelector('img'),open:frame.querySelector('.story-photo-open'),
      caption:frame.querySelector('.story-caption-text'),counter:frame.querySelector('.story-caption-number'),
      prev:frame.querySelector('.frame-prev'),next:frame.querySelector('.frame-next')
    };
    state.image.loading=scene.id==='arrival'?'eager':'lazy';
    state.image.fetchPriority=scene.id==='arrival'?'high':'auto';
    state.image.addEventListener('error',()=>{state.image.alt='This photograph is temporarily unavailable'});
    states.set(scene.id,state);
    state.open.addEventListener('click',()=>openViewer(state.list,state.index,state.open));
    state.prev.addEventListener('click',()=>paintFrame(scene.id,(state.index+state.list.length-1)%state.list.length));
    state.next.addEventListener('click',()=>paintFrame(scene.id,(state.index+1)%state.list.length));
    paintFrame(scene.id,0);
  }

  // Keep the original painterly worlds as scenery behind independently rendered real photos.
  for (const scene of story.scenes) {
    const world=$(scene.id);
    if (!world || !scene.art) continue;
    const matte=document.createElement('div');
    matte.className='story-art-matte';
    matte.setAttribute('aria-hidden','true');
    matte.style.backgroundImage='url("'+scene.art+'")';
    world.prepend(matte);
  }

  // Arrival is in the HTML before JS runs: browsers can request the first real photo immediately.
  const arrival=chapters.get('arrival');
  const staticPhoto=$('arrivalHeroPhoto');
  if(arrival && staticPhoto) {
    staticPhoto.src=imageURL(arrival.photoIds[0]);
    staticPhoto.alt='Thandu — a real photograph welcoming you into her birthday journey';
    const button=$('arrivalHeroOpen');
    if(button)button.addEventListener('click',()=>openViewer(arrival.photoIds,0,button));
  }

  ['growing','bloom','celebration','letter','universe'].forEach(id=>{
    const scene=chapters.get(id);if(scene)makeFrame(scene);
  });

  // Each glowing sanctuary portal shows an authentic, stationary miniature portrait.
  const sanctuary=chapters.get('sanctuary');
  if(sanctuary) {
    document.querySelectorAll('#sanctuary .memory-orb').forEach((button,i)=>{
      const id=sanctuary.photoIds[i];if(!id)return;
      const thumb=document.createElement('img');
      thumb.className='orb-real-photo';thumb.src=imageURL(id);
      thumb.loading='lazy';thumb.alt='';thumb.setAttribute('aria-hidden','true');
      button.insertBefore(thumb,button.firstChild);
      button.setAttribute('aria-label','Open original memory '+(i+1)+' from Little Beginnings');
    });
  }
  // Growing Years lanterns select authentic photographs.
  document.querySelectorAll('#growing [data-growing-memory]').forEach((button,index)=>{
    button.addEventListener('click',()=>paintFrame('growing',index));
  });
  // Five portal clusters on the final keepsake display authentic thumbnail stars.
  const keepsake=chapters.get('constellation');
  const keepPreview=[33,40,23,14,46];
  document.querySelectorAll('#constellation [data-cluster]').forEach((button,i)=>{
    const img=document.createElement('img');
    img.className='constellation-real-thumb';img.src=imageURL(keepPreview[i]);img.loading='lazy';img.alt='';img.setAttribute('aria-hidden','true');
    button.insertBefore(img,button.firstChild);
  });

  // Expose only read-only story data to scene-specific presentation code.
  window.THANDU_PHOTO_WORLD=Object.freeze({
    photo:id=>photos.get(id),
    chapter:id=>chapters.get(id),
    open:openViewer
  });
})();