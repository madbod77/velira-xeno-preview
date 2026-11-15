/* Крапка.Кави — концепт Velira. Рух — прогресивне покращення: без JS і з reduced motion усе видно на місцях. */
(function () {
  'use strict';
  var root = document.documentElement;
  var motion = root.classList.contains('mo');

  /* ---------- Живий статус і крапка «зараз» за київським часом ---------- */
  var HOURS = { 0: [9, 21], 1: [7.5, 20], 2: [7.5, 20], 3: [7.5, 20], 4: [7.5, 20], 5: [7.5, 20], 6: [9, 21] };
  var DAYS = ['неділю', 'понеділок', 'вівторок', 'середу', 'четвер', 'пʼятницю', 'суботу'];
  function fmt(h) { var m = Math.round((h % 1) * 60); return Math.floor(h) + ':' + (m < 10 ? '0' : '') + m; }
  function kyivNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Kyiv', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      var map = {}; parts.forEach(function (p) { map[p.type] = p.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[map.weekday];
      return { day: wd, h: parseInt(map.hour, 10) + parseInt(map.minute, 10) / 60 };
    } catch (e) { var d = new Date(); return { day: d.getDay(), h: d.getHours() + d.getMinutes() / 60 }; }
  }
  function updateStatus() {
    var n = kyivNow(); if (n.day == null || isNaN(n.h)) return;
    var t = HOURS[n.day], open = n.h >= t[0] && n.h < t[1], text;
    if (open) text = 'Зараз відчинено · до ' + fmt(t[1]);
    else if (n.h < t[0]) text = 'Зараз зачинено · сьогодні з ' + fmt(t[0]);
    else { var nd = (n.day + 1) % 7; text = 'Зараз зачинено · завтра з ' + fmt(HOURS[nd][0]); }
    document.querySelectorAll('[data-status]').forEach(function (el) {
      el.classList.toggle('is-open', open); el.classList.toggle('is-closed', !open);
      var tx = el.querySelector('[data-status-text]'); if (tx) tx.textContent = text;
    });
    document.querySelectorAll('.ruler__row').forEach(function (row) {
      var days = row.getAttribute('data-days').split(',').map(Number);
      var today = days.indexOf(n.day) !== -1;
      row.classList.toggle('is-today', today && n.h >= 6 && n.h <= 22);
      if (today) row.style.setProperty('--now', Math.max(0, Math.min(100, (n.h - 6) / 16 * 100)) + '%');
    });
  }
  updateStatus(); setInterval(updateStatus, 60000);

  /* ---------- Шапка: смуга → пігулка; на ночі клубу — темне скло ---------- */
  var bar = document.querySelector('[data-bar]');
  var night = document.querySelector('[data-night]');
  var stage = document.querySelector('.night-stage');
  var drop = document.querySelector('[data-drop]');
  var drop2 = document.querySelector('[data-drop2]');
  var origin = document.querySelector('[data-origin]');
  var target = document.querySelector('[data-target]');
  var origin2 = document.querySelector('[data-origin2]');
  var target2 = document.querySelector('[data-target2]');
  var geo = null, geo2 = null;

  function pt(el, sy) { var r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 + sy, d: r.width }; }
  function measure() {
    var sy = window.scrollY, vh = window.innerHeight;
    measureZones(sy);
    if (origin && target) {
      var A = pt(origin, sy), B = pt(target, sy);
      var s0 = Math.max(0, A.y - vh * 0.35), s1 = Math.max(s0 + vh * 0.5, B.y - vh * 0.55);
      geo = { A: A, B: B, s0: s0, s1: s1, home: target };
    }
    if (origin2 && target2 && stage) {
      var A2 = pt(origin2, sy), B2 = pt(target2, sy), r = stage.getBoundingClientRect();
      var edge = r.bottom + sy;                       /* межа ночі й дня */
      var grid = night.querySelector('.club__grid'), gb = grid ? grid.getBoundingClientRect().bottom + sy : A2.y;
      var startY = Math.max(A2.y, gb + 28);           /* під фото й підписом — крапля їх не перетинає */
      var t0 = startY - vh * 0.22, t1 = Math.max(t0 + vh * 0.45, B2.y - vh * 0.55);
      geo2 = { A: { x: A2.x, y: startY, d: A2.d }, B: B2, s0: t0, s1: t1, edge: edge, home: target2 };
    }
  }
  function ease(p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
  function clamp(v) { return Math.max(0, Math.min(1, v)); }
  /* крапля падає до рівня трохи над рядком заголовка, ковзає до кінця речення (40–70 % шляху) і сідає вниз;
     над текстом без підкладки (бабли, підписи, ліди) вона гасне за 120 мс — не читається як друкарська помилка */
  var EXCL = '.ask span, figcaption, .from, .lead, .bio, .concept, .reply__note, .row__slot, .hours__note, .h2';
  var zones = [];
  function measureZones(sy) {
    zones = [].slice.call(document.querySelectorAll(EXCL)).map(function (el) {
      var r = el.getBoundingClientRect(); return { l: r.left - 8, r: r.right + 8, t: r.top + sy - 8, b: r.bottom + sy + 8, el: el };
    });
  }
  function hitsText(x, y, rad, g) {
    for (var i = 0; i < zones.length; i++) {
      var z = zones[i];
      if (x + rad > z.l && x - rad < z.r && y + rad > z.t && y - rad < z.b) return true;
    }
    return false;
  }
  function place(el, g, p) {
    var lift = (g.B.d / 0.24) * 0.8;                 /* над великим кеглем рядка-цілі */
    var y = p < 0.7 ? g.A.y + (g.B.y - lift - g.A.y) * ease(p / 0.7) : g.B.y - lift + lift * ease((p - 0.7) / 0.3);
    var x = g.A.x + (g.B.x - g.A.x) * ease(clamp((p - 0.4) / 0.3));
    var s = Math.sin(Math.PI * p), d = g.A.d + (g.B.d - g.A.d) * ease(p);
    var k = d / 100, sxv = k * (1 - 0.16 * s), syv = k * (1 + 0.26 * s);
    el.style.opacity = (p > 0.9 || !hitsText(x, y, d / 2, g)) ? '1' : '0';
    el.style.zIndex = p > 0.8 ? '3' : '1';                /* над бульбашкою, у яку сідає */
    el.style.transform = 'translate3d(' + (x - 50).toFixed(1) + 'px,' + (y - 50).toFixed(1) + 'px,0) scale(' + sxv.toFixed(4) + ',' + syv.toFixed(4) + ')';
    return y;
  }
  var last1 = -1, last2 = -1;
  function renderDrop(sy) {
    if (!motion) return;
    if (geo && drop) {
      var p = clamp((sy - geo.s0) / (geo.s1 - geo.s0));
      if (p !== last1) {
        last1 = p; root.classList.toggle('is-travel', p > 0 && p < 1);
        if (p <= 0 || p >= 1) drop.style.opacity = '0'; else place(drop, geo, p);
      }
    }
    if (geo2 && drop2) {
      var q = clamp((sy - geo2.s0) / (geo2.s1 - geo2.s0));
      if (q !== last2) {
        last2 = q; root.classList.toggle('is-travel2', q > 0 && q < 1);
        if (q <= 0 || q >= 1) drop2.style.opacity = '0';
        else {
          var y = place(drop2, geo2, q);
          /* жовта крапка лампи чорніє, щойно виходить з ночі в день */
          var t = clamp((y - geo2.edge + 24) / 48);
          drop2.style.backgroundColor = 'rgb(' + Math.round(243 + (14 - 243) * t) + ',' + Math.round(207 + (13 - 207) * t) + ',' + Math.round(58 + (16 - 58) * t) + ')';
        }
      }
    }
  }
  function renderNight() {
    if (!night) return;
    var vh = window.innerHeight, r = (stage || night).getBoundingClientRect();
    if (motion) {
      var pin = clamp((vh - r.top) / (vh * 0.75));
      var pout = clamp((vh * 0.75 - r.bottom) / (vh * 0.75));
      var k = Math.max(Math.pow(1 - pin, 2), pout * pout);
      var wide = window.innerWidth >= 760;
      night.style.setProperty('--ix', ((wide ? 8 : 4) * k).toFixed(2) + '%');
      night.style.setProperty('--r', ((wide ? 56 : 32) * k).toFixed(1) + 'px');
      if (stage) stage.style.setProperty('--wash-o', (1 - k).toFixed(3));
    }
    if (bar) bar.classList.toggle('is-night', r.top < 40 && r.bottom > 40);
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false; var sy = window.scrollY;
      if (bar) bar.classList.toggle('is-pill', sy > 60);
      renderNight(); renderDrop(sy);
    });
  }

  /* ---------- Вхід глав: один раз, тригер 0,8 висоти ---------- */
  var secs = [].slice.call(document.querySelectorAll('[data-sec]'));
  function showAll() { secs.forEach(function (s) { s.classList.add('is-in'); }); }
  if (!motion) showAll();
  else if ('IntersectionObserver' in window) {
    /* глави, видимі вже на першому екрані, не анімуються (без мигання) */
    secs.forEach(function (s) { if (s.getBoundingClientRect().top < window.innerHeight) s.classList.add('is-in', 'is-static'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px 6% 0px', threshold: 0 });
    secs.forEach(function (s) { if (!s.classList.contains('is-in')) io.observe(s); });
  } else showAll();

  function refresh() { measure(); last1 = -1; last2 = -1; onScroll(); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', refresh);
  window.addEventListener('load', refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  refresh();
})();
