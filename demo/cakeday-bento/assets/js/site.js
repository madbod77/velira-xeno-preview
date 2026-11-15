/* Cakeday — концепт Velira. Фірмовий момент «Кремом по кришці»: напис кремом на бенто, зум у крем, кришка закривається. */
(function () {
  'use strict';
  var W = window, D = document, H = D.documentElement;
  W.__cd = true;
  var NS = 'http://www.w3.org/2000/svg';
  var CX = 618, CY = 612, R = 236;          // верх торта у координатах фото 1254×1254
  var BIO = 'Для особливих свят';
  var reduce = false;
  try { reduce = W.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var G = W.gsap, ST = W.ScrollTrigger;
  var motion = !!G && !reduce;
  if (!motion) H.classList.remove('motion');
  if (G && ST) G.registerPlugin(ST);

  /* ---------- вимір і розкладка напису по колу торта ---------- */
  var meas = (function () {
    var s = D.createElementNS(NS, 'svg');
    s.setAttribute('width', '0'); s.setAttribute('height', '0'); s.setAttribute('aria-hidden', 'true');
    s.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden';
    var t = D.createElementNS(NS, 'text'); t.setAttribute('class', 'pipe-t'); s.appendChild(t); D.body.appendChild(s);
    return t;
  })();
  function tw(str, fs) { meas.setAttribute('font-size', fs); meas.textContent = str; return meas.getComputedTextLength(); }

  function layout(text) {
    var words = text.trim().split(/\s+/).filter(Boolean);
    if (!words.length) words = BIO.split(' ');
    for (var fs = 100; fs >= 30; fs -= 4) {
      var lh = fs * 1.12;
      for (var n = 1; n <= 4; n++) {
        var total = n * lh, lines = [], i = 0, ok = true;
        for (var k = 0; k < n; k++) {
          var top = CY - total / 2 + k * lh, bot = top + lh;
          var dy = Math.max(Math.abs(top - CY), Math.abs(bot - CY));
          if (dy >= R) { ok = false; break; }
          var avail = 2 * Math.sqrt(R * R - dy * dy) - 30, line = '';
          while (i < words.length) {
            var cand = line ? line + ' ' + words[i] : words[i];
            if (tw(cand, fs) <= avail) { line = cand; i++; } else break;
          }
          if (!line) { ok = false; break; }
          lines.push({ t: line, base: top + lh * 0.7 });
        }
        if (ok && i >= words.length) {
          lines.forEach(function (l) { l.w = tw(l.t, fs); });
          return { fs: fs, lines: lines };
        }
      }
    }
    var cut = text.slice(0, 14);
    return { fs: 30, lines: [{ t: cut, base: CY + 10, w: tw(cut, 30) }] };
  }

  function el(name, attrs) { var e = D.createElementNS(NS, name); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }

  function render(svg, text, hidden) {
    var L = layout(text), defs = svg.querySelector('.pdefs'), g = svg.querySelector('.lines'), id = svg.id, items = [];
    defs.textContent = ''; g.textContent = '';
    L.lines.forEach(function (ln, k) {
      var x0 = CX - ln.w / 2 - 34, wFull = ln.w + 68, y0 = ln.base - L.fs * 1.08, h = L.fs * 1.62;
      // маска з розтушованим фронтом (14–28 од.): крем «тягнеться», а не обрізається вертикальним краєм
      var F = 60, mid = 'm' + id + k;
      var lg = el('linearGradient', { id: mid + 'g', x1: '0', x2: '1', y1: '0', y2: '0' });
      lg.appendChild(el('stop', { offset: '0', 'stop-color': '#fff' })); lg.appendChild(el('stop', { offset: '1', 'stop-color': '#000' }));
      defs.appendChild(lg);
      var mk = el('mask', { id: mid, maskUnits: 'userSpaceOnUse', x: x0 - 40, y: y0, width: wFull + 120, height: h });
      var rect = el('rect', { x: x0, y: y0, height: h, width: hidden ? 0 : wFull, fill: '#fff' });
      var edge = el('rect', { x: hidden ? x0 : x0 + wFull, y: y0, height: h, width: hidden ? 0 : F, fill: 'url(#' + mid + 'g)' });
      mk.appendChild(rect); mk.appendChild(edge); defs.appendChild(mk);
      rect.__edge = edge; rect.__F = F;
      var outer = el('g', { mask: 'url(#' + mid + ')' });
      var inner = el('g', { filter: 'url(#cream)' });
      var t = el('text', { 'class': 'pipe-t', x: CX, y: ln.base.toFixed(1), 'font-size': L.fs, 'text-anchor': 'middle' });
      t.textContent = ln.t; inner.appendChild(t); outer.appendChild(inner); g.appendChild(outer);
      items.push({ rect: rect, x0: x0, w: wFull, base: ln.base, fs: L.fs });
    });
    return items;
  }

  /* насадка йде по фронту крему */
  function pipeTl(svg, items, opts) {
    opts = opts || {};
    var pos = svg.querySelector('.nozzle-pos'), nz = svg.querySelector('.nozzle');
    var tl = G.timeline({ delay: opts.delay || 0 });
    var speed = opts.speed || 1;
    function place(it, w) {
      if (!pos) return;
      var x = it.x0 + Math.max(0, w - 30), y = it.base - it.fs * 0.34 + Math.sin(w / 34) * it.fs * 0.1;
      pos.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')');
    }
    if (nz && items[0]) {
      place(items[0], 0);
      tl.fromTo(nz, { opacity: 0, scale: 0.8, svgOrigin: '0 0' }, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }, 0);
    }
    items.forEach(function (it, k) {
      var o = { w: 0 };
      var dur = G.utils.clamp(0.42, 1.08, it.w / 560) * speed;
      tl.to(o, {
        w: it.w, duration: dur, ease: 'power1.inOut',
        onUpdate: function () {
          var f = Math.min(it.rect.__F, o.w), solid = Math.max(0, o.w - f);
          it.rect.setAttribute('width', solid.toFixed(1));
          it.rect.__edge.setAttribute('x', (it.x0 + solid).toFixed(1)); it.rect.__edge.setAttribute('width', f.toFixed(1));
          place(it, o.w);
        },
        onComplete: function () { it.rect.setAttribute('width', it.w); it.rect.__edge.setAttribute('width', 0); }
      }, k === 0 ? (nz ? 0.08 : 0) : '>-0.12');
    });
    if (nz) tl.to(nz, { opacity: 0, y: -18, duration: 0.35, ease: 'power2.in' }, '>-0.05').set(nz, { y: 0 });
    return tl;
  }

  /* ---------- екземпляри ---------- */
  var heroSvg = D.getElementById('pipeHero'), napSvg = D.getElementById('pipeNapys'), ordSvg = D.getElementById('pipeOrder');
  var input = D.getElementById('inscr'), input2 = D.getElementById('inscr2'), count = D.getElementById('count');
  var stText = D.getElementById('stText'), msg = D.getElementById('msg'), date = D.getElementById('date');
  var current = BIO, napTl = null;

  function fontsReady(ms) {
    if (!D.fonts || !D.fonts.load) return Promise.resolve();
    return Promise.race([
      Promise.all([D.fonts.load('400 80px Pacifico', 'Для особливих свят'), D.fonts.load('400 80px Pacifico', 'Cakeday')]),
      new Promise(function (r) { setTimeout(r, ms); })
    ]);
  }

  function heroIntro() {
    var items = render(heroSvg, BIO, motion);
    heroSvg.querySelector('.lines').style.visibility = 'visible';
    if (!motion) return;
    var img = heroSvg.parentNode.querySelector('img');
    G.fromTo(img, { filter: 'blur(8px)', scale: 0.965 }, { filter: 'blur(0px)', scale: 1, duration: 0.6, ease: 'power3.out', clearProps: 'filter' });
    pipeTl(heroSvg, items, { delay: 0.28 });
  }

  function setInscription(text, animate) {
    current = text.trim() || BIO;
    if (napTl) { napTl.kill(); napTl = null; }
    var items = render(napSvg, current, animate && motion);
    if (animate && motion) napTl = pipeTl(napSvg, items, { speed: 0.62 });
    render(ordSvg, current, false);
    if (stText) stText.textContent = current;
    compose();
  }

  /* ---------- повідомлення-замовлення ---------- */
  function fmtDate(v) { v = (v || '').trim(); return v ? v : '…'; }
  function message() {
    var c = D.querySelector('input[name=cat]:checked');
    return 'Вітаю! Хочу замовити ' + (c ? c.value : 'бенто-торт') + '.\nНапис: «' + current + '».\nДата: ' + fmtDate(date && date.value) + '.\nПідкажіть, будь ласка, смаки й ціну.';
  }
  function compose() {
    if (!msg) return;
    var lines = message().split('\n');
    msg.textContent = '';
    lines.forEach(function (l, i) { if (i) msg.appendChild(D.createElement('br')); msg.appendChild(D.createTextNode(l)); });
  }
  var toast = D.getElementById('toast');
  function copy() {
    var text = message();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { if (toast) toast.textContent = 'Текст скопійовано — вставте його в чат Cakeday.'; }, function () {});
      }
    } catch (e) {}
  }
  var tgLabel = D.getElementById('toTgLabel');
  if (tgLabel && navigator.clipboard) tgLabel.textContent = 'Скопіювати й відкрити Telegram';
  ['toTg', 'toViber'].forEach(function (id) { var a = D.getElementById(id); if (a) a.addEventListener('click', copy); });

  var deb = null;
  function onType(src, other) {
    return function () {
      var v = src.value.slice(0, 36);
      if (other && other.value !== v) other.value = v;
      if (count) count.textContent = v.length ? v.length + ' з 36 знаків' : 'до 36 знаків';
      clearTimeout(deb);
      deb = setTimeout(function () { setInscription(v, src === input); }, 220);
    };
  }
  if (input) input.addEventListener('input', onType(input, input2));
  if (input2) input2.addEventListener('input', onType(input2, input));
  D.querySelectorAll('input[name=cat]').forEach(function (r) { r.addEventListener('change', compose); });
  if (date) {
    date.addEventListener('change', compose); date.addEventListener('input', compose);
  }

  /* ---------- капсула ---------- */
  var dock = D.getElementById('dock');
  var darkSecs = Array.prototype.slice.call(D.querySelectorAll('.order-field, .foot'));
  function onScroll() {
    if (!dock) return;
    dock.classList.toggle('solid', W.scrollY > 60);
    var y = 38, dark = darkSecs.some(function (s) { var r = s.getBoundingClientRect(); return r.top <= y && r.bottom >= y; });
    dock.classList.toggle('dark', dark);
  }
  W.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- старт ---------- */
  function pacReady() { try { return !D.fonts || D.fonts.check('80px Pacifico', 'Для'); } catch (e) { return true; } }
  fontsReady(1800).then(function () {
    var ok = pacReady();
    if (ok) heroIntro();
    else { render(heroSvg, BIO, false); heroSvg.querySelector('.lines').style.visibility = 'visible'; }
    render(napSvg, BIO, false);
    render(ordSvg, BIO, false);
    compose();
    // шрифт крему довантажився пізніше — перекласти без руху (лише якщо інтро не йшло)
    if (!ok && D.fonts && D.fonts.ready) {
      D.fonts.ready.then(function () { render(heroSvg, BIO, false); setInscription(current, false); });
    }
  });

  /* ---------- прокрутка ---------- */
  if (!motion || !ST) return;
  var mm = G.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    // перший екран лише трохи відходить
    G.to('.hero-stage', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Зум у крем: коло росте, фото наближається до верху торта
    var zt = { trigger: '#napys', start: 'top bottom', end: 'top 22%', scrub: 0.5 };
    G.fromTo('.lens', { '--r': '34%' }, { '--r': '50%', ease: 'none', scrollTrigger: zt });
    G.fromTo('.lens-in', { scale: 1 }, { scale: 2.3, ease: 'power1.in', scrollTrigger: { trigger: '#napys', start: 'top bottom', end: 'top 22%', scrub: 0.5 } });

    // какао-поле розкривається «віком»
    // бічний відступ «віка» завжди менший за поле тексту, щоб не зрізати жодної літери (телефон: 3 %, ПК: до 7 %)
    var of = D.querySelector('.order-field');
    var padPx = of ? parseFloat(getComputedStyle(of).paddingLeft) || 16 : 16;
    var side = Math.min(7, Math.max(1, (padPx - 4) / W.innerWidth * 100)).toFixed(2) + '%';
    var wide = W.innerWidth >= 900;
    var sideOut = (wide ? 6 : Math.min(4, Math.max(1, (padPx - 1) / W.innerWidth * 100))).toFixed(2) + '%';
    var radOut = wide ? '64px' : '48px';
    G.fromTo('.order-field',
      { clipPath: 'inset(0% ' + side + ' 0% ' + side + ' round 56px 56px 0px 0px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', ease: 'none',
        scrollTrigger: { trigger: '#order', start: 'top bottom', end: 'top 30%', scrub: 0.4 } });

    // какао-поле закривається так само, як відкрилось: низ стає заокругленим «віком»
    G.fromTo('.order-field',
      { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)' },
      { clipPath: 'inset(0% ' + sideOut + ' 0% ' + sideOut + ' round 0px 0px ' + radOut + ' ' + radOut + ')', ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: '#order', start: 'bottom bottom', end: 'bottom 45%', scrub: 0.3 } });
    return function () {};
  });
  // кришка закривається над написом гостя: на ПК — разом із секцією (коробка поруч із формою),
  // на телефоні — коли коробка (після діалогу, над кнопками відправки) заходить на екран
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 900px)', function () {
    G.fromTo('.lid', { rotationX: -118 }, { rotationX: 0, ease: 'power1.inOut',
      scrollTrigger: { trigger: '#order', start: 'top 72%', end: 'top 10%', scrub: 0.5 } });
  });
  mm.add('(prefers-reduced-motion: no-preference) and (max-width: 899px)', function () {
    G.fromTo('.lid', { rotationX: -118 }, { rotationX: 0, ease: 'power1.inOut',
      scrollTrigger: { trigger: '.order-box', start: 'top 85%', end: 'top 35%', scrub: 0.5 } });
  });
  mm.add('(prefers-reduced-motion: no-preference)', function () {

    // проява: лише заголовки секцій і назви категорій проступають (opacity .6 → 1, Y +14, 600 мс, тригер — за 40 px до входу в екран);
    // текст, ціни-порожні місця й дії стоять одразу — на телефоні під час швидкої прокрутки нічого не зникає
    D.querySelectorAll('main section:not(.hero) [data-rv="1"]').forEach(function (e) {
      G.fromTo(e, { opacity: 0.6, y: 14 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: e, start: 'top bottom+=40', once: true }
      });
    });
    return function () {};
  });
  W.addEventListener('load', function () { ST.refresh(); });
})();
