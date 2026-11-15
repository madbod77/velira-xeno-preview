(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var RM = root.classList.contains('rm');

  /* ---------- reveals (SYNTHESIS §3: Y +18, 700 ms, trigger .80, stagger 80 ms, max 6) ---------- */
  var rv = [].slice.call(d.querySelectorAll('[data-rv]'));
  if (!RM && 'IntersectionObserver' in window) {
    root.classList.add('io');
    var groups = new Map();
    rv.forEach(function (el) {
      var p = el.parentElement, n = groups.get(p) || 0;
      var step = el.classList.contains('row') ? 60 : 80;
      el.style.setProperty('--d', Math.min(n, 5) * step + 'ms');
      groups.set(p, n + 1);
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.setAttribute('data-shown',''); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -20% 0px' });
    rv.forEach(function (el) { io.observe(el); });
    // belt and braces for WebKit, where IO can skip an entry after an instant jump: check on scroll too
    var pend = rv.slice(), ticking = false;
    var sweep = function () {
      ticking = false; var lim = innerHeight * 0.8;
      pend = pend.filter(function (el) { if (el.hasAttribute('data-shown')) return false;
        var r = el.getBoundingClientRect(); if (r.top < lim && r.bottom > 0) { el.setAttribute('data-shown',''); return false; } return true; });
      if (!pend.length) removeEventListener('scroll', onS);
    };
    var onS = function () { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } };
    addEventListener('scroll', onS, { passive: true }); sweep();
  }

  /* ---------- dock: hidden over the hero, the points and the form (they already hold the same actions) ---------- */
  var dock = d.getElementById('dock'), hero = d.getElementById('top');
  if (dock && 'IntersectionObserver' in window) {
    var seen = new Map();
    var priceEl = d.getElementById('price'), arriving = false;
    var upd = function () { var any = arriving; seen.forEach(function (v) { if (v) any = true; }); dock.classList.toggle('on', !any); };
    // also hidden over "under the glass" and while the price sheet is presented (its top edge still below 60 % of the screen)
    var dockTick = false, dockCheck = function () {
      dockTick = false; if (!priceEl) return; var a = priceEl.getBoundingClientRect().top / innerHeight > 0.6;
      if (a !== arriving) { arriving = a; upd(); }
    };
    addEventListener('scroll', function () { if (!dockTick) { dockTick = true; requestAnimationFrame(dockCheck); } }, { passive: true });
    addEventListener('resize', dockCheck); dockCheck();
    [[hero, 0.25], [d.getElementById('points'), 0], [d.getElementById('request'), 0]].forEach(function (pair) {
      if (!pair[0]) return; seen.set(pair[0], true);
      new IntersectionObserver(function (es) { seen.set(pair[0], es[0].isIntersecting); upd(); }, { threshold: pair[1] }).observe(pair[0]);
    });
  } else if (dock) { dock.classList.add('on'); }

  /* ---------- day dial ---------- */
  var day = d.getElementById('day'), needle = d.getElementById('needle'), track = needle && needle.parentElement;
  var timeEl = d.getElementById('dial-time'), laneB = d.getElementById('lane-b');
  var sky = [d.getElementById('sky1'), d.getElementById('sky2'), d.getElementById('sky3')];
  var caps = [].slice.call(d.querySelectorAll('#caps .cap')), capsBox = d.getElementById('caps'), capIdx = 0;
  var nowmark = d.getElementById('nowmark'), nowTxt = d.getElementById('dial-now');
  function hhmm(h) { var m = Math.round((h % 1) * 4) * 15, H = Math.floor(h); if (m === 60) { H++; m = 0; } return (H < 10 ? '0' : '') + H + ':' + (m < 10 ? '0' : '') + m; }
  function ramp(p, a, b) { var k = Math.max(0, Math.min(1, (p - a) / (b - a))); return k * k * (3 - 2 * k); }
  function setCap(i) {
    if (i === capIdx || !caps.length) return; capIdx = i;
    var swap = function () { caps.forEach(function (c, k) { c.classList.toggle('on', k === i); }); };
    if (RM || !capsBox.animate) { swap(); return; }
    capsBox.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: 'cubic-bezier(.4,0,.2,1)' }).onfinish = function () {
      swap(); capsBox.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'cubic-bezier(.23,1,.32,1)' });
    };
  }
  function setHour(h) {
    if (!track) return;
    var w = track.clientWidth, p = Math.max(0, Math.min(1, (h - 10) / 11));
    needle.style.transform = 'translate3d(' + (p * w) + 'px,0,0)';
    timeEl.textContent = hhmm(h);
    laneB.classList.toggle('closed', h >= 20);
    setCap(h >= 20.95 ? 2 : h >= 20 ? 1 : 0);
  }
  // 10:00 paper → 17:00 lilac dusk → 20:00 evening blue → 21:00 night
  function setSky(p) {
    sky[0].style.opacity = ramp(p, 0.45, 0.64).toFixed(3);
    sky[1].style.opacity = ramp(p, 0.62, 0.78).toFixed(3);
    sky[2].style.opacity = ramp(p, 0.86, 1).toFixed(3);
    day.classList.toggle('is-night', p >= 0.7);
  }
  function placeNow() {
    var n = window.__kyivNow;
    if (typeof n !== 'number' || !track) return;
    var inside = n >= 10 && n <= 21;
    nowmark.classList.toggle('on', inside);
    if (inside) nowmark.style.transform = 'translate3d(' + ((n - 10) / 11 * track.clientWidth) + 'px,0,0)';
    nowTxt.textContent = 'зараз у Києві ' + hhmm(Math.floor(n * 4) / 4) + (inside ? '' : ' · поза годинами');
  }
  placeNow(); setInterval(placeNow, 30000); addEventListener('resize', placeNow);

  if (RM || !window.gsap || !window.ScrollTrigger) {
    var n = window.__kyivNow; setHour(typeof n === 'number' && n >= 10 && n <= 21 ? n : 21);
    if (day) { day.classList.add('static-night'); day.classList.add('is-night'); }
  } else {
    var gsap = window.gsap; gsap.registerPlugin(window.ScrollTrigger);
    setHour(10);
    window.ScrollTrigger.create({
      trigger: d.querySelector('.day-scene'), start: 'top 10%', end: 'bottom bottom', scrub: true,
      onUpdate: function (s) { setHour(10 + 11 * s.progress); setSky(s.progress); },
      onRefresh: function (s) { setHour(10 + 11 * s.progress); setSky(s.progress); }
    });

    /* ---------- signature, part 2: the suction cup grips, the glass hinges, then lifts away ---------- */
    var glass = d.getElementById('glass'), shadow = d.getElementById('lift-shadow');
    var phone = matchMedia('(max-width: 760px)').matches, tilt = phone ? -16 : -22;
    gsap.set([glass, shadow], { transformPerspective: 1500, transformOrigin: '50% 0%' });
    var tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.4 } });
    tl.fromTo('#cup', { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 0.08 }, 0.03)
      .fromTo('.cup-ring', { scale: 1 }, { scale: 0.76, ease: 'expo.out', duration: 0.05 }, 0.1)
      .fromTo([glass, shadow], { rotationX: 0, yPercent: 0 }, { rotationX: -8, ease: 'power2.out', duration: 0.06 }, 0.16)
      .fromTo([shadow, '#edge'], { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: 0.06 }, 0.16)
      .to([glass, shadow], { rotationX: -8, duration: 0.08 }, 0.22)   /* the hinge holds — the glass is free */
      .to([glass, shadow], { rotationX: tilt, yPercent: -24, ease: 'none', duration: 0.7 }, 0.30);

    /* ---------- handoffs: every next section is a sheet presented over the previous one (iOS sheet grammar) ----------
       the scene underneath stays, steps back (scale) and dims — the sheet rises over it. Scrubbed, transform/opacity/filter only. */
    var recede = function (el, next, o) {
      if (!el || !next) return;
      gsap.set(el, { transformOrigin: o.origin });
      gsap.fromTo(el, { y: 0, scale: 1, filter: 'brightness(1)' },
        { y: function () { return innerHeight * o.lag; }, scale: o.scale, filter: o.dimFilter ? 'brightness(' + o.dimFilter + ')' : 'none', ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: o.end || 'top top', scrub: true, invalidateOnRefresh: true } });
    };
    // 1 · under the glass → price: the opened phone stays on the mat and steps back; the price sheet is presented over it
    var pin = d.querySelector('.under-pin'), priceSec = d.getElementById('price');
    if (pin && priceSec) {
      gsap.fromTo(pin, { scale: 1 }, { scale: phone ? 0.9 : 0.92, ease: 'none',
        scrollTrigger: { trigger: priceSec, start: 'top bottom', end: 'top top', scrub: true } });
      gsap.fromTo('.under-dim', { opacity: 0 }, { opacity: 0.62, ease: 'none',
        scrollTrigger: { trigger: priceSec, start: 'top bottom', end: 'top top', scrub: true } });
    }
    // 2 · the day at 21:00 → two points: the dial steps back under the points sheet
    recede(d.querySelector('.dial-col'), d.getElementById('points'), { origin: '50% 0%', lag: 0.22, scale: 0.92, dimFilter: 0.45, end: 'top 10%' });
    // 3 · points → request on a phone: the cards step back under the request sheet (on wider screens the chip flight carries this handoff)
    if (phone) recede(d.querySelector('.points .wrap'), d.getElementById('request'), { origin: '50% 100%', lag: 0.2, scale: 0.94, dimFilter: 0.45, end: 'top 10%' });

    /* ---------- handoff (≥761 px): the chosen point flies into the form as one opaque chip ----------
       one object the whole way: a dark plate (the card's own tone) lifts off the card, a white fill wipes in over 0.6–0.9
       and the label inverts through it (mix-blend difference) — no crossfading duplicates. */
    var src = d.querySelector('.point h3'), dstIn = d.querySelector('.seg input[name="pt"][value="a"]'), dst = dstIn && dstIn.nextElementSibling;
    if (src && dst && !phone) {
      var ghost = d.createElement('div'); ghost.className = 'ghost-chip'; ghost.setAttribute('aria-hidden', 'true');
      ghost.innerHTML = '<span class="g-plate"></span><span class="g-fill"></span><span class="g-txt">Dream Yellow</span>';
      d.body.appendChild(ghost);
      var gPlate = ghost.children[0], gFill = ghost.children[1], gTxt = ghost.children[2], A = null, B = null, plate0 = { x: 1, y: 1 };
      var measure = function () {
        var b = dst.getBoundingClientRect(), sy = scrollY, sx = scrollX, fs = parseFloat(getComputedStyle(dst).fontSize);
        [gPlate, gFill, gTxt].forEach(function (e) { e.style.width = b.width + 'px'; e.style.height = b.height + 'px'; e.style.fontSize = fs + 'px'; });
        var range = d.createRange(); range.selectNodeContents(src); var t = range.getBoundingClientRect();
        var k = parseFloat(getComputedStyle(src).fontSize) / fs;
        A = { x: t.left + t.width / 2 + sx - b.width * k / 2, y: t.top + t.height / 2 + sy - b.height * k / 2, s: k };
        B = { x: b.left + sx, y: b.top + sy, s: 1 };
        gTxt.style.width = 'auto'; var textW = Math.min(gTxt.scrollWidth, b.width); gTxt.style.width = b.width + 'px';
        plate0 = { x: Math.min(1, (textW + 28) / b.width), y: Math.min(1, (fs * 1.3 + 14) / b.height) };
      };
      var place = function (p) {
        if (!A) measure();
        var e = p * p * (3 - 2 * p), arc = Math.sin(Math.PI * e) * 24;
        var x = A.x + (B.x - A.x) * e + arc, y = A.y + (B.y - A.y) * e, sc = A.s + (B.s - A.s) * e;
        var live = p > 0.001 && p < 0.999;
        ghost.style.opacity = live ? 1 : 0;
        ghost.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + sc + ')';
        var plate = 'scale(' + (plate0.x + (1 - plate0.x) * e).toFixed(4) + ',' + (plate0.y + (1 - plate0.y) * e).toFixed(4) + ')';
        gPlate.style.transform = plate; gFill.style.transform = plate;
        var w = Math.max(0, Math.min(1, (p - 0.6) / 0.3)); w = 1 - Math.pow(1 - w, 3);
        gFill.style.clipPath = 'inset(0 ' + ((1 - w) * 100).toFixed(2) + '% 0 0 round 12px)';
        src.style.opacity = live ? 0 : 1;
        dst.style.opacity = live ? 0 : 1;
      };
      window.ScrollTrigger.create({
        trigger: '#request', start: 'top 70%', end: 'top 20%', scrub: 0.5,
        onUpdate: function (s) { place(s.progress); }, onRefresh: function (s) { measure(); place(s.progress); }
      });
    }
    addEventListener('load', function () { window.ScrollTrigger.refresh(); });
  }

  /* ---------- copy address ---------- */
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    return new Promise(function (ok, no) {
      var t = d.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
      d.body.appendChild(t); t.select(); try { d.execCommand('copy') ? ok() : no(); } catch (e) { no(e); } d.body.removeChild(t);
    });
  }
  d.querySelectorAll('.copy').forEach(function (b) {
    var label = b.textContent;
    b.addEventListener('click', function () {
      copy(b.dataset.copy).then(function () { b.textContent = 'Скопійовано'; }, function () { b.textContent = b.dataset.copy; });
      setTimeout(function () { b.textContent = label; }, 1800);
    });
  });

  /* ---------- request text ---------- */
  var form = d.getElementById('form'), msg = d.getElementById('msg'), call = d.getElementById('call'), ig = d.getElementById('ig'), hint = d.getElementById('hint');
  var PT = { a: { name: 'Dream Yellow (Оболонський проспект, 1Б)', tel: '+380960686111', show: '096 068 61 11' },
             b: { name: 'Дніпровська набережна, 20А', tel: '+380960686112', show: '096 068 61 12' } };
  function build() {
    var f = new FormData(form), pt = PT[f.get('pt')] || PT.a;
    var what = (f.get('what') || '').toString().trim(), name = (f.get('name') || '').toString().trim();
    var t = 'Добрий день! ' + f.get('dev') + ' на ремонт.\n' + (what ? what : '(опишіть модель і що сталося)') + '\nЗручна точка: ' + pt.name + '.' + (name ? '\n' + name : '');
    msg.textContent = t;
    call.href = 'tel:' + pt.tel; call.textContent = 'Подзвонити · ' + pt.show;
    return t;
  }
  if (form) {
    form.addEventListener('input', build); form.addEventListener('change', build); build();
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    ig.addEventListener('click', function () {
      var t = build();
      copy(t).then(function () { hint.textContent = 'Текст скопійовано — вставте його в повідомлення @lux.serviceua.'; },
                   function () { hint.textContent = 'Скопіюйте текст заявки вище й надішліть @lux.serviceua.'; });
    });
  }
})();
