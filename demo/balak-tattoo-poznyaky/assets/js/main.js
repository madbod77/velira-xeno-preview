/* Balak Tattoo Studio — концепт Velira. Рух — прогресивне покращення: без JS усе видно. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const E = {
    inOut: t => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
    in2: t => t * t,
  };
  const D = Math.PI / 180;

  const stage = document.querySelector('.stage');
  const pin = document.querySelector('.pin');
  const hero = document.querySelector('.hero');
  const portal = document.querySelector('.portal');
  const kEl = document.getElementById('k');
  const word = document.querySelector('.word');
  const canvas = document.querySelector('.ring-gl');

  /* Спільний стан для ring.js: геометрія кільця з гліфа K і поза за прогресом прокрутки. */
  const B = window.__balak = { p: 0, layout: null, listeners: [], reduce, motion: false };

  function measure() {
    const pr = pin.getBoundingClientRect();
    const text = kEl.firstChild;
    const range = document.createRange();
    range.setStart(text, 0); range.setEnd(text, 1);
    const rr = range.getBoundingClientRect();
    const cs = getComputedStyle(word);
    const size = parseFloat(cs.fontSize);
    const font = `${cs.fontWeight} ${size}px Unbounded`;
    const pad = Math.ceil(size * 0.25);
    const gw = Math.ceil(rr.width + pad * 2), gh = Math.ceil(rr.height + pad * 2);
    const scale = 2;
    const g = document.createElement('canvas');
    g.width = gw * scale; g.height = gh * scale;
    const ctx = g.getContext('2d');
    ctx.scale(scale, scale);
    ctx.font = font; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#000';
    const m = ctx.measureText('K');
    const asc = m.fontBoundingBoxAscent || size * .86;
    ctx.fillText('K', pad, pad + asc);
    // рамка чорнила й стовбур літери — з пікселів
    const data = ctx.getImageData(0, 0, g.width, g.height).data;
    const W2 = g.width, H2 = g.height;
    const alpha = (x, y) => data[(y * W2 + x) * 4 + 3];
    let top = -1, bottom = -1;
    for (let y = 0; y < H2 && top < 0; y++) for (let x = 0; x < W2; x += 2) if (alpha(x, y) > 128) { top = y; break; }
    for (let y = H2 - 1; y >= 0 && bottom < 0; y--) for (let x = 0; x < W2; x += 2) if (alpha(x, y) > 128) { bottom = y; break; }
    if (top < 0) return null;
    const inkH = (bottom - top) / scale;
    const rowY = Math.round(top + (bottom - top) * .22);
    let s0 = -1, s1 = -1;
    for (let x = 0; x < W2; x++) { const a = alpha(x, rowY) > 128; if (a && s0 < 0) s0 = x; if (!a && s0 >= 0) { s1 = x; break; } }
    const stemCx = (s0 + s1) / 2 / scale, stemW = (s1 - s0) / scale;
    const gx = rr.left - pad - pr.left, gy = rr.top - pad - pr.top;
    const R = inkH * (pr.width < 600 ? .78 : .55);
    return {
      W: pr.width, H: pr.height, glyph: g, gx, gy, gw, gh,
      px: gx + stemCx, py: gy + top / scale + inkH * .24,
      R, tube: Math.max(2.4, R * .085), stemW, inkH,
    };
  }

  /* Поза кільця за прогресом сцени p ∈ [0,1]. Екранні координати пікселями (y вниз). */
  B.pose = p => {
    const L = B.layout;
    const a = clamp(p / .44), b = E.inOut(clamp((p - .44) / .18)), c = E.in2(clamp((p - .62) / .38));
    const phi0 = 36 * D, phi1 = phi0 + 70 * D * a;
    const phi = phi1 + (Math.PI - phi1) * b;
    const sB = 1 + .6 * b;
    const sEnd = 1.1 * Math.hypot(L.W, L.H) / 2 / (L.R - L.tube);
    const s = sB + (sEnd - sB) * c;
    const tx = L.W / 2, ty = L.H / 2 - L.R * s;
    const px = L.px + (tx - L.px) * b, py = L.py + (ty - L.py) * b;
    const hole = c > 0 ? Math.max(0, (L.R - L.tube) * s - .5) : 0;
    return { px, py, phi, s, a, b, c, hole };
  };

  function relayout() {
    const L = measure();
    if (!L) return;
    B.layout = L;
    hero.style.setProperty('--lamp-x', L.px.toFixed(1) + 'px');
    B.listeners.forEach(f => f('layout'));
    paint();
  }

  function paint() {
    if (!B.layout || !B.motion) return;
    const q = B.pose(B.p);
    portal.style.clipPath = `circle(${q.hole.toFixed(1)}px at 50% 50%)`;
    B.listeners.forEach(f => f('scroll'));
  }

  function loadRing() {
    const go = () => import('./ring.js').then(m => m.start(B)).catch(() => root.classList.add('no-gl'));
    if (document.readyState === 'complete') setTimeout(go, 30);
    else addEventListener('load', () => setTimeout(go, 30), { once: true });
  }

  const fontsReady = (document.fonts && document.fonts.load)
    ? Promise.all([document.fonts.load('800 100px Unbounded'), document.fonts.ready]).catch(() => {})
    : Promise.resolve();

  if (!window.gsap || !window.ScrollTrigger || reduce) {
    fontsReady.then(() => { relayout(); if (!reduce && !window.gsap) root.classList.add('no-gl'); else loadRing(); });
    addEventListener('resize', () => { clearTimeout(B._rt); B._rt = setTimeout(relayout, 150); });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  root.classList.add('motion');
  B.motion = true;

  fontsReady.then(() => {
    relayout();
    loadRing();

    ScrollTrigger.create({
      trigger: stage, start: 'top top', end: 'bottom bottom',
      onUpdate: s => { B.p = s.progress; paint(); },
      onRefresh: s => { B.p = s.progress; relayout(); },
    });

    /* Поле стягується в лінію: червона завіса над «Майстрами» відходить угору й лишає 2-px лінію пігменту. */
    // Поле стягується в лінію: червоний шар секції стискається до її нижньої межі — до 3-px лінії над «Майстрами».
    // Текст секції лишається на місці (на чорному він так само читається); статичний стан — повне поле.
    const field = document.querySelector('.craft-field');
    const craftEl = document.querySelector('.craft');
    const squeeze = p => {
      if (p <= 0) { field.style.clipPath = ''; return; }
      const h = Math.pow(1 - p, 1.4) * innerHeight + 3;
      const top = Math.max(0, craftEl.offsetHeight - h);
      field.style.clipPath = `inset(${top.toFixed(1)}px 0 0 0)`;
    };
    ScrollTrigger.create({
      trigger: '.team', start: 'top bottom', end: 'top 10%',
      onUpdate: s => squeeze(s.progress),
      onLeaveBack: () => squeeze(0),
      onLeave: () => squeeze(1),
    });

    /* Лампа вмикається над адресою: конус світла від верхньої точки → повний прямокутник. */
    const vEl = document.getElementById('visit');
    const cone = p => {
      if (p >= .999) return 'none';
      const p1 = clamp(p / .55), p2 = clamp((p - .55) / .45);
      const y = 100 * E.inOut(p1);
      const topHalf = 2.5 + 47.5 * E.inOut(p2);
      const botHalf = Math.max(topHalf, 2.5 + 47.5 * (y / 100) * 1.4);
      const bh = Math.min(50, botHalf);
      return `polygon(${50 - topHalf}% 0%, ${50 + topHalf}% 0%, ${50 + bh}% ${y}%, ${50 - bh}% ${y}%)`;
    };
    // Статичний стан — без кліпу; конус вмикається лише коли адреса під нижнім краєм екрана.
    ScrollTrigger.create({
      trigger: vEl, start: 'top bottom', end: 'top 45%',
      onUpdate: s => { vEl.style.clipPath = cone(s.progress); vEl.classList.toggle('dim', s.progress < .9); },
      onLeave: () => { vEl.style.clipPath = 'none'; vEl.classList.remove('dim'); },
      onLeaveBack: () => { vEl.classList.remove('dim'); },
      onEnterBack: s => { vEl.style.clipPath = cone(s.progress); },
    });

    /* Проява блоків: стартує, коли блок ще під краєм екрана (схований стан ніхто не бачить, знімок без прокрутки
       бачить усе), один вхід на блок, спадний стагер, один раз. */
    const below = el => el.getBoundingClientRect().top > innerHeight;
    const reveal = (targets, opts = {}) => {
      const els = gsap.utils.toArray(targets);
      if (!els.length || !below(els[0])) return;
      ScrollTrigger.create({
        trigger: els[0], start: 'top bottom+=40', once: true,
        onEnter: () => gsap.fromTo(els, { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1, y: 0, duration: .7, ease: 'power3.out', delay: opts.delay || 0,
          stagger: opts.stagger || 0, clearProps: 'transform,opacity,visibility',
        }),
      });
    };
    reveal('.shot-ink'); reveal('.craft-text:not(.craft-text-2)', { delay: .1 });
    reveal('.craft-text-2'); reveal('.shot-ring', { delay: .12 });
    reveal('.roster .m', { stagger: i => [0, .08, .14][i] || .18 });
    reveal('.wall');

    ScrollTrigger.refresh();
  });

  addEventListener('resize', () => { clearTimeout(B._rt); B._rt = setTimeout(() => ScrollTrigger.refresh(), 150); });
})();
