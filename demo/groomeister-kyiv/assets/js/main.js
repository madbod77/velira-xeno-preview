/* Groomeister concept · motion: «циркуль стриже» — each construction circle trims the fur inside it; the table turns between breeds. */
(function () {
  var d = document.documentElement;
  if (!d.classList.contains('js') || !window.gsap) { d.classList.remove('js'); return; }
  window.__groomReady = true;
  var gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  var IN = 'power3.out';
  var desk = window.matchMedia('(min-width: 960px)');
  var slow = (navigator.hardwareConcurrency || 8) <= 4;
  if (slow) d.classList.add('lite');

  function q(el, s) { return Array.prototype.slice.call(el.querySelectorAll(s)); }

  /* arm: fur visible, clean geometry clipped to nothing, construction undrawn */
  function arm(dog) {
    q(dog, '.cl, .mk').forEach(function (s) { gsap.set(s, { scale: 0, svgOrigin: s.getAttribute('data-o') }); });
    q(dog, '.cs').forEach(function (s) {
      var L = s.getTotalLength ? s.getTotalLength() : 400;
      gsap.set(s, { strokeDasharray: L + ' ' + L, strokeDashoffset: L });
    });
    gsap.set(q(dog, '.crad, .cdot'), { opacity: 0 });
    gsap.set(dog.querySelector('.constr'), { opacity: 1 });
    gsap.set(dog.querySelector('.fuzzy'), { opacity: 1 });
    dog.classList.add('armed');
  }

  /* trim: circles by rank k (head first); each draws, then fills with clean coat from its centre */
  function trim(dog, k) {
    k = k || 1;
    var ranks = {};
    q(dog, '.cs').forEach(function (s) { var r = s.getAttribute('data-k'); (ranks[r] = ranks[r] || []).push(s); });
    var keys = Object.keys(ranks).sort(function (a, b) { return a - b; });
    var steps = [0.14, 0.11, 0.09, 0.08, 0.08, 0.07, 0.07, 0.07];
    var tl = gsap.timeline();
    var t = 0.12 * k;
    keys.forEach(function (r, i) {
      var fill = q(dog, '.cl[data-k="' + r + '"], .mk[data-k="' + r + '"]');
      var extra = q(dog, '.crad[data-k="' + r + '"]');
      tl.to(ranks[r], { strokeDashoffset: 0, duration: 0.5 * k, ease: 'power1.inOut' }, t);
      if (extra.length) tl.to(extra.concat(q(dog, '.cdot')), { opacity: 1, duration: 0.2 * k }, t + 0.2 * k);
      tl.to(fill, { scale: 1, duration: 0.45 * k, ease: IN }, t + 0.42 * k);
      t += (steps[i] || 0.07) * (i < 2 ? 1 : k);
    });
    tl.to(dog.querySelector('.fuzzy'), { opacity: 0, duration: 0.3, ease: 'power1.out' }, '>-0.12');
    tl.to(dog.querySelector('.constr'), { opacity: 0.32, duration: 0.3, ease: 'power1.out' }, '<');
    return tl;
  }

  function spin(svg, amount, dur) {
    var rim = svg.querySelector('.rim');
    if (rim) gsap.to(rim, { strokeDashoffset: '-=' + amount, duration: dur, ease: 'power2.inOut', overwrite: 'auto' });
  }

  /* ---------- hero: the signature on load ---------- */
  function heroOnce(svg) {
    var dog = svg.querySelector('.dog.is-on') || svg.querySelector('.dog');
    arm(dog);
    spin(svg, 125, 2.0);
    return trim(dog, 1);
  }

  /* ---------- desktop: one sticky table that turns between breeds ---------- */
  function deskStage() {
    var svg = document.querySelector('.tsvg--stage');
    if (!svg) return;
    var dogs = {}; q(svg, '.dog').forEach(function (g) { dogs[g.getAttribute('data-breed')] = g; });
    var nameEl = document.querySelector('.stage-name'), nEl = document.querySelector('.stage-n');
    var active = 'pudel', current = heroOnce(svg), turning = null;
    gsap.set(q(svg, '.dog:not(.is-on)'), { autoAlpha: 0 });

    function caption(key) {
      var g = dogs[key];
      gsap.to([nameEl, nEl], { opacity: 0, duration: 0.15, ease: 'power1.in', onComplete: function () {
        nameEl.textContent = g.getAttribute('data-name'); nEl.textContent = '· схема з ' + g.getAttribute('data-n');
        gsap.to([nameEl, nEl], { opacity: 1, duration: 0.3, ease: 'power1.out' });
      } });
    }
    function turnTo(key) {
      if (key === active || !dogs[key]) return;
      if (turning) turning.progress(1);
      if (current) current.progress(1);
      var out = dogs[active], inn = dogs[key];
      active = key;
      caption(key);
      spin(svg, 60, 0.6);
      arm(inn);
      var so = { s: 1 }, si = { s: 0.12 };
      function put(el, s) { el.setAttribute('transform', 'translate(214 298) scale(' + s.toFixed(4) + ' 1) translate(-214 -298)'); }
      turning = gsap.timeline();
      turning.to(so, { s: 0.12, duration: 0.2, ease: 'power2.in', onUpdate: function () { put(out, so.s); } }, 0)
        .to(out, { autoAlpha: 0, duration: 0.12, ease: 'power1.in' }, 0.08)
        .add(function () { put(inn, 0.12); }, 0.16)
        .to(si, { s: 1, duration: 0.3, ease: 'power3.out', onUpdate: function () { put(inn, si.s); } }, 0.16)
        .to(inn, { autoAlpha: 1, duration: 0.12, ease: 'power1.out' }, 0.16)
        .add(function () { put(out, 1); current = trim(inn, 0.55); }, 0.46);
    }
    var arts = q(document, '.breed');
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) turnTo(e.target.getAttribute('data-breed')); });
    }, { rootMargin: '-35% 0px -45% 0px' });
    arts.forEach(function (a) { io.observe(a); });
    var hero = document.querySelector('.hero');
    new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting && e.intersectionRatio > 0.35) turnTo('pudel'); });
    }, { threshold: [0, 0.35, 0.6] }).observe(hero);

    /* price sheet rises from under the table; the stage dims under it */
    if (window.ScrollTrigger) {
      gsap.fromTo('.sheet', { y: 160, scale: 0.94, borderTopLeftRadius: 56, borderTopRightRadius: 56 },
        { y: 0, scale: 1, borderTopLeftRadius: 36, borderTopRightRadius: 36, ease: 'none',
          scrollTrigger: { trigger: '.sheet', start: 'top 100%', end: 'top 45%', scrub: 0.4 } });
      gsap.fromTo('.stage', { filter: 'brightness(1)' }, { filter: 'brightness(0.82)', ease: 'none',
        scrollTrigger: { trigger: '.sheet', start: 'top 100%', end: 'top 45%', scrub: 0.4 } });
    }
  }

  /* ---------- phone (and narrow): hero table + each breed trims on enter ---------- */
  function phone() {
    var hs = document.querySelector('.hero-stage .tsvg');
    if (hs) heroOnce(hs);
    var minis = q(document, '.mini:not(.mini--hero-dup) .tsvg');
    minis.forEach(function (s) { arm(s.querySelector('.dog')); });
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        spin(e.target, 70, 1.4);
        trim(e.target.querySelector('.dog'), 0.7);
      });
    }, { rootMargin: '0px 0px -25% 0px' });
    minis.forEach(function (s) { io.observe(s); });
    if (window.ScrollTrigger) {
      gsap.fromTo('.sheet', { y: 70, scale: 0.96 }, { y: 0, scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.sheet', start: 'top 100%', end: 'top 55%', scrub: 0.4 } });
    }
  }

  if (desk.matches) deskStage(); else phone();

  /* ---------- the crest circle grows into Anna's section ---------- */
  if (window.ScrollTrigger) {
    gsap.fromTo('.anna', { clipPath: 'circle(14% at 50% 0%)' }, { clipPath: 'circle(150% at 50% 0%)', ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: '.anna', start: 'top 100%', end: 'top 36%', scrub: 0.4 } });
    /* one entrance per container: the iris is the entrance, the content inside stands still */
  }
})();
