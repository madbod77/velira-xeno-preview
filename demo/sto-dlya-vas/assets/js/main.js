/* Шаблон сайту для СТО — концепт Velira «Одометр боксу». Місця під дані власника позначені пунктиром.
   Без JS сторінка повна; тут — стан боксу за ПРИКЛАДОМ графіка, аркуш знизу, колесо послуг і сцени прокрутки. */
(function () {
  'use strict';
  var d = document.documentElement;
  var mx = window.__mx || { landed: 0, cbs: [] };
  mx.ready = 1;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;

  /* Без GSAP руху немає: знімаємо клас — лишається звичайна сторінка */
  if (!gsap || !ScrollTrigger) d.classList.remove('motion');
  var MOTION = d.classList.contains('motion');
  var rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var wide = window.matchMedia('(min-width: 1024px)');
  var onRm = function () { window.location.reload(); };
  if (rmq.addEventListener) rmq.addEventListener('change', onRm); else if (rmq.addListener) rmq.addListener(onRm);

  var buzz = function () { try { if (navigator.vibrate) navigator.vibrate(8); } catch (e) {} };

  /* =========================================================
     1. Стан боксу: похідна від прикладу графіка Пн–Пт 9:00–19:00, час Києва (власник впише свій)
     ========================================================= */
  var OPEN = 9 * 60, CLOSE = 19 * 60;
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var DAY_IN = ['', 'у понеділок', 'у вівторок', 'у середу', 'у четвер', 'у п’ятницю'];
  var fmt = null, fmtK = null, fmtL = null;
  function kyiv(date) {
    if (!fmt) {
      var o = { weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' };
      try { o.timeZone = 'Europe/Kyiv'; fmt = new Intl.DateTimeFormat('en-GB', o); }
      catch (e) { o.timeZone = 'Europe/Kiev'; fmt = new Intl.DateTimeFormat('en-GB', o); }
    }
    var p = {};
    fmt.formatToParts(date).forEach(function (x) { p[x.type] = x.value; });
    return { dow: DAYS.indexOf(p.weekday) + 1, min: (parseInt(p.hour, 10) % 24) * 60 + parseInt(p.minute, 10) };
  }
  /* глядач в іншому поясі: його «сьогодні» може бути не київським — тоді називаємо день, а не «сьогодні / завтра» */
  function abroad(date) {
    try {
      if (!fmtK) {
        try { fmtK = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Kyiv' }); }
        catch (e) { fmtK = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Kiev' }); }
        fmtL = new Intl.DateTimeFormat('en-CA');
      }
      return fmtK.format(date) !== fmtL.format(date);
    } catch (e) { return false; }
  }
  function stateAt(date) {
    date = date || new Date();
    var k = kyiv(date), work = k.dow >= 1 && k.dow <= 5, far = abroad(date);
    var s = { open: false, group: work ? 'wk' : 'we', frac: null, text: '', src: far ? 'приклад графіка, час Києва' : 'приклад графіка' };
    if (work && k.min >= OPEN && k.min < CLOSE) {
      s.open = true; s.frac = (k.min - OPEN) / (CLOSE - OPEN); s.text = 'Відчинено · до 19:00';
    } else if (work && k.min < OPEN) s.text = 'Зачинено · ' + (far ? DAY_IN[k.dow] : 'сьогодні') + ' з 9:00';
    else if (k.dow === 5 || k.dow === 6) s.text = 'Зачинено · у понеділок з 9:00';
    else s.text = 'Зачинено · ' + (far ? DAY_IN[k.dow === 7 ? 1 : k.dow + 1] : 'завтра') + ' з 9:00';
    return s;
  }
  window.StoTemplate = { stateAt: stateAt };

  var stateEls = $$('[data-state]'), chipLamp = $('[data-chip-lamp]'), dayMarks = $$('[data-day-mark]');
  var lastState = '';
  function renderState(reveal) {
    var s;
    try { s = stateAt(); } catch (e) { return null; }   /* без Intl лишається рядок графіка */
    var key = s.text + '|' + s.src + '|' + (s.frac === null ? '' : s.frac.toFixed(3));
    if (key === lastState) return s;
    lastState = key;
    d.classList.toggle('is-closed', !s.open);
    stateEls.forEach(function (el) {
      var t = $('[data-state-text]', el), src = $('[data-state-src]', el);
      var w0 = reveal && el.hasAttribute('data-intro-lamp') ? el.offsetWidth : 0;
      el.setAttribute('data-open', s.open ? '1' : '0');
      if (t && t.textContent !== s.text) t.textContent = s.text;
      if (src) { src.hidden = false; if (src.textContent !== s.src) src.textContent = s.src; }
      /* капсула відкривається до нової ширини, а не стрибає */
      if (w0 && el.animate) {
        var w1 = el.offsetWidth;
        if (w1 - w0 > 8) el.animate([{ clipPath: 'inset(0px ' + (w1 - w0) + 'px 0px 0px round 26px)' }, { clipPath: 'inset(0px 0px 0px 0px round 26px)' }],
          { duration: 260, easing: 'cubic-bezier(.16,1,.3,1)' });
      }
    });
    if (chipLamp) chipLamp.setAttribute('data-open', s.open ? '1' : '0');
    dayMarks.forEach(function (m) {
      m.classList.toggle('is-on', s.open);
      if (s.open) m.style.setProperty('--now', s.frac.toFixed(3));
    });
    return s;
  }

  /* =========================================================
     2. Інтро: CSS-keyframes уже йдуть; тут — підміна тексту стану й пропуск
     ========================================================= */
  var introOn = d.classList.contains('intro'), skipping = false;
  var INPUT = ['pointerdown', 'touchstart', 'wheel', 'keydown', 'scroll'];
  var introTimers = [];
  function introEnd() {
    if (!introOn) return;
    introOn = false;
    introTimers.forEach(clearTimeout);
    if (mx.safety) clearTimeout(mx.safety);
    INPUT.forEach(function (t) { window.removeEventListener(t, introSkip, true); });
    d.classList.remove('intro', 'intro-go', 'intro-land');
    renderState();
  }
  function introSkip() {
    if (!introOn || skipping) return;
    skipping = true;
    /* не склейка, а докрутка: решта інтро дограється за ≈ 0,2 с */
    d.classList.add('intro-go', 'intro-land');
    try {
      document.getAnimations().forEach(function (a) { if (/^(odo|lamp)-/.test(a.animationName || '')) a.playbackRate = 7; });
    } catch (e) {}
    introTimers.forEach(clearTimeout);
    introTimers.push(setTimeout(function () { renderState(true); }, 180));
    introTimers.push(setTimeout(introEnd, 270));
  }
  if (introOn) {
    var afterLand = function () {
      if (skipping) return;
      var t = performance.now() - mx.landed;
      introTimers.push(setTimeout(function () { renderState(true); }, Math.max(0, 1380 - t)));   /* на піку спалаху лампи */
      introTimers.push(setTimeout(introEnd, Math.max(0, 1800 - t)));
    };
    if (mx.landed) afterLand(); else mx.cbs.push(afterLand);
    INPUT.forEach(function (t) { window.addEventListener(t, introSkip, { capture: true, passive: true }); });
    /* сторінку відновили вже прокрученою: інтро не грає (читаємо прокрутку після першого кадру, щоб не змушувати розкладку) */
    requestAnimationFrame(function () { if (introOn && window.pageYOffset > 4) { skipping = true; introEnd(); } });
  } else renderState();
  setInterval(function () { if (!document.hidden && !introOn) renderState(); }, 30000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden && !introOn) renderState(); });

  /* =========================================================
     3. Аркуш знизу «Бокс»
     ========================================================= */
  var dlg = $('#box-sheet'), chip = $('[data-chip]'), panel = $('[data-bs-panel]');
  var closing = null;
  function sheetOpen() {
    if (!dlg || dlg.open) return;
    renderState();
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    requestAnimationFrame(function () { requestAnimationFrame(function () { dlg.classList.add('is-open'); }); });
  }
  function sheetClose() {
    if (!dlg || !dlg.open || closing) return;
    dlg.classList.add('is-closing'); dlg.classList.remove('is-open');
    panel.style.transform = ''; panel.style.transition = '';
    closing = setTimeout(function () {
      closing = null; dlg.classList.remove('is-closing');
      if (dlg.close) dlg.close(); else dlg.removeAttribute('open');
      if (chip) chip.focus({ preventScroll: true });
    }, rmq.matches ? 160 : 270);
  }
  if (dlg) {
    if (chip) chip.addEventListener('click', sheetOpen);
    $('[data-bs-close]').addEventListener('click', sheetClose);
    dlg.addEventListener('cancel', function (e) { e.preventDefault(); sheetClose(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) sheetClose(); });
    /* дії аркуша в шаблоні ще порожні: аркуш закривається, сторінка їде до пояснення «що тут стане вашим» */
    $$('[data-bs-go]', dlg).forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault(); sheetClose();
        setTimeout(function () { var t = $('#shablon'); if (t) t.scrollIntoView({ behavior: rmq.matches ? 'auto' : 'smooth' }); }, rmq.matches ? 180 : 290);
      });
    });
    /* перетягування вниз 1 : 1 з пальцем: за ручку — одразу, за тіло аркуша — після 6 px руху вниз (не з кнопок і посилань) */
    var grab = $('[data-bs-grab]'), drag = null, dragStop = false;
    panel.addEventListener('pointerdown', function (e) {
      if (drag || rmq.matches || (e.pointerType === 'mouse' && e.button !== 0)) return;
      var onGrab = grab.contains(e.target);
      if (!onGrab && e.target.closest('a,button')) return;
      drag = { id: e.pointerId, y: e.clientY, dy: 0, v: 0, ly: e.clientY, lt: performance.now(), live: onGrab };
      if (onGrab) { try { panel.setPointerCapture(e.pointerId); } catch (err) {} panel.style.transition = 'none'; }
    });
    panel.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var now = performance.now(), dy = e.clientY - drag.y;
      if (!drag.live) {
        if (dy < 6) { if (dy < -12) drag = null; return; }
        drag.live = true; drag.y = e.clientY - 1; dy = 1;
        try { panel.setPointerCapture(e.pointerId); } catch (err) {}
        panel.style.transition = 'none';
      }
      if (now > drag.lt) drag.v = (e.clientY - drag.ly) / (now - drag.lt);
      drag.ly = e.clientY; drag.lt = now;
      drag.dy = dy < 0 ? dy / 6 : dy;                       /* вгору — з опором */
      panel.style.transform = 'translateY(' + drag.dy.toFixed(1) + 'px)';
    });
    var dragEnd = function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var g = drag; drag = null;
      if (!g.live) return;
      panel.style.transition = '';
      dragStop = true; setTimeout(function () { dragStop = false; }, 60);
      if (g.dy > panel.offsetHeight * 0.3 || (g.v > 0.5 && performance.now() - g.lt < 90)) sheetClose();
      else panel.style.transform = '';
    };
    panel.addEventListener('pointerup', dragEnd);
    panel.addEventListener('pointercancel', dragEnd);
    panel.addEventListener('click', function (e) { if (dragStop) { e.preventDefault(); e.stopPropagation(); } }, true);
  }

  /* =========================================================
     4. Коли: сегмент і барабани часу
     ========================================================= */
  var seg = $('.seg'), segBtns = $$('.seg__btn'), clocks = $$('[data-clock]'), hoursLive = $('[data-hours-live]');
  var days = 'wk', faceHold = 0, faceSec = 'a';
  var TDELAY = { a: [0, 60, 110], b: [190, 240, 280, 310] };
  $$('.trow').forEach(function (row) {
    var dl = TDELAY[row.getAttribute('data-trow')] || [];
    $$('.drum__sharp', row).forEach(function (sh, i) { sh.style.setProperty('--rd', (dl[i] || 0) + 'ms'); });
  });
  function setDays(v, silent) {
    days = v;
    if (seg) seg.setAttribute('data-on', v);
    segBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-days') === v ? 'true' : 'false'); });
    clocks.forEach(function (c) { c.classList.toggle('is-we', v === 'we'); });
    if (hoursLive && !silent) hoursLive.textContent = v === 'we' ? 'Сб–Нд: вихідні (приклад)' : 'Пн–Пт: 9:00–19:00 (приклад)';
    meterSync();
  }
  segBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-days');
      if (v === days) return;
      setDays(v); buzz();
      /* ПК: відповідь на сегмент живе в приладі ліворуч — показуємо грань часу й тримаємо її 2,5 с */
      if (wide.matches && faces.a) {
        faceHold = performance.now() + 2500;
        setFace('b');
        setTimeout(function () { if (performance.now() >= faceHold - 20) { faceHold = 0; setFace(faceSec); } }, 2520);
      }
    });
  });

  /* =========================================================
     5. Що турбує: картка послуги, барабан ціни, колесо
     ========================================================= */
  var turbuie = $('#turbuie'), services = $('[data-services]'), svcs = services ? $$('.svc', services) : [];
  var names = svcs.map(function (li) { return $('h3', li).textContent.replace(/\s+/g, ' '); });
  var descs = svcs.map(function (li) { return $('h3 + p', li).textContent.replace(/\s+/g, ' ').trim(); });
  var priceDrums = $$('[data-price-drum]'), priceCap = $('[data-price-cap]');
  var svcLive = $('[data-svc-live]'), tray = $('[data-tray]');
  var LAST = svcs.length - 1, BR = Math.max(0, svcs.indexOf($('[data-brakes]')));
  var shown = BR, pickerOn = false, swapTween = null;
  /* цін у шаблоні немає: вікно завжди з рисками й підписом */
  var CAP_NOTE = 'ціну впишете\u00a0ви';

  function applyService(i) {
    svcs.forEach(function (li, k) {
      li.classList.toggle('is-on', k === i);
      if (k === i) li.removeAttribute('inert'); else li.setAttribute('inert', '');
    });
  }
  function setPrice() {
    priceDrums.forEach(function (dr) { dr.classList.add('is-blank'); });
    if (priceCap) { priceCap.textContent = CAP_NOTE; priceCap.className = 'note note--in'; }
  }
  function showService(i, announce) {
    if (i === shown) return;
    shown = i;
    setPrice(i);
    meterSync();
    if (tray && pickerOn) tray.classList.toggle('is-rest', shown !== BR);
    if (announce && svcLive) svcLive.textContent = names[i] + '. ' + descs[i];
    if (!pickerOn) return;
    if (swapTween) swapTween.kill();
    swapTween = gsap.timeline()
      .to(services, { opacity: 0, duration: 0.09, ease: 'power1.in' })
      .add(function () { applyService(shown); })
      .to(services, { opacity: 1, duration: 0.15, ease: 'power1.out' });
  }

  /* --- Колесо: предмет у потоці. Прокрутка сторінки його не крутить і не перехоплюється ним:
         крок — дотиком над/під лінзою (стрілки на ободі), мишею можна тягнути. Колесо завжди сидить у фіксаторі. --- */
  var wheelApi = null;
  function buildWheel() {
    var picker = $('[data-picker]'), wheel = $('.wheel'), cyl = $('[data-cyl]'), knurl = $('[data-knurl]');
    var zonePrev = $('.picker__zone--prev'), zoneNext = $('.picker__zone--next');
    if (!picker || !cyl) return null;
    pickerOn = true;                                   /* розкладка «колесо + одна картка» стоїть із першого малювання (клас .motion) */
    applyService(BR); setPrice(BR);
    /* «Гальмівна система» вибрана з початку: її рядок потім лягає на лоток */
    var rows = names.map(function (n) {
      var s = document.createElement('span'); s.className = 'wheel__row'; s.textContent = n; cyl.appendChild(s); return s;
    });
    var R = 150, ROW = 52, STEP = 20;
    var user = { a: 0 }, sel = BR, tween = null, touched = false, lastA = null;
    function geometry() {
      R = parseFloat(getComputedStyle(wheel).getPropertyValue('--wr')) || 150;
      ROW = rows[0].offsetHeight || 52;
      STEP = ROW / R * 180 / Math.PI;
      var o = '50% 50% ' + (-R) + 'px';
      cyl.style.transformOrigin = o;
      rows.forEach(function (r, i) { r.style.transformOrigin = o; r.style.transform = 'rotateX(' + (-i * STEP).toFixed(3) + 'deg)'; });
      if (tween) tween.kill();
      user.a = sel * STEP; lastA = null; render();
    }
    function render() {
      var a = user.a;
      if (lastA !== null && Math.abs(a - lastA) < 0.01) return;
      lastA = a;
      cyl.style.transform = 'rotateX(' + a.toFixed(2) + 'deg)';
      rows.forEach(function (r, i) {                       /* грані за 66° — вузькі смужки: ховаємо їх цілком */
        var v = Math.abs(i * STEP - a) <= 66;
        if (r._v !== v) { r._v = v; r.style.visibility = v ? 'visible' : 'hidden'; }
      });
      var shift = (a / STEP * ROW) % 8;
      knurl.style.transform = 'translateY(' + (-shift).toFixed(1) + 'px)';
      var k = clamp(Math.round(a / STEP), 0, LAST);
      if (k !== shown) showService(k, true);
    }
    function zones() {
      var onPrev = document.activeElement === zonePrev, onNext = document.activeElement === zoneNext;
      zonePrev.disabled = sel === 0; zoneNext.disabled = sel === LAST;
      if (onPrev && zonePrev.disabled) zoneNext.focus({ preventScroll: true });
      if (onNext && zoneNext.disabled) zonePrev.focus({ preventScroll: true });
    }
    function goTo(i, base) {
      i = clamp(i, 0, LAST);
      var to = i * STEP, dist = Math.abs(to - user.a) / STEP, dir = to >= user.a ? 1 : -1;
      sel = i; zones();
      if (tween) tween.kill();
      if (dist < 0.02) { user.a = to; render(); return; }
      var D = Math.min(0.56, (base || 0.26) + 0.07 * Math.max(0, dist - 1));
      tween = gsap.timeline({ onUpdate: render })
        .to(user, { a: to + 1.2 * dir, duration: D * 0.72, ease: 'expo.out' })
        .to(user, { a: to, duration: D * 0.28, ease: 'power1.inOut' });
    }
    function step(dir) { touched = true; goTo(sel + dir); buzz(); }
    [zonePrev, zoneNext].forEach(function (z) {
      var dir = parseInt(z.getAttribute('data-step'), 10);
      z.addEventListener('click', function () { if (suppressClick) { suppressClick = false; return; } step(dir); });
      z.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp') { e.preventDefault(); if (sel > 0) step(-1); }
        if (e.key === 'ArrowDown') { e.preventDefault(); if (sel < LAST) step(1); }
      });
    });

    /* Перетягування — лише мишею (на дотику палець гортає сторінку: колесо не стає пасткою прокрутки) */
    var dragW = null, suppressClick = false;
    picker.addEventListener('pointerdown', function (e) {
      if (dragW || e.pointerType !== 'mouse' || e.button !== 0) return;
      dragW = { id: e.pointerId, y: e.clientY, a: user.a, live: false, sel0: sel, hist: [[performance.now(), e.clientY]] };
    });
    picker.addEventListener('pointermove', function (e) {
      if (!dragW || e.pointerId !== dragW.id) return;
      var dy = e.clientY - dragW.y;
      if (!dragW.live) {
        if (Math.abs(dy) < 6) return;
        dragW.live = true; touched = true; if (tween) tween.kill();
        try { picker.setPointerCapture(e.pointerId); } catch (err) {}
      }
      var a = dragW.a - dy / ROW * STEP, max = LAST * STEP;
      if (a < 0) a = a / 3; else if (a > max) a = max + (a - max) / 3;   /* м'який упор на краях */
      user.a = a; render();
      dragW.hist.push([performance.now(), e.clientY]);
      if (dragW.hist.length > 6) dragW.hist.shift();
    });
    var dEnd = function (e) {
      if (!dragW || e.pointerId !== dragW.id) return;
      var g = dragW; dragW = null;
      if (!g.live) return;
      suppressClick = true;
      setTimeout(function () { suppressClick = false; }, 60);
      var h = g.hist, v = 0;
      if (h.length > 1) { var a0 = h[0], a1 = h[h.length - 1]; if (a1[0] > a0[0] && performance.now() - a1[0] < 90) v = (a1[1] - a0[1]) / (a1[0] - a0[0]); }
      var proj = user.a - v * 180 / ROW * STEP;
      goTo(clamp(Math.round(proj / STEP), Math.max(0, g.sel0 - 3), Math.min(LAST, g.sel0 + 3)), 0.42);
    };
    picker.addEventListener('pointerup', dEnd);
    picker.addEventListener('pointercancel', dEnd);

    geometry(); zones();
    return { geometry: geometry };
  }

  /* =========================================================
     6. ПК: «прилад» перекручується за порогом секції
     ========================================================= */
  var faces = { a: $('[data-face="a"]'), b: $('[data-face="b"]'), c: $('[data-face="c"]'), d: $('[data-face="d"]') };
  var meterLabel = $('[data-meter-label]'), meterLabelBox = meterLabel ? meterLabel.parentNode : null;
  var meterCap = $('[data-meter-cap]'), meterEl = $('.meter');
  var faceNow = 'a', faceWant = 'a', faceBusy = false;
  /* грань «а»: пунктирне місце під адресу — розмітка з HTML; бирка номера на склі видна лише на цій грані */
  var ADDR_HTML = meterLabel ? meterLabel.innerHTML : '', labelFace = 'a';
  function meterTexts(f) {
    if (!meterLabel) return;
    if (f === 'a') { if (labelFace !== 'a') meterLabel.innerHTML = ADDR_HTML; }
    else meterLabel.textContent = f === 'b' ? (days === 'we' ? 'Сб–Нд' : 'Пн–Пт') : f === 'd' ? 'Як ми працюємо' : names[shown];
    labelFace = f;
    if (meterEl) meterEl.setAttribute('data-face', f);
    if (meterCap) {
      var cap = f === 'c' ? CAP_NOTE : f === 'd' ? 'приклад — впишете свої' : '';
      meterCap.hidden = !cap;
      meterCap.textContent = cap;
      meterCap.className = 'meter__cap' + (cap ? ' note' : '');
    }
  }
  function meterSync() { if (!faceBusy) meterTexts(faceNow); }
  function setFace(f) {
    faceWant = f;
    if (!faces.a || faceBusy || f === faceNow) return;
    var from = faces[faceNow], to = faces[f];
    if (!MOTION) {
      from.classList.remove('is-on'); to.classList.add('is-on'); faceNow = f; meterTexts(f); return;
    }
    faceBusy = true;
    from.classList.add('is-out');                       /* цифри йдуть у порожні пластини, 160 мс */
    meterLabelBox.classList.add('is-swap');
    setTimeout(function () {
      to.classList.add('is-out');
      from.classList.remove('is-on'); to.classList.add('is-on');
      faceNow = f; meterTexts(f); meterLabelBox.classList.remove('is-swap');
      requestAnimationFrame(function () { requestAnimationFrame(function () { to.classList.remove('is-out'); }); });
      setTimeout(function () {
        from.classList.remove('is-out'); faceBusy = false; meterTexts(faceNow);
        if (faceWant !== faceNow) setFace(faceWant);
      }, 430);
    }, 175);
  }
  if (faces.a) {
    [0, 60, 110, 150].forEach(function (ms, i) { var sh = $$('.drum__sharp', faces.a)[i]; if (sh) sh.style.setProperty('--rd', ms + 'ms'); });
    if ('IntersectionObserver' in window) {
      /* лоток — вікно ціни вибраної послуги, правила — пластина «правила», «Як нас знайти» — знову адреса й бокс */
      var FACE = { box: 'a', koly: 'b', turbuie: 'c', potribne: 'c', chomu: 'd', doroha: 'a' };
      var mid = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (!en.isIntersecting || !FACE[en.target.id]) return;
          faceSec = FACE[en.target.id];
          if (performance.now() < faceHold) return;         /* щойно натиснули сегмент: грань часу ще тримається */
          setFace(faceSec);
        });
      }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
      $$('main > section').forEach(function (s) { mid.observe(s); });
    }
  }

  /* =========================================================
     7. Початкові стани
     ========================================================= */
  var s0 = null;
  try { s0 = stateAt(); } catch (e) {}
  setDays(s0 ? s0.group : 'wk', true);
  if (hoursLive) hoursLive.textContent = days === 'we' ? 'Сб–Нд: вихідні (приклад)' : 'Пн–Пт: 9:00–19:00 (приклад)';

  var dock = $('[data-dock]');
  var io = 'IntersectionObserver' in window;
  /* панель ховається, щойно перша дія фіналу («Тут ваш маршрут») доходить до 95 % висоти екрана: двох однакових кнопок поруч не буває */
  if (dock && io) {
    var stop = $('[data-dock-stop]');
    new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var away = en.isIntersecting || en.boundingClientRect.top < (en.rootBounds ? en.rootBounds.bottom : window.innerHeight);
        dock.classList.toggle('is-away', away);
        if (away) dock.setAttribute('inert', ''); else dock.removeAttribute('inert');
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: [0, 1] }).observe(stop);
  }

  if (!MOTION) {
    /* Без руху: чип у панелі вмикається миттєво, коли герой і велике вікно «Як нас знайти» поза екраном */
    if (dock && io && chip) {
      var seen = { box: true, home: false };
      var chipSync = function () {
        var on = !seen.box && !seen.home;
        dock.classList.toggle('is-chip', on);
        chip.tabIndex = on ? 0 : -1;
      };
      var cio = new IntersectionObserver(function (es) {
        es.forEach(function (en) { seen[en.target.id === 'box' ? 'box' : 'home'] = en.isIntersecting; });
        chipSync();
      }, { threshold: 0 });
      cio.observe($('#box')); cio.observe($('.odo-home'));
    }
    return;
  }

  /* =========================================================
     8. Рух: GSAP + ScrollTrigger (усе нижче — лише без prefers-reduced-motion)
     ========================================================= */
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  /* Сцени збираються трьома короткими завданнями після першого кадру: жодного довгого завдання після старту */
  var later = function (fn) { setTimeout(fn, 0); };
  var mm = null;
  requestAnimationFrame(function () { later(function () { wheelApi = buildWheel(); rulesIn(); later(scenes); }); });
  /* вирізи деталей розкодовуються заздалегідь, поза головним потоком: лоток в'їжджає вже з усіма чотирма */
  var predecode = function () {
    $$('.part').forEach(function (img) {
      if (!img.decode) return;
      var pr = img.decode();
      if (pr && pr.then) pr.then(null, function () {});
    });
  };
  if (document.readyState === 'complete') setTimeout(predecode, 300);
  else window.addEventListener('load', function () { setTimeout(predecode, 300); });

  var offs = function (el, stop) {
    var x = 0, y = 0;
    while (el && el !== stop) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
    return { x: x, y: y };
  };
  var checkLamp = function (lamp) {
    if (!lamp) return;
    lamp.classList.remove('is-check'); void lamp.offsetWidth; lamp.classList.add('is-check');
  };

  /* пластини правил докручуються разом із прокруткою, поки блок входить знизу: порожнього вікна в спокої не буває */
  var rules = $('[data-rules]');
  function rulesIn() {
    if (!rules) return;
    $$('.rule', rules).forEach(function (r, i) {
      var word = $('.rule__word', r), win = $('.rule__win', r);
      /* immediateRender: false — поки прокрутка не дійшла до вікна, слово стоїть на місці (повний знімок, друк, пошук) */
      gsap.fromTo(word, { yPercent: 64 }, { yPercent: 0, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: win, start: 'top 100%', end: 'top ' + (80 - i * 3) + '%', scrub: 0.3 } });
    });
  }

  /* ---------- Сцена лотка й передача «рядок лягає на лоток» ---------- */
  function trayScenes(scrub) {
    var sec = $('#potribne'), stage = $('[data-stage]'), tag = $('[data-tag]'), card = $('[data-brakes]');
    var para = $('p', card), order = ['pads', 'disc', 'fluid', 'caliper'];
    var labels = order.map(function (k) { return $('[data-label="' + k + '"]'); });
    var L = {};
    /* GSAP згортає CSS-властивість translate у transform: центрування задаємо явно, у відсотках */
    gsap.set($$('.part, .part__shadow', tray), { xPercent: -50, yPercent: -50, x: 0, y: 0 });
    gsap.set(tag, { xPercent: -50, yPercent: -50, x: 0, y: 0, rotation: -4, opacity: 0 });
    tray.classList.toggle('is-rest', shown !== BR);
    var measure = function () {
      var sy = window.pageYOffset, secLeft = sec.getBoundingClientRect().left;
      var secTop = sec.getBoundingClientRect().top + sy + (parseFloat(getComputedStyle(sec).paddingTop) || 0);
      order.forEach(function (k, i) {
        var lab = labels[i], w = $('[data-part="' + k + '"]'), wr = w.getBoundingClientRect(), txt = lab.firstElementChild;
        var o = offs(lab, stage);                              /* домівка підпису — у природному місці сцени, не в закріпленому */
        var hx = secLeft + stage.offsetLeft + o.x + txt.offsetWidth / 2, hy = secTop + o.y + lab.offsetHeight / 2;
        var fs = parseFloat(getComputedStyle(w).fontSize) / parseFloat(getComputedStyle(lab).fontSize);
        L[k] = { dx: wr.left + wr.width / 2 - hx, dy: wr.top + wr.height / 2 + sy - hy, s: fs || 1 };
      });
    };
    measure();
    ScrollTrigger.addEventListener('refreshInit', measure);

    /* Передача: рядок «Колодки, диски, рідина, супорти» відривається від картки й по одному слову лягає на верх лотка */
    /* старт — коли картка пройшла всю зону читання (верх лотка на 0,37 екрана: речення видно цілим ≥ 0,6 екрана прокрутки);
       посадка — до того, як сцена закріпиться */
    var stick = function () { return parseFloat(getComputedStyle(stage).top) || 0; };
    var drop = function () { return Math.max(140, Math.min(300, window.innerHeight * 0.37 - stick() - 12)); };
    /* речення, що віддало слова лотку й згасло, вимкнене (inert): той самий текст тепер підписи деталей і фраза під лотком */
    var gone = false;
    var tl3 = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: sec, start: 'top 37%', end: function () { return '+=' + drop(); }, scrub: scrub, invalidateOnRefresh: true },
      onUpdate: function () {
        var g = tl3.progress() >= 0.1;
        if (g !== gone) { gone = g; if (g) para.setAttribute('inert', ''); else para.removeAttribute('inert'); }
      }
    });
    gsap.set(labels, { transformOrigin: '50% 50%' });
    tl3.fromTo(labels, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0)
      .fromTo(para, { opacity: 1 }, { opacity: 0, duration: 0.13 }, 0.01)        /* решта речення гасне до того, як слова рушать */
      .fromTo(card, { opacity: 1 }, { opacity: 0, duration: 0.4 }, 0.52);         /* скло картки тане останнім: слова падають із неї, а не з порожнечі */
    order.forEach(function (k, i) {
      var lab = labels[i], at = 0.15 + i * 0.1, dur = 0.5;
      tl3.fromTo(lab, { y: function () { return L[k].dy; } }, { y: 0, duration: dur, ease: 'power2.inOut' }, at)           /* падають по одному, зліва направо */
        .fromTo(lab, { x: function () { return L[k].dx; } }, { x: 0, duration: 0.8, ease: 'power1.inOut' }, 0.15)          /* розходяться разом: порядок слів не ламається */
        .fromTo(lab, { scale: function () { return L[k].s; } }, { scale: 1, duration: dur }, at);
    });
    tl3.to({}, { duration: 0.001 }, 0.999);

    /* Сцена: три справні деталі по черзі «повертаються на авто» (лампа біля слова — зелена), зношені колодки лишаються */
    var travel = function () { return Math.max(0, sec.offsetHeight - stage.offsetHeight); };
    var tlS = null, lamps = {}, on = {};
    if (travel() > 120) {
      var LIFT = [['caliper', 0.05, 0.27, 7], ['disc', 0.2, 0.44, -8], ['fluid', 0.36, 0.58, -5]], Q_TAG = 0.64;
      var pads = $('[data-part-img="pads"]'), padsSh = $('[data-shadow="pads"]');
      LIFT.forEach(function (x) { lamps[x[0]] = $('[data-ok="' + x[0] + '"]'); gsap.set(lamps[x[0]], { scale: 0 }); });
      var flip = function (key, want, fn) { if (!!on[key] !== want) { on[key] = want; fn(want); } };
      tlS = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: sec, start: function () { return 'top ' + stick() + 'px'; }, end: function () { return '+=' + travel(); }, scrub: scrub, invalidateOnRefresh: true },
        onUpdate: function () {
          var q = tlS.progress();
          LIFT.forEach(function (x) {
            flip(x[0], q >= x[1] - 0.035, function (w) {
              gsap.to(lamps[x[0]], { scale: w ? 1 : 0, duration: w ? 0.26 : 0.12, ease: w ? 'back.out(2.6)' : 'power1.in', overwrite: true });
              if (w) checkLamp(lamps[x[0]]);
            });
          });
          flip('tag', q >= Q_TAG, function (w) {
            if (w) {
              gsap.fromTo(tag, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.26, ease: 'back.out(2.4)', overwrite: true });
              gsap.to(pads, { scale: 1.05, duration: 0.3, ease: 'expo.out', overwrite: true });
              gsap.to(padsSh, { scale: 1.1, opacity: 1, duration: 0.3, ease: 'expo.out', overwrite: true });
            } else {
              gsap.to(tag, { opacity: 0, duration: 0.15, ease: 'power1.in', overwrite: true });
              gsap.to(pads, { scale: 1, duration: 0.2, ease: 'power1.out', overwrite: true });
              gsap.to(padsSh, { scale: 1, opacity: 0.9, duration: 0.2, ease: 'power1.out', overwrite: true });
            }
          });
        }
      });
      LIFT.forEach(function (x) {
        var k = x[0], a = x[1], b = x[2], img = $('[data-part-img="' + k + '"]'), sh = $('[data-shadow="' + k + '"]');
        var up = function () { return -(stick() + tray.offsetTop + img.offsetTop + img.offsetHeight / 2 + 40); };
        tlS.fromTo(sh, { scale: 1, opacity: 0.9 }, { scale: 0.9, opacity: 0.8, duration: a - 0.01 }, 0.01)          /* тінь стискається ще до підйому: сцена відповідає пальцю з першого руху */
          .fromTo(img, { y: 0, rotation: 0, scale: 1 }, { y: up, rotation: x[3], scale: 1.1, duration: b - a, ease: 'power2.in', immediateRender: false }, a)
          .to(sh, { opacity: 0, scale: 0.6, duration: (b - a) * 0.45 }, a);
      });
      tlS.to({}, { duration: 0.001 }, 0.999);
    } else gsap.set(tag, { opacity: 1 });

    return function () {
      ScrollTrigger.removeEventListener('refreshInit', measure);
      tray.classList.remove('is-rest'); para.removeAttribute('inert');
    };
  }

  function scenes() {
  mm = gsap.matchMedia();

  /* ---------- Телефон і планшет ---------- */
  mm.add('(max-width: 1023.98px)', function (ctx) {
    var box = $('#box'), bpanel = $('.box__panel'), stage = $('.box__stage'), shade = $('.box__shade'), win = $('.odo--hero'), nest = $('.odo-nest');
    var fly = $('[data-flyer]'), flyWin = $('.odo--fly'), pill = $('[data-pill]'), chipIn = $('[data-chip-in]');
    var fill = $('[data-call-fill]'), lbl = $('[data-call-lbl]');
    var kseg = $('.koly .seg'), kgrab = $('.sheet__grab'), clock = $('.koly .clock');
    var home = $('[data-home]'), homeBox = $('.odo-home'), homeNest = $('[data-home-nest]'), homeLamp = $('[data-home-state] .lamp');
    var m = {}, A = { cut: 0, chip: 0 }, B = { cut: 0, chip: 0 };
    var last = { cut: -1, on: -1 };

    var measure = function () {
      var vh = window.innerHeight, W = win.offsetWidth, H = win.offsetHeight, o = offs(win, bpanel);
      var pl = dock.offsetLeft + chip.offsetLeft + chipIn.offsetLeft + pill.offsetLeft;
      var px = pl + pill.offsetWidth / 2;
      var py = dock.offsetTop + chip.offsetTop + chipIn.offsetTop + pill.offsetTop + pill.offsetHeight / 2;
      m.D = Math.max(1, box.offsetHeight - bpanel.offsetHeight);
      m.x0 = o.x; m.y0 = o.y - (vh - H);
      m.s = pill.offsetWidth / W;
      m.x1 = pl; m.y1 = (py - H / 2) - (vh - H);              /* вікно стискається до лівої грані: за край екрана не виходить */
      m.cut = chip.offsetWidth + 6;
      var ho = offs(home, null), hW = home.offsetWidth;
      m.hs = pill.offsetWidth / hW;
      m.hx = pl - ho.x;                                        /* вікно росте з місця чипа: ліва грань іде від чипа до свого поля */
      m.pyB = vh - py;                                         /* чип — від низу екрана: адресний рядок iOS його не зсуває */
      m.hTop = ho.y; m.hH = home.offsetHeight;
      m.vh = vh;
    };
    var renderDock = function () {
      var cut = m.cut * A.cut * (1 - B.cut), on = A.chip * (1 - B.chip);
      if (Math.abs(cut - last.cut) > 0.05) {
        last.cut = cut;
        fill.style.clipPath = 'inset(0px 0px 0px ' + cut.toFixed(1) + 'px round 24px)';
        lbl.style.transform = 'translateX(' + (cut / 2).toFixed(1) + 'px)';
        dock.classList.toggle('has-chip', cut > m.cut * 0.5);
      }
      if (Math.abs(on - last.on) > 0.004) {
        last.on = on;
        chip.style.opacity = on.toFixed(3);
        chip.style.visibility = on > 0.02 ? 'visible' : 'hidden';
        chip.tabIndex = on > 0.9 ? 0 : -1;
      }
    };
    var clack = function (el) { gsap.fromTo(el, { y: 2 }, { y: 0, duration: 0.26, ease: 'expo.out', overwrite: true }); };

    measure();
    ScrollTrigger.addEventListener('refreshInit', measure);
    gsap.set(fly, { transformOrigin: '0% 50%' });

    /* барабани часу чекають, поки чип сяде в панель: два головні рухи не йдуть в одній зоні одночасно */
    var clockOn = false;
    if (clock && days === 'wk') clock.classList.add('is-wait');   /* у вихідні пластина «вихідні» стоїть одразу: порожнього вікна не буває */
    var clockIn = function () { if (!clockOn && clock) { clockOn = true; clock.classList.remove('is-wait'); } };

    /* Межа 1: «Одометр у панель» */
    var p1 = 0;
    var tl1 = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: box, start: 0, end: function () { return '+=' + m.D; }, scrub: 0.35, invalidateOnRefresh: true },
      onUpdate: function () {
        var p = tl1.progress();
        d.classList.toggle('is-flying', p > 0.0005);
        box.classList.toggle('is-gone', p > 0.9995);
        if (p1 < 0.62 && p >= 0.62) { clack(chipIn); checkLamp(chipLamp); }
        if (p >= 0.5) clockIn();
        p1 = p;
        renderDock();
      }
    });
    tl1.fromTo(stage, { scale: 1, y: 0, clipPath: 'inset(0px round 0px)' }, { scale: 0.94, y: -24, clipPath: 'inset(0px round 32px)', duration: 1 }, 0)
      .fromTo(shade, { opacity: 0 }, { opacity: 0.5, duration: 1 }, 0)
      .fromTo(nest, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.05)
      .fromTo(fly, { x: function () { return m.x0; } }, { x: function () { return m.x1; }, duration: 0.3, ease: 'power1.inOut' }, 0.05)  /* ліва грань одразу стає над гніздом… */
      .fromTo(fly, { y: function () { return m.y0; } }, { y: function () { return m.y1; }, duration: 0.55, ease: 'power1.inOut' }, 0.05) /* …і вікно сідає в нього згори, не по капсулі */
      .fromTo(fly, { scale: 1 }, { scale: function () { return m.s; }, duration: 0.55, ease: 'power2.inOut' }, 0.05)
      .fromTo(flyWin, { clipPath: 'inset(0px round 32px)' }, { clipPath: 'inset(0px round 76px)', duration: 0.55 }, 0.05)
      .fromTo(A, { cut: 0 }, { cut: 1, duration: 0.14 }, 0.36)                     /* гніздо в капсулі відкрите до прильоту */
      .fromTo(fly, { opacity: 1 }, { opacity: 0, duration: 0.06 }, 0.58)
      .fromTo(A, { chip: 0 }, { chip: 1, duration: 0.06 }, 0.58);
    if (kseg) tl1.fromTo(kseg, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.02);     /* під панеллю в стані краю — лише заголовок аркуша */
    if (kgrab) tl1.fromTo(kgrab, { opacity: 1 }, { opacity: 0, duration: 0.2 }, 0.3);    /* ручка — підказка краю; аркуш, що вже піднявся, її не має */

    /* Межа 5: «Одометр повертається». Вікно виходить із чипа тієї миті, коли його поле порівнялось із панеллю,
       і далі їде разом зі своїм полем: над червоне поле не піднімається й чужого тексту не закриває. */
    var landed = false, tl5 = null, offTray = null, dead = false;
    var t5start = function () { return Math.max(0, m.hTop + m.hH / 2 - (m.vh - m.pyB)); };
    var t5end = function () { return Math.max(t5start() + 240, m.hTop - m.vh * 0.2); };
    home.style.visibility = 'hidden';
    /* решта сцен — окремими короткими завданнями (вони далеко внизу сторінки) */
    later(function () { if (!dead) ctx.add(function () {
    gsap.set(home, { transformOrigin: '0% 50%' });
    tl5 = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: homeBox, start: t5start, end: t5end, scrub: 0.35, invalidateOnRefresh: true },
      onUpdate: function () {
        var p = tl5.progress();
        home.style.visibility = p > 0.0005 ? 'visible' : 'hidden';
        if (p > 0.9995) {
          home.style.clipPath = '';                          /* тінь вікна повертається разом із посадкою */
          if (!landed) { landed = true; clack(homeBox); checkLamp(homeLamp); buzz(); }
        } else if (p < 0.9) landed = false;
        renderDock();
      }
    });
    tl5.fromTo(home, { x: function () { return m.hx; } }, { x: 0, duration: 1, ease: 'power2.out' }, 0)
      .fromTo(home, { scale: function () { return m.hs; } }, { scale: 1, duration: 1, ease: 'power2.out' }, 0)   /* росте одразу: крихітна пігулка в порожньому полі не стоїть */
      .fromTo(home, { clipPath: 'inset(0px round 76px)' }, { clipPath: 'inset(0px round 32px)', duration: 1 }, 0)
      .fromTo(homeNest, { opacity: 1 }, { opacity: 0, duration: 0.25 }, 0.75)
      .fromTo(B, { chip: 0 }, { chip: 1, duration: 0.015 }, 0)
      .fromTo(B, { cut: 0 }, { cut: 1, duration: 0.16 }, 0.07);                    /* капсула розширюється, коли вікно вже піднялось */
    }); });
    later(function () { later(function () { if (!dead) ctx.add(function () { offTray = trayScenes(0.35); }); }); });
    renderDock();

    /* iOS ховає адресний рядок: висота екрана змінюється без refresh — переміряти точки посадки */
    var hT = 0, lastH = window.innerHeight;
    var onH = function () {
      if (window.innerHeight === lastH) return;
      clearTimeout(hT);
      hT = setTimeout(function () {
        lastH = window.innerHeight; measure();
        var a = tl1.progress(), b = tl5 ? tl5.progress() : 0.5;
        if (a === 0 || a === 1) tl1.invalidate();
        if (b === 0 || b === 1) tl5.invalidate();
      }, 180);
    };
    window.addEventListener('resize', onH);

    return function () {
      dead = true;
      window.removeEventListener('resize', onH); clearTimeout(hT);
      ScrollTrigger.removeEventListener('refreshInit', measure);
      if (offTray) offTray();
      d.classList.remove('is-flying'); box.classList.remove('is-gone'); dock.classList.remove('has-chip');
      if (clock) clock.classList.remove('is-wait');
      [fill, lbl, chip, home].forEach(function (el) { el.removeAttribute('style'); });
      chip.tabIndex = -1;
    };
  });

  /* ---------- ПК: поле розходиться по шву й зростається наприкінці ---------- */
  mm.add('(min-width: 1024px)', function (ctx) {
    var meter = $('.meter'), box = $('#box'), stage = $('.box__stage'), doroha = $('#doroha');
    var S = { open: 0, close: 0 }, lastR = -1;
    var seam = function () {
      var r = 40 * S.open * (1 - S.close);
      if (Math.abs(r - lastR) < 0.05) return;
      lastR = r;
      meter.style.clipPath = 'inset(0px round 40px ' + r.toFixed(1) + 'px ' + r.toFixed(1) + 'px 40px)';
    };
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: box, start: 0, end: function () { return '+=' + window.innerHeight * 0.3; }, scrub: 0.5 } })
      .fromTo(S, { open: 0 }, { open: 1, duration: 1, onUpdate: seam }, 0)
      .fromTo(stage, { clipPath: 'inset(0px round 0px 40px 40px 0px)' }, { clipPath: 'inset(0px round 40px 40px 40px 40px)', duration: 1 }, 0);
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: doroha, start: 'top 55%', end: 'top 24px', scrub: 0.5 } })
      .fromTo(S, { close: 0 }, { close: 1, duration: 1, onUpdate: seam }, 0)
      .fromTo(doroha, { clipPath: 'inset(0px round 40px 40px 40px 40px)' }, { clipPath: 'inset(0px round 0px 40px 40px 0px)', duration: 1 }, 0);

    var offTray = null, dead = false;
    later(function () { if (!dead) ctx.add(function () { offTray = trayScenes(0.5); }); });
    return function () { dead = true; if (offTray) offTray(); meter.style.clipPath = ''; };
  });
  later(function () { later(function () { later(refresh); }); });     /* після останнього етапу збірки сцен */
  }

  /* після шрифтів висоти рядків інші: один перерахунок сцен і колеса, не два підряд */
  var rT = 0;
  var refresh = function () {
    clearTimeout(rT);
    if (!mm) return;                                      /* сцени ще не зібрані: вони самі перерахуються наприкінці збірки */
    rT = setTimeout(function () { if (wheelApi) wheelApi.geometry(); ScrollTrigger.refresh(); }, 60);
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  if (document.readyState !== 'complete') window.addEventListener('load', refresh);
  var rw = window.innerWidth, rt = 0;
  window.addEventListener('resize', function () {
    if (window.innerWidth === rw) return;
    rw = window.innerWidth; clearTimeout(rt);
    rt = setTimeout(function () { if (wheelApi) wheelApi.geometry(); }, 200);
  });
})();
