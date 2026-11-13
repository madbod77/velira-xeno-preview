/* Velira — сторінки /skilky-koshtuie-landing/ і /pro-velira/ (ц.17 · M3). Решту (шапка, меню, проява, лінія шарів, аркуші, заміри)
   робить page.js. Тут лише:
   1) коло світла по рамці (X05 головної, Web Animations): картка студії на /pro-velira/ — один раз після шрифтів;
      чек-лист гайду — один раз, коли позначено всі вісім пунктів;
   2) лічильник чек-листа («Позначено N з 8»). Без JS чек-лист — звичайні прапорці, лічильника немає;
   3) довантаження lazy-знімка після load.
   Анімуються лише transform / opacity. «Зменшити рух» — без кола. */
(function () {
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var motion = document.documentElement.classList.contains('lp-motion') && !!(window.matchMedia && matchMedia('(prefers-reduced-motion: no-preference)').matches);

  // розмір квадрата променя — діагональ клітинки (як у формі)
  var sizeBeam = function (cell) {
    var put = function () { cell.style.setProperty('--d', Math.ceil(Math.hypot(cell.offsetWidth, cell.offsetHeight) + 16) + 'px'); };
    put();
    if ('ResizeObserver' in window) new ResizeObserver(put).observe(cell);
  };
  // один оберт променя по рамці: 2,3 с ≈ sine.inOut; рамка й ореол 0 → 1 (22 %) → 1 (66 %) → 0
  var lap = function (cell, from) {
    if (!motion || !cell || !cell.animate) return;
    var a0 = from || 0, dur = 2300;
    $$('.beam', cell).forEach(function (b) {
      b.animate([{ transform: 'rotate(' + a0 + 'deg)' }, { transform: 'rotate(' + (a0 + 360) + 'deg)' }], { duration: dur, easing: 'cubic-bezier(.37,0,.63,1)', fill: 'forwards' });
    });
    $$('.bm-ring, .bm-halo', cell).forEach(function (e) {
      e.animate([{ opacity: 0 }, { opacity: 1, offset: .22 }, { opacity: 1, offset: .66 }, { opacity: 0 }], { duration: dur, easing: 'linear', fill: 'forwards' });
    });
  };

  /* 1. картка студії: світло стартує з верхнього лівого кута, коли текст уже стоїть (шрифти) */
  var card = document.querySelector('[data-lap]');
  if (card) {
    sizeBeam(card);
    var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    ready.then(function () { setTimeout(function () { lap(card, -45); }, 450); });
  }

  /* 2. чек-лист пропозиції */
  var chk = document.querySelector('[data-check]');
  if (chk) {
    sizeBeam(chk);
    var boxes = $$('input[type="checkbox"]', chk), out = chk.querySelector('[data-check-out]'), full = false;
    var put = function (user) {
      var n = boxes.filter(function (b) { return b.checked; }).length, all = n === boxes.length;
      out.hidden = false;
      out.textContent = all ? 'Усі вісім пунктів на місці — тепер суми можна порівнювати чесно.'
                            : 'Позначено ' + n + ' з ' + boxes.length + '.' + (n ? ' Чого бракує — спитайте до оплати.' : '');
      if (all && !full && user) lap(chk, 0);
      full = all;
    };
    boxes.forEach(function (b) { b.addEventListener('change', function () { put(true); }); });
    put(false);
  }

  /* 3. знімок сайту клієнта (/pro-velira/) — lazy, щоб не заважати першому малюванню; одразу після load довантажуємо його й так:
     інакше на швидкій прокрутці чи знімку всієї сторінки рамка телефона стоїть порожньою */
  var eager = function () { setTimeout(function () { $$('img[loading="lazy"]').forEach(function (i) { i.loading = 'eager'; }); }, 0); };
  if (document.readyState === 'complete') eager(); else addEventListener('load', eager);
})();
