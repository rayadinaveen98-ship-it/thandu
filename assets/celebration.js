/* THANDU — Joy Courtyard V0.4
   Original visual interactions; no personal photos, video, or private messages.
   No face manipulation. No remote dependencies. */
(() => {
  'use strict';

  const scene = document.getElementById('celebration');
  if (!scene) return;

  const lightRow = document.getElementById('joyGarland');
  const controls = [...scene.querySelectorAll('[data-joy]')];
  const status = document.getElementById('joyStatus');
  const release = document.getElementById('joyRelease');
  const message = document.getElementById('joyFinalMessage');
  const replay = document.getElementById('joyReplay');
  const active = new Set();
  const actions = new Set(['lights', 'flowers', 'stars']);
  const animationDisabled = () =>
    document.body.classList.contains('motion-off') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The light garland is individual DOM geometry, not an animated screenshot.
  for (let i = 0; i < 17; i++) {
    const bulb = document.createElement('span');
    bulb.className = 'joy-bulb';
    bulb.style.setProperty('--x', (i * 100 / 16) + '%');
    bulb.style.setProperty('--drop', (12 + 28 * Math.sin(Math.PI * i / 16)) + 'px');
    bulb.style.setProperty('--delay', -(i % 5) * 0.43 + 's');
    lightRow.appendChild(bulb);
  }

  function burst(x, y, count = 26, radius = 110) {
    if (animationDisabled()) return;
    const bounds = scene.getBoundingClientRect();
    const cx = ((x - bounds.left) / bounds.width) * 100;
    const cy = ((y - bounds.top) / bounds.height) * 100;
    for (let i = 0; i < Math.min(count, 48); i++) {
      const angle = Math.PI * 2 * (i / count) + Math.random() * .35;
      const distance = radius * (.35 + Math.random() * .82);
      const spark = document.createElement('span');
      spark.className = 'joy-spark';
      spark.setAttribute('aria-hidden', 'true');
      spark.style.setProperty('--left', cx + '%');
      spark.style.setProperty('--top', cy + '%');
      spark.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
      spark.style.setProperty('--dy', Math.sin(angle) * distance - 21 + 'px');
      spark.style.setProperty('--size', (3 + Math.random() * 5) + 'px');
      spark.style.setProperty('--duration', (720 + Math.random() * 480) + 'ms');
      scene.appendChild(spark);
      spark.addEventListener('animationend', () => spark.remove(), { once: true });
      setTimeout(() => spark.remove(), 1500);
    }
  }

  function revealAction(key, button) {
    if (!actions.has(key)) return;
    const bounds = button.getBoundingClientRect();
    if (!active.has(key)) {
      active.add(key);
      button.classList.add('done');
      button.setAttribute('aria-pressed', 'true');
      const sub = button.querySelector('.joy-sub');
      if (sub) sub.textContent = 'Discovered ✓';
      scene.classList.add('joy-' + key);
      status.textContent = active.size + ' OF 3 SURPRISES DISCOVERED';
      burst(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2, 28, 115);
      if (active.size === 3) {
        status.textContent = 'ALL THREE DISCOVERIES COMPLETE · ONE MORE SURPRISE';
        release.hidden = false;
      }
    } else {
      burst(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2, 11, 65);
    }
  }

  controls.forEach(button => button.addEventListener('click', () =>
    revealAction(button.dataset.joy, button)));

  release.addEventListener('click', () => {
    if (active.size !== 3) return;
    release.hidden = true;
    scene.classList.add('celebrated');
    message.hidden = false;
    status.textContent = 'THE COURTYARD IS ALIVE';
    const bounds = scene.getBoundingClientRect();
    burst(bounds.left + bounds.width / 2, bounds.top + bounds.height * .51, 48, Math.min(bounds.width, bounds.height) * .34);
    replay.focus({ preventScroll: true });
  });

  replay.addEventListener('click', () => {
    active.clear();
    scene.classList.remove('joy-lights', 'joy-flowers', 'joy-stars', 'celebrated');
    controls.forEach(button => {
      button.classList.remove('done');
      button.setAttribute('aria-pressed', 'false');
      const sub = button.querySelector('.joy-sub');
      if (sub) {
        const defaults = { lights: 'Bring the glow', flowers: 'Wake the bloom', stars: 'Fill the sky' };
        sub.textContent = defaults[button.dataset.joy] || 'Discover';
      }
    });
    message.hidden = true;
    release.hidden = true;
    status.textContent = '0 OF 3 SURPRISES DISCOVERED';
    controls[0]?.focus({ preventScroll: true });
  });

  // Clear any lingering transient sparks when the app becomes hidden.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) scene.querySelectorAll('.joy-spark').forEach(spark => spark.remove());
  });
})();