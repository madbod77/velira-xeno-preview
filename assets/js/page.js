/* Velira — легкий скрипт сторінок послуг (ц.17, /landing/ і далі).
   Без GSAP: на рекламних сторінках — CSS-переходи, IntersectionObserver і Web Animations (seo-performance.md).
   1) шапка: смуга → пігулка, підсвітка розділу, аркуш меню (поведінка головної), вуаль лише над чорним;
   2) рух (клас lp-motion на <html>): проява з розмиття після першої прокрутки, аркуші паперу розгортаються на всю ширину,
      лінія шарів від риски V до краю форми, коло світла по формі;
   3) живі заміри сторінки (вага, файли, сторонні запити, перший текст) і мініатюра першого екрана на телефоні.
   Анімуються лише transform / opacity / clip-path / filter і stroke-dashoffset лінії. Без JS і без руху все видно. */
(function () {
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var mq = function (q) { return !!(window.matchMedia && matchMedia(q).matches); };
  var motion = root.classList.contains('lp-motion') && mq('(prefers-reduced-motion: no-preference)');
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
  var main = $('#main');

  /* ================= шапка ================= */
  var nav = $('#nav'), bar = nav && nav.querySelector('.nlinks');
  if (nav) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:28px;pointer-events:none';
    document.body.prepend(sentinel);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { nav.classList.toggle('is-pill', !e[0].isIntersecting); }).observe(sentinel);
    else nav.classList.add('is-pill');
  }
  var navLinks = bar ? $$('a', bar) : [];
  var place = function (href) {
    $$('.nlinks a, .sheet a').forEach(function (x) {
      if (x.getAttribute('href') === href) x.setAttribute('aria-current', 'true'); else if (x.getAttribute('aria-current') === 'true') x.removeAttribute('aria-current');
    });
    if (!bar) return;
    var a = navLinks.filter(function (x) { return x.getAttribute('href') === href; })[0];
    if (!a || !bar.offsetWidth) { bar.style.setProperty('--hl-o', '0'); return; }
    var l = a.offsetLeft, r = bar.offsetWidth - l - a.offsetWidth;
    bar.style.setProperty('--hl-a', l + 'px'); bar.style.setProperty('--hl-b', r + 'px');
    bar.style.setProperty('--hl-c', (l + a.offsetWidth / 2) + 'px'); bar.style.setProperty('--hl-o', '1');
  };
  var current = '#top', sections = $$('main section[id]'), seen = {};
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });
      var hit = sections.filter(function (s) { return seen[s.id]; })[0];
      if (hit && '#' + hit.id !== current) { current = '#' + hit.id; place(current); }
    }, { rootMargin: '-42% 0px -52% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
  if (bar && 'ResizeObserver' in window) new ResizeObserver(function () { place(current); }).observe(bar);

  var burger = nav && nav.querySelector('.burger'), sheet = $('#menu');
  if (burger && sheet) {
    var scrim = document.createElement('div');
    scrim.className = 'scrim'; scrim.setAttribute('aria-hidden', 'true'); sheet.after(scrim);
    var setOpen = function (open) {
      burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
      sheet.classList.toggle('is-open', open); scrim.classList.toggle('is-open', open);
      sheet.setAttribute('aria-hidden', String(!open)); sheet.inert = !open;
    };
    scrim.addEventListener('click', function () { setOpen(false); });
    burger.addEventListener('click', function () { setOpen(burger.getAttribute('aria-expanded') !== 'true'); });
    sheet.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  /* вуаль за пігулкою — лише коли під верхом екрана чорна секція (на папері темна смуга лягла б на текст) */
  var veil = $('.top-veil'), tones = $$('main [data-tone]'), vq = 0;
  var veilPut = function () {
    vq = 0; if (!veil) return;
    var y = 40, tone = 'ink';
    for (var i = 0; i < tones.length; i++) { var r = tones[i].getBoundingClientRect(); if (r.top <= y && r.bottom > y) { tone = tones[i].getAttribute('data-tone'); break; } }
    veil.toggleAttribute('data-off', tone === 'paper');
  };
  addEventListener('scroll', function () { if (!vq) vq = raf(veilPut); }, { passive: true });
  veilPut();

  /* ================= живі заміри сторінки (до мініатюри: її запити в замір не потрапляють) ================= */
  var nf = function (n, d) { return n.toFixed(d).replace('.', ','); };
  var perfLive = function () {
    var box = $('[data-perf-live]'), out = box && $('[data-perf-out]', box);
    if (!out || !window.performance || !performance.getEntriesByType) return;
    var navE = performance.getEntriesByType('navigation')[0] || {}, res = performance.getEntriesByType('resource');
    var bytes = navE.encodedBodySize || 0, files = 1, third = 0;
    res.forEach(function (r) {
      if (r.initiatorType === 'fetch' && r.name.indexOf(location.pathname) >= 0) return;
      bytes += r.encodedBodySize || 0; files++;
      if (r.name.indexOf(location.origin) !== 0) third++;
    });
    var fcp = (performance.getEntriesByName('first-contentful-paint')[0] || {}).startTime;
    if (!bytes) return;
    var kb = Math.round(bytes / 1024);
    out.textContent = kb + ' КБ · ' + files + ' ' + (files % 10 === 1 && files % 100 !== 11 ? 'файл' : (files % 10 >= 2 && files % 10 <= 4 && (files % 100 < 12 || files % 100 > 14)) ? 'файли' : 'файлів') +
      ' · сторонніх запитів — ' + third + (fcp ? ' · перший текст за ' + nf(fcp / 1000, 1) + ' с' : '') + '.';
    box.hidden = false;
  };

  /* ================= мініатюра першого екрана: ця ж сторінка на 390 × 844, без скриптів (srcdoc), заміри з її DOM ================= */
  var specimen = function () {
    var fig = $('.lp-spec');
    if (!fig || !mq('(min-width: 1080px)')) return;
    if (!window.fetch) { fig.classList.add('is-static'); return; }
    var screen = $('.lp-spec__screen', fig), phone = $('.lp-spec__phone', fig), marks = $$('.lp-spec__marks li', fig);
    fetch(location.pathname, { credentials: 'same-origin' }).then(function (r) { return r.ok ? r.text() : Promise.reject(new Error('page')); }).then(function (html) {
      html = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace('<html lang="uk">', '<html lang="uk" class="is-specimen">');
      var f = document.createElement('iframe');
      f.setAttribute('title', 'Перший екран цієї сторінки на телефоні'); f.setAttribute('aria-hidden', 'true'); f.setAttribute('tabindex', '-1');
      f.setAttribute('scrolling', 'no'); f.setAttribute('loading', 'eager'); f.width = 390; f.height = 844;
      f.addEventListener('load', function () {
        var doc = f.contentDocument; if (!doc) return;
        var ready = doc.fonts && doc.fonts.ready ? doc.fonts.ready : Promise.resolve();
        ready.then(function () {
          var s = phone.getBoundingClientRect().height / 844;
          marks.forEach(function (li) {
            var sel = li.getAttribute('data-mark'), y = 844;
            if (sel !== 'fold') {
              var el = doc.querySelector(sel); if (!el) return;
              var r = el.getBoundingClientRect(); y = Math.round(li.getAttribute('data-edge') === 'top' ? r.top : r.bottom);
              var b = li.querySelector('b'); if (b) b.textContent = y + ' px';
            }
            li.style.setProperty('--y', (y * s).toFixed(1) + 'px');
          });
          fig.classList.add('is-live');
        });
      });
      f.srcdoc = html;
      screen.appendChild(f);
    }).catch(function () { fig.classList.add('is-static'); });
  };

  var afterLoad = function (f) { if (document.readyState === 'complete') setTimeout(f, 0); else addEventListener('load', function () { setTimeout(f, 0); }); };
  afterLoad(function () { perfLive(); (window.requestIdleCallback || function (g) { return setTimeout(g, 120); })(specimen, { timeout: 800 }); });

  /* розділи після форми (data-cv, content-visibility: auto) — вмикаємо по одному на кадр після load: перший layout лишається
     коротким, а довгої задачі на весь текст відповідей немає; запасний шлях — усе разом через 1,5 с (тло-вкладка без кадрів) */
  var cvs = $$('[data-cv]');
  var cvStep = function () {
    var el = cvs.shift(); if (!el) return;
    el.classList.add('cv-on');
    if (cvs.length) { if (document.hidden) setTimeout(cvStep, 16); else raf(cvStep); }
  };
  afterLoad(function () {
    raf(cvStep);
    setTimeout(function () { while (cvs.length) cvs.shift().classList.add('cv-on'); }, 1500);
  });

  /* ================= лінія шарів: від риски знака V у першому екрані — полем зліва через вузол кожного шару —
     до краю форми (той самий прийом, що на головній: світло → вузол → коло променя по формі) ================= */
  var NS = 'http://www.w3.org/2000/svg';
  var origin = $('.lp-origin'), formCell = $('[data-form]'), contact = $('#contact');
  // вузли — шари до заявки (склад, доказ, процес і оплата); кінцевий вузол — точка входу лінії у форму
  var layerKicks = $$('main section[data-tone] .lp-k').filter(function (k) { var s = k.closest('section'); return s && ['vybir', 'vidpovidi', 'contact', 'dokaz'].indexOf(s.id) < 0; });
  var copyCol = $('.contact-copy');
  var spine = null;
  var offsetIn = function (el, anc) {
    var x = 0, y = 0;
    while (el && el !== anc) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
    return el === anc ? { x: x, y: y } : null;
  };
  var buildSpine = function () {
    if (!origin || !formCell || !contact || !main) return null;
    if (getComputedStyle(main).position === 'static') main.style.position = 'relative';
    var svg = spine ? spine.svg : document.createElementNS(NS, 'svg');
    if (!spine) {
      svg.setAttribute('class', 'lp-spine'); svg.setAttribute('aria-hidden', 'true');
      var mk = function (tag, cls) { var e = document.createElementNS(NS, tag); e.setAttribute('class', cls); svg.appendChild(e); return e; };
      spine = { svg: svg, base: mk('path', 'lp-spine__base'), line: mk('path', 'lp-spine__line'), close: mk('path', 'lp-spine__line'),
                nodes: mk('g', 'lp-spine__nodes'), end: mk('circle', 'lp-spine__end'), head: document.createElement('span'), drawn: 0, closed: 0, lit: false };
      spine.end.setAttribute('r', '4');
      spine.head.className = 'lp-spine__head'; spine.head.setAttribute('aria-hidden', 'true');
      main.appendChild(svg); main.appendChild(spine.head);
    }
    var W = main.offsetWidth, H = main.offsetHeight, desk = mq('(min-width: 900px)');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.style.height = H + 'px';
    var wrap = $('.wrap', main), wl = offsetIn(wrap, main) || { x: 16 };
    var gx = Math.round(Math.max(7, wl.x - (desk ? 34 : 9))) + .5;
    var ob = origin.getBoundingClientRect(), mb = main.getBoundingClientRect();
    var ox = (ob.left + ob.right) / 2 - mb.left, oy = (ob.top + ob.bottom) / 2 - mb.top;
    var nodes = layerKicks.map(function (k) { var o = offsetIn(k, main); return o ? Math.round(o.y + k.offsetHeight / 2) : null; }).filter(function (v) { return v !== null; });
    var c = offsetIn(contact, main), f = offsetIn(formCell, main);
    var turnY = c.y + (desk ? 52 : 24), fx = f.x, fy = f.y + 52, gap = gx;
    if (desk) {   // проміжок між колонками заявки — посередині між текстом і формою
      var cr = copyCol ? copyCol.getBoundingClientRect().right - mb.left : fx - 80;
      gap = Math.round((cr + fx) / 2) + .5;
    }
    nodes = nodes.filter(function (y) { return y < turnY - 12; });
    // A — від риски V ліворуч у поле й донизу до верху секції заявки; B — поворот до проміжку перед формою і в її лівий край
    var a = 'M' + ox.toFixed(1) + ' ' + oy.toFixed(1) + 'H' + gx + 'V' + turnY;
    var b = desk ? 'M' + gx + ' ' + turnY + 'H' + (gap - 12) + 'Q' + gap + ' ' + turnY + ' ' + gap + ' ' + (turnY + 12) + 'V' + (fy - 12) + 'Q' + gap + ' ' + fy + ' ' + (gap + 12) + ' ' + fy + 'H' + fx
                 : 'M' + gx + ' ' + turnY + 'V' + (fy - 10) + 'Q' + gx + ' ' + fy + ' ' + (gx + 10) + ' ' + fy + 'H' + fx;
    spine.base.setAttribute('d', a + b.replace(/^M[^HV]+/, ''));
    spine.line.setAttribute('d', a); spine.close.setAttribute('d', b);
    spine.LA = spine.line.getTotalLength() || 1; spine.LB = spine.close.getTotalLength() || 1;
    spine.line.style.strokeDasharray = spine.LA + ' ' + spine.LA; spine.close.style.strokeDasharray = spine.LB + ' ' + spine.LB;
    // довжина вздовж A до кожного вузла (A: короткий горизонтальний відрізок, далі вертикаль)
    var horiz = Math.abs(ox - gx);
    spine.nodeAt = nodes.map(function (y) { return horiz + (y - oy); });
    spine.nodes.innerHTML = nodes.map(function (y) { return '<circle cx="' + gx + '" cy="' + y + '" r="4.5"/>'; }).join('');
    spine.end.setAttribute('cx', fx); spine.end.setAttribute('cy', fy);
    spine.oy = oy; spine.turnY = turnY; spine.fy = fy; spine.fx = fx; spine.horiz = horiz;
    return spine;
  };
  var headAt = function (path, len) {
    var p = path.getPointAtLength(len);
    spine.head.style.transform = 'translate(' + p.x.toFixed(1) + 'px,' + p.y.toFixed(1) + 'px)';
  };
  var drawSpine = function () {
    if (!spine) return;
    var mb = main.getBoundingClientRect(), vh = innerHeight;
    // A: кінчик лінії — на 62 % висоти екрана (лінія «читає» разом з вами)
    var tipY = vh * .62 - mb.top;
    var la = Math.max(0, Math.min(spine.LA, spine.horiz + (tipY - spine.oy)));
    if (tipY - spine.oy > -40 && la < spine.horiz) la = spine.horiz;   // горизонтальний старт від риски — одразу
    la *= introK;
    spine.line.style.strokeDashoffset = (spine.LA - la).toFixed(1);
    var circles = spine.nodes.querySelectorAll('circle');
    spine.nodeAt.forEach(function (n, k) { if (circles[k]) circles[k].toggleAttribute('data-lit', la >= n - 1); });
    // B: продовжує A без розриву — від повороту на 62 % екрана до точки входу у форму на 40 %
    var cTop = spine.turnY + mb.top, entry = spine.fy + mb.top;
    var start = vh * .62, end = vh * .4, span = (entry - cTop) + (start - end);
    var lb = la >= spine.LA - 1 ? Math.max(0, Math.min(1, (start - cTop) / Math.max(1, span))) * spine.LB * introK : 0;
    spine.close.style.strokeDashoffset = (spine.LB - lb).toFixed(1);
    spine.close.style.visibility = lb > .5 ? '' : 'hidden';
    var done = lb >= spine.LB - 1;
    spine.end.toggleAttribute('data-on', done);
    var live = (la > spine.horiz + 2 && la < spine.LA - 1) || (lb > 1 && !done);
    spine.head.style.opacity = live ? 1 : 0;
    if (live) { if (lb > 1) headAt(spine.close, lb); else headAt(spine.line, la); }
    if (done && !spine.lit) { spine.lit = true; lapForm(); }
  };

  /* коло світла по рамці форми (X05 головної, тут — Web Animations): стартує з точки, де лінія входить у форму */
  var lapForm = function () {
    if (!formCell || !formCell.animate) return;
    var beams = $$('.beam', formCell), rings = $$('.bm-ring, .bm-halo', formCell);
    var r = formCell.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var a0 = Math.atan2(r.left - cx, -((r.top + 52) - cy)) * 180 / Math.PI + 3, dur = 2300;
    beams.forEach(function (b) { b.animate([{ transform: 'rotate(' + a0 + 'deg)' }, { transform: 'rotate(' + (a0 + 360) + 'deg)' }], { duration: dur, easing: 'cubic-bezier(.37,0,.63,1)', fill: 'forwards' }); });
    rings.forEach(function (e) { e.animate([{ opacity: 0 }, { opacity: 1, offset: .22 }, { opacity: 1, offset: .66 }, { opacity: 0 }], { duration: dur, easing: 'linear', fill: 'forwards' }); });
  };
  // розмір квадрата променя — діагональ клітинки (як на головній)
  if (formCell && 'ResizeObserver' in window) new ResizeObserver(function (l) {
    l.forEach(function (e) { var w = e.target.offsetWidth, h = e.target.offsetHeight; e.target.style.setProperty('--d', Math.ceil(Math.hypot(w, h) + 16) + 'px'); });
  }).observe(formCell);

  var sq = 0, onScroll = function () { if (!sq) sq = raf(function () { sq = 0; drawSpine(); sheetsPut(); }); };
  // вхід лінії: після спалаху риски V (≈ 0,45 с) лінія за 1,1 с добігає від риски до того місця, де ви зараз читаєте
  var introK = motion ? 0 : 1;
  var intro = function () {
    var now0 = function () { return window.performance ? performance.now() : Date.now(); };
    var t0 = now0() + 450, D = 1100;
    var step = function () {
      var t = Math.max(0, Math.min(1, (now0() - t0) / D));
      introK = t < 1 ? 1 - Math.pow(1 - t, 3) : 1;
      drawSpine();
      if (t < 1) raf(step);
    };
    raf(step);
  };
  var rebuild = function () { if (buildSpine()) drawSpine(); sheetsPut(); };

  /* ================= аркуші паперу: заходять зі звуженими краями й розгортаються на всю ширину ================= */
  // лише аркуш, що лягає на чорне: два аркуші поспіль — одне поле паперу (між ними тонка лінія, без чорних кутів)
  var sheets = motion ? $$('.lp-paper').filter(function (s) { var p = s.previousElementSibling; return !(p && p.classList.contains('lp-paper')); }) : [];
  var sheetsPut = function () {
    if (!sheets.length) return;
    var vh = innerHeight, side = innerWidth < 600 ? 10 : 22;
    sheets.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      var k = 1 - Math.max(0, Math.min(1, (vh - r.top) / (vh * .55)));
      s.style.clipPath = k > .002 ? 'inset(0px ' + (k * side).toFixed(1) + 'px round ' + (k * 28).toFixed(1) + 'px)' : '';
    });
  };

  /* ================= проява з розмиття: лише нижче першого екрана й лише після першої прокрутки ================= */
  if (motion) {
    var armed = false, items = $$('[data-reveal]'), pending = [];
    var show = function (batch) { batch.forEach(function (el, i) { el.style.transitionDelay = (Math.min(i, 5) * 80) + 'ms'; el.setAttribute('data-rv', 'in'); }); };
    // перевірка — у самій події прокрутки, а не в IntersectionObserver: у Firefox під навантаженням спостерігач віддавав
    // перетин на кадр-два пізніше, і заголовок ще стояв прозорим посеред екрана (ц.17, перевірка Firefox у shoot.py)
    var check = function () {
      if (!pending.length) return;
      var line = innerHeight * .8, atEnd = scrollY + innerHeight >= document.documentElement.scrollHeight - 4, batch = [];
      pending = pending.filter(function (el) {
        // кінець сторінки: те, що не може дійти до лінії 80 %, показуємо, щойно прокрутка дійшла до низу
        if (atEnd) { batch.push(el); return false; }
        // розділ ще за екраном (і, можливо, ще не намальований — content-visibility) — його вміст не міряємо
        var sec = el.closest('section');
        if (sec && sec.getBoundingClientRect().top > innerHeight) return true;
        if (el.getBoundingClientRect().top < line) { batch.push(el); return false; }
        return true;
      });
      if (batch.length) show(batch);
      if (!pending.length) removeEventListener('scroll', check);
    };
    var arm = function () {
      if (armed) return; armed = true; removeEventListener('scroll', arm);
      // стан — у data-rv, а не в класах: класи елемента лишаються ті самі від першого кадру до кінця
      pending = items.filter(function (el) {
        var sec = el.closest('section');
        if (sec && sec.getBoundingClientRect().top > innerHeight) return true;   // увесь розділ нижче екрана
        return el.getBoundingClientRect().top > innerHeight * .92;
      });
      pending.forEach(function (el) { el.setAttribute('data-rv', 'pre'); });
      addEventListener('scroll', check, { passive: true });
      check();
    };
    addEventListener('scroll', arm, { passive: true });
  }

  /* лінія й аркуші: з рухом — малюються прокруткою; без руху — лінія статична й уся, вузли запалені */
  var start = function () {
    rebuild();
    if (!motion && spine) {
      spine.line.style.strokeDashoffset = '0'; spine.close.style.strokeDashoffset = '0'; spine.close.style.visibility = '';
      $$('circle', spine.nodes).forEach(function (c) { c.setAttribute('data-lit', ''); }); spine.end.setAttribute('data-on', ''); spine.head.style.opacity = 0;
      return;
    }
    addEventListener('scroll', onScroll, { passive: true });
    intro();
  };
  var rq = 0;
  addEventListener('resize', function () { clearTimeout(rq); rq = setTimeout(function () { rebuild(); if (!motion && spine) start(); }, 120); });
  // ц.17 · M2: висота main змінюється й без resize (розділи content-visibility вмикаються після load, шрифти, вкладки сценаріїв) —
  // лінію шарів перебудовуємо, інакше її SVG лишається висотою зі старої оцінки й додає порожню прокрутку під підвалом
  if (main && 'ResizeObserver' in window) {
    var mh = 0, mq2 = 0;
    new ResizeObserver(function () {
      var h = main.offsetHeight; if (!spine || Math.abs(h - mh) < 2) { mh = h; return; }
      mh = h; clearTimeout(mq2); mq2 = setTimeout(function () { rebuild(); if (!motion && spine) start(); }, 120);
    }).observe(main);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else afterLoad(start);
  afterLoad(rebuild);
})();
