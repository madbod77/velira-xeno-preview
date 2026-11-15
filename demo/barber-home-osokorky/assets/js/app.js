/* Barber Home — концепт Velira v2. «Дзеркало показує новий образ». */
(function () {
  'use strict';
  var html = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { a = a === undefined ? 0 : a; b = b === undefined ? 1 : b; return v < a ? a : v > b ? b : v; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  /* ---- години з біо: 10:00–20:00 за Києвом (дні тижня в біо не названі) ---- */
  function status() {
    var el = $('[data-status]'); if (!el) return;
    try {
      var parts = new Intl.DateTimeFormat('uk-UA', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      var h = +parts.filter(function (p) { return p.type === 'hour'; })[0].value;
      var m = +parts.filter(function (p) { return p.type === 'minute'; })[0].value;
      var mins = h * 60 + m, open = mins >= 600 && mins < 1200;
      var hh = (h < 10 ? '0' : '') + h, mm = (m < 10 ? '0' : '') + m;
      $('.status-t', el).textContent = 'Зараз ' + hh + ':' + mm + ' у Києві — ' + (open ? 'у межах годин з біо' : 'поза годинами з біо');
      el.classList.toggle('open', open);
    } catch (e) { /* лишається статичний текст */ }
  }
  status(); setInterval(status, 30000);

  var motion = html.classList.contains('motion');
  if (!motion) return;
  if (!window.gsap || !window.ScrollTrigger) { html.classList.remove('motion'); return; }
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------- сцена: дзеркало ---------------- */
  var stage = $('.stage'), wrap = $('.stage-wrap'), after = $('.layer.after'), mirror = $('.mirror');
  var ui = $('.hero-ui'), curly = $('.mark.curly'), straight = $('.mark.straight'), newlook = $('.newlook');
  var beforeImg = $('.layer.before .bg'), glint = $('.mirror .glint');
  var canPath = !!(window.CSS && CSS.supports && (CSS.supports('clip-path', 'path("M0 0L1 1Z")') || CSS.supports('-webkit-clip-path', 'path("M0 0L1 1Z")')));

  var W = 0, H = 0, rx0 = 100, anchor = { x: 0, y: 0 }, amp = { x: 0, y: 0 };
  function measure() {
    W = stage.clientWidth; H = stage.clientHeight;
    rx0 = W < 760 ? 0.25 * W : W < 1100 ? 0.17 * W : 0.115 * W;
    mirror.style.width = (rx0 * 2.5) + 'px';
    mirror.style.transformOrigin = (rx0 * 1.25) + 'px ' + (rx0 * 1.4) + 'px';
    var sr = stage.getBoundingClientRect(), mr = straight.getBoundingClientRect();
    var top = mr.top - sr.top, mh = mr.height;
    if (W < 760) { anchor = { x: 0.6 * W, y: top + mh * 0.6 }; amp = { x: 0.16 * W, y: 12 }; }
    else { anchor = { x: 0.55 * W, y: top + mh * 0.5 }; amp = { x: 0.3 * W, y: 0.025 * H }; }
  }
  measure();

  var pos = { x: anchor.x, y: anchor.y }, tgt = { x: anchor.x, y: anchor.y };
  var mode = 'drift', lastInput = -10, rotS = -3, prevX = pos.x, t0 = performance.now() / 1000;
  function driftAt(t) {
    var a = (t - t0) * Math.PI * 2;
    return { x: anchor.x + amp.x * Math.sin(a / 16), y: anchor.y + amp.y * Math.sin(a / 8) };
  }

  /* курсор (ПК) */
  stage.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse' || dragging) return;
    var r = stage.getBoundingClientRect();
    tgt.x = clamp(e.clientX - r.left, 0.12 * W, 0.92 * W);
    tgt.y = clamp(e.clientY - r.top, anchor.y - 0.12 * H, anchor.y + 0.12 * H);
    mode = 'pointer'; lastInput = performance.now() / 1000;
  });
  stage.addEventListener('pointerleave', function () { if (!dragging) lastInput = -10; });

  /* палець (телефон): горизонтально, вертикаль лишається прокрутці */
  var dragging = false, dragStart = null;
  stage.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' || (e.target.closest && e.target.closest('a,button'))) return;
    dragging = true; mode = 'drag'; dragStart = { px: e.clientX, x: pos.x };
  });
  stage.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    tgt.x = clamp(dragStart.x + (e.clientX - dragStart.px), 0.18 * W, 0.86 * W);
    tgt.y = pos.y; lastInput = performance.now() / 1000;
  });
  function release() { if (!dragging) return; dragging = false; mode = 'pointer'; lastInput = performance.now() / 1000; shine(0); }
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);

  /* блиск скла */
  function shine(delay) {
    gsap.fromTo(glint, { attr: { x: -140 } }, { attr: { x: 260 }, duration: 0.9, ease: 'power2.inOut', delay: delay || 0, overwrite: true });
  }

  /* інтро: дзеркало піднімають у кадр */
  var intro = { lift: 0 };
  gsap.to(intro, { lift: 1, duration: 1.1, ease: 'back.out(1.3)', delay: 0.14 });
  gsap.fromTo(beforeImg, { filter: 'brightness(.42) saturate(.8) blur(8px)', scale: 1.04 },
    { filter: 'brightness(.42) saturate(.8) blur(0px)', scale: 1, duration: 0.6, ease: 'power2.out', clearProps: 'transform' });
  shine(1.15);

  /* прокрутка: дзеркало підносять ближче — проліт у новий образ */
  var prog = { p: 0 };
  gsap.to(prog, { p: 1, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top top', end: 'bottom bottom', scrub: 0.5 } });

  function ellipsePath(cx, cy, rx, ry, rot) {
    var a = rot * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    var x1 = (cx + rx * c).toFixed(1), y1 = (cy + rx * s).toFixed(1), x2 = (cx - rx * c).toFixed(1), y2 = (cy - rx * s).toFixed(1);
    var R = rx.toFixed(1) + ' ' + ry.toFixed(1) + ' ' + rot.toFixed(2);
    return 'path("M' + x1 + ' ' + y1 + 'A' + R + ' 1 1 ' + x2 + ' ' + y2 + 'A' + R + ' 1 1 ' + x1 + ' ' + y1 + 'Z")';
  }

  var visible = true, last = { ui: -1, cur: -1, q: -1 };
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(wrap);
  var prevT = performance.now() / 1000;
  html.classList.add('live');

  function render() {
    var now = performance.now() / 1000, dt = Math.min(0.05, Math.max(0.001, now - prevT)); prevT = now;
    if (!visible || document.hidden) return;
    var k;
    if (mode === 'drag') k = 0.35;
    else if (mode === 'pointer' && now - lastInput < 2.5) k = 0.09;
    else { mode = 'drift'; var d = driftAt(now); tgt.x = d.x; tgt.y = d.y; k = 0.035; }
    var f = 1 - Math.pow(1 - k, dt * 60);
    pos.x += (tgt.x - pos.x) * f; pos.y += (tgt.y - pos.y) * f;
    var vx = (pos.x - prevX) / dt; prevX = pos.x;
    rotS += ((-3 + clamp(vx * 0.012, -7, 7)) - rotS) * (1 - Math.pow(0.9, dt * 60));

    var L = intro.lift, op = clamp(L * 3.2);
    var p = prog.p, z = clamp(p / 0.55), ze = z < 0.5 ? 2 * z * z : 1 - Math.pow(-2 * z + 2, 2) / 2;
    var rxCover = Math.sqrt(Math.pow(W / 2, 2) + Math.pow(H / 2 / 1.275, 2)) * 1.04;
    var cx = lerp(pos.x, W / 2, ze), cy = lerp(pos.y + (1 - L) * 0.18 * H, H / 2, ze);
    var rx = lerp(rx0 * (0.86 + 0.14 * L), rxCover, Math.pow(ze, 1.3)), ry = rx * 1.275;
    var rot = lerp(rotS + (1 - L) * 17, 0, ze);

    var clip = canPath ? ellipsePath(cx, cy, rx, ry, rot) : 'ellipse(' + rx.toFixed(1) + 'px ' + ry.toFixed(1) + 'px at ' + cx.toFixed(1) + 'px ' + cy.toFixed(1) + 'px)';
    after.style.clipPath = clip; after.style.webkitClipPath = clip;
    after.style.opacity = op;
    mirror.style.transform = 'translate3d(' + (cx - rx0 * 1.25).toFixed(1) + 'px,' + (cy - rx0 * 1.4).toFixed(1) + 'px,0) rotate(' + rot.toFixed(2) + 'deg) scale(' + (rx / rx0).toFixed(4) + ')';
    mirror.style.opacity = (op * (1 - clamp((z - 0.3) / 0.3))).toFixed(3);
    mirror.style.visibility = z >= 0.6 ? 'hidden' : 'visible';

    var u = clamp(p / 0.3);
    if (Math.abs(u - last.ui) > 0.001) {
      last.ui = u;
      ui.style.opacity = (1 - u).toFixed(3);
      ui.style.transform = u > 0 ? 'translate3d(0,' + (-24 * u).toFixed(1) + 'px,0)' : '';
      ui.style.visibility = u >= 0.98 ? 'hidden' : 'visible';
    }
    var c = 1 - clamp((p - 0.4) / 0.12);
    if (Math.abs(c - last.cur) > 0.001) { last.cur = c; curly.style.opacity = c.toFixed(3); }
    var q = clamp((p - 0.5) / 0.18);
    if (Math.abs(q - last.q) > 0.001) {
      last.q = q;
      newlook.style.opacity = q.toFixed(3);
      newlook.style.filter = q < 1 ? 'blur(' + (10 * (1 - q)).toFixed(2) + 'px)' : 'none';
      newlook.style.transform = 'translate3d(0,calc(-50% + ' + (24 * (1 - q)).toFixed(1) + 'px),0) scale(' + (0.96 + 0.04 * q).toFixed(4) + ')';
    }
  }
  gsap.ticker.add(render);

  var rT;
  window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(function () { measure(); wipeNow(); }, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); ScrollTrigger.refresh(); });

  /* ---------------- док запису ---------------- */
  var dock = $('.dock');
  ScrollTrigger.create({ trigger: '#services', start: 'top 82%', onEnter: function () { dock.classList.add('on'); }, onLeaveBack: function () { dock.classList.remove('on'); } });

  /* ---------------- проява рядків і рамок ---------------- */
  var items = $$('.rows li, .frames li');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -20% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add('in'); });

  /* ---------------- відблиск скла → срібло ---------------- */
  var silver = $('.silver'), bar = $('.glint-bar');
  var wipeT = 0;
  function wipe(t) {
    wipeT = t;
    if (t >= 0.999) { silver.style.clipPath = 'none'; silver.style.webkitClipPath = 'none'; bar.style.opacity = 0; return; }
    /* діагональ проходить видиму частину розділу: від верху розділу до низу екрана */
    var w = silver.clientWidth, vh = window.innerHeight, top = silver.getBoundingClientRect().top;
    var vis = Math.max(60, vh - top), D = Math.min(0.42 * w, 0.8 * vis);
    var X = t * (w + D);
    var poly = 'polygon(0px 0px, ' + X.toFixed(1) + 'px 0px, ' + (X - D).toFixed(1) + 'px ' + vis.toFixed(1) + 'px, ' + (X - D).toFixed(1) + 'px 100%, 0px 100%)';
    silver.style.clipPath = poly; silver.style.webkitClipPath = poly;
    var ang = Math.atan2(D, vis) * 180 / Math.PI, bw = bar.offsetWidth;
    bar.style.transform = 'translate3d(' + (X - bw / 2).toFixed(1) + 'px,0,0) skewX(' + (-ang).toFixed(2) + 'deg) scaleY(' + (vis / 100).toFixed(3) + ')';
    bar.style.opacity = (Math.sin(Math.PI * t) * 0.9).toFixed(3);
  }
  function wipeNow() { wipe(wipeT); }
  /* поза діапазоном переходу (розділ ще нижче екрана) кліп знято: повна сторінка й «без прокрутки» бачать срібло цілим */
  function wipeSt(s) { if (s.progress <= 0 && !s.isActive) { wipeT = 1; silver.style.clipPath = 'none'; silver.style.webkitClipPath = 'none'; bar.style.opacity = 0; } else wipe(s.progress); }
  ScrollTrigger.create({ trigger: silver, start: 'top bottom', end: 'top 30%', onUpdate: wipeSt, onRefresh: wipeSt, onToggle: wipeSt });

  /* ---------------- дзеркало «Біозавивки» відкривається ---------------- */
  var ovalIn = $('.oval-in'), ovalImg = $('.oval-in img');
  var ovalTl = gsap.timeline({ paused: true })
    .fromTo(ovalIn, { clipPath: 'ellipse(14% 9% at 50% 50%)' }, { clipPath: 'ellipse(50% 50% at 50% 50%)', ease: 'none' }, 0)
    .fromTo(ovalImg, { scale: 1.12 }, { scale: 1, ease: 'none' }, 0);
  var ovalP = { v: 0 };
  /* вікно закрите лише в діапазоні прокрутки; нижче екрана (і на повній сторінці) — відкрите */
  function ovalSt(s) {
    if (!s.isActive && s.progress <= 0) { ovalTl.progress(1); return; }
    gsap.to(ovalP, { v: s.progress, duration: 0.5, ease: 'power3.out', overwrite: true, onUpdate: function () { ovalTl.progress(ovalP.v); } });
  }
  ScrollTrigger.create({ trigger: '.oval', start: 'top bottom', end: 'top 30%', onUpdate: ovalSt, onRefresh: ovalSt,
    onToggle: function (s) { if (s.isActive) { ovalP.v = s.progress; ovalTl.progress(s.progress); } ovalSt(s); } });
})();
