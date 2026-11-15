/* Майстерня кави — концепт Velira. Без трекерів, без зовнішніх запитів. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;

  /* ---------- живий статус за графіком з біо: щодня 8:00–21:00 (Київ) ---------- */
  function kyivMinutes() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      var h = 0, m = 0;
      parts.forEach(function (p) { if (p.type === 'hour') h = +p.value % 24; if (p.type === 'minute') m = +p.value; });
      return h * 60 + m;
    } catch (e) { var d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
  }
  function paintStatus() {
    var now = kyivMinutes(), open = now >= 8 * 60 && now < 21 * 60;
    var text = open ? 'Зараз відчинено · до 21:00' : (now < 8 * 60 ? 'Зараз зачинено · відкриємося о 8:00' : 'Зараз зачинено · завтра з 8:00');
    ['status', 'status2'].forEach(function (id) {
      var el = doc.getElementById(id); if (!el) return;
      el.classList.toggle('is-open', open); el.classList.toggle('is-closed', !open);
      var t = el.querySelector('.status__text');
      if (t) t.textContent = id === 'status2' ? (open ? 'відчинено · до 21:00' : 'зачинено · з 8:00') : text;
    });
  }
  paintStatus(); setInterval(paintStatus, 60000);

  /* ---------- шапка: тло після першого екрана ---------- */
  var bar = doc.getElementById('bar');
  function onScroll() { if (bar) bar.classList.toggle('is-solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- записка про торт ---------- */
  var note = doc.getElementById('note'), preview = doc.getElementById('notePreview'), hint = doc.getElementById('noteHint');
  function message() {
    var f = new FormData(note), cake = f.get('cake') || 'торт капучіно-чіз', date = f.get('date'), guests = f.get('guests');
    var s = 'Добрий день! Хочу запитати про ' + cake;
    date = String(date || '').trim().slice(0, 10); if (date) s += ' на ' + date;
    if (guests && +guests > 0) s += ', гостей — ' + (+guests);
    return s + '. Чи можна замовити?';
  }
  if (note && preview) {
    note.addEventListener('input', function () { preview.textContent = message(); });
    note.addEventListener('change', function () { preview.textContent = message(); });
    note.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = message(), url = 'https://ig.me/m/maysternya_kavy_kyiv';
      var done = function () { if (hint) hint.textContent = 'Текст скопійовано — вставте його в Direct.'; };
      try { if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {}); } catch (err) {}
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------- кнопка ліфта «1» засвічується ---------- */
  var lift = doc.getElementById('lift');
  if (lift && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es, io) {
      es.forEach(function (e) { if (e.isIntersecting) { lift.classList.add('is-lit'); io.disconnect(); } });
    }, { rootMargin: '0px 0px -25% 0px' }).observe(lift);
  } else if (lift) { lift.classList.add('is-lit'); }

  /* ---------- рух ---------- */
  if (!window.gsap || !window.ScrollTrigger || !root.classList.contains('js-motion')) { root.classList.remove('js-motion'); return; }
  var gsap = window.gsap, ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);

  var K = 0.5523;
  function n(v) { return Math.round(v * 10) / 10; }
  function ell(a) {
    var cx = a[0], cy = a[1], rx = a[2], ry = a[3], dip = a[4] || 0, pull = a[5] || 0, sh = a[6] || 0;
    var by = cy + ry + pull - 0.3 * ry * sh, bx = K * rx * (1 - 0.8 * sh);
    return 'M ' + n(cx) + ' ' + n(cy - ry + dip) +
      ' C ' + n(cx + K * rx) + ' ' + n(cy - ry) + ' ' + n(cx + rx) + ' ' + n(cy - K * ry) + ' ' + n(cx + rx) + ' ' + n(cy) +
      ' C ' + n(cx + rx) + ' ' + n(cy + K * ry) + ' ' + n(cx + bx) + ' ' + n(by) + ' ' + n(cx) + ' ' + n(cy + ry + pull) +
      ' C ' + n(cx - bx) + ' ' + n(by) + ' ' + n(cx - rx) + ' ' + n(cy + K * ry) + ' ' + n(cx - rx) + ' ' + n(cy) +
      ' C ' + n(cx - rx) + ' ' + n(cy - K * ry) + ' ' + n(cx - K * rx) + ' ' + n(cy - ry) + ' ' + n(cx) + ' ' + n(cy - ry + dip) + ' Z';
  }

  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    var q = function (id) { return doc.getElementById(id); };

    /* === фірмовий момент 1: молоко наливає тюльпан === */
    var milk = q('milk'), P = 790, small = [606, P, 6, 5];
    var FIN = {
      w1: [606, 540, 190, 150, 34, 20, .9], c1: [606, 598, 176, 142, 16, 20, .9],
      w2: [606, 594, 160, 124, 26, 16, .9], c2: [606, 646, 148, 116, 12, 16, .9],
      w3: [606, 642, 132, 98, 20, 14, .9],  c3: [606, 690, 120, 90, 10, 14, .9],
      w4: [606, 700, 100, 76, 20, 18, .9]
    };
    var round = function (a) { return [a[0], a[1], a[2], a[3], 0, 0, 0]; };
    var el = {}; Object.keys(FIN).forEach(function (k) { el[k] = q(k); gsap.set(el[k], { attr: { d: ell(small) } }); });
    var tint = { c1: q('t1'), c2: q('t2'), c3: q('t3') };
    Object.keys(tint).forEach(function (k) { gsap.set(tint[k], { attr: { d: ell(small) } }); });
    var stem = q('stem'), pour = q('pour'), stream = q('stream'), r1 = q('ripple1'), r2 = q('ripple2');
    gsap.set(stem, { attr: { 'stroke-dasharray': 434, 'stroke-dashoffset': 434 } });
    milk.style.visibility = 'visible';

    var tl = gsap.timeline({ delay: 0.25, defaults: { ease: 'power3.out', duration: 0.6 } });
    var to = function (k, a, t, d, ease) {
      var v = { attr: { d: ell(a) }, duration: d || 0.6 }; if (ease) v.ease = ease;
      tl.to(el[k], v, t); if (tint[k]) tl.to(tint[k], { attr: { d: ell(a) }, duration: d || 0.6, ease: ease || 'power3.out' }, t);
    };
    tl.to(pour, { opacity: 1, duration: 0.18, ease: 'none' }, 0)
      .fromTo([r1, r2], { attr: { r: 10 }, opacity: 0.9 }, { attr: { r: 58 }, opacity: 0, duration: 0.9, stagger: 0.3, ease: 'power2.out' }, 0.05);
    to('w1', [606, 700, 122, 92], 0.1);
    to('w1', [606, 622, 162, 126], 0.6); to('c1', [606, 690, 140, 108], 0.6); to('w2', [606, 692, 120, 90], 0.6);
    to('w1', [606, 566, 184, 144], 1.05); to('c1', [606, 630, 166, 132], 1.05); to('w2', [606, 630, 148, 112], 1.05);
    to('c2', [606, 700, 118, 92], 1.05); to('w3', [606, 702, 104, 80], 1.05);
    ['w1', 'c1', 'w2', 'c2', 'w3'].forEach(function (k) { to(k, round(FIN[k]), 1.45); });
    to('c3', round(FIN.c3), 1.45); to('w4', round(FIN.w4), 1.45);
    /* протяжка знизу догори: ніжка й серця */
    tl.to(stem, { attr: { 'stroke-dashoffset': 0 }, duration: 0.5, ease: 'power2.inOut' }, 1.95)
      .to(stream, { attr: { cy: 384 }, duration: 0.5, ease: 'power2.inOut' }, 1.95)
      .to(pour, { opacity: 0, duration: 0.3, ease: 'none' }, 2.35)
      .set([r1, r2, stream, pour], { opacity: 0 }, 2.4);
    [['w4', 'c3'], ['w3', 'c2'], ['w2', 'c1'], ['w1']].forEach(function (g, i) {
      g.forEach(function (k) { to(k, FIN[k], 1.98 + i * 0.1, 0.38, 'power2.out'); });
    });

    /* === фірмовий момент 2: пірнання в чашку (T03) === */
    var cup = q('cup'), intro = q('vitIntro'), introIn = intro.querySelector('.vit-intro__in'),
        heroText = doc.querySelector('.hero__text'), stage = doc.querySelector('.dive__stage');
    var stampEl = heroText.querySelector('.stamp');
    var tooTall = stampEl && stampEl.getBoundingClientRect().bottom > window.innerHeight - 4;
    if (tooTall) root.classList.add('no-dive');
    var geo = { x: 0, y: 0, max: 1 };
    function measure() {
      var c = cup.getBoundingClientRect(), s = stage.getBoundingClientRect();
      // центр крема в зображенні: 48.3 % / 48.1 % (виміряно на кадрі)
      geo.x = c.left - s.left + c.width * 0.483; geo.y = c.top - s.top + c.height * 0.481;
      var w = s.width, h = s.height;
      geo.max = Math.max(Math.hypot(geo.x, geo.y), Math.hypot(w - geo.x, geo.y), Math.hypot(geo.x, h - geo.y), Math.hypot(w - geo.x, h - geo.y)) + 4;
    }
    measure();
    var rimC = q('rimC'), circ = { r: 0 };
    function paint() { intro.style.setProperty('--cx', n(geo.x) + 'px'); intro.style.setProperty('--cy', n(geo.y) + 'px'); intro.style.clipPath = 'circle(' + n(circ.r * geo.max) + 'px at ' + n(geo.x) + 'px ' + n(geo.y) + 'px)';
      rimC.setAttribute('cx', n(geo.x)); rimC.setAttribute('cy', n(geo.y)); rimC.setAttribute('r', n(circ.r * geo.max));
      rimC.style.opacity = circ.r > 0.002 && circ.r < 0.985 ? (window.innerWidth < 761 ? 0.85 : 0.6) : 0; }
    if (!tooTall) paint(); else intro.style.clipPath = '';
    if (!tooTall) gsap.set(introIn, { autoAlpha: 0, y: 30 });
    var dive = tooTall ? gsap.timeline({ paused: true }) : gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
      trigger: '#dive', start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true, onRefresh: function () { measure(); paint(); }
    } });
    var a0 = window.innerWidth < 761 ? 0.22 : 0.34, span = 0.86 - a0;
    dive.to(cup, { rotation: -14, duration: a0, ease: 'power1.inOut' }, 0)
        .to(heroText, { autoAlpha: 0, y: -24, duration: 0.14, ease: 'power1.in' }, a0)
        .to(cup, { scale: 1.16, duration: span, ease: 'power2.inOut' }, a0)
        .to(circ, { r: 1, duration: span, ease: 'power2.inOut', onUpdate: paint }, a0)
        .to(introIn, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.66)
        .to({}, { duration: 0.06 }, 0.94);

    /* === полиці: скло, малюнки, цінники === */
    var drawCSS = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline: view()'));
    if (drawCSS) root.classList.add('draw-css');
    doc.querySelectorAll('.shelf__row').forEach(function (row) {
      var items = row.querySelectorAll('.item');
      var paths = row.querySelectorAll('.art:not(.art--cake) path');
      var tags = row.querySelectorAll('.tag');
      var t = gsap.timeline({ paused: true });
      if (!drawCSS) {
        gsap.set(items, { '--glass': 0 });
        gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
        t.to(items, { '--glass': 1, duration: 0.7, ease: 'power2.inOut', stagger: 0.12 }, 0)
         .to(paths, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out', stagger: { each: 0.05, from: 'start' } }, 0.06);
      }
      t.fromTo(tags, { rotation: -9 }, { rotation: 0, duration: 1.1, ease: 'elastic.out(1, 0.4)', immediateRender: false, stagger: function (i) { return [0, 0.07, 0.19, 0.26][i] || i * 0.08; } }, 0.16);
      ST.create({ trigger: row, start: 'top 82%', once: true, onEnter: function () { t.play(); } });
    });

    /* === перехід: торт знімають з полиці (T02) === */
    var big = q('cakeBig'), slot = q('cakeSlot'), d = { x: 0, y: 0, s: 1 };
    function flip() {
      gsap.set(big, { clearProps: 'transform' });
      var a = slot.getBoundingClientRect(), b = big.getBoundingClientRect();
      d.x = a.left - b.left; d.y = a.top - b.top; d.s = a.width / b.width;
    }
    ST.addEventListener('refreshInit', flip); flip();
    var ghost = q('cakeSrc');
    var fly = gsap.timeline({ scrollTrigger: { trigger: '#tort', start: 'top 92%', end: 'top 12%', scrub: 0.5, invalidateOnRefresh: true,
      onUpdate: function (s) { ghost.style.opacity = s.progress > 0.01 ? '0' : ''; } } });
    fly.fromTo(big, { x: function () { return d.x; }, y: function () { return d.y; }, scale: function () { return d.s; }, transformOrigin: '0 0' },
        { y: function () { return d.y - 46; }, duration: 0.16, ease: 'power2.out' })
       .to(big, { x: 0, y: 0, scale: 1, duration: 0.84, ease: 'power1.inOut' });
    gsap.fromTo(big, { stroke: '#f6f2ec' }, { stroke: '#1c120c', ease: 'none', scrollTrigger: { trigger: '#tort', start: 'top 80%', end: 'top 45%', scrub: 0.5 } });

    /* === перехід: кава піднімається меніском (T06) === */
    gsap.fromTo('.find__lip', { clipPath: 'ellipse(75% 100% at 50% 0%)' }, { clipPath: 'ellipse(75% 0% at 50% 0%)', ease: 'none',
      scrollTrigger: { trigger: '#de', start: 'top 85%', end: 'top 25%', scrub: 0.4 } });

    return function () { milk.style.visibility = ''; intro.style.clipPath = ''; };
  });

  window.addEventListener('load', function () { ST.refresh(); });
})();
