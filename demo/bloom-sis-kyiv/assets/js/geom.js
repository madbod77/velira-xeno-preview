/* Bloom.sis — геометрія схеми Києва й акварелі (спільна для збірки й браузера). Схема, не в масштабі. */
(function (root) {
  'use strict';
  var TAU = Math.PI * 2;
  var PODIL = [490, 300];
  var CITY = [[430, 62], [560, 40], [700, 92], [836, 172], [902, 300], [880, 450], [912, 600], [862, 762], [798, 902],
    [652, 952], [520, 930], [398, 880], [300, 818], [226, 700], [236, 560], [206, 430], [252, 298], [322, 170]];
  var RIVER = [[612, -20], [598, 140], [548, 292], [560, 420], [608, 560], [648, 700], [700, 850], [736, 1020]];
  // місця-винятки (порядок — від Подолу назовні); inCity — дірка в акварелі; outside — за межею міста
  var EXCEPT = [
    { id: 'bykivnia', name: 'Биківня', x: 792, y: 332, inCity: true },
    { id: 'petropavlivska', name: 'Петропавлівська Борщагівка', x: 122, y: 468, inCity: false },
    { id: 'zhuliany', name: 'Жуляни', x: 362, y: 722, inCity: true },
    { id: 'sofiivska', name: 'Софіївська Борщагівка', x: 142, y: 618, inCity: false },
    { id: 'bortnychi', name: 'Бортничі', x: 782, y: 822, inCity: true }
  ];
  var R_FULL = 820;
  var LAYERS = [
    { a: [0.07, 0.045, 0.025, 0.012], f: [3, 5, 8, 13], ph: [0.3, 1.7, 2.9, 4.1], k: 1.0 },
    { a: [0.085, 0.05, 0.03, 0.015], f: [2, 4, 7, 11], ph: [2.1, 0.4, 3.3, 5.2], k: 0.9 },
    { a: [0.06, 0.06, 0.035, 0.02], f: [3, 6, 9, 14], ph: [4.4, 2.6, 0.8, 1.9], k: 0.78 }
  ];

  function f1(v) { return Math.round(v * 10) / 10; }

  function closed(pts) {
    var n = pts.length, d = 'M' + f1(pts[0][0]) + ' ' + f1(pts[0][1]);
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += 'C' + f1(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f1(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
        f1(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f1(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f1(p2[0]) + ' ' + f1(p2[1]);
    }
    return d + 'Z';
  }

  function open(pts) {
    var n = pts.length, d = 'M' + f1(pts[0][0]) + ' ' + f1(pts[0][1]);
    for (var i = 0; i < n - 1; i++) {
      var p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)];
      d += 'C' + f1(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f1(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
        f1(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f1(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f1(p2[0]) + ' ' + f1(p2[1]);
    }
    return d;
  }

  // акварельна пляма: r(θ) = R·k·(1 + Σ a·sin(fθ + φ + зсув від R)) — край «дихає», поки фарба розтікається
  function blob(cx, cy, R, li, N) {
    if (R <= 0.5) return 'M' + cx + ' ' + cy + 'Z';
    var L = LAYERS[li], pts = [], w = R / 700;
    for (var i = 0; i < N; i++) {
      var t = i / N * TAU, m = 1;
      for (var j = 0; j < 4; j++) m += L.a[j] * Math.sin(L.f[j] * t + L.ph[j] + w * (j + 1) * 1.3);
      var r = R * L.k * m;
      pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
    }
    return closed(pts);
  }

  // смуга річки: осьова лінія ± півширина
  function riverBand() {
    var left = [], right = [];
    for (var i = 0; i < RIVER.length; i++) {
      var p = RIVER[i], q = RIVER[Math.min(RIVER.length - 1, i + 1)], o = RIVER[Math.max(0, i - 1)];
      var dx = q[0] - o[0], dy = q[1] - o[1], len = Math.hypot(dx, dy) || 1;
      var hw = 20 + i * 3.2, nx = -dy / len * hw, ny = dx / len * hw;
      left.push([p[0] + nx, p[1] + ny]); right.unshift([p[0] - nx, p[1] - ny]);
    }
    return { band: open(left).replace(/^M/, 'M') + 'L' + f1(right[0][0]) + ' ' + f1(right[0][1]) + open(right).replace(/^M[^C]*/, '') + 'Z',
      left: open(left), right: open(right.slice().reverse()) };
  }

  function dist(e) { return Math.hypot(e.x - PODIL[0], e.y - PODIL[1]); }

  var api = { PODIL: PODIL, CITY: CITY, EXCEPT: EXCEPT, R_FULL: R_FULL, blob: blob, closed: closed,
    cityPath: function () { return closed(CITY); }, riverBand: riverBand, dist: dist };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.BloomGeom = api;
})(this);
