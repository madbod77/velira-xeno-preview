/* Bloom.sis — рух «Квітне від Подолу». Без бібліотек: rAF + IntersectionObserver + WAAPI.
   Без JS і з reduced motion сторінка вже в кінцевому стані (схема зафарбована в HTML). */
(function () {
  'use strict';
  var d = document.documentElement;
  var motion = d.classList.contains('motion');

  // капсула навігації: підкладка з'являється після 60 px прокрутки
  var scrolled = null;
  function onNav() {
    var s = window.scrollY > 60;
    if (s !== scrolled) { scrolled = s; d.classList.toggle('scrolled', s); }
  }
  addEventListener('scroll', onNav, { passive: true }); onNav();
  if (!motion || !window.BloomGeom) { d.classList.remove('motion'); return; }

  var G = window.BloomGeom;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function smooth(t) { return t * t * (3 - 2 * t); }
  function outCubic(t) { return 1 - Math.pow(1 - t, 3); }

  // ---- проява блоків (верх елемента на 0.80 висоти екрана, один раз)
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -12% 0px' });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });

  // ---- купол букета: фокус з розмиття
  var dome = document.getElementById('dome');
  var domeImg = dome.querySelector('img');
  var focused = false;
  function focusDome() { if (focused) return; focused = true; requestAnimationFrame(function () { dome.classList.add('in'); }); }
  if (domeImg.complete) focusDome(); else { domeImg.addEventListener('load', focusDome); setTimeout(focusDome, 900); }

  // ---- сцена доставки
  var deliv = document.getElementById('dostavka');
  var lede = document.querySelector('.hero .lede');
  var stageText = Array.prototype.slice.call(document.querySelectorAll('#stage h2, #stage .quote, #stage .ex-lead, #stage .ex-list, #stage .ex-note, #stage .map figcaption'));
  var genNote = document.querySelector('.dome-wrap .gen-note');
  var budget = document.getElementById('budget');
  var paint = document.getElementById('order-paint');
  var order = document.getElementById('order');
  var four = document.querySelector('.addr-n');
  var stage = document.getElementById('stage');
  var flood = document.getElementById('flood');
  var pin = document.getElementById('pin-dome');
  var washes = Array.prototype.slice.call(stage.querySelectorAll('.w'));
  var lite = (navigator.hardwareConcurrency || 8) <= 4;
  var N = lite ? 64 : 96;
  if (lite && washes[2]) { washes[2].style.display = 'none'; washes = washes.slice(0, 2); }
  var marks = {};
  G.EXCEPT.forEach(function (e) {
    marks[e.id] = { d: G.dist(e), on: null, els: Array.prototype.slice.call(stage.querySelectorAll('[data-ex="' + e.id + '"]')) };
  });
  stage.classList.add('live');
  d.classList.add('flight');

  var geo = null, last = { R: -1, f: -1, t: -1, q: -1 };
  function measure() {
    var keep = dome.style.transform;
    dome.style.transform = 'none';
    var dr = dome.getBoundingClientRect();
    dome.style.transform = keep;
    var sr = stage.getBoundingClientRect(), pr = pin.getBoundingClientRect();
    var pinX = pr.left - sr.left + pr.width / 2, pinY = pr.top - sr.top + pr.height / 2;
    var w = stage.clientWidth, h = stage.clientHeight;
    geo = {
      delivTop: deliv.getBoundingClientRect().top + window.scrollY,
      run: Math.max(1, deliv.offsetHeight - h),
      pinX: pinX, pinY: pinY, pinW: pr.width,
      domeTop: dr.top + window.scrollY, domeLeft: dr.left, domeW: dr.width,
      diag: Math.hypot(Math.max(pinX, w - pinX), Math.max(pinY, h - pinY)) + 4
    };
    // «4» адреси: центр відносно секції замовлення (над її верхом — від'ємний y)
    var or = order.getBoundingClientRect(), fr = four.getBoundingClientRect();
    geo.orderTop = or.top + window.scrollY;
    geo.ledeTop = lede.getBoundingClientRect().top + window.scrollY;
    geo.budgetTop = budget.getBoundingClientRect().top + window.scrollY;
    geo.fx = fr.left + fr.width / 2 - or.left; geo.fy = fr.top + fr.height / 2 - or.top;
    geo.r0 = fr.width / 2;
    geo.paintOff = order.getBoundingClientRect().top - paint.getBoundingClientRect().top; // шар пелюсток виходить вгору до «4»
    geo.r1 = Math.hypot(Math.max(geo.fx, or.width - geo.fx), or.height - geo.fy) + 8;
    last = { R: -1, f: -1, t: -1, q: -1 };
  }

  function frame() {
    ticking = false;
    if (!geo) measure();
    var y = window.scrollY;

    // T02: купол летить у точку Подолу
    var t = clamp((y - geo.delivTop * 0.2) / (geo.delivTop * 0.8));
    if (t !== last.t) {
      last.t = t;
      if (t >= 1) {
        dome.style.opacity = '0'; pin.classList.add('on');
      } else {
        var e = smooth(t), sEnd = geo.pinW / geo.domeW;
        // по горизонталі: спершу тримається в правій третині (поза текстом), убік до точки — лише в другій половині польоту
        var cx0 = geo.domeLeft + geo.domeW / 2, hold = Math.max(cx0, innerWidth * 0.86);
        var cx = t < 0.55 ? cx0 + (hold - cx0) * smooth(t / 0.55) : hold + (geo.pinX - hold) * smooth((t - 0.55) / 0.45);
        var dx = cx - cx0;
        var dy = (geo.pinY - (geo.domeTop + geo.domeW / 2 - geo.delivTop)) * e;
        var s = 1 + (sEnd - 1) * outCubic(Math.min(1, t * 1.25)); // спершу стискається, потім летить
        dome.style.transform = t === 0 ? 'none' : 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) scale(' + s.toFixed(4) + ')';
        dome.style.opacity = '1'; pin.classList.remove('on');
      }
      // підпис і абзац гаснуть, коли купол над ними пролітає: підпис — на старті польоту, абзац — коли підходить до верху екрана
      genNote.style.opacity = String(Math.round((1 - clamp(t / 0.2)) * 100) / 100);
      lede.style.opacity = String(Math.round(clamp((geo.ledeTop - y - innerHeight * 0.1) / (innerHeight * 0.2)) * 100) / 100);
    }

    // акварель від Подолу
    var p = clamp((y - geo.delivTop) / geo.run);
    var R = Math.round(G.R_FULL * outCubic(clamp((p - 0.05) / 0.5)) * 2) / 2;
    if (R !== last.R) {
      last.R = R;
      for (var i = 0; i < washes.length; i++) washes[i].setAttribute('d', G.blob(G.PODIL[0], G.PODIL[1], R, i, N));
      for (var id in marks) {
        var m = marks[id], on = R >= m.d + 6;
        if (on !== m.on) { m.on = on; m.els.forEach(function (el) { el.classList.toggle('on', on); }); }
      }
    }

    // T06: винна заливка з тієї ж точки стає тлом бюджетів
    var f = clamp((p - 0.82) / 0.18);
    if (f !== last.f) {
      last.f = f;
      var r = geo.diag * smooth(f);
      flood.style.clipPath = 'circle(' + r.toFixed(1) + 'px at ' + geo.pinX.toFixed(1) + 'px ' + geo.pinY.toFixed(1) + 'px)';
      // заголовок бюджетів приходить разом із фарбою
      // розділ бюджетів наїжджає на кінець сцени й відкривається тим самим колом фарби — суми приходять разом із нею
      budget.style.clipPath = p >= 1 ? 'none' : 'circle(' + r.toFixed(1) + 'px at ' + geo.pinX.toFixed(1) + 'px ' +
        (geo.pinY - (geo.budgetTop - y)).toFixed(1) + 'px)';
      if (f > 0.9) swing();
      // текст сцени тихо гасне, поки коло фарби підходить, — у кадрі не лишається двох розділів одночасно
      var so = String(Math.round((1 - clamp((f - 0.15) / 0.3)) * 100) / 100);
      for (var k = 0; k < stageText.length; k++) stageText[k].style.opacity = so;
    }

    // пелюстки з «4» розростаються в тло замовлення
    var q = clamp((window.innerHeight * 1.05 - (geo.orderTop - y)) / (window.innerHeight * 0.85));
    if (q !== last.q) {
      last.q = q;
      var rr = q <= 0 ? 0 : geo.r0 * smooth(Math.min(1, q / 0.12)) + (geo.r1 - geo.r0) * smooth(q);
      paint.style.clipPath = 'circle(' + rr.toFixed(1) + 'px at ' + geo.fx.toFixed(1) + 'px ' + (geo.fy + geo.paintOff).toFixed(1) + 'px)';
    }
  }

  var ticking = false;
  function request() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', request, { passive: true });
  var rz;
  addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { geo = null; request(); }, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { geo = null; request(); });
  addEventListener('load', function () { geo = null; request(); });

  // ---- бирки гойдаються на шпагаті (від найбільшої до найменшої)
  var rail = document.getElementById('rail');
  var tags = Array.prototype.slice.call(rail.querySelectorAll('.tag'));
  var swung = !(rail.getBoundingClientRect().top > innerHeight && tags[0].animate);
  if (!swung) rail.classList.add('swing-ready');
  // бирки гойдаються, щойно фарба дійшла до сум (викликає frame)
  function swing() {
    if (swung) return; swung = true;
    var delays = [220, 180, 130, 70, 0];
    var spring = 'linear(0, 0.36 9%, 0.76 19%, 1.04 30%, 1.11 38%, 1.07 46%, 0.995 57%, 0.975 65%, 1.004 79%, 1)';
    tags.forEach(function (tag, i) {
      tag.animate([{ transform: 'rotate(-7deg)' }, { transform: 'rotate(0deg)' }],
        { duration: 900, delay: delays[i], easing: spring, fill: 'backwards' });
    });
    rail.classList.remove('swing-ready');
  }

  // листівка гойдається на тому ж шпагаті, що й бирки
  var card = document.getElementById('card');
  if (card.animate && card.getBoundingClientRect().top > innerHeight) {
    var cio = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      cio.disconnect();
      card.animate([{ transform: 'rotate(-9deg)' }, { transform: 'rotate(-2.5deg)' }],
        { duration: 900, easing: 'linear(0, 0.36 9%, 0.76 19%, 1.04 30%, 1.11 38%, 1.07 46%, 0.995 57%, 0.975 65%, 1.004 79%, 1)' });
    }, { rootMargin: '0px 0px -20% 0px' });
    cio.observe(card);
  }

  frame();
})();
