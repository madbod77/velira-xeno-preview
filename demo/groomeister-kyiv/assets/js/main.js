/* Groomeister concept · motion: «циркуль наводить фокус» — each construction circle the compass closes brings the dog
   on the turntable into focus inside it; between breeds the next dog arrives soft and is focused again. Then the shot breathes. */
(function () {
  var d = document.documentElement;
  if (!d.classList.contains('js') || !window.gsap) { d.classList.remove('js'); return; }
  window.__groomReady = true;
  var gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  var IN = 'power3.out';
  var desk = window.matchMedia('(min-width: 960px)');

  function q(el, s) { return Array.prototype.slice.call(el.querySelectorAll(s)); }

  /* ---------- breathing: a slow, barely-there push-in on the shot; paused off screen ---------- */
  var breaths = [];
  function breathe(shot) {
    if (shot.__breath) return shot.__breath;
    var tw = gsap.to(shot.querySelector('.shot-in'), { scale: 1.024, y: -3, duration: 5.6, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true });
    shot.__breath = tw; breaths.push(shot);
    vis.observe(shot);
    return tw;
  }
  var vis = new IntersectionObserver(function (ents) {
    ents.forEach(function (e) {
      var s = e.target, tw = s.__breath; if (!tw) return;
      s.__seen = e.isIntersecting;
      if (e.isIntersecting && s.classList.contains('is-on') && !document.hidden) tw.play(); else tw.pause();
    });
  }, { threshold: 0.05 });
  document.addEventListener('visibilitychange', function () {
    breaths.forEach(function (s) { if (document.hidden || !s.__seen || !s.classList.contains('is-on')) s.__breath.pause(); else s.__breath.play(); });
  });

  /* arm: soft photo over everything, construction undrawn, focus circles closed */
  function arm(shot) {
    shot.classList.remove('done');
    q(shot, '.mq').forEach(function (s) { gsap.set(s, { scale: 0, svgOrigin: s.getAttribute('data-o') }); });
    q(shot, '.cs').forEach(function (s) {
      var L = s.getTotalLength ? s.getTotalLength() : 1200;
      gsap.set(s, { strokeDasharray: L + ' ' + L, strokeDashoffset: L });
    });
    gsap.set(q(shot, '.crad, .cdot'), { opacity: 0 });
    gsap.set(shot.querySelector('.constr'), { opacity: 1 });
    gsap.set(shot.querySelector('.soft'), { opacity: 1 });
    shot.classList.add('armed');
  }

  /* focus: circles by rank k (head first); each draws, then the photo turns sharp inside it from its centre */
  function focus(shot, k) {
    k = k || 1;
    var ranks = {};
    q(shot, '.cs').forEach(function (s) { var r = s.getAttribute('data-k'); (ranks[r] = ranks[r] || []).push(s); });
    var keys = Object.keys(ranks).sort(function (a, b) { return a - b; });
    var steps = [0.16, 0.13, 0.11, 0.09, 0.08, 0.08];
    var tl = gsap.timeline();
    var t = 0.12 * k;
    keys.forEach(function (r, i) {
      var fill = q(shot, '.mq[data-k="' + r + '"]');
      var extra = q(shot, '.crad[data-k="' + r + '"]');
      tl.to(ranks[r], { strokeDashoffset: 0, duration: 0.55 * k, ease: 'power1.inOut' }, t);
      if (extra.length) tl.to(extra.concat(q(shot, '.cdot')), { opacity: 1, duration: 0.2 * k }, t + 0.2 * k);
      tl.to(fill, { scale: 1, duration: 0.5 * k, ease: IN }, t + 0.42 * k);
      t += (steps[i] || 0.08) * (i < 2 ? 1 : k);
    });
    tl.to(shot.querySelector('.soft'), { opacity: 0, duration: 0.45, ease: 'power1.out' }, '>-0.15');
    tl.to(shot.querySelector('.constr'), { opacity: 0.55, duration: 0.4, ease: 'power1.out' }, '<');
    tl.add(function () { shot.classList.add('done'); breathe(shot); if (shot.__seen !== false) shot.__breath.play(); });
    return tl;
  }

  function ready(img, fn) {
    if (!img || (img.complete && img.naturalWidth)) { fn(); return; }
    var done = false; function go() { if (!done) { done = true; fn(); } }
    img.addEventListener('load', go, { once: true }); img.addEventListener('error', go, { once: true });
    setTimeout(go, 900);
  }

  /* ---------- hero: the signature on load ---------- */
  function heroOnce(shot) {
    arm(shot);
    var tl = gsap.timeline({ paused: true }).add(focus(shot, 1));
    ready(shot.querySelector('.shot-img'), function () { tl.play(); });
    return tl;
  }

  /* ---------- desktop: one sticky table; the next breed arrives soft and is focused ---------- */
  function deskStage() {
    var frame = document.querySelector('.stage-frame');
    if (!frame) return;
    var shots = {}; q(frame, '.shot').forEach(function (g) { shots[g.getAttribute('data-breed')] = g; });
    var nameEl = document.querySelector('.stage-name'), nEl = document.querySelector('.stage-n');
    var active = 'pudel', current = heroOnce(shots.pudel), turning = null;
    q(frame, '.shot:not(.is-on)').forEach(function (s) { gsap.set(s, { autoAlpha: 0 }); arm(s); });

    function caption(key) {
      var g = shots[key];
      gsap.to([nameEl, nEl], { opacity: 0, duration: 0.15, ease: 'power1.in', overwrite: 'auto', onComplete: function () {
        nameEl.textContent = g.getAttribute('data-name'); nEl.textContent = '· кола побудови: ' + g.getAttribute('data-n');
        gsap.to([nameEl, nEl], { opacity: 1, duration: 0.3, ease: 'power1.out' });
      } });
    }
    function turnTo(key) {
      if (key === active || !shots[key]) return;
      if (turning) turning.progress(1);
      if (current) current.progress(1);
      var out = shots[active], inn = shots[key];
      active = key;
      caption(key);
      if (out.__breath) out.__breath.pause();
      inn.classList.add('is-on');
      arm(inn);
      gsap.set(inn, { zIndex: 2 }); gsap.set(out, { zIndex: 1 });
      /* a sequence, not a double exposure: the old dog leaves first, the new one arrives half-soft and is focused fast */
      gsap.set(inn.querySelector('.soft'), { opacity: 0.5 });
      turning = gsap.timeline();
      turning.to(out, { autoAlpha: 0, scale: 0.96, duration: 0.25, ease: 'power2.in' }, 0)
        .fromTo(inn, { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: IN }, 0.2)
        .add(function () { current = focus(inn, 0.35); }, 0.2)
        .add(function () { if (out !== shots[active]) { out.classList.remove('is-on'); gsap.set(out, { scale: 1 }); } }, 0.3);
    }
    var arts = q(document, '.breed');
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) turnTo(e.target.getAttribute('data-breed')); });
    }, { rootMargin: '-30% 0px -60% 0px' });
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
      /* the table leaves before only a head band of the last dog could show above the sheet */
      gsap.fromTo('.stage', { opacity: 1 }, { opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.sheet', start: 'top 85%', end: 'top 55%', scrub: 0.3 } });
    }
  }

  /* ---------- phone (and narrow): hero shot + each breed is focused on enter ---------- */
  function phone() {
    var hs = document.querySelector('.hero-stage .shot');
    if (hs) heroOnce(hs);
    var minis = q(document, '.mini:not(.mini--hero-dup) .shot');
    minis.forEach(function (s) { arm(s); });
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var s = e.target;
        ready(s.querySelector('.shot-img'), function () { focus(s, 0.75); });
      });
    }, { rootMargin: '0px 0px -22% 0px' });
    minis.forEach(function (s) { io.observe(s); });
    if (window.ScrollTrigger) {
      gsap.fromTo('.sheet', { y: 70, scale: 0.96 }, { y: 0, scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.sheet', start: 'top 100%', end: 'top 55%', scrub: 0.4 } });
    }
  }

  if (desk.matches) deskStage(); else phone();

  /* ---------- the crest circle grows into Anna's section ---------- */
  if (window.ScrollTrigger) {
    if (desk.matches) {
      gsap.fromTo('.anna', { clipPath: 'circle(14% at 50% 0%)' }, { clipPath: 'circle(150% at 50% 0%)', ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: '.anna', start: 'top 100%', end: 'top 36%', scrub: 0.4 } });
    } else {
      /* phone: the section is tall and narrow, so % radii blow past the screen at once; px radii keep a readable disc */
      var big = Math.ceil(Math.hypot(window.innerWidth, document.querySelector('.anna').offsetHeight)) + 40;
      gsap.fromTo('.anna', { clipPath: 'circle(120px at 50% 0px)' }, { clipPath: 'circle(' + big + 'px at 50% 0px)', ease: 'power2.in', immediateRender: false,
        scrollTrigger: { trigger: '.anna', start: 'top 100%', end: 'top 30%', scrub: 0.4 } });
    }
  }
})();
