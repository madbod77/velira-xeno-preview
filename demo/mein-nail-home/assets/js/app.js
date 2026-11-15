/* Mein Nail Home — концепт Velira. Рух: GSAP + ScrollTrigger з диска. Контент видно й без JS. */
(function () {
  'use strict';
  var d = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var f = function (n) { return Math.round(n * 100) / 100; };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  /* ---------- графік: щодня 09:00–21:00, час Києва ---------- */
  function kyivMinutes() {
    try {
      var q = {};
      new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
        .formatToParts(new Date()).forEach(function (x) { q[x.type] = x.value; });
      return (parseInt(q.hour, 10) % 24) * 60 + parseInt(q.minute, 10);
    } catch (e) { return null; }
  }
  var OPEN = 9 * 60, CLOSE = 21 * 60;
  var mins = kyivMinutes();
  var isOpen = mins !== null && mins >= OPEN && mins < CLOSE;
  var nowEl = $('[data-now]');
  if (nowEl && mins !== null) {
    nowEl.textContent = isOpen ? '· зараз відчинено' : '· зараз зачинено';
    nowEl.classList.toggle('is-closed', !isOpen);
    nowEl.hidden = false;
  }
  var st = $('[data-status]');
  if (st && mins !== null) st.textContent = isOpen ? 'Зараз відчинено — до 21:00' : 'Зараз зачинено — відчиняємо о 09:00';

  // добове кільце: 00 угорі, за годинниковою стрілкою
  var HC = 100, HR = 78;
  var hp = function (m) { var a = m / 1440 * Math.PI * 2; return [HC + HR * Math.sin(a), HC - HR * Math.cos(a)]; };
  var arc = $('.hours__arc');
  if (arc) {
    var a0 = hp(OPEN), a1 = hp(15 * 60), a2 = hp(CLOSE);
    arc.setAttribute('d', 'M' + f(a0[0]) + ' ' + f(a0[1]) + ' A' + HR + ' ' + HR + ' 0 0 1 ' + f(a1[0]) + ' ' + f(a1[1]) +
      ' A' + HR + ' ' + HR + ' 0 0 1 ' + f(a2[0]) + ' ' + f(a2[1]));
  }
  var dotNow = $('.hours__now');
  if (dotNow && mins !== null) { var pn = hp(mins); dotNow.setAttribute('cx', f(pn[0])); dotNow.setAttribute('cy', f(pn[1])); dotNow.removeAttribute('hidden'); }

  /* ---------- перемикач прайсу (сегменти iOS) ---------- */
  var seg = $('.seg'), thumb = $('.seg__thumb'), tabs = $$('.seg__btn'), panes = $$('.pane');
  function placeThumb(btn, instant) {
    if (!thumb || !btn) return;
    if (instant) thumb.style.transition = 'none';
    thumb.style.width = btn.offsetWidth + 'px';
    thumb.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
    if (instant) { void thumb.offsetWidth; thumb.style.transition = ''; }
  }
  function selectTab(btn, focus) {
    tabs.forEach(function (b) {
      var on = b === btn;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    var key = btn.getAttribute('data-tab');
    panes.forEach(function (p) {
      var on = p.getAttribute('data-pane') === key;
      p.classList.toggle('is-on', on);
      if (on && window.gsap && d.classList.contains('mx')) gsap.fromTo(p, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .26, ease: 'power2.out', clearProps: 'transform,opacity,visibility' });
    });
    placeThumb(btn);
    var sl = btn.offsetLeft - 8;
    if (seg && (sl < seg.scrollLeft || btn.offsetLeft + btn.offsetWidth > seg.scrollLeft + seg.clientWidth)) seg.scrollTo({ left: sl, behavior: 'smooth' });
    if (focus) btn.focus();
  }
  if (tabs.length) {
    var first = tabs[0];
    tabs.forEach(function (b, i) {
      b.tabIndex = i === 0 ? 0 : -1;
      b.addEventListener('click', function () { selectTab(b); });
      b.addEventListener('keydown', function (e) {
        var k = e.key, n = null;
        if (k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        else if (k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (k === 'Home') n = tabs[0];
        else if (k === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); selectTab(n, true); }
      });
    });
    panes.forEach(function (p) { p.classList.toggle('is-on', p.getAttribute('data-pane') === first.getAttribute('data-tab')); });
    placeThumb(first, true);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { placeThumb($('.seg__btn[aria-selected="true"]'), true); });
    window.addEventListener('resize', function () { placeThumb($('.seg__btn[aria-selected="true"]'), true); });
  }

  /* ---------- шапка й нижня панель ---------- */
  var bar = $('#bar'), dock = $('.dock'), book = $('#zapys'), bookIn = false;
  if ('IntersectionObserver' in window && book) {
    new IntersectionObserver(function (en) { bookIn = en[0].isIntersecting; onScroll(); }, { threshold: 0.05 }).observe(book);
  }
  function onScroll() {
    var y = window.scrollY || 0;
    if (bar) bar.classList.toggle('is-solid', y > 8);
    var storyEl = document.querySelector('.story');
    var past = storyEl ? y > storyEl.offsetTop + storyEl.offsetHeight - window.innerHeight * 0.9 : y > window.innerHeight;
    var on = past && !bookIn;
    if (dock) dock.classList.toggle('is-on', on);
    document.body.classList.toggle('dock-on', on);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!d.classList.contains('mx') || !window.gsap || !window.ScrollTrigger) { d.classList.remove('mx'); return; }

  /* ================= РУХ ================= */
  gsap.registerPlugin(ScrollTrigger);

  // «в'язка» крива лаку cubic-bezier(.65,0,.15,1)
  function bezier(x1, y1, x2, y2) {
    var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    function sx(t) { return ((ax * t + bx) * t + cx) * t; }
    function sy(t) { return ((ay * t + by) * t + cy) * t; }
    function dx(t) { return (3 * ax * t + 2 * bx) * t + cx; }
    return function (x) {
      var t = x, i, v, dv;
      for (i = 0; i < 8; i++) { v = sx(t) - x; dv = dx(t); if (Math.abs(v) < 1e-5 || !dv) break; t -= v / dv; }
      return sy(clamp(t, 0, 1));
    };
  }
  var viscous = bezier(.65, 0, .15, 1);
  var entrance = bezier(.2, .7, .2, 1);
  // GSAP округлює px у stroke-dashoffset — для pathLength=1 ведемо значення через проксі
  function dashTween(els, from, to, vars) {
    els = [].concat(els);
    var o = { v: from };
    els.forEach(function (el) { el.style.strokeDashoffset = from; });
    return gsap.to(o, Object.assign({ v: to, onUpdate: function () { els.forEach(function (el) { el.style.strokeDashoffset = o.v; }); } }, vars));
  }

  /* --- геометрія кілець → стрічок --- */
  var TAU = Math.PI * 2, X0 = 24, W = 208, LBL = 14, TCK = 13;
  // телефон: шкала в межах циферблата; ПК ≥ 900 px: стрічки виходять за коло (overflow: visible) — шкала 0–180 хв ≈ 680 px
  function setGeo(desk) {
    X0 = desk ? -45 : 24; W = desk ? 300 : 208; LBL = desk ? 10 : 14; TCK = desk ? 9 : 13;
    var lab = $$('.labels text'), tk = $$('.ticks text'), fin = $('.finish');
    lab.forEach(function (n) { n.setAttribute('x', X0); n.style.fontSize = LBL + 'px'; });
    [0, 0.5, 1, 1.5].forEach(function (k, i) { if (tk[i]) { tk[i].setAttribute('x', f(X0 + W * k)); tk[i].style.fontSize = TCK + 'px'; } });
    if (fin) { fin.setAttribute('x1', X0 + W); fin.setAttribute('x2', X0 + W); }
    lastE = -1;
  }

  var rings = [
    { R: 158, row: 110, el: $('#ring-a'), sheen: $('#sheen-a'), gloss: $('#gloss-a') },
    { R: 128, row: 162, el: $('#ring-b'), sheen: $('#sheen-b'), gloss: $('#gloss-b') }
  ];
  // дуга сталої кривини від точки (sx, sy), дотична вправо, за годинниковою стрілкою
  function ribbon(sx, sy, L, th) {
    if (th < 0.002) return 'M' + f(sx) + ' ' + f(sy) + ' L' + f(sx + L) + ' ' + f(sy);
    var r = L / th, cx = sx, cy = sy + r;
    var mx = cx + r * Math.sin(th / 2), my = cy - r * Math.cos(th / 2);
    var ex = cx + r * Math.sin(th), ey = cy - r * Math.cos(th);
    return 'M' + f(sx) + ' ' + f(sy) + ' A' + f(r) + ' ' + f(r) + ' 0 0 1 ' + f(mx) + ' ' + f(my) +
      ' A' + f(r) + ' ' + f(r) + ' 0 0 1 ' + f(ex) + ' ' + f(ey);
  }
  var clock = $('#clock'), cap = $('.clock-cap'), ghost = $('.ghost'), labels = $('.labels'), ticks = $('.ticks'), tracks = $('.tracks');
  var lastE = -1;
  function render(e) {
    if (Math.abs(e - lastE) < 1e-4) return;
    lastE = e;
    rings.forEach(function (g) {
      var th = TAU * (1 - e) * 0.99999;
      var rho = g.R * (1 - e) + (e > 0 ? e * W / Math.max(TAU * (1 - e), 1e-6) : 0);
      var L = e >= 1 ? W : rho * th;
      var m = entrance(clamp(e * 1.1, 0, 1));
      var sy = lerp(180 - g.R, g.row, m);
      // горизонтальний центр фігури їде від центру циферблата до центру стрічки — без перекосу посередині
      var r = th < 0.002 ? 0 : L / th, mnx = 0, mxx = 0, k, a, x;
      if (th < 0.002) { mxx = L; } else {
        for (k = 0; k <= 24; k++) { a = th * k / 24; x = r * Math.sin(a); if (x < mnx) mnx = x; if (x > mxx) mxx = x; }
      }
      var target = lerp(180, X0 + W / 2, m);
      var sx = target - (mnx + mxx) / 2;
      var dd = ribbon(sx, sy, L, th);
      g.el.setAttribute('d', dd); g.sheen.setAttribute('d', dd); g.gloss.setAttribute('d', dd);
    });
    var c = entrance(clamp((e - 0.22) / 0.62, 0, 1));
    clock.setAttribute('transform', 'translate(' + f(lerp(180, X0 + W, c)) + ' ' + f(lerp(196, 62, c)) + ') scale(' + f(lerp(1, (W > 250 ? 20 : 24) / 76, c)) + ')');
    cap.style.opacity = f(1 - clamp(e / 0.12, 0, 1));
    tracks.style.opacity = f(1 - clamp(e / 0.2, 0, 1));
    var gk = clamp((e - 0.62) / 0.38, 0, 1);
    ghost.setAttribute('d', 'M' + X0 + ' 228 L' + f(X0 + 1.5 * W * Math.max(gk, 0.001)) + ' 228');
    ghost.style.opacity = gk > 0 ? 1 : 0;
    var lk = clamp((e - 0.8) / 0.2, 0, 1);
    labels.style.opacity = f(lk); ticks.style.opacity = f(lk);
  }

  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    var desktop = window.matchMedia('(min-width: 900px)').matches;
    setGeo(desktop);

    /* --- фірмовий момент: завантаження --- */
    var bg = $('.stage__bg img');
    var clockState = { m: 0 };
    var drawEase = viscous;
    var intro = gsap.timeline({ defaults: { ease: drawEase } });
    intro
      .fromTo(bg, { filter: 'blur(14px)', scale: 1.08 }, { filter: 'blur(0px)', scale: 1, duration: 1.4, ease: entrance }, 0)
      .add(dashTween(rings.map(function (g) { return g.el; }), 1, 0, { duration: 1.8, ease: drawEase }), 0.15)
      .fromTo(clock, { opacity: 0.001 }, { opacity: 1, duration: 0.3, ease: 'none' }, 0.15)
      .to(clockState, {
        m: 120, duration: 1.8, onUpdate: function () {
          var m = Math.round(clockState.m);
          clock.textContent = Math.floor(m / 60) + ':' + ('0' + (m % 60)).slice(-2);
        }
      }, 0.15)
      .set(rings.map(function (g) { return g.gloss; }), { opacity: 1, strokeDasharray: '0.07 1' }, 1.95)
      .add(dashTween(rings.map(function (g) { return g.gloss; }), 0.07, -1, { duration: 0.9, ease: 'power2.inOut' }), 1.95)
      .to(rings.map(function (g) { return g.sheen; }), { opacity: 1, duration: 0.5, ease: 'none' }, 2.2)
      .set(rings.map(function (g) { return g.gloss; }), { opacity: 0 }, 2.86);

    /* --- прокрутка: кільця розгортаються в стрічки часу --- */
    var proxy = { e: 0 };
    var fadeHero = desktop ? [$('.h1a'), $('.h1b'), $('.hero__meta'), $('.legend')] : [$('.h1'), $('.hero__meta'), $('.legend')];
    var story = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.story', start: 'top top', end: 'bottom bottom', scrub: 0.5,
        onUpdate: function (self) { if (self.progress > 0.005 && intro.progress() < 1) intro.progress(1); }
      }
    });
    story
      .to(proxy, { e: 1, duration: 0.62, ease: 'power1.inOut', onUpdate: function () { render(proxy.e); } }, 0)
      .to(fadeHero, { autoAlpha: 0, y: -22, duration: 0.18 }, 0)
      .fromTo('.four__a', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.2)
      .fromTo('.four__b', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.32)
      .to({}, { duration: 0.38 }, 0.62);
    if (desktop) {
      story.to('.h1a', { x: -40, duration: 0.18 }, 0).to('.h1b', { x: 40, duration: 0.18 }, 0);
      // заголовок «4 руки» — над стрічками, цитата й кнопка — під ними: кінцевий кадр читається як одна велика шкала часу
      var stageEl = $('.stage'), dialD = $('.dial'), fourD = $('.four');
      var placeFour = function () {
        var s = stageEl.getBoundingClientRect(), dr = dialD.getBoundingClientRect();
        var u = dr.height / 360;
        var top0 = dr.top - s.top - (gsap.getProperty(dialD, 'y') || 0) + DROP;
        fourD.style.setProperty('--a-bot', Math.round(top0 + 30 * u) + 'px');
        fourD.style.setProperty('--b-top', Math.round(top0 + 300 * u) + 'px');
      };
      var DROP = Math.round(Math.min(72, Math.max(0, window.innerHeight * 0.08)));
      story.to(dialD, { y: DROP, duration: 0.5, ease: 'power1.inOut' }, 0.12);
      placeFour();
      ScrollTrigger.addEventListener('refreshInit', placeFour);
    } else {
      // телефон: стрічки сідають ближче до тексту «4 руки»
      var dialEl = $('.dial'), fourEl = $('.four');
      var gap = function () {
        var dr = dialEl.getBoundingClientRect(), fr = fourEl.getBoundingClientRect();
        var dTop = dr.top - (gsap.getProperty(dialEl, 'y') || 0), fTop = fr.top - (gsap.getProperty(fourEl, 'y') || 0);
        return Math.max(0, Math.round((fTop - 26 - (dTop + dr.height * (292 / 360))) * 0.5));
      };
      story.to(dialEl, { y: function () { return gap(); }, duration: 0.5, ease: 'power1.inOut' }, 0.12);
      story.to(fourEl, { y: function () { return -gap(); }, duration: 0.5, ease: 'power1.inOut' }, 0.12);
      story.invalidate();
    }

    var lower = function () {
    /* --- дуги-межі секцій (френч) --- */
    $$('.smile').forEach(function (svg) {
      var fill = $('.smile__fill', svg), edge = $('.smile__edge', svg), sm = { k: 1 };
      // дуга на початку секції (перша) або в кінці попередньої (--end): тригер — секція, що приходить
      var sec = svg.classList.contains('smile--end') ? svg.parentNode.nextElementSibling : svg.parentNode;
      var draw = function () {
        var cy = f(120 - 120 * sm.k);
        fill.setAttribute('d', 'M0 120 Q500 ' + cy + ' 1000 120 Z');
        edge.setAttribute('d', 'M0 120 Q500 ' + cy + ' 1000 120');
        if (shine) shine.setAttribute('d', edge.getAttribute('d'));
      };
      var shine = $('.smile__shine', svg);
      gsap.to(sm, { k: 0, ease: 'none', onUpdate: draw, scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 30%', scrub: 0.4 } });
      if (shine) {
        // лаковий відблиск пробігає краєм один раз, як «топ» на кільцях
        shine.style.strokeDasharray = '0.12 1';
        ScrollTrigger.create({ trigger: sec, start: 'top 60%', once: true, onEnter: function () {
          gsap.set(shine, { opacity: 1 });
          dashTween(shine, 0.12, -1, { duration: 0.9, ease: 'power2.inOut', onComplete: function () { gsap.set(shine, { opacity: 0 }); } });
        } });
      }
    });

    /* --- проява блоків --- */
    function reveal(targets, opts) {
      $$(targets).forEach(function (el) {
        gsap.fromTo(el, { autoAlpha: 0, y: 18 }, Object.assign({
          autoAlpha: 1, y: 0, duration: 0.7, ease: entrance, clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true }
        }, opts || {}));
      });
    }
    function group(sel, items) {
      $$(sel).forEach(function (box) {
        var els = $$(items, box).slice(0, 6);
        gsap.fromTo(els, { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1, y: 0, duration: 0.7, ease: entrance, stagger: 0.08, clearProps: 'transform',
          scrollTrigger: { trigger: box, start: 'top 80%', once: true }
        });
      });
    }
    group('.price .sec-head', ':scope > *');
    reveal('.price__box'); reveal('.price__cta');
    group('.french__copy', ':scope > .kicker, :scope > h2, :scope > .french__lead');
    gsap.fromTo('.french__fig img', { filter: 'blur(10px)', scale: 1.04 }, {
      filter: 'blur(0px)', scale: 1, duration: 1.1, ease: entrance,
      scrollTrigger: { trigger: '.french__fig', start: 'top 82%', once: true }
    });
    gsap.from('.fan i', {
      rotation: 0, duration: 1.1, ease: viscous, stagger: { each: 0.035, from: 'center' },
      scrollTrigger: { trigger: '.fan', start: 'top 88%', once: true }
    });
    group('.works', '.works__slot');
    group('.care', '.care__h, .care__list > div');
    group('.find .sec-head', ':scope > *');
    group('.find__grid', '.card');
    var hoursArc = $('.hours__arc');
    hoursArc.style.strokeDasharray = '1 1';
    dashTween(hoursArc, 1, 0, { duration: 1.1, ease: viscous, scrollTrigger: { trigger: '.hours', start: 'top 80%', once: true } });
    if (dotNow && !dotNow.hasAttribute('hidden')) {
      gsap.fromTo(dotNow, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.45, ease: 'back.out(2)', delay: 0.9, scrollTrigger: { trigger: '.hours', start: 'top 80%', once: true } });
    }
    group('.book', 'h2, .way, .home');
    ScrollTrigger.refresh();
    };
    if ('requestIdleCallback' in window) requestIdleCallback(lower, { timeout: 200 }); else setTimeout(lower, 60);
    return function () { intro.kill(); };
  });
})();
