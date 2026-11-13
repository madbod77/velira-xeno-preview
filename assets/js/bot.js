/* Velira — /telegram-bot/: «розмова стає заявкою» (ц.17 · M2). Без GSAP.
   Кроки сценарію ([data-t] — порядок у розмові): повідомлення бота (у шапці вікна — «друкує…»), відповідь клієнта, поле
   заявки (світла точка переносить відповідь у поле), рядок таблиці, сповіщення.
   Прокрутка: кожен крок з'являється, коли його верх доходить до 85 % висоти екрана; кроки, що дійшли разом, ідуть по черзі
   за порядком розмови (крок 160 мс, черга довша за 4 — решту одразу), тож нічого не лишається схованим на екрані.
   Зміна вкладки або «Програти розмову ще раз» — повна розмова в живому темпі.
   Стан — атрибут data-s (pre / in) на кроках; класи не змінюються. Без JS і з reduced motion усе видно одразу. */
(function () {
  // демо першого екрана (CSS, ПК): після кінця анімації знімаємо data-a з елемента — лишається звичайний стан
  [].forEach.call(document.querySelectorAll('.tb-demo [data-a]'), function (el) {
    var done = function () { el.removeAttribute('data-a'); };
    el.addEventListener('animationend', done); setTimeout(done, 2400);
  });
  var sc = document.querySelector('[data-sc]');
  if (!sc) return;
  var root = document.documentElement;
  var motion = root.classList.contains('lp-motion') && !!(window.matchMedia && matchMedia('(prefers-reduced-motion: no-preference)').matches);
  if (!motion) return;
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
  var replay = sc.querySelector('.tb-replay');
  var timers = [], queue = [], qTimer = 0, last = null, mode = 'scroll';

  var panelOf = function () {
    var r = sc.querySelector('input[name="sc"]:checked');
    return sc.querySelector('[data-panel="' + (r ? r.value : 'salon') + '"]');
  };
  var steps = function (p) {
    return $$('[data-t]', p).sort(function (a, c) { return a.getAttribute('data-t') - c.getAttribute('data-t'); });
  };
  var isMsg = function (el) { return el.classList.contains('tb-msg'); };
  var isFill = function (el) { return !!(el.parentNode && el.parentNode.classList && el.parentNode.classList.contains('tb-lead')); };

  // світла точка: від останнього показаного повідомлення до поля заявки (координати — відносно панелі)
  var spark = function (p, from, to) {
    if (!from || !to || !p.animate || from.getAttribute('data-s') !== 'in') return;
    var pr = p.getBoundingClientRect(), a = from.getBoundingClientRect(), c = to.getBoundingClientRect();
    if (a.bottom < 0 || a.top > innerHeight || c.bottom < 0 || c.top > innerHeight) return;   // поза екраном — без точки
    var x0 = a.left - pr.left + 10, y0 = a.top - pr.top + a.height / 2, x1 = c.left - pr.left + 10, y1 = c.top - pr.top + c.height / 2;
    var s = document.createElement('i');
    s.className = 'tb-spark'; s.setAttribute('aria-hidden', 'true'); p.appendChild(s);
    var an = s.animate([
      { transform: 'translate(' + x0 + 'px,' + y0 + 'px) scale(.5)', opacity: 0 },
      { transform: 'translate(' + x0 + 'px,' + y0 + 'px) scale(1)', opacity: 1, offset: .12 },
      { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(1)', opacity: 1, offset: .86 },
      { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(.4)', opacity: 0 }
    ], { duration: 560, easing: 'cubic-bezier(.4,0,.2,1)' });
    an.onfinish = function () { s.remove(); };
  };
  var show = function (p, el) {
    if (el.getAttribute('data-s') === 'in') return;
    if (isFill(el)) spark(p, last, el);
    el.setAttribute('data-s', 'in');
    if (isMsg(el)) last = el;
  };
  var reset = function () {
    timers.forEach(clearTimeout); timers = []; queue = []; clearTimeout(qTimer); qTimer = 0; last = null;
    $$('.tb-spark', sc).forEach(function (s) { s.remove(); });
    $$('[data-typing]', sc).forEach(function (t) { t.hidden = true; });
  };

  /* ---------- прокрутка: крок з'являється, коли доходить до 85 % екрана; разом — по черзі за порядком розмови ---------- */
  var pending = [];
  var pump = function () {
    qTimer = 0;
    if (!queue.length) return;
    var p = panelOf();
    queue.sort(function (a, c) { return a.getAttribute('data-t') - c.getAttribute('data-t'); });
    while (queue.length > 4) show(p, queue.shift());   // наздогнати: швидка прокрутка не чекає черги
    show(p, queue.shift());
    if (queue.length) qTimer = setTimeout(pump, 160);
  };
  var check = function () {
    if (mode !== 'scroll' || !pending.length) return;
    var line = innerHeight * .85, atEnd = scrollY + innerHeight >= document.documentElement.scrollHeight - 4;
    pending = pending.filter(function (el) {
      if (!el.offsetParent) return true;   // панель схована (інша вкладка)
      if (atEnd || el.getBoundingClientRect().top < line) { queue.push(el); return false; }
      return true;
    });
    if (queue.length && !qTimer) pump();
    if (!pending.length) { removeEventListener('scroll', onScroll); if (replay) replay.hidden = false; }
  };
  var sq = 0, onScroll = function () { if (!sq) sq = raf(function () { sq = 0; check(); }); };

  /* ---------- повна розмова в живому темпі (вкладка, «ще раз») ---------- */
  var at = function (ms, f) { timers.push(setTimeout(f, ms)); };
  var play = function () {
    var p = panelOf(); if (!p) return;
    mode = 'play'; reset(); pending = [];
    removeEventListener('scroll', onScroll);
    var list = steps(p), typing = p.querySelector('[data-typing]'), t = 280;
    list.forEach(function (el) { el.setAttribute('data-s', 'pre'); });
    if (replay) replay.hidden = true;
    list.forEach(function (el) {
      if (isMsg(el) && !el.classList.contains('tb-msg--me')) {
        at(t, function () { if (typing) typing.hidden = false; });
        t += 560;
        at(t, function () { if (typing) typing.hidden = true; show(p, el); });
        t += 480;
      } else if (isMsg(el)) {
        at(t, function () { show(p, el); });
        t += 520;
      } else if (isFill(el)) {
        at(t, function () { show(p, el); });
        t += 620;
      } else {
        at(t, function () { show(p, el); });
        t += 520;
      }
    });
    at(t + 120, function () { if (replay) replay.hidden = false; });
  };

  // старт: кроки ховаємо лише тоді, коли сценарій ще нижче екрана (інакше видиме спершу намалювалось би, а потім сховалось)
  var p0 = panelOf();
  if (p0 && sc.getBoundingClientRect().top > innerHeight) {
    pending = steps(p0);
    pending.forEach(function (el) { el.setAttribute('data-s', 'pre'); });
    addEventListener('scroll', onScroll, { passive: true });
  } else if (replay) replay.hidden = false;

  $$('input[name="sc"]', sc).forEach(function (r) { r.addEventListener('change', function () { if (r.checked) play(); }); });
  if (replay) replay.addEventListener('click', play);
})();
