/* «Лінії випрямляються» — капот під шістьма лінійними лампами боксу (canvas 2D, власний код Velira).
   Стан: u — прохід полірувального круга 0..1, g — відблиск 0..1, q — передача в шари на прокрутці 0..1. */
(function () {
  'use strict';
  var cv = document.getElementById('hood');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var W = 0, H = 0, dpr = 1, phone = false;
  var S = { u: 0, g: 0, q: 0, polished: false };
  var visible = true, queued = false;
  var LINES = 6, SAMPLES = 96;
  var arcs = [];

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function smooth(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function ease(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  // детермінований шум (без Math.random — однаковий кадр при кожному завантаженні)
  function rnd(n) { var x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  function wobble(x, i) {
    return Math.sin(x * 9.7 + i * 3.1) * .55 + Math.sin(x * 23.1 + i * 1.7) * .3 + Math.sin(x * 47.3 + i * 5.3) * .15;
  }
  function gapAt(x, i) { var n = Math.sin(x * 9.1 + i * 2.3) + Math.sin(x * 23.7 + i * 4.1) * .6; return n > .95 ? .9 : n > .7 ? .5 : 0; }

  // відблиск лампи i у вигнутому капоті: лінії сходяться праворуч угору (перспектива), легкий прогин
  // ПК: капот на всю висоту — лінії лежать пологими зліва й пірнають праворуч униз (кривизна капота), перетинаючи
  // ребро-штамповку, на якій кожна лінія ламається; телефон: пологий віял над текстом
  function crease(y) { return .6 + .16 * y; }
  function yRef(x, i) {
    if (phone) {
      var a0 = .135 + .05 * i, a1 = .07 + .026 * i;
      return a0 + (a1 - a0) * x + .028 * (1 - (2 * x - 1) * (2 * x - 1)) * (1 + i * .15);
    }
    var y0 = .11 + .043 * i, y1 = .3 + .105 * i;
    var b = y0 + (y1 - y0) * Math.pow(clamp(x, 0, 1.1), 2.1);
    var xc = crease(b);
    return b + .022 * (1 + i * .1) * smooth(xc - .015, xc + .04, x);
  }
  function yLayer(i) { return .24 + .12 * i; }
  function thick(i) { return (phone ? 2.2 : 3.2) - i * .32; }

  function buildArcs() {
    arcs = [];
    var spots = phone ? [[.30, 1], [.52, 2], [.70, 4]] : [[.26, 1], [.48, 2], [.74, 4]];
    var n = phone ? 60 : 140, m = Math.min(W, H);
    for (var k = 0; k < n; k++) {
      var s = spots[k % spots.length];
      arcs.push({ hx: s[0], li: s[1], r: (8 + Math.pow(rnd(k + 1), 1.6) * .3 * m), a: rnd(k + 7) * Math.PI * 2,
        span: .18 + rnd(k + 13) * .6, al: .12 + rnd(k + 19) * .16 });
    }
  }

  function resize() {
    var r = cv.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, r.width); H = Math.max(1, r.height); phone = W < 640;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    buildArcs(); draw();
  }

  function polishAt(xn) {
    if (S.polished) return 1;
    var front = -.14 + 1.3 * S.u;
    return 1 - smooth(front - .14, front + .015, xn);
  }
  function padPos() {
    var x = -.14 + 1.3 * S.u;
    var y = phone ? .26 + .05 * Math.sin(Math.PI * 1.3 * S.u + .4) : (yRef(clamp(x, 0, 1), 2) + yRef(clamp(x, 0, 1), 3)) / 2;
    return [x, y];
  }

  function draw() {
    queued = false;
    if (!W) return;
    var q = ease(clamp(S.q, 0, 1));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    // лак: широкий м'який полиск капота
    var sheen = ctx.createRadialGradient(W * .72, H * .1, 0, W * .72, H * .1, Math.max(W, H) * .7);
    sheen.addColorStop(0, 'rgba(255,255,255,' + (.055 * (1 - q)) + ')');
    sheen.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sheen; ctx.fillRect(0, 0, W, H);
    if (!phone && q < 1) {
      // м'який полиск уздовж капота і ребро-штамповка
      var lum = ctx.createRadialGradient(W * .74, H * .52, 0, W * .74, H * .52, W * .55);
      lum.addColorStop(0, 'rgba(255,255,255,' + (.045 * (1 - q)) + ')'); lum.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = lum; ctx.fillRect(0, 0, W, H);
      var cg = ctx.createLinearGradient(0, 0, 0, H);
      cg.addColorStop(0, 'rgba(255,255,255,0)'); cg.addColorStop(.35, 'rgba(255,255,255,' + (.2 * (1 - q)) + ')');
      cg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = cg; ctx.lineWidth = 1.2; ctx.beginPath();
      for (var cy = 0; cy <= 1.0001; cy += .05) { var cx0 = crease(cy) * W; if (cy === 0) ctx.moveTo(cx0, 0); else ctx.lineTo(cx0, cy * H); }
      ctx.stroke();
    }

    ctx.globalCompositeOperation = 'lighter';
    // павутинка — кругові подряпини навколо яскравих місць
    if (q < 1) {
      ctx.lineWidth = .8;
      for (var k = 0; k < arcs.length; k++) {
        var A = arcs[k];
        var cx = A.hx * W, cy = yRef(A.hx, A.li) * H;
        var mid = A.a + A.span / 2, px = (cx + Math.cos(mid) * A.r) / W;
        var vis = (1 - polishAt(px)) * (1 - q) * A.al * (1 - A.r / (.34 * Math.min(W, H)));
        if (vis <= .004) continue;
        ctx.strokeStyle = 'rgba(235,240,245,' + vis.toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(cx, cy, A.r, A.a, A.a + A.span); ctx.stroke();
      }
    }
    // лінії ламп
    var amp = (phone ? .022 : .018) * H;
    for (var i = 0; i < LINES; i++) {
      var prevX = 0, prevY = 0;
      var lw = thick(i) * (1 - q) + 1.3 * q;
      var pts = [];
      for (var jj = 0; jj <= SAMPLES; jj++) {
        var xg = -.02 + 1.04 * jj / SAMPLES, dg = (1 - polishAt(xg)) * (1 - q);
        pts.push([xg * W, (yRef(xg, i) * (1 - q) + yLayer(i) * q) * H + wobble(xg, i) * amp * dg, dg]);
      }
      // ореол одним шляхом: у дефектному стані — розсіяна імла, у рівному — тонке сяйво
      var hz = 0; for (var h = 0; h < pts.length; h++) hz += pts[h][2]; hz /= pts.length;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(255,255,255,' + ((.045 + .035 * hz) * (1 - i * .08) * (1 - .5 * q)).toFixed(3) + ')';
      ctx.lineWidth = lw * (3 + 5 * hz);
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (var h2 = 1; h2 < pts.length; h2++) ctx.lineTo(pts[h2][0], pts[h2][1]);
      ctx.stroke();
      ctx.lineCap = 'butt';
      for (var j = 0; j <= SAMPLES; j++) {
        var xn = -.02 + 1.04 * j / SAMPLES;
        var s = polishAt(xn);
        var defect = (1 - s) * (1 - q);
        var y = pts[j][1];
        var X = pts[j][0];
        if (j > 0) {
          var fade = q > 0 ? (1 - q) * Math.sin(Math.PI * clamp(xn, 0, 1)) + q * .62 : Math.sin(Math.PI * clamp(xn, 0, 1));
          var a = (.25 + .75 * fade) * (1 - gapAt(xn, i) * defect) * (1 - i * .07);
          ctx.strokeStyle = 'rgba(255,255,255,' + (a * (.95 - .1 * defect)).toFixed(3) + ')';
          ctx.lineWidth = lw * (1 - .3 * defect);
          ctx.beginPath(); ctx.moveTo(prevX, prevY); ctx.lineTo(X, y); ctx.stroke();
        }
        prevX = X; prevY = y;
      }
      // відблиск, що пробігає вздовж рівної лінії
      if (S.g > 0 && S.g < 1 && q < .5) {
        var delays = [0, .1, .15, .23, .28, .38];
        var t = clamp((S.g - delays[i]) / .62, 0, 1);
        if (t > 0 && t < 1) {
          var gx = t * W, gy = (yRef(t, i) * (1 - q) + yLayer(i) * q) * H;
          var gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, phone ? 40 : 70);
          var ga = Math.sin(Math.PI * t) * .9;
          gr.addColorStop(0, 'rgba(255,255,255,' + ga.toFixed(3) + ')');
          gr.addColorStop(.25, 'rgba(255,214,180,' + (ga * .35).toFixed(3) + ')');
          gr.addColorStop(1, 'rgba(255,214,180,0)');
          ctx.fillStyle = gr; ctx.fillRect(gx - 80, gy - 80, 160, 160);
        }
      }
    }
    // шари: помаранчева мітка на кожній межі при передачі
    if (q > .02 && !phone) {
      ctx.globalCompositeOperation = 'source-over';
      for (var b = 0; b < LINES; b++) {
        ctx.fillStyle = 'rgba(255,107,31,' + (q * .9).toFixed(3) + ')';
        var by = yLayer(b) * H;
        ctx.fillRect(phone ? 16 : Math.max(16, W * .028) - 1, by - 1, 10 * q, 2);
      }
    }
    ctx.globalCompositeOperation = 'source-over';
    // полірувальний круг
    if (!S.polished && S.u > 0 && S.u < 1 && q < .05) {
      var p = padPos(), R = (phone ? .13 : .062) * W, PX = p[0] * W, PY = p[1] * H;
      var glow = ctx.createRadialGradient(PX, PY, R * .6, PX, PY, R * 2.2);
      glow.addColorStop(0, 'rgba(255,107,31,.22)'); glow.addColorStop(1, 'rgba(255,107,31,0)');
      ctx.fillStyle = glow; ctx.fillRect(PX - R * 2.5, PY - R * 2.5, R * 5, R * 5);
      // тінь контакту під переднім краєм
      var sh = ctx.createRadialGradient(PX + R * .18, PY + R * .28, R * .2, PX + R * .18, PY + R * .28, R * 1.35);
      sh.addColorStop(0, 'rgba(0,0,0,.6)'); sh.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sh; ctx.beginPath(); ctx.arc(PX + R * .18, PY + R * .28, R * 1.35, 0, Math.PI * 2); ctx.fill();
      // помаранчева підкладка-диск (видно обідком) і поролон з концентричними смугами
      ctx.fillStyle = '#ff6b1f'; ctx.beginPath(); ctx.arc(PX, PY, R, 0, Math.PI * 2); ctx.fill();
      var foam = ctx.createRadialGradient(PX - R * .2, PY - R * .25, 0, PX, PY, R * .9);
      foam.addColorStop(0, '#3a3c40'); foam.addColorStop(.18, '#2c2e32'); foam.addColorStop(.2, '#1b1c1f');
      foam.addColorStop(.46, '#26282c'); foam.addColorStop(.5, '#17181a'); foam.addColorStop(.74, '#232528');
      foam.addColorStop(.78, '#141517'); foam.addColorStop(1, '#202226');
      ctx.fillStyle = foam; ctx.beginPath(); ctx.arc(PX, PY, R * .88, 0, Math.PI * 2); ctx.fill();
      // розмиття обертання: конічні промені крутяться з проходом
      if (ctx.createConicGradient) {
        var cgx = ctx.createConicGradient(S.u * 46, PX, PY);
        for (var c = 0; c <= 12; c++) cgx.addColorStop(c / 12, c % 2 ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,.09)');
        ctx.fillStyle = cgx; ctx.beginPath(); ctx.arc(PX, PY, R * .88, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = '#0e0f10'; ctx.beginPath(); ctx.arc(PX, PY, R * .1, 0, Math.PI * 2); ctx.fill();
    }
  }

  function request() { if (!queued && visible) { queued = true; requestAnimationFrame(draw); } }

  window.Hood = {
    state: S,
    request: request,
    setQ: function (q) { if (Math.abs(q - S.q) > .0005) { S.q = q; request(); } },
    polish: function () { S.polished = true; S.u = 1; S.g = 1; request(); }
  };

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; if (visible) request(); }).observe(cv);
  }
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 120); });
  resize();
})();
