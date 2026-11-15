/* Li.Ero — концепт Velira. Квітка за правилом філотаксису (золотий кут 137,508°), кількість пелюсток іде за сумою. */
(function () {
  'use strict';
  var root = document.documentElement;
  var MOTION = root.classList.contains('motion');
  var GA = Math.PI * (3 - Math.sqrt(5));            // золотий кут, рад
  var STATES = [34, 55, 89, 144, 233];               // перший екран, 2500+, 2500–4000, 4000+, 9000+
  var MAXN = 233;
  // палітри [серце, край] для кожного стану — від рум'янцю до вина в серці
  var PAL = [
    [[184, 74, 90], [246, 207, 200]],
    [[196, 86, 92], [243, 185, 180]],
    [[212, 110, 78], [244, 194, 143]],
    [[192, 72, 58], [238, 138, 108]],
    [[150, 42, 62], [240, 164, 154]]
  ];

  /* ---------- квітка ---------- */
  var cv = document.getElementById('bloom');
  var ctx = cv && cv.getContext('2d');
  var stageIn = document.getElementById('stageIn');
  var S = { n: STATES[0], open: MOTION ? 0 : 1, st: 0, rot: 0, blur: 0 };
  var size = 0, dirty = true, visible = true, lowQ = false;

  function mix(a, b, t) { return a + (b - a) * t; }
  function mixc(a, b, t) { return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)]; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function rgb(c, k) { return 'rgb(' + (c[0] * k | 0) + ',' + (c[1] * k | 0) + ',' + (c[2] * k | 0) + ')'; }
  function lift(c, t) { return [mix(c[0], 255, t), mix(c[1], 255, t), mix(c[2], 255, t)]; }
  function palAt(st) {
    var i = Math.min(Math.floor(st), PAL.length - 2), t = st - i;
    return [mixc(PAL[i][0], PAL[i + 1][0], t), mixc(PAL[i][1], PAL[i + 1][1], t)];
  }

  function resize() {
    if (!cv) return;
    var r = cv.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2) * (lowQ ? .55 : 1);
    var s = Math.max(1, Math.round(r.width * dpr));
    if (s !== size) { size = s; cv.width = s; cv.height = s; dirty = true; }
  }

  function petal(len, wid, skew) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(len * .18, -wid * .5, len * .62, -wid * (.72 + skew), len * .9, -wid * .42);
    ctx.bezierCurveTo(len * 1.02, -wid * .22, len * 1.03, wid * .2, len * .9, wid * .4);
    ctx.bezierCurveTo(len * .62, wid * (.7 - skew), len * .18, wid * .5, 0, 0);
    ctx.closePath();
  }
  var SP = null, SP_L = 120, SP_O = 40, SP_W = 220, SP_H = 200;
  function shadowSprite() {
    if (SP) return SP;
    SP = document.createElement('canvas'); SP.width = SP_W; SP.height = SP_H;
    var c = SP.getContext('2d'), keep = ctx;
    c.translate(SP_O, SP_H / 2); c.shadowColor = 'rgba(12,3,7,1)'; c.shadowBlur = 16; c.shadowOffsetX = 0;
    ctx = c; petal(SP_L, SP_L * .95, 0); c.fillStyle = 'rgba(12,3,7,1)'; c.fill(); ctx = keep;
    return SP;
  }
  function rnd(i) { var x = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return x - Math.floor(x); }

  function draw() {
    if (!ctx || !size) return;
    var R = size / 2 * .98, n = S.n, open = S.open, pal = palAt(S.st);
    var Rm = R * (1 + .17 * clamp((n - STATES[0]) / (MAXN - STATES[0]), 0, 1));
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, size, size);
    ctx.translate(size / 2, size / 2);
    ctx.rotate(S.rot);
    var top = Math.min(MAXN, Math.ceil(n + 8));
    for (var i = top - 1; i >= 0; i--) {
      var grow = clamp((n - i) / 8, 0, 1);
      if (grow <= 0) continue;
      var rf = Math.min(1.04, Math.sqrt((i + .6) / Math.max(n, 1)));
      var oi = clamp(open * 1.5 - (1 - Math.min(rf, 1)) * .5, 0, 1);
      oi = 1 - Math.pow(1 - oi, 3);
      var jit = rnd(i);
      var base = Rm * .5 * rf * (.25 + .75 * oi);
      var len = Rm * (.1 + .39 * Math.pow(Math.min(rf, 1), 1.1)) * (.42 + .58 * oi) * (.45 + .55 * grow) * (.92 + .16 * jit);
      var wid = len * (1.18 - .38 * Math.min(rf, 1));
      var c = mixc(pal[0], pal[1], Math.pow(Math.min(rf, 1), .8));
      var k = .9 + .14 * jit;
      ctx.save();
      ctx.rotate(i * GA);
      ctx.translate(base * .6, 0);
      ctx.rotate(.55 * (1 - Math.min(rf, 1)) * (.6 + .4 * oi));
      var g = ctx.createLinearGradient(0, 0, len, 0);
      g.addColorStop(0, rgb(c, .42 * k));
      g.addColorStop(.5, rgb(c, .92 * k));
      g.addColorStop(1, rgb(lift(c, .2), k));
      // м'яка тінь — заздалегідь розмитий спрайт (дешево для слабких телефонів і Firefox)
      var sp = lowQ ? null : shadowSprite();
      ctx.globalAlpha = Math.min(1, .25 + grow * 1.2) * (.55 + .35 * (1 - Math.min(rf, 1)));
      if (sp) ctx.drawImage(sp, -SP_O * len / SP_L + Rm * .006, -SP_H / 2 * len / SP_L + Rm * .004, SP_W * len / SP_L, SP_H * len / SP_L);
      ctx.globalAlpha = Math.min(1, .25 + grow * 1.2);
      petal(len, wid, (jit - .5) * .12);
      ctx.fillStyle = g;
      ctx.fill();
      // світла кромка
      ctx.lineWidth = wid * .05;
      ctx.strokeStyle = 'rgba(255,238,232,' + (.06 + .12 * Math.min(rf, 1)) + ')';
      ctx.stroke();
      ctx.restore();
    }
    var core = ctx.createRadialGradient(0, 0, 0, 0, 0, Rm * .09);
    core.addColorStop(0, rgb(pal[0], .4));
    core.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(0, 0, Rm * .09, 0, Math.PI * 2); ctx.fill();
    dirty = false;
  }

  var raf = 0;
  function request() { dirty = true; if (!raf && visible) raf = requestAnimationFrame(function () { raf = 0; if (dirty) draw(); }); }

  /* ---------- стан за прокруткою ---------- */
  var tiers = [].slice.call(document.querySelectorAll('.tier'));
  var coda = document.querySelector('.coda');
  var iris = document.getElementById('iris');
  var order = document.getElementById('order');
  var moreCover = document.querySelector('.more-cover');
  var vh = window.innerHeight, vw = window.innerWidth;

  function sumState() {
    var st = 0;
    for (var k = 0; k < tiers.length; k++) {
      var top = tiers[k].getBoundingClientRect().top;
      st += clamp((vh * .92 - top) / (vh * .5), 0, 1);
    }
    return st;
  }
  function nAt(st) {
    var i = Math.min(Math.floor(st), STATES.length - 2), t = st - i;
    return mix(STATES[i], STATES[i + 1], t);
  }

  var lastIris = -1, lastWrap = -1;
  var lastY = window.scrollY;
  function onScroll() {
    // телефон: капсула ховається, коли гортають униз, і повертається, коли вгору
    var y = window.scrollY;
    if (Math.abs(y - lastY) > 6) { root.classList.toggle('dock-down', y > lastY && y > vh * .5); lastY = y; }
    var st = sumState();
    if (!MOTION) st = Math.round(st);   // reduced motion: стрибок на межі полиці
    var n = nAt(st);
    if (Math.abs(n - S.n) > .01 || Math.abs(st - S.st) > .001) { S.n = n; S.st = st; request(); }
    if (!MOTION) return;
    // ірис із серця квітки
    if (coda && iris && stageIn) {
      var cr = coda.getBoundingClientRect();
      var p = clamp((vh * .2 - cr.top) / (vh * .9), 0, 1);
      if (p !== lastIris || (p >= 1 && moreCover)) {
        lastIris = p;
        var e = p * p * p;
        var sr = stageIn.getBoundingClientRect();
        var cx = sr.left + sr.width / 2, cy = sr.top + sr.height / 2;
        var far = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy));
        var cov = moreCover ? moreCover.getBoundingClientRect().bottom : 1;
        iris.style.visibility = p > 0 && cov > 0 ? 'visible' : 'hidden';
        iris.style.clipPath = 'circle(' + (e * far * 1.02).toFixed(1) + 'px at ' + cx.toFixed(1) + 'px ' + cy.toFixed(1) + 'px)';
        stageIn.style.transform = 'translate(-50%,-50%) scale(' + (1 + .9 * e).toFixed(4) + ')';
      }
    }
    // обгортка розгортається
    if (order) {
      var or = order.getBoundingClientRect();
      var q = clamp((vh - or.top) / (vh * .6), 0, 1);
      if (q !== lastWrap) {
        lastWrap = q;
        var w = q * q * (3 - 2 * q), h = order.offsetHeight;
        if (q >= 1 || or.top > vh * 1.25) { order.style.clipPath = 'none'; w = 1; }
        else {
          // конус обгортки: вістря на нижньому краї екрана, краї розходяться в прямокутник
          var Hv = Math.max(1, vh - or.top), x1 = mix(.34, 0, w) * 100, x2 = mix(.66, 1, w) * 100, sh = Hv * w;
          order.style.clipPath = 'polygon(0 0,100% 0,100% ' + sh.toFixed(0) + 'px,' + x2.toFixed(2) + '% ' + Hv.toFixed(0) + 'px,' + x2.toFixed(2) + '% ' + h + 'px,' + x1.toFixed(2) + '% ' + h + 'px,' + x1.toFixed(2) + '% ' + Hv.toFixed(0) + 'px,0 ' + sh.toFixed(0) + 'px)';
        }
        order.style.setProperty('--fold', (1 - w).toFixed(3));
      }
    }
  }

  var ticking = false;
  function onScrollRaf() { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; onScroll(); }); } }
  window.addEventListener('scroll', onScrollRaf, { passive: true });
  window.addEventListener('resize', function () { vh = window.innerHeight; vw = window.innerWidth; resize(); lastIris = -1; lastWrap = -1; onScroll(); request(); });
  if ('IntersectionObserver' in window && cv) {
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      cv.style.animationPlayState = visible ? 'running' : 'paused';
      if (visible && dirty) request();
    }).observe(cv);
  }
  var cta = document.querySelector('.hero .cta-row');
  if (cta && 'IntersectionObserver' in window) {
    root.classList.add('dock-hide');
    new IntersectionObserver(function (es) { root.classList.toggle('dock-hide', es[0].isIntersecting || es[0].boundingClientRect.top > 0); }).observe(cta);
  }
  var comp = document.getElementById('composer');
  if (comp && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { root.classList.toggle('dock-form', es[0].isIntersecting); }, { rootMargin: '0px 0px -30% 0px' }).observe(comp);
  }
  resize(); onScroll();
  // слабкий пристрій (або рендер без GPU): повна квітка за > 14 мс → нижча роздільність і без тіней
  draw();
  (window.requestIdleCallback || function (f) { return setTimeout(f, 120); })(function () {
    var t = performance.now(), keep = S.n; S.n = MAXN; draw(); var dt = performance.now() - t; S.n = keep;
    if (dt > 14) { lowQ = true; size = 0; resize(); } draw(); }, { timeout: 200 });

  /* ---------- інтро і проявлення ---------- */
  function splitNums() {
    [].forEach.call(document.querySelectorAll('.num'), function (h) {
      var label = h.textContent.replace(/\s+/g, ' ').trim();
      var vis = h.lastChild.textContent;
      h.lastChild.textContent = '';
      var m = document.createElement('span'); m.className = 'mask'; m.setAttribute('aria-hidden', 'true');
      vis.split('').forEach(function (ch) { var s = document.createElement('span'); s.className = 'ch'; s.textContent = ch; m.appendChild(s); });
      h.appendChild(m);
      h.setAttribute('aria-label', label);
    });
  }

  if (MOTION && window.gsap) {
    var gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
    var ease = 'cubic-bezier(0.2,0.7,0.2,1)';
    gsap.to('.wordmark', { opacity: 1, duration: .5, ease: 'power1.out' });
    gsap.to('.glow', { opacity: 1, duration: 1.4, delay: .2, ease: 'power1.out' });
    S.rot = -24 * Math.PI / 180;
    gsap.fromTo(cv, { filter: 'blur(8px)' }, { filter: 'blur(0px)', duration: 1.3, delay: .08, ease: 'power2.out', clearProps: 'filter' });
    gsap.to(S, { open: 1, rot: 0, duration: 1.9, delay: .08, ease: 'power3.out', onUpdate: request });

    splitNums();
    var ST = window.ScrollTrigger;
    // блок ховається лише коли підходить знизу поза екраном (не мигає й видимий на знімках без прокрутки)
    function arm(el, start, show) {
      var cls = el.classList.contains('num') ? 'pre-num' : 'pre';
      ST.create({ trigger: el, start: 'top 135%', once: true, onEnter: function () { el.classList.add(cls); } });
      ST.create({ trigger: el, start: start, once: true, onEnter: function () { el.classList.add(cls); requestAnimationFrame(function () { show(el); }); } });
    }
    function fadeIn(el, d) {
      gsap.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .7, delay: d || 0, ease: 'power3.out', onStart: function () { el.classList.remove('pre'); }, clearProps: 'transform,opacity' });
    }
    [].forEach.call(document.querySelectorAll('.reveal'), function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      arm(el, 'top 80%', function () { fadeIn(el); });
    });
    tiers.forEach(function (t) {
      var num = t.querySelector('.num');
      var rest = [].slice.call(t.querySelectorAll('.tier-text, .slots, .tier-actions'));
      if (t.getBoundingClientRect().top < window.innerHeight) return;
      arm(num, 'top 82%', function () {
        num.classList.remove('pre-num');
        gsap.fromTo(num.querySelectorAll('.ch'), { y: '102%' }, { y: 0, duration: .65, ease: 'power3.out', stagger: function (i) { return i * .04; }, clearProps: 'transform' });
      });
      rest.forEach(function (el, i) { arm(el, 'top 92%', function () { fadeIn(el, .12 + [0, .08, .2][i]); }); });
    });
    // фото відкриваються знизу вгору маскою, підпис — слідом (+120 мс)
    [].forEach.call(document.querySelectorAll('.spread .ph'), function (fig) {
      var frame = fig.querySelector('.ph-frame'), cap = fig.querySelector('figcaption');
      if (fig.getBoundingClientRect().top < window.innerHeight) return;
      ST.create({ trigger: fig, start: 'top 135%', once: true, onEnter: function () { frame.classList.add('pre-clip'); cap.classList.add('pre'); } });
      ST.create({ trigger: fig, start: 'top 82%', once: true, onEnter: function () {
        frame.classList.add('pre-clip'); cap.classList.add('pre');
        gsap.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0% round 34px)' }, { clipPath: 'inset(0% 0% 0% 0% round 34px)', duration: .7, ease: 'power3.out', onStart: function () { frame.classList.remove('pre-clip'); }, clearProps: 'clipPath' });
        fadeIn(cap, .12);
      } });
    });
    // тихий паралакс фото ≤ 6 %
    [].forEach.call(document.querySelectorAll('.ph-frame img'), function (img) {
      gsap.fromTo(img, { yPercent: -3, scale: 1.06 }, { yPercent: 3, scale: 1.06, ease: 'none', scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    window.addEventListener('load', function () { ST.refresh(); });
  } else if (MOTION) {
    S.open = 1; request();
    root.classList.remove('motion');
  }

  /* ---------- конструктор повідомлення ---------- */
  var form = document.getElementById('composer');
  var msg = document.getElementById('msg');
  var status = document.getElementById('status');
  var addr = document.getElementById('addrField');
  function val(name) { var el = form.elements[name]; return el ? (el.value || '').trim() : ''; }
  function radio(name) { var r = form.querySelector('input[name="' + name + '"]:checked'); return r ? r.value : ''; }
  function fmtDate(v) { return v; }
  function build() {
    var kind = radio('kind') || 'букет', sum = radio('sum'), get = radio('get');
    var lines = ['Вітаю! Хочу замовити ' + kind + (sum ? ' у межах «' + sum + '»' : '') + '.'];
    if (val('for')) lines.push('Для кого / привід: ' + val('for'));
    if (val('date')) lines.push('Коли: ' + fmtDate(val('date')));
    if (get) lines.push('Отримання: ' + get + (get.indexOf('доставка') === 0 && val('addr') ? ', ' + val('addr') : ''));
    if (val('name')) lines.push('Мене звати ' + val('name') + '.');
    if (!sum) lines.push('Підкажіть, будь ласка, що можна зібрати.');
    return lines.join('\n');
  }
  function update() {
    if (!form) return;
    addr.hidden = radio('get').indexOf('доставка') !== 0;
    msg.textContent = build();
  }
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (ok, no) {
      var t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy') ? ok() : no(); } catch (e) { no(e); } finally { t.remove(); }
    });
  }
  if (form) {
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    [].forEach.call(form.querySelectorAll('[data-send]'), function (a) {
      a.addEventListener('click', function () {
        var where = a.textContent.replace('Скопіювати й відкрити', '').trim();
        copy(build()).then(function () { status.textContent = 'Текст скопійовано — вставте його в чат ' + where + '.'; },
          function () { status.textContent = 'Не вдалося скопіювати — виділіть текст у бульбашці вручну.'; });
      });
    });
    document.getElementById('copyOnly').addEventListener('click', function () {
      copy(build()).then(function () { status.textContent = 'Текст скопійовано.'; },
        function () { status.textContent = 'Не вдалося скопіювати — виділіть текст у бульбашці вручну.'; });
    });
    [].forEach.call(document.querySelectorAll('[data-pick]'), function (b) {
      b.addEventListener('click', function () {
        var r = form.querySelector('input[name="sum"][value="' + b.getAttribute('data-pick') + '"]');
        if (r) { r.checked = true; update(); }
      });
    });
    update();
  }

  // постер для фолбека (для збирання: window.__bloomPoster())
  window.__bloomTime = function () { var t = performance.now(); for (var k = 0; k < 10; k++) { S.n = 233; S.st = 4; draw(); } return (performance.now() - t) / 10; };
  window.__bloomPoster = function (st) { S.open = 1; S.rot = 0; S.st = st || 0; S.n = STATES[Math.round(st || 0)]; draw(); return cv.toDataURL('image/png'); };
})();
