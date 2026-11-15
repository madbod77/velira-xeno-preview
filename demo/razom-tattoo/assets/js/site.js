(function () {
  'use strict';
  var doc = document.documentElement;
  var hasMotion = doc.classList.contains('js-motion');
  if (hasMotion && !window.gsap) { doc.classList.remove('js-motion'); hasMotion = false; }

  /* ---------- шапка й капсула ---------- */
  var bar = document.getElementById('bar');
  var hero = document.querySelector('.hero');
  var foot = document.getElementById('foot');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    bar.classList.toggle('is-solid', y > 40);
    bar.classList.toggle('is-past', y > hero.offsetHeight * 0.62);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- проява блоків ----------
     Початковий стан — видимий (знімок, прев'ю, друк, якір бачать усе). Ховаємо лише те, що ще нижче екрана,
     і лише в момент першої прокрутки (arm нижче) — тобто поза кадром, глядач цього не бачить. */
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  function armReveals() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var group = [].slice.call(el.parentNode.querySelectorAll('.reveal.pre'));
        var i = Math.max(0, group.indexOf(el));
        el.style.transitionDelay = Math.min(i, 3) * 80 + 'ms';
        el.classList.remove('pre'); el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -20% 0px' });
    reveals.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) return;   // уже на екрані або вище — лишається видимим
      el.classList.add('pre'); io.observe(el);
    });
  }

  /* ---------- хайлайти: вкладки ---------- */
  var tabs = [].slice.call(document.querySelectorAll('.hl-tabs [role="tab"]'));
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
  function select(i, focus) {
    tabs.forEach(function (t, j) {
      var on = j === i;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on) {
        panels[j].hidden = false;
        if (hasMotion) {
          panels[j].classList.remove('is-entering'); void panels[j].offsetWidth; panels[j].classList.add('is-entering');
        }
      } else {
        panels[j].hidden = true;
      }
    });
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(i, false); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % tabs.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
    });
  });
  if (tabs.length) select(2, false);

  /* ---------- чернетка Direct ---------- */
  var ta = document.getElementById('dmText');
  var labels = { place: 'Місце', size: 'Розмір', sketch: 'Ескіз' };
  [].forEach.call(document.querySelectorAll('.chips'), function (fs) {
    var key = fs.getAttribute('data-key');
    var btns = [].slice.call(fs.querySelectorAll('button'));
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var was = b.getAttribute('aria-pressed') === 'true';
        btns.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', was ? 'false' : 'true');
        var val = was ? '…' : b.textContent.trim();
        var re = new RegExp('^' + labels[key] + ':.*$', 'm');
        var line = labels[key] + ': ' + val;
        ta.value = re.test(ta.value) ? ta.value.replace(re, line) : ta.value + '\n' + line;
      });
    });
  });
  var status = document.getElementById('dmStatus');
  document.getElementById('dmCopy').addEventListener('click', function () {
    var text = ta.value;
    function ok() { status.textContent = 'Скопійовано. Відкрийте Direct і вставте повідомлення.'; }
    function fallback() {
      ta.focus(); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { status.textContent = 'Не вдалося скопіювати — виділіть текст вручну.'; }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback);
    else fallback();
  });

  if (!hasMotion) return;

  /* ================= рух ================= */
  var gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  var ST = window.ScrollTrigger;

  /* --- чорнило: набір шляхів, голка біжить по поточному --- */
  /* шляхи мають pathLength="1": початковий стан (сховано / набито) ставиться без вимірювань; довжини міряються ліниво,
     лише коли голка справді рушає — getTotalLength не в першому завданні сторінки */
  function inkSet(paths) {
    var items = null, total = 0;
    var needles = paths.map(function (p) { return p.parentNode.querySelector('.needle'); }).filter(Boolean);
    function measure() {
      items = paths.map(function (p) { return { p: p, L: p.getTotalLength(), needle: p.parentNode.querySelector('.needle') }; });
      total = items.reduce(function (s, it) { return s + it.L; }, 0);
    }
    return function (progress) {
      if (!items && (progress <= 0 || progress >= 1)) {
        paths.forEach(function (p) { p.style.strokeDasharray = '1 1'; p.style.strokeDashoffset = progress >= 1 ? 0 : 1; });
        needles.forEach(function (n) { n.style.opacity = 0; });
        return;
      }
      if (!items) measure();
      var dist = progress * total, active = null;
      items.forEach(function (it) {
        var d = Math.max(0, Math.min(it.L, dist));
        it.p.style.strokeDasharray = '1 1';
        it.p.style.strokeDashoffset = 1 - d / it.L;
        if (dist > 0 && dist < it.L) active = { it: it, d: d };
        dist -= it.L;
      });
      needles.forEach(function (n) { n.style.opacity = 0; });
      if (active && active.it.needle && progress > 0 && progress < 1) {
        var pt = active.it.p.getPointAtLength(active.d);
        active.it.needle.setAttribute('cx', pt.x); active.it.needle.setAttribute('cy', pt.y);
        active.it.needle.style.opacity = 1;
      }
    };
  }
  var drawA = inkSet([].slice.call(document.querySelectorAll('#knot .ink-a')));
  var drawB = inkSet([].slice.call(document.querySelectorAll('#knot .ink-b')));
  var drawF = inkSet([].slice.call(document.querySelectorAll('#footKnot .ink-f')));
  drawA(0); drawB(0);   /* вузол у підвалі за замовчуванням набитий (CSS), drawF — лише після arm */

  /* --- відгин аркуша: лінія згину x/W + y/H = d --- */
  var transfer = document.getElementById('transfer');
  var flap = document.getElementById('flap');
  function clipPoly(poly, W, H, keepBelow, c) {
    // залишає точки, де g(p) <= c (keepBelow) або g(p) >= c
    var out = [];
    function g(p) { return p[0] / W + p[1] / H - c; }
    for (var i = 0; i < poly.length; i++) {
      var a = poly[i], b = poly[(i + 1) % poly.length];
      var ga = g(a), gb = g(b);
      var ina = keepBelow ? ga <= 0 : ga >= 0, inb = keepBelow ? gb <= 0 : gb >= 0;
      if (ina) out.push(a);
      if (ina !== inb) {
        var t = ga / (ga - gb);
        out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      }
    }
    return out;
  }
  function toCss(poly) {
    if (poly.length < 3) return 'polygon(0 0, 0 0, 0 0)';
    return 'polygon(' + poly.map(function (p) { return p[0].toFixed(1) + 'px ' + p[1].toFixed(1) + 'px'; }).join(',') + ')';
  }
  function peel(d) {
    var W = transfer.offsetWidth, H = transfer.offsetHeight;
    var rect = [[0, 0], [W, 0], [W, H], [0, H]];
    transfer.style.clipPath = toCss(clipPoly(rect, W, H, true, d));
    var k = Math.min(0.42, Math.max(0, 2.02 - d));
    var band = clipPoly(clipPoly(rect, W, H, false, d), W, H, true, d + k);
    var nx = 1 / W, ny = 1 / H, nn = nx * nx + ny * ny;
    var refl = band.map(function (p) {
      var f = p[0] * nx + p[1] * ny - d;
      return [p[0] - 2 * f * nx / nn, p[1] - 2 * f * ny / nn];
    });
    flap.style.clipPath = toCss(refl);
    flap.parentNode.style.display = refl.length >= 3 ? '' : 'none';   /* WebKit: фільтр над порожнім кліпом малює чорний клапоть у кутку */
  }
  peel(2.05);

  var intro = gsap.timeline({ delay: 0.25 });
  var pr = { d: 2.05 }, pa = { v: 0 };
  intro.to(pr, { d: -0.08, duration: 1.4, ease: 'power2.inOut', onUpdate: function () { peel(pr.d); },
    onComplete: function () { transfer.style.display = 'none'; flap.parentNode.style.display = 'none'; } });
  intro.to(pa, { v: 1, duration: 1.6, ease: 'power1.inOut', onUpdate: function () { drawA(pa.v); } }, 1.25);

  if (ST) {
    var pb = { v: 0 };
    gsap.to(pb, { v: 1, ease: 'none', onUpdate: function () { drawB(pb.v); },
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 30%', scrub: 0.5 } });

    /* знятий аркуш (кур'єр) переноситься з кута першого екрана до правого верхнього кута Direct-аркуша */
    var sheet = document.getElementById('dmSheet');
    var dmFlap = document.getElementById('dmFlap');
    var carrier = document.getElementById('carrier');
    var card = document.querySelector('.hero-card');
    var geo = null;
    function measure() {
      var sy = window.scrollY || window.pageYOffset, cr = card.getBoundingClientRect(), dr = sheet.getBoundingClientRect();
      var vh = window.innerHeight;
      var narrow = window.innerWidth < 760, cw = carrier.offsetWidth;
      geo = { x0: narrow ? window.innerWidth - cw * 0.42 : cr.right - 70, y0: cr.bottom + sy - (narrow ? 14 : 52),
              x1: narrow ? dr.right - cw * 0.62 : dr.right - 76, y1: dr.top + sy,
              s0: vh * 0.12, s1: Math.max(vh * 0.12 + 200, dr.top + sy - vh * 0.72) };
    }
    function carry() {
      if (!geo) measure();
      var y = window.scrollY || window.pageYOffset;
      var p = Math.max(0, Math.min(1, (y - geo.s0) / (geo.s1 - geo.s0)));
      var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      var op = p <= 0 ? 0 : p < 0.15 ? p / 0.15 : p > 0.9 ? (1 - p) / 0.1 : 1;
      gsap.set(carrier, { x: geo.x0 + (geo.x1 - geo.x0) * e, y: geo.y0 + (geo.y1 - geo.y0) * e,
        rotation: -8 * (1 - e), scale: 0.9 + 0.1 * e, autoAlpha: op });
    }
    /* Direct-аркуш лягає з того самого (правого верхнього) кута, з видимим зворотом — дзеркало відгину */
    function lay(q) {
      var W = sheet.offsetWidth, H = sheet.offsetHeight;
      if (q >= 1) { sheet.style.clipPath = ''; dmFlap.style.clipPath = 'polygon(0 0,0 0,0 0)'; dmFlap.parentNode.style.display = 'none'; return; }
      var c = -0.04 + q * 2.1;
      var rect = [[0, 0], [W, 0], [W, H], [0, H]];
      function mir(poly) { return poly.map(function (pt) { return [W - pt[0], pt[1]]; }); }
      sheet.style.clipPath = toCss(mir(clipPoly(rect, W, H, true, c)));
      var k = Math.min(0.38, Math.max(0, c + 0.04), Math.max(0, 2.02 - c));
      var band = clipPoly(clipPoly(rect, W, H, false, c), W, H, true, c + k);
      var nx = 1 / W, ny = 1 / H, nn = nx * nx + ny * ny;
      var refl = band.map(function (pt) { var f = pt[0] * nx + pt[1] * ny - c; return [pt[0] - 2 * f * nx / nn, pt[1] - 2 * f * ny / nn]; });
      dmFlap.style.clipPath = toCss(mir(refl));
      dmFlap.parentNode.style.display = refl.length >= 3 ? '' : 'none';
    }
    ST.addEventListener('refresh', function () { measure(); carry(); });
    window.addEventListener('scroll', carry, { passive: true });
    measure(); carry();

    /* ---- хореографія нижче першого екрана: прогресивне покращення ----
       До першої прокрутки все стоїть у кінцевому, видимому стані: Direct-аркуш відкритий, цитата залита, фіолетовий
       аркуш піднятий, вузол у підвалі набитий. Повнокадровий знімок, прев'ю посилання, друк і перехід за якорем
       бачать вміст. З першою прокруткою (arm) кожен scrub-рух вмикається ЛИШЕ для елемента, який ще повністю нижче
       екрана, — його початковий стан ставиться поза кадром. Що вже на екрані або позаду (якір #direct, #ne-perevedeno,
       відновлена позиція, високий монітор) — лишається кінцевим без анімації. */
    lay(1);
    var pending = location.hash.replace('#', '');
    var skipIds = { direct: ['dmSheet'], 'ne-perevedeno': ['paper', 'quote'], paper: ['paper', 'quote'], foot: ['paper', 'quote', 'dmSheet'] }[pending] || [];
    var scrubbed = [];
    function below(el) { return el.getBoundingClientRect().top >= window.innerHeight; }
    function track(tween) { scrubbed.push(tween); return tween; }
    var armed = false;
    function arm() {
      if (armed) return; armed = true;
      ARM_EVENTS.forEach(function (ev) { window.removeEventListener(ev, arm, { passive: ev !== 'wheel' && ev !== 'touchstart' }); });
      armReveals();

      if (below(sheet) && skipIds.indexOf('dmSheet') < 0) {
        var ps = { q: 0 };
        lay(0);
        track(gsap.to(ps, { q: 1, ease: 'none', onUpdate: function () { lay(ps.q); },
          scrollTrigger: { trigger: sheet, start: 'top 72%', end: 'top 22%', scrub: 0.5, onLeave: function () { lay(1); } } }));
      }

      var quoteLine = document.querySelector('.quote-line'), ruleWrap = document.querySelector('.rule-wrap');
      if (below(quoteLine) && skipIds.indexOf('quote') < 0) {
        track(gsap.fromTo('.fill', { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', ease: 'none',
          scrollTrigger: { trigger: quoteLine, start: 'top 85%', end: 'center 55%', scrub: 0.5 } }));
      }
      if (below(ruleWrap) && skipIds.indexOf('quote') < 0) {
        track(gsap.fromTo('.stencil-rule', { scaleX: 0 }, { scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: ruleWrap, start: 'top 94%', end: 'top 74%', scrub: 0.5 } }));
        gsap.set('.rule-band', { opacity: 1 });
        track(gsap.fromTo('.rule-band', { scaleY: 0 }, { scaleY: 1, ease: 'none', immediateRender: true,
          scrollTrigger: { trigger: ruleWrap, start: 'top 76%', end: 'top 56%', scrub: 0.5 } }));
        /* смуга — лише край, з якого піднімається аркуш; коли аркуш ліг, вона розчиняється (у спокої — тільки пунктир і аркуш) */
        track(gsap.fromTo('.rule-band', { opacity: 1 }, { opacity: 0, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: '#paper', start: 'top 55%', end: 'top 36%', scrub: 0.5 } }));
      }

      /* фіолетовий аркуш піднімається */
      var paper = document.getElementById('paper');
      if (below(paper) && skipIds.indexOf('paper') < 0) {
        track(gsap.fromTo(paper, { scale: 0.94, clipPath: 'inset(16% 0% 0% 0% round 56px)' }, { scale: 1, clipPath: 'inset(0% 0% 0% 0% round 36px)', ease: 'none',
          scrollTrigger: { trigger: paper, start: 'top 98%', end: 'top 34%', scrub: 0.5 } }));
      }

      /* вузол у підвалі доводить лінію */
      if (below(foot)) {
        var pf = { v: 0 };
        drawF(0);
        track(gsap.to(pf, { v: 1, ease: 'none', onUpdate: function () { drawF(pf.v); },
          scrollTrigger: { trigger: '#foot', start: 'top 88%', end: 'top 40%', scrub: 0.5 } }));
      }

      /* одразу після refresh — кожен scrub-рух у свій справжній прогрес прокрутки (без доганяння) */
      ST.refresh();
      scrubbed.forEach(function (t) { if (t.scrollTrigger) t.progress(t.scrollTrigger.progress); });
    }
    /* колесо, дотик, клавіша, натиск — приходять ДО зсуву сторінки, тож аркуш ще гарантовано нижче екрана; scroll — запасний шлях */
    var ARM_EVENTS = ['wheel', 'touchstart', 'keydown', 'pointerdown', 'scroll'];
    /* passive:false лише для першого колеса/дотику: інакше Chrome зсуває сторінку на compositor-потоці ще до обробника.
       Після arm слухачі знято — далі прокрутка повністю пасивна. */
    ARM_EVENTS.forEach(function (ev) { window.addEventListener(ev, arm, { passive: ev !== 'wheel' && ev !== 'touchstart' }); });
    window.addEventListener('load', function () {
      ST.refresh();
      if ((window.scrollY || window.pageYOffset) > 0) arm();   // відновлена позиція / якір — одразу в справжній стан
    });
  } else {
    drawB(1); drawF(1);
  }
})();
