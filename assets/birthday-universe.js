/* THANDU — Birthday Universe V0.6.
 * A small, original interactive finale; public preview contains no personal media.
 */
(() => {
  'use strict';
  const scene = document.getElementById('universe');
  if (!scene) return;
  const startButton = document.getElementById('universeStart');
  const progress = document.getElementById('universeProgress');
  const wish = document.getElementById('universeWish');
  const controls = document.getElementById('universeReplay');
  const replay = document.getElementById('universeAgain');
  const motionOff = () =>
    document.body.classList.contains('motion-off') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timers = new Set();
  let active = false;
  let finished = false;

  function later(callback, ms) {
    const id = window.setTimeout(() => {
      timers.delete(id);
      callback();
    }, ms);
    timers.add(id);
  }

  function releaseSparks(n = 25, radius = 180) {
    if (motionOff() || !scene.classList.contains('current')) return;
    const bounds = scene.getBoundingClientRect();
    const count = Math.min(n, window.innerWidth < 520 ? 30 : 55);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * .24;
      const d = radius * (.37 + Math.random() * .83);
      const dust = document.createElement('span');
      dust.className = 'universe-dust' + (i % 3 === 0 ? ' petal' : '');
      dust.setAttribute('aria-hidden', 'true');
      dust.style.setProperty('--x', '50%');
      dust.style.setProperty('--y', '51%');
      dust.style.setProperty('--sz', (3 + Math.random() * 5) + 'px');
      dust.style.setProperty('--dx', Math.cos(angle) * d + 'px');
      dust.style.setProperty('--dy', Math.sin(angle) * d - 16 + 'px');
      dust.style.setProperty('--duration', (850 + Math.random() * 550) + 'ms');
      scene.appendChild(dust);
      dust.addEventListener('animationend', () => dust.remove(), { once: true });
      // Timed cleanup also covers paused animations and hidden tabs.
      window.setTimeout(() => dust.remove(), 1600);
    }
  }

  function finish() {
    if (!active) return;
    active = false;
    finished = true;
    scene.classList.add('universe-awake', 'phase-stillness', 'phase-bloom', 'phase-joy');
    progress.hidden = true;
    wish.hidden = false;
    controls.hidden = false;
    startButton.hidden = true;
    releaseSparks(55, Math.min(window.innerWidth, window.innerHeight) * .43);
    replay.focus({ preventScroll: true });
  }

  function begin() {
    if (active || finished) return;
    active = true;
    startButton.hidden = true;
    progress.hidden = false;
    progress.textContent = 'The first light returns…';
    scene.classList.add('phase-stillness');
    releaseSparks(22, 85);
    if (motionOff()) {
      finish();
      return;
    }
    later(() => {
      if (!active) return;
      scene.classList.add('phase-bloom');
      progress.textContent = 'The garden wakes…';
      releaseSparks(31, 155);
    }, 490);
    later(() => {
      if (!active) return;
      scene.classList.add('phase-joy');
      progress.textContent = 'The stars are coming together…';
      releaseSparks(37, 225);
    }, 1150);
    later(finish, 2050);
  }

  function reset({ focus = false } = {}) {
    for (const id of timers) window.clearTimeout(id);
    timers.clear();
    active = false;
    finished = false;
    scene.classList.remove('universe-awake', 'phase-stillness', 'phase-bloom', 'phase-joy');
    progress.hidden = true;
    progress.textContent = 'Gathering the light…';
    wish.hidden = true;
    controls.hidden = true;
    startButton.hidden = false;
    scene.querySelectorAll('.universe-dust').forEach(el => el.remove());
    if (focus && scene.classList.contains('current')) startButton.focus({ preventScroll: true });
  }

  startButton.addEventListener('click', begin);
  replay.addEventListener('click', () => { reset(); begin(); });

  // Leaving mid-sequence cancels pending reveals and keeps the scene deterministic.
  if (typeof MutationObserver === 'function') {
    const observer = new MutationObserver(() => {
      if (!scene.classList.contains('current') && active) reset();
    });
    observer.observe(scene, { attributes: true, attributeFilter: ['class'] });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      scene.querySelectorAll('.universe-dust').forEach(el => el.remove());
    }
  });
  // Allows reuse without exposing internal state or personal content.
  window.thanduUniverse = Object.freeze({ reset });
})();