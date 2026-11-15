/* BALANCE — концепт Velira. Рух за motion.md: одна фізика — пружина рівноваги; текст стоїть, рухається світ. */
(function () {
  'use strict';
  window.__balance = true;
  var d = document, h = d.documentElement;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var clamp = function (a, b, v) { return Math.max(a, Math.min(b, v)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktop = window.matchMedia('(min-width: 1024px)');
  var weak = (navigator.hardwareConcurrency || 8) <= 4;

  /* Пружина рівноваги: ζ .55, ω 8.1 рад/с, T .9 с, нормалізована до 1 у кінці (motion.md §2). */
  function spring(z, w, T) {
    var wd = w * Math.sqrt(1 - z * z), k = z / Math.sqrt(1 - z * z);
    var x = function (t) { return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + k * Math.sin(wd * t)); };
    var n = x(T);
    return function (p) { return p >= 1 ? 1 : p <= 0 ? 0 : x(p * T) / n; };
  }
  /* cubic-bezier як функція ease для GSAP (CustomEase не тягнемо) */
  function bezier(x1, y1, x2, y2) {
    var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    var sx = function (t) { return ((ax * t + bx) * t + cx) * t; }, sy = function (t) { return ((ay * t + by) * t + cy) * t; };
    var dx = function (t) { return (3 * ax * t + 2 * bx) * t + cx; };
    return function (p) {
      if (p <= 0) return 0; if (p >= 1) return 1;
      var t = p;
      for (var i = 0; i < 8; i++) { var e = sx(t) - p, de = dx(t); if (Math.abs(e) < 1e-5 || !de) break; t -= e / de; }
      t = clamp(0, 1, t);
      return sy(t);
    };
  }
  var EQ = spring(.55, 8.1, .9);
  var E_STATE = bezier(.4, 0, .6, 1), E_OUT = bezier(.2, .7, .2, 1), E_SHEET = bezier(.22, 1, .36, 1);

  /* ── панель дій: на ПК з'являється після першого екрана; ховається, коли поруч ті самі дії; темнішає над світлим ── */
  var dock = $('.dock'), sentinel = $('.dock-sentinel');
  if (dock && 'IntersectionObserver' in window) {
    if (sentinel) new IntersectionObserver(function (es) {
      es.forEach(function (e) { dock.classList.toggle('is-on', !e.isIntersecting && e.boundingClientRect.top < 0); });
    }).observe(sentinel);
    var acts = desktop.matches ? $('.where-main') : $('.where-acts');
    if (acts) new IntersectionObserver(function (es) {
      es.forEach(function (e) { dock.classList.toggle('is-hide', e.isIntersecting); });
    }, { rootMargin: '0px 0px -8% 0px' }).observe(acts);
    var light = {};
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { light[e.target.id] = e.isIntersecting; });
      dock.classList.toggle('on-light', !!(light.services || light.where));
      dock.classList.toggle('on-or', !!light.where);
    }, { rootMargin: '-90% 0px 0px 0px' }).observe($('#services'));
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { light[e.target.id] = e.isIntersecting; });
      dock.classList.toggle('on-light', !!(light.services || light.where));
      dock.classList.toggle('on-or', !!light.where);
    }, { rootMargin: '-90% 0px 0px 0px' }).observe($('#where'));
  }

  /* ── аркуш адреси ── */
  var wrap = $('#addr'), sheet = wrap && $('.sheet', wrap), scrim = wrap && $('.sheet-scrim', wrap);
  var opener = $('[data-sheet="addr"]'), mainEl = $('main'), foot = $('footer');
  var isOpen = false;
  var G = function () { return window.gsap; };
  function tween(el, from, to) {
    if (G()) return G().fromTo(el, from, to);
    Object.keys(to).forEach(function (k) { if (k === 'opacity') el.style.opacity = to[k]; });
    if ('yPercent' in to) el.style.transform = 'translateY(' + to.yPercent + '%)';
    to.onComplete && to.onComplete();
  }
  function openSheet() {
    if (isOpen) return;
    isOpen = true;
    wrap.hidden = false;
    [mainEl, foot, dock].forEach(function (e) { e.inert = true; });
    dock.classList.add('is-under');
    var r = reduce.matches;
    tween(sheet, { yPercent: 100, y: 0 }, { yPercent: 0, y: 0, duration: r ? 0 : .32, ease: E_SHEET, overwrite: true });
    tween(scrim, { opacity: 0 }, { opacity: 1, duration: r ? .12 : .24, ease: E_STATE, overwrite: true });
    $('#addr-h').focus({ preventScroll: true });
  }
  function closeSheet() {
    if (!isOpen) return;
    isOpen = false;
    [mainEl, foot, dock].forEach(function (e) { e.inert = false; });
    dock.classList.remove('is-under');
    var r = reduce.matches;
    if (G()) {
      G().to(sheet, { yPercent: 100, duration: r ? 0 : .24, ease: E_STATE, overwrite: true });
      G().to(scrim, { opacity: 0, duration: r ? .12 : .24, ease: E_STATE, overwrite: true, onComplete: function () { if (!isOpen) wrap.hidden = true; } });
    } else wrap.hidden = true;
    opener.focus({ preventScroll: true });
  }
  if (opener && wrap) {
    opener.setAttribute('role', 'button');
    opener.setAttribute('aria-haspopup', 'dialog');
    opener.setAttribute('aria-controls', 'addr');
    opener.addEventListener('click', function (e) { e.preventDefault(); openSheet(); });
    opener.addEventListener('keydown', function (e) { if (e.key === ' ') { e.preventDefault(); openSheet(); } });
    $$('[data-close]', wrap).forEach(function (b) { b.addEventListener('click', closeSheet); });
    d.addEventListener('keydown', function (e) { if (isOpen && e.key === 'Escape') closeSheet(); });
    /* свайп униз: аркуш іде за пальцем 1:1; закривається за швидкістю > .5 px/мс або > 30 % висоти */
    var drag = $('.sheet-drag', wrap), y0 = 0, dy = 0, hist = [], dragging = false;
    drag.addEventListener('pointerdown', function (e) {
      if (dragging || e.target.closest('button')) return;
      dragging = true; y0 = e.clientY; dy = 0; hist = [[e.timeStamp, 0]];
      drag.setPointerCapture(e.pointerId);
    });
    drag.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      dy = e.clientY - y0;
      var y = dy > 0 ? dy : -Math.pow(-dy, .7);         // вгору — опір, не жорстка стіна
      sheet.style.transform = 'translate(0px,' + y + 'px)';
      hist.push([e.timeStamp, dy]); if (hist.length > 6) hist.shift();
    });
    var end = function () {
      if (!dragging) return;
      dragging = false;
      var a = hist[0], b = hist[hist.length - 1], v = (b[1] - a[1]) / Math.max(1, b[0] - a[0]);
      if (dy > sheet.offsetHeight * .3 || v > .5) {
        if (G()) G().set(sheet, { y: Math.max(0, dy), yPercent: 0 });
        closeSheet();
      } else if (G()) {
        G().fromTo(sheet, { y: Math.max(dy, -40), yPercent: 0 }, { y: 0, duration: reduce.matches ? 0 : .42, ease: EQ, overwrite: true });
      } else sheet.style.transform = '';
    };
    drag.addEventListener('pointerup', end);
    drag.addEventListener('pointercancel', end);
  }

  /* ───────────────────────── рух ───────────────────────── */
  var gsap = window.gsap, ST = window.ScrollTrigger;
  if (!gsap || !ST) { h.classList.remove('js-motion'); return; }
  gsap.registerPlugin(ST);

  /* Рівень робіт: помаранчева бульбашка в скляній трубці стає навпроти рядка на лінії читання (працює і в reduced motion — без пружини). */
  (function level() {
    var rows = $$('.svc-i'), bub = $('.lvl-bub'), tube = $('.lvl-tube');
    if (!rows.length || !bub) return;
    var cur = 0, hover = -1;
    function place(i, instant) {
      var r = rows[i], bh = Math.min(48, r.offsetHeight - 16);
      var y = r.offsetTop + (r.offsetHeight - bh) / 2;
      var dur = instant || reduce.matches ? 0 : .6;
      gsap.to(bub, { y: y, height: bh, duration: dur, ease: EQ, overwrite: true });
    }
    function show(i, instant) {
      rows.forEach(function (r, k) { r.classList.toggle('is-on', k === i); });
      place(i, instant);
    }
    function setRow(i) { cur = i; if (hover < 0) show(i); }
    rows.forEach(function (r, i) {
      ST.create({ trigger: r, start: 'top 62%', end: 'bottom 62%', onToggle: function (self) { if (self.isActive) setRow(i); } });
      if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
        r.addEventListener('mouseenter', function () { hover = i; show(i); });
        r.addEventListener('mouseleave', function () { hover = -1; show(cur); });
      }
    });
    show(0, true);
    ST.addEventListener('refresh', function () { place(hover >= 0 ? hover : cur, true); });
  })();

  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    h.classList.add('js-motion');
    var off = [];
    intro(); worldAndStory(); handoffs(); reveals();
    var b = bubble(); if (b) off.push(b);
    return function () { off.forEach(function (f) { f(); }); h.classList.remove('js-motion'); };
  });
  mm.add('(prefers-reduced-motion: reduce)', function () { h.classList.remove('js-motion'); ST.refresh(); });

  /* 1. Фірмовий момент «Стає врівень» — балка BAL+NCE з нахилу (--tilt: 3,6° телефон … 2,4° ПК) пружиною стає рівно навколо центру Λ на базовій лінії. */
  function intro() {
    var beams = $$('#top .wm-beam'), cap = $('.addr-cap'), glow = $('.hero-glow'), wsvg = $('.wl-svg');
    var tilt = parseFloat(getComputedStyle(h).getPropertyValue('--tilt')) || 2.4;
    var done = false;
    var fp = (d.fonts && d.fonts.load) ? d.fonts.load('800 100px Geologica', 'BALNCE') : Promise.resolve([1]);
    function noMoment() {
      gsap.set(beams, { rotation: 0 }); gsap.set(cap, { opacity: 1, y: 0, filter: 'none' });
      gsap.set(glow, { opacity: 1 }); gsap.to(wsvg, { opacity: 1, duration: .6, ease: E_OUT });
    }
    function play() {
      if (done) return; done = true;
      // старт через 120 мс після першого кадру, на якому вже стоїть шрифт (слово видно нахиленим)
      requestAnimationFrame(function () { requestAnimationFrame(function () { run(); }); });
    }
    function run() {
      window.__introStart = performance.now();
      var tl = gsap.timeline({ delay: .12 });
      tl.fromTo(beams, { rotation: tilt }, { rotation: 0, duration: .9, ease: EQ, force3D: true }, 0)
        .fromTo(wsvg, { opacity: .375 }, { opacity: 1, duration: .9, ease: E_OUT }, 0)
        .fromTo(cap, weak ? { opacity: 0, y: 6 } : { opacity: 0, y: 6, filter: 'blur(8px)' },
          weak ? { opacity: 1, y: 0, duration: .32, ease: E_OUT } : { opacity: 1, y: 0, filter: 'blur(0px)', duration: .32, ease: E_OUT, clearProps: 'filter' }, .311)
        // світло під Λ спалахує на першому проходженні рівня і стає рівним разом із балкою
        .fromTo(glow, { opacity: .55, scale: 1 }, { opacity: 1, scale: 1.06, duration: .14, ease: E_OUT }, .30)
        .to(glow, { opacity: .8, scale: 1, duration: .3, ease: E_STATE }, .44)
        .to(glow, { opacity: 1, duration: .2, ease: E_STATE }, .78);
    }
    // латиниця Geologica — font-display:block: до 3 с слово невидиме, тож підміни гліфів посеред руху не буде
    var left = Math.max(0, 3000 - performance.now());
    fp.then(play, function () { done = true; noMoment(); });
    setTimeout(function () { if (!done) { done = true; noMoment(); } }, left);
  }

  /* 2. Світ: гігантська Λ (T02) стає героєм історії й проходить контур → скло → суцільну; T01 — аркуш накриває сцену. */
  function worldAndStory() {
    var world = $('.world'), worldIn = $('.world-in'), wl = $('.wl'), wsvg = $('.wl-svg'), wblur = $('.wl-blur');
    var mGrad = $('.m-grad'), mLine = $('.m-line'), mGlass = $('.m-glass'), mSolid = $('.m-solid'), stGlow = $('.st-glow'), band = $('#g-band');
    var scene = $('.st-scene'), target = $('.st-target'), date = $('.date');
    var geo = { dx: 0, dy: 0, s: .41 };
    function measure() {
      gsap.set(wl, { x: 0, y: 0, scale: 1 });
      var r = wl.getBoundingClientRect();
      var tx = target.offsetLeft, ty = target.offsetTop, tw = target.offsetWidth, th = target.offsetHeight;
      geo.s = th / r.height;
      geo.dx = (tx + tw / 2) - (r.left + r.width / 2);
      geo.dy = ty - r.top;
      gsap.set(stGlow, { left: tx + tw / 2, top: ty + th * .92 });
    }
    measure();
    ST.addEventListener('refreshInit', measure);

    // T02: від «верх #story на 100 % екрана» до «на 0 %»; контур починає прокреслюватися
    gsap.timeline({ scrollTrigger: { trigger: '#story', start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true } })
      .fromTo(wl, { x: 0, y: 0, scale: 1 }, { x: function () { return geo.dx; }, y: function () { return geo.dy; }, scale: function () { return geo.s; }, ease: 'none', duration: 1 }, 0)
      .fromTo(mGrad, { opacity: .22 }, { opacity: 0, ease: 'none', duration: .45 }, .55)
      .fromTo(mLine, { opacity: 0, attr: { 'stroke-dashoffset': 1 } }, { opacity: .9, attr: { 'stroke-dashoffset': .55 }, ease: 'none', duration: .45 }, .55);

    // Стани матеріалу (пороги .33 / .61); усередині станів світ тече за пальцем безперервно
    var state = 1, dateDone = false;
    function setState(p) {
      var s = p < .33 ? 1 : p < .61 ? 2 : 3;
      if (s === state) return;
      var prev = state; state = s;
      scene.setAttribute('data-s', String(s));
      if (s === 3 && prev < 3) {
        if (!dateDone) {
          dateDone = true;
          // спершу дата проступає (160 мс), потім лягає на вершину тією ж пружиною, що й слово
          gsap.timeline()
            .fromTo(date, { opacity: 0, rotation: 2.4 }, { opacity: 1, duration: .16, ease: E_STATE, overwrite: true })
            .to(date, { rotation: 0, duration: .9, ease: EQ });
        } else gsap.fromTo(date, { opacity: 0, rotation: 0 }, { opacity: 1, duration: .24, ease: E_STATE, overwrite: true });
      } else if (prev === 3) {
        gsap.to(date, { opacity: 0, duration: .24, ease: E_STATE, overwrite: true });
      }
    }
    var IR = { immediateRender: false, ease: 'none' };
    var span = function () { return innerHeight * (desktop.matches ? 1.6 : 1.4); };
    gsap.timeline({ scrollTrigger: { trigger: '#story', start: 'top top', end: function () { return '+=' + span(); }, scrub: true, invalidateOnRefresh: true,
        onUpdate: function (self) { setState(self.progress); }, onRefresh: function (self) { setState(self.progress); } } })
      // увесь діапазон: світ повільно підіймається й наближається
      .fromTo(worldIn, { y: 0, scale: 1 }, Object.assign({ y: function () { return -.03 * innerHeight; }, scale: 1.04, duration: 1 }, IR), 0)
      // стан 1: контур докреслюється
      .fromTo(mLine, { attr: { 'stroke-dashoffset': .55 } }, Object.assign({ attr: { 'stroke-dashoffset': 0 }, duration: .28 }, IR), 0)
      .fromTo(mLine, { opacity: .9 }, Object.assign({ opacity: 0, duration: .06 }, IR), .30)
      // стан 2: скло, смуга відблиску проходить згори вниз, тепла пляма дрейфує
      .fromTo(mGlass, { opacity: 0 }, Object.assign({ opacity: 1, duration: .06 }, IR), .30)
      .fromTo(band, { attr: { x1: -1.1, y1: -.6, x2: -.1, y2: .4 } }, Object.assign({ attr: { x1: .1, y1: .6, x2: 1.1, y2: 1.6 }, duration: .24 }, IR), .34)
      .fromTo(stGlow, { opacity: 0, x: -10 }, Object.assign({ opacity: .55, x: 10, duration: .28 }, IR), .30)
      // стан 3: суцільна
      .fromTo(mGlass, { opacity: 1 }, Object.assign({ opacity: 0, duration: .06 }, IR), .58)
      .fromTo(mSolid, { opacity: 0 }, Object.assign({ opacity: 1, duration: .06 }, IR), .58)
      .fromTo(stGlow, { opacity: .55 }, Object.assign({ opacity: 1, duration: .06 }, IR), .58);

    // T01: білий аркуш піднімається, сцена під ним відходить углиб і темніє, Λ іде з фокуса (перехід до розмитої копії — лише opacity)
    var tl = gsap.timeline({ scrollTrigger: { trigger: '#services', start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true,
      onLeave: function () { gsap.set(world, { autoAlpha: 0 }); }, onEnterBack: function () { gsap.set(world, { autoAlpha: 1 }); } } });
    var tail = function () { return desktop.matches ? .2 : .5; };   // частка, коли сцена вже відкріпилась і їде вгору
    tl.fromTo(scene, { scale: 1, opacity: 1 }, { scale: .94, opacity: .5, ease: 'none', duration: 1 }, 0)
      .fromTo(world, { opacity: 1 }, { opacity: .5, ease: 'none', duration: 1 }, 0)
      .fromTo(wsvg, { opacity: 1 }, { opacity: 0, ease: 'none', duration: .7, immediateRender: false }, 0)
      .fromTo(wblur, { opacity: 0 }, { opacity: 1, ease: 'none', duration: .7, immediateRender: false }, 0)
      .fromTo(wl, { yPercent: 0 }, { yPercent: function () { return -tail() * innerHeight / wl.offsetHeight * 100; }, ease: 'none', duration: tail(), immediateRender: false }, 1 - tail());
  }

  /* 3. T06: помаранчеве поле піднімається вершиною-Λ, кромка сплощується; «22» і капсули — прозорість. */
  function handoffs() {
    var where = $('#where');
    gsap.fromTo(where, { '--h': function () { return (desktop.matches ? .20 : .16) * innerHeight + 'px'; } },
      { '--h': '0px', ease: 'none', scrollTrigger: { trigger: where, start: 'top bottom', end: 'top 35%', scrub: true, invalidateOnRefresh: true } });
    var w2 = $('[data-w2]'), wa = $$('[data-wa]');
    ST.create({ trigger: where, start: 'clamp(top 52%)', once: true, onEnter: function () {
      gsap.to(w2, { opacity: 1, duration: .6, ease: E_OUT });
      wa.forEach(function (el, i) { gsap.to(el, { opacity: 1, duration: .6, ease: E_OUT, delay: [0, .09, .15][i] || 0 }); });
    } });
  }

  /* 4. Прояви абзаців: лише прозорість, 600 мс, верх на 80 % екрана, один раз; у підвалі — одна хвиля 0 / 90 / 150 мс. */
  function reveals() {
    $$('[data-rv]').forEach(function (el) {
      var delay = parseFloat(el.getAttribute('data-rv-d') || '0');
      var inFoot = el.closest('footer');
      ST.create({ trigger: inFoot || el, start: inFoot ? 'clamp(top 85%)' : 'clamp(top 80%)', once: true, onEnter: function () {
        gsap.to(el, { opacity: 1, duration: inFoot ? .5 : .6, ease: E_OUT, delay: inFoot ? delay * 1.6 : delay });
      } });
    });
  }

  /* 5. Бульбашка рівня в панелі: зсув ≤ 6 px від швидкості прокрутки (згладжена), пружиною в центр. */
  function bubble() {
    var bub = $('.bub'); if (!bub) return null;
    var ly = scrollY, lt = performance.now(), v = 0, idle;
    var qx = gsap.quickTo(bub, 'x', { duration: .12, ease: 'none' });
    function onScroll() {
      var now = performance.now(), vy = (scrollY - ly) / Math.max(8, now - lt);
      ly = scrollY; lt = now; v = v * .7 + vy * .3;
      qx(clamp(-6, 6, v * 4));
      clearTimeout(idle); idle = setTimeout(function () { v = 0; gsap.to(bub, { x: 0, duration: .6, ease: EQ, overwrite: true }); }, 120);
    }
    addEventListener('scroll', onScroll, { passive: true });
    return function () { removeEventListener('scroll', onScroll); clearTimeout(idle); gsap.set(bub, { x: 0 }); };
  }
})();
