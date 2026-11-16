/* Esthétique espace studio — концепт Velira. Рух: тюль збирається на карнизі → крок крізь двері (motion.md). */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ---------- сьогоднішня дата за київським часом (Europe/Kyiv), не за годинником пристрою ---------- */
  function kyivToday() {
    var y, m, d;
    try {
      var parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Kyiv', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
      parts.forEach(function (p) { if (p.type === 'year') y = +p.value; else if (p.type === 'month') m = +p.value; else if (p.type === 'day') d = +p.value; });
    } catch (e) {}
    if (!y || !m || !d) { // старий рушій без бази часових поясів: Київ = UTC+2 узимку, UTC+3 з останньої неділі березня до останньої неділі жовтня
      var now = new Date(), yr = now.getUTCFullYear();
      var lastSun = function (mon) { var t = new Date(Date.UTC(yr, mon + 1, 0, 1)); t.setUTCDate(t.getUTCDate() - t.getUTCDay()); return t.getTime(); };
      var off = now.getTime() >= lastSun(2) && now.getTime() < lastSun(9) ? 3 : 2;
      var k = new Date(now.getTime() + off * 3600e3); y = k.getUTCFullYear(); m = k.getUTCMonth() + 1; d = k.getUTCDate();
    }
    return { y: y, m: m, d: d };
  }
  var KYIV = kyivToday();

  /* ---------- святковий сезон: скільки календарних днів до ялинок (дата з допису студії 29.10.2026) ---------- */
  var cnt = document.querySelector('.sv-count');
  if (cnt) {
    // різниця київських календарних дат: 15 → 23 листопада = 8 днів, незалежно від години й поясу пристрою
    var days = Math.round((Date.UTC(2026, 10, 23) - Date.UTC(KYIV.y, KYIV.m - 1, KYIV.d)) / 864e5);
    if (days > 0) {
      var w = days % 10 === 1 && days % 100 !== 11 ? 'день' : (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 12 || days % 100 > 14) ? 'дні' : 'днів');
      cnt.textContent = 'До 23 листопада — ' + days + ' ' + w;
      cnt.hidden = false;
    }
  }

  /* ---------- вільне віконечко: складач запиту в Direct ---------- */
  var PRICE = 1200, MIN_H = 1, MAX_H = 10;
  var fDate = document.getElementById('f-date'), fTime = document.getElementById('f-time');
  var fHours = document.getElementById('f-hours'), fSum = document.getElementById('f-sum');
  var fMsg = document.getElementById('f-msg'), fSend = document.getElementById('f-send'), fNote = document.getElementById('f-note');
  var hours = 2, preset = '';
  var MONTHS = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];
  var DAYS = ['неділя','понеділок','вівторок','середа','четвер','пʼятниця','субота'];
  function fmtDate(v) {
    if (!v) return '…';
    var p = v.split('-'), d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    return (+p[2]) + ' ' + MONTHS[+p[1] - 1] + ' (' + DAYS[d.getUTCDay()] + ')';
  }
  function compose() {
    var sum = hours * PRICE;
    fHours.textContent = hours;
    fSum.textContent = String(sum).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    fDate.classList.toggle('empty', !fDate.value);
    fMsg.value = 'Добрий день! ' + (preset ? 'Хочу ' + preset + '. ' : '') + 'Чи вільне віконечко для зйомки? Дата: ' + fmtDate(fDate.value) +
      ', з ' + (fTime.value || '…') + ', ' + hours + ' год (' + fSum.textContent + ' грн за ціною з біо).';
  }
  /* дата: список днів українською від сьогодні за Києвом на 60 днів уперед, згрупований за місяцями (не нативна маска мови пристрою) */
  var MONTHS_N = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
  var DAYS_S = ['нд','пн','вт','ср','чт','пт','сб'];
  function fillDates() {
    var z = function (n) { return (n < 10 ? '0' : '') + n; }, base = Date.UTC(KYIV.y, KYIV.m - 1, KYIV.d), grp = null, gm = -1;
    for (var i = 0; i < 60; i++) {
      var t = new Date(base + i * 864e5), mo = t.getUTCMonth(), dd = t.getUTCDate();
      if (mo !== gm) { grp = document.createElement('optgroup'); grp.label = MONTHS_N[mo] + ' ' + t.getUTCFullYear(); fDate.appendChild(grp); gm = mo; }
      var o = document.createElement('option');
      o.value = t.getUTCFullYear() + '-' + z(mo + 1) + '-' + z(dd);
      o.textContent = DAYS_S[t.getUTCDay()] + ', ' + dd + ' ' + MONTHS[mo] + (i === 0 ? ' · сьогодні' : i === 1 ? ' · завтра' : '');
      grp.appendChild(o);
    }
  }
  if (fDate) {
    fillDates();
    ['change', 'input'].forEach(function (ev) { fDate.addEventListener(ev, compose); fTime.addEventListener(ev, compose); });
    document.querySelectorAll('.st').forEach(function (b) {
      b.addEventListener('click', function () {
        hours = Math.min(MAX_H, Math.max(MIN_H, hours + Number(b.dataset.step)));
        compose();
      });
    });
    document.querySelectorAll('[data-preset]').forEach(function (a) {
      a.addEventListener('click', function () { preset = a.dataset.preset; compose(); });
    });
    fSend.addEventListener('click', function () {
      compose();
      var text = fMsg.value, done = function () { fNote.textContent = 'Текст запиту скопійовано — вставте його в чат Direct.'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { legacy(text) && done(); });
      } else if (legacy(text)) { done(); }
    });
    compose();
  }
  function legacy(text) {
    try {
      fMsg.removeAttribute('readonly'); fMsg.select(); var ok = document.execCommand('copy');
      fMsg.setAttribute('readonly', ''); window.getSelection().removeAllRanges(); return ok;
    } catch (e) { return false; }
  }

  /* ---------- рух ---------- */
  if (!window.gsap || !window.ScrollTrigger) { root.classList.remove('motion'); return; }
  gsap.registerPlugin(ScrollTrigger);
  /* iPhone: показ/схов панелі адреси міняє лише висоту — не перераховувати сцену посеред жесту */
  ScrollTrigger.config({ ignoreMobileResize: true });
  var mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', function () {
    root.classList.add('motion');
    /* Висота сцени = ВЕЛИКИЙ екран (100lvh, панель адреси схована), видима зона = МАЛИЙ (100svh, панель видно).
       Раніше бралось innerHeight на завантаженні (панель видно) — коли Safari ховав панель, під фото кімнати
       відкривалась кремова смуга 80–115 px (скриншот Богдана 15.11). Обидві величини в px, перераховуються лише зі
       зміною ширини (поворот), тож панель адреси сцену не смикає. */
    var probeS = document.createElement('div'), probeL = document.createElement('div');
    probeS.className = 'vhp vhp-s'; probeL.className = 'vhp vhp-l';
    probeS.setAttribute('aria-hidden', 'true'); probeL.setAttribute('aria-hidden', 'true');
    document.body.appendChild(probeS); document.body.appendChild(probeL);
    var VH, SV, lastW = innerWidth;
    var setVH = function () {
      SV = probeS.offsetHeight || innerHeight;
      VH = Math.max(probeL.offsetHeight || 0, SV, innerHeight);
      root.style.setProperty('--vh', (VH / 100) + 'px'); root.style.setProperty('--sv', (SV / 100) + 'px');
    };
    setVH();
    var onResize = function () { if (innerWidth !== lastW) { lastW = innerWidth; setVH(); ScrollTrigger.refresh(); } };
    window.addEventListener('resize', onResize);
    var pin = document.querySelector('.stage-pin');
    var stage = document.querySelector('.stage');
    var frame = document.querySelector('.door-frame');
    var doorImg = frame.querySelector('.door-img');
    var tulle = frame.querySelector('.tulle');
    var folds = gsap.utils.toArray('.fold');
    var rooms = gsap.utils.toArray('.room');
    var note = document.querySelector('.stage-note');
    var ASP = 0.75; // усі кадри 3:4
    var lite = window.matchMedia('(max-width: 899.98px)').matches;

    /* шар першої кімнати на весь екран (кадр той самий, обрізаний отвором дверей) */
    var layer = document.createElement('div'); layer.className = 'layer'; layer.setAttribute('aria-hidden', 'true');
    var inner = document.createElement('div'); inner.className = 'layer-in';
    inner.style.cssText = 'position:absolute;inset:0;transform-origin:50% 50%';
    var img0 = doorImg.cloneNode(true); img0.removeAttribute('id'); img0.className = ''; img0.alt = ''; img0.sizes = '100vw';
    inner.appendChild(img0); layer.appendChild(inner); pin.insertBefore(layer, pin.firstChild);
    /* затемнення кімнати, крізь яку проходимо: шар з opacity замість filter: brightness() на повноекранному фото
       (filter перемальовує весь шар на кожному кадрі — на iPhone це ривки) */
    var mkDim = function () { var d = document.createElement('i'); d.className = 'dim'; d.setAttribute('aria-hidden', 'true'); return d; };
    var dim0 = mkDim(); layer.appendChild(dim0);

    var g = {}, st0 = { g: 0 }, rs = rooms.map(function () { return { a: 0, g: 0, o: 0 }; });
    var roomImgs = rooms.map(function (r) { return r.querySelector('img'); });
    var caps = rooms.map(function (r) { return r.querySelector('.cap'); });
    var dims = rooms.map(function (r) { var d = mkDim(); r.insertBefore(d, r.querySelector('.cap')); return d; });
    /* фото кімнат: на телефоні не чекати лінивого завантаження посеред жесту — тягнемо й декодуємо одразу після load */
    var warm = function () {
      roomImgs.forEach(function (im) { im.loading = 'eager'; if (im.decode) im.decode().catch(function () {}); });
    };
    if (document.readyState === 'complete') setTimeout(warm, 300); else window.addEventListener('load', function () { setTimeout(warm, 300); }, { once: true });
    var capIn = rooms.map(function () { return 0.6; });
    function renderCapOnly(i) {
      // свій підпис зʼявляється, лише коли отвір кімнати вже цілком його вміщує (не розрізається краєм дверей);
      // гасне в паузі ДО того, як стулки наступних дверей рушать (o: 0 → 1 на таймлайні) — щілина вже не ріже картку
      var c = function (v) { return Math.max(0, Math.min(1, v)); };
      var s = rs[i], nx = rs[i + 1] ? rs[i + 1].a : 0, vis = c((s.g - capIn[i]) / 0.12) * (1 - s.o) * (nx > 0 ? 0 : 1);
      caps[i].style.opacity = vis.toFixed(3); caps[i].style.visibility = vis > 0.01 ? 'visible' : 'hidden';
    }
    var L = function (a, b, t) { return a + (b - a) * t; };

    function cover(w, h) { return w / h > ASP ? { w: w, h: w / ASP } : { w: h * ASP, h: h }; }
    function offsetIn(el, anc) { var x = 0, y = 0; for (var n = el; n && n !== anc; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; } return { x: x, y: y }; }
    function measure() {
      var W = pin.clientWidth, H = pin.clientHeight, o = offsetIn(frame, pin); // H = зафіксована висота сцени
      var s = { x: o.x, y: o.y, w: frame.offsetWidth, h: frame.offsetHeight };
      var full = cover(W, H), fx = (W - full.w) / 2, fy = (H - full.h) / 2;
      var Hs = Math.min(H, SV || H); // видима висота, коли панель адреси показана
      var ow = lite ? W * 0.62 : Math.min(W * 0.3, 460), oh = Math.min(Hs * (lite ? 0.56 : 0.64), ow * 1.5);
      var op = { x: (W - ow) / 2, y: Hs * 0.52 - oh / 2, w: ow, h: oh };
      function fit(r) { var c = cover(r.w, r.h); return { x: r.x + r.w / 2 - c.w / 2 - fx, y: r.y + r.h / 2 - c.h / 2 - fy, k: c.w / full.w }; }
      g = { W: W, H: H, slot: s, open: op, full: full, fx: fx, fy: fy, fs: fit(s), fo: fit(op) };
      [img0].concat(roomImgs).forEach(function (im) {
        im.style.width = full.w + 'px'; im.style.height = full.h + 'px'; im.style.left = fx + 'px'; im.style.top = fy + 'px';
      });
      // поріг появи підпису: найменше g, за якого отвір (lerp від дверей до екрана) цілком містить картку
      caps.forEach(function (cp, i) {
        var x = cp.offsetLeft, y = cp.offsetTop, w = cp.offsetWidth, h = cp.offsetHeight, need = 0;
        if (op.x > 0) need = Math.max(need, 1 - x / op.x);
        if (op.y > 0) need = Math.max(need, 1 - y / op.y);
        var rr = op.x + op.w, bb = op.y + op.h;
        if (W - rr > 0) need = Math.max(need, (x + w - rr) / (W - rr));
        if (H - bb > 0) need = Math.max(need, (y + h - bb) / (H - bb));
        capIn[i] = Math.max(0.45, Math.min(0.88, need + 0.02));
      });
    }
    function clip(r, rad) {
      return 'inset(' + r.y.toFixed(1) + 'px ' + (g.W - r.x - r.w).toFixed(1) + 'px ' + (g.H - r.y - r.h).toFixed(1) + 'px ' + r.x.toFixed(1) + 'px round ' + rad.toFixed(1) + 'px)';
    }
    function lerpRect(a, t) { return { x: L(a.x, 0, t), y: L(a.y, 0, t), w: L(a.w, g.W, t), h: L(a.h, g.H, t) }; }
    function imgAt(im, f, t) { gsap.set(im, { x: L(f.x, 0, t), y: L(f.y, 0, t), scale: L(f.k, 1, t), transformOrigin: '0 0', force3D: true }); }

    function render0() {
      var t = st0.g;
      layer.style.clipPath = clip(lerpRect(g.slot, t), L(28, 0, t));
      imgAt(img0, g.fs, t);
    }
    function renderRoom(i) {
      var s = rs[i], r = rooms[i], o = g.open;
      if (s.a <= 0) { r.style.clipPath = 'inset(50% 50% 50% 50%)'; }
      else if (s.g <= 0) {
        var hw = o.w / 2 * s.a; // двостулкові двері розходяться від середини
        r.style.clipPath = clip({ x: g.W / 2 - hw, y: o.y, w: hw * 2, h: o.h }, 26 * s.a + 2);
      } else { r.style.clipPath = clip(lerpRect(o, s.g), L(28, 0, s.g)); }
      imgAt(roomImgs[i], g.fo, s.g);
      // підпис кімнати: лише коли кімната відкрита й наступні двері ще не почали відчинятись
      renderCapOnly(i);
      if (i > 0) renderCapOnly(i - 1);
      // попередня кімната: ми проходимо крізь неї
      var prev = i === 0 ? layer : rooms[i - 1];
      gsap.set(prev, { scale: 1 + 0.1 * s.g, transformOrigin: '50% 50%', force3D: true });
      (i === 0 ? dim0 : dims[i - 1]).style.opacity = (0.18 * s.g).toFixed(3);
    }
    function renderAll() { render0(); rooms.forEach(function (_, i) { renderRoom(i); }); }

    measure(); renderAll();
    frame.classList.add('has-layer');

    /* --- завантаження: тюль збирається на карнизі --- */
    var n = folds.length;
    gsap.set(folds, { xPercent: 0, scaleX: 1, transformOrigin: '0% 50%' });
    var intro = gsap.timeline({ delay: 0.25 });
    folds.forEach(function (f, i) {
      var q = i / (n - 1);
      intro.to(f, { xPercent: 84 * (n - i), scaleX: 0.16, duration: 1.0 + 0.4 * (1 - q), ease: 'power3.inOut' }, 0.55 * Math.sqrt(q));
    });
    intro.fromTo(doorImg, { filter: 'blur(6px)', scale: 1.04 }, { filter: 'blur(0px)', scale: 1, duration: 1.6, ease: 'power2.out', clearProps: 'filter' }, 0)
      .fromTo('.floorlight', { opacity: 0.2 }, { opacity: 0.6, duration: 0.9, ease: 'power1.out' }, 0.65);

    /* --- прокрутка: крок крізь двері (sticky, scrub) --- */
    var HOLD0 = 0.7, GROW = 0.6, APPEAR = 0.2, HOLD = 0.5, LAST = 1.0;
    var T = HOLD0 + GROW + HOLD + rooms.length * (APPEAR + GROW) + (rooms.length - 1) * HOLD + LAST;
    stage.style.height = 'calc(var(--vh, 1svh) * ' + ((T + 2) * 100) + ')';
    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: stage, start: 'top top', end: function () { return '+=' + T * VH; }, scrub: true, invalidateOnRefresh: true }
    });
    var t = HOLD0, vw = function (k) { return function () { return k * innerWidth; }; };
    tl.to(st0, { g: 1, duration: GROW, ease: 'power1.inOut', onUpdate: render0 }, t)
      .to('.t-l', { x: vw(-0.2), autoAlpha: 0, duration: GROW * 0.7 }, t)
      .to('.t-r', { x: vw(0.2), autoAlpha: 0, duration: GROW * 0.7 }, t)
      .to('.side-l, .concept', { x: vw(-0.12), autoAlpha: 0, duration: GROW * 0.6 }, t)
      .to('.side-r', { x: vw(0.12), autoAlpha: 0, duration: GROW * 0.6 }, t)
      .to([tulle, '.rod', '.floorlight', '.cap-door'], { autoAlpha: 0, duration: GROW * 0.3 }, t)
      .to(doorImg, { autoAlpha: 0, duration: 0.02 }, t)
      .fromTo(note, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.2, immediateRender: false }, t + GROW * 0.8);
    t += GROW + HOLD;
    rooms.forEach(function (r, i) {
      if (i > 0) tl.to(rs[i - 1], { o: 1, duration: HOLD * 0.6, ease: 'power1.in', onUpdate: function () { renderCapOnly(i - 1); } }, t - HOLD * 0.6);
      tl.to(rs[i], { a: 1, duration: APPEAR, ease: 'power2.out', onUpdate: function () { renderRoom(i); } }, t)
        .to(rs[i], { g: 1, duration: GROW, ease: 'power1.inOut', onUpdate: function () { renderRoom(i); } }, t + APPEAR);
      t += APPEAR + GROW + (i < rooms.length - 1 ? HOLD : LAST);
    });
    tl.set({}, {}, T);
    var onRefInit = function () { measure(); };
    var onRef = function () { renderAll(); };
    ScrollTrigger.addEventListener('refreshInit', onRefInit);
    ScrollTrigger.addEventListener('refresh', onRef);

    /* --- шапка: кнопка бронювання зʼявляється, коли кнопки першого екрана пішли (ПК) --- */
    var bar = document.querySelector('.bar');
    ScrollTrigger.create({ trigger: stage, start: function () { return 'top+=' + HOLD0 * VH + ' top'; }, end: 'max',
      onToggle: function (self) { bar.classList.toggle('on', self.isActive); } });

    /* --- святковий сезон: вечірнє поле розходиться на всю ширину --- */
    /* ПК ≥ 1024: поле ширше за сітку контенту лише на 3 % — так край не ріже фото ялинки; телефон як був (7 %) */
    var fieldIn = window.matchMedia('(min-width: 1024px)').matches ? 3 : 7;
    gsap.fromTo('.field', { clipPath: 'inset(0% ' + fieldIn + '% 0% ' + fieldIn + '% round 44px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: '.svyata', start: 'top 92%', end: 'top 30%', scrub: true }
    });
    /* --- балкон: кіт трохи відстає від вежі (тихий паралакс ≤ 6 %) --- */
    gsap.fromTo('.ph-cat', { y: 36 }, { y: -36, ease: 'none', scrollTrigger: { trigger: '.balkony', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* --- проява блоків: лише підйом Y 24 → 0, 700 мс, тригер 0.80, без прозорості — текст читається одразу
           (тиша між моментами, як у Arent & Pyke: 0 проявлень), стагер спадає --- */
    var groups = [
      ['.bal-head', '.ph-tower', '.bal-q'],
      ['.sv-kicker', '#svyata-h', '.sv-dates', '.sv-q', '.svyata .btn'],
      ['#kh-h', '.kh-lede', '.circles', '.kh-rest'],
      ['.vk-head', '.pane', '.ph-cam']
    ];
    var steps = [0, 0.08, 0.14, 0.19, 0.23, 0.26];
    groups.forEach(function (sel) {
      var els = sel.map(function (s) { return document.querySelector(s); }).filter(Boolean);
      ScrollTrigger.create({
        trigger: els[0], start: 'top 80%', once: true,
        onEnter: function () {
          els.forEach(function (el, i) { gsap.fromTo(el, { y: 24 }, { y: 0, duration: 0.7, ease: 'expo.out', delay: steps[i] || 0.28 }); });
        }
      });
    });

    return function () {
      ScrollTrigger.removeEventListener('refreshInit', onRefInit);
      ScrollTrigger.removeEventListener('refresh', onRef);
      window.removeEventListener('resize', onResize); bar.classList.remove('on'); root.style.removeProperty('--vh'); root.style.removeProperty('--sv');
      probeS.remove(); probeL.remove(); dims.forEach(function (d) { d.remove(); });
      layer.remove(); frame.classList.remove('has-layer'); stage.style.height = '';
      rooms.forEach(function (r) { r.style.clipPath = ''; r.removeAttribute('style'); });
      caps.forEach(function (c) { c.removeAttribute('style'); });
      [img0].concat(roomImgs).forEach(function (im) { im.removeAttribute('style'); });
      root.classList.remove('motion');
    };
  });

  /* ПК ≥ 1024 (цикл pc): вечірнє поле на виході знову сходиться в заокруглену панель — дзеркало входу; телефон без змін */
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', function () {
    gsap.fromTo('.field', { clipPath: 'inset(0% 0% 0% 0% round 0px)' }, {
      clipPath: 'inset(0% 3% 0% 3% round 44px)', ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: '.svyata', start: 'bottom 70%', end: 'bottom 20%', scrub: true }
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', function () { root.classList.remove('motion'); });
})();
