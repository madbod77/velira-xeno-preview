/* Velira — нішеві сторінки (ц.17 · I): «питання клієнта → справжній кадр концепту».
   Кнопки-питання (aria-pressed, aria-controls): дотик або Enter/Space; ← → між питаннями. Новий кадр відкривається так, як рухається сам концепт:
   data-wipe="down" — фронт світла згори вниз (салон: пасмо світлішає від кореня), "sweep" — смуга лампи зліва направо (СТО).
   Коли блок уперше на екрані (≥ 45 %), кадри один раз проходять самі (3,4 с на кадр); будь-який дотик чи фокус зупиняє показ.
   Без руху (reduced motion) — без автопоказу й без анімації. Анімуються лише clip-path / transform / opacity (Web Animations). */
(function () {
  /* проява знімка в першому екрані — CSS-ключі; після кінця знімаємо анімацію (кінцевий стан = без обрізання): інакше знімок
     усієї сторінки в Chromium перезапускає CSS-анімацію й ловить кадр порожнім (те саме робили з чеком і демо на M2) */
  [].slice.call(document.querySelectorAll('.nc-poster .nc-shot img, .nc-poster .nc-front')).forEach(function (el) {
    var done = function () { el.style.animation = 'none'; };
    el.addEventListener('animationend', done);
    addEventListener('load', function () { setTimeout(done, 1600); });
  });
  var players = [].slice.call(document.querySelectorAll('[data-player]'));
  if (!players.length) return;
  var motion = document.documentElement.classList.contains('lp-motion') &&
    !!(window.matchMedia && matchMedia('(prefers-reduced-motion: no-preference)').matches);
  var EASE = 'cubic-bezier(.2,.7,.2,1)', DUR = 820, STEP = 3400;

  players.forEach(function (box, pi) {
    var qs = [].slice.call(box.querySelectorAll('.nc-q')), fs = [].slice.call(box.querySelectorAll('.nc-f'));
    if (!qs.length || qs.length !== fs.length) return;
    var wipe = box.getAttribute('data-wipe') || 'down', cur = 0, timer = 0, auto = false, stopped = false, anims = [];
    box.style.setProperty('--n', qs.length);
    qs.forEach(function (q, i) {
      var id = 'nc' + pi + 'q' + i, fid = fs[i].id || ('nc' + pi + 'f' + i);
      q.id = id; fs[i].id = fid;
      q.setAttribute('aria-controls', fid); fs[i].setAttribute('aria-labelledby', id);
      q.addEventListener('click', function () { stop(); go(i, true); });
      q.addEventListener('keydown', function (e) {
        var k = e.key, n = qs.length, to = k === 'ArrowRight' ? (i + 1) % n : k === 'ArrowLeft' ? (i - 1 + n) % n : -1;
        if (to < 0) return;
        e.preventDefault(); stop(); go(to, true); qs[to].focus();
      });
    });
    var mark = function (i) {
      qs.forEach(function (q, k) { q.setAttribute('aria-pressed', String(k === i)); });
      fs.forEach(function (f, k) { f.classList.toggle('is-cur', k === i); f.hidden = false; f.setAttribute('aria-hidden', String(k !== i)); });
    };
    mark(0);
    box.classList.add('is-on');

    var settle = function () { fs.forEach(function (f) { f.classList.remove('is-prev'); }); };
    function go(i, user) {
      if (i === cur) return;
      var prev = fs[cur], next = fs[i];
      anims.forEach(function (a) { a.finish(); }); anims = []; settle();
      cur = i; prev.classList.add('is-prev'); mark(i);
      if (!motion || !next.animate) { settle(); return; }
      var shot = next.querySelector('.nc-shot'), front = next.querySelector('.nc-front'), cap = next.querySelector('figcaption');
      var down = wipe !== 'sweep';
      anims.push(shot.animate(down ? [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }]
                                   : [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], { duration: DUR, easing: EASE }));
      if (front) anims.push(front.animate(down
        ? [{ opacity: 1, transform: 'translateY(-100%)' }, { opacity: 1, transform: 'translateY(0)', offset: .84 }, { opacity: 0, transform: 'translateY(0)' }]
        : [{ opacity: 1, transform: 'translateX(-100%)' }, { opacity: 1, transform: 'translateX(0)', offset: .84 }, { opacity: 0, transform: 'translateX(0)' }],
        { duration: DUR, easing: EASE }));
      if (cap) anims.push(cap.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: 160, easing: EASE, fill: 'backwards' }));
      anims[0].onfinish = settle;
    }
    // ц.18: подію concept_frame прибрано — privacy.html перелічує лише «заявка» й «перехід у Telegram»

    // автопоказ: один прохід, смуга ходу на активному питанні; зупиняється назавжди від будь-якої дії людини
    function run() {
      if (stopped) return;
      qs.forEach(function (q) { q.classList.remove('is-run'); });
      if (cur >= qs.length - 1) { stop(); return; }
      var q = qs[cur]; q.style.setProperty('--run', STEP + 'ms');
      void q.offsetWidth; q.classList.add('is-run');
      timer = setTimeout(function () { go(cur + 1, false); run(); }, STEP);
    }
    function stop() {
      stopped = true; auto = false; clearTimeout(timer);
      qs.forEach(function (q) { q.classList.remove('is-run'); });
    }
    ['pointerdown', 'focusin'].forEach(function (ev) { box.addEventListener(ev, function (e) { if (ev !== 'focusin' || e.target.closest('.nc-q')) stop(); }, { passive: true }); });
    if (motion && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !auto && !stopped) { auto = true; run(); }
          else if (!e.isIntersecting && auto) { clearTimeout(timer); qs.forEach(function (q) { q.classList.remove('is-run'); }); auto = false; }
        });
      }, { threshold: .45 });
      io.observe(box);
    }
  });
})();
