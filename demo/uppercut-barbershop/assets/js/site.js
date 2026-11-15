/* Uppercut Barbershop — концепт Velira. Фірмовий момент: «Апперкот машинкою» (canvas 2D, власний код). */
(function () {
  'use strict';
  var d = document.documentElement;
  var MOTION = d.classList.contains('motion');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var hasG = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  if (hasG) gsap.registerPlugin(ScrollTrigger);

  /* ---------- години: поточний час Києва на лінійці 10–20 ---------- */
  var nowP = 0;
  (function hours() {
    try {
      var f = new Intl.DateTimeFormat('uk-UA', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
      var parts = f.format(new Date()).split(':');
      var h = +parts[0], m = +parts[1]; if (isNaN(h) || isNaN(m)) return;
      var t = h + m / 60, pad = function (n) { return (n < 10 ? '0' : '') + n; };
      var now = pad(h) + ':' + pad(m), open = t >= 10 && t < 20;
      var txt = $('#hoursT'), dot = $('#nowDot');
      if (open) {
        var left = 20 - t, lh = Math.floor(left), lm = Math.round((left - lh) * 60);
        if (lm === 60) { lh += 1; lm = 0; }
        txt.textContent = 'У Києві ' + now + '. Якщо сьогодні робочий день — до 20:00 ще ' + (lh ? lh + ' год ' : '') + lm + ' хв. Вихідні уточнюємо; лише по запису.';
      } else {
        txt.textContent = 'У Києві ' + now + '. Графік — 10:00–20:00, по запису. Вихідні уточнюємо.';
      }
      nowP = Math.min(1, Math.max(0, (t - 10) / 10));
      dot.style.setProperty('--p', nowP.toFixed(4));
      if (!open) dot.classList.add('off');
      d.classList.add('has-now');
    } catch (e) { /* лишається статичний текст */ }
  })();

  /* ---------- seeded random ---------- */
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  /* ---------- «Апперкот машинкою» ---------- */
  var word = $('#word'), cv = $('#fadeCv'), blade = $('#blade');
  var G = null;               // геометрія
  var S = { c: 1e9 };         // позиція леза (px у системі canvas), анімується
  var scrollP = 0, handP = 0;
  var parts = [], lastCut = null, rafOn = false, heroVisible = true, introDone = false;
  var PART_MAX = window.innerWidth < 700 ? 34 : 64;

  function makeStrip(Fcss, dpr) {
    var c = document.createElement('canvas');
    var w = Math.round(640 * dpr), h = Math.max(4, Math.round(Fcss * dpr));
    c.width = w; c.height = h;
    var g = c.getContext('2d'), r = rng(77);
    var gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, 'rgba(11,11,12,.96)'); gr.addColorStop(0.12, 'rgba(11,11,12,.72)');
    gr.addColorStop(0.42, 'rgba(11,11,12,.16)'); gr.addColorStop(1, 'rgba(11,11,12,0)');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.lineCap = 'round';
    var n = Math.round((640 * Fcss) / 7);
    for (var i = 0; i < n; i++) {
      var y = r() * h, t = y / h;
      if (r() < t * 0.7) continue;                       // донизу рідше
      var x = r() * w;
      var L = (1.1 + Math.pow(1 - t, 1.5) * 15) * dpr * (0.55 + r() * 0.7);
      var a = (-90 + (r() - 0.5) * 30) * Math.PI / 180;
      g.strokeStyle = 'rgba(11,11,12,' + (0.5 + r() * 0.45).toFixed(2) + ')';
      g.lineWidth = (0.85 + r() * 0.8) * dpr;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); g.stroke();
    }
    return c;
  }
  function makeSkin(dpr) {
    var c = document.createElement('canvas'), s = Math.round(140 * dpr);
    c.width = s; c.height = s;
    var g = c.getContext('2d'), r = rng(19);
    g.lineCap = 'round';
    for (var i = 0; i < 520; i++) {
      var x = r() * s, y = r() * s, L = (0.4 + r() * 1.6) * dpr, a = (-90 + (r() - 0.5) * 40) * Math.PI / 180;
      g.strokeStyle = 'rgba(11,11,12,' + (0.28 + r() * 0.34).toFixed(2) + ')';
      g.lineWidth = (0.8 + r() * 0.6) * dpr;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); g.stroke();
    }
    return c;
  }

  function build() {
    var lns = $$('.ln', word); if (!lns.length || !cv.getContext) return null;
    var wr = word.getBoundingClientRect();
    var fs = parseFloat(getComputedStyle(lns[0]).fontSize);
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var padTop = Math.round(fs * 0.3), padBot = Math.round(fs * 0.85);
    var W = Math.ceil(wr.width), H = Math.ceil(wr.height) + padTop + padBot;
    cv.style.left = '0px'; cv.style.top = (-padTop) + 'px'; cv.style.width = W + 'px'; cv.style.height = H + 'px';
    cv.style.display = 'block';
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    var font = '800 ' + fs + 'px "UC Display"';
    var mc0 = document.createElement('canvas').getContext('2d'); mc0.font = font;
    var mt = mc0.measureText('UPPERCUT');
    var asc = mt.fontBoundingBoxAscent || fs * 0.93, capA = mt.actualBoundingBoxAscent || fs * 0.713;
    var lines = lns.map(function (el) {
      var rg = document.createRange(); rg.selectNodeContents(el);
      var b = rg.getBoundingClientRect();
      return { text: el.textContent, x: b.left - wr.left, base: b.top - wr.top + asc + padTop };
    });
    var mask = document.createElement('canvas'); mask.width = cv.width; mask.height = cv.height;
    var mc = mask.getContext('2d'); mc.scale(dpr, dpr); mc.font = font; mc.textBaseline = 'alphabetic'; mc.fillStyle = '#000';
    lines.forEach(function (l) { mc.fillText(l.text, l.x, l.base); });
    var last = lines[lines.length - 1], first = lines[0];
    var bottom = last.base, top = first.base - capA;
    var final, steps;
    if (lines.length > 1 && Math.abs(last.base - first.base) > 4) {   // телефон: UPPER / CUT
      final = last.base - capA - fs * 0.05;
      steps = [last.base - capA * 0.36, last.base - capA * 0.72, final];
    } else {
      final = bottom - capA * 0.45;
      steps = [bottom - capA * 0.17, bottom - capA * 0.32, final];
    }
    var F = (bottom - final) + 2;
    var work = document.createElement('canvas'); work.width = cv.width; work.height = cv.height;
    var ctx = cv.getContext('2d'), wc = work.getContext('2d');
    var skin = makeSkin(dpr);
    return {
      fs: fs, dpr: dpr, W: W, H: H, padTop: padTop, lines: lines, mask: mask, mc: mc, ctx: ctx, work: work, wc: wc,
      strip: makeStrip(F, dpr), skinPat: wc.createPattern(skin, 'repeat'), top: top - 3, bottom: bottom, final: final,
      steps: steps, start: bottom + fs * 0.12, eraseTo: bottom + fs * 0.05, capA: capA
    };
  }

  function cutNow() {
    if (!G) return 1e9;
    var c = S.c;
    if (scrollP > 0.002) c = Math.min(c, G.final + (G.top - G.final) * scrollP);
    return c;
  }

  function spawn(fromCut, toCut) {
    if (!G || parts.length > PART_MAX) return;
    var dpr = G.dpr, y = Math.round(toCut * dpr);
    if (y < 0 || y >= G.mask.height) return;
    var row; try { row = G.mc.getImageData(0, y, G.mask.width, 1).data; } catch (e) { return; }
    var xs = [];
    for (var x = 0; x < G.mask.width; x += 3) if (row[x * 4 + 3] > 40) xs.push(x / dpr);
    if (!xs.length) return;
    var k = Math.min(10, Math.max(1, Math.round((fromCut - toCut) / 3)));
    for (var i = 0; i < k && parts.length < PART_MAX; i++) {
      var px = xs[(Math.random() * xs.length) | 0];
      parts.push({ x: px, y: toCut + 2, vx: (Math.random() - 0.5) * 70, vy: -(30 + Math.random() * 110),
        a: (Math.random() - 0.5) * 1.2 - Math.PI / 2, va: (Math.random() - 0.5) * 9, L: 3 + Math.random() * 7, t: 0, life: 0.9 + Math.random() * 0.45 });
    }
  }

  var lastT = 0;
  function frame(ts) {
    rafOn = false;
    if (!G) return;
    var dt = lastT ? Math.min(0.05, (ts - lastT) / 1000) : 0.016; lastT = ts;
    var cut = cutNow();
    if (MOTION && lastCut !== null && cut < lastCut - 0.5 && !introDone) spawn(lastCut, cut);
    lastCut = cut;
    draw(cut, dt);
    blade.style.transform = 'translate3d(0,' + (Math.min(cut, G.start) - G.padTop).toFixed(2) + 'px,0)';
    if (introDone && MOTION) blade.style.opacity = Math.max(0, 1 - handP * 5).toFixed(3);
    if (parts.length || !introDone) kick();
  }
  function kick() { if (!rafOn && heroVisible) { rafOn = true; requestAnimationFrame(frame); } }

  function draw(cut, dt) {
    var c = G.ctx, w = G.wc, dpr = G.dpr;
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height);
    if (cut < G.eraseTo) {
      var cy = Math.max(0, Math.round(cut * dpr));
      w.globalCompositeOperation = 'source-over'; w.clearRect(0, 0, cv.width, cv.height);
      for (var x = 0; x < cv.width; x += G.strip.width) w.drawImage(G.strip, x, cy);
      var sy = cy + G.strip.height;
      if (sy < cv.height) { w.fillStyle = G.skinPat; w.fillRect(0, sy, cv.width, cv.height - sy); }
      w.globalCompositeOperation = 'destination-in'; w.drawImage(G.mask, 0, 0); w.globalCompositeOperation = 'source-over';
      c.fillStyle = '#ffffff'; c.fillRect(0, cy, cv.width, Math.round(G.eraseTo * dpr) - cy + 2);
      c.drawImage(G.work, 0, 0);
    }
    if (parts.length) {
      c.setTransform(dpr, 0, 0, dpr, 0, 0); c.lineCap = 'round'; c.lineWidth = 1.2;
      for (var i = parts.length - 1; i >= 0; i--) {
        var p = parts[i]; p.t += dt;
        if (p.t > p.life) { parts.splice(i, 1); continue; }
        p.vy += 820 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.a += p.va * dt;
        if (p.y > G.eraseTo + 30) p.t += dt * 4;
        var al = 1 - Math.pow(p.t / p.life, 2);
        c.strokeStyle = 'rgba(11,11,12,' + (0.85 * al).toFixed(3) + ')';
        c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x + Math.cos(p.a) * p.L, p.y + Math.sin(p.a) * p.L); c.stroke();
      }
    }
  }

  function startFade() {
    G = build(); if (!G) return;
    if (!MOTION || !hasG) {
      S.c = G.final; introDone = true; lastCut = G.final;
      draw(G.final, 0);
      blade.style.transform = 'translate3d(0,' + (G.final - G.padTop).toFixed(2) + 'px,0)';
      return;
    }
    S.c = G.start; lastCut = S.c;
    blade.style.transform = 'translate3d(0,' + (G.start - G.padTop) + 'px,0)';
    var teeth = $('.teeth', blade);
    var tl = gsap.timeline({ delay: 0.26, onUpdate: kick, onComplete: function () { introDone = true; kick(); } });
    tl.to(blade, { autoAlpha: 1, duration: 0.15, ease: 'power1.out' }, 0);
    var at = 0;
    G.steps.forEach(function (y, i) {
      var over = G.fs * (i === G.steps.length - 1 ? 0.03 : 0.05);
      tl.to(S, { c: y - over, duration: 0.36, ease: 'power3.out' }, at);
      tl.to(S, { c: y, duration: 0.26, ease: 'power2.inOut' }, at + 0.36);
      at += 0.36 + 0.26 + 0.08;
    });
    tl.to(teeth, { autoAlpha: 0, duration: 0.3, ease: 'power1.out' }, at - 0.02);
    kick();

    ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom top',
      onUpdate: function (self) { scrollP = self.progress; if (scrollP > 0.002 && !introDone) { tl.progress(1); } kick(); } });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { heroVisible = es[0].isIntersecting; if (heroVisible) kick(); }, { rootMargin: '80px' }).observe(word);
    }
  }

  function initFade() {
    var go = function () { try { startFade(); } catch (e) { /* слово лишається суцільним */ } };
    if (document.fonts && document.fonts.load) {
      Promise.race([document.fonts.load('800 100px "UC Display"', 'UPPERCUT'), new Promise(function (r) { setTimeout(r, 1500); })]).then(go, go);
    } else go();
    var lw = window.innerWidth, to;
    window.addEventListener('resize', function () {
      if (Math.abs(window.innerWidth - lw) < 2) return;
      lw = window.innerWidth; clearTimeout(to);
      to = setTimeout(function () { var keep = S.c, wasDone = introDone; var n = build(); if (!n) return; G = n;
        if (wasDone) S.c = G.final; else S.c = Math.max(keep, G.final);
        lastCut = cutNow(); draw(cutNow(), 0); blade.style.transform = 'translate3d(0,' + (Math.min(cutNow(), G.start) - G.padTop) + 'px,0)'; }, 160);
    });
  }
  initFade();

  // нижня панель ховається над підвалом (і над маршрутом без сцени)
  (function () {
    if (!('IntersectionObserver' in window)) return;
    var foot = $('.foot'), rt = $('#route'), onFoot = false, onRoute = false;
    var upd = function () { if (onFoot || (onRoute && !d.classList.contains('stage-on'))) d.classList.add('dock-off'); else if (!d.classList.contains('stage-on')) d.classList.remove('dock-off'); };
    new IntersectionObserver(function (es) { onFoot = es[0].isIntersecting; if (onFoot) d.classList.add('dock-off'); upd(); }).observe(foot);
    new IntersectionObserver(function (es) { onRoute = es[0].intersectionRatio > 0.4; upd(); }, { threshold: [0, 0.4, 0.6] }).observe(rt);
  })();

  /* ---------- пост-герой: рух сторінки ---------- */
  if (!MOTION || !hasG) { d.classList.remove('stage-on'); return; }

  // точка «зараз» доїжджає від 10:00
  var dot = $('#nowDot'), ruler = $('.ruler');
  if (dot && ruler && d.classList.contains('has-now')) {
    gsap.from(dot, { x: function () { return -nowP * ruler.offsetWidth; }, duration: 0.7, delay: 0.9, ease: 'power3.out' });
  }

  // Передача 4: ручне дзеркало зі схемою дороги розростається в маршрут
  var route = $('#route'), rin = $('#routeIn'), mirror = $('#mirror'), cap = $('#stageCap'), map = $('#routeMap'), rgrid = $('#routeGrid');
  if (route && rin && mirror && map) {
    var handle = $('.handle', mirror), rim = $('.rim', mirror), M = { cx: 0, cy: 0, r0: 100 };
    var measure = function () {
      var mr = map.getBoundingClientRect(), sr = rin.getBoundingClientRect();
      M.cx = mr.left + mr.width / 2 - sr.left; M.cy = mr.top + mr.height / 2 - sr.top;
      M.r0 = Math.min(Math.min(window.innerWidth, window.innerHeight) * 0.28, mr.width * 0.5);
      mirror.style.left = M.cx + 'px'; mirror.style.top = M.cy + 'px';
      mirror.style.width = mirror.style.height = (2 * M.r0) + 'px';
      mirror.style.margin = (-M.r0) + 'px 0 0 ' + (-M.r0) + 'px';
    };
    var mobile = function () { return window.innerWidth <= 700; };
    var setMirror = function (p) {
      var vw = window.innerWidth, vh = window.innerHeight;
      var rMax = Math.hypot(Math.max(M.cx, vw - M.cx), Math.max(M.cy, vh - M.cy)) + 24;
      var q = Math.min(1, Math.max(0, (p - 0.04) / 0.5)); q = q * q * (3 - 2 * q);
      var r = M.r0 + (rMax - M.r0) * q;
      rin.style.clipPath = 'circle(' + r.toFixed(1) + 'px at ' + M.cx.toFixed(1) + 'px ' + M.cy.toFixed(1) + 'px)';
      mirror.style.transform = 'scale(' + (r / M.r0).toFixed(4) + ')';
      rim.style.opacity = Math.max(0, 1 - q * 3.2).toFixed(3);
      handle.style.opacity = Math.max(0, 1 - q * 5).toFixed(3);
      cap.style.opacity = Math.max(0, 1 - q * 2.6).toFixed(3);
      var g = Math.min(1, Math.max(0, (q - 0.45) / 0.4));
      rgrid.style.opacity = g.toFixed(3);
      if (mobile()) map.style.opacity = Math.max(0, 1 - g * 1.6).toFixed(3);
      d.classList.toggle('dock-off', q > 0.55);
    };
    measure(); setMirror(0);
    ScrollTrigger.create({ trigger: route, start: 'top top', end: 'bottom bottom', onUpdate: function (s) { setMirror(s.progress); },
      onRefresh: function (s) { measure(); setMirror(s.progress); } });
  }

  // Решта руху сторінки вмикається з першою прокруткою: до неї секції нижче першого екрана стоять у кінцевому вигляді
  // (так їх бачить і людина без прокрутки, і повний знімок сторінки), а початкові стани з'являються, поки вони ще за краєм.
  var started = false;
  function startPage(e) {
    if (started) return;
    if (e && e.type === 'scroll' && window.scrollY <= 4) return;
    started = true;
    ['scroll', 'wheel', 'touchmove', 'keydown'].forEach(function (ev) { window.removeEventListener(ev, startPage, true); });
    initPage();
    ScrollTrigger.refresh();
  }
  ['scroll', 'wheel', 'touchmove', 'keydown'].forEach(function (ev) { window.addEventListener(ev, startPage, { passive: true, capture: true }); });
  if (window.scrollY > 4) startPage();

  function initPage() {
  // стовп 💈 крутиться лише від швидкості прокрутки
  var poleIn = $('.pole-in'), poleY = 0, PERIOD = 14.75 / Math.cos(35 * Math.PI / 180);
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) {
    poleY = (poleY + s.getVelocity() * 0.006) % PERIOD; if (poleY < 0) poleY += PERIOD;
    poleIn.style.transform = 'translate3d(0,' + poleY.toFixed(2) + 'px,0)';
  } });

  // заголовки по словах
  $$('.split').forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function (w) { return '<span class="sw"><span>' + w + '</span></span>'; }).join(' ');
    gsap.from($$('.sw > span', el), { yPercent: 105, duration: 0.65, ease: 'power3.out', stagger: 0.04,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  // проява блоків: Y +18, 700 мс, тригер 0.80, нерівномірний стагер
  ScrollTrigger.batch('[data-rv]', { start: 'top 80%', once: true, onEnter: function (els) {
    gsap.from(els, { y: 18, autoAlpha: 0, duration: 0.7, ease: 'power3.out', overwrite: true,
      stagger: function (i) { return i * 0.08 + (i > 2 ? 0.04 : 0); } });
  } });

  // Передача 1: лінія машинки розкривається в ніж
  var band = $('#svBand');
  if (band) {
    var bimg = $('img', band), bline = $('.sv-line', band);
    ScrollTrigger.create({ trigger: band, start: 'top 96%', end: 'top 40%', onUpdate: function (s) { handP = s.progress; kick(); } });
    var tlb = gsap.timeline({ scrollTrigger: { trigger: band, start: 'top 96%', end: 'top 40%', scrub: 0.4 } });
    tlb.fromTo(band, { clipPath: 'inset(51.2% 0% 47.6% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 }, 0)
       .fromTo(bimg, { filter: 'blur(8px)', scale: 1.06 }, { filter: 'blur(0px)', scale: 1, ease: 'none', duration: 1 }, 0)
       .fromTo(bline, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.12 }, 0.2)
       .to(bline, { opacity: 0, ease: 'power1.in', duration: 0.3 }, 0.7);
  }
  // виноски тягнуться від зубців
  var leads = $$('.sv-list .lead');
  if (leads.length && window.innerWidth > 700) {
    gsap.from(leads, { scaleY: 0, duration: 0.7, ease: 'power3.out', stagger: function (i) { return [0, 0.08, 0.14, 0.24, 0.3][i] || 0; },
      scrollTrigger: { trigger: '.sv-list', start: 'top 92%', once: true } });
  }

  // Передача 2: прайс-дошка піднімається зубчастим краєм
  var boardIn = $('#boardIn'), edge = $('.board-edge');
  if (boardIn) {
    var N = window.innerWidth < 700 ? 22 : 44, TH = window.innerWidth < 700 ? 10 : 14;
    var setEdge = function (e) {
      var pts = ['0% ' + (e + TH) + 'px'];
      for (var i = 0; i <= N; i++) { var x = (i / N * 100).toFixed(3); pts.push(x + '% ' + (i % 2 ? e : e + TH).toFixed(1) + 'px'); }
      pts.push('100% ' + (e + TH) + 'px', '100% 100%', '0% 100%');
      boardIn.style.clipPath = 'polygon(' + pts.join(',') + ')';
      edge.style.transform = 'translate3d(0,' + (e + TH * 0.5 - 1).toFixed(1) + 'px,0)';
    };
    var e0 = function () { return window.innerHeight * 0.45; };
    setEdge(e0());
    ScrollTrigger.create({ trigger: boardIn, start: 'top bottom', end: 'top 20%', onUpdate: function (s) {
      var p = s.progress, e = e0() * (1 - p) - (TH + 2) * p;
      setEdge(e); edge.style.opacity = p > 0.02 && p < 0.985 ? '1' : '0';
      if (p >= 0.999) { boardIn.style.clipPath = 'none'; }
    }, onLeave: function () { boardIn.style.clipPath = 'none'; edge.style.opacity = '0'; } });
  }

  // Передача 3: дошка стає карткою, крісла піднімаються з-під неї
  var board = $('#price');
  if (board) {
    gsap.fromTo(board, { clipPath: 'inset(0px 0px 0px 0px round 0px)' },
      { clipPath: function () { var s = window.innerWidth < 700 ? 10 : 28; return 'inset(0px ' + s + 'px 0px ' + s + 'px round 40px)'; }, ease: 'none',
        scrollTrigger: { trigger: board, start: 'bottom 92%', end: 'bottom 40%', scrub: 0.4 } });
    gsap.fromTo(boardIn, { scale: 1 }, { scale: 0.975, ease: 'none', transformOrigin: '50% 100%',
      scrollTrigger: { trigger: board, start: 'bottom 92%', end: 'bottom 40%', scrub: 0.4 } });
  }
  var chairs = $$('[data-chair]');
  if (chairs.length) {
    gsap.from(chairs, { y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: function (i) { return [0, 0.09, 0.2][i] || 0.2; },
      scrollTrigger: { trigger: '.chair-row', start: 'top 85%', once: true } });
  }

  // кільця хайлайтів обводяться по черзі
  var rings = $$('.ring circle');
  if (rings.length) {
    gsap.fromTo(rings, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', stagger: function (i) { return i * 0.09; },
      scrollTrigger: { trigger: '.hl-strip', start: 'top 82%', once: true } });
  }

  }
})();
