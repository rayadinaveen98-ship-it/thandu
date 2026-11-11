/* THANDU — Unified Journey Controller / v0.3
   Public-safe visual preview. No personal images or private text. */
(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const order = ['arrival', 'sanctuary', 'bloom'];
  const sceneHost = $('#journey');
  const canvas = $('#particleCanvas');
  const ctx = canvas?.getContext('2d', { alpha: true });
  if (!sceneHost || !canvas || !ctx) return;

  const reducedPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionEnabled = !reducedPreference.matches;
  let current = 0;
  let transitioning = false;
  let particles = [];
  let width = 0;
  let height = 0;
  let last = 0;
  let blooms = new Set();

  const traveler = document.createElement('div');
  traveler.className = 'traveling-light';
  traveler.setAttribute('aria-hidden', 'true');
  traveler.innerHTML = '<span class="travel-ring"></span><span class="travel-core"></span>';
  sceneHost.appendChild(traveler);

  const wash = document.createElement('div');
  wash.className = 'scene-light-wash';
  wash.setAttribute('aria-hidden', 'true');
  sceneHost.appendChild(wash);

  // One guiding light is carried through each scene and across every transition.
  const guidingLight = document.createElement('button');
  guidingLight.type = 'button';
  guidingLight.id = 'guidingLight';
  guidingLight.className = 'guiding-light';
  guidingLight.setAttribute('aria-label', 'Follow the guiding light into Little Beginnings');
  guidingLight.innerHTML = '<span class="guiding-glow"></span><span class="guiding-core">✦</span><span class="guiding-caption">TOUCH THE LIGHT</span>';
  $('#arrival')?.appendChild(guidingLight);

  function measure() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function emit(x, y, amount = 20, style = 'light') {
    if (!motionEnabled) return;
    const count = Math.min(amount, width < 500 ? 75 : 120);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const velocity = (0.55 + Math.random() * 3.6) * (style === 'bloom' ? 1.16 : 1);
      particles.push({
        x, y,
        vx: Math.cos(theta) * velocity,
        vy: Math.sin(theta) * velocity - (style === 'bloom' ? 0.6 : 0.15),
        lifetime: 40 + Math.random() * 56,
        opacity: .36 + Math.random() * .58,
        radius: 0.7 + Math.random() * 2.5,
        color: style === 'bloom' ? '255,191,199' : style === 'mist' ? '255,247,229' : '255,222,151'
      });
    }
    if (particles.length > 320) particles.splice(0, particles.length - 320);
  }

  function frame(time) {
    const frameDelta = Math.min(2.2, (time - last) / 16.667 || 1);
    last = time;
    ctx.clearRect(0, 0, width, height);
    if (motionEnabled && !document.hidden) {
      if (Math.random() < .25 && particles.length < 110) {
        particles.push({
          x: Math.random() * width, y: height + 6,
          vx: (Math.random() - .5) * .22,
          vy: -(0.25 + Math.random() * .45),
          lifetime: 110 + Math.random() * 110,
          opacity: .1 + Math.random() * .3,
          radius: .35 + Math.random() * 1.35,
          color: current === 2 ? '255,210,193' : '255,239,195'
        });
      }
      particles = particles.filter(particle => particle.lifetime > 0);
      for (const particle of particles) {
        particle.x += particle.vx * frameDelta;
        particle.y += particle.vy * frameDelta;
        particle.vy += .005 * frameDelta;
        particle.lifetime -= frameDelta;
        const opacity = particle.opacity * Math.min(1, particle.lifetime / 28);
        ctx.fillStyle = 'rgba(' + particle.color + ',' + opacity.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    requestAnimationFrame(frame);
  }

  const flowerField = $('#flowerField');
  if (flowerField) {
    const labels = ['Wonder', 'Warmth', 'Laughter', 'Kindness', 'Light'];
    for (let i = 0; i < 5; i++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'flower';
      button.setAttribute('aria-label', 'Bloom ' + labels[i] + ' flower');
      button.setAttribute('aria-pressed', 'false');
      button.dataset.flower = String(i + 1);
      const petals = Array.from({ length: 8 }, (_, petalIndex) =>
        '<span class="petal" style="--angle:' + (petalIndex * 45) + 'deg"></span>'
      ).join('');
      button.innerHTML = '<span class="bloom-stem"></span><span class="ring"></span>' +
        petals + '<span class="center"></span><span class="flower-name">' + labels[i] + '</span>';
      button.addEventListener('click', () => {
        const rect = button.getBoundingClientRect();
        if (!blooms.has(i)) {
          blooms.add(i);
          button.classList.add('is-open');
          button.setAttribute('aria-pressed', 'true');
          emit(rect.left + rect.width / 2, rect.top + rect.height / 2, 58, 'bloom');
          $('#bloomCounter').textContent = blooms.size + ' / 5 flowers';
          $('#progressFill').style.width = blooms.size * 20 + '%';
          sceneHost.style.setProperty('--bloomed', String(blooms.size / 5));
          if (blooms.size === 5) {
            const reward = $('#gardenReward');
            if (reward) reward.hidden = false;
            if (motionEnabled) setTimeout(() => emit(width / 2, height * .54, 105, 'bloom'), 650);
          }
        } else {
          emit(rect.left + rect.width / 2, rect.top + rect.height / 2, 15, 'bloom');
        }
      });
      flowerField.appendChild(button);
    }

    const reward = document.createElement('div');
    reward.id = 'gardenReward';
    reward.className = 'garden-reward';
    reward.hidden = true;
    reward.innerHTML = '<span>✧ THE GARDEN IS AWAKE ✧</span><button type="button" id="replayGarden">Bloom again</button>';
    flowerField.parentElement.appendChild(reward);
    $('#replayGarden').addEventListener('click', () => {
      blooms.clear();
      $$('.flower', flowerField).forEach(button => {
        button.classList.remove('is-open');
        button.setAttribute('aria-pressed', 'false');
      });
      $('#bloomCounter').textContent = '0 / 5 flowers';
      $('#progressFill').style.width = '0%';
      sceneHost.style.setProperty('--bloomed', '0');
      reward.hidden = true;
    });
  }

  function applyScene(index, announce = true) {
    current = Math.max(0, Math.min(index, order.length - 1));
    const scene = order[current];
    sceneHost.dataset.scene = scene;
    $$('.world').forEach(element => {
      const active = element.id === scene;
      element.classList.toggle('current', active);
      element.toggleAttribute('inert', !active);
      element.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    $$('.chapter-pill').forEach(tab => {
      const selected = tab.dataset.to === scene;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    $('#prev').disabled = current === 0;
    $('#next').disabled = current === order.length - 1;
    if (announce) $('#sceneAnnounce').textContent = 'Now visiting ' +
      (scene === 'arrival' ? 'The Arrival' : scene === 'sanctuary' ? 'Little Beginnings' : 'A World in Bloom');
    document.body.classList.toggle('in-sanctuary', scene === 'sanctuary');
    document.body.classList.toggle('in-bloom', scene === 'bloom');
  }

  // The travelling star never serves as a hidden navigation mechanism:
  // it is only a visual transition following an explicit control action.
  function navigate(index) {
    const target = Math.max(0, Math.min(index, order.length - 1));
    if (target === current || transitioning) return;
    const openMemory = $('#memoryReveal');
    if (openMemory && !openMemory.hidden) {
      $('#memoryClose')?.click();
    }
    if (!motionEnabled) {
      applyScene(target);
      return;
    }
    transitioning = true;
    sceneHost.dataset.transitioning = 'true';
    const startX = width * .5;
    const startY = current === 0 ? height * .59 : current === 1 ? height * .56 : height * .64;
    const endX = width * .5;
    const endY = target === 0 ? height * .59 : target === 1 ? height * .53 : height * .60;
    traveler.style.left = startX + 'px';
    traveler.style.top = startY + 'px';
    traveler.classList.add('visible');
    const direction = target > current ? 1 : -1;
    const offset = Math.min(width * .18, 110) * direction;
    const animation = traveler.animate([
      { transform: 'translate(-50%,-50%) scale(.35)', opacity: 0, offset: 0 },
      { transform: 'translate(calc(-50% + ' + offset + 'px),-70%) scale(1.25)', opacity: 1, offset: .39 },
      { transform: 'translate(-50%,-50%) scale(4.2)', opacity: .96, offset: .75 },
      { transform: 'translate(-50%,-50%) scale(7)', opacity: 0, offset: 1 }
    ], { duration: 1020, easing: 'cubic-bezier(.2,.65,.25,1)' });
    wash.classList.add('lit');
    const swap = setTimeout(() => {
      applyScene(target);
      traveler.style.left = endX + 'px';
      traveler.style.top = endY + 'px';
      emit(endX, endY, 68, target === 2 ? 'bloom' : 'light');
    }, 460);
    animation.onfinish = () => {
      clearTimeout(swap);
      traveler.classList.remove('visible');
      wash.classList.remove('lit');
      sceneHost.dataset.transitioning = 'false';
      transitioning = false;
    };
    animation.oncancel = () => {
      clearTimeout(swap);
      applyScene(target);
      traveler.classList.remove('visible');
      wash.classList.remove('lit');
      sceneHost.dataset.transitioning = 'false';
      transitioning = false;
    };
  }

  $$('.chapter-pill').forEach(tab => tab.addEventListener('click', () =>
    navigate(order.indexOf(tab.dataset.to))));
  $$('[data-next]').forEach(button => button.addEventListener('click', () =>
    navigate(order.indexOf(button.dataset.next))));
  $('#prev').addEventListener('click', () => navigate(current - 1));
  $('#next').addEventListener('click', () => navigate(current + 1));
  guidingLight.addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', event => {
    if (event.target.closest('button,input,textarea,[role="dialog"]')) return;
    if (event.key === 'ArrowRight') navigate(current + 1);
    if (event.key === 'ArrowLeft') navigate(current - 1);
  });

  const motionToggle = $('#motionToggle');
  const setMotion = enabled => {
    motionEnabled = enabled;
    document.body.classList.toggle('motion-off', !enabled);
    motionToggle.setAttribute('aria-pressed', String(!enabled));
    motionToggle.setAttribute('aria-label', enabled ? 'Reduce motion' : 'Enable motion');
    motionToggle.title = enabled ? 'Reduce motion' : 'Enable motion';
    if (!enabled) particles = [];
  };
  motionToggle.addEventListener('click', () => setMotion(!motionEnabled));
  setMotion(motionEnabled);

  const pointerGlow = document.createElement('div');
  pointerGlow.className = 'touch-glow';
  pointerGlow.setAttribute('aria-hidden', 'true');
  sceneHost.appendChild(pointerGlow);

  sceneHost.addEventListener('pointerdown', event => {
    if (event.target.closest('button,[role="dialog"]')) return;
    emit(event.clientX, event.clientY, 27, current === 2 ? 'bloom' : 'light');
    if (!motionEnabled) return;
    pointerGlow.style.left = event.clientX + 'px';
    pointerGlow.style.top = event.clientY + 'px';
    pointerGlow.classList.remove('radiating');
    void pointerGlow.offsetWidth;
    pointerGlow.classList.add('radiating');
  });

  window.addEventListener('resize', measure, { passive: true });
  reducedPreference.addEventListener?.('change', event => {
    if (event.matches) setMotion(false);
  });
  measure();
  applyScene(0, false);
  requestAnimationFrame(frame);
})();
