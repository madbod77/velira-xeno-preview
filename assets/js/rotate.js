/* X00 — word rotator, взятий без змін з X02-word-rotate/demo/motion.js (makeRotator): слово змінюється через
   розмиття й сяйво, ширину слота резервує grid, кутики-рамка й пляма — лише transform. Тут лише експорт фабрики;
   хореографію входу веде kit.js. */
(function () {
  if (!window.gsap) return;
  var IN = 'expo.out';     // прибуття (літери, рамка, пляма)
  var OUT = 'power2.in';   // вихід: дзеркало входу, коротший
  var charsFrom = { opacity: 0, yPercent: 48, filter: 'blur(14px)' };
  var charsIn = function () {
    return { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 0.95, ease: IN,
             stagger: { amount: 0.26, ease: 'power2.out' } };          // інтервали між літерами зменшуються
  };

  function makeRotator(el) {
    var words = [].slice.call(el.querySelectorAll('.rot-w'));
    var originals = words.map(function (w) { return w.textContent; });
    var pool = el.querySelector('.rot-pool'), flash = el.querySelector('.rot-flash');
    var L = el.querySelectorAll('.rot-frame .tl, .rot-frame .bl'), R = el.querySelectorAll('.rot-frame .tr, .rot-frame .br');
    var start = el.dataset.align === 'start';
    var rims = el.dataset.sync ? [].map.call(document.querySelectorAll(el.dataset.sync), function (c) { return c.querySelector('.rim'); }) : [];
    var HOLD = +(el.dataset.hold || 2.6);
    var cur = 0, visible = false, swapping = null, px = [], max = 1;

    // літери — лише в режимі руху; слова aria-hidden, зміст читає .sr-only поруч
    var chars = words.map(function (w) {
      var text = w.textContent; w.textContent = '';
      return Array.from(text).map(function (c) {
        var s = document.createElement('span'); s.className = 'ch'; s.textContent = c; w.appendChild(s); return s;
      });
    });
    gsap.set(words, { opacity: 1 });
    chars.forEach(function (cs, i) { if (i) gsap.set(cs, charsFrom); });

    function measure() {   // одне читання макета на старті й на resize
      max = el.offsetWidth || 1;
      px = words.map(function (w) { return w.offsetWidth; });
    }
    // куди стають кутики для слова i (px від якоря: центр слота або лівий край)
    function edges(i) {
      var pad = Math.round(parseFloat(getComputedStyle(el).fontSize) * 0.14), w = px[i];
      return start ? { l: -pad, r: w + pad } : { l: -(w / 2 + pad), r: w / 2 + pad };
    }
    function place(i) { var e = edges(i); gsap.set(L, { x: e.l }); gsap.set(R, { x: e.r }); gsap.set(pool, { scaleX: px[i] / max }); }
    measure(); place(0);
    if (rims[0]) gsap.set(rims[0], { opacity: 1 });

    var hold = gsap.to({}, { duration: HOLD, paused: true, onComplete: function () { swap((cur + 1) % words.length); } });

    function update() {
      if (swapping) return;
      if (visible && !document.hidden) hold.resume(); else hold.pause();
    }

    function swap(to) {
      var from = cur, e = edges(to); cur = to;
      var tl = swapping = gsap.timeline({ onComplete: function () { swapping = null; hold.pause(0); update(); } });
      tl.to(chars[from], { opacity: 0, yPercent: -42, filter: 'blur(10px)', duration: 0.42, ease: OUT, stagger: { amount: 0.12 } }, 0)
        .fromTo(chars[to], charsFrom, charsIn(), 0.2)
        .to(L, { x: e.l, duration: 0.9, ease: IN }, 0.2)
        .to(R, { x: e.r, duration: 0.9, ease: IN }, 0.2)
        .to(pool, { scaleX: px[to] / max, duration: 0.9, ease: IN }, 0.2)
        // спалах сяйва приземляється разом із літерами (останні ~20 % входу)
        .fromTo(flash, { opacity: 0, scaleX: px[to] / max }, { opacity: 0.85, duration: 0.3, ease: 'power2.out' }, 0.46)
        .to(flash, { opacity: 0, duration: 0.85, ease: 'power2.inOut' }, '>');
      if (rims.length) {
        tl.to(rims[from], { opacity: 0, duration: 0.5, ease: 'power1.out' }, 0.2)
          .to(rims[to], { opacity: 1, duration: 0.8, ease: 'power1.out' }, 0.3);
      }
    }

    var io = new IntersectionObserver(function (entries) { visible = entries[entries.length - 1].isIntersecting; update(); });
    io.observe(el);
    document.addEventListener('visibilitychange', update);
    var onResize = function () { measure(); if (!swapping) place(cur); };
    window.addEventListener('resize', onResize);

    return {
      // перший показ: літери першого слова приходять так само, як прийдуть наступні; рамка «вимірює» слово з центру
      enter: function () {
        var e = edges(0);
        return gsap.timeline()
          .fromTo(chars[0], charsFrom, charsIn(), 0)
          .fromTo(L, { x: 0 }, { x: e.l, duration: 1.1, ease: IN }, 0.12)
          .fromTo(R, { x: 0 }, { x: e.r, duration: 1.1, ease: IN }, 0.12)
          .fromTo(pool, { scaleX: 0.2 }, { scaleX: px[0] / max, duration: 1.1, ease: IN }, 0.12);
      },
      // перша зміна — через `first` с видимого часу (далі — кожні HOLD с)
      start: function (first) { hold.pause(Math.max(0, HOLD - first)); update(); },
      destroy: function () {
        io.disconnect(); document.removeEventListener('visibilitychange', update); window.removeEventListener('resize', onResize);
        hold.kill(); if (swapping) swapping.kill();
        words.forEach(function (w, i) { w.textContent = originals[i]; });
        gsap.set(words.concat([pool, flash], [].slice.call(L), [].slice.call(R), rims), { clearProps: 'all' });
      }
    };
  }

  window.KitRotator = makeRotator;
})();
