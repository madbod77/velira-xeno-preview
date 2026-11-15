/* AG Nail Studio — концепт Velira. Рух: «Віяло розкривається, френч викладається». */
(function () {
  'use strict';
  var root = document.documentElement;
  var hasG = !!(window.gsap && window.ScrollTrigger);
  var reduce = !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function unhide() { root.classList.remove('js-motion', 'fan-pre'); }
  if (!hasG) { unhide(); }

  /* ---------- services fan: active tip follows the card in view (works in every mode) ---------- */
  var stage = document.querySelector('.serv-stage .fan');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.svc'));
  var rot = stage ? stage.querySelector('.fan-rot') : null;
  var angleOf = {};
  if (stage) Array.prototype.forEach.call(stage.querySelectorAll('.fan-blade'), function (b) {
    angleOf[b.getAttribute('data-key')] = parseFloat(b.getAttribute('data-angle'));
  });
  var keys = cards.map(function (c) { return c.getAttribute('data-key'); });
  var active = -1;
  function setActive(i) {
    if (i === active || !stage) return;
    active = i;
    var key = keys[i];
    cards.forEach(function (c, j) { c.classList.toggle('is-on', j === i); });
    Array.prototype.forEach.call(stage.querySelectorAll('.fan-blade'), function (b) {
      var on = b.getAttribute('data-key') === key;
      b.classList.toggle('is-dim', !on);
      if (on) rot.appendChild(b); // bring the active tip to the front
    });
  }
  // keep every tip label readable whatever way the fan is turned
  var lastSide = {};
  function orient(groupDeg) {
    if (!stage) return;
    Array.prototype.forEach.call(stage.querySelectorAll('.fan-blade'), function (b) {
      var k = b.getAttribute('data-key'), eff = angleOf[k] + groupDeg, side = eff < -4 ? 'down' : 'up';
      if (lastSide[k] === side) return;
      lastSide[k] = side;
      b.querySelector('.fan-label').setAttribute('transform', side === 'down' ? 'translate(-6 -300) rotate(90)' : 'translate(6 -150) rotate(-90)');
    });
  }
  function setRotation(deg) {
    orient(deg);
    if (!rot) return;
    if (hasG) gsap.set(rot, { rotation: deg, svgOrigin: '0 0' });
    else rot.setAttribute('transform', 'rotate(' + deg + ')');
  }

  /* dock + header Viber on the phone: only after the hero buttons leave the screen */
  var heroAct = document.getElementById('hero-act');
  if (heroAct && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { root.classList.toggle('cta-away', !e.isIntersecting && e.boundingClientRect.top < 0); });
    }).observe(heroAct);
  } else { root.classList.add('cta-away'); }

  if (stage && cards.length && (!hasG || reduce)) {
    // no scroll scene: switch instantly when a card reaches the middle of the screen
    setActive(0); setRotation(-angleOf[keys[0]]);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          var i = cards.indexOf(e.target);
          setActive(i); setRotation(-angleOf[keys[i]]);
        });
      }, { rootMargin: '-45% 0px -45% 0px' });
      cards.forEach(function (c) { io.observe(c); });
    }
  }
  if (!hasG) return;

  gsap.registerPlugin(ScrollTrigger);
  var IN = 'cubic-bezier(.2,.7,.2,1)';

  /* ---------- bar + dock ---------- */
  var bar = document.getElementById('bar');
  ScrollTrigger.create({
    start: 40, end: 'max',
    onToggle: function (s) {
      bar.classList.toggle('is-solid', s.isActive);
    }
  });

  if (reduce) return;

  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function () {

    /* ---------- HERO: fan opens, French is laid, top coat glints ---------- */
    var hero = document.querySelector('.hero .fan');
    var blades = hero ? Array.prototype.slice.call(hero.querySelectorAll('.fan-blade')) : [];
    var closed = [-4, -2, 2, 4, 0];
    blades.forEach(function (b, i) { gsap.set(b, { rotation: closed[i] || 0, svgOrigin: '0 0' }); });
    var french = hero && hero.querySelector('.fan-french');
    var brush = hero && hero.querySelector('.fan-brushrect');
    var dot = hero && hero.querySelector('.fan-brushdot');
    var line = hero && hero.querySelector('.fan-smile-line');
    var sweep = hero && hero.querySelector('.fan-sweep');
    if (brush) gsap.set(brush, { attr: { width: 0 } });
    if (french) gsap.set(french, { opacity: 1 });
    root.classList.remove('fan-pre'); // GSAP owns the transforms from here

    var tl = gsap.timeline({ delay: .12 });
    tl.fromTo('.hero-bg img', { filter: 'blur(10px)', scale: 1.06 }, { filter: 'blur(0px)', scale: 1, duration: .9, ease: IN }, 0)
      .fromTo('.hero-title', { opacity: .15 }, { opacity: 1, duration: .5, ease: 'power1.out' }, 0);
    blades.forEach(function (b, i) {
      if (i === blades.length - 1) return; // French stays upright in front
      tl.to(b, { rotation: parseFloat(b.getAttribute('data-angle')), svgOrigin: '0 0', duration: 1.1, ease: 'back.out(1.15)' }, .12 + i * .07);
    });
    if (brush && line && dot) {
      var len = line.getTotalLength(), st = { p: 0 };
      tl.set(dot, { opacity: 1 }, 1.05)
        .to(st, {
          p: 1, duration: .65, ease: 'power2.inOut',
          onUpdate: function () {
            var pt = line.getPointAtLength(len * st.p);
            dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
            brush.setAttribute('width', (80 * st.p).toFixed(2));
          }
        }, 1.05)
        .to(dot, { opacity: 0, duration: .2 }, 1.7);
    }
    if (sweep) {
      tl.set(sweep, { opacity: 1 }, 1.65)
        .fromTo(sweep, { attr: { x: -260 } }, { attr: { x: 60 }, duration: .6, ease: 'power1.inOut' }, 1.65)
        .set(sweep, { opacity: 0 });
    }

    /* ---------- split display titles into words ---------- */
    Array.prototype.forEach.call(document.querySelectorAll('.split'), function (el) {
      var words = el.textContent.trim().split(/\s+/);
      el.setAttribute('aria-label', el.textContent.trim());
      el.innerHTML = words.map(function (w) { return '<span class="wm" aria-hidden="true"><span class="w">' + w + '</span></span>'; }).join(' ');
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: function () { gsap.to(el.querySelectorAll('.w'), { y: 0, yPercent: 0, duration: .65, ease: 'back.out(1.02)', stagger: .04 }); }
      });
      gsap.set(el.querySelectorAll('.w'), { yPercent: 105 });
    });

    /* ---------- block reveals: opacity + Y 18, 700 ms, trigger .80, stagger 80 ms ---------- */
    var phone = window.matchMedia('(max-width: 899px)').matches;
    var rv = document.querySelectorAll((phone ? '' : '.svc-kicker, .svc-name, .svc-text, .svc-quote, .svc-rows, .svc-foot, ') + '.serv-sub, .safe-lead, .safe-slot, .safe-note, .visit-sub, .visit-act, .visit-where .fine, .visit-media, .hours, .contact');
    Array.prototype.forEach.call(rv, function (e) { e.classList.add('rv'); });
    ScrollTrigger.batch(rv, {
      start: 'top 80%', once: true,
      onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: .7, ease: IN, stagger: { each: .08, amount: Math.min(.4, els.length * .08) } }); }
    });

    /* ---------- HERO → SERVICES: one fan handed over (hero fan leaves, the stage fan starts from the same open pose) ---------- */
    // strictly one fan on screen: the hero fan fades out first, only then the stage fan fades in (0.15 screen)
    gsap.fromTo('.hero-fan', { opacity: 1 }, { opacity: 0, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: '.hero', start: 'bottom 55%', end: 'bottom 25%', scrub: true } });
    gsap.fromTo('.serv-stage .fan', { opacity: 0 }, { opacity: 1, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'bottom 25%', end: 'bottom 10%', scrub: true } });

    /* ---------- SERVICES: scroll turns the fan around the rivet ---------- */
    if (stage && cards.length) {
      var angles = keys.map(function (k) { return -angleOf[k]; });
      setActive(0);
      Array.prototype.forEach.call(stage.querySelectorAll('.fan-blade'), function (b) { b.classList.remove('is-dim'); });
      gsap.set(rot, { rotation: 0, svgOrigin: '0 0' });
      orient(0);
      var turn = gsap.quickTo(rot, 'rotation', { duration: .55, ease: 'power3.out' });
      // pre-roll: the open pose from the hero turns to «Манікюр» as the stage arrives
      ScrollTrigger.create({
        trigger: '.serv-stage', start: 'top 95%', endTrigger: phone ? '.serv-grid' : '.serv-list', end: phone ? 'top top' : 'top 55%',
        onUpdate: function (s) {
          if (s.progress >= 1) return;
          var a = angles[0] * s.progress; turn(a); orient(a);
          Array.prototype.forEach.call(stage.querySelectorAll('.fan-blade'), function (b) {
            b.classList.toggle('is-dim', s.progress > .5 && b.getAttribute('data-key') !== keys[0]);
          });
        }
      });
      ScrollTrigger.create({
        trigger: phone ? '.serv-grid' : '.serv-list', start: phone ? 'top top' : 'top 55%', end: phone ? 'bottom bottom' : 'bottom 55%',
        onUpdate: function (s) {
          if (s.progress <= 0) return;
          var f = Math.max(0, Math.min(keys.length - 1, s.progress * keys.length - .5));
          var i0 = Math.floor(f), t = f - i0, a = angles[i0] + ((angles[i0 + 1] !== undefined ? angles[i0 + 1] : angles[i0]) - angles[i0]) * t;
          // dwell on each tip: ease the in-between so the active tip holds upright
          var tt = t < .35 ? 0 : t > .65 ? 1 : (t - .35) / .3;
          a = angles[i0] + ((angles[i0 + 1] !== undefined ? angles[i0 + 1] : angles[i0]) - angles[i0]) * tt;
          turn(a);
          setActive(Math.round(i0 + tt));
          orient(a);
        }
      });
    }

    /* ---------- TRANSITION 1: lacquer contracts into the first ⭕ ---------- */
    var safe = document.querySelector('.safe'), lac = document.querySelector('.safe-lacquer'), ring = document.querySelector('.ring-a');
    if (safe && lac && ring) {
      var geo = { x: 0, y: 0, r0: 0, r1: 0 };
      var measure = function () {
        var sr = safe.getBoundingClientRect(), rr = ring.getBoundingClientRect();
        geo.x = rr.left - sr.left + rr.width / 2; geo.y = rr.top - sr.top + rr.height / 2;
        geo.r1 = rr.width / 2;
        geo.r0 = Math.hypot(Math.max(geo.x, sr.width - geo.x), Math.max(geo.y, sr.height)) + 40;
      };
      measure();
      var draw = function (p) {
        if (p <= 0.001) { lac.style.clipPath = 'circle(0px at 50% 0%)'; return; } // not entered yet: nothing to cover
        var e = 1 - Math.pow(1 - p, 2.2);
        var r = geo.r0 + (geo.r1 - geo.r0) * e;
        lac.style.clipPath = 'circle(' + r.toFixed(1) + 'px at ' + geo.x.toFixed(1) + 'px ' + geo.y.toFixed(1) + 'px)';
        lac.style.opacity = p > .9 ? String(Math.max(0, 1 - (p - .9) / .1)) : '1';
      };
      draw(0);
      ScrollTrigger.create({
        trigger: safe, start: 'top bottom', end: 'top 30%', scrub: true,
        onRefresh: function (s) { measure(); draw(s.progress); },
        onUpdate: function (s) { draw(s.progress); }
      });
    }

    /* ---------- TRANSITION 2: the smile line straightens as «Як дійти» rises ---------- */
    var smile = document.querySelector('.smile');
    if (smile) {
      gsap.fromTo(smile, { scaleY: 1, transformOrigin: '50% 0%' }, {
        scaleY: .12, ease: 'none',
        scrollTrigger: { trigger: '.visit', start: 'top 95%', end: 'top 25%', scrub: true }
      });
    }

    return function () { root.classList.remove('js-motion'); };
  });

  // safety net: never leave anything hidden if a trigger misfires
  window.addEventListener('load', function () { setTimeout(function () { ScrollTrigger.refresh(); }, 60); });
})();
