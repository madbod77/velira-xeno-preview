/* Крапка.Кави — концепт Velira. «Запітніле дзеркало». Без бібліотек; без JS і з reduced motion усе видно на місцях. */
(function () {
  'use strict';
  var root = document.documentElement;
  var motion = root.classList.contains('mo');

  /* ---------- Живий статус і крапка «зараз» за київським часом ---------- */
  var HOURS = { 0: [9, 21], 1: [7.5, 20], 2: [7.5, 20], 3: [7.5, 20], 4: [7.5, 20], 5: [7.5, 20], 6: [9, 21] };
  function fmt(h) { var m = Math.round((h % 1) * 60); return Math.floor(h) + ':' + (m < 10 ? '0' : '') + m; }
  function kyivNow() {
    try {
      var o = {};
      new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Kyiv', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
        .formatToParts(new Date()).forEach(function (p) { o[p.type] = p.value; });
      return { day: { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday], h: parseInt(o.hour, 10) + parseInt(o.minute, 10) / 60 };
    } catch (e) { var d = new Date(); return { day: d.getDay(), h: d.getHours() + d.getMinutes() / 60 }; }
  }
  function updateStatus() {
    var n = kyivNow(); if (n.day == null || isNaN(n.h)) return;
    var t = HOURS[n.day], open = n.h >= t[0] && n.h < t[1], text;
    if (open) text = 'Відчинено · до ' + fmt(t[1]);
    else if (n.h < t[0]) text = 'Зачинено · сьогодні з ' + fmt(t[0]);
    else text = 'Зачинено · завтра з ' + fmt(HOURS[(n.day + 1) % 7][0]);
    document.querySelectorAll('[data-status]').forEach(function (el) {
      el.classList.toggle('is-open', open); el.classList.toggle('is-closed', !open);
      var tx = el.querySelector('[data-status-text]'); if (tx) tx.textContent = text;
    });
    document.querySelectorAll('.ruler__row').forEach(function (row) {
      var today = row.getAttribute('data-days').split(',').map(Number).indexOf(n.day) !== -1;
      row.classList.toggle('is-today', today && n.h >= 6 && n.h <= 22);
      if (today) row.style.setProperty('--now', Math.max(0, Math.min(100, (n.h - 6) / 16 * 100)) + '%');
    });
  }
  updateStatus(); setInterval(updateStatus, 60000);

  /* ---------- Проява блоків при вході знизу ---------- */
  var ins = document.querySelectorAll('[data-in],[data-pin]');
  if ('IntersectionObserver' in window && motion) {
    var vh0 = window.innerHeight;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, sib = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
        if (el.hasAttribute('data-pin') || el.classList.contains('nest')) el.style.setProperty('--d', Math.min(sib, 6) * 0.07 + 's');
        el.classList.add('is-in'); io.unobserve(el);
      });
    }, { rootMargin: '0px 0px 6% 0px', threshold: 0 });
    ins.forEach(function (el) {
      // те, що вже вище за низ екрана при завантаженні, не ховаємо й не анімуємо
      if (el.getBoundingClientRect().top < vh0 * 0.98) return;
      io.observe(el);
    });
  }

  /* ---------- Полиця: планка тягнеться, гнізда їдуть хвилею (scrub за позицією полиці) ---------- */
  var shelf = document.querySelector('[data-shelf]');
  var nests = shelf ? Array.prototype.slice.call(shelf.querySelectorAll('.nest')) : [];
  var shelfScrub = !!(shelf && motion && shelf.getBoundingClientRect().top > window.innerHeight * 0.9);
  if (shelfScrub) { shelf.classList.add('is-scrub'); nests.forEach(function (n) { n.removeAttribute('data-in'); }); }
  function shelfFrame() {
    if (!shelfScrub) return;
    var r = shelf.getBoundingClientRect();
    if (r.top > vh * 1.2 || r.bottom < -vh * 0.5) return;
    var s = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.5)));
    shelf.style.setProperty('--ledge', easeOut(s).toFixed(4));
    nests.forEach(function (n, k) {
      var q = Math.max(0, Math.min(1, s * 1.4 - k * 0.05)), w = 1 - easeOut(q);
      n.style.opacity = q.toFixed(3);
      n.style.transform = w > 0.001 ? 'translate3d(' + (-40 * w).toFixed(1) + 'px,' + (10 * w).toFixed(1) + 'px,0)' : '';
      n.style.filter = w > 0.001 ? 'blur(' + (6 * w).toFixed(2) + 'px)' : '';
    });
  }
  if (shelf) shelf.addEventListener('scroll', function () {
    shelf.classList.toggle('at-end', shelf.scrollLeft + shelf.clientWidth >= shelf.scrollWidth - 4);
  }, { passive: true });

  /* ---------- Шапка: смуга → пігулка; на ночі клубу — темне скло ---------- */
  var bar = document.querySelector('[data-bar]');
  var club = document.querySelector('[data-night]');

  /* ---------- Дзеркало: пара, відбитки, відблиск ---------- */
  var hero = document.querySelector('[data-hero]');
  var mirror = document.querySelector('[data-mirror]');
  var fog = document.querySelector('.glass__fog');
  var lift = document.querySelector('.mirror__lift');
  var veil = document.querySelector('.glass__veil');
  var ledge = document.querySelector('.mirror__ledge');
  var lg = null;
  var drips = Array.prototype.slice.call(document.querySelectorAll('.drip'));
  var sheen = document.querySelector('.glass__sheen');
  var refl = Array.prototype.slice.call(document.querySelectorAll('[data-refl]'));
  var cap = document.querySelector('[data-cap]');
  var capT = document.querySelector('[data-cap-t]');
  var capA = document.querySelector('[data-cap-a]');
  var dots = Array.prototype.slice.call(document.querySelectorAll('.cap__dot'));
  var N = refl.length, shown = 0, want = 0;
  var clear = motion ? 0 : 1, clearTo = 1, clearT0 = 0, clearFrom = 0, clearDur = 1500, clearDelay = 420, phase = 'intro';
  var heroTop = 0, heroSpan = 1, vh = window.innerHeight;
  var px = 0, pxTo = 0, visible = true, raf = 0, last = 0;

  function measure() {
    vh = window.innerHeight;
    if (!hero) return;
    var r = hero.getBoundingClientRect();
    heroTop = r.top + window.scrollY; heroSpan = Math.max(1, r.height - vh);
    if (ledge && mirror) setLedge(0);
  }
  function setLedge(e) {
    if (!ledge || !mirror) return;
    // центр дзеркала стабільний (на телефоні — центр екрана), ширина рами може мінятися — читаємо щоразу
    var vw = document.documentElement.clientWidth, st = mirror.offsetParent ? mirror.offsetParent.getBoundingClientRect() : { left: 0 };
    var mw = mirror.offsetWidth, cx = st.left + mirror.offsetLeft + mw / 2, half = mw * 0.31;
    var k = 1 - (e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2);
    ledge.style.setProperty('--lx', (-cx).toFixed(1) + 'px');
    ledge.style.setProperty('--lwid', vw + 'px');
    ledge.style.setProperty('--ll', (Math.max(0, cx - half) * k).toFixed(1) + 'px');
    ledge.style.setProperty('--lr', (Math.max(0, vw - cx - half) * k).toFixed(1) + 'px');
  }

  function progress() { return Math.max(0, Math.min(1, (window.scrollY - heroTop) / heroSpan)); }
  var STEPS = 0.8;
  function stepFor(p) { return Math.min(N - 1, Math.floor(Math.min(1, p / STEPS) * N * 0.999 + 0.0001)); }

  function swapTo(i) {
    refl.forEach(function (f, k) {
      var on = k === i; f.classList.toggle('is-on', on);
      if (on) f.removeAttribute('aria-hidden'); else f.setAttribute('aria-hidden', 'true');
      var img = f.querySelector('img'); if (img && on && img.loading === 'lazy') img.loading = 'eager';
    });
    dots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); });
    var f = refl[i];
    if (capT) capT.textContent = f.getAttribute('data-cap');
    if (capA) capA.setAttribute('href', f.getAttribute('data-href'));
    if (cap) cap.classList.remove('is-swap');
    shown = i;
  }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeIn(t) { return t * t; }
  var exitR = 1, dripped = false;
  function setClear(v) {
    clear = v;
    if (!fog) return;
    var r = Math.min(v, exitR);
    fog.style.setProperty('--r', r.toFixed(4));
    fog.style.setProperty('--cx', (42 + 8 * r).toFixed(2) + '%');
    fog.style.setProperty('--cy', (62 - 9 * r).toFixed(2) + '%');
  }
  function startClear(now, dur, delay) { phase = 'clearing'; clearFrom = clear; clearT0 = now + (delay || 0); clearDur = dur; }
  function startFog(now) { phase = 'fogging'; clearFrom = clear; clearT0 = now; clearDur = 180 * Math.max(0.2, clear); if (cap) cap.classList.add('is-swap'); }

  function frame(now) {
    raf = 0;
    if (!hero) return;
    var p = progress();
    want = stepFor(p);
    // фаза пари
    if (motion) {
      if (phase === 'intro') { startClear(now, 2100, clearDelay); }
      if (phase === 'clearing') {
        if (want !== shown) startFog(now);
        else {
          var t = (now - clearT0) / clearDur;
          if (t >= 0) setClear(clearFrom + (1 - clearFrom) * easeOut(Math.min(1, t)));
          if (t >= 0.55 && !dripped) { dripped = true; drips.forEach(function (d) { d.classList.add('is-run'); }); }
          if (t >= 1) phase = 'idle';
        }
      } else if (phase === 'idle') {
        if (want !== shown) startFog(now);
      }
      if (phase === 'fogging') {
        var u = clearDur > 0 ? (now - clearT0) / clearDur : 1;
        setClear(clearFrom * (1 - easeIn(Math.min(1, u))));
        if (u >= 1) { swapTo(want); setClear(0.35); startClear(now, 600, 0); }
      }
    } else if (want !== shown) swapTo(want);

    // вихід зі сцени: скло пітніє востаннє, дзеркало підіймається й трохи меншає, підпис гасне
    var e = Math.max(0, Math.min(1, (p - STEPS) / (1 - STEPS)));
    if (motion) {
      if (veil) veil.style.opacity = e.toFixed(3);
      if (lift) { lift.style.setProperty('--ly', (-e * 26).toFixed(1) + 'px'); lift.style.setProperty('--ls', (1 - e * 0.06).toFixed(4)); }
      if (cap) cap.style.opacity = (1 - e * 0.85).toFixed(3);
      setLedge(e);
    }
    // відбиток відстає від стіни; відблиск ковзає за прогресом
    var local = (Math.min(1, p / STEPS) * N) - shown; // 0..1 у межах кроку
    var py = Math.max(-0.2, Math.min(1.2, local)) * 2.5;
    px += (pxTo - px) * 0.08;
    if (motion) {
      refl[shown].style.setProperty('--py', py.toFixed(2) + '%');
      refl[shown].style.setProperty('--px', px.toFixed(1) + 'px');
      if (sheen) sheen.style.setProperty('--bx', (100 - Math.min(1, p / STEPS) * 100).toFixed(2) + '%');
    }
    if (visible && (phase !== 'idle' || Math.abs(pxTo - px) > 0.2 || now - last < 120)) raf = requestAnimationFrame(frame);
  }
  function kick() { last = performance.now(); if (!raf && visible) raf = requestAnimationFrame(frame); }

  if (hero && refl.length) {
    measure();
    if (!motion) setClear(1);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) kick(); }, { threshold: 0 }).observe(hero);
    }
    if (mirror && window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches && motion) {
      window.addEventListener('pointermove', function (e) { pxTo = -((e.clientX / window.innerWidth) - 0.5) * 20; kick(); }, { passive: true });
    }
    kick();
  }

  /* ---------- Ніч клубу: аркуш розширюється до повного кадру ---------- */
  function clubSheet() {
    if (!club || !motion) return;
    var r = club.getBoundingClientRect();
    var t = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.75)));
    var x = Math.max(0, Math.min(1, (vh - r.bottom) / (Math.min(r.height, vh) * 0.6)));
    var e = Math.max(1 - t, x);
    club.style.setProperty('--ix', (5 * e).toFixed(2) + '%');
    club.style.setProperty('--r', (36 * e).toFixed(1) + 'px');
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var sy = window.scrollY;
      if (bar) {
        bar.classList.toggle('is-pill', sy > 60);
        if (club) { var r = club.getBoundingClientRect(); bar.classList.toggle('is-night', r.top < 40 && r.bottom > 40); }
      }
      clubSheet();
      shelfFrame();
    });
    kick();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); onScroll(); }, { passive: true });
  window.addEventListener('load', function () { measure(); onScroll(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  onScroll();
})();
