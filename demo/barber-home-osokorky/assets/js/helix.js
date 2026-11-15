/* Helix ribbons on a cylinder — one geometry for a barber pole and a permed curl (Barber Home concept, Velira). */
(function () {
  'use strict';
  var TAU = Math.PI * 2;
  function hex(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  function shade(c, l, mix) { // l: light 0..1.3, mix: toward ink 0..1
    var r = c[0] * l, g = c[1] * l, b = c[2] * l;
    r = r * (1 - mix) + 11 * mix; g = g * (1 - mix) + 11 * mix; b = b * (1 - mix) + 12 * mix;
    return 'rgb(' + Math.min(255, r | 0) + ',' + Math.min(255, g | 0) + ',' + Math.min(255, b | 0) + ')';
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function smooth(a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function rr(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function Helix(canvas, opts) {
    this.c = canvas; this.ctx = canvas.getContext('2d'); this.mode = opts.mode || 'pole';
    this.cols = (opts.colors || []).map(hex); this.state = { k: 0, rot: 0, p: 0 };
    this.resize();
  }
  Helix.prototype.resize = function () {
    var r = this.c.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = Math.max(1, r.width); this.h = Math.max(1, r.height);
    this.c.width = Math.round(this.w * dpr); this.c.height = Math.round(this.h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  // draw one ribbon pass (back or front) for a helix
  // draw one pass (front or back hemisphere) as continuous polygons: each ribbon's angular interval is clipped
  // to the visible half of the cylinder, so edges stay smooth and nothing is sliced into bands
  Helix.prototype.ribbons = function (g, front) {
    var ctx = this.ctx, n = g.cols.length, N = g.samples, i, j, PI = Math.PI;
    var c = front ? 0 : PI, lo = c - PI / 2, hi = c + PI / 2, hb = g.bw / 2;
    for (i = 0; i < n; i++) {
      var phase = g.rot + i * TAU / n, col = g.cols[i];
      ctx.fillStyle = front ? shade(col, 1, 0) : shade(col, 0.55, g.backMix);
      var L = [], Rr = [];
      var flush = function () {
        if (L.length > 1) {
          ctx.beginPath(); ctx.moveTo(L[0][0], L[0][1]);
          for (var a = 1; a < L.length; a++) ctx.lineTo(L[a][0], L[a][1]);
          for (var b = Rr.length - 1; b >= 0; b--) ctx.lineTo(Rr[b][0], Rr[b][1]);
          ctx.closePath(); ctx.fill();
        }
        L = []; Rr = [];
      };
      for (j = 0; j <= N; j++) {
        var t = j / N, th = phase + g.turns * TAU * t;
        th = th - TAU * Math.round((th - c) / TAU);
        var a0 = Math.max(th - hb, lo), b0 = Math.min(th + hb, hi);
        if (a0 >= b0) { flush(); continue; }
        var y = g.top + (g.bot - g.top) * t, R = g.radius(t);
        L.push([g.cx + R * Math.sin(a0), y]); Rr.push([g.cx + R * Math.sin(b0), y]);
      }
      flush();
    }
  };
  Helix.prototype.drawPole = function () {
    var ctx = this.ctx, w = this.w, h = this.h, s = this.state, k = clamp(s.k, 0, 1.2);
    var R = Math.min(w * 0.38, h * 0.13), cx = w / 2, capH = R * 0.62, pad = 4;
    var top = pad + capH, bot = h - pad - capH;
    ctx.clearRect(0, 0, w, h);
    var n = this.cols.length, full = TAU / n;
    var g = { cols: this.cols, rot: s.rot, turns: 3.2 * s.k, bw: 0.16 + (full * 1.02 - 0.16) * clamp(k, 0, 1), samples: 220,
      top: top, bot: bot, cx: cx, radius: function () { return R; }, backMix: 0.72 };
    // glass tube interior
    rr(ctx, cx - R, top - 2, R * 2, bot - top + 4, R * 0.18);
    ctx.fillStyle = 'rgba(32,34,38,' + (0.55 + 0.45 * clamp(k, 0, 1)) + ')'; ctx.fill();
    this.ribbons(g, false);
    this.ribbons(g, true);
    // glass gloss
    var gl = ctx.createLinearGradient(cx - R, 0, cx + R, 0);
    gl.addColorStop(0, 'rgba(0,0,0,.55)'); gl.addColorStop(0.18, 'rgba(0,0,0,.08)'); gl.addColorStop(0.3, 'rgba(255,255,255,.34)');
    gl.addColorStop(0.38, 'rgba(255,255,255,.05)'); gl.addColorStop(0.78, 'rgba(0,0,0,.12)'); gl.addColorStop(1, 'rgba(0,0,0,.62)');
    rr(ctx, cx - R, top - 2, R * 2, bot - top + 4, R * 0.18); ctx.fillStyle = gl; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1; ctx.stroke();
    // chrome caps
    this.cap(cx, pad, R * 1.08, capH); this.cap(cx, h - pad - capH, R * 1.08, capH);
  };
  Helix.prototype.cap = function (cx, y, r, ch) {
    var ctx = this.ctx, gr = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
    gr.addColorStop(0, '#16171a'); gr.addColorStop(0.3, '#8e939b'); gr.addColorStop(0.42, '#e6e8eb'); gr.addColorStop(0.62, '#4a4e55'); gr.addColorStop(1, '#141518');
    rr(ctx, cx - r, y, r * 2, ch, ch / 2); ctx.fillStyle = gr; ctx.fill();
  };
  // curl: a strand on a perm rod; the rod is pulled out and the strand springs into a ringlet
  Helix.prototype.drawCurl = function () {
    var ctx = this.ctx, w = this.w, h = this.h, p = clamp(this.state.p, 0, 1);
    ctx.clearRect(0, 0, w, h);
    var R = Math.min(w * 0.16, h * 0.085), cx = w / 2, top = h * 0.2, bot0 = h * 0.72;
    var out = smooth(0.08, 0.55, p), rodA = 1 - smooth(0.32, 0.58, p);
    var q = smooth(0.28, 1, p), spring = 1 - Math.exp(-4.2 * q) * Math.cos(10.5 * q);
    if (q === 0) spring = 0;
    var Rc = R * (1 - 0.34 * spring), bot = bot0 + h * 0.14 * spring;
    // hair root: straight lock from the top edge into the first turn
    ctx.strokeStyle = shade(this.cols[0], 0.9, 0); ctx.lineWidth = R * 0.62; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx - R * 0.1, -10); ctx.quadraticCurveTo(cx, top * 0.6, cx, top); ctx.stroke();
    var g = { cols: this.cols, rot: -0.2, turns: 4.6 - 1.1 * spring, bw: 1.2, samples: 260, top: top, bot: bot, cx: cx,
      radius: function (t) { return Rc * (1 - 0.18 * t * spring); }, backMix: 0.55 };
    this.ribbons(g, false);
    if (rodA > 0.01) { // the perm rod, sliding down and out
      var dy = out * h * 0.95, rh = bot0 - top + R * 1.4;
      ctx.globalAlpha = rodA;
      var gr = ctx.createLinearGradient(cx - R, 0, cx + R, 0);
      gr.addColorStop(0, '#4b4e54'); gr.addColorStop(0.35, '#b9bcc2'); gr.addColorStop(0.55, '#8d9097'); gr.addColorStop(1, '#3a3d42');
      rr(ctx, cx - R * 0.96, top - R * 0.7 + dy, R * 1.92, rh, R * 0.5); ctx.fillStyle = gr; ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,.28)';
      for (var y = top + dy; y < top + dy + rh - R; y += R * 0.7) { ctx.beginPath(); ctx.arc(cx - R * 0.35, y, 1.4, 0, TAU); ctx.arc(cx + R * 0.35, y + R * 0.35, 1.4, 0, TAU); ctx.fill(); }
      ctx.globalAlpha = 1;
    }
    this.ribbons(g, true);
  };
  Helix.prototype.draw = function () { if (this.mode === 'curl') this.drawCurl(); else this.drawPole(); };
  window.Helix = Helix;
})();
