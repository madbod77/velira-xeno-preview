/* Anna Atelier & Studio — концепт Velira. Графік (з біо ательє) + рух «Наметку висмикують». */
(function () {
  'use strict';
  var doc = document.documentElement;

  /* ---------- графік: Пн–Пт 10:00–19:30, Сб 11:00–17:00, Нд вихідний (біо @anna__atelier) ---------- */
  var HOURS = { 1: [600, 1170], 2: [600, 1170], 3: [600, 1170], 4: [600, 1170], 5: [600, 1170], 6: [660, 1020], 0: null };
  var DAY_ACC = ['у неділю', 'у понеділок', 'у вівторок', 'у середу', 'у четвер', 'у п’ятницю', 'у суботу'];
  var DAY_SHORT = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  function hm(m) { var h = Math.floor(m / 60), mm = m % 60; return h + ':' + (mm < 10 ? '0' : '') + mm; }
  function kyivNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Kyiv', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
      var wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday);
      var h = parseInt(o.hour, 10) % 24, m = parseInt(o.minute, 10);
      if (wd < 0 || isNaN(h) || isNaN(m)) return null;
      return { day: wd, min: h * 60 + m };
    } catch (e) { return null; }
  }
  function status() {
    var n = kyivNow(); if (!n) return null;
    var t = HOURS[n.day];
    if (t && n.min >= t[0] && n.min < t[1]) {
      return { open: true, day: n.day, long: 'Зараз відчинено, до ' + hm(t[1]), short: 'Відчинено до ' + hm(t[1]), d1: 'Відчинено', d2: 'сьогодні до ' + hm(t[1]) };
    }
    if (t && n.min < t[0]) {
      return { open: false, day: n.day, long: 'Зараз зачинено. Відчинять сьогодні о ' + hm(t[0]), short: 'Зачинено до ' + hm(t[0]), d1: 'Зачинено', d2: 'відчинять о ' + hm(t[0]) };
    }
    for (var i = 1; i <= 7; i++) {
      var d = (n.day + i) % 7, x = HOURS[d];
      if (x) {
        var when = i === 1 ? 'завтра' : DAY_ACC[d];
        return { open: false, day: n.day, long: 'Зараз зачинено. Відчинять ' + when + ' о ' + hm(x[0]), short: 'Зачинено до ' + (i === 1 ? 'завтра' : DAY_SHORT[d]) + ' ' + hm(x[0]), d1: 'Зачинено', d2: (i === 1 ? 'завтра' : DAY_ACC[d]) + ' з ' + hm(x[0]) };
      }
    }
    return null;
  }
  function paintStatus() {
    var s = status(); if (!s) return;
    var flag = s.open ? '1' : '0';
    document.querySelectorAll('[data-status]').forEach(function (el) { el.textContent = s.short; });
    document.querySelectorAll('[data-status-long]').forEach(function (el) { el.textContent = s.long; });
    document.querySelectorAll('[data-ds1]').forEach(function (el) { el.textContent = s.d1; });
    document.querySelectorAll('[data-ds2]').forEach(function (el) { el.textContent = s.d2; });
    document.querySelectorAll('.status, .now, .dock-st').forEach(function (el) { el.setAttribute('data-open', flag); });
    document.querySelectorAll('.days [data-day]').forEach(function (el) {
      if (+el.getAttribute('data-day') === s.day) el.setAttribute('data-today', ''); else el.removeAttribute('data-today');
    });
  }
  paintStatus();
  setInterval(paintStatus, 60000);

  /* ---------- нитка: малювання (d) і висмикування (s) ---------- */
  var thread = document.querySelector('.lapel .thread');
  var mkThread = document.querySelector('.lapel .mk-thread');
  var mkSeam = document.querySelector('.lapel .mk-seam');
  var needle = document.querySelector('.lapel .needle');
  var flies = Array.prototype.slice.call(document.querySelectorAll('.lapel .fly .fl'));
  var lblG = document.querySelector('.lapel .lbl');
  var lapelSvg = document.querySelector('.lapel');
  function needleScale() { var h = lapelSvg ? lapelSvg.getBoundingClientRect().height : 900; var px = 134 * h / 900; return px > 0 && px < 72 ? 72 / px : 1; }
  var NK = 1, SC = 1;
  function measure() {
    NK = needleScale();
    SC = lapelSvg ? lapelSvg.getBoundingClientRect().height / 900 : 1; if (!(SC > 0)) SC = 1;
    var mob = window.innerWidth < 761, wpx = mob ? 6 : 7;
    flies.forEach(function (g) {
      g.querySelector('.fc').setAttribute('stroke-width', (wpx / SC / NK).toFixed(2));
      g.querySelector('.fh').setAttribute('stroke-width', ((wpx + 2) / SC / NK).toFixed(2));
    });
    if (lblG) lblG.setAttribute('font-size', Math.max(22, 13 / SC).toFixed(1)); /* підпис не менше 13 px на екрані */
  }
  measure();
  window.addEventListener('resize', function () { measure(); render(); });
  var L = thread ? thread.getTotalLength() : 0;
  var st = { d: 1, s: 0 };
  function render() {
    if (!L) return;
    var NL = 118, needleAt, back = false;
    if (st.s <= 0) {
      /* інтро: голка йде згори вниз, нитка тягнеться за вушком */
      var b = Math.max(st.d * L, 0), tEnd = Math.max(0, b - NL);
      mkThread.setAttribute('stroke-dasharray', tEnd.toFixed(1) + ' ' + (L + 40).toFixed(0));
      thread.setAttribute('stroke-dashoffset', '0');
      mkSeam.setAttribute('stroke-dasharray', '0 ' + (L + 40).toFixed(0));
      needleAt = Math.min(Math.max(b, 2), L);
    } else {
      /* висмикування: наметку тягнуть за хвіст угору — стібки ковзають до верхнього кінця й вилітають,
         голка повертається вгору на голові нитки й лишає за собою остаточний шов */
      var a = st.s * L, head = L - a;
      mkThread.setAttribute('stroke-dasharray', Math.max(head, 0).toFixed(1) + ' ' + (L + 40).toFixed(0));
      thread.setAttribute('stroke-dashoffset', a.toFixed(1));
      mkSeam.setAttribute('stroke-dasharray', '0 ' + head.toFixed(1) + ' ' + a.toFixed(1) + ' ' + (L + 40).toFixed(0));
      needleAt = Math.min(Math.max(head, 2), L); back = true;
    }
    var p = thread.getPointAtLength(needleAt), q = thread.getPointAtLength(Math.max(needleAt - 3, 0));
    var ang = Math.atan2(p.y - q.y, p.x - q.x) * 180 / Math.PI + (back ? 180 : 0);
    needle.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') rotate(' + ang.toFixed(1) + ') scale(' + NK.toFixed(2) + ')');
    /* три стібки в польоті: вилітають з тканини там, де голка (голова нитки), вперед за її вістрям */
    var live = st.s > 0.004 && st.s < 0.995;
    var hd = Math.min(Math.max(L - st.s * L, 4), L), H0 = thread.getPointAtLength(hd), H1 = thread.getPointAtLength(hd - 4);
    var ea = Math.atan2(H1.y - H0.y, H1.x - H0.x), ex = Math.cos(ea), ey = Math.sin(ea);
    var env = Math.min(1, (st.s - 0.004) * 40) * Math.min(1, (0.995 - st.s) * 40);
    flies.forEach(function (ln, k) {
      if (!live || k > 2) { ln.style.opacity = '0'; return; }
      var ph = ((st.s * L / 30) + k / 3) % 1, dist = (24 + ph * 126) / SC, side = (k === 1 ? 1 : -1) * ph * 26 / SC;
      ln.setAttribute('transform', 'translate(' + (H0.x + ex * dist - ey * side).toFixed(1) + ' ' + (H0.y + ey * dist + ex * side).toFixed(1) + ') rotate(' + (ea * 180 / Math.PI + (k === 1 ? 1 : -1) * (20 + ph * 40)).toFixed(1) + ') scale(' + NK.toFixed(2) + ')');
      ln.style.opacity = ((ph < 0.75 ? 1 : (1 - ph) / 0.25) * env).toFixed(2);
    });
  }
  render();

  /* ---------- рух ---------- */
  if (!doc.classList.contains('motion')) return;
  if (!window.gsap || !window.ScrollTrigger) { doc.classList.remove('motion'); return; }
  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  var mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', function () {
    var EXPO = 'expo.out';
    var hero = document.querySelector('.hero');
    var stage = document.querySelector('.hero-stage');
    var heroIn = document.querySelector('.hero-in');
    var lblA = document.querySelector('.lapel .lbl-a'), lblB = document.querySelector('.lapel .lbl-b');

    /* інтро першого екрана */
    st.d = 0; render();
    var tl = gsap.timeline({ defaults: { ease: EXPO } });
    tl.fromTo('.hero h1 .ln > span', { yPercent: 105, y: 0 }, { yPercent: 0, y: 0, duration: 0.9, stagger: 0.12 }, 0.05)
      .fromTo('.hero .chalk', { opacity: 0 }, { opacity: 0.55, duration: 0.6, ease: 'power1.out' }, 0.15)
      .fromTo('.kicker', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6 }, 0.12)
      .fromTo('.hero-lede', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
      .fromTo('.hero-act', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.47)
      .fromTo('.dock', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
      .set('.hero .needle, .hero .thread', { visibility: 'visible' }, 0.45)
      .fromTo('.lapel .lbl', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 1.5);
    var draw = gsap.to(st, { d: 1, duration: 1.4, ease: 'power2.inOut', delay: 0.45, onUpdate: render });

    /* висмикування наметки прокруткою */
    window.ScrollTrigger.create({
      trigger: stage, start: 0,
      end: function () { return stage.offsetTop + stage.offsetHeight - window.innerHeight; },
      scrub: 0.5,
      onUpdate: function (self) {
        if (self.progress > 0.002 && draw.isActive()) { draw.progress(1); }
        heroIn.style.transform = 'translate3d(0,' + (-24 * self.progress).toFixed(2) + 'px,0)';
        st.s = Math.min(1, self.progress / 0.55); render();
        var k = Math.min(Math.max((st.s - 0.55) / 0.25, 0), 1);
        lblA.style.opacity = (1 - k).toFixed(2); lblB.style.opacity = k.toFixed(2);
      }
    });

    /* перехід 1: шов між вовною й папером */
    var sw = { p: 0 }, seamLine = document.querySelector('.seam-line'), seamNeedle = document.querySelector('.seam-needle'), seamEdge = document.querySelector('.seam-edge');
    function sew() {
      seamLine.style.clipPath = 'inset(0 ' + (100 - sw.p * 100).toFixed(2) + '% 0 0)';
      seamNeedle.style.transform = 'translateX(' + (sw.p * seamEdge.clientWidth - 72).toFixed(1) + 'px)';
      seamNeedle.style.opacity = (sw.p > 0.01 && sw.p < 0.985 ? 1 : 0);
    }
    sew();
    gsap.to(sw, { p: 1, ease: 'none', onUpdate: sew,
      scrollTrigger: { trigger: '.paper', start: 'top 92%', end: 'top 45%', scrub: 0.5 } });

    /* перехід 2: ножиці-зигзаг */
    var pk = { c: 0 }, uncut = document.querySelector('.pk-uncut'), shears = document.querySelector('.shears'), pinking = document.querySelector('.pinking');
    function cut() {
      uncut.style.clipPath = 'inset(0 0 0 ' + pk.c.toFixed(2) + '%)';
      var w = pinking.clientWidth, x = w * pk.c / 100 - 30;
      var o = pk.c < 3 ? pk.c / 3 : (pk.c > 97 ? (100 - pk.c) / 3 : 1);
      shears.style.transform = 'translateX(' + x.toFixed(1) + 'px)';
      shears.style.opacity = o.toFixed(2);
    }
    cut();
    gsap.to(pk, { c: 100, ease: 'none', onUpdate: cut,
      scrollTrigger: { trigger: '.works', start: 'top 95%', end: 'top 35%', scrub: 0.5 } });

    /* перехід 3: рулон розгортається */
    var benchClip = document.querySelector('.bench-clip');
    var roll = gsap.timeline({ scrollTrigger: { trigger: '.band', start: 'top 92%', end: 'top 30%', scrub: 0.5 } });
    roll.fromTo(benchClip, { clipPath: 'inset(0% 0% 100% 0% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'none', duration: 1 }, 0)
      .fromTo('.fold', { y: 0 }, { y: function () { return benchClip.offsetHeight - 3; }, ease: 'none', duration: 1 }, 0)
      .fromTo('.fold', { opacity: 0 }, { opacity: 1, duration: 0.06, ease: 'none' }, 0.02)
      .to('.fold', { opacity: 0, duration: 0.12, ease: 'none' }, 0.88);

    /* перехід 4: кремовий відріз розкладається */
    var side = window.innerWidth < 761 ? 3 : 6;
    gsap.fromTo('.where-field', { clipPath: 'inset(0% ' + side + '% 0% ' + side + '% round 40px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: '.where', start: 'top 95%', end: 'top 25%', scrub: 0.5 }
    });

    /* проява блоків нижче першого екрана: прозорість + 14 px, нерівний спадний стагер */
    var els = gsap.utils.toArray('main section:not(.hero) [data-reveal]');
    gsap.set(els, { opacity: 0, y: 14 });
    var STEP = [0, 0.09, 0.15, 0.19, 0.22, 0.24];
    window.ScrollTrigger.batch(els, {
      start: 'top 86%', once: true,
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: EXPO, overwrite: true,
          stagger: function (i) { return STEP[Math.min(i, STEP.length - 1)]; } });
      }
    });

    return function () { st.d = 1; st.s = 0; render(); };
  });
})();
