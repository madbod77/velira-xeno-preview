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
  // ц.10: підкладка під аркушем меню (0 → .6 за 240 мс, TH/XE); дотик по ній закриває меню
  var scrim = document.createElement('div');
  scrim.className = 'scrim'; scrim.setAttribute('aria-hidden', 'true');
  sheet.after(scrim);
  scrim.addEventListener('click', function () { setOpen(false); });
  function setOpen(open) {
    burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
    sheet.classList.toggle('is-open', open); scrim.classList.toggle('is-open', open);
    sheet.setAttribute('aria-hidden', String(!open)); sheet.inert = !open;
  }
  burger.addEventListener('click', function () { setOpen(burger.getAttribute('aria-expanded') !== 'true'); });
  sheet.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

  /* CSS-петлі (дрейф світіння) стоять поза екраном */
  var loopIO = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('is-off', !e.isIntersecting); }); });
  $$('.scene').forEach(function (s) { loopIO.observe(s); });

  /* Важке (геометрія, ScrollTrigger-и нижче першого екрана) — по одному шматку в простої головного потоку,
     щоб завантаження телефона не складалося з довгих задач; перша прокрутка доробляє чергу одразу. */
  // ц.12: таймаут простою 1400 → 150 мс. У Firefox черга простою виконується пізніше, ніж у Chrome (поки йде анімація
  // першого екрана, простою майже немає), і шматки налаштування чекали до 1,4 с кожен — проява заголовка форми запізнювалась.
  // Тепер кожен шматок стартує не пізніше ніж за 150 мс у будь-якому браузері.
  var queue = [], pumping = false, IDLE_MAX = 150;
  var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 50); };
  function pump() {
    idle(function () { var f = queue.shift(); if (f) f(); if (queue.length) pump(); else pumping = false; }, { timeout: IDLE_MAX });
  }
  function later(f) { queue.push(f); if (!pumping) { pumping = true; pump(); } }
  function flush() { while (queue.length) queue.shift()(); }
  /* ц.13 (власник-делегат: довгі задачі на телефоні під час завантаження): налаштування секцій нижче першого екрана
     (ScrollTrigger-и, геометрія чорнила, шторки, лінії до форми, таймлайн процесу) не будуються при завантаженні, а лише коли
     секція підійде на 1 висоту екрана (IntersectionObserver rootMargin 100 %). Кожна ціль — список: спрацьовує на першій
     секції списку, що наблизилась (перехід за якорем повз секцію теж будує її налаштування). Самі шматки — у черзі простою,
     кожен окремою задачею. Вигляд і рух ті самі: усе готове ще за екран до появи. */
  var waits = [];
  var nearIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      waits.forEach(function (w) { if (!w.done && w.els.indexOf(e.target) >= 0) { w.done = true; later(w.f); } });
    });
  }, { rootMargin: '100% 0px 100% 0px' }) : null;
  function whenNear(sel, f) {
    var els = sel.split(',').map(function (s) { return $(s.trim()); }).filter(Boolean);
    if (!nearIO || !els.length) { later(f); return; }
    waits.push({ els: els, f: f, done: false });
    els.forEach(function (el) { nearIO.observe(el); });
  }

  /* X05: квадрати променя покривають клітинку під час обертання (розмір — з ResizeObserver, без читань макета) */
  var cells = $$('.cell');
  var ro = new ResizeObserver(function (list) {
    list.forEach(function (e) {
      var b = e.borderBoxSize && e.borderBoxSize[0], w = b ? b.inlineSize : e.target.offsetWidth, h = b ? b.blockSize : e.target.offsetHeight;
      e.target.style.setProperty('--d', Math.ceil(Math.hypot(w, h) + 16) + 'px');
    });
  });
  // ц.13: розмір потрібен лише для кола променя (маршрут, форма) — спостерігаємо, коли маршрут за екран, а не в першому кадрі
  whenNear('#route, #formats, #process, #contact', function () { cells.forEach(function (c) { ro.observe(c); }); });

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

  /* ================= форма заявки ================= */
  // Є data-endpoint → заявка йде на сервер (Google Apps Script). Нема або сервер не відповів →
  // відкриваємо Telegram з уже написаним текстом заявки: людині лишається натиснути «Надіслати».
  var form = $('#lead-form'), status = form.querySelector('.form__status'), sendBtn = form.querySelector('[type="submit"]');
  var TG = 'https://t.me/madbod_77', PRIVACY_VERSION = form.getAttribute('data-privacy') || '';
  var say = function (html) { status.innerHTML = html; };
  var tgLink = function (text) { return TG + '?text=' + encodeURIComponent(text); };
  var track = function (n, p) { if (typeof window.veliraTrack === 'function') window.veliraTrack(n, p); };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = $$('[required]', form).filter(function (f) {
      var ok = f.type === 'checkbox' ? f.checked : f.value.trim().length > 0;
      if (f.type !== 'checkbox') f.setAttribute('aria-invalid', String(!ok));
      return !ok;
    });
    if (bad.length) { say('Заповніть усі поля й позначте обидві згоди.'); bad[0].focus(); return; }
    var v = function (n) { return (form.elements[n] && form.elements[n].value || '').trim(); };
    var attr = typeof window.veliraAttribution === 'function' ? window.veliraAttribution() : {};
    var from = [attr.gclid || attr.gbraid || attr.wbraid ? 'Google Ads' : attr.utm_source, attr.utm_campaign].filter(Boolean).join(' · ');
    var text = 'Заявка з сайту Velira\nІм’я / бренд: ' + v('name') + '\nКонтакт: ' + v('contact') + '\nЗадача: ' + v('brief') + (from ? '\nЗвідки: ' + from : '');
    var endpoint = form.getAttribute('data-endpoint') || '';
    var fallback = function (lead, label) {
      say(lead + ' <a class="form__tg" href="' + tgLink(text) + '" target="_blank" rel="noopener">' + (label || 'Відкрити Telegram з текстом заявки') + '</a>');
    };
    if (!endpoint) {
      var win = window.open(tgLink(text), '_blank', 'noopener');
      if (win) fallback('Відкрили Telegram з текстом заявки — натисніть «Надіслати» в чаті.', 'Чат не відкрився?');
      else fallback('Текст заявки готовий.');
      track('lead_telegram_draft', { method: 'telegram' });
      return;
    }
    var payload = {
      name: v('name'), contact: v('contact'), brief: v('brief'), company: v('company'),
      privacyAcknowledged: form.elements.privacyAcknowledged.checked,
      deliveryConsent: form.elements.deliveryConsent.checked,
      privacyVersion: PRIVACY_VERSION, source: 'home', language: 'uk', page: location.href.split('#')[0].slice(0, 300), attribution: attr
    };
    sendBtn.disabled = true; say('Надсилаємо…');
    var ctl = 'AbortController' in window ? new AbortController() : null, timer = setTimeout(function () { if (ctl) ctl.abort(); }, 12000);
    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || res.ok !== true) throw new Error((res && res.error) || 'not ok');
        form.reset(); $$('[aria-invalid]', form).forEach(function (f) { f.removeAttribute('aria-invalid'); });
        say('Заявку отримали. Відповімо за контактом, який ви вказали.');
        track('lead_form_submit', { method: 'form' });
      })
      .catch(function () { fallback('Не вдалося надіслати з сайту.'); })
      .then(function () { clearTimeout(timer); sendBtn.disabled = false; });
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
    geo.L = cum; geo.lens = lens; geo.pts = pts; geo.nodes = nodes;
    if (spotPark) spotPark();
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
  // доля намальованої лінії (без руху — уся). ц.13: у режимі руху, коли маршрут нижче 85 % екрана, лінія з самого початку
  // не намальована (як провід нижче) — раніше перша побудова геометрії малювала її всю, запалювала 4 картки й запускала
  // 4 кола променя поза екраном (≈20 мс на телефоні ×4 CPU + кадри intro), а потім усе гасилося
  var drawn = root.classList.contains('js-motion') && matchMedia('(prefers-reduced-motion: no-preference)').matches &&
    $('#route').getBoundingClientRect().top > innerHeight * .85 ? 0 : 1;
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
  var spotPark = null, spotLit = null, spotOff = null;   // V02 (нижче): світло осідає на вузлі, до якого дійшла лінія
  function lightCell(k, circle) {
    if (circle && !circle.hasAttribute('data-lit')) circle.setAttribute('data-lit', '');
    var c = routeCells[k];
    if (c.hasAttribute('data-lit')) return;
    c.setAttribute('data-lit', '');
    if (onLight) onLight(k, c);
    if (spotLit) spotLit(k);
  }
  /* ================= провід: від останнього зрощеного обриву «Ціни відсутності» до риски міні-знака V =================
     Дві частини: A — у секції #absence (до її нижнього краю), B — у сцені маршруту (від її верху до риски);
     шов лежить рівно на межі секцій, тож на ПК, коли сцена маршруту прилипає, він уже за верхнім краєм екрана. */
  var absence = $('#absence'), stage = $('.route-stage'), losses = $('.losses'), miniV = $('.mini-v');
  var lossRows = $$('li', losses), lastLi = lossRows[lossRows.length - 1], lastCut = $('.cut', lastLi);
  // ц.11: провід будується в простої (later), а гаситься ще пізніше (soon) — між ними він малювався повністю: на першому
  // кадрі intro це був «кутик» на роздільнику плити. Тепер у режимі руху, коли маршрут нижче 85 % екрана, провід з самого
  // початку не намальований (та сама умова, що й у soon нижче); без руху — увесь.
  var wA = $('.wire--a path'), wB = $('.wire--b path'), wire = { a: 1, b: 1 };
  var wired = root.classList.contains('js-motion') && matchMedia('(prefers-reduced-motion: no-preference)').matches &&
    $('#route').getBoundingClientRect().top > innerHeight * .85 ? 0 : 1;
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
  // ц.13: у режимі руху геометрію лінії й проводу будуємо, коли маршрут (або нижча секція) за екран від видимої зони:
  // до того обидві не намальовані (drawn = wired = 0), а провід починає малюватись лише з 'top 95%' маршруту.
  // Без руху — як раніше, у першому простої (статична лінія видна одразу)
  if (wired === 0) whenNear('#route, #formats, #process, #contact', geometry); else later(geometry);

  if (!window.gsap || !window.ScrollTrigger) { root.classList.remove('js-motion'); wired = 1; drawn = 1; return; }
  gsap.registerPlugin(ScrollTrigger);
  window.__motionReady = true;

  /* ц.10 — граматика руху за knowledge/SYNTHESIS.md §3 (виміри xeno.now і 21st.dev; див. motion.md, таблиця «було → стало»).
     GSAP не розбирає рядок cubic-bezier() без CustomEase — тож крива рахується тут (Ньютон по x, 6 кроків). */
  var bez = function (x1, y1, x2, y2) {
    var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    return function (x) {
      if (x <= 0) return 0; if (x >= 1) return 1;
      var t = x;
      for (var i = 0; i < 6; i++) {
        var fx = ((ax * t + bx) * t + cx) * t - x, d = (3 * ax * t + 2 * bx) * t + cx;
        if (Math.abs(fx) < 1e-5 || Math.abs(d) < 1e-6) break;
        t = Math.min(1, Math.max(0, t - fx / d));
      }
      return ((ay * t + by) * t + cy) * t;
    };
  };
  var REVEAL = bez(.2, .7, .2, 1);   // проява блоків — TH ×10
  var STD = bez(.4, 0, .2, 1);       // кольори/непрозорість — TH ×119, XH ×16
  var MOVE = bez(.23, 1, .32, 1);    // дрібні зсуви — BP/SC ×32
  var G = { d: .7, y: 18, start: 'top 80%', step: .08, max: 6, blurH: 8 };
  var IN = 'expo.out';               // лишається лише у фірмовому моменті (вставки маршруту) і ротаторі X02
  var from = function (blur, y) { return { opacity: 0, y: y, filter: blur ? 'blur(' + blur + 'px)' : 'none' }; };
  var to = function (d, extra) {
    var v = { opacity: 1, y: 0, filter: 'blur(0px)', duration: d, ease: REVEAL, clearProps: 'filter,transform' };
    for (var k in extra) v[k] = extra[k];
    return v;
  };
  // стагер групи: 80 мс, не більше 6 кроків (далі — разом)
  var stag = function (i) { return Math.min(i, G.max - 1) * G.step; };
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
    // ц.13: те саме, але коли одна з секцій списку підійде на 1 екран (див. whenNear)
    var near = function (sel, f) { whenNear(sel, function () { if (alive) ctx.add(f); }); };
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
    // ц.13: ротатор (rotate.js: розбиття на літери, вимір, вхід) — ≈ 28 мс із 43 мс старту site.js на телефоні ×4 CPU.
    // До 0,3 с він схований (CSS .js-motion .hero .rot { opacity: 0 }; показує .set у таймлайні hero), тож будується в
    // наступній задачі й стає в ту саму позицію таймлайну (0,3 с) — старт скрипта вже не одна довга задача
    var rot = null;
    var trace = $('.v-trace'), barGlow = $('.v-bar-glow'), vbar = $('.v-bar');
    // ц.13: lazy: false — стани «до» ставляться в цьому ж синхронному шматку (до .fold-set). Раніше їх примусово скидав
    // синхронний gsap.set ротатора; тепер ротатор у наступній задачі, і без цього був кадр «видно → сховано» (no_intro_flash)
    var hero = gsap.timeline({ defaults: { lazy: false } })
      .fromTo('.hero .grid-bg', { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power1.out' }, 0)
      .fromTo('.hero .glow-a, .hero .glow-b', { opacity: 0 }, { opacity: 1, duration: 2.2, ease: 'power1.out' }, .1)
      .fromTo('.hero .hero-kicker', { opacity: 0 }, { opacity: 1, duration: .5, ease: STD }, .04)
      // ц.10: H1 і перша дія видимі з першого кадру — лише проступання .15 → 1 за 500 мс, без зсуву й розмиття (SYNTHESIS §3, TH/XA)
      .fromTo(l1, { opacity: .15 }, { opacity: 1, duration: .5, ease: STD }, .04)
      .set('.hero .rot', { opacity: 1 }, .3)
      // головний доказ першого екрана — знак V: фокусування blur 10 → 0, scale .94 → 1, 600 мс (XH скриншот, масштаб пом'якшено)
      .fromTo('.vmark svg', { opacity: 0, scale: .94, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: .6, ease: REVEAL, clearProps: 'filter' }, .1)
      .fromTo('.hero .lede', { opacity: .15 }, { opacity: 1, duration: .5, ease: STD }, .12)
      .fromTo('.hero .cta', { opacity: .15 }, { opacity: 1, duration: .5, ease: STD }, .2)
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
    // ц.12 (критик ц.11): на телефоні риска стоїть поруч із 3-м рядком h1 — після спалаху вона стихає ще й до .7,
    // щоб не змагатися з кінцем рядка «…без втрат:»
    if (matchMedia('(max-width: 599px)').matches) hero.to(vbar, { opacity: .7, duration: .55, ease: 'power1.inOut' }, 1.75);
    // хвиля: «Ціна відсутності», що вже в першому екрані, проявляється після Lead hero, а не стоїть різкою з 0 мс
    var foldAbs = $$('#absence .kicker, #absence [data-blur], #absence .plate__note').filter(function (el) { return el.getBoundingClientRect().top < innerHeight; });
    if (foldAbs.length) hero.fromTo(foldAbs, from(0, G.y), to(G.d, { stagger: stag }), .7);
    // ц.8: до цієї миті CSS тримає ці елементи прихованими з першого малювання (html.js-motion:not(.fold-set));
    // fromTo вище вже поставив інлайн-стан «до» тим, що в першому екрані, — тепер CSS відпускає решту (вони нижче краю).
    // Той самий синхронний шматок — між ними немає малювання, тож жодного «видно → сховано → видно».
    root.classList.add('fold-set');
    setTimeout(function () {
      if (!alive) return;
      ctx.add(function () {
        rot = window.KitRotator ? window.KitRotator($('.hero [data-rotate]')) : null;
        if (rot) { hero.add(rot.enter(), Math.max(.3, hero.time())); rot.start(2.7); } else gsap.set('.hero .rot', { opacity: 1 });
      });
    }, 0);
    var fine = matchMedia('(hover: hover) and (pointer: fine)').matches, busy = null;
    var replay = function () { if (busy && busy.isActive()) return; busy = sweep(); };
    if (fine) l1.addEventListener('pointerenter', replay);
    killers.push(function () { l1.removeEventListener('pointerenter', replay); if (rot) rot.destroy(); });

    /* ---------- X01: заголовки й рядки з розмиття (лише нижче першого екрана, після першої прокрутки) ---------- */
    armers.push(function () {
      // ц.10: opacity 0 → 1, Y +18, 700 мс cubic-bezier(.2,.7,.2,1), верх елемента на 80 % екрана, один раз; група, що
      // входить разом, — стагер 80 мс (до 6 кроків). Розмиття 8 px лишається тільки на дисплейних h2 (фактура Xeno, XH 9 px);
      // рядки, підписи й лід — без розмиття (SYNTHESIS §3: не для тексту абзаців)
      var phone = !desktopRoute(), shown = [];
      var blurOf = function (h) { return h.tagName === 'H2' ? G.blurH : 0; };
      var ups = $$('[data-blur]').filter(function (h) { return below(h); });
      // телефон (критик ц.5 р.1–2, дослівно: 'top 95%' і 0,6 с): шапка «Форматів» осідає раніше й коротше — до того, як перший рядок цін дійде до середини
      var early = ups.filter(function (h) { return phone && h.closest('#formats'); });
      ups.forEach(function (h) { gsap.set(h, from(blurOf(h), G.y)); });
      var reveal = function (list, d) {
        list = list.filter(function (h) { return shown.indexOf(h) < 0; }); if (!list.length) return;
        shown = shown.concat(list);
        list.forEach(function (h, i) { gsap.to(h, to(d, { delay: stag(i) })); });
      };
      var rest = ups.filter(function (h) { return early.indexOf(h) < 0; });
      // ц.12: інтервал збирання групи .1 → .02 с — група, що входить за один кадр, лишається групою (стагер 80 мс),
      // але перший рядок не чекає зайві 100 мс після перетину лінії 80 %
      if (rest.length) ScrollTrigger.batch(rest, { start: G.start, once: true, interval: .02, onEnter: function (b) { reveal(b, G.d); } });
      if (early.length) ScrollTrigger.batch(early, { start: 'top 95%', once: true, interval: .02, onEnter: function (b) { reveal(b, .6); } });
      // смуга 30 / 70 заповнюється
      var pay = $('.pay');
      if (below(pay)) {
        gsap.set(['.pay__a', '.pay__b'], { scaleX: 0 });
        ScrollTrigger.create({ trigger: pay, start: G.start, once: true, onEnter: function () {
          gsap.to('.pay__a', { scaleX: 1, duration: G.d, ease: REVEAL });
          gsap.to('.pay__b', { scaleX: 1, duration: G.d, ease: REVEAL, delay: G.step });
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
        if (spotOff) spotOff();
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

    near('#route, #formats, #process, #contact', function () {
      var desk = desktopRoute();
      routeTween =gsap.fromTo(prog, { v: 0 }, { v: 1, ease: 'none', immediateRender: false,
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

    /* ---------- T06: поле ink → paper — коло з кінця лінії, одним жестом ----------
       ц.9 (власник, дослівно): папір розкривається, перш ніж зміст «Форматів» стає читабельним, і рядок маршруту
       дочитується. Тому коло тепер — частина самої сторінки: великий диск паперу (.bloom) лежить у «Форматах»,
       його вершина — у проміжку між рядком «Почнемо із сайту…» і шапкою «Форматів», під кінцем лінії маршруту
       (x = кінець лінії). Диск їде разом із прокруткою (без затримки scrub): шапка й таблиця з'являються на екрані
       вже на папері, а край кола ніколи не торкається рядка маршруту. Радіус — найменший, за якого кожен верхній кут
       шапки лежить під дугою з запасом 18 px. Коли дуга повністю пішла за верхній край, вмикається нерухоме поле паперу
       (під диском, тож перемикання не видно) — далі на ньому стоять стопка етапів і шторка T01. */
    var paper = $('.field__paper'), field = $('.field');
    // ц.13: папір T06, чорнило прайсу, шторка T01 і лінія до форми — коли «Формати» (або нижчі секції) за екран від видимої зони
    near('#formats, #process, #contact', function () {
      var foot = $('.route-foot'), fmt = $('#formats');
      var bloom = document.createElement('div');
      bloom.className = 'bloom'; bloom.setAttribute('aria-hidden', 'true');
      fmt.prepend(bloom);
      // кінцеве положення низу рядка маршруту відносно верху «Форматів» (на ПК рядок у липкій сцені — від низу секції)
      var footRel = function () {
        var f = fmt.getBoundingClientRect().top, fb;
        if (getComputedStyle(stage).position === 'sticky') {
          var rs = routeSec.getBoundingClientRect(), pb = parseFloat(getComputedStyle(routeSec).paddingBottom) || 0, fo = offsetIn(foot, stage);
          fb = rs.bottom - pb - stage.offsetHeight + (fo ? fo.y + foot.offsetHeight : stage.offsetHeight);
        } else fb = foot.getBoundingClientRect().bottom;
        return fb - f;
      };
      var yFull = 0;
      var bloomBuild = function () {
        var fr = fmt.getBoundingClientRect(), W = fr.width;
        var heads = $$('.sec-head .kicker, .sec-head h2, .sec-head__side > *', fmt).map(function (el) {
          var r = el.getBoundingClientRect(); return { t: r.top - fr.top, l: r.left - fr.left, r: r.right - fr.left };
        });
        var fB = footRel(), kTop = Math.min.apply(null, heads.map(function (h) { return h.t; }));
        var cx = Math.max(24, Math.min(W - 24, geo.end.x - fr.left));
        var crest = Math.round(fB + Math.max(10, (kTop - fB) * .3));
        var dxm = Math.max(cx, W - cx), R = dxm * 1.05;
        heads.forEach(function (h) {
          [h.l, h.r].forEach(function (x) {
            var dx = x - cx, room = h.t - 18 - crest;
            if (room > 4) R = Math.max(R, (dx * dx + room * room) / (2 * room));
          });
        });
        R = Math.ceil(R);
        yFull = Math.ceil(R - Math.sqrt(R * R - dxm * dxm));   // від цієї висоти диск уже ширший за екран
        bloom.style.top = crest + 'px';
        bloom.style.backgroundImage = 'radial-gradient(circle ' + R + 'px at ' + cx.toFixed(1) + 'px ' + R + 'px, var(--paper) ' + (R - .75) + 'px, transparent ' + R + 'px), linear-gradient(var(--paper), var(--paper))';
        bloom.style.backgroundSize = '100% ' + (2 * R) + 'px, 100% 100%';
        bloom.style.backgroundPosition = '0 0, 0 ' + yFull + 'px';
      };
      bloomBuild();
      ScrollTrigger.addEventListener('refreshInit', bloomBuild);
      // нерухоме поле вмикається, коли вся дуга (до yFull) пішла за верхній край; вимикається на зворотному шляху там само
      var setPaper = function (on) { paper.style.clipPath = on ? 'none' : 'circle(0% at 50% 0%)'; };
      setPaper(false);
      // кінця немає (стопка нижче змінює висоту сторінки): лише вхід/вихід через старт
      ScrollTrigger.create({ trigger: bloom, start: function () { return 'top+=' + (yFull + 12) + ' top'; }, end: '+=100000', invalidateOnRefresh: true,
        onEnter: function () { setPaper(true); }, onLeaveBack: function () { setPaper(false); },
        onRefresh: function (st) { setPaper(st.scroll() > st.start); } });
      killers.push(function () { ScrollTrigger.removeEventListener('refreshInit', bloomBuild); bloom.remove(); paper.style.clipPath = ''; });

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
          // ц.9 (критик, дослівно): лінія починається біля прайсу — у лівому полі, і йде вниз: Spark → Orbit → Supernova → Premium;
          // жодного відрізка згори й повороту — гачка немає в самій геометрії
          lx = Math.round(pl.left - s.left - 30) + .5;
          var yPrem = mid(prem.querySelector('h3'));
          y0 = Math.round(rel(plist).t - 12);
          d = 'M' + lx + ' ' + y0 + 'V' + yPrem;
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
          // ц.9 (критик, дослівно): закінчується рискою знака V, як на ПК — лінія доходить до риски, і риска лягає разом із нею
          var yEnd = ys[ys.length - 1];
          lineA.setAttribute('d', 'M' + lx + ' ' + y0 + 'V' + (yEnd + 18)); LA = lineA.getTotalLength() || 1;
          ys.forEach(function (y, k) { dots[k].setAttribute('cx', lx); dots[k].setAttribute('cy', y); dots[k].style.display = ''; dotAt[k] = y - y0; });
          inkBar.setAttribute('d', 'M' + (lx - 12) + ' ' + (yEnd + 18) + 'h24l-3.5 6h-24z'); dEnd = LA;
        }
        lineA.style.strokeDasharray = LA + ' ' + LA;
        lineB.style.strokeDasharray = (LB || 1) + ' ' + (LB || 1);
        total = Math.max(LA, dEnd); barAt = total;
        inkDraw(inkP);
      };
      inkBuild();
      ScrollTrigger.addEventListener('refreshInit', inkBuild);
      // desktop: старт, коли таблиця вже на екрані (критик ц.5 р.2); ц.9: прайс завжди вже на папері диска — чорнило не йде по чорному
      var inkStart = 0;
      ScrollTrigger.create({ trigger: plist, start: function () {
          return (inkStart = Math.round(plist.getBoundingClientRect().top + scrollY - innerHeight * (desktopRoute() ? .8 : .92)));
        },
        end: function () { var el = desktopRoute() ? sysCard : plist; return Math.max(inkStart + innerHeight * .5, el.getBoundingClientRect().bottom + scrollY - innerHeight * .62); }, scrub: .5, invalidateOnRefresh: true,
        onRefresh: inkBuild, onUpdate: function (st) { inkDraw(st.progress); } });
      killers.push(function () { ScrollTrigger.removeEventListener('refreshInit', inkBuild); ink.remove(); fgrid.removeAttribute('data-ink'); });

      /* ---------- T01: шторка — папір піднімається, відкриваючи чорне полотно форми ---------- */
      gsap.fromTo(field, { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)' },
        { clipPath: 'inset(0% 0% 100% 0% round 0px 0px 48px 48px)', ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: '#contact', start: desktopRoute() ? 'top 80%' : 'top 88%', end: 'top 35%', scrub: .6 } });
      /* ц.11 — лінія замикає маршрут (критик ц.9–10, дослівно): тим самим скролом, що й шторка, 1,5 px лінія йде вниз
         лівим краєм піднятого поля (проміжок перед формою; на телефоні — ліве поле сторінки) і входить у лівий край форми.
         mix-blend-mode: difference — на папері вона темна (чорнило «Форматів»), на відкритому чорному — світла: та сама
         лінія перетинає край шторки. Де лінія закінчується, там вузол спалахує й починає коло промінь форми (X05):
         кут старту рахується від центру форми до цієї точки. Заявка = кінець шляху. */
      var formCell = $('[data-form]'), contact = $('#contact');
      var formPart = partOf(formCell), formOn = false, ambientOn = false, ambient = null, closed = false;
      var NS = 'http://www.w3.org/2000/svg';
      var closer = document.createElementNS(NS, 'svg'); closer.setAttribute('class', 'closer'); closer.setAttribute('aria-hidden', 'true');
      var cLine = document.createElementNS(NS, 'path'), cNode = document.createElementNS(NS, 'circle');
      cLine.setAttribute('class', 'closer__line'); cNode.setAttribute('class', 'closer__node'); cNode.setAttribute('r', '3.5');
      closer.appendChild(cLine); closer.appendChild(cNode); contact.prepend(closer);
      var CL = 1, cP = 0, cY0 = 0, END_DY = 52;   // точка входу — на прямій ділянці лівого краю форми, нижче заокруглення 28 px
      var closerDraw = function (p) {
        // при p = 0 кругла заглушка штриха нульової довжини лишала крапку під карткою — ховаємо лінію повністю
        cP = p; cLine.style.strokeDashoffset = (CL * (1 - p)).toFixed(1); cLine.style.visibility = p > .001 ? '' : 'hidden';
        cNode.toggleAttribute('data-on', p > .995);
      };
      // лінія виходить з низу останньої картки стопки «Процесу» (Етап 4 з 4): липка картка зупиняється на дні свого блока
      var lastStage = $$('#process [data-card]').pop();
      var stageBottom = function (s) {
        if (!lastStage) return 0;
        var par = lastStage.parentElement, pr = par.getBoundingClientRect();
        var b = pr.bottom - (parseFloat(getComputedStyle(par).paddingBottom) || 0) - (parseFloat(getComputedStyle(lastStage).marginBottom) || 0);
        return Math.max(-240, Math.min(0, Math.round(b - s.top)));
      };
      // ламана з заокругленими кутами (радіус ≤ половини коротшого сусіднього відрізка)
      var rounded = function (pts, R) {
        var d = 'M' + pts[0][0] + ' ' + pts[0][1];
        for (var i = 1; i < pts.length - 1; i++) {
          var a = pts[i - 1], p = pts[i], n = pts[i + 1];
          var la = Math.hypot(p[0] - a[0], p[1] - a[1]), ln = Math.hypot(n[0] - p[0], n[1] - p[1]), r = Math.min(R, la / 2, ln / 2);
          var p1 = [p[0] + (a[0] - p[0]) * r / la, p[1] + (a[1] - p[1]) * r / la], p2 = [p[0] + (n[0] - p[0]) * r / ln, p[1] + (n[1] - p[1]) * r / ln];
          d += 'L' + p1[0] + ' ' + p1[1] + 'Q' + p[0] + ' ' + p[1] + ' ' + p2[0] + ' ' + p2[1];
        }
        var z = pts[pts.length - 1]; return d + 'L' + z[0] + ' ' + z[1];
      };
      var closerBuild = function () {
        var s = contact.getBoundingClientRect(), f = formCell.getBoundingClientRect(), W = s.width, H = contact.offsetHeight;
        var fl = Math.round(f.left - s.left), ft = f.top - s.top, ye = Math.round(ft + END_DY) + .5, y0 = cY0 = stageBottom(s), pts;
        if (desktopRoute()) {
          // ПК: проміжок колонок за 40 px до форми — прямо вниз з низу картки, поворот у лівий край форми
          var gx = fl - 40 + .5;
          pts = [[gx, y0], [gx, ye], [fl, ye]];
        } else {
          // телефон: з низу картки (24 px від її лівого краю) — уступ у ліве поле сторінки (текст колонки починається на fl),
          // униз полем, поворот у лівий край форми
          var mx = Math.round(fl / 2) + .5, sx = fl + 24.5, jy = y0 + Math.min(14, Math.max(6, -y0 / 2));
          pts = [[sx, y0], [sx, jy], [mx, jy], [mx, ye], [fl, ye]];
        }
        closer.setAttribute('viewBox', '0 ' + y0 + ' ' + W + ' ' + (H - y0)); closer.style.top = y0 + 'px'; closer.style.height = (H - y0) + 'px';
        cLine.setAttribute('d', rounded(pts, 12));
        CL = cLine.getTotalLength() || 1; cLine.style.strokeDasharray = CL + ' ' + CL;
        cNode.setAttribute('cx', fl); cNode.setAttribute('cy', ye);
        // промінь X05: голова конуса (≈357° градієнта) — у бік точки входу від центру форми
        var cx = f.left + f.width / 2, cy = f.top + f.height / 2, px = f.left, py = f.top + END_DY;
        if (!closed) formPart.angle = Math.atan2(px - cx, -(py - cy)) * 180 / Math.PI + 3;
        closerDraw(cP);
      };
      var closeRoute = function () {
        if (closed) return; closed = true;
        lap(formPart, 2.3, 1).eventCallback('onComplete', function () {
          gsap.to([formPart.ring, formPart.halo], { opacity: .55, duration: 1.2 });
          // спокійне коло продовжує з того кута, де стало перше (без стрибка на 0°)
          var a = formPart.angle;
          ambient = gsap.timeline({ paused: true, repeat: -1 }).fromTo(formPart.beams, { rotation: a }, { rotation: a + 360, duration: 10, ease: 'none' });
          ambientOn = true; if (formOn) ambient.play();
        });
      };
      // старт — разом зі шторкою, але не раніше, ніж липка картка відпустить низ (інакше початок лінії висить під нею;
      // на 390 px картка відлипає, коли верх #contact ≈ 76 % екрана, а шторка стартує на 88 %)
      var closerStart = function () {
        var p0 = desktopRoute() ? .8 : .88, top = lastStage ? parseFloat(getComputedStyle(lastStage).top) : NaN;
        if (!isNaN(top)) p0 = Math.min(p0, (top + lastStage.offsetHeight - cY0) / innerHeight);
        return 'top ' + (p0 * 100).toFixed(1) + '%';
      };
      closerBuild();
      ScrollTrigger.addEventListener('refreshInit', closerBuild);
      ScrollTrigger.create({ trigger: contact, start: closerStart, endTrigger: formCell,
        end: function () { return 'top+=' + END_DY + ' ' + (desktopRoute() ? '55%' : '62%'); }, scrub: .6,
        onUpdate: function (st) { closerDraw(st.progress); if (st.progress > .995) closeRoute(); },
        onLeave: closeRoute, onRefresh: function (st) { if (st.progress > .995) { closerDraw(1); closeRoute(); } } });
      killers.push(function () { ScrollTrigger.removeEventListener('refreshInit', closerBuild); closer.remove(); });
      ScrollTrigger.create({ trigger: '[data-form]', start: 'top bottom', end: 'bottom top', onToggle: function (s) {
        formOn = s.isActive;
        if (!ambient) return;
        if (formOn && ambientOn) ambient.play(); else ambient.pause();
      } });
      killers.push(function () { if (ambient) ambient.kill(); });
    });

    /* ---------- перемикач $ / ₴: числа котяться ---------- */
    rollPrices = function () {
      // ц.10: перемикач — дрібний зсув 300 мс cubic-bezier(.23,1,.32,1); цін більше 6 — котяться разом, без розмиття
      gsap.fromTo(prices, { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: .3, ease: MOVE, clearProps: 'transform' });
    };
    killers.push(function () { rollPrices = null; });

    /* ---------- процес: таймлайн руху з «головкою» і журнал конвеєра (X03) ---------- */
    near('#process, #contact', function () {
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
      var si = 0;
      function tick() {
        var s = STAGES[si++ % STAGES.length], li = document.createElement('li'), p = pitch();
        li.className = 'log__row'; li.setAttribute('data-new', '');
        li.innerHTML = '<span></span><small></small>'; li.firstChild.textContent = s[0]; li.lastChild.textContent = s[1];
        log.prepend(li); rows.unshift(li);
        // ц.10: масштаб «від» .975 (TH), 700 мс, крива проявлення
        gsap.fromTo(li, { y: -p * .6, opacity: 0, scale: .975 }, { y: 0, opacity: 1, scale: 1, duration: G.d, ease: REVEAL });
        rows.forEach(function (r, i) {
          if (i === 0) return;
          if (i === 1) r.removeAttribute('data-new');
          gsap.to(r, { y: i * p, duration: G.d, ease: REVEAL });
        });
        while (rows.length > 6) { var gone = rows.pop(); gone.remove(); }
      }
      // ц.8: рядок кожні 2,4 с, поки картка журналу на екрані; поза екраном таймера немає зовсім.
      // Видимість — IntersectionObserver на самій (липкій, трансформованій) картці, як у головки таймлайну:
      // ScrollTrigger із тригером усередині sticky-картки рахував вікно не там (на ПК журнал стояв на видноті й тікав поза ним)
      var logTimer = null, logLoop = function () { tick(); logTimer = gsap.delayedCall(2.4, logLoop); };
      var logIO = new IntersectionObserver(function (es) {
        if (es[es.length - 1].isIntersecting) { if (!logTimer) logTimer = gsap.delayedCall(2.4, logLoop); }
        else if (logTimer) { logTimer.kill(); logTimer = null; }
      });
      logIO.observe(log.closest('[data-card]') || log);
      killers.push(function () {
        tlIO.disconnect(); tlRO.disconnect(); logIO.disconnect();
        headLoop.kill(); if (logTimer) logTimer.kill(); logTimer = null; gsap.set(tlHead, { clearProps: 'all' }); tlHead.style.left = '';
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

  /* ---------- V02 group spotlight: одне світло на чотири картки маршруту (ц.10, замінює курсорне X05 edge) ----------
     Світло живе в координатах сітки (--gx/--gy на .route-grid), кожна картка віднімає свій зсув (--ox/--oy), тож у проміжку
     світяться краї обох сусідів. Без курсора світло не зникає: воно «відпочиває» (.6) на вузлі, до якого вже дійшла лінія
     маршруту, — перший прохід робить сама лінія (фірмовий момент), окремого проходу немає. Курсор: lerp 0.18 за кадр 60 Гц;
     дотик — світло пливе до вузла торкнутої картки (.85). Монохром: біла пляма r100 + холодно-біла r150, без зсуву відтінку. */
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    var LERP = .18, REST = .6, HELD = 1, TAP = .85, REACH = 150;
    var cur = { x: 0, y: 0 }, tgt = { x: 0, y: 0 }, raf = 0, last = 0, pointer = null, home = -1, placed = false;
    var setOn = function (v) { grid.style.setProperty('--on', v); };
    var layout = function () { routeCells.forEach(function (c) { c.style.setProperty('--ox', c.offsetLeft); c.style.setProperty('--oy', c.offsetTop); }); };
    var write = function () { grid.style.setProperty('--gx', cur.x.toFixed(1)); grid.style.setProperty('--gy', cur.y.toFixed(1)); };
    var tick = function (now) {
      raf = 0;
      var dt = last ? Math.min(now - last, 64) : 16.667; last = now;
      var k = 1 - Math.pow(1 - LERP, dt / 16.667);
      cur.x += (tgt.x - cur.x) * k; cur.y += (tgt.y - cur.y) * k;
      if (Math.abs(tgt.x - cur.x) < .3 && Math.abs(tgt.y - cur.y) < .3) { cur.x = tgt.x; cur.y = tgt.y; last = 0; write(); return; }
      write(); raf = requestAnimationFrame(tick);
    };
    var go = function () { if (!raf) raf = requestAnimationFrame(tick); };
    // точка відпочинку — вузол лінії на краю картки k (координати сітки, без transform)
    var nodeOf = function (k) { var n = geo.nodes && geo.nodes[k]; return n ? { x: n[0], y: n[1] } : null; };
    var rest = function (k, strength) {
      var p = nodeOf(k); if (!p) return;
      home = k; tgt.x = p.x; tgt.y = p.y;
      if (!placed) { cur.x = p.x; cur.y = p.y; write(); placed = true; }
      setOn(strength); go();
    };
    spotLit = function (k) { if (!pointer) rest(k, REST); };
    spotOff = function () { home = -1; placed = false; if (!pointer) setOn(0); };
    spotPark = function () { layout(); if (!pointer && home >= 0) { var p = nodeOf(home); if (p) { cur.x = tgt.x = p.x; cur.y = tgt.y = p.y; write(); } } };
    var near = function (x, y) { var r = grid.getBoundingClientRect(); return x > r.left - REACH && x < r.right + REACH && y > r.top - REACH && y < r.bottom + REACH; };
    var aim = function (x, y) { var r = grid.getBoundingClientRect(); tgt.x = x - r.left; tgt.y = y - r.top; if (!placed) { cur.x = tgt.x; cur.y = tgt.y; placed = true; } go(); };
    var release = function () { pointer = null; if (home >= 0) rest(home, REST); else setOn(0); };
    var onMove = function (e) {
      if (e.pointerType === 'touch') return;
      if (!near(e.clientX, e.clientY)) { if (pointer) release(); return; }
      pointer = { x: e.clientX, y: e.clientY }; setOn(HELD); aim(e.clientX, e.clientY);
    };
    var onLeave = function (e) { if (e.pointerType !== 'touch' && pointer) release(); };
    var onDown = function (e) {
      if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
      var c = e.target.closest && e.target.closest('.route-grid .cell'); if (!c) return;
      pointer = null; rest(routeCells.indexOf(c), TAP);
    };
    var onScroll = function () { if (pointer) { if (near(pointer.x, pointer.y)) aim(pointer.x, pointer.y); else release(); } };
    var zone = $('#route');
    // ц.13: зсуви карток міряє перший виклик spotRO (нижче) і кожна побудова геометрії (spotPark) — не синхронне читання
    // макета під час старту скрипта
    // картки, вже запалені до старту (статичний варіант / повернення), — світло стоїть на останній
    routeCells.forEach(function (c, k) { if (c.hasAttribute('data-lit')) home = k; });
    if (home >= 0 && geo.nodes) rest(home, REST);
    var spotRO = new ResizeObserver(function () { spotPark(); });
    // ц.13: не в першому кадрі завантаження (перший виклик RO пише --ox/--oy у картки й читає макет) — коли маршрут за екран
    whenNear('#route, #formats, #process, #contact', function () { if (spotPark) spotRO.observe(grid); });
    zone.addEventListener('pointermove', onMove, { passive: true });
    zone.addEventListener('pointerleave', onLeave);
    zone.addEventListener('pointerdown', onDown, { passive: true });
    addEventListener('scroll', onScroll, { passive: true });
    return function () {
      spotLit = spotPark = spotOff = null; if (raf) cancelAnimationFrame(raf); raf = 0; spotRO.disconnect();
      zone.removeEventListener('pointermove', onMove); zone.removeEventListener('pointerleave', onLeave);
      zone.removeEventListener('pointerdown', onDown); removeEventListener('scroll', onScroll);
      ['--on', '--gx', '--gy'].forEach(function (p) { grid.style.removeProperty(p); });
    };
  });

  /* ---------- ц.12: вихід шапки маршруту з-під меню ----------
     На ПК сцена маршруту липка; коли вона відпускається, «Шлях однієї заявки…» їде вгору й раніше проходив під плашкою меню
     (критик ц.11, двічі not_fixed). Тепер уся шапка (підпис, заголовок, лід) гасне на останніх 64 px перед низом смуги
     меню: верх шапки ≥ низ меню + 64 → 1, ≤ низ меню → 0. Жодного кадру, де видимий заголовок перетинає плашку.
     Лише opacity; без руху — не діє (шапка стоїть, як у статичній сторінці). */
  // ц.12 р.2 (критик р.1): у закріпленій сцені верх шапки ≈ 92 px — це було всередині смуги 72…136, і шапка стояла на ~35 %.
  // Тепер смуга закінчується рівно там, де шапка стоїть у закріпленій сцені: повна яскравість на всю закріплену ділянку,
  // гасіння — лише коли сцена відпущена й шапка їде від свого місця до низу пігулки меню.
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    var rhead = $('.route-head'), navIn = nav.querySelector('.nav__in'), FADE = 64, rq = 0, last = -1, band = FADE;
    var measure = function () {
      var navB = navIn.getBoundingClientRect().bottom;
      var pinned = getComputedStyle(stage).position === 'sticky' ? offsetIn(rhead, stage) : null;
      band = pinned ? Math.max(12, pinned.y - navB - 1) : FADE;
    };
    var put = function () {
      rq = 0;
      var o = Math.max(0, Math.min(1, (rhead.getBoundingClientRect().top - navIn.getBoundingClientRect().bottom) / band));
      o = Math.round(o * 1000) / 1000;
      if (o === last) return; last = o;
      rhead.style.opacity = o < 1 ? String(o) : '';
    };
    var onS = function () { if (!rq) rq = requestAnimationFrame(put); };
    var onR = function () { measure(); put(); };
    addEventListener('scroll', onS, { passive: true }); addEventListener('resize', onR);
    // ц.13: перший вимір — у простої (шапка маршруту на старті далеко нижче меню; прокрутка доробляє чергу одразу)
    later(onR);
    return function () { removeEventListener('scroll', onS); removeEventListener('resize', onR); if (rq) cancelAnimationFrame(rq); rhead.style.opacity = ''; };
  });

  /* ---------- ц.13: вихід останнього аркуша з-під меню ----------
     Критик ц.12 р.3 (дослівно, другий варіант fix): «fade the card's title … before it reaches the pill bottom (same linear
     opacity band already used for .route-head)». Текстовий блок аркуша «Прев’ю і запуск» (підпис, заголовок 86 px, лід,
     «Для вас») гасне лише тоді, коли стопка вже виходить: від свого закріпленого місця до низу пігулки меню. У закріпленій
     стопці блок завжди 1,0. Разом із вуаллю (обрізана по аркушу) — жодного кадру з половинами літер біля пігулки. */
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    var lastCard = $$('#process [data-card]').pop(), tb = lastCard && $('.pcard__t', lastCard), navIn = nav.querySelector('.nav__in');
    if (!tb) return;
    /* ц.15 (критик ц.14, P3, дослівно): «start the title's ramp only when its top is within 24 px of the pill bottom
       (not from its pinned position)». Кожен рядок блоку (підпис, заголовок, лід, «Для вас») гасне окремо — на останніх
       24 px перед низом пігулки; доти він 1,0, тож заголовок не слабшає, поки аркуш ще читають. */
    var rq = 0, BAND = 24, kids = [].slice.call(tb.children), was = kids.map(function () { return -1; });
    var measure = function () {};
    var put = function () {
      rq = 0;
      var navB = navIn.getBoundingClientRect().bottom;
      for (var i = 0; i < kids.length; i++) {
        var o = Math.max(0, Math.min(1, (kids[i].getBoundingClientRect().top - navB) / BAND));
        o = Math.round(o * 1000) / 1000;
        if (o === was[i]) continue; was[i] = o;
        kids[i].style.opacity = o < 1 ? String(o) : '';
      }
    };
    var onS = function () { if (!rq) rq = requestAnimationFrame(put); };
    var onR = function () { measure(); put(); };
    addEventListener('scroll', onS, { passive: true }); addEventListener('resize', onR);
    ScrollTrigger.addEventListener('refresh', onR);
    later(onR);
    return function () {
      removeEventListener('scroll', onS); removeEventListener('resize', onR); ScrollTrigger.removeEventListener('refresh', onR);
      if (rq) cancelAnimationFrame(rq); kids.forEach(function (k) { k.style.opacity = ''; });
    };
  });

  /* ц.12 р.3: вуаль за пігулкою (CSS .top-veil) вимикається, коли під верхом екрана — папір: нерухоме поле паперу ввімкнене
     (T06) і шторка T01 ще не підняла його вище верхніх 80 px екрана. Інакше темна смуга лягла б на «Формати» й «Процес». */
  var veil = $('.top-veil'), fieldEl = $('.field'), paperEl = $('.field__paper'), vq = 0;
  var pcards = $$('#process [data-card]'), VEIL_H = 92;
  var veilPut = function () {
    vq = 0;
    var on = root.classList.contains('is-armed') && paperEl.style.clipPath === 'none';
    // до вмикання поля папір під верхом дає сам диск T06 (.bloom): його вершина вже вище за пігулку
    var bl = !on && root.classList.contains('is-armed') ? $('.bloom') : null;
    if (bl && bl.getBoundingClientRect().top < 40 && bl.getBoundingClientRect().bottom > 72) { veil.toggleAttribute('data-off', true); return; }
    if (on) {
      var m = /inset\(\s*[-\d.]+%?\s+[-\d.]+%?\s+([-\d.]+)%/.exec(getComputedStyle(fieldEl).clipPath || '');
      on = (m ? +m[1] : 0) < (1 - 80 / innerHeight) * 100;
    }
    /* ц.13 (власник-делегат; критик ц.12 р.3): на папері вуаль не вимикається, поки під смугою пігулки (верхні 92 px) виходить
       аркуш стопки «Процесу» — інакше 86-px заголовок «Прев’ю і запуск» проходить під пігулкою. Вуаль тоді обрізана рівно
       по аркушу (зліва/справа, згори — від його верху, з його радіусом): темна смуга лягає лише на темний аркуш, папір
       довкола лишається чистим. Без переходу: на темному аркуші ввімкнення не видно, а заголовок не встигає визирнути */
    // лише коли стопка ВИХОДИТЬ: останній аркуш уже зрушив вище свого липкого верху (у закріпленій стопці смужки «Етап N з 4»
    // карток позаду лежать у тій самій смузі — їх вуаль не чіпає)
    var lastP = pcards[pcards.length - 1];
    if (on && lastP && lastP.getBoundingClientRect().top < (parseFloat(getComputedStyle(lastP).top) || 0) - 1) {
      var L = Infinity, Rt = -Infinity, T = Infinity;
      pcards.forEach(function (c) {
        var r = c.getBoundingClientRect();
        if (r.top < VEIL_H && r.bottom > 0) { L = Math.min(L, r.left); Rt = Math.max(Rt, r.right); T = Math.min(T, r.top); }
      });
      if (Rt > L) {
        var t = Math.max(0, T), rr = T > -28 ? '28px 28px 0 0' : '0';
        veil.style.clipPath = 'inset(' + t.toFixed(1) + 'px ' + (innerWidth - Rt).toFixed(1) + 'px 0 ' + L.toFixed(1) + 'px round ' + rr + ')';
        veil.toggleAttribute('data-card', true); veil.toggleAttribute('data-off', false);
        return;
      }
    }
    if (veil.hasAttribute('data-card')) { veil.removeAttribute('data-card'); veil.style.clipPath = ''; }
    veil.toggleAttribute('data-off', on);
  };
  if (veil) {
    addEventListener('scroll', function () { if (!vq) vq = requestAnimationFrame(veilPut); }, { passive: true });
    veilPut();
  }

  addEventListener('scroll', arm, { passive: true });
  addEventListener('resize', geometry);
})();
