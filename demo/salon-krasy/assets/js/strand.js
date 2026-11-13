/* «Десять тонів» · концепт Velira — пасмо у глибині.
   Процедурне пасмо волосся: WebGL2, instanced LINE_STRIP, освітлення Kajiya–Kay (два відблиски),
   фарбування за технікою рахується в шейдері. Власна реалізація Velira, без сторонніх бібліотек.
   Ініціалізація розбита на кроки (begin → ready → build), щоб жоден кадр не був довгим. */
(function () {
  'use strict';

  // 10 рівнів глибини тону (бриф концепту), sRGB
  var TONES = ['#0d0c0c', '#241813', '#3d2a1f', '#5f442f', '#85633f', '#a8865f', '#c4a67f', '#d3bf9f', '#ddd3c3', '#e9eaea'];

  var VERT = [
    '#version 300 es',
    'precision highp float;',
    'layout(location=0) in float aT;',
    'layout(location=1) in vec4 aClumpA;', // cx, cz (одиничний диск), фаза, довжина
    'layout(location=2) in vec4 aClumpB;', // амплітуда хвилі жмутка, частота, «світлість» (балаяж), старт мазка
    'layout(location=3) in vec4 aFibre;',  // fx, fz (у жмутку), зерно, «вибита» волосина
    'uniform float uTime, uD, uUnit, uYaw, uPitch;',
    'uniform vec2 uRes, uCenter;',
    'uniform vec3 uLight;',
    'uniform float uFront, uGlow, uWipe, uTechO, uTechA, uTechB, uPre, uLen, uGhost, uDim, uGain, uSway, uMarkGlow, uRegrow, uRoot;',
    'uniform vec4 uMarks, uMarkW;',
    'uniform vec3 uTone[10];',
    'out vec3 vCol;',
    'out float vA;',
    'const float TAU = 6.28318530718;',
    'vec3 centre(float t){',
    '  float a = 0.105 * smoothstep(0.04, 0.62, t);',
    '  float ph = 9.74 * t + 0.6;',
    '  float sway = uSway * sin(uTime * 0.7 + t * 2.4) * t * t;',
    '  return vec3(a * sin(ph) + sway, 1.0 - 2.0 * t, a * 0.6 * cos(ph));',
    '}',
    'vec2 offs(float tt){',
    '  vec2 co = aClumpA.xy;',
    '  float cw = aClumpB.x * tt;',
    '  co += cw * vec2(sin(aClumpB.y * tt * TAU + aClumpA.z), cos(aClumpB.y * tt * 5.1 + aClumpA.z * 1.7));',
    '  float fly = aFibre.w;',
    '  float rin = mix(0.21, 0.045, smoothstep(0.28, 1.0, tt)) * (1.0 + 2.6 * fly);',
    '  vec2 fo = aFibre.xy * rin;',
    '  fo += (0.012 + 0.05 * fly) * vec2(sin(tt * 31.0 + aFibre.z * 90.0), cos(tt * 27.0 + aFibre.z * 57.0)) * smoothstep(0.0, 0.3, tt);',
    '  return co + fo;',
    '}',
    'vec3 fibre(float tt, out vec2 o){',
    '  vec3 c = centre(tt);',
    '  float prof = mix(0.52, 1.0, smoothstep(0.0, 0.26, tt)) * mix(1.0, 0.50, smoothstep(0.74, 1.0, tt));',
    '  o = offs(tt);',
    '  float chi = 0.85 * sin(TAU * 0.78 * tt + 0.3);', // стрічка пасма повертається разом із хвилею
    '  float cs = cos(chi), sn = sin(chi);',
    '  vec2 e = vec2(o.x * 0.235, o.y * 0.105) * prof;',
    '  return c + vec3(e.x * cs - e.y * sn, 0.0, e.x * sn + e.y * cs);',
    '}',
    'vec3 rot(vec3 p){',
    '  float cy = cos(uYaw), sy = sin(uYaw);',
    '  p = vec3(p.x * cy + p.z * sy, p.y, -p.x * sy + p.z * cy);',
    '  float cp = cos(uPitch), sp = sin(uPitch);',
    '  return vec3(p.x, p.y * cp - p.z * sp, p.y * sp + p.z * cp);',
    '}',
    'vec3 tone(float l){',
    '  l = clamp(l, 1.0, 10.0) - 1.0;',
    '  int i = int(floor(l)); int j = min(i + 1, 9);',
    '  return mix(uTone[i], uTone[j], fract(l));',
    '}',
    'vec3 tech(float k, float t, float cl, float cs, float fs){',
    '  float lvl; vec3 tint = vec3(1.0);',
    '  if (k < 0.5) {',          // балаяж: окремі пасма мазками, без чіткої межі
    '    float amt = cl > 0.36 ? mix(0.5, 1.0, (cl - 0.36) / 0.64) : 0.08;',
    '    lvl = mix(2.7, 9.5, smoothstep(cs, cs + 0.40, t) * amt) + (fs - 0.5) * 0.5;',
    '  } else if (k < 1.5) {',   // омбре: суцільна зона по низу довжини
    '    float s = 0.06 * (cl - 0.5);',
    '    lvl = mix(2.7, 9.3, smoothstep(0.40 + s, 0.78 + s, t)) + (fs - 0.5) * 0.4;',
    '  } else if (k < 2.5) {',   // корені після: відрослу частину зрівняно з довжиною
    '    lvl = mix(6.3, 6.9, smoothstep(0.16, 0.30, t)) + (fs - 0.5) * 0.5 + (cl - 0.5) * 0.25;',
    '  } else if (k < 3.5) {',   // однотонне: один колір
    '    lvl = 4.3 + (fs - 0.5) * 0.45 + (cl - 0.5) * 0.3;',
    '  } else if (k < 4.5) {',   // тонування: той самий рівень, інший відтінок (.1 — попелястий)
    '    lvl = 8.3 + (fs - 0.5) * 0.6 + (cl - 0.5) * 0.5; tint = vec3(0.80, 0.86, 0.97);',
    '  } else if (k < 5.5) {',   // до фарбування
    '    lvl = 2.7 + (fs - 0.5) * 0.4;',
    '  } else if (k < 6.5) {',   // до «Коренів»: відрослий темний корінь
    '    lvl = mix(2.5, 6.9, smoothstep(0.185, 0.25, t + (cl - 0.5) * 0.03)) + (fs - 0.5) * 0.5 + (cl - 0.5) * 0.25 * step(0.25, t);',
    '  } else {',                // до тонування: теплий жовтий блонд
    '    lvl = 8.1 + (fs - 0.5) * 0.6 + (cl - 0.5) * 0.5; tint = vec3(1.0, 0.90, 0.60);',
    '  }',
    '  return tone(lvl) * tint;',
    '}',
    'void main(){',
    '  float len = aClumpA.w * (0.93 + 0.07 * aFibre.z);',
    // біля кореня (сцена «Між візитами») волосини починаються на різній висоті й проявляються м’яко — без рівного зрізу
    '  float r0 = uRoot * (0.003 + 0.017 * fract(aClumpA.z * 4.13 + aFibre.z * 0.61));',
    '  float tt = mix(r0, len, aT);',
    '  vec2 o, o1, o2;',
    '  vec3 p = rot(fibre(tt, o));',
    '  vec3 pa = rot(fibre(tt + 0.012, o1));',
    '  vec3 pb = rot(fibre(max(tt - 0.012, 0.0), o2));',
    '  vec3 T = normalize(pa - pb);',
    '  float rad = length(o);',
    '  float chi = 0.85 * sin(TAU * 0.78 * tt + 0.3);',
    '  vec2 n2 = o / max(rad, 0.001);',
    '  vec3 N = normalize(rot(vec3(n2.x * cos(chi) - n2.y * 2.1 * sin(chi), 0.0, n2.x * sin(chi) + n2.y * 2.1 * cos(chi))));',
    '  vec3 Vv = normalize(vec3(0.0, 0.0, uD) - p);',
    '  vec3 L = normalize(uLight - p);',
    '  float cl = aClumpB.z, cs0 = aClumpB.w, fs = aFibre.z;',
    // мазок пензля: край нахилений (як курсив) і зі «щетиною» — жмутки фарбуються не одночасно
    '  float bristle = fract(sin(aClumpA.z * 12.9898) * 43758.5453) - 0.5;',
    '  float edge = tt + o.x * 0.03 + bristle * 0.07 + (fs - 0.5) * 0.02;',
    '  float w = 1.0 - smoothstep(uWipe - 0.014, uWipe + 0.014, edge);',
    '  vec3 from = tech(uTechA, tt, cl, cs0, fs);',
    '  if (uPre < 0.999) from = mix(tech(uTechO, tt, cl, cs0, fs), from, uPre);',
    '  vec3 alb = mix(from, tech(uTechB, tt, cl, cs0, fs), w);',
    // між візитами: корінь відростає своїм кольором
    '  if (uRegrow > 0.0) alb = mix(tone(2.5 + (fs - 0.5) * 0.4), alb, smoothstep(uRegrow - 0.004, uRegrow + 0.010, tt + (fs - 0.5) * 0.008));',
    '  float lum = dot(alb, vec3(0.3, 0.55, 0.15));',
    // об’єм пасма: бік до світла + глибина всередині
    '  float wrap = 0.5 + 0.5 * dot(N, L);',
    '  float shade = mix(0.16, 1.0, wrap * wrap) * mix(0.66, 1.0, smoothstep(0.15, 1.0, rad));',
    // Kajiya–Kay
    '  float tl = dot(T, L);',
    '  float diff = sqrt(max(0.0, 1.0 - tl * tl));',
    '  vec3 H = normalize(L + Vv);',
    '  float th1 = dot(normalize(T + (0.07 + (fs - 0.5) * 0.06) * N), H);',
    '  float s1 = pow(sqrt(max(0.0, 1.0 - th1 * th1)), 170.0);',
    '  float th2 = dot(normalize(T + (-0.12 + (cl - 0.5) * 0.26) * N), H);',
    '  float s2 = pow(sqrt(max(0.0, 1.0 - th2 * th2)), 58.0);',
    '  vec3 lightCol = vec3(1.0, 0.93, 0.84);',
    '  vec3 col = alb * (0.08 + 0.80 * diff) * shade * lightCol;',
    '  col += (s1 * lightCol * (0.045 + 0.34 * lum) + s2 * (alb * (1.5 - 0.9 * lum) + 0.003) * lightCol) * mix(0.2, 1.0, wrap);',
    // контрове світло: сріблястий край, сильніше на світлому волоссі
    '  float rim = pow(1.0 - abs(N.z), 3.0) * smoothstep(0.55, 1.05, rad);',
    '  col += rim * (alb * 1.2 + 0.006) * vec3(0.86, 0.90, 1.0) * 0.5;',
    // світло салону проходить від кореня до кінчиків
    '  float lit = 1.0 - smoothstep(uFront - 0.16, uFront + 0.02, tt);',
    '  col *= mix(uDim, 1.0, lit);',
    '  float band = exp(-pow((tt - uFront) / 0.034, 2.0));',
    '  col = col * (1.0 + band * uGlow * vec3(3.4, 2.5, 1.6)) + band * uGlow * vec3(1.0, 0.78, 0.50) * (0.03 + 0.12 * diff) * mix(0.25, 1.0, wrap);',
    // вологий відблиск пензля на фронті фарби
    '  float brush = exp(-pow((edge - uWipe) / 0.022, 2.0)) * step(0.001, uWipe) * (1.0 - step(1.12, uWipe));',
    '  col += brush * (1.0 - uGlow) * 0.5 * vec3(1.0, 0.96, 0.9) * mix(0.3, 1.0, wrap);',
    // позначки довжини: м’який відблиск на волоссі, що йде за вигином стрічки (не рівна смуга)
    '  vec4 dm = (vec4(tt + o.x * 0.012 + (fs - 0.5) * 0.014) - uMarks) / 0.0085;',
    '  float mk = dot(exp(-dm * dm), uMarkW);',
    '  col += mk * uMarkGlow * lit * vec3(1.0, 0.93, 0.80) * (0.02 + 0.26 * wrap * wrap);',
    // обрана довжина: нижче позначки пасмо виходить із фокуса — тьмяніє на ≈ 40 %, не в чорне
    '  float gh = uGhost * smoothstep(uLen - 0.012, uLen + 0.035, tt + (fs - 0.5) * 0.02);',
    '  col = mix(col, vec3(dot(col, vec3(0.3, 0.55, 0.15))), 0.22 * gh) * mix(1.0, 0.58, gh);',
    '  col *= mix(0.80, 1.0, smoothstep(-0.25, 0.2, p.z)) * (0.86 + 0.28 * fract(fs * 7.31 + cl * 3.7));',
    '  col = col * 1.25 / (1.0 + col * 0.45);',
    '  vCol = pow(col, vec3(1.0 / 2.2)) * uGain;',
    '  vA = (1.0 - 0.75 * aFibre.w) * (1.0 - 0.34 * gh);',
    '  if (uRoot > 0.0) vA *= smoothstep(r0, r0 + 0.012, tt);',
    '  float persp = uD / (uD - p.z);',
    '  vec2 px = uCenter + vec2(p.x, -p.y) * uUnit * persp;',
    '  vec2 ndc = px / uRes * 2.0 - 1.0;',
    '  gl_Position = vec4(ndc.x, -ndc.y, clamp(-p.z / 1.6, -0.99, 0.99), 1.0);',
    '}'
  ].join('\n');

  var FRAG = [
    '#version 300 es',
    'precision mediump float;',
    'in vec3 vCol; in float vA;',
    'out vec4 o;',
    'void main(){ o = vec4(vCol * vA, vA); }'
  ].join('\n');

  var UNIFORMS = ['uTime', 'uD', 'uUnit', 'uYaw', 'uPitch', 'uRes', 'uCenter', 'uLight', 'uFront', 'uGlow', 'uWipe', 'uTechO', 'uTechA', 'uTechB', 'uPre',
    'uLen', 'uGhost', 'uDim', 'uGain', 'uSway', 'uTone', 'uMarkGlow', 'uMarks', 'uMarkW', 'uRegrow', 'uRoot'];

  function hexLin(h) {
    var n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (v) { return Math.pow(v / 255, 2.2); });
  }
  function smooth(a, b, x) { var t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  // детермінований генератор: пасмо однакове на кожному завантаженні й збігається з постером
  function rng(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  function Strand(canvas, opts) {
    opts = opts || {};
    this.canvas = canvas;
    this.fibres = opts.fibres || 4200;
    this.segs = opts.segs || 52;
    this.quality = 1;
    this.ok = false; this.failed = false; this.dpr = 1; this.w = 0; this.h = 0;
    this.s = {
      time: 0, cx: 0, cy: 0, unit: 200, D: 4.6, yaw: 0, pitch: 0,
      light: [0.8, 1.5, 2.3], front: 1.3, glow: 0, wipe: 1.3, techO: 0, techA: 0, techB: 0, pre: 1,
      len: 1.2, ghost: 0, dim: 0.07, gain: 1, sway: 0, markGlow: 1, marks: [0.29, 0.48, 0.67, 0.885], markW: [1, 1, 1, 1], regrow: 0, root: 0
    };
  }

  // крок 1: контекст і компіляція шейдерів (де можна — паралельно, без блокування кадру)
  Strand.prototype.begin = function () {
    var canvas = this.canvas, self = this, gl = null;
    try { gl = canvas.getContext('webgl2', { antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: false }); } catch (e) { gl = null; }
    if (!gl) { this.failed = true; return false; }
    this.gl = gl;
    this.par = gl.getExtension('KHR_parallel_shader_compile');
    var v = gl.createShader(gl.VERTEX_SHADER), f = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(v, VERT); gl.compileShader(v);
    gl.shaderSource(f, FRAG); gl.compileShader(f);
    var p = gl.createProgram(); gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p);
    this.prog = p; this._v = v; this._f = f;
    canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); self.ok = false; self.failed = true; if (self.onlost) self.onlost(); });
    return true;
  };

  // крок 2: чи готова програма (опитується з кадру в кадр)
  Strand.prototype.ready = function () {
    if (this.failed || !this.gl) return false;
    if (this.linked) return true;
    var gl = this.gl;
    if (this.par && !gl.getProgramParameter(this.prog, this.par.COMPLETION_STATUS_KHR)) return false;
    if (!gl.getProgramParameter(this.prog, gl.LINK_STATUS)) {
      this.failed = true;
      if (window.console) console.warn('strand: ' + (gl.getProgramInfoLog(this.prog) || gl.getShaderInfoLog(this._v) || 'link failed'));
      return false;
    }
    this.linked = true;
    return true;
  };

  // крок 3: геометрія й стала частина стану
  Strand.prototype.build = function () {
    if (!this.linked || this.ok) return this.ok;
    var gl = this.gl, R = rng(20261112), NC = 58, NF = this.fibres, NS = this.segs + 1, i;
    this.u = {};
    for (i = 0; i < UNIFORMS.length; i++) this.u[UNIFORMS[i]] = gl.getUniformLocation(this.prog, UNIFORMS[i]);
    var clumps = [];
    for (i = 0; i < NC; i++) {
      // «соняшник» + тремтіння: жмутки рівно заповнюють переріз пасма
      var r = Math.sqrt((i + 0.5) / NC) * 0.92, a = i * 2.39996 + R() * 0.5;
      clumps.push({
        x: r * Math.cos(a) + (R() - 0.5) * 0.08, z: r * Math.sin(a) + (R() - 0.5) * 0.08,
        ph: R() * 6.283, len: 0.80 + 0.20 * Math.pow(R(), 0.55),
        amp: 0.10 + R() * 0.24, fr: 0.7 + R() * 1.5, light: R(), start: 0.16 + R() * 0.34
      });
    }
    var A = new Float32Array(NF * 4), B = new Float32Array(NF * 4), F = new Float32Array(NF * 4);
    for (i = 0; i < NF; i++) {
      var c = clumps[i % NC];
      var rr = Math.sqrt(R()), aa = R() * 6.283;
      A[i * 4] = c.x; A[i * 4 + 1] = c.z; A[i * 4 + 2] = c.ph; A[i * 4 + 3] = c.len;
      B[i * 4] = c.amp; B[i * 4 + 1] = c.fr; B[i * 4 + 2] = c.light; B[i * 4 + 3] = c.start;
      F[i * 4] = rr * Math.cos(aa); F[i * 4 + 1] = rr * Math.sin(aa); F[i * 4 + 2] = R(); F[i * 4 + 3] = R() > 0.965 ? 0.4 + R() * 0.6 : 0;
    }
    var T = new Float32Array(NS);
    for (i = 0; i < NS; i++) T[i] = i / (NS - 1);
    var vao = gl.createVertexArray(); gl.bindVertexArray(vao);
    function buf(data, loc, size, div) {
      var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0); gl.vertexAttribDivisor(loc, div);
    }
    buf(T, 0, 1, 0); buf(A, 1, 4, 1); buf(B, 2, 4, 1); buf(F, 3, 4, 1);
    this.vao = vao; this.NS = NS;
    gl.useProgram(this.prog);
    var tones = [];
    TONES.forEach(function (h) { tones = tones.concat(hexLin(h)); });
    gl.uniform3fv(this.u.uTone, new Float32Array(tones));
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    this.ok = true;
    if (this.w) this.resize(this.w, this.h, this.dpr);
    return true;
  };

  Strand.prototype.resize = function (w, h, dpr) {
    this.dpr = dpr; this.w = w; this.h = h;
    var W = Math.round(w * dpr), H = Math.round(h * dpr);
    if (this.canvas.width !== W || this.canvas.height !== H) { this.canvas.width = W; this.canvas.height = H; }
    if (this.gl) this.gl.viewport(0, 0, W, H);
  };

  Strand.prototype.clear = function () { if (this.ok) this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT); };

  Strand.prototype.render = function () {
    if (!this.ok) return;
    var gl = this.gl, u = this.u, s = this.s, d = this.dpr;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(this.prog);
    gl.uniform1f(u.uTime, s.time); gl.uniform1f(u.uD, s.D); gl.uniform1f(u.uUnit, s.unit * d);
    gl.uniform1f(u.uYaw, s.yaw); gl.uniform1f(u.uPitch, s.pitch);
    gl.uniform2f(u.uRes, this.canvas.width, this.canvas.height);
    gl.uniform2f(u.uCenter, s.cx * d, s.cy * d);
    gl.uniform3f(u.uLight, s.light[0], s.light[1], s.light[2]);
    gl.uniform1f(u.uFront, s.front); gl.uniform1f(u.uGlow, s.glow); gl.uniform1f(u.uWipe, s.wipe);
    gl.uniform1f(u.uTechO, s.techO); gl.uniform1f(u.uTechA, s.techA); gl.uniform1f(u.uTechB, s.techB); gl.uniform1f(u.uPre, s.pre);
    gl.uniform1f(u.uMarkGlow, s.markGlow); gl.uniform4fv(u.uMarks, s.marks); gl.uniform4fv(u.uMarkW, s.markW);
    gl.uniform1f(u.uLen, s.len); gl.uniform1f(u.uGhost, s.ghost); gl.uniform1f(u.uDim, s.dim); gl.uniform1f(u.uGain, s.gain);
    gl.uniform1f(u.uSway, s.sway); gl.uniform1f(u.uRegrow, s.regrow); gl.uniform1f(u.uRoot, s.root || 0);
    gl.bindVertexArray(this.vao);
    gl.drawArraysInstanced(gl.LINE_STRIP, 0, this.NS, Math.max(600, Math.round(this.fibres * this.quality)));
  };

  // Та сама осьова лінія й проєкція, що в шейдері: для карток-підказок на позначках довжини (CSS px).
  Strand.prototype.project = function (t, ox, oz) {
    var s = this.s;
    var a = 0.105 * smooth(0.04, 0.62, t), ph = 9.74 * t + 0.6;
    var x = a * Math.sin(ph) + s.sway * Math.sin(s.time * 0.7 + t * 2.4) * t * t + (ox || 0);
    var y = 1 - 2 * t, z = a * 0.6 * Math.cos(ph) + (oz || 0);
    var cy = Math.cos(s.yaw), sy = Math.sin(s.yaw);
    var x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
    var cp = Math.cos(s.pitch), sp = Math.sin(s.pitch);
    var y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
    var k = s.D / (s.D - z2);
    return { x: s.cx + x1 * s.unit * k, y: s.cy - y2 * s.unit * k, k: k, z: z2 };
  };

  Strand.TONES = TONES;
  window.Strand = Strand;
})();
