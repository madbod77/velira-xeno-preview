/* Barber Home concept (Velira) — motion: strands twist into the pole, the pole docks into booking, the curl springs off the rod. */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = !doc.classList.contains('motion');
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (!hasGsap) { doc.classList.remove('motion'); reduce = true; }
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- hours: the pole turns only within the hours from their bio (10:00–20:00, Kyiv) ---- */
  var open = false;
  function kyivNow() {
    try {
      var f = new Intl.DateTimeFormat('uk-UA', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
      var parts = f.formatToParts(new Date()), hh = 0, mm = 0;
      parts.forEach(function (x) { if (x.type === 'hour') hh = +x.value; if (x.type === 'minute') mm = +x.value; });
      return { h: hh, m: mm, txt: (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm };
    } catch (e) { return null; }
  }
  function updateHours() {
    var el = $('#hours'), now = kyivNow(); if (!el || !now) return;
    var mins = now.h * 60 + now.m; open = mins >= 600 && mins < 1200;
    el.classList.toggle('is-open', open); el.classList.toggle('is-closed', !open);
    $('.hours__text', el).textContent = 'У Києві ' + now.txt + ' — ' + (open ? 'у межах годин з біо, 10:00–20:00' : 'поза годинами з біо, 10:00–20:00');
  }
  updateHours(); setInterval(updateHours, 30000);

  /* ---- the pole ---- */
  var poleCanvas = $('.pole__canvas'), pole = null, poleVisible = true;
  if (poleCanvas && window.Helix && poleCanvas.getContext) {
    pole = new window.Helix(poleCanvas, { mode: 'pole', colors: ['#d6283b', '#f5f6f7', '#2453c9', '#f5f6f7', '#d6283b', '#f5f6f7', '#2453c9', '#f5f6f7'] });
    pole.state.k = reduce ? 1 : 0; pole.state.rot = 0.35; pole.draw();
    var startPoster = document.querySelector('.pole__start'); if (startPoster) startPoster.classList.add('is-off');
  } else { doc.classList.remove('js'); }

  var curlCanvas = $('.curl__canvas'), curl = null;
  if (curlCanvas && window.Helix && curlCanvas.getContext) {
    curl = new window.Helix(curlCanvas, { mode: 'curl', colors: ['#7a5640'] });
    curl.state.p = reduce ? 1 : 0; curl.draw();
  }

  var rz; window.addEventListener('resize', function () {
    clearTimeout(rz); rz = setTimeout(function () { if (pole) { pole.resize(); pole.draw(); } if (curl) { curl.resize(); curl.draw(); } }, 120);
  });

  // services spiral line geometry (also static without motion)
  function buildSpiral() {
    var svg = $('.spiral__line'), list = $('.spiral__list'); if (!svg || !list) return;
    var w = svg.getBoundingClientRect().width, h = list.offsetHeight, rows = $$('.svc'), rowH = h / Math.max(1, rows.length);
    svg.setAttribute('viewBox', '0 0 ' + w.toFixed(1) + ' ' + h.toFixed(1));
    var d = '', amp = w / 2 - 10, cx = w / 2;
    for (var y = -10; y <= h + 10; y += 6) {
      var x = cx + amp * Math.sin((y / rowH) * Math.PI + 0.6);
      d += (d ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    $('path', svg).setAttribute('d', d);
  }
  buildSpiral(); window.addEventListener('resize', buildSpiral);

  // stripes inside «Як нас знайти!?»
  (function () {
    var g = $('.word__stripes'); if (!g) return;
    var ns = 'http://www.w3.org/2000/svg', cols = ['#d6283b', '#f5f6f7', '#2453c9', '#f5f6f7'], sw = 34;
    for (var i = 0, x = -700; x < 1700; i++, x += sw) {
      var r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', x); r.setAttribute('y', -200); r.setAttribute('width', sw + 0.6); r.setAttribute('height', 780);
      r.setAttribute('fill', cols[i % 4]); g.appendChild(r);
    }
    if (reduce) g.setAttribute('transform', 'translate(500 190) skewX(-32) translate(-500 -190)');
  })();

  if (reduce || !hasGsap) {
    if (pole) { pole.state.k = 1; pole.draw(); }
    return;
  }

  /* ================= motion ================= */
  var gsap = window.gsap, ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);
  var EASE = 'cubic-bezier(.2,.7,.2,1)';
  gsap.config({ nullTargetWarn: false });
  var easeIn = function (t) { var u = 1 - t; return 1 - u * u * u; }; // close to cubic-bezier(.2,.7,.2,1)

  // spin ticker (only open hours, only on screen, only while the tab is visible)
  var lastT = 0;
  gsap.ticker.add(function (time) {
    var dt = lastT ? time - lastT : 0; lastT = time;
    if (!pole || !poleVisible || document.hidden) return;
    if (open && pole.spinning) pole.state.rot -= dt * (Math.PI * 2 / 9);
    if (pole.spinning || pole.twisting) pole.draw();
  });
  if ('IntersectionObserver' in window && pole) {
    new IntersectionObserver(function (es) { poleVisible = es[0].isIntersecting; }, { rootMargin: '80px' }).observe(poleCanvas);
  }

  // 1. signature: strands twist into the pole (lead), glass appears with it
  if (pole) {
    pole.twisting = true;
    gsap.fromTo(poleCanvas, { opacity: 0.8 }, { opacity: 1, duration: 0.6, delay: 0.12, ease: easeIn });
    // straight strands hang for a beat, wind on (power2.inOut), overshoot a little and settle back like a spring
    gsap.timeline({ delay: 0.12, onComplete: function () { pole.twisting = false; pole.spinning = true; pole.draw(); } })
      .to(pole.state, { k: 1.07, duration: 1.25, delay: 0.2, ease: 'power2.inOut' })
      .to(pole.state, { k: 1, duration: 0.4, ease: 'back.out(2.2)' });
  }

  // 2. T02: the pole flies into the booking dock
  var stage = $('.pole__stage'), dockPole = $('.dock__stripes'), dockSlot = $('.dock__pole'), hero = $('#top');
  if (stage && dockPole && hero) {
    var geo = {};
    var measure = function () {
      var hr = hero.getBoundingClientRect(), sy = window.scrollY || window.pageYOffset;
      var fig = $('#pole');
      var stTop = hr.top + sy + fig.offsetTop + stage.offsetTop, stLeft = hr.left + fig.offsetLeft + stage.offsetLeft;
      var sw = stage.offsetWidth, sh = stage.offsetHeight;
      var d = dockSlot.getBoundingClientRect();
      var end = Math.max(240, hr.bottom + sy - window.innerHeight * 0.12);
      geo = { end: end, x: (d.left + d.width / 2) - (stLeft + sw / 2), y: (d.top + d.height / 2) - (stTop + sh / 2 - end), s: Math.max(0.04, d.height / (sh * 0.94)) };
    };
    measure();
    gsap.set(dockPole, { opacity: (window.scrollY || 0) > geo.end ? 1 : 0 });
    gsap.fromTo(stage, { x: 0, y: 0, scale: 1 }, {
      x: function () { return geo.x; }, y: function () { return geo.y; }, scale: function () { return geo.s; },
      ease: 'power1.inOut', transformOrigin: '50% 50%', immediateRender: false,
      scrollTrigger: { start: 0, end: function () { return geo.end; }, scrub: 0.35, invalidateOnRefresh: true,
        onRefreshInit: measure,
        onUpdate: function (self) {
          var p = self.progress, f = Math.min(1, Math.max(0, (p - 0.86) / 0.14));
          stage.style.opacity = String(1 - f); dockPole.style.opacity = String(f);
        } }
    });
    gsap.to('.pole__cap', { opacity: 0, ease: 'none', scrollTrigger: { start: 0, end: 160, scrub: true } });
  }

  // 3. services: names drift along the strand (scrubbed, always visible), the strand draws through them
  $$('.svc__name').forEach(function (el, i) {
    // drift in from the right by a different distance per row, never past the column edge (no clipping on 320 px)
    var off = function () { var room = el.parentNode.clientWidth - el.offsetWidth - parseFloat(getComputedStyle(el).paddingLeft || 0) - 2;
      return Math.max(0, Math.min([64, 36, 52, 28][i] || 24, room)); };
    gsap.fromTo(el, { x: off }, { x: 0, ease: 'none', immediateRender: true,
      scrollTrigger: { trigger: el, start: 'top 98%', end: 'top 55%', scrub: 0.4, invalidateOnRefresh: true } });
  });
  gsap.fromTo('.spiral__line path', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none',
    scrollTrigger: { trigger: '.spiral', start: 'top 85%', end: 'bottom 55%', scrub: 0.4 } });

  // 4. T06: the white field grows from the rod's cross-section
  var gutPx = function () { var w = window.innerWidth; return w >= 1520 ? 64 : Math.max(16, w * 0.042); };
  var zin = function () { return Math.max(6, Math.min(gutPx() - 8, window.innerWidth * 0.045)); };
  gsap.fromTo('.zav', { clipPath: function () { return 'inset(0px ' + zin() + 'px 0px ' + zin() + 'px round 56px)'; } }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', ease: 'none',
    scrollTrigger: { trigger: '.zav', start: 'top 98%', end: 'top 25%', scrub: 0.4 } });

  // 5. echo: the rod is pulled out, the strand springs into a ringlet
  if (curl) {
    ST.create({ trigger: '#curl', start: 'top 72%', end: 'bottom 45%', scrub: 0.3,
      onUpdate: function (self) { curl.state.p = self.progress; curl.draw(); } });
  }

  // 6. the cape: the neckline straightens as the price list comes up
  gsap.fromTo('.cape', { scaleY: 1 }, { scaleY: 0, ease: 'none', scrollTrigger: { trigger: '.price', start: 'top 92%', end: 'top 38%', scrub: 0.4 } });

  // 7. stripes inside «Як нас знайти!?» twist from straight to the pole's helix
  gsap.fromTo('.word__stripes', { skewX: 0, x: 0 }, { skewX: -32, x: -136, svgOrigin: '500 190', ease: 'none',
    scrollTrigger: { trigger: '.find', start: 'top 85%', end: 'top 10%', scrub: 0.4 } });

  window.addEventListener('load', function () { buildSpiral(); ST.refresh(); });
})();
