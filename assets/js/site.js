/* Velira × Glow-Bento — одна хореографія сторінки.
   X06 шапка · X08 сітка/блиск · X01 проява з розмиття · X02 ротатор (rotate.js) · X05 промені · X07 вставки ·
   фірмовий момент «лінія від риски V» · T06 bloom ink → paper · T05 стопка етапів · T01 шторка поля.
   Граматика: expo.out — прибуття, power2.in — виходи, none — усе, що на прокрутці, sine.inOut — світло по рамці. */
(function () {
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* ================= X06: смуга ⇄ пігулка, активний розділ, аркуш меню ================= */
  var nav = $('#nav'), bar = nav.querySelector('.nlinks');
  var navLinks = $$('a', bar);
  var sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:28px;pointer-events:none';
  document.body.prepend(sentinel);
  new IntersectionObserver(function (e) { nav.classList.toggle('is-pill', !e[0].isIntersecting); }).observe(sentinel);

  function place(href) {
    $$('.nlinks a, .sheet a').forEach(function (x) {
      if (x.getAttribute('href') === href) x.setAttribute('aria-current', 'true'); else x.removeAttribute('aria-current');
    });
    var a = navLinks.filter(function (x) { return x.getAttribute('href') === href; })[0];
    if (!a || !bar.offsetWidth) { bar.style.setProperty('--hl-o', '0'); return; }
    var l = a.offsetLeft, r = bar.offsetWidth - l - a.offsetWidth;
    bar.style.setProperty('--hl-a', l + 'px'); bar.style.setProperty('--hl-b', r + 'px');
    bar.style.setProperty('--hl-c', (l + a.offsetWidth / 2) + 'px'); bar.style.setProperty('--hl-o', '1');
  }
  var current = '#top', sections = $$('main section[id]'), seen = {};
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });
    var hit = sections.filter(function (s) { return seen[s.id]; })[0];
    if (hit && '#' + hit.id !== current) { current = '#' + hit.id; place(current); }
  }, { rootMargin: '-42% 0px -52% 0px' });
  sections.forEach(function (s) { spy.observe(s); });
  place(current);
  new ResizeObserver(function () { place(current); }).observe(bar);

  var burger = nav.querySelector('.burger'), sheet = $('#menu');
  function setOpen(open) {
    burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
    sheet.classList.toggle('is-open', open); sheet.setAttribute('aria-hidden', String(!open)); sheet.inert = !open;
  }
  burger.addEventListener('click', function () { setOpen(burger.getAttribute('aria-expanded') !== 'true'); });
  sheet.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

  /* CSS-петлі (дрейф світіння) стоять поза екраном */
  var loopIO = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('is-off', !e.isIntersecting); }); });
  $$('.scene').forEach(function (s) { loopIO.observe(s); });

  /* Важке (геометрія, ScrollTrigger-и нижче першого екрана) — по одному шматку в простої головного потоку,
     щоб завантаження телефона не складалося з довгих задач; перша прокрутка доробляє чергу одразу. */
  var queue = [], pumping = false;
  var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 80); };
  function pump() {
    idle(function () { var f = queue.shift(); if (f) f(); if (queue.length) pump(); else pumping = false; }, { timeout: 1400 });
  }
  function later(f) { queue.push(f); if (!pumping) { pumping = true; pump(); } }
  function flush() { while (queue.length) queue.shift()(); }

  /* X05: квадрати променя покривають клітинку під час обертання (розмір — з ResizeObserver, без читань макета) */
  var cells = $$('.cell');
  var ro = new ResizeObserver(function (list) {
    list.forEach(function (e) {
      var b = e.borderBoxSize && e.borderBoxSize[0], w = b ? b.inlineSize : e.target.offsetWidth, h = b ? b.blockSize : e.target.offsetHeight;
      e.target.style.setProperty('--d', Math.ceil(Math.hypot(w, h) + 16) + 'px');
    });
  });
  cells.forEach(function (c) { ro.observe(c); });

  /* ================= перемикач $ / ₴ (працює й без руху) ================= */
  var RATE = 41.5;
  var fmtUah = function (usd) { return Math.round(usd * RATE).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₴'; };
  var prices = $$('.pv'), curBtns = $$('.cur__b'), rollPrices = null;
  curBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var uah = b.dataset.cur === 'uah';
      if (b.getAttribute('aria-pressed') === 'true') return;
      curBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      prices.forEach(function (p) { p.textContent = uah ? fmtUah(+p.dataset.usd) : '$' + p.dataset.usd; });
      if (rollPrices) rollPrices();
    });
  });

  /* ================= форма-прев’ю: перевіряє, не надсилає ================= */
  var form = $('#lead-form'), status = form.querySelector('.form__status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = $$('[required]', form).filter(function (f) {
      var ok = f.type === 'checkbox' ? f.checked : f.value.trim().length > 0;
      if (f.type !== 'checkbox') f.setAttribute('aria-invalid', String(!ok));
      return !ok;
    });
    if (bad.length) { status.textContent = 'Заповніть усі поля й позначте обидві згоди.'; bad[0].focus(); return; }
    status.textContent = 'Поля заповнено. Це прев’ю — заявку не надіслано. Напишіть у Telegram @madbod_77.';
  });

  /* ================= маршрут: геометрія лінії (і для статичного варіанта) ================= */
  var grid = $('.route-grid'), svg = $('.route-line'), origin = $('#route-origin');
  var pBase = $('.rl-base', svg), pGlow = $('.rl-glow', svg), pTrail = $('.rl-trail', svg), pComet = $('.rl-comet', svg), gNodes = $('.rl-nodes', svg);
  var head = $('.rl-head'), pStubs = $$('.rl-stub', svg), STUB = 60;   // 28 px проміжку колонок + 32 px уздовж країв карток
  var NODE_ORDER = ['site', 'bot', 'auto', 'team'];
  var routeCells = NODE_ORDER.map(function (k) { return $('[data-node="' + k + '"]', grid); });
  var geo = { L: 1, nodes: [], end: { x: 0, y: 0 } };
  var desktopRoute = function () { return matchMedia('(min-width: 900px)').matches; };

  function rel(el) {
    var g = grid.getBoundingClientRect(), r = el.getBoundingClientRect();
    return { l: r.left - g.left, t: r.top - g.top, r: r.right - g.left, b: r.bottom - g.top,
             cx: (r.left + r.right) / 2 - g.left, cy: (r.top + r.bottom) / 2 - g.top, w: g.width, h: g.height };
  }
  function buildRoute() {
    var pts, nodes;
    var A = rel(routeCells[0]), B = rel(routeCells[1]), C = rel(routeCells[2]), D = rel(routeCells[3]);
    if (desktopRoute()) {
      // ПК: риска V → коротко вниз і під підписом «Маршрут заявки» до центральної осі (проміжок колонок заголовка
      // збігається з проміжком колонок карток) → одним прямим проводом униз крізь проміжок між чотирма картками
      // (сайт, бот, автоматизація, команда) → виходить з-під сітки по центру; там розкривається папір (T06).
      // Жодного сегмента вздовж зовнішніх країв сітки.
      var O = rel(origin), K = rel(origin.closest('.kicker')), xv = (A.r + B.l) / 2, ky = K.b + 7;
      var yBot = Math.max(C.b, D.b) + 12, hA = A.b - A.t, hC = C.b - C.t;
      pts = [[O.cx, O.cy], [O.cx, ky], [xv, ky], [xv, yBot]];
      nodes = [[xv, A.cy - hA * .18], [xv, B.cy + hA * .18], [xv, C.cy - hC * .18], [xv, D.cy + hC * .18]];
    } else {
      // телефон: лінія теж починається з риски міні-знака V, іде полем ліворуч від заголовка й спускається до карток
      var O2 = rel(origin), x = 10, top = -14, bot = D.b + 30, xg = -8;
      pts = [[O2.cx, O2.cy], [xg, O2.cy], [xg, top], [x, top], [x, bot]];
      nodes = [[x, A.t + 46], [x, B.t + 46], [x, C.t + 46], [x, D.t + 46]];
    }
    var d = 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L');
    [pBase, pGlow, pTrail, pComet].forEach(function (p) { p.setAttribute('d', d); });
    // довжина вздовж ламаної до кожного вузла (вузли лежать на сегментах)
    var cum = 0, lens = nodes.map(function () { return null; });
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i], seg = Math.hypot(b[0] - a[0], b[1] - a[1]);
      nodes.forEach(function (n, k) {
        if (lens[k] !== null) return;
        var da = Math.hypot(n[0] - a[0], n[1] - a[1]), db = Math.hypot(n[0] - b[0], n[1] - b[1]);
        if (Math.abs(da + db - seg) < 1) lens[k] = cum + da;
      });
      cum += seg;
    }
    geo.L = cum; geo.lens = lens; geo.pts = pts;
    // ПК: у перетині центрального проводу з проміжком між рядами — два короткі відгалуження вздовж країв нижнього ряду;
    // малюються, щойно голова проходить перетин
    geo.stub = null;
    if (desktopRoute() && pStubs.length === 2) {
      var yg = (Math.max(A.b, B.b) + Math.min(C.t, D.t)) / 2, xs = pts[pts.length - 1][0], acc = 0;
      for (var j = 1; j < pts.length; j++) {
        var p0 = pts[j - 1], p1 = pts[j], sl = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
        if (Math.abs(p0[0] - xs) < .5 && Math.abs(p1[0] - xs) < .5 && yg >= Math.min(p0[1], p1[1]) && yg <= Math.max(p0[1], p1[1])) {
          geo.stub = acc + Math.abs(yg - p0[1]); break;
        }
        acc += sl;
      }
      pStubs[0].setAttribute('d', 'M' + xs.toFixed(1) + ' ' + yg.toFixed(1) + ' L' + (xs - STUB).toFixed(1) + ' ' + yg.toFixed(1));
      pStubs[1].setAttribute('d', 'M' + xs.toFixed(1) + ' ' + yg.toFixed(1) + ' L' + (xs + STUB).toFixed(1) + ' ' + yg.toFixed(1));
      pStubs.forEach(function (s) { s.style.strokeDasharray = STUB + ' ' + STUB; });
    } else pStubs.forEach(function (s) { s.setAttribute('d', ''); });
    var last = pts[pts.length - 1], g = grid.getBoundingClientRect();
    geo.end = { x: g.left + last[0], y: g.top + last[1] };
    gNodes.innerHTML = nodes.map(function (n, k) {
      var lit = routeCells[k].hasAttribute('data-lit') ? ' data-lit=""' : '';
      return '<circle cx="' + n[0].toFixed(1) + '" cy="' + n[1].toFixed(1) + '" r="4.5"' + lit + '/>';
    }).join('');
    pTrail.style.strokeDasharray = pGlow.style.strokeDasharray = geo.L + ' ' + geo.L;
    pComet.style.strokeDasharray = '70 ' + (geo.L * 2);
  }
  var drawn = 1;   // доля намальованої лінії (без руху — уся)
  function drawRoute(frac) {
    drawn = Math.max(0, Math.min(1, frac));
    var len = geo.L * drawn;
    pTrail.style.strokeDashoffset = pGlow.style.strokeDashoffset = (geo.L - len).toFixed(1);
    pComet.style.strokeDashoffset = (-(len - 70)).toFixed(1);
    if (geo.stub !== null && geo.stub !== undefined) {
      var sf = Math.max(0, Math.min(1, (len - geo.stub) / 40));
      pStubs.forEach(function (s) { s.style.strokeDashoffset = (STUB * (1 - sf)).toFixed(1); });
    }
    var live = drawn > 0.002 && drawn < 0.998;
    pComet.style.opacity = live ? 1 : 0;
    if (live) {
      var p = pTrail.getPointAtLength(len);
      head.style.transform = 'translate(' + p.x.toFixed(1) + 'px,' + p.y.toFixed(1) + 'px)';
      head.style.opacity = 1;
    } else head.style.opacity = 0;
    var circles = gNodes.querySelectorAll('circle');
    (geo.lens || []).forEach(function (l, k) { if (l !== null && len >= l - 1) lightCell(k, circles[k]); });
  }
  var onLight = null;   // рух підставляє анімацію запалювання
  function lightCell(k, circle) {
    if (circle && !circle.hasAttribute('data-lit')) circle.setAttribute('data-lit', '');
    var c = routeCells[k];
    if (c.hasAttribute('data-lit')) return;
    c.setAttribute('data-lit', '');
    if (onLight) onLight(k, c);
  }
  /* ================= провід: від останнього зрощеного обриву «Ціни відсутності» до риски міні-знака V =================
     Дві частини: A — у секції #absence (до її нижнього краю), B — у сцені маршруту (від її верху до риски);
     шов лежить рівно на межі секцій, тож на ПК, коли сцена маршруту прилипає, він уже за верхнім краєм екрана. */
  var absence = $('#absence'), stage = $('.route-stage'), losses = $('.losses'), miniV = $('.mini-v');
  var lossRows = $$('li', losses), lastLi = lossRows[lossRows.length - 1], lastCut = $('.cut', lastLi);
  var wA = $('.wire--a path'), wB = $('.wire--b path'), wire = { a: 1, b: 1 }, wired = 1;
  function offsetIn(el, anc) {
    var x = 0, y = 0;
    while (el && el !== anc) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
    return el === anc ? { x: x, y: y } : null;
  }
  function buildWire() {
    if (!wA || !wB) return;
    var li = offsetIn(lastLi, absence), lr = lastLi.getBoundingClientRect(), cr = lastCut.getBoundingClientRect();
    var ab = absence.getBoundingClientRect(), st = stage.getBoundingClientRect(), mv = miniV.getBoundingClientRect(), or = origin.getBoundingClientRect();
    if (!li) return;
    // координати в #absence без transform рядка (рядок може ще бути в стані проявлення)
    var cx = li.x + (cr.left - lr.left), cy = li.y + (cr.top - lr.top) + cr.height / 2;
    var X = mv.right + 4 - st.left, H = absence.offsetHeight, ptsA;
    if (desktopRoute()) {
      // ПК: уздовж наявних ліній плити — розділювача колонок і верхньої межі примітки, — потім полем біля знака
      var lo = offsetIn(losses, absence) || { x: losses.getBoundingClientRect().left - ab.left, y: 0 };
      var lx = lo.x + .5, lb = lo.y + losses.offsetHeight;
      ptsA = [[cx, cy], [lx, cy], [lx, lb], [X, lb], [X, H]];
    } else {
      // телефон: провід іде лівим полем сторінки (поза плитою), не перекреслюючи текст примітки
      var xg = losses.closest('.plate').getBoundingClientRect().left - ab.left - 8;
      ptsA = [[cx, cy], [xg, cy], [xg, H]]; X = xg;
    }
    var oy = (or.top + or.bottom) / 2 - st.top, ox = or.right - st.left - .5;
    var poly = function (p) { return 'M' + p.map(function (q) { return q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join(' L'); };
    wA.setAttribute('d', poly(ptsA));
    var ox2 = desktopRoute() ? ox : or.left - st.left + .5;
    wB.setAttribute('d', poly([[X, 0], [X, oy], [ox2, oy]]));
    wire.a = wA.getTotalLength() || 1; wire.b = wB.getTotalLength() || 1;
    wA.style.strokeDasharray = wire.a + ' ' + wire.a; wB.style.strokeDasharray = wire.b + ' ' + wire.b;
  }
  function drawWire(f) {
    if (!wA || !wB) return;
    wired = Math.max(0, Math.min(1, f));
    var len = (wire.a + wire.b) * wired, la = Math.min(len, wire.a), lb = Math.max(0, len - wire.a);
    wA.style.strokeDashoffset = (wire.a - la).toFixed(1);
    wB.style.strokeDashoffset = (wire.b - lb).toFixed(1);
  }
  var geometry = function () { buildRoute(); drawRoute(drawn); buildWire(); drawWire(wired); };
  later(geometry);

  if (!window.gsap || !window.ScrollTrigger) { root.classList.remove('js-motion'); return; }
  gsap.registerPlugin(ScrollTrigger);
  window.__motionReady = true;

  var IN = 'expo.out';
  var from = function (blur, y) { return { opacity: 0, y: y, filter: 'blur(' + blur + 'px)' }; };
  var to = function (d, extra) {
    var v = { opacity: 1, y: 0, filter: 'blur(0px)', duration: d, ease: IN, clearProps: 'filter,transform' };
    for (var k in extra) v[k] = extra[k];
    return v;
  };
  var t0 = performance.now();
  var since = function () { return (performance.now() - t0) / 1000; };

  // Нижче першого екрана нічого не ховаємо до першої справжньої прокрутки: повні скриншоти без прокрутки бачать усе.
  var armers = [], armed = false;
  var below = function (el) { return el.getBoundingClientRect().top > innerHeight * 0.92; };
  function arm() {
    if (armed) return; armed = true;
    removeEventListener('scroll', arm);
    flush();
    root.classList.add('is-armed');
    armers.forEach(function (f) { f(); });
  }

  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function (ctx) {
    var killers = [], alive = true;
    // шматок налаштування нижче першого екрана — у простій, але в тому ж gsap-контексті (revert прибере й його)
    var soon = function (f) { later(function () { if (alive) ctx.add(f); }); };
    killers.push(function () { alive = false; });

    /* ---------- hero: Lead — рядок 1 + ротатор; пролог моменту — знак V ---------- */
    var l1 = $('.hero .l1'), shine = $('.shine', l1), shineIn = $('.shine__in', l1);
    var F = .34, SD = 1.6;
    var sweep = function () {
      return gsap.timeline().set(shine, { opacity: 1 })
        .fromTo(shine, { xPercent: -100 }, { xPercent: 100 / F, duration: SD, ease: 'power1.inOut' }, 0)
        .fromTo(shineIn, { xPercent: 100 * F }, { xPercent: -100, duration: SD, ease: 'power1.inOut' }, 0)
        .set(shine, { opacity: 0 });
    };
    var rot = window.KitRotator ? window.KitRotator($('.hero [data-rotate]')) : null;
    var trace = $('.v-trace'), barGlow = $('.v-bar-glow'), vbar = $('.v-bar');
    var hero = gsap.timeline()
      .fromTo('.hero .grid-bg', { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power1.out' }, 0)
      .fromTo('.hero .glow-a, .hero .glow-b', { opacity: 0 }, { opacity: 1, duration: 2.2, ease: 'power1.out' }, .1)
      .fromTo('.hero .hero-kicker', { opacity: 0 }, { opacity: 1, duration: .6, ease: 'power1.out' }, .04)
      .fromTo(l1, from(14, 20), to(1.1), .1)
      .set('.hero .rot', { opacity: 1 }, .3)
      .fromTo('.vmark svg', { opacity: 0, scale: .96, filter: 'blur(16px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: IN, clearProps: 'filter' }, .2)
      .fromTo('.hero .lede', from(10, 16), to(.95), .52)
      .fromTo('.hero .cta', from(8, 14), to(.85), .64)
      .fromTo('.vmark__cap', { opacity: 0 }, { opacity: 1, duration: .6, ease: 'power1.out' }, .9)
      .fromTo(trace, { opacity: 0, strokeDashoffset: 0 }, { opacity: 1, duration: .25, ease: 'power1.out' }, .8)
      .to(trace, { strokeDashoffset: -100, duration: 1.0, ease: 'sine.inOut' }, .8)
      .to(trace, { opacity: 0, duration: .25, ease: 'power1.in' }, 1.6)
      .fromTo(barGlow, { opacity: .3 }, { opacity: 1, duration: .3, ease: 'power2.out' }, 1.45)
      .fromTo(vbar, { fill: '#bdbdb9' }, { fill: '#ffffff', duration: .3, ease: 'power2.out' }, 1.45)
      // після спалаху риска стихає: біла кнопка лишається найяскравішою заповненою формою (критик ц.3/ц.4)
      .to(barGlow, { opacity: .3, duration: .55, ease: 'power1.inOut' }, 1.75)
      .to(vbar, { fill: '#bdbdb9', duration: .55, ease: 'power1.inOut' }, 1.75)
      .add(sweep(), .95);
    // хвиля: «Ціна відсутності», що вже в першому екрані, проявляється після Lead hero, а не стоїть різкою з 0 мс
    var foldAbs = $$('#absence .kicker, #absence [data-blur], #absence .plate__note').filter(function (el) { return el.getBoundingClientRect().top < innerHeight; });
    if (foldAbs.length) hero.fromTo(foldAbs, from(10, 14), to(.9, { stagger: .08 }), .7);
    if (rot) { hero.add(rot.enter(), .3); rot.start(2.7); } else gsap.set('.hero .rot', { opacity: 1 });
    var fine = matchMedia('(hover: hover) and (pointer: fine)').matches, busy = null;
    var replay = function () { if (busy && busy.isActive()) return; busy = sweep(); };
    if (fine) l1.addEventListener('pointerenter', replay);
    killers.push(function () { l1.removeEventListener('pointerenter', replay); if (rot) rot.destroy(); });

    /* ---------- X01: заголовки й рядки з розмиття (лише нижче першого екрана, після першої прокрутки) ---------- */
    armers.push(function () {
      $$('[data-blur]').forEach(function (h) {
        if (!below(h)) return;
        gsap.set(h, from(12, 18));
        var inF = !!h.closest('#formats'), phone = !desktopRoute();
        // телефон (критик ц.5 р.1–2, дослівно: 'top 95%' і 0,6 с): заголовок «Форматів» осідає раніше й коротше — до того, як перший рядок цін дійде до середини
        ScrollTrigger.create({ trigger: h, start: inF ? (phone ? 'top 95%' : 'top 50%') : 'top 88%', once: true, onEnter: function () { gsap.to(h, to(inF && phone ? .6 : 1.0)); } });
      });
      // смуга 30 / 70 заповнюється
      var pay = $('.pay');
      if (below(pay)) {
        gsap.set(['.pay__a', '.pay__b'], { scaleX: 0 });
        ScrollTrigger.create({ trigger: pay, start: 'top 85%', once: true, onEnter: function () {
          gsap.to('.pay__a', { scaleX: 1, duration: .9, ease: IN });
          gsap.to('.pay__b', { scaleX: 1, duration: 1.1, ease: IN, delay: .25 });
        } });
      }
    });

    /* ---------- X05: коло променя по рамці ---------- */
    var START = [-118, -36, 152, 64, -170];
    var parts = cells.map(function (c, i) {
      return { cell: c, beams: c.querySelectorAll('.beam'), ring: c.querySelector('.bm-ring'), halo: c.querySelector('.bm-halo'), angle: START[i % START.length] };
    });
    function lap(p, dur, strength) {
      var a0 = p.angle, a1 = p.angle + 360; p.angle = a1 % 360;
      return gsap.timeline()
        .fromTo(p.beams, { rotation: a0 }, { rotation: a1, duration: dur, ease: 'sine.inOut' }, 0)
        .fromTo([p.ring, p.halo], { opacity: 0 }, { opacity: strength, duration: dur * .22, ease: 'power1.out' }, 0)
        .to([p.ring, p.halo], { opacity: 0, duration: dur * .34, ease: 'power1.in' }, dur * .66);
    }
    var partOf = function (cell) { return parts.filter(function (p) { return p.cell === cell; })[0]; };

    /* ---------- ФІРМОВИЙ МОМЕНТ: лінія маршруту ---------- */
    var hidden = {};
    onLight = function (k, cell) {
      lap(partOf(cell), 2.1, 1);
      var rise = cell.querySelector('.rise');
      if (hidden[k]) {
        hidden[k] = false;
        gsap.timeline()
          .to(rise, { opacity: 1, duration: .45, ease: 'power1.out' }, 0)
          .to(rise, { yPercent: 0, rotationX: 0, scale: 1, duration: 1.5, ease: IN }, 0);
        var msgs = cell.querySelectorAll('.msg, .lead div, .note, .note-next');
        if (msgs.length) gsap.fromTo(msgs, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .6, ease: IN, delay: .35,
          stagger: function (i) { return [0, .35, .62, .82][i] || i * .2; }, clearProps: 'transform' });
      }
    };
    armers.push(function () {
      routeCells.forEach(function (c, k) {
        if (c.hasAttribute('data-lit') || !below(c)) return;
        hidden[k] = true;
        gsap.set(c.querySelector('.rise'), { opacity: .3, yPercent: 40, rotationX: 24, scale: .92 });
      });
    });
    var routeSec = $('#route');
    var prog = { v: drawn }, wireProg = { v: wired };
    var routeTween = null, wireTween = null;
    killers.push(function () { if (routeTween) routeTween.kill(); if (wireTween) wireTween.kill(); onLight = null; drawRoute(1); drawWire(1); });

    /* ---------- carry: обриви «ціни відсутності» зростаються, і провід від останнього веде до риски знака V ---------- */
    soon(function () {
      // спершу «гасимо» маршрут і провід, але лише якщо секція ще не на екрані
      if (below(routeSec)) {
        routeCells.forEach(function (c) { c.removeAttribute('data-lit'); });
        $$('circle', gNodes).forEach(function (c) { c.removeAttribute('data-lit'); });
        drawRoute(0); prog.v = 0;
      }
      if (routeSec.getBoundingClientRect().top > innerHeight * .85) { drawWire(0); wireProg.v = 0; }
      var cutsA = $$('.cut__a'), cutsB = $$('.cut__b');
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.losses', start: 'top 60%', end: 'bottom 40%', scrub: .6 } })
        .fromTo(cutsA, { x: 0 }, { x: 8 }, 0)
        .fromTo(cutsB, { x: 0 }, { x: -8 }, 0)
        .fromTo('.cut path', { stroke: 'rgba(255,255,255,0.55)' }, { stroke: 'rgba(255,255,255,1)' }, 0)
        .fromTo('.cut', { filter: 'drop-shadow(0 0 0px rgba(255,255,255,0))' }, { filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9))' }, .5);
      killers.push(function () { gsap.set(cutsA.concat(cutsB), { clearProps: 'all' }); });
      // провід добігає до риски рівно тоді, коли з неї стартує лінія маршруту
      var desk = desktopRoute();
      wireTween = gsap.fromTo(wireProg, { v: 0 }, { v: 1, ease: 'none', immediateRender: false,
        onUpdate: function () { drawWire(wireProg.v); },
        scrollTrigger: { trigger: routeSec, start: desk ? 'top 85%' : 'top 95%', end: desk ? 'top 8%' : 'top 40%', scrub: .6 } });
    });

    soon(function () {
      var desk = desktopRoute();
      routeTween = gsap.fromTo(prog, { v: 0 }, { v: 1, ease: 'none', immediateRender: false,
        onUpdate: function () { drawRoute(desk ? prog.v / .9 : prog.v); },
        scrollTrigger: desk ? { trigger: routeSec, start: 'top top', end: 'bottom bottom', scrub: .6 }
                            : { trigger: grid, start: 'top 72%', end: 'bottom 55%', scrub: .6 } });
      ScrollTrigger.addEventListener('refresh', geometry);
      killers.push(function () { ScrollTrigger.removeEventListener('refresh', geometry); });
      // старт моменту: риска міні-знака V спалахує — лінія видимо виходить із неї
      var flash = function () {
        gsap.timeline()
          .fromTo(miniV, { fill: 'rgba(255,255,255,0.55)' }, { fill: 'rgba(255,255,255,1)', duration: .25, ease: 'power2.out' }, 0)
          .fromTo(origin, { filter: 'drop-shadow(0 0 4px #fff)' }, { filter: 'drop-shadow(0 0 14px #fff)', duration: .25, ease: 'power2.out' }, 0)
          .to(miniV, { fill: 'rgba(255,255,255,0.55)', duration: .9, ease: 'power1.inOut' }, .45)
          .to(origin, { filter: 'drop-shadow(0 0 4px #fff)', duration: .9, ease: 'power1.inOut' }, .45);
      };
      ScrollTrigger.create(desk ? { trigger: routeSec, start: 'top 4%', onEnter: flash }
                                : { trigger: grid, start: 'top 76%', onEnter: flash });
    });

    /* ---------- T06: поле ink → paper розкривається колом з кінця лінії ---------- */
    var paper = $('.field__paper'), field = $('.field');
    soon(function () {
      var foot = $('.route-foot'), fmt = $('#formats');
      // центр кола — там, де закінчилась лінія маршруту: у мить старту вона щойно пішла за верхній край разом із рядком
      // «Почнемо із сайту…», тож папір розливається згори вниз — з тієї ж точки, де починається чорнильна лінія прайсу
      var originAt = function () {
        var x = Math.max(0, Math.min(100, geo.end.x / innerWidth * 100));
        return x.toFixed(1) + '% 0%';
      };
      // ц.7, «спершу дочитати»: коло стартує лише тоді, коли останній рядок маршруту («Почнемо із сайту…») уже пішов
      // за верхній край екрана (і не раніше, ніж верх «Форматів» на 90 %), — край кола ніколи не розтинає й не накриває його.
      // На ПК рядок у липкій сцені: його кінцеве положення рахуємо від низу секції, без getBoundingClientRect під sticky.
      var footGone = function () {
        var fb;
        if (getComputedStyle(stage).position === 'sticky') {
          var rs = routeSec.getBoundingClientRect(), pb = parseFloat(getComputedStyle(routeSec).paddingBottom) || 0, fo = offsetIn(foot, stage);
          fb = rs.bottom - pb - stage.offsetHeight + (fo ? fo.y + foot.offsetHeight : stage.offsetHeight);
        } else fb = foot.getBoundingClientRect().bottom;
        return Math.max(fmt.getBoundingClientRect().top - innerHeight * .9, fb) + scrollY;
      };
      var BLOOM = .6;    // довжина розкриття — 60 % екрана прокрутки: «Формати» недовго на чорному
      // до початку переходу папір невидимий: при стрибку нагору (Home, логотип) диск не «доїжджає» за scrub-затримкою
      var showPaper = function (st) { paper.style.visibility = st.scroll() > st.start ? '' : 'hidden'; };
      var bloomStart = 0;
      gsap.fromTo(paper, { clipPath: function () { return 'circle(0% at ' + originAt() + ')'; } },
        { clipPath: function () { return 'circle(150% at ' + originAt() + ')'; }, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: '#formats', start: function () { return (bloomStart = Math.round(footGone())); },
            end: function () { return bloomStart + Math.round(innerHeight * BLOOM); }, scrub: .6, invalidateOnRefresh: true,
            onRefresh: showPaper, onEnter: showPaper, onLeaveBack: showPaper, onEnterBack: showPaper,
            onToggle: function (st) { paper.style.willChange = st.isActive ? 'clip-path' : ''; } } });
      killers.push(function () { paper.style.visibility = ''; });

      /* ---------- маршрут іде далі: на папері світло стає чорнилом і проходить прайсом ----------
         З точки, де розкрилось коло, чорнильна лінія сходить у ліве поле прайсу й ставить вузол біля кожного формату
         (Spark → Orbit → Supernova); закінчується рискою — тією самою, що й у знаку V. Лише декор: aria-hidden. */
      var plist = $('.plist'), rows = $$('.plist tbody tr'), fgrid = $('.fgrid');
      var prem = $('.tier--premium'), sysCard = $('.systems'), sysRows = $$('.systems .sys__name');
      var NS = 'http://www.w3.org/2000/svg', ink = document.createElementNS(NS, 'svg');
      ink.setAttribute('class', 'ink'); ink.setAttribute('aria-hidden', 'true');
      var mk = function (tag, cls) { var e = document.createElementNS(NS, tag); if (cls) e.setAttribute('class', cls); ink.appendChild(e); return e; };
      var lineA = mk('path', 'ink__line'), lineB = mk('path', 'ink__line'), inkBar = mk('path', 'ink__bar');
      var dots = [0, 1, 2, 3, 4].map(function () { var c = mk('circle'); c.setAttribute('r', '4.5'); return c; });
      fgrid.setAttribute('data-ink', '');   // місце для лінії всередині колонки на телефоні (CSS)
      fmt.appendChild(ink);
      // довжини в px уздовж маршруту: A — головна лінія, B — гілка до «Систем», що відходить від A на позиції bAt
      var LA = 1, LB = 0, bAt = 0, total = 1, dotAt = [], barAt = 1, inkP = 0, wide = true;
      var inkDraw = function (f) {
        inkP = f; var d = f * total;
        lineA.style.strokeDashoffset = (LA - Math.min(d, LA)).toFixed(1);
        if (LB) lineB.style.strokeDashoffset = (LB - Math.max(0, Math.min(d - bAt, LB))).toFixed(1);
        dots.forEach(function (c, k) { c.toggleAttribute('data-on', dotAt[k] !== undefined && d >= dotAt[k] - 1); });
        inkBar.toggleAttribute('data-on', d >= barAt - 1);
      };
      var inkBuild = function () {
        wide = desktopRoute();
        var s = fmt.getBoundingClientRect(), pl = plist.getBoundingClientRect(), W = s.width, H = s.height;
        var rel = function (el) { var r = el.getBoundingClientRect(); return { l: r.left - s.left, t: r.top - s.top, r: r.right - s.left, b: r.bottom - s.top, h: r.height }; };
        var mid = function (el) { var r = rel(el); return Math.round(r.t + r.h / 2); };
        ink.setAttribute('viewBox', '0 0 ' + W + ' ' + H); ink.style.height = H + 'px';
        var ys = rows.map(function (tr) { return mid(tr.querySelector('th')); });
        var d, lx, y0, dEnd;
        dots.forEach(function (c) { c.style.display = 'none'; });
        dotAt = []; LB = 0; lineB.setAttribute('d', '');
        if (wide) {
          // з точки, де розкрилось коло, — у ліве поле, далі вниз: Spark → Orbit → Supernova → Premium
          lx = Math.round(pl.left - s.left - 30) + .5;
          var sx = Math.round(Math.max(lx, Math.min(W - 8, geo.end.x - s.left))) + .5, y1 = 28, r = 14;
          var yPrem = mid(prem.querySelector('h3'));
          var turn = sx - lx > r * 2; if (!turn) sx = lx;
          d = 'M' + sx + ' 0' + (turn ? 'V' + (y1 - r) + 'Q' + sx + ' ' + y1 + ' ' + (sx - r) + ' ' + y1 + 'H' + (lx + r) + 'Q' + lx + ' ' + y1 + ' ' + lx + ' ' + (y1 + r) : 'L' + lx + ' ' + (y1 + r));
          d += 'V' + yPrem; y0 = y1 + r;
          lineA.setAttribute('d', d); LA = lineA.getTotalLength() || 1;
          var head = LA - (yPrem - y0);
          ys.concat([yPrem]).forEach(function (y, k) { dots[k].setAttribute('cx', lx); dots[k].setAttribute('cy', y); dots[k].style.display = ''; dotAt[k] = head + (y - y0); });
          // гілка до «Систем»: у проміжку між прайсом і рядом карток — праворуч до шва Premium | Системи, униз до Premium System
          var gy = Math.round((rel(plist).b + rel(prem).t) / 2) + .5, gx = Math.round((rel(prem).r + rel(sysCard).l) / 2) + .5;
          var yStd = mid(sysRows[0]), yPS = mid(sysRows[1]);
          lineB.setAttribute('d', 'M' + lx + ' ' + gy + 'H' + (gx - 8) + 'Q' + gx + ' ' + gy + ' ' + gx + ' ' + (gy + 8) + 'V' + yPS);
          LB = lineB.getTotalLength(); bAt = head + (gy - y0);
          dots[4].setAttribute('cx', gx); dots[4].setAttribute('cy', yStd); dots[4].style.display = ''; dotAt[4] = bAt + (gx - lx) + (yStd - gy);
          // риска знака V — під ціною Premium System $7500
          var pv = rel(sysRows[1].querySelector('.pv'));
          inkBar.setAttribute('d', 'M' + (pv.r - 26) + ' ' + (pv.b + 5) + 'h24l-3.5 6h-24z');
          dEnd = bAt + LB;
        } else {
          // телефон: лінія всередині колонки прайсу (card.left + 14), від верху картки — ніколи під пігулкою навігації
          lx = Math.round(pl.left - s.left + 14) + .5; y0 = Math.round(pl.top - s.top + 22);
          var yEnd = ys[ys.length - 1];
          lineA.setAttribute('d', 'M' + lx + ' ' + y0 + 'V' + yEnd); LA = lineA.getTotalLength() || 1;
          ys.forEach(function (y, k) { dots[k].setAttribute('cx', lx); dots[k].setAttribute('cy', y); dots[k].style.display = ''; dotAt[k] = y - y0; });
          inkBar.setAttribute('d', ''); dEnd = LA;
        }
        lineA.style.strokeDasharray = LA + ' ' + LA;
        lineB.style.strokeDasharray = (LB || 1) + ' ' + (LB || 1);
        total = Math.max(LA, dEnd); barAt = wide ? total : Infinity;
        inkDraw(inkP);
      };
      inkBuild();
      ScrollTrigger.addEventListener('refreshInit', inkBuild);
      // desktop: старт, коли таблиця вже на екрані (критик ц.5 р.2) — гачок не висить у порожньому папері
      // ц.7: чорнило не малюється по чорному — не раніше, ніж коло T06 (тепер пізніше) пройде третину екрана
      var inkStart = 0;
      ScrollTrigger.create({ trigger: plist, start: function () {
          var own = plist.getBoundingClientRect().top + scrollY - innerHeight * (desktopRoute() ? .8 : .92);
          return (inkStart = Math.round(Math.max(own, bloomStart + innerHeight * .3)));
        },
        end: function () { var el = desktopRoute() ? sysCard : plist; return Math.max(inkStart + innerHeight * .5, el.getBoundingClientRect().bottom + scrollY - innerHeight * .62); }, scrub: .5, invalidateOnRefresh: true,
        onRefresh: inkBuild, onUpdate: function (st) { inkDraw(st.progress); } });
      killers.push(function () { ScrollTrigger.removeEventListener('refreshInit', inkBuild); ink.remove(); fgrid.removeAttribute('data-ink'); });

      /* ---------- T01: шторка — папір піднімається, відкриваючи чорне полотно форми ---------- */
      gsap.fromTo(field, { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)' },
        { clipPath: 'inset(0% 0% 100% 0% round 0px 0px 48px 48px)', ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: '#contact', start: desktopRoute() ? 'top 80%' : 'top 88%', end: 'top 35%', scrub: .6 } });
      // лінія замикається: коло променя по формі
      var formPart = partOf($('[data-form]')), formOn = false, ambientOn = false;
      var ambient = gsap.timeline({ paused: true, repeat: -1 }).fromTo(formPart.beams, { rotation: 0 }, { rotation: 360, duration: 10, ease: 'none' });
      ScrollTrigger.create({ trigger: '[data-form]', start: 'top 70%', once: true, onEnter: function () {
        lap(formPart, 2.3, 1).eventCallback('onComplete', function () {
          gsap.to([formPart.ring, formPart.halo], { opacity: .55, duration: 1.2 });
          ambientOn = true; if (formOn) ambient.play();
        });
      } });
      ScrollTrigger.create({ trigger: '[data-form]', start: 'top bottom', end: 'bottom top', onToggle: function (s) {
        formOn = s.isActive;
        if (formOn && ambientOn) ambient.play(); else ambient.pause();
      } });
      killers.push(function () { ambient.kill(); });
    });

    /* ---------- перемикач $ / ₴: числа котяться ---------- */
    rollPrices = function () {
      gsap.fromTo(prices, { yPercent: 60, opacity: 0, filter: 'blur(6px)' },
        { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: .45, ease: IN, stagger: .03, clearProps: 'filter,transform' });
    };
    killers.push(function () { rollPrices = null; });

    /* ---------- процес: таймлайн руху з «головкою» і журнал конвеєра (X03) ---------- */
    soon(function () {
      // головка ходить лише колонкою ВИДИМИХ смуг (на телефоні першу приховано), підписи вона не перетинає.
      // Вимір — у нетрансформованих координатах .tl (offsetLeft/offsetWidth): картка стопки буває зменшена й нахилена.
      var tlHead = $('.tl__head'), tlBox = tlHead.parentNode, tlCard = tlBox.closest('[data-card]');
      var tlTracks = $$('.tl__row:not(.tl__axis) i', tlBox), tlRun = 0, tlOn = false, headLoop = null;
      var tlMeasure = function () {
        var vis = tlTracks.filter(function (i) { return i.offsetWidth > 0; });
        if (!vis.length) { tlRun = 0; return; }
        var l = Math.min.apply(null, vis.map(function (i) { return i.offsetLeft; }));
        var r = Math.max.apply(null, vis.map(function (i) { return i.offsetLeft + i.offsetWidth; }));
        tlHead.style.left = l + 'px'; tlRun = Math.max(0, r - l - 2);
      };
      var tlBuild = function () {
        if (headLoop) headLoop.kill();
        tlMeasure();
        headLoop = gsap.timeline({ paused: !tlOn, repeat: -1, repeatDelay: .5 })
          .fromTo(tlHead, { opacity: 0, x: 0 }, { opacity: 1, duration: .2 }, 0)
          .to(tlHead, { x: tlRun, duration: 2.6, ease: 'none' }, 0)
          .to(tlHead, { opacity: 0, duration: .25 }, 2.4);
      };
      tlBuild();
      // грає, поки картка на екрані; поза ним — пауза. IntersectionObserver бачить справжню (трансформовану) картку —
      // ScrollTrigger усередині липкої картки рахував позиції не там і ставив петлю на паузу на видноті
      var tlIO = new IntersectionObserver(function (es) {
        tlOn = es[es.length - 1].isIntersecting;
        if (tlOn) headLoop.play(); else headLoop.pause();
      });
      tlIO.observe(tlCard);
      // зміна розміру колонки (resize, поворот телефона) — міряємо заново й починаємо прохід спочатку
      var tlW = -1, tlRO = new ResizeObserver(function () { if (tlBox.offsetWidth !== tlW) { tlW = tlBox.offsetWidth; tlBuild(); } });
      tlRO.observe(tlBox);

      var log = $('.log'), STAGES = [['Бриф', 'факти з джерелами'], ['Референси', 'справжні сайти'], ['Концепт сторінки', '3 напрями'],
        ['Режисура руху', 'переходи між секціями'], ['Незалежний критик', 'бачить кадри руху'], ['Ворота якості', 'кожна з 11 оцінок ≥ 8'],
        ['Прев’ю на погодження', 'вам']];
      var pitch = function () { return parseFloat(getComputedStyle(log).getPropertyValue('--pitch')) || 50; };
      var rows = $$('.log__row', log), P = pitch();
      rows.forEach(function (r, i) { gsap.set(r, { y: i * P }); });
      var si = 0, logOn = false;
      function tick() {
        var s = STAGES[si++ % STAGES.length], li = document.createElement('li'), p = pitch();
        li.className = 'log__row'; li.setAttribute('data-new', '');
        li.innerHTML = '<span></span><small></small>'; li.firstChild.textContent = s[0]; li.lastChild.textContent = s[1];
        log.prepend(li); rows.unshift(li);
        gsap.fromTo(li, { y: -p * .6, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: .7, ease: IN });
        rows.forEach(function (r, i) {
          if (i === 0) return;
          if (i === 1) r.removeAttribute('data-new');
          gsap.to(r, { y: i * p, duration: .7, ease: IN });
        });
        while (rows.length > 6) { var gone = rows.pop(); gone.remove(); }
      }
      var logTimer = gsap.delayedCall(2.4, function next() { if (logOn) tick(); logTimer = gsap.delayedCall(2.4, next); });
      ScrollTrigger.create({ trigger: log, start: 'top bottom', end: 'bottom top', onToggle: function (s) { logOn = s.isActive; } });
      killers.push(function () {
        tlIO.disconnect(); tlRO.disconnect();
        headLoop.kill(); logTimer.kill(); gsap.set(tlHead, { clearProps: 'all' }); tlHead.style.left = '';
      });
    });

    return function () { killers.forEach(function (f) { f(); }); root.classList.remove('js-motion'); };
  });

  /* ---------- T05: стопка етапів — цикл 4: короткий вхід аркуша ----------
     Правило «спершу дочитати»: кожна картка, зокрема остання, стоїть цілою й нерухомою не менше D.hold екрана прокрутки,
     і її останній рядок лежить у смузі 20–80 % вікна. Наступна картка чекає непрозорою за нижнім краєм екрана й
     за D.enter екрана прокрутки «лягає на стос» (ц.7: без напівпрозорості — тексти карток не змішуються),
     з масштабу D.inScale і нахилу D.inTilt (низ аркуша до глядача), разом із ±3° «кинутого» повороту.
     Крок слота: U_k = (вхід картки k) + пауза + (різниця верхів прилипання сусідів).
     Невидимий стан ставимо лише після першої справжньої прокрутки: повний скриншот без прокрутки бачить усі картки. */
  var deck = function (D, add) {
    var slots = $$('.slot'), cards = slots.map(function (s) { return s.querySelector('[data-card]'); });
    var T = 0, tops = [], cuts = [], E = 0;
    var topOf = function (k) { return tops[k] !== undefined ? tops[k] : T; };
    var size = function () {
      cards.forEach(function (c) { c.style.top = ''; });
      slots.forEach(function (s) { s.style.height = ''; s.style.marginBottom = ''; });
      var vh = innerHeight; T = parseFloat(getComputedStyle(cards[0]).top) || 0;
      E = Math.round(D.enter * vh);
      var H = Math.round(D.hold * vh);
      var hs = cards.map(function (c) { return c.offsetHeight; });
      // низ картки ≤ 86 % екрана: з нижнім полем картки її останній рядок лягає вище 80 %
      tops = hs.map(function (h) { return Math.round(Math.min(T, vh * .86 - h)); });
      var last = hs.length - 1;
      // остання картка теж стоїть повну паузу, далі — короткий хвіст до шторки форми
      var U = hs.map(function (h, k) {
        return k === last ? E + H + Math.round(D.tail * vh) + h : (k ? E : 0) + H + tops[k + 1] - tops[k];
      });
      // картка позаду не визирає з-під жодної з карток, що лягають на неї (ц.7: не лише з-під наступної) —
      // низ ховаємо clip-path, лишається смужка «Етап N з 4» згори. Для кожного рівня l: зсув −peek·l, масштаб 1 − scale·l
      // і нахил tilt із перспективою (низ до глядача — проєкція довша); беремо найбільшу потрібну обрізку
      var th = D.tilt * Math.PI / 180, cos = Math.cos(th), sin = Math.sin(th), P = D.persp;
      cuts = hs.map(function (h, k) {
        var need = 0;
        for (var l = 1; l <= D.depth && k + l < hs.length; l++) {
          var s = 1 - D.scale * l;
          var Z = (tops[k + l] + hs[k + l] - 10) - (tops[k] - vh * D.peek * l);   // дозволена висота на екрані
          var Y = Z * P / (P * cos + Z * sin);                                       // та сама висота до нахилу
          need = Math.max(need, h - Y / s);
        }
        return need > 0 ? Math.ceil(need) : 0;
      });
      cards.forEach(function (c, k) { if (tops[k] !== T) c.style.top = tops[k] + 'px'; });
      slots.forEach(function (s, k) {
        var rest = 0; for (var j = k + 1; j < U.length; j++) rest += U[j];
        s.style.height = (U[k] + rest) + 'px'; s.style.marginBottom = (-rest) + 'px';
      });
    };
    var level = function (l, push) {
      return { y: function () { return -innerHeight * D.peek * l; }, scale: 1 - D.scale * l, rotationX: l ? D.tilt : 0, rotation: push, opacity: l >= D.depth ? 0 : 1 };
    };
    // вікно входу картки k: від прилипання — D.enter екрана прокрутки
    var range = function (k) {
      return { trigger: slots[k], start: function () { return 'top ' + topOf(k) + 'px'; }, end: function () { return '+=' + E; },
               scrub: D.scrub, invalidateOnRefresh: true };
    };
    size();
    ScrollTrigger.addEventListener('refreshInit', size);
    gsap.set(cards, { transformOrigin: '50% 0%', transformPerspective: D.persp });
    var build = function () {
      cards.forEach(function (card, k) {
        if (k) {
          var deal = +(card.dataset.deal || 0) * D.deal, dealX = +(card.dataset.dealX || 0) * D.deal;
          // ц.7: аркуш завжди непрозорий і чекає ЗА нижнім краєм екрана (а не на третині екрана з opacity 0) —
          // жодного кадру, де текст двох карток змішується, ні вниз, ні вгору (тоді він так само йде за край)
          gsap.timeline({ scrollTrigger: range(k) })
            .fromTo(card, { y: function () { return innerHeight - topOf(k) + 48; }, scale: D.inScale, rotationX: -D.inTilt, rotation: deal, xPercent: dealX },
              { y: 0, scale: 1, rotationX: 0, rotation: 0, xPercent: 0, duration: 1, ease: 'power2.out' }, 0);
        }
        if (k < cards.length - 1) gsap.fromTo(card, { clipPath: 'inset(0px 0px 0px 0px)' },
          { clipPath: function () { return 'inset(0px 0px ' + (cuts[k] || 0) + 'px 0px)'; }, ease: 'none', immediateRender: false, scrollTrigger: range(k + 1) });
        var push = +((cards[k + 1] && cards[k + 1].dataset.push) || 0);
        for (var l = 1; l <= D.depth && k + l < cards.length; l++) {
          gsap.fromTo(card, level(l - 1, l === 1 ? 0 : push), Object.assign(level(l, push), { ease: 'none', immediateRender: false, scrollTrigger: range(k + l) }));
          gsap.fromTo(card.querySelector('.card__shade'), { opacity: D.shade[l - 1] },
            { opacity: D.shade[l], ease: 'none', immediateRender: false, scrollTrigger: range(k + l) });
        }
      });
    };
    if (armed) add(build); else armers.push(function () { add(build); });
    // клавіатура: фокус у картці повертає її на початок паузи (уже вхідною, цілою)
    var focusers = cards.map(function (card, k) {
      var f = function () { var y = slots[k].getBoundingClientRect().top + scrollY - topOf(k) + (k ? E : 0); if (Math.abs(scrollY - y) > 4) scrollTo(0, y); };
      card.addEventListener('focusin', f); return f;
    });
    return function () {
      ScrollTrigger.removeEventListener('refreshInit', size);
      cards.forEach(function (c, k) { c.removeEventListener('focusin', focusers[k]); c.style.top = ''; });
      slots.forEach(function (s) { s.style.height = ''; s.style.marginBottom = ''; });
    };
  };
  var deckIn = function (D) {
    return function (ctx) {
      var undo = null, alive = true;
      // стопка змінює висоту сторінки: тригери, створені раніше (шторка T01, коло променя на формі), перераховуємо,
      // інакше шторка відпрацьовує раніше — ще під картками (корінь «порожнього чорного» перед формою, цикл 3)
      later(function () {
        if (!alive) return;
        ctx.add(function () { undo = deck(D, function (f) { if (alive) ctx.add(f); }); });
        // точково: лише тригери нижче стопки (повний refresh на телефоні — довга задача)
        ScrollTrigger.getAll().forEach(function (st) { var t = st.trigger; if (t && t.closest && t.closest('#contact')) st.refresh(); });
      });
      return function () { alive = false; if (undo) undo(); };
    };
  };
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)',
    deckIn({ peek: .026, scale: .055, tilt: 6, persp: 1500, depth: 3, shade: [0, .34, .6, .82], scrub: .6, deal: 1,
             hold: .75, enter: .32, inScale: .9, inTilt: 9, tail: .06 }));
  mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)',
    deckIn({ peek: .02, scale: .05, tilt: 4, persp: 1100, depth: 3, shade: [0, .45, .7, .85], scrub: .4, deal: .6,
             hold: .75, enter: .3, inScale: .92, inTilt: 7, tail: .04 }));

  /* ---------- X05 світло курсора по рамках (лише точний курсор; підсилення, не момент) ---------- */
  mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', function () {
    var zones = $$('.route-grid, .contact-in');
    var edges = cells.map(function (c) { return c.querySelector('.bm-edge'); });
    var movers = cells.map(function (c) {
      var d = c.querySelector('.bm-edge i');
      return { x: gsap.quickTo(d, 'x', { duration: .5, ease: 'power3' }), y: gsap.quickTo(d, 'y', { duration: .5, ease: 'power3' }) };
    });
    var rects = null;
    var measure = function () { rects = cells.map(function (c) { return c.getBoundingClientRect(); }); };
    var drop = function () { rects = null; };
    var enter = function () { measure(); gsap.to(edges, { opacity: 1, duration: .35, overwrite: 'auto' }); };
    var leave = function () { gsap.to(edges, { opacity: 0, duration: .6, overwrite: 'auto' }); };
    var move = function (e) { if (!rects) measure(); movers.forEach(function (m, i) { m.x(e.clientX - rects[i].left); m.y(e.clientY - rects[i].top); }); };
    zones.forEach(function (z) { z.addEventListener('pointerenter', enter); z.addEventListener('pointerleave', leave); z.addEventListener('pointermove', move); });
    addEventListener('scroll', drop, { passive: true });
    return function () {
      zones.forEach(function (z) { z.removeEventListener('pointerenter', enter); z.removeEventListener('pointerleave', leave); z.removeEventListener('pointermove', move); });
      removeEventListener('scroll', drop);
    };
  });

  addEventListener('scroll', arm, { passive: true });
  addEventListener('resize', geometry);
})();
