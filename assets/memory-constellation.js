/* THANDU V0.9 — Public, curated memory constellation.
 * 47 authentic photo presentation copies are served by the main THANDU domain.
 * No personal uploads, visitor accounts, tracking, or face processing.
 */
(() => {
  'use strict';
  const scene = document.getElementById('constellation');
  if (!scene) return;
  const drawer = document.getElementById('galleryDrawer');
  const dialog = document.getElementById('galleryViewer');
  const opener = document.getElementById('galleryOpen');
  const closeDrawer = document.getElementById('galleryClose');
  const choose = document.getElementById('galleryChoose');
  const input = document.getElementById('galleryFileInput');
  const clear = document.getElementById('galleryClear');
  const grid = document.getElementById('galleryGrid');
  const empty = document.getElementById('galleryEmpty');
  const count = document.getElementById('galleryCount');
  const feedback = document.getElementById('galleryFeedback');
  const filterButtons = [...drawer.querySelectorAll('[data-gallery-filter]')];
  const clusters = [...scene.querySelectorAll('[data-cluster]')];
  const image = document.getElementById('galleryViewerImage');
  const viewerIndex = document.getElementById('galleryViewerIndex');
  const selectGroup = document.getElementById('galleryGroupSelect');
  const photoPrevious = document.getElementById('galleryPhotoPrevious');
  const photoNext = document.getElementById('galleryPhotoNext');
  const photoClose = document.getElementById('galleryViewerClose');

  const groups = Object.freeze({
    unassigned: 'Unsorted',
    childhood: 'Little Beginnings',
    growing: 'Growing Years',
    bloom: 'In Bloom',
    joy: 'Joyful Moments',
    portraits: 'Portraits'
  });
  const allowedTypes = new Set(['image/jpeg','image/png','image/webp']);
  const MAX_PHOTOS = 60;
  const MAX_BYTES = 30 * 1024 * 1024;
  let photos = (window.THANDU_MEDIA?.photos || []).map(photo => ({id:photo.id,uri:photo.src,group:photo.group}));
  let filter = 'all';
  let current = 0;
  let lastGalleryOpener = null;
  let lastTile = null;
  let serial = 0;

  function setFeedback(message = '') {
    feedback.textContent = message;
    feedback.hidden = !message;
  }
  function stopBackground(enabled) {
    document.querySelector('.topbar')?.toggleAttribute('inert', enabled);
    document.querySelector('.lower-nav')?.toggleAttribute('inert', enabled);
    scene.toggleAttribute('inert', enabled);
    document.body.classList.toggle('gallery-open', enabled);
  }
  function setFilter(group) {
    filter = Object.hasOwn(groups,group) || group === 'all' ? group : 'all';
    filterButtons.forEach(b => {
      const selected = b.dataset.galleryFilter === filter;
      b.classList.toggle('selected', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    clusters.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cluster === filter)));
    render();
  }
  function openDrawer(group = 'all', origin = opener) {
    if (!drawer.hidden) { setFilter(group); return; }
    lastGalleryOpener = origin;
    drawer.hidden = false;
    stopBackground(true);
    setFilter(group);
    closeDrawer.focus({ preventScroll: true });
  }
  function closeGallery() {
    if (drawer.hidden) return;
    if (dialog.open) closeViewer();
    drawer.hidden = true;
    stopBackground(false);
    clusters.forEach(b => b.setAttribute('aria-pressed','false'));
    if (scene.classList.contains('current')) {
      (lastGalleryOpener || opener).focus({ preventScroll: true });
    }
  }
  opener.addEventListener('click', () => openDrawer('all', opener));
  clusters.forEach(b => b.addEventListener('click', () => openDrawer(b.dataset.cluster,b)));
  closeDrawer.addEventListener('click', closeGallery);
  filterButtons.forEach(b => b.addEventListener('click', () => setFilter(b.dataset.galleryFilter)));

  function forgetPhotos() {
    if (dialog.open) closeViewer();
    image.removeAttribute('src');
    grid.replaceChildren();
    photos.forEach(photo => { if (photo.uri.startsWith('blob:')) URL.revokeObjectURL(photo.uri); });
    photos = [];
    input.value = '';
    clear.disabled = true;
    current = 0;
  }
  function render() {
    const visible = photos.filter(p => filter === 'all' || p.group === filter);
    grid.replaceChildren();
    const allCount = photos.length;
    count.textContent = visible.length + ' shown · ' + allCount + (allCount === 1 ? ' memory' : ' memories') + ' in Thandu’s constellation';
    clear.disabled = photos.length === 0;
    empty.hidden = visible.length > 0;
    const heading = empty.querySelector('h3');
    const description = empty.querySelector('p');
    if (heading && description) {
      if (allCount === 0) {
        heading.textContent = 'The constellation is waiting.';
        description.textContent = 'Choose photographs from your device to preview them here. You can arrange them into memory themes without changing the originals.';
      } else {
        heading.textContent = 'No photos in this constellation yet.';
        description.textContent = 'Open any photo from All memories, choose a theme, then return to this constellation.';
      }
    }
    for (const photo of visible) {
      const button = document.createElement('button');
      button.className = 'gallery-tile';
      button.type = 'button';
      button.setAttribute('aria-label', 'View selected photograph ' + (photos.indexOf(photo)+1) +
        ', ' + groups[photo.group]);
      const stage = document.createElement('span');
      stage.className = 'gallery-tile-image';
      const thumb = document.createElement('img');
      thumb.src = photo.uri;
      thumb.alt = '';
      thumb.loading = 'lazy';
      thumb.decoding = 'async';
      stage.appendChild(thumb);
      const label = document.createElement('span');
      label.className = 'gallery-tile-title';
      label.textContent = 'Memory ' + String(photos.indexOf(photo)+1).padStart(2,'0');
      const group = document.createElement('span');
      group.className = 'gallery-tile-group';
      group.textContent = groups[photo.group];
      button.append(stage,label,group);
      button.addEventListener('click', () => openPhoto(photos.indexOf(photo), button));
      grid.appendChild(button);
    }
  }
  function chooseFiles(fileList) {
    const candidates = Array.from(fileList || []).slice(0,MAX_PHOTOS);
    const valid = candidates.filter(file => allowedTypes.has(file.type) && file.size <= MAX_BYTES && file.size > 0);
    const rejected = (fileList?.length || 0) - valid.length;
    if (!valid.length) {
      input.value = '';
      setFeedback('Choose a JPEG, PNG or WebP photograph smaller than 30 MB. The existing preview is unchanged.');
      return;
    }
    forgetPhotos();
    photos = valid.map(file => ({
      id: ++serial,
      uri: URL.createObjectURL(file),
      group: 'unassigned'
    }));
    input.value = '';
    setFilter('all');
    setFeedback(photos.length + ' photograph' + (photos.length===1?'':'s') +
      ' ready for private preview in this tab.' +
      (rejected ? ' ' + rejected + ' file(s) were skipped (format, size or 60-photo limit).' : ''));
    opener.setAttribute('aria-label', 'Explore ' + photos.length + ' locally selected memories');
  }
  choose.addEventListener('click', () => input.click());
  input.addEventListener('change', () => chooseFiles(input.files));
  clear.addEventListener('click', () => {
    forgetPhotos();
    setFilter('all');
    setFeedback('Selected photos cleared from this browser tab.');
    opener.setAttribute('aria-label','Explore the memories');
    choose.focus({ preventScroll: true });
  });

  function populateViewer() {
    if (!photos.length) return;
    const photo = photos[current];
    image.src = photo.uri;
    image.alt = 'Selected original photograph ' + (current + 1) +
      ' of ' + photos.length + ', displayed without distortion or editing';
    viewerIndex.textContent = String(current + 1).padStart(2,'0') + ' / ' +
      String(photos.length).padStart(2,'0');
    selectGroup.value = photo.group;
    photoPrevious.disabled = photos.length < 2;
    photoNext.disabled = photos.length < 2;
  }
  function openPhoto(index, tile) {
    if (!photos[index]) return;
    current = index;
    lastTile = tile;
    populateViewer();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
    photoClose.focus({ preventScroll: true });
  }
  function closeViewer() {
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else dialog.removeAttribute('open');
  }
  photoClose.addEventListener('click', closeViewer);
  photoPrevious.addEventListener('click', () => {
    if (photos.length < 2) return;
    current = (current + photos.length - 1) % photos.length;
    populateViewer();
  });
  photoNext.addEventListener('click', () => {
    if (photos.length < 2) return;
    current = (current + 1) % photos.length;
    populateViewer();
  });
  selectGroup.addEventListener('change', () => {
    if (!photos[current] || !Object.hasOwn(groups,selectGroup.value)) return;
    photos[current].group = selectGroup.value;
    // The viewed original remains in place even if the current filter changes.
    render();
    setFeedback('Memory ' + (current + 1) + ' arranged under ' + groups[photos[current].group] + '.');
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeViewer();
  });
  dialog.addEventListener('close', () => {
    // Return to the drawer, even if reclassification removed the original tile.
    if (!drawer.hidden) {
      if (lastTile?.isConnected) lastTile.focus({ preventScroll: true });
      else closeDrawer.focus({ preventScroll: true });
    }
  });

  document.addEventListener('keydown', event => {
    if (drawer.hidden || dialog.open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeGallery();
    } else if (event.key === 'Tab') {
      const focusables = [...drawer.querySelectorAll('button:not(:disabled)')].filter(el => el.getClientRects().length);
      const first=focusables[0], last=focusables[focusables.length-1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    }
  });

  // Local URLs are discarded when choosing another set, clearing, or leaving the tab.
  window.addEventListener('pagehide', forgetPhotos);
  window.addEventListener('beforeunload', forgetPhotos);
  render();
})();
