/* LT Nail Studio — концепт Velira. Рух: лампа-години, проліт крізь лампу, заливка лаком, аркуш відступає, кільця доку. */
(function () {
  'use strict';
  var d = document.documentElement;
  var MX = d.classList.contains('mx');
  var OPEN = 10, CLOSE = 21;

  /* ---------- 1. Час Києва → лампа й графік ---------- */
  function kyivNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false })
        .formatToParts(new Date());
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
      return { h: parseInt(o.hour, 10) % 24, m: parseInt(o.minute, 10), wd: wd };
    } catch (e) { return null; }
  }
  var t = kyivNow();
  var status = document.getElementById('status');
  var statusText = document.getElementById('status-text');
  var leds = document.getElementById('leds');
  var nowLine = document.getElementById('now-line');
  function applyTime() {
    if (!t || !status) return;
    var open = t.h >= OPEN && t.h < CLOSE;
    var hhmm = (t.h < 10 ? '0' : '') + t.h + ':' + (t.m < 10 ? '0' : '') + t.m;
    if (open) {
      status.classList.add('open');
      statusText.textContent = 'Відчинено · до 21:00';
      leds.querySelectorAll('li').forEach(function (li) {
        var h = +li.getAttribute('data-h');
        li.classList.toggle('past', h < t.h);
        li.classList.toggle('now', h === t.h);
      });
      if (nowLine) nowLine.textContent = 'У Києві ' + hhmm + ' — студія відчинена до 21:00.';
    } else {
      status.classList.add('shut');
      statusText.textContent = t.h < OPEN ? 'Зачинено · відчинимось о 10:00' : 'Зачинено · завтра з 10:00';
      leds.classList.add('closed');
      if (nowLine) nowLine.textContent = 'У Києві ' + hhmm + ' — зачинено, онлайн-запис працює.';
    }
    var today = document.querySelector('#week li[data-d="' + t.wd + '"]');
    if (today) {
      today.classList.add('today');
      today.querySelectorAll('circle').forEach(function (c) {
        var h = +c.getAttribute('data-h');
        if (!open) { c.classList.add('past'); return; }
        c.classList.toggle('past', h < t.h); c.classList.toggle('now', h === t.h);
      });
    }
  }
  /* лампа спершу світить уся (запікання), а «годинник» вмикається після глянцю */
  if (MX) setTimeout(applyTime, 1900); else applyTime();

  /* ---------- 2. Проява заголовків ---------- */
  var rv = [].slice.call(document.querySelectorAll('.rv'));
  if (MX && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, sib = el.parentNode.querySelectorAll('.rv'), idx = [].indexOf.call(sib, el);
        el.style.transitionDelay = (idx > 0 ? 80 : 0) + 'ms';
        el.classList.add('in'); io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });

  /* ---------- 3. Прокрутка: сцени й кільця ---------- */
  var bar = document.getElementById('bar');
  var scene = document.getElementById('scene');
  var hero = document.getElementById('hero');
  var mouth = document.getElementById('mouth');
  var portal = document.getElementById('portal');
  var price = document.getElementById('praice');
  var people = document.getElementById('people');
  var plates = document.querySelectorAll('.nailp i');
  var dock = document.getElementById('dock');
  var links = [].slice.call(dock.querySelectorAll('a'));
  var secs = links.map(function (a) { return document.getElementById(a.getAttribute('data-s')); });
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var ease = function (p) { return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; };
  var mouthBox = null;
  var pimg = document.getElementById('portal-img');
  var rows = [].slice.call(document.querySelectorAll('#rows li'));

  var nailSec = document.getElementById('nail');
  var sceneStart = 0, sceneRest = 0, sceneTravel = 1;
  function measureScene() {
    if (!MX) return;
    var vh = window.innerHeight, hh = hero.offsetHeight;
    /* останній рядок hero має стояти в смузі ≤ 78 % екрана, поки hero нерухомий (правило передачі, що накриває) */
    var last = hero.querySelector('.hero-right'), lb = 0, el = last;
    while (el && el !== hero) { lb += el.offsetTop; el = el.offsetParent; }
    lb += last.offsetHeight;
    var over = Math.max(0, Math.round(lb - .78 * vh));
    hero.style.setProperty('--stick', (-over) + 'px');
    scene.style.height = (hh + 1.4 * vh) + 'px'; /* 0,7 екрана спокою + 0,7 екрана розкриття */
    sceneStart = scene.offsetTop + over;
    sceneRest = .7 * vh;
    sceneTravel = .7 * vh;
    /* білий аркуш «Nail» підіймається, поки світло лампи розкривається — без порожнього білого екрана */
    nailSec.style.marginTop = (-Math.round(.7 * vh)) + 'px';
  }
  function measureMouth() {
    /* розмір отвору без трансформацій: offset-координати відносно hero */
    var x = 0, y = 0, el = mouth;
    while (el && el !== hero) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
    mouthBox = { x: x, y: y, w: mouth.offsetWidth, h: mouth.offsetHeight };
    /* копія кадру руки точно на місці отвору: проліт починається без стрибка */
    pimg.style.left = x + 'px'; pimg.style.top = y + 'px';
    pimg.style.width = mouthBox.w + 'px'; pimg.style.height = mouthBox.h + 'px';
  }

  var ticking = false, lastY = window.scrollY;
  function frame() {
    ticking = false;
    var vh = window.innerHeight, vw = document.documentElement.clientWidth;

    /* панель: світла після першого екрана */
    var heroEnd = scene.offsetTop + scene.offsetHeight - vh * .5;
    bar.classList.toggle('solid', window.scrollY > 8);
    /* док на телефоні ховається, поки гортаєш вниз, і повертається при русі вгору */
    var dy = window.scrollY - lastY;
    if (Math.abs(dy) > 4) { dock.classList.toggle('tuck', dy > 0); lastY = window.scrollY; }
    bar.classList.toggle('light', window.scrollY > (MX ? sceneStart + sceneRest + sceneTravel * .35 : heroEnd));
    dock.classList.toggle('show', !MX || window.scrollY > sceneStart + sceneRest + sceneTravel * .8);

    if (MX) {
      /* проліт крізь лампу: hero стоїть 0,7 екрана, далі отвір розкривається білим */
      if (mouthBox) {
        var p = clamp((window.scrollY - sceneStart - sceneRest) / sceneTravel, 0, 1), e = ease(p);
        var hw = hero.offsetWidth, hh = hero.offsetHeight;
        var top = mouthBox.y * (1 - e), left = mouthBox.x * (1 - e);
        var right = (hw - mouthBox.x - mouthBox.w) * (1 - e), bottom = (hh - mouthBox.y - mouthBox.h) * (1 - e);
        var r = (mouthBox.w / 2) * (1 - e);
        portal.style.opacity = p > 0 ? 1 : 0;
        /* рука росте разом з отвором до всього екрана (проліт до нігтів) і тане в останній чверті — далі білий аркуш */
        var fill = Math.max(hw / mouthBox.w, hh / mouthBox.h) * 1.08;
        var tx = (hw / 2 - (mouthBox.x + mouthBox.w / 2)) * e, ty = (hh / 2 - (mouthBox.y + mouthBox.h / 2)) * e;
        pimg.style.transform = 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) scale(' + (1 + (fill - 1) * e).toFixed(4) + ')';
        pimg.style.opacity = clamp((1 - p) / .25, 0, 1).toFixed(3);
        portal.style.clipPath = 'inset(' + top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px round ' + r + 'px ' + r + 'px 0 0)';
      } else { portal.style.opacity = 0; }

      /* відблиск на пластинах тонів ковзає з прокруткою */
      var pr = plates.length ? plates[0].parentNode.getBoundingClientRect() : null;
      if (pr) {
        var gp = clamp(1 - (pr.top + pr.height / 2) / vh, 0, 1);
        plates.forEach(function (g) { g.parentNode.style.setProperty('--gy', (gp * 34 - 6).toFixed(1) + 'px'); });
      }

      /* заливка лаком: хвиля вирівнюється, по краю пробігає відблиск */
      var prc = price.getBoundingClientRect();
      var wp = clamp((vh * 1.15 - prc.top) / (vh * .7), 0, 1);   /* верх прайсу 115 % → 45 % екрана */
      price.style.setProperty('--wv', (1 - .8 * wp * wp * wp).toFixed(3));
      price.style.setProperty('--wh', (wp < 1 ? .55 + .35 * Math.sin(wp * Math.PI) : .3).toFixed(3));

      /* аркуш відступає й округлюється над кобальтом запису */
      var pb = people.getBoundingClientRect().bottom;
      var q = clamp((vh - pb) / (vh * .6), 0, 1), qe = ease(q);
      var side = (vw < 720 ? 5 : 7) * qe, rad = (vw < 720 ? 120 : 260) * qe;
      people.style.clipPath = q > 0 ? 'inset(0 ' + side + '% 0 ' + side + '% round 0 0 ' + rad + 'px ' + rad + 'px)' : '';
    }

    /* запасний шлях проявлення: усе, що вже вище 85 % екрана, показати (стрибки прокрутки, Firefox) */
    if (MX) rv.forEach(function (el) { if (!el.classList.contains('in') && el.getBoundingClientRect().top < vh * .92) el.classList.add('in'); });

    /* світлодіод рядка прайсу загоряється, коли рядок заходить у кадр */
    rows.forEach(function (li) { if (!li.classList.contains('lit') && li.getBoundingClientRect().top < vh * .86) li.classList.add('lit'); });

    /* кільця доку = прогрес читання розділу */
    var active = -1;
    secs.forEach(function (sec, i) {
      if (!sec) return;
      var b = sec.getBoundingClientRect();
      var prog = clamp((vh * .5 - b.top) / Math.max(b.height, 1), 0, 1);
      links[i].style.setProperty('--p', prog.toFixed(3));
      if (b.top < vh * .5 && b.bottom > vh * .5) active = i;
    });
    links.forEach(function (a, i) {
      a.classList.toggle('on', i === active);
      if (i === active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  function onResize() { measureScene(); measureMouth(); onScroll(); }

  measureScene();
  measureMouth();
  frame();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('load', onResize);
})();
