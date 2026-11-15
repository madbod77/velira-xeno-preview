/* Bloom.sis — рух «Година від Подолу». Без бібліотек: rAF + IntersectionObserver + WAAPI.
   Без JS і з reduced motion сторінка вже в кінцевому стані (циферблат повний у HTML). */
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
  if (!motion) return;

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function smooth(t) { return t * t * (3 - 2 * t); }
  function outCubic(t) { return 1 - Math.pow(1 - t, 3); }

  // ---- проява блоків (верх елемента на 0.80 висоти екрана, один раз)
  // спостерігачі нижче першого екрана — у простої (≤ 200 мс), щоб не додавати роботи до першого кадру
  function idle(fn) { if (window.requestIdleCallback) requestIdleCallback(fn, { timeout: 200 }); else setTimeout(fn, 60); }
  idle(function () {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
  });

  // ---- купол букета: фокус з розмиття
  var dome = document.getElementById('dome');
  var domeImg = dome.querySelector('img');
  var focused = false;
  function focusDome() { if (focused) return; focused = true; requestAnimationFrame(function () { dome.classList.add('in'); }); }
  if (domeImg.complete) focusDome(); else { domeImg.addEventListener('load', focusDome); setTimeout(focusDome, 900); }

  // ---- сцена доставки: купол → циферблат «година», дуга 0 → 60 хв, винятки, винна заливка з центру
  var deliv = document.getElementById('dostavka');
  var heroText = Array.prototype.slice.call(document.querySelectorAll('.hero .hero-copy .kicker, .hero h1, .hero .lede, .hero .cta-row'));
  var stageText = Array.prototype.slice.call(document.querySelectorAll('#stage .d-head, #stage .d-time, #stage .d-ex'));
  var genNote = document.querySelector('.dome-wrap .gen-note');
  var budget = document.getElementById('budget');
  var paint = document.getElementById('order-paint');
  var order = document.getElementById('order');
  var four = document.querySelector('.addr-n');
  var stage = document.getElementById('stage');
  var flood = document.getElementById('flood');
  var pin = document.getElementById('pin-dome');
  var dial = document.getElementById('dial');
  var arc = document.getElementById('d-arc');
  var CIRC = parseFloat(arc.getAttribute('data-c'));
  var ticks = Array.prototype.slice.call(dial.querySelectorAll('.tk'));
  var minEl = document.getElementById('dial-m');
  var glow = document.getElementById('dial-glow');
  var petalRing = document.getElementById('petals');
  var exs = Array.prototype.slice.call(document.querySelectorAll('#ex-list li'));
  var faceImg = pin.querySelector('img');
  var budgetHead = document.getElementById('budget-head');
  var rail = document.getElementById('rail');
  var SPRING = 'linear(0, 0.36 9%, 0.76 19%, 1.04 30%, 1.11 38%, 1.07 46%, 0.995 57%, 0.975 65%, 1.004 79%, 1)';
  stage.classList.add('live');
  d.classList.add('flight');

  var geo = null, last = { m: -1, a: -1, f: -1, t: -1, q: -1, ex: -1, k: -1 };
  function textBox(el) {
    var r = document.createRange(); r.selectNodeContents(el);
    var b = r.getBoundingClientRect();
    return { l: b.left, r: b.right, t: b.top + window.scrollY, b: b.bottom + window.scrollY };
  }
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
      diag: Math.hypot(Math.max(pinX, w - pinX), Math.max(pinY, h - pinY)) + 4,
      txt: heroText.map(textBox)
    };
    var or = order.getBoundingClientRect(), fr = four.getBoundingClientRect();
    geo.orderTop = or.top + window.scrollY;
    geo.budgetTop = budget.getBoundingClientRect().top + window.scrollY;
    var bh = budgetHead.getBoundingClientRect();
    geo.bh = { t: bh.top + window.scrollY, b: bh.bottom + window.scrollY, l: bh.left, r: bh.right };
    geo.railTop = rail.getBoundingClientRect().top + window.scrollY;
    geo.fx = fr.left + fr.width / 2 - or.left; geo.fy = fr.top + fr.height / 2 - or.top;
    geo.r0 = fr.width / 2;
    geo.paintOff = order.getBoundingClientRect().top - paint.getBoundingClientRect().top; // шар пелюсток виходить вгору до «4»
    geo.r1 = Math.hypot(Math.max(geo.fx, or.width - geo.fx), or.height - geo.fy) + 8;
    last = { m: -1, a: -1, f: -1, t: -1, q: -1, ex: -1, k: -1 };
  }

  function frame() {
    ticking = false;
    if (!geo) measure();
    var y = window.scrollY;

    // T02: купол першого екрана стає циферблатом — сідає в його центр
    var t = clamp((y - geo.delivTop * 0.2) / (geo.delivTop * 0.8));
    if (t !== last.t) {
      last.t = t;
      var cx0 = geo.domeLeft + geo.domeW / 2, cx = cx0, cy = geo.domeTop + geo.domeW / 2 - y, rad = geo.domeW / 2;
      if (t >= 1) {
        dome.style.opacity = '0'; pin.classList.add('on'); rad = 0;
      } else {
        var e = smooth(t), sEnd = geo.pinW / geo.domeW;
        cx = cx0 + (geo.pinX - cx0) * e;
        var dy = (geo.pinY - (geo.domeTop + geo.domeW / 2 - geo.delivTop)) * e;
        var s = 1 + (sEnd - 1) * outCubic(Math.min(1, t * 1.3)); // спершу стискається, потім сідає
        dome.style.transform = t === 0 ? 'none' : 'translate3d(' + (cx - cx0).toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) scale(' + s.toFixed(4) + ')';
        dome.style.opacity = '1'; pin.classList.remove('on');
        cy += dy; rad *= s;
      }
      genNote.style.opacity = String(Math.round((1 - clamp(t / 0.2)) * 100) / 100);
      // текст першого екрана гасне лише там, де купол над ним пролітає (на ПК шляхи не перетинаються)
      for (var j = 0; j < heroText.length; j++) {
        var b = geo.txt[j], o = 1;
        if (t > 0 && rad > 0 && b.r > cx - rad + 6 && b.l < cx + rad - 6) {
          var gap = Math.max(b.t - y - (cy + rad), (cy - rad) - (b.b - y), 0);
          o = clamp(gap / 56);
        }
        heroText[j].style.opacity = o === 1 ? '' : String(Math.round(o * 100) / 100);
      }
    }

    // дуга години: 0 → 60 хв, щойно сцена стала
    var p = clamp((y - geo.delivTop) / geo.run);
    var a = Math.round(smooth(clamp((p - 0.03) / 0.27)) * 1000) / 1000;
    if (a !== last.a) {
      last.a = a;
      arc.setAttribute('stroke-dashoffset', (CIRC * (1 - a)).toFixed(1));
      faceImg.style.transform = 'scale(1.12) rotate(' + (a * 8).toFixed(2) + 'deg)'; // букет «заводиться», як ручка таймера
      petalRing.setAttribute('transform', 'rotate(' + (-24 * (1 - a)).toFixed(2) + ' 200 200)'); // віночок розкручується спіраллю, поки розкривається
      dial.classList.toggle('zero', a === 0);
      var m = Math.round(a * 60);
      if (m !== last.m) {
        last.m = m; minEl.textContent = String(m);
        for (var i = 0; i < 60; i++) { var on = i < m; if (ticks[i]._on !== on) { ticks[i]._on = on; ticks[i].classList.toggle('on', on); } }
      }
    }
    // година замкнулась: крафтове кільце розходиться від віночка (scrub, щоб його ловила будь-яка зупинка прокрутки)
    var k = clamp((p - 0.30) / 0.1);
    if (k !== last.k) {
      last.k = k;
      glow.style.opacity = k <= 0 || k >= 1 ? '0' : String(Math.round((k < 0.15 ? k / 0.15 * 0.9 : 0.9 - 0.9 * smooth((k - 0.15) / 0.85)) * 100) / 100);
      glow.style.transform = 'scale(' + (1 + 0.5 * smooth(k)).toFixed(3) + ')';
    }
    // година замкнулась — п'ять винятків по черзі отримують позначку «не 200 грн»
    var exOn = p < 0.33 ? 0 : Math.min(5, 1 + Math.floor((p - 0.33) / 0.016));
    if (exOn !== last.ex) {
      last.ex = exOn;
      for (var k = 0; k < exs.length; k++) {
        var was = exs[k].classList.contains('on'), now = k < exOn;
        if (was === now) continue;
        exs[k].classList.toggle('on', now);
        if (now && exs[k].animate) exs[k].animate([{ transform: 'scale(.94)' }, { transform: 'scale(1)' }], { duration: 520, easing: SPRING });
      }
    }

    // T06: винна заливка з центру циферблата стає тлом бюджетів; закінчується раніше, ніж заголовок бюджетів доходить до 0.8 екрана
    var f = clamp((p - 0.58) / 0.14);
    if (f !== last.f) {
      last.f = f;
      var r = geo.diag * smooth(f);
      flood.style.clipPath = 'circle(' + r.toFixed(1) + 'px at ' + geo.pinX.toFixed(1) + 'px ' + geo.pinY.toFixed(1) + 'px)';
      // розділ бюджетів наїжджає на кінець сцени й відкривається тим самим колом фарби — суми приходять разом із нею
      budget.style.clipPath = f >= 1 ? 'none' : 'circle(' + r.toFixed(1) + 'px at ' + geo.pinX.toFixed(1) + 'px ' +
        (geo.pinY - (geo.budgetTop - y)).toFixed(1) + 'px)';
      // заголовок бюджетів з'являється, лише коли коло фарби вже накрило його цілком (без обрізаних слів)
      if (f >= 1) budgetHead.style.opacity = '';
      else {
        // видима частина заголовка (обрізана краями екрана) має бути вже під фарбою
        var cxv = geo.pinX, cyv = geo.pinY;
        var ht = Math.max(0, geo.bh.t - y), hbm = Math.min(innerHeight, geo.bh.b - y), hl = Math.max(0, geo.bh.l), hr = Math.min(innerWidth, geo.bh.r);
        var far = hbm <= ht ? 0 : Math.hypot(Math.max(Math.abs(hl - cxv), Math.abs(hr - cxv)), Math.max(Math.abs(ht - cyv), Math.abs(hbm - cyv)));
        budgetHead.style.opacity = String(Math.round(clamp((r - far) / 90) * 100) / 100);
      }
      stage.classList.toggle('flooded', f > 0.3); // циферблат лишається медальйоном над вином, поки бюджети не наїдуть на нього
      var so = String(Math.round((1 - clamp((f - 0.15) / 0.3)) * 100) / 100);
      for (var n = 0; n < stageText.length; n++) stageText[n].style.opacity = so;
    }

    // бирки гойдаються, щойно шпагат доходить до 0.8 екрана (уже на винному тлі)
    if (!swung && y + innerHeight * 0.8 > geo.railTop) swing();

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
  if (card.animate) idle(function () {
    if (card.getBoundingClientRect().top <= innerHeight) return;
    var cio = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      cio.disconnect();
      card.animate([{ transform: 'rotate(-9deg)' }, { transform: 'rotate(-2.5deg)' }],
        { duration: 900, easing: 'linear(0, 0.36 9%, 0.76 19%, 1.04 30%, 1.11 38%, 1.07 46%, 0.995 57%, 0.975 65%, 1.004 79%, 1)' });
    }, { rootMargin: '0px 0px -20% 0px' });
    cio.observe(card);
  });

  frame();
})();
