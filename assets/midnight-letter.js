/* THANDU — Midnight Letter V0.5
   Original interactive envelope; PUBLIC PREVIEW TEXT ONLY, no private letter. */
(() => {
  'use strict';
  const scene = document.getElementById('letter');
  if (!scene) return;
  const seal = document.getElementById('letterSeal');
  const panel = document.getElementById('letterReveal');
  const paper = document.getElementById('letterPaper');
  const closeButton = document.getElementById('letterClose');
  const restartButton = document.getElementById('letterReadAgain');
  const nav = document.querySelector('.lower-nav');
  const header = document.querySelector('.topbar');
  let openTimer = null;
  let active = false;

  function read() {
    if (active) return;
    active = true;
    scene.classList.add('letter-open');
    const reduced = document.body.classList.contains('motion-off') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    openTimer = window.setTimeout(() => {
      openTimer = null;
      if (!active) return;
      panel.hidden = false;
      nav?.setAttribute('inert', '');
      header?.setAttribute('inert', '');
      seal.setAttribute('inert', '');
      paper.scrollTop = 0;
      closeButton.focus({ preventScroll: true });
    }, reduced ? 0 : 420);
  }

  function close({ restoreFocus = true } = {}) {
    if (openTimer != null) {
      window.clearTimeout(openTimer);
      openTimer = null;
    }
    active = false;
    panel.hidden = true;
    scene.classList.remove('letter-open');
    nav?.removeAttribute('inert');
    header?.removeAttribute('inert');
    seal.removeAttribute('inert');
    if (restoreFocus && scene.classList.contains('current')) {
      seal.focus({ preventScroll: true });
    }
  }

  seal.addEventListener('click', read);
  closeButton.addEventListener('click', () => close());
  restartButton.addEventListener('click', () => {
    paper.scrollTop = 0;
    const heading = document.getElementById('letterPaperTitle');
    if (heading) heading.focus?.({ preventScroll: true });
    else closeButton.focus({ preventScroll: true });
  });
  panel.addEventListener('click', event => {
    if (event.target === panel) close();
  });

  document.addEventListener('keydown', event => {
    if (panel.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    // Only these two controls are tabbable inside the letter preview.
    // Constrain focus even when an inert-compatible fallback browser is used.
    const first = closeButton;
    const last = restartButton;
    if (event.shiftKey && document.activeElement !== last) {
      event.preventDefault();
      last.focus({ preventScroll: true });
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  });

  // Normal scene navigation can only occur after the dialog is closed,
  // but this is a defensive cleanup in case the app changes chapters programmatically.
  const observer = typeof MutationObserver === 'function' ? new MutationObserver(() => {
    if (!scene.classList.contains('current') && active) close({ restoreFocus: false });
  }) : null;
  observer?.observe(scene, { attributes: true, attributeFilter: ['class'] });

  window.thanduLetter = Object.freeze({ close });
})();