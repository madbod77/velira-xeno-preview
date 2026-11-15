/* «Лінії випрямляються» — цикл 2: справжній матеріал. Капот — згенероване фото (чорний лак під п'ятьма лінійними
   лампами); canvas 2D (власний код Velira) малює його смугами: праворуч від полірувального круга смуги зсунуті
   «апельсиновою шкіркою» й притуплені, з павутинкою подряпин; ліворуч, де круг уже пройшов, — чисте дзеркало.
   На прокрутці фото гасне, а ті самі п'ять відблисків (виміряні з фото) відриваються й лягають у п'ять шарів кузова.
   Стан: u — прохід круга 0..1, g — відблиск 0..1, q — передача в шари 0..1. */
(function () {
  'use strict';
  var cv = document.getElementById('hood');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var W = 0, H = 0, dpr = 1, phone = false;
  var S = { u: 0, g: 0, q: 0, polished: false, ready: false };
  var visible = true, queued = false, readyCbs = [];
  var LINES = 5, SAMPLES = 120;
  var arcs = [];
  var img = new Image();
  var R = { x: 0, y: 0, w: 1, h: 1 };          // де лежить фото на полотні (CSS-пікселі)

  // відблиски ламп, виміряні з фото (x через кожні 128 з 1536 px, y у частках висоти 1024)
  var PROF = [
    [368, 375, 387, 393, 400, 410, 422, 436, 451, 472, 495, 524, 556],
    [438, 440, 443, 447, 451, 457, 465, 475, 486, 501, 520, 544, 574],
    [529, 526, 523, 524, 524, 529, 531, 535, 539, 548, 558, 574, 594],
    [675, 663, 651, 641, 632, 625, 623, 619, 617, 616, 618, 622, 630],
    [869, 848, 826, 807, 789, 772, 756, 742, 730, 717, 705, 693, 685]
  ];

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function smooth(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function rnd(n) { var x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  // «апельсинова шкірка»: великі хвилі + дрібна рябь
  function wobble(x) {
    var f = phone ? .45 : 1;   // на вузькому екрані хвиля ширша — шкірка, а не зигзаг
    return Math.sin(x * 9.7 * f) * .5 + Math.sin(x * 23.1 * f + 1.7) * .3 + Math.sin(x * 47 * f + .4) * .2;
  }
  // y відблиску i (у CSS-пікселях полотна) у точці екрана x
  function yPhoto(xs, i) {
    var u = clamp((xs - R.x) / R.w, 0, 1) * 12, k = Math.min(11, Math.floor(u)), f = u - k, p = PROF[i];
    return R.y + R.h * ((p[k] + (p[k + 1] - p[k]) * f) / 1024);
  }
  function yLayer(i) { return (.24 + .12 * i) * H; }

  function layout() {
    var s;
    if (phone) {
      s = Math.max(H * .72 / 1024, W * 1.9 / 1536);
      R.w = 1536 * s; R.h = 1024 * s;
      R.x = W * .5 - .36 * R.w; R.y = H * .115 - .36 * R.h;
    } else {
      s = Math.max(W / 1536, 1.25 * H / 1024);
      R.w = 1536 * s; R.h = 1024 * s;
      R.x = (W - R.w) * .5; R.y = -.2 * R.h;
    }
  }

  function buildArcs() {
    arcs = [];
    var spots = [[.2, 1], [.42, 2], [.62, 3], [.8, 1], [.33, 4]];
    var n = phone ? 70 : 150, m = Math.min(W, H);
    for (var k = 0; k < n; k++) {
      var s = spots[k % spots.length];
      arcs.push({ hx: s[0], li: s[1], r: (8 + Math.pow(rnd(k + 1), 1.6) * .28 * m), a: rnd(k + 7) * Math.PI * 2,
        span: .18 + rnd(k + 13) * .6, al: .1 + rnd(k + 19) * .14 });
    }
  }

  function resize() {
    var r = cv.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, r.width); H = Math.max(1, r.height); phone = W < 640;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    layout(); buildArcs(); draw();
  }

  function front() { return -.14 + 1.3 * S.u; }
  function polishAt(xn) { return S.polished ? 1 : 1 - smooth(front() - .14, front() + .015, xn); }
  function padPos() {
    var x = front(), xs = clamp(x, 0, 1) * W;
    return [x * W, (yPhoto(xs, 2) + yPhoto(xs, 3)) / 2];
  }

  function drawPlate(alpha) {
    if (!S.ready || alpha <= .002) return;
    // смуги рахуються в пікселях пристрою: ціла ширина, без перекриття й без альфи на смузі — інакше «штрих-код»
    var NW = img.naturalWidth, NH = img.naturalHeight, sxD = NW / (R.w * dpr);
    var RX = R.x * dpr, RY = R.y * dpr, RH = R.h * dpr, WD = cv.width;
    var amp = (phone ? .011 : .014) * H * dpr;
    var fx = S.polished ? 2 : front() - .16;
    var cut = Math.round(clamp(fx, 0, 1) * WD);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = alpha;
    if (cut > 0) ctx.drawImage(img, -RX * sxD, 0, Math.min(cut * sxD, NW + RX * sxD), NH, 0, RY, cut, RH);
    if (cut < WD) {
      var step = dpr > 1.5 ? 3 : 2;
      for (var x = cut; x < WD; x += step) {
        var w = Math.min(step, WD - x), xn = (x + w / 2) / WD, d = 1 - polishAt(xn);
        var srx = (x - RX) * sxD, sw = Math.min(w * sxD, NW - srx);
        if (sw > .5) ctx.drawImage(img, srx, 0, sw, NH, x, Math.round(RY + wobble(xn) * amp * d), w, RH);
      }
      // недополірований лак — тьмяніший і з молочною імлою; одна заливка поверх смуг
      var x0 = cut, dim = ctx.createLinearGradient(x0, 0, WD, 0), hz = ctx.createLinearGradient(x0, 0, WD, 0);
      for (var k = 0; k <= 8; k++) {
        var xk = x0 + (WD - x0) * k / 8, dk = 1 - polishAt(xk / WD);
        dim.addColorStop(k / 8, 'rgba(6,7,8,' + (.34 * dk * alpha).toFixed(3) + ')');
        hz.addColorStop(k / 8, 'rgba(160,165,175,' + (.035 * dk * alpha).toFixed(3) + ')');
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = dim; ctx.fillRect(x0, 0, WD - x0, cv.height);
      ctx.fillStyle = hz; ctx.fillRect(x0, Math.max(0, RY), WD - x0, RH);
    }
    ctx.globalAlpha = 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var bot = R.y + R.h;
    if (bot < H + 2) {
      var fg = ctx.createLinearGradient(0, bot - R.h * .28, 0, bot);
      fg.addColorStop(0, 'rgba(6,7,8,0)'); fg.addColorStop(1, 'rgba(6,7,8,' + alpha + ')');
      ctx.fillStyle = fg; ctx.fillRect(0, bot - R.h * .28, W, R.h * .28 + 1);
    }
  }

  function draw() {
    queued = false;
    if (!W) return;
    // лінії лягають у шари в першій половині передачі (q 0→0,55) — підписи з'являються вже на осілих лініях
    var q = ease(clamp(S.q / .55, 0, 1));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#060708'; ctx.fillRect(0, 0, W, H);
    drawPlate(1 - smooth(.05, .6, S.q));

    ctx.globalCompositeOperation = 'lighter';
    // павутинка подряпин навколо відблисків — лише там, де круг ще не пройшов
    if (q < 1 && !S.polished && S.ready) {
      ctx.lineWidth = .8;
      for (var k = 0; k < arcs.length; k++) {
        var A = arcs[k], cx = A.hx * W, cy = yPhoto(cx, A.li);
        var mid = A.a + A.span / 2, px = (cx + Math.cos(mid) * A.r) / W;
        var vis = (1 - polishAt(px)) * (1 - q) * A.al * (1 - A.r / (.3 * Math.min(W, H)));
        if (vis <= .004) continue;
        ctx.strokeStyle = 'rgba(235,240,245,' + vis.toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(cx, cy, A.r, A.a, A.a + A.span); ctx.stroke();
      }
    }

    // відблиск, що один раз пробігає вздовж кожної рівної лінії після проходу круга
    if (S.g > 0 && S.g < 1 && S.q < .3) {
      var delays = [0, .08, .14, .2, .26];
      for (var i = 0; i < LINES; i++) {
        var t = clamp((S.g - delays[i]) / .7, 0, 1);
        if (t <= 0 || t >= 1) continue;
        var gx = t * W, gy = yPhoto(gx, i), gR = phone ? 46 : 90;
        var gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, gR), ga = Math.sin(Math.PI * t) * .85 * (1 - S.q / .3);
        gr.addColorStop(0, 'rgba(255,255,255,' + ga.toFixed(3) + ')');
        gr.addColorStop(.22, 'rgba(255,220,190,' + (ga * .32).toFixed(3) + ')');
        gr.addColorStop(1, 'rgba(255,220,190,0)');
        ctx.fillStyle = gr; ctx.fillRect(gx - gR, gy - gR, gR * 2, gR * 2);
      }
    }

    // передача: ті самі відблиски відриваються від фото й лягають у шари
    var la = smooth(.02, .16, S.q);
    if (la > 0) {
      for (var j = 0; j < LINES; j++) {
        var pts = [];
        for (var n = 0; n <= SAMPLES; n++) {
          var xx = W * n / SAMPLES;
          pts.push([xx, yPhoto(xx, j) * (1 - q) + yLayer(j) * q]);
        }
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.strokeStyle = 'rgba(255,255,255,' + (.06 * la).toFixed(3) + ')'; ctx.lineWidth = 7;
        ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
        for (var h = 1; h < pts.length; h++) ctx.lineTo(pts[h][0], pts[h][1]);
        ctx.stroke();
        var lg = ctx.createLinearGradient(0, 0, W, 0);
        var ea = (.95 - .35 * q) * la;
        lg.addColorStop(0, 'rgba(255,255,255,' + (ea * (.35 + .65 * q)).toFixed(3) + ')');
        lg.addColorStop(.5, 'rgba(255,255,255,' + ea.toFixed(3) + ')');
        lg.addColorStop(1, 'rgba(255,255,255,' + (ea * (.35 + .4 * q)).toFixed(3) + ')');
        ctx.strokeStyle = lg; ctx.lineWidth = (phone ? 2 : 2.6) * (1 - q) + 1.1 * q;
        ctx.stroke();
      }
      if (!phone && q > .02) {
        ctx.globalCompositeOperation = 'source-over';
        for (var b = 0; b < LINES; b++) {
          ctx.fillStyle = 'rgba(255,107,31,' + (q * .9).toFixed(3) + ')';
          ctx.fillRect(Math.max(16, W * .028) - 1, yLayer(b) - 1, 10 * q, 2);
        }
      }
    }
    ctx.globalCompositeOperation = 'source-over';

    // полірувальний круг
    if (!S.polished && S.ready && S.u > 0 && S.u < 1 && S.q < .05) {
      var p = padPos(), Rr = (phone ? .15 : .066) * W, PX = p[0], PY = p[1];
      var glow = ctx.createRadialGradient(PX, PY, Rr * .6, PX, PY, Rr * 2.4);
      glow.addColorStop(0, 'rgba(255,120,50,.2)'); glow.addColorStop(1, 'rgba(255,120,50,0)');
      ctx.fillStyle = glow; ctx.fillRect(PX - Rr * 2.5, PY - Rr * 2.5, Rr * 5, Rr * 5);
      var sh = ctx.createRadialGradient(PX + Rr * .2, PY + Rr * .32, Rr * .2, PX + Rr * .2, PY + Rr * .32, Rr * 1.4);
      sh.addColorStop(0, 'rgba(0,0,0,.7)'); sh.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sh; ctx.beginPath(); ctx.arc(PX + Rr * .2, PY + Rr * .32, Rr * 1.4, 0, Math.PI * 2); ctx.fill();
      // обідок-підкладка: помаранчевий лак з бліком
      var rim = ctx.createLinearGradient(PX, PY - Rr, PX, PY + Rr);
      rim.addColorStop(0, '#ff9a5e'); rim.addColorStop(.45, '#ff6b1f'); rim.addColorStop(1, '#c84a0a');
      ctx.fillStyle = rim; ctx.beginPath(); ctx.arc(PX, PY, Rr, 0, Math.PI * 2); ctx.fill();
      var foam = ctx.createRadialGradient(PX - Rr * .2, PY - Rr * .25, 0, PX, PY, Rr * .9);
      foam.addColorStop(0, '#3a3c40'); foam.addColorStop(.18, '#2c2e32'); foam.addColorStop(.2, '#1b1c1f');
      foam.addColorStop(.46, '#26282c'); foam.addColorStop(.5, '#17181a'); foam.addColorStop(.74, '#232528');
      foam.addColorStop(.78, '#141517'); foam.addColorStop(1, '#202226');
      ctx.fillStyle = foam; ctx.beginPath(); ctx.arc(PX, PY, Rr * .88, 0, Math.PI * 2); ctx.fill();
      if (ctx.createConicGradient) {
        var cg = ctx.createConicGradient(S.u * 40, PX, PY);
        for (var c = 0; c <= 12; c++) cg.addColorStop(c / 12, c % 2 ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,.08)');
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(PX, PY, Rr * .88, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = '#0e0f10'; ctx.beginPath(); ctx.arc(PX, PY, Rr * .1, 0, Math.PI * 2); ctx.fill();
    }
  }

  function request() { if (!queued && visible) { queued = true; requestAnimationFrame(draw); } }

  window.Hood = {
    state: S,
    request: request,
    setQ: function (q) { if (Math.abs(q - S.q) > .0005) { S.q = q; request(); } },
    polish: function () { S.polished = true; S.u = 1; S.g = 1; request(); },
    onReady: function (cb) { if (S.ready) cb(); else readyCbs.push(cb); }
  };

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; if (visible) request(); }).observe(cv);
  }
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 120); });
  img.decoding = 'async';
  img.onload = function () {
    S.ready = true; cv.classList.add('is-ready'); draw();
    readyCbs.splice(0).forEach(function (cb) { cb(); });
  };
  img.onerror = function () { readyCbs.splice(0).forEach(function (cb) { cb(); }); };
  img.src = cv.getAttribute('data-plate');
  resize();
})();
