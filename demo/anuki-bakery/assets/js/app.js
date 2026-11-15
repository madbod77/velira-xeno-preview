/* Anuki Bakery — концепт Velira. Рух: «ламбет відсаджується». Без трекерів і зовнішніх запитів. */
(function () {
  'use strict';
  window.__anuki = true;
  var doc = document, root = doc.documentElement;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var SVGNS = 'http://www.w3.org/2000/svg';
  // уся непервинна робота — у вільний час браузера, дрібними шматками (без довгих задач на телефоні)
  // черга: один шматок на один вільний проміжок, по порядку (тайм-аут 150 мс — і в Firefox/Safari не пізніше)
  var idleQ = [], idleOn = false;
  var idleKick = function () { if (window.requestIdleCallback) requestIdleCallback(idlePump, { timeout: 150 }); else setTimeout(idlePump, 60); };
  var idlePump = function () { var fn = idleQ.shift(); if (fn) fn(); if (idleQ.length) idleKick(); else idleOn = false; };
  var idle = function (fn) { idleQ.push(fn); if (!idleOn) { idleOn = true; idleKick(); } };
  // секції нижче першого екрана (CSS content-visibility:auto) верстаються по одній, кожна у своїй короткій задачі —
  // замість однієї довгої задачі на телефоні під час завантаження; це стоїть у черзі перед ScrollTrigger-ами нижче
  Array.prototype.slice.call(doc.querySelectorAll('.sec, .foot')).forEach(function (sec) {
    idle(function () { sec.style.contentVisibility = 'visible'; void sec.offsetHeight; });
  });

  /* ---------- конструктор повідомлення (працює завжди) ---------- */
  var form = $('#composer');
  var months = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];
  var dateInput = $('#date');
  function val(name) { var el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : ''; }
  function whenText() {
    var w = val('when');
    if (w === 'today') return 'сьогодні';
    if (w === 'tomorrow') return 'завтра';
    if (dateInput.value) { var p = dateInput.value.split('-'); return +p[2] + ' ' + months[+p[1] - 1]; }
    return 'дату напишу окремо';
  }
  var msgEl = $('#msg'), mini = $('#miniText'), ring = $('.mini-ring'), copied = $('#copied');
  var lastInscr = null;
  function build() {
    var fill = val('fill');
    var inscr = $('#inscr').value.trim();
    var text = 'Привіт! Хочу замовити ' + val('what') + ', дизайн ' + val('design') +
      ', начинка — ' + fill + ', на ' + whenText() + '.' +
      (inscr ? ' Напис на торті: «' + inscr + '».' : '') +
      ' Підкажіть, будь ласка, ціну й чи встигнете?';
    msgEl.textContent = text;
    mini.textContent = inscr || 'без напису';
    mini.classList.toggle('is-empty', !inscr);
    if (lastInscr !== null && inscr !== lastInscr && window.gsap && root.classList.contains('motion-ok')) {
      gsap.fromTo(ring, { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
    }
    lastInscr = inscr;
    return text;
  }
  if (form) idle(function () {
    try {
      var t = new Date(); var iso = new Date(t.getTime() - t.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      dateInput.min = iso;
    } catch (e) {}
    form.addEventListener('change', build);
    $('#inscr').addEventListener('input', build);
    dateInput.addEventListener('change', function () { dateInput.classList.toggle('has-value', !!dateInput.value); var r = form.querySelector('input[value="date"]'); if (r && dateInput.value) r.checked = true; build(); });
    build();
    var copy = function () {
      var text = build();
      var done = function () { copied.textContent = 'Скопійовано — встав у Direct і надішли.'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
      } else { fallback(text); done(); }
    };
    var fallback = function (text) {
      var ta = doc.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0'; doc.body.appendChild(ta); ta.select();
      try { doc.execCommand('copy'); } catch (e) {} doc.body.removeChild(ta);
    };
    $('#openDm').addEventListener('click', copy);
    $('#copyOnly').addEventListener('click', copy);
  });

  /* ---------- кільце прогресу в шапці: 18 намистин ---------- */
  var pg = $('.prog-beads'), progBeads = [];
  if (pg) idle(function () {
    for (var i = 0; i < 18; i++) {
      var a = -Math.PI / 2 + i * (Math.PI * 2 / 18);
      var c = doc.createElementNS(SVGNS, 'circle');
      c.setAttribute('cx', (20 + 16 * Math.cos(a)).toFixed(2)); c.setAttribute('cy', (20 + 16 * Math.sin(a)).toFixed(2));
      c.setAttribute('r', '2.6'); c.setAttribute('fill', '#E58FAE');
      pg.appendChild(c); progBeads.push(c);
    }
    var ticking = false;
    var paintProg = function () {
      ticking = false;
      var max = Math.max(1, doc.documentElement.scrollHeight - innerHeight);
      var n = Math.round(Math.min(1, scrollY / max) * 18);
      for (var k = 0; k < 18; k++) progBeads[k].setAttribute('fill-opacity', k < n ? '1' : '.28');
    };
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(paintProg); } }, { passive: true });
    paintProg();
  });

  /* ---------- намистини шва ---------- */
  var seamBox = $('.seam-beads');
  function layoutSeam() {
    if (!seamBox) return;
    seamBox.textContent = '';
    var w = seamBox.getBoundingClientRect().width, step = 56, n = Math.ceil(w / step);
    for (var k = 0; k < n; k++) {
      var b = doc.createElement('i'); b.style.left = (step / 2 + k * step) + 'px'; seamBox.appendChild(b);
    }
  }
  idle(layoutSeam);

  /* ---------- бордюр торта: ≈400 SVG-вузлів лежать у <template> і переносяться в торт за два кадри після першого
     малювання (18 черепашок, потім решта + сваги й намистини) — без довгої задачі на телефоні; працює й без руху ---------- */
  var discEl = $('.disc'), decoTpl = $('#disc-deco'), decoWait = [];
  var onDeco = function (fn) { if (decoWait) decoWait.push(fn); else fn(); };
  if (discEl && decoTpl && decoTpl.content) {
    var decoSrc = decoTpl.content.querySelector('svg');
    var moveKids = function (cls, max) {
      var from = decoSrc.querySelector('.' + cls), to = discEl.querySelector('.' + cls), n = 0;
      while (from.firstChild && n < max) { if (from.firstChild.nodeType === 1) n++; to.appendChild(from.firstChild); }
    };
    requestAnimationFrame(function () {
      moveKids('shells', 18);
      requestAnimationFrame(function () {
        moveKids('shells', 1e3); moveKids('swags', 1e3); moveKids('beads', 1e3);
        var q = decoWait; decoWait = null; q.forEach(function (f) { f(); });
      });
    });
  } else decoWait = null;

  /* ---------- рух ---------- */
  var motionOk =root.classList.contains('motion-ok') && window.gsap && window.ScrollTrigger;
  if (!motionOk) { root.classList.remove('motion-ok'); return; }
  gsap.registerPlugin(ScrollTrigger);
  var EASE = 'cubic-bezier(0.2,0.7,0.2,1)';
  gsap.config({ force3D: true });
  var easeRise = function (x) { /* cubic-bezier(.2,.7,.2,1) наближено */ return 1 - Math.pow(1 - x, 3.2); };

  /* 1. Фірмовий момент: бордюр «ламбет» відсаджується по колу */
  // таймлайн будується, щойно бордюр перенесено з <template> (кадр 2 після першого малювання)
  onDeco(function () {
  var shells = $$('.disc .shell'), swags = $$('.disc .swag path'), beads = $$('.disc .bead');
  var intro = gsap.timeline({ delay: 0.04 });
  intro.fromTo('.disc .glaze', { scale: 0.94, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.6, ease: 'expo.out' }, 0);
  // нерівний крок: швидше на дугах між стиками, повільніше біля стиків свагів (кожні 4.5 черепашки)
  var tAt = 0;
  shells.forEach(function (s, i) {
    var near = Math.abs(((i + 2.25) % 4.5) - 2.25) < 0.8;
    intro.fromTo(s, { scale: 0.2, opacity: 0, transformOrigin: '30% 50%' },
      { scale: 1, opacity: 1, duration: 0.28, ease: 'back.out(1.5)' }, tAt);
    tAt += near ? 0.034 : 0.022;
  });
  var ringDur = tAt;
  intro.fromTo('.disc .nozzle', { rotation: 0, opacity: 0, svgOrigin: '300 300' },
    { rotation: 360, duration: ringDur, ease: 'none' }, 0)
    .to('.disc .nozzle', { opacity: 1, duration: 0.12 }, 0)
    .to('.disc .nozzle', { opacity: 0, duration: 0.25 }, ringDur - 0.1);
  intro.to(swags, { strokeDashoffset: 0, duration: 0.42, ease: 'power2.out', stagger: { each: 0.05 } }, ringDur - 0.3);
  intro.fromTo(beads, { scale: 0.2, opacity: 0, transformOrigin: '50% 50%' },
    { scale: 1, opacity: 1, duration: 0.28, ease: 'back.out(1.5)', stagger: 0.04 }, ringDur + 0.05);
  intro.to('.disc .inscr', { opacity: 1, duration: 0.5, ease: 'power1.out' }, ringDur + 0.1);
  });

  /* 2. Метушня стискається в острівець: clip-path поля до кола торта */
  var field = $('#field'), cake = $('#cake'), copyEls = $$('.hero-copy > *'), stage = $('.stage'), disc = $('.disc');
  var geo = { cx: 0, cy: 0, rMax: 0, rEnd: 0, shift: 0, scale: 1 };
  var under = $('.under-small'), plate = $('#plate'), after = $('.after'), underEls = $$('.under-grid > *:not(.plate)');
  function measure() {
    // міряємо сам торт (svg), без поточних трансформацій; обгортка #cake на телефоні ширша за торт
    var prev = cake.style.transform, prevD = disc.style.transform; cake.style.transform = 'none'; disc.style.transform = 'none';
    var f = field.getBoundingClientRect(), c = disc.getBoundingClientRect();
    cake.style.transform = prev; disc.style.transform = prevD;
    geo.cx = c.left - f.left + c.width / 2; geo.cy = c.top - f.top + c.height / 2;
    geo.shift = 0; geo.shiftX = 0; geo.scale = 1;
    // у кінці сцени блок «after» стоїть рівно в екрані: острівець сідає на свою підставку (#plate)
    var pl = plate && plate.getBoundingClientRect();
    if (pl && pl.width > 0) {
      var a = after.getBoundingClientRect();
      var tx = pl.left - a.left + pl.width / 2, ty = pl.top - a.top + pl.height / 2;
      geo.scale = Math.max(0.5, Math.min(1.9, (pl.width / 1.12) / (c.width * (508 / 520))));
      geo.shiftX = tx - (f.left + geo.cx - a.left);
      geo.shift = ty - geo.cy;
      if (Math.abs(geo.shiftX) < 2) geo.shiftX = 0;
    }
    var dx = Math.max(geo.cx, f.width - geo.cx), dy = Math.max(geo.cy, f.height - geo.cy);
    geo.rMax = Math.hypot(dx, dy) + Math.abs(geo.shift) + Math.abs(geo.shiftX || 0) + 40; geo.rEnd = c.width * (238 / 520); geo.amp = c.width * (16 / 520);
  }
  var ease2 = function (x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  function paintClip(p) {
    var q = Math.min(1, Math.max(0, (p - 0.637) / 0.345)), e = ease2(q);
    var sc = 1 + (geo.scale - 1) * e, rEnd = geo.rEnd * geo.scale;
    var r = geo.rMax + (rEnd - geo.rMax) * e;
    var sh = geo.shift * e, sx = (geo.shiftX || 0) * e;
    var op = q > 0.4 ? Math.max(0, 1 - (q - 0.4) / 0.3).toFixed(3) : '';
    for (var ci = 0; ci < copyEls.length; ci++) copyEls[ci].style.opacity = op;
    // телефон: острівець їде в центр через місце напису — напис проявляється, коли острівець уже під ним
    if (innerWidth < 960) { var uo = Math.min(1, Math.max(0, (q - 0.62) / 0.3)); underEls.forEach(function (u) { u.style.opacity = (q >= 1 || p <= 0) ? '' : uo.toFixed(3); }); }
    else underEls.forEach(function (u) { u.style.opacity = ''; });
    cake.style.transform = (sh || sx || sc !== 1) ? 'translate(' + sx.toFixed(1) + 'px,' + sh.toFixed(1) + 'px) scale(' + sc.toFixed(4) + ')' : '';
    // край поля — фестон із 36 «черепашок», що збігаються з бордюром торта, коли поле стискається до нього
    var cx = geo.cx + sx, cy = geo.cy + sh, amp = geo.amp * sc * (0.35 + 0.65 * e), phase = e * 24, pts = [];
    if (q <= 0) { field.style.clipPath = ''; }
    else {
      for (var k = 0; k < 216; k++) {
        var deg = k * (360 / 216), t = (((deg - phase + 95) % 10) + 10) % 10 / 10;
        var rr = r + amp * Math.sin(Math.PI * t), a = deg * Math.PI / 180;
        pts.push((cx + rr * Math.cos(a)).toFixed(1) + 'px ' + (cy + rr * Math.sin(a)).toFixed(1) + 'px');
      }
      field.style.clipPath = 'polygon(' + pts.join(',') + ')';
    }
    disc.style.transform = 'rotate(' + (e * 24).toFixed(2) + 'deg) scale(' + (1 - e * 0.06).toFixed(4) + ')';
  }
  // сцена першого екрана налаштовується першою в черзі вільного часу (≤ 150 мс): перед стисканням 0.7 екрана спокою,
  // тож у першій задачі лишаються тільки перенесення перших 18 черепашок і таймлайн інтро
  idleQ.unshift(function () {
    ScrollTrigger.create({
      trigger: stage, start: 'top top', end: 'bottom bottom', scrub: true,
      onUpdate: function (self) { paintClip(self.progress); },
      onRefresh: function (self) { measure(); paintClip(self.progress); }
    });
  });
  if (!idleOn) { idleOn = true; idleKick(); }

  idle(function () {
  /* 3. Проява блоків (один вхід на контейнер) */
  $$('.rise').forEach(function (el) {
    if (el.classList.contains('slice')) return;
    gsap.from(el, { y: 22, duration: 0.7, ease: easeRise, immediateRender: false,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });
  var slices = $$('.slice.rise'), sd = [0, 0.08, 0.14, 0.19];
  slices.forEach(function (el, i) {
    gsap.from(el, { y: 26 + i * 6, duration: 0.7, delay: sd[i] || 0, ease: easeRise, immediateRender: false,
      scrollTrigger: { trigger: '.slices', start: 'top 85%', once: true } });
  });

  });
  idle(function () {
  /* 4. Кружечки хайлайтів відсаджуються (намистини стікають по колу) */
  var hls = $$('.hl');
  ScrollTrigger.create({ trigger: '.rail', start: 'top 88%', once: true, onEnter: function () {
    var d = 0;
    hls.forEach(function (h, i) {
      gsap.fromTo(h.querySelector('svg'), { scale: 0.86, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'back.out(1.3)', delay: d });
      gsap.fromTo(h.querySelector('use'), { strokeDashoffset: 48 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out', delay: d });
      d += Math.max(0.03, 0.09 - i * 0.007);
    });
  } });

  /* 5. Намистини-лідери меню */
  $$('.lead-beads').forEach(function (l, i) {
    gsap.fromTo(l, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.out', delay: i * 0.07,
      scrollTrigger: { trigger: '.menu', start: 'top 80%', once: true } });
  });

  });
  idle(function () {
  /* 6. Відсаджений шов: намистини йдуть за прокруткою зліва направо */
  function seamTween() {
    var bs = $$('.seam-beads i');
    gsap.set(bs, { scale: 0, opacity: 0 });
    return gsap.to(bs, { scale: 1, opacity: 1, ease: 'back.out(1.5)', duration: 0.3, stagger: { each: 0.05 },
      scrollTrigger: { trigger: '#lambeth', start: 'top 92%', end: 'top 40%', scrub: 0.4 } });
  }
  var seamT = seamTween();
  gsap.fromTo('.seam-edge, .seam-rim', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', ease: 'none', immediateRender: false,
    scrollTrigger: { trigger: '#lambeth', start: 'top 100%', end: 'top 65%', scrub: 0.3 } });


  /* 7. Тихий паралакс фото (≤ 6 px / 100 px) */
  gsap.fromTo('.ph-small', { y: 22 }, { y: -22, ease: 'none',
    scrollTrigger: { trigger: '.lam-grid', start: 'top bottom', end: 'bottom top', scrub: true } });

  var rw = innerWidth;
  addEventListener('resize', function () {
    if (Math.abs(innerWidth - rw) < 2) return; rw = innerWidth;
    seamT.scrollTrigger && seamT.scrollTrigger.kill(); seamT.kill(); layoutSeam(); seamT = seamTween();
    ScrollTrigger.refresh();
  });
  addEventListener('load', function () { ScrollTrigger.refresh(); });
  });
  idle(function () {
  /* 8. Вишневий → зелений: морфінг поля і адреса рядками */
  // зелена глазур розтікається з верхнього краю по вишневому полю (без брудної середини sRGB-переходу)
  gsap.fromTo('.glaze-fill', { clipPath: 'circle(0% at 50% 0%)' }, { clipPath: 'circle(150% at 50% 0%)', ease: 'none', immediateRender: false,
    scrollTrigger: { trigger: '#visit', start: 'top bottom', end: 'top 25%', scrub: true } });
  gsap.from('.addr .ln > span', { yPercent: 38, duration: 0.9, ease: 'expo.out', stagger: 0.07, immediateRender: false,
    scrollTrigger: { trigger: '.addr', start: 'top 88%', once: true } });

  ScrollTrigger.refresh();
  });
})();
