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
      return { open: false, day: n.day, long: 'Зараз зачинено. Відчинять\u00a0сьогодні\u00a0о\u00a0' + hm(t[0]), short: 'Зачинено до ' + hm(t[0]), d1: 'Зачинено', d2: 'відчинять\u00a0о\u00a0' + hm(t[0]) };
    }
    for (var i = 1; i <= 7; i++) {
      var d = (n.day + i) % 7, x = HOURS[d];
      if (x) {
        var when = i === 1 ? 'завтра' : DAY_ACC[d];
        return { open: false, day: n.day, long: 'Зараз зачинено. Відчинять\u00a0' + when.replace(' ', '\u00a0') + '\u00a0о\u00a0' + hm(x[0]) /* рядок ламається лише після «зачинено.» */, short: 'Зачинено до ' + (i === 1 ? 'завтра' : DAY_SHORT[d]) + ' ' + hm(x[0]), d1: 'Зачинено', d2: (i === 1 ? 'завтра' : DAY_ACC[d]) + ' з ' + hm(x[0]) };
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

  /* ---------- шов першого екрана: наметку кладуть (d) і знімають, а голка шиє остаточний шов (s) ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  var swRoot = document.querySelector('.seamwork');
  var swLive = swRoot && swRoot.querySelector('.sw-live'), swChalk = swRoot && swRoot.querySelector('.sw-chalk');
  var GEO = {
    wide: { vb: [600, 800], d: 'M566 -40 C546 130 432 250 332 360 C224 478 142 566 134 690 L132 770',
      st: [30, 16], w: 4.4, nk: 1, lbl: 0.43, lo: 34, ticks: [0.26, 0.52, 0.76], allow: 24, lift: 1.15, fly: 0.25 }, /* ПК: стібки в польоті більші й далі — читаються на 1440 */
    phone: { vb: [400, 240], d: 'M432 26 C346 38 286 78 240 120 C194 162 130 198 44 212',
      st: [22, 12], w: 3.1, nk: 0.8, lbl: 0.47, lo: 24, ls: -1, ticks: [0.3, 0.64], allow: 18, lift: 0.75 },
    short: { vb: [400, 170], d: 'M432 18 C350 26 290 56 240 86 C190 116 128 142 44 152',
      st: [22, 12], w: 3.1, nk: 0.78, lbl: 0.5, lo: 20, ls: -1, ticks: [0.3, 0.66], allow: 16, lift: 0.6 }
  };
  var G = null, L = 0, PATH = null, stitches = [], SC = 1, NK = 1, lblLen = 0;
  var nd = swLive && swLive.querySelector('.nd'), ndSh = swLive && swLive.querySelector('.nd-shadow');
  var ndTail = swLive && swLive.querySelector('.nd-tail'), ndTailIn = swLive && swLive.querySelector('.nd-tail-in');
  var mk = swLive && swLive.querySelector('.sw-mk');
  var lblA = swLive && swLive.querySelector('.lbl-a'), lblB = swLive && swLive.querySelector('.lbl-b'), lead = swLive && swLive.querySelector('.sw-lead');
  var st = { d: 1, s: 0 };
  function el(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function smooth(e0, e1, x) { var t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); }
  function tan(len) { var a = PATH.getPointAtLength(clamp(len - 1.5, 0, L)), b = PATH.getPointAtLength(clamp(len + 1.5, 0, L)); var dx = b.x - a.x, dy = b.y - a.y, m = Math.hypot(dx, dy) || 1; return { x: dx / m, y: dy / m }; }
  function f1(v) { return v.toFixed(1); }

  function build() {
    if (!swLive) return;
    var mode = 'wide';
    if (window.innerWidth < 761) { var br = swRoot.getBoundingClientRect(); mode = br.width && br.height / br.width < 0.52 ? 'short' : 'phone'; }
    var par = mode === 'wide' ? 'xMidYMax meet' : 'xMidYMid meet';
    swLive.setAttribute('preserveAspectRatio', par); swChalk.setAttribute('preserveAspectRatio', par);
    if (G === GEO[mode] && L) { scale(); return; }
    G = GEO[mode];
    var vb = '0 0 ' + G.vb[0] + ' ' + G.vb[1];
    swLive.setAttribute('viewBox', vb); swChalk.setAttribute('viewBox', vb);
    swRoot.setAttribute('data-mode', mode);
    swRoot.querySelectorAll('.sw-path, .sq, .sw-mk, .ck-line').forEach(function (p) { p.setAttribute('d', G.d); });
    PATH = swLive.querySelector('.sw-path'); L = PATH.getTotalLength();
    /* крейда: лінія шва + припуск пунктиром + контрольні насічки (як на справжньому крої) */
    var allow = '', ticks = '';
    for (var a = 0; a <= L; a += 8) {
      var p = PATH.getPointAtLength(a), t = tan(a);
      allow += (a ? ' L' : 'M') + f1(p.x + t.y * G.allow) + ' ' + f1(p.y - t.x * G.allow);
    }
    G.ticks.forEach(function (f) {
      [0].forEach(function (o) {
        var p = PATH.getPointAtLength(f * L + o), t = tan(f * L + o), n = { x: -t.y, y: t.x };
        ticks += 'M' + f1(p.x + n.x * 11) + ' ' + f1(p.y + n.y * 11) + ' L' + f1(p.x - n.x * (G.allow + 9)) + ' ' + f1(p.y - n.y * (G.allow + 9)) + ' ';
      });
    });
    swChalk.querySelector('.ck-allow').setAttribute('d', allow);
    swChalk.querySelector('.ck-ticks').setAttribute('d', ticks);
    /* стібки наметки — кожен окремою ниткою: тінь і проколи на тканині, тіло, скрутка, відблиск */
    var gSh = swLive.querySelector('.sw-shadows'), gSt = swLive.querySelector('.sw-stitches');
    gSh.textContent = ''; gSt.textContent = ''; stitches = [];
    var per = G.st[0] + G.st[1], n = Math.floor((L - 24) / per), off = 12 + ((L - 24) - n * per + G.st[1]) / 2;
    for (var k = 0; k < n; k++) {
      var a0 = off + k * per, a1 = a0 + G.st[0], P0 = PATH.getPointAtLength(a0), P1 = PATH.getPointAtLength(a1);
      var mx = (P0.x + P1.x) / 2, my = (P0.y + P1.y) / 2, ang = Math.atan2(P1.y - P0.y, P1.x - P0.x), len = Math.hypot(P1.x - P0.x, P1.y - P0.y), h = len / 2;
      var line = 'M' + f1(-h) + ' 0 L' + f1(h) + ' 0';
      var sh = el('g', {}, gSh);
      var shp = el('path', { d: line, stroke: 'rgba(8,4,2,.5)', 'stroke-width': (G.w + 1.4).toFixed(1), 'stroke-linecap': 'round', fill: 'none' }, sh);
      var holes = el('g', { fill: 'rgba(8,4,2,.6)' }, sh);
      el('circle', { cx: f1(-h), cy: 0, r: (G.w * 0.6).toFixed(2) }, holes); el('circle', { cx: f1(h), cy: 0, r: (G.w * 0.6).toFixed(2) }, holes);
      var g = el('g', { fill: 'none', 'stroke-linecap': 'round' }, gSt);
      var body = el('path', { d: line, stroke: '#f3ede2', 'stroke-width': G.w }, g);
      var tw = el('path', { d: line, stroke: 'rgba(120,96,72,.18)', 'stroke-width': G.w, 'stroke-dasharray': '0.9 2.6', 'stroke-linecap': 'butt' }, g);
      var hl = el('path', { d: 'M' + f1(-h + 1.5) + ' ' + (-G.w * 0.24).toFixed(2) + ' L' + f1(h - 1.5) + ' ' + (-G.w * 0.24).toFixed(2), stroke: '#fff', 'stroke-width': (G.w * 0.3).toFixed(2), opacity: '.85' }, g);
      stitches.push({ a0: a0, a1: a1, mx: mx, my: my, ang: ang, h: h, len: len, sh: sh, shp: shp, holes: holes, g: g, body: body, tw: tw, hl: hl, k: k, curl: -1 });
    }
    lblLen = G.lbl * L;
    var lp = PATH.getPointAtLength(lblLen), lt = tan(lblLen), sg = G.ls || 1, ln = { x: lt.y * sg, y: -lt.x * sg }; /* ПК — бік від тексту; телефон — над швом, щоб голка не перекривала підпис */
    lead.setAttribute('d', 'M' + f1(lp.x + ln.x * 9) + ' ' + f1(lp.y + ln.y * 9) + ' L' + f1(lp.x + ln.x * (G.lo - 6)) + ' ' + f1(lp.y + ln.y * (G.lo - 6)));
    [lblA, lblB].forEach(function (t) { t.setAttribute('x', f1(lp.x + ln.x * G.lo)); t.setAttribute('y', f1(lp.y + ln.y * G.lo + 5)); t.setAttribute('text-anchor', ln.x < 0 ? 'end' : 'start'); });
    scale();
  }
  function scale() {
    if (!swLive) return;
    var r = swLive.getBoundingClientRect();
    SC = Math.min(r.width / G.vb[0], r.height / G.vb[1]); if (!(SC > 0)) SC = 1;
    NK = G.nk * clamp(118 / (150 * SC * G.nk), 1, 1.35); /* голка на екрані не коротша за ≈ 118 px */
    swLive.querySelector('.sw-lbl').setAttribute('font-size', Math.max(13.5 / SC, 13).toFixed(1));
  }

  function placeNeedle(pos, back, flip) {
    pos = clamp(pos, 0, L);
    var p = PATH.getPointAtLength(pos), t = tan(pos), ang = Math.atan2(t.y, t.x) * 180 / Math.PI + 180 * flip;
    /* голка пірнає під тканину між стібками: тінь ближча, коли вістря внизу */
    var per = G.st[0] + G.st[1], ph = (((pos - (stitches[0] ? stitches[0].a0 : 0)) % per) + per) % per / per;
    var depth = 0.62 + 0.38 * Math.cos(ph * Math.PI * 2);
    var tr = ' rotate(' + f1(ang) + ') scale(' + NK.toFixed(3) + ')';
    nd.setAttribute('transform', 'translate(' + f1(p.x) + ' ' + f1(p.y) + ')' + tr);
    ndSh.setAttribute('transform', 'translate(' + f1(p.x + 2.4 * depth / SC * 0.9) + ' ' + f1(p.y + 3.8 * depth / SC * 0.9) + ')' + tr);
    var col = back ? '#d29a62' : '#f3ede2';
    ndTail.setAttribute('stroke', col); ndTailIn.setAttribute('stroke', col);
  }

  function render() {
    if (!L) return;
    var RL = 130 * G.lift + 30; /* відстань, на якій стібок відлітає */
    var intro = st.s <= 0, head = intro ? clamp(st.d * L, 0, L) : (L + RL) * (1 - st.s) - RL;
    for (var i = 0; i < stitches.length; i++) {
      var s = stitches[i], txf = 'translate(' + f1(s.mx) + ' ' + f1(s.my) + ') rotate(' + f1(s.ang * 180 / Math.PI) + ')';
      if (intro) {
        /* голка кладе стібок: нитка росте від проколу до вістря */
        var grow = clamp(head - s.a0, 0, s.len), done = grow >= s.len ? 1 : 0;
        var dash = grow >= s.len ? 'none' : (grow.toFixed(1) + ' 999');
        s.g.setAttribute('transform', txf); s.g.style.opacity = grow > 0 ? '1' : '0';
        s.body.setAttribute('stroke-dasharray', dash); s.hl.setAttribute('stroke-dasharray', dash); s.shp.setAttribute('stroke-dasharray', dash);
        s.tw.style.opacity = done; s.holes.style.opacity = done;
        s.sh.setAttribute('transform', txf + ' translate(' + f1(1.6 * Math.cos(-s.ang) - 2.4 * Math.sin(-s.ang)) + ' ' + f1(1.6 * Math.sin(-s.ang) + 2.4 * Math.cos(-s.ang)) + ')');
        s.shp.style.opacity = grow > 0 ? '1' : '0';
        if (s.curl !== 0) { s.body.setAttribute('d', 'M' + f1(-s.h) + ' 0 L' + f1(s.h) + ' 0'); s.tw.setAttribute('d', 'M' + f1(-s.h) + ' 0 L' + f1(s.h) + ' 0'); s.curl = 0; }
      } else {
        /* голка повертається вгору: щойно вона минає стібок, той відривається від тканини й злітає */
        var t = clamp((s.a1 - head) / RL, 0, 1), e = t * t * (3 - 2 * t);
        var tg = tan((s.a0 + s.a1) / 2), side = s.k % 2 ? 1 : -1;
        var dx = (-tg.x * 70 - tg.y * 22 * side) * G.lift * e, dy = (-tg.y * 70 + tg.x * 22 * side) * G.lift * e - 34 * G.lift * e * e;
        s.g.setAttribute('transform', 'translate(' + f1(s.mx + dx) + ' ' + f1(s.my + dy) + ') rotate(' + f1(s.ang * 180 / Math.PI + side * 24 * e) + ') scale(' + (1 + (G.fly || 0.1) * e).toFixed(3) + ')');
        s.g.style.opacity = (1 - smooth(0.62, 1, t)).toFixed(3);
        ['body', 'hl', 'shp'].forEach(function (k) { s[k].setAttribute('stroke-dasharray', 'none'); });
        s.tw.style.opacity = 1;
        var c = (side * 9 * e).toFixed(2), dc = 'M' + f1(-s.h) + ' 0 Q0 ' + c + ' ' + f1(s.h) + ' 0';
        if (s.curl !== +c) { s.body.setAttribute('d', dc); s.tw.setAttribute('d', dc); s.curl = +c; }
        /* тінь лишається на тканині, відходить і тане; проколи гаснуть повільніше */
        var ox = 1.6 + 7 * e, oy = 2.4 + 11 * e;
        s.sh.setAttribute('transform', txf + ' translate(' + f1(ox * Math.cos(-s.ang) - oy * Math.sin(-s.ang)) + ' ' + f1(ox * Math.sin(-s.ang) + oy * Math.cos(-s.ang)) + ')');
        s.shp.style.opacity = (1 - smooth(0, 0.6, t)).toFixed(3);
        s.holes.style.opacity = (1 - 0.7 * smooth(0.2, 1, t)).toFixed(3);
      }
    }
    /* остаточний шов відкривається за голкою */
    var hm = clamp(head, 0, L);
    mk.setAttribute('stroke-dasharray', intro ? '0 ' + (L + 200).toFixed(0) : ('0 ' + hm.toFixed(1) + ' ' + (L - hm + 2).toFixed(1) + ' ' + (L + 200).toFixed(0)));
    var flip = intro ? 0 : smooth(0, 0.07, st.s);
    var onStage = intro ? head > 2 : head > 1;
    nd.style.opacity = ndSh.style.opacity = onStage ? '1' : '0';
    if (onStage) placeNeedle(head, !intro, flip);
    /* підпис: «наметка» зʼявляється, коли голка минула його; «остаточний шов» — коли шов дійшов до нього */
    var la = intro ? smooth(lblLen + 10, lblLen + 60, head) : 1;
    var kb = intro ? 0 : smooth(lblLen + 20, lblLen - 30, head);
    lblA.style.opacity = (la * (1 - kb)).toFixed(2); lblB.style.opacity = kb.toFixed(2); lead.style.opacity = (0.7 * Math.max(la, kb)).toFixed(2);
  }
  function heroTop() {
    var h = document.querySelector('.hero'); if (!h) return;
    doc.style.setProperty('--hero-top', Math.min(0, window.innerHeight - h.offsetHeight) + 'px');
  }
  heroTop(); build(); render();
  window.addEventListener('resize', function () { heroTop(); build(); render(); });

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

    /* інтро першого екрана */
    st.d = 0; render();
    var tl = gsap.timeline({ defaults: { ease: EXPO } });
    tl.fromTo('.hero h1 .ln > span', { yPercent: 105, y: 0 }, { yPercent: 0, y: 0, duration: 0.9, stagger: 0.12 }, 0.05)
      .fromTo('.sw-chalk', { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power1.out' }, 0.1)
      .fromTo('.kicker', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6 }, 0.12)
      .fromTo('.hero-lede', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
      .fromTo('.hero-act', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.47)
      .fromTo('.dock', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
      .set('.sw-live', { visibility: 'visible' }, 0.4);
    /* голка кладе наметку: рівний темп кравчині з м'яким стартом і зупинкою */
    var draw = gsap.to(st, { d: 1, duration: 2.1, ease: 'power1.inOut', delay: 0.4, onUpdate: render });

    /* наметку знімають прокруткою: голка йде назад угору й шиє остаточний шов; власне згладжування (без ривка, коли
       гортають під час інтро — інтро тоді прискорюється й передає естафету) */
    var sTarget = 0;
    var WIDE = window.innerWidth >= 1024;
    /* ПК: довше згладжування — стібки летять ще ≈ 1 с після зупинки колеса */
    var sTo = gsap.quickTo(st, 's', { duration: WIDE ? 1.0 : 0.7, ease: 'power3.out', onUpdate: render });
    draw.eventCallback('onComplete', function () { sTo(sTarget); });
    window.ScrollTrigger.create({
      trigger: stage, start: 0,
      end: function () { return stage.offsetTop + stage.offsetHeight - window.innerHeight; },
      onUpdate: function (self) {
        heroIn.style.transform = 'translate3d(0,' + (-24 * self.progress).toFixed(2) + 'px,0)';
        sTarget = Math.min(1, self.progress / (WIDE ? 0.6 : 0.82)); /* ПК: політ завершується на 60 % закріплення */
        if (draw.isActive()) { if (sTarget > 0.001) draw.timeScale(4); return; }
        sTo(sTarget);
      }
    });

    /* перехід 1: шов між вовною й папером */
    var sw = { p: 0 }, seamLine = document.querySelector('.seam-line'), seamNeedle = document.querySelector('.seam-needle'), seamEdge = document.querySelector('.seam-edge');
    function sew() {
      seamLine.style.clipPath = 'inset(0 ' + (100 - sw.p * 100).toFixed(2) + '% 0 0)';
      /* вістря йде за швом; svg голки (78 px) не виходить за межі смуги — інакше розширює сторінку на телефоні */
      var sew_w = seamEdge.clientWidth, sx = Math.min(sw.p * sew_w - 94, sew_w - 96);
      seamNeedle.style.transform = 'translateX(' + sx.toFixed(1) + 'px)';
      seamNeedle.style.opacity = (sw.p > 0.01 && sw.p < 0.985 ? 1 : 0);
    }
    sew();
    gsap.to(sw, { p: 1, ease: 'none', onUpdate: sew,
      scrollTrigger: { trigger: '.paper', start: 'top 92%', end: 'top 45%', scrub: 0.5 } });

    /* перехід 2: ножиці-зигзаг */
    var pk = { c: 0 }, uncut = document.querySelector('.pk-uncut'), shears = document.querySelector('.shears'), pinking = document.querySelector('.pinking');
    function cut() {
      uncut.style.clipPath = 'inset(0 0 0 ' + pk.c.toFixed(2) + '%)';
      var w = pinking.clientWidth, x = Math.min(w * pk.c / 100 - 30, w - 56); /* ножиці (56 px) не виходять за правий край */
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
