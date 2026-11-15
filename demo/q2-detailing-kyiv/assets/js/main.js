/* Q2 Detailing — хореографія сторінки (GSAP 3.15 + ScrollTrigger з диска). Увесь рух — у matchMedia no-preference. */
(function () {
  'use strict';
  var H = window.Hood;
  var root = document.documentElement;

  // активний шар у зрізі (телефон: липка смуга; ПК: стовпчик ліворуч) — рахується з положення прокрутки:
  // активний той шар, чий верх уже пройшов 40 % висоти екрана; нічого не пройшло — «Мийка»
  (function cutNav() {
    var bands = [].slice.call(document.querySelectorAll('.cut__band'));
    var cut = document.querySelector('.cut');
    var ids = ['l-myika', 'l-keramika', 'l-plivka', 'l-lak', 'salon'];
    var secs = ids.map(function (id) { return document.getElementById(id); });
    if (!bands.length) return;
    var current = -1, ticking = false;
    function update() {
      ticking = false;
      var k = 0, line = innerHeight * .4;
      secs.forEach(function (el, i) { if (el && el.getBoundingClientRect().top < line) k = i; });
      if (k === current) return;
      current = k;
      bands.forEach(function (b, i) { b.classList.toggle('is-on', i === k); });
      if (cut && cut.scrollWidth > cut.clientWidth && bands[k]) {
        var left = Math.max(0, bands[k].offsetLeft - 16);
        if (cut.scrollTo) cut.scrollTo({ left: left, behavior: root.classList.contains('rm') ? 'auto' : 'smooth' });
        else cut.scrollLeft = left;
      }
    }
    window.__cutUpdate = function () { current = -1; update(); };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', window.__cutUpdate);
    update();
  })();

  if (!window.gsap || !window.ScrollTrigger || root.classList.contains('rm')) {
    if (H) H.polish();
    root.classList.add('rm');   // без GSAP — статична схема шарів замість сцени
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  var mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: reduce)', function () { root.classList.add('rm'); if (H) H.polish(); ScrollTrigger.refresh(); });

  mm.add('(prefers-reduced-motion: no-preference)', function () {
    var S = H ? H.state : { u: 1, g: 1, q: 0 };
    var req = H ? H.request : function () {};

    // 1. Фірмовий момент: прохід полірувального круга, потім відблиск уздовж рівних ліній
    // цикл 2: повільніший, «дорожчий» жест — 3,2 с з м'яким розгоном і довгим доведенням; старт — коли фото лаку готове
    var pass = gsap.timeline({ paused: true });
    pass.to(S, { u: 1, duration: 3.2, ease: 'power3.inOut', onUpdate: req })
        .to(S, { g: 1, duration: 1.5, ease: 'power1.inOut', onUpdate: req }, '>-0.15')
        .add(function () { S.polished = true; req(); });
    if (H && H.onReady) H.onReady(function () { gsap.delayedCall(.45, function () { if (pass.progress() === 0) pass.play(); }); });
    else pass.play();

    // 2. Передача «лінії лягають у шари»: сцена закріплена CSS sticky, scrub прогресом секції
    var hero = document.querySelector('.hero'), concept = document.querySelector('.concept'),
        cap = document.querySelector('.hood__cap'), scrim = document.querySelector('.hood__scrim'),
        title = document.querySelector('.layers__title'), items = [].slice.call(document.querySelectorAll('.layers__item'));
    var heroY = gsap.quickSetter(hero, 'y', 'px'), heroO = gsap.quickSetter(hero, 'opacity');
    function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
    var stage = ScrollTrigger.create({
      trigger: '#top', start: 'top top', end: 'bottom bottom',
      onUpdate: function (self) {
        var q = clamp((self.progress - .4) / .6);
        if (q > 0 && pass.progress() < 1) pass.progress(1);
        if (H) H.setQ(q);
        var out = clamp(q / .45);
        heroO(1 - out); heroY(-36 * out);
        if (concept) concept.style.opacity = 1 - out;
        if (cap) cap.style.opacity = 1 - out;
        if (scrim) scrim.style.opacity = 1 - clamp(q / .6);
        if (title) title.style.opacity = clamp((q - .3) / .3);
        // підпис шару з'являється, коли його лінія вже лягла (не перекреслюється прольотом)
        var d = [0, .03, .06, .08, .1];
        items.forEach(function (el, k) {
          var o = clamp((q - .46 - d[k] * .6) / .12);
          el.style.opacity = o;
          el.style.transform = 'translate3d(0,' + ((1 - o) * 14).toFixed(1) + 'px,0)';
        });
      }
    });

    // 3–6 вмикаються з першою прокруткою: доки відвідувач не рушив, уся сторінка нижче лежить готовою (знімок
    // цілої сторінки, друк, «Зберегти як»), а ховається й проявляється лише те, до чого прокрутка ще дійде.
    var armed = false, wipe, call, day, salon, edge;
    function arm() {
      if (armed) return; armed = true;
      window.removeEventListener('scroll', arm);
      // 3. Проява рядків прайсу: +18 px, 700 мс, тригер 0.8, нерівний стагер
      var revealSel = '.row, .said--small, .gap, .note, .group__layer, .h3, .shot figcaption';
      var els = gsap.utils.toArray(revealSel).filter(function (el) { return el.getBoundingClientRect().top > innerHeight; });
      gsap.set(els, { autoAlpha: 0, y: 26 });
      var steps = [0, .07, .12, .16, .19, .21];
      ScrollTrigger.batch(els, {
        start: 'top 80%', once: true,
        onEnter: function (batch) {
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', overwrite: true,
            stagger: function (i) { return steps[Math.min(i, steps.length - 1)]; } });
        }
      });

      // 3b. Кадри відкриваються, як світло з-за краю боксу: маска з округлими кутами розходиться, фото осідає з 1.1 до 1
      gsap.utils.toArray('.shot__img').filter(function (el) { return el.getBoundingClientRect().top > innerHeight; })
        .forEach(function (el) {
          var im = el.querySelector('img');
          gsap.set(el, { clipPath: 'inset(14% 10% 14% 10% round 32px)' }); gsap.set(im, { scale: 1.12 });
          ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: function () {
            gsap.to(el, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.8, ease: 'expo.out' });
            gsap.to(im, { scale: 1, duration: 2.4, ease: 'expo.out' });
          } });
        });
      // 3c. По панелі з чорного лаку один раз проходить відблиск лампи
      gsap.utils.toArray('.group').forEach(function (g) {
        ScrollTrigger.create({ trigger: g, start: 'top 72%', once: true, onEnter: function () { g.classList.add('is-lit'); } });
      });

      // 4. Передача «край плівки»: салон відкривається діагоналлю, по краю — яскрава лінія
      salon = document.getElementById('salon'); edge = document.querySelector('.salon__edge');
      var film = { p: 0 };
      function lay() {
        var w = salon.clientWidth, v = innerHeight, k = w * .22;
        var et = -k * .2 + (w + k * 1.4) * film.p, eb = et - k;
        if (film.p >= 1) { salon.style.clipPath = 'none'; edge.style.opacity = 0; return; }
        salon.style.clipPath = 'polygon(0 0,' + et.toFixed(1) + 'px 0,' + eb.toFixed(1) + 'px ' + v + 'px,' +
          eb.toFixed(1) + 'px 100%,0 100%)';
        edge.style.height = v + 'px';
        edge.style.opacity = film.p > .01 && film.p < .99 ? 1 : 0;
        edge.style.transform = 'translate3d(' + et.toFixed(1) + 'px,0,0) skewX(' + (-Math.atan(k / v)).toFixed(4) + 'rad)';
      }
      lay();
      wipe = gsap.to(film, { p: 1, ease: 'none', onUpdate: lay,
        scrollTrigger: { trigger: salon, start: 'top 95%', end: 'top 32%', scrub: .9 } });

      // 5. Передача «круг стає полем запису»: помаранчевий диск з першого екрана розростається з-під номера
      // зміст поля проступає лише в останні 40 % — рання фаза читається як чистий диск
      call = gsap.timeline({ scrollTrigger: { trigger: '#zapys', start: 'top 92%', end: 'top 10%', scrub: .8, invalidateOnRefresh: true } })
        .fromTo('#zapys', { clipPath: 'circle(40px at 50% 200px)' },
          { clipPath: function () { return 'circle(' + Math.round(Math.hypot(innerWidth, innerHeight) * 1.25) + 'px at 50% 200px)'; },
            ease: 'power2.in', duration: 1 }, 0)
        // зміст поля повністю видно, коли круг ще розростається (≈70 % радіуса) — номер ніколи не напівпрозорий на заповненому полі
        .fromTo('#zapys .wrap', { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: .25 }, .45);

      // 6. Передача «денне світло»: світла секція адреси стоїть вікном і розкривається на весь екран
      day = gsap.fromTo('#adresa', { clipPath: 'inset(7% 5% 0% 5% round 40px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
          scrollTrigger: { trigger: '#adresa', start: 'top 100%', end: 'top 40%', scrub: .9 } });
      ScrollTrigger.refresh();
      if (window.__cutUpdate) window.__cutUpdate();
    }
    if (window.scrollY > 4) arm(); else window.addEventListener('scroll', arm, { passive: true });

    return function () {
      window.removeEventListener('scroll', arm);
      pass.kill(); stage.kill();
      if (armed) { wipe.kill(); call.kill(); day.kill(); salon.style.clipPath = ''; edge.style.opacity = 0; }
      hero.style.opacity = ''; hero.style.transform = '';
      items.forEach(function (el) { el.style.opacity = ''; el.style.transform = ''; });
      if (H) H.polish();
    };
  });
})();
