/* Koruptsiya — концепт Velira. Рух: «Знято під нуль» + аркуш + розтікання печатки. */
(function () {
  'use strict';
  var d = document, html = d.documentElement;

  /* шапка → скляна капсула; док на телефоні — коли кнопки першого екрана пішли з екрана або їх накрив аркуш */
  var ctaVisible = true;
  var onScroll = function () {
    html.classList.toggle('is-scrolled', window.scrollY > 60);
    html.classList.toggle('dock-on', !ctaVisible || window.scrollY > window.innerHeight * 1.1);
  };
  var heroCta = d.querySelector('.hero .cta');
  if (heroCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { ctaVisible = en[0].isIntersecting; onScroll(); },
      { rootMargin: '0px 0px -10% 0px' }).observe(heroCta);
  } else { ctaVisible = false; }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!window.gsap || !window.ScrollTrigger) { html.classList.remove('shave'); return; }
  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  /* ---------- фірмовий момент: ніж машинки зрізає гриф зі щетини ---------- */
  function shave() {
    if (!html.classList.contains('shave')) return;
    var wrap = d.querySelector('.h1-wrap'), blade = d.querySelector('.blade');
    var words = [].slice.call(d.querySelectorAll('.h1 .w'));
    var canvas = d.querySelector('.crumbs'), host = d.querySelector('.hero-in');
    if (!wrap || !blade || !words.length || !canvas) { html.classList.remove('shave'); return; }

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var hostBox = host.getBoundingClientRect();
    canvas.width = Math.round(hostBox.width * dpr);
    canvas.height = Math.round(hostBox.height * dpr);
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    var wb = wrap.getBoundingClientRect();
    var ox = wb.left - hostBox.left, oy = wb.top - hostBox.top;
    var rects = words.map(function (w) {
      var r = w.getBoundingClientRect();
      return { el: w, l: r.left - wb.left, r: r.right - wb.left, t: r.top - wb.top, b: r.bottom - wb.top };
    });
    var minX = Math.min.apply(null, rects.map(function (r) { return r.l; })) - 30;
    var maxX = Math.max.apply(null, rects.map(function (r) { return r.r; })) + 30;
    var weak = (navigator.hardwareConcurrency || 4) <= 4 || window.innerWidth < 700;
    var perFrame = weak ? 5 : 10;
    var cols = ['#8f877c', '#a59d91', '#6f685f', '#bdb5a9', '#4c4640'];
    var bits = [], running = true, last = performance.now();

    function spawn(x) {
      rects.forEach(function (r) {
        if (x < r.l || x > r.r) return;
        for (var i = 0; i < perFrame; i++) {
          var y = r.t + (r.b - r.t) * (0.12 + Math.random() * 0.86);
          bits.push({
            x: ox + x - 2 + Math.random() * 6, y: oy + y,
            vx: 40 + Math.random() * 130, vy: -60 + Math.random() * 90,
            a: Math.random() * Math.PI, va: (Math.random() - 0.5) * 14,
            len: 3 + Math.random() * 6, life: 0, max: 0.6 + Math.random() * 0.5,
            c: cols[(Math.random() * cols.length) | 0], w: 0.8 + Math.random() * 0.8
          });
        }
      });
    }
    function draw(now) {
      var dt = Math.min((now - last) / 1000, 0.05); last = now;
      ctx.clearRect(0, 0, hostBox.width, hostBox.height);
      for (var i = bits.length - 1; i >= 0; i--) {
        var b = bits[i];
        b.life += dt;
        if (b.life > b.max) { bits.splice(i, 1); continue; }
        b.vy += 900 * dt; b.vx *= 0.985;
        b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.va * dt;
        ctx.globalAlpha = 1 - b.life / b.max;
        ctx.strokeStyle = b.c; ctx.lineWidth = b.w; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x + Math.cos(b.a) * b.len, b.y + Math.sin(b.a) * b.len);
        ctx.stroke();
      }
      if (running || bits.length) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, hostBox.width, hostBox.height);
    }
    requestAnimationFrame(draw);

    var p = { x: minX };
    gsap.set(blade, { x: minX - 14 });
    var tl = gsap.timeline({ delay: 0.05, onComplete: function () { running = false; html.classList.remove('shave'); } });
    tl.to(blade, { opacity: 1, duration: 0.15, ease: 'power1.out' }, 0)
      .to(p, {
        x: maxX, duration: 1.15, ease: 'power2.inOut',
        onUpdate: function () {
          gsap.set(blade, { x: p.x - 14 });
          rects.forEach(function (r) {
            var c = Math.max(0, Math.min(1, (p.x - r.l) / (r.r - r.l)));
            r.el.style.setProperty('--cut', c.toFixed(4));
          });
          spawn(p.x);
        }
      }, 0)
      .to(blade, { opacity: 0, duration: 0.2, ease: 'power1.in' }, 1.0);
  }

  /* ---------- сторінка ---------- */
  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    var started = false, go = function () { if (!started) { started = true; shave(); } };
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(go);
    setTimeout(go, 260);

    /* головне фото: з розфокусу */
    gsap.fromTo('.hero-pic img', { filter: 'blur(10px)', scale: 0.94 },
      { filter: 'blur(0px)', scale: 1, duration: 0.6, ease: 'power3.out', clearProps: 'filter' });

    /* аркуш прайсу накриває перший екран: спершу 0,75 екрана спокою */
    var vh = function () { return window.innerHeight; };
    gsap.fromTo('.hero-in', { scale: 1 }, {
      scale: 0.93, ease: 'none',
      scrollTrigger: { trigger: '#stage', start: function () { return 'top+=' + vh() * 0.75 + ' top'; },
        end: function () { return 'top+=' + vh() * 1.75 + ' top'; }, scrub: true, invalidateOnRefresh: true }
    });
    gsap.fromTo('.hero-dim', { opacity: 0 }, {
      opacity: 0.55, ease: 'none',
      scrollTrigger: { trigger: '#stage', start: function () { return 'top+=' + vh() * 0.75 + ' top'; },
        end: function () { return 'top+=' + vh() * 1.75 + ' top'; }, scrub: true, invalidateOnRefresh: true }
    });

    /* Прояви нижче першого екрана готуються ліниво, на першу прокрутку: поки людина не рушила сторінку,
       нічого не сховано (повний знімок сторінки й читання без прокрутки бачать увесь вміст). */
    var below = function (el) { return el.getBoundingClientRect().top > window.innerHeight * 1.02; };
    var armed = false;
    function arm() {
      if (armed) return; armed = true;
      ['scroll', 'wheel', 'touchmove', 'keydown'].forEach(function (e) { window.removeEventListener(e, arm); });
      var stamp = d.querySelector('.stamp');
      if (stamp && below(stamp)) gsap.fromTo(stamp, { scale: 1.16, rotation: -15, opacity: 0 }, {
        scale: 1, rotation: -8, opacity: 1, duration: 0.38, ease: 'power4.out',
        scrollTrigger: { trigger: stamp, start: 'top 92%', once: true }
      });
      /* печатка розтікається в червону главу: коло з центру печатки, радіус у пікселях екрана */
      var deals = d.querySelector('.deals');
      if (deals && below(deals)) {
        var origin = function () {
          var sb = stamp ? stamp.getBoundingClientRect() : null, db = deals.getBoundingClientRect();
          if (!sb) return '84% 0px';
          return Math.round(sb.left + sb.width / 2 - db.left) + 'px ' + Math.round(sb.top + sb.height / 2 - db.top) + 'px';
        };
        gsap.fromTo(deals, { clipPath: function () { return 'circle(0px at ' + origin() + ')'; } }, {
          clipPath: function () { return 'circle(' + Math.round(Math.hypot(window.innerWidth, window.innerHeight) * 1.15) + 'px at ' + origin() + ')'; },
          ease: 'power2.in',
          scrollTrigger: { trigger: deals, start: 'top 96%', end: 'top 20%', scrub: true, invalidateOnRefresh: true },
          onComplete: function () { deals.style.clipPath = 'none'; }
        });
      }
      /* знижки → авторитети: ніж машинки зрізає червону щетину вздовж межі */
      var trim = d.querySelector('.trim'), fringe = d.querySelector('.fringe'), tb = d.querySelector('.trim-blade');
      if (trim && below(d.querySelector('.team'))) {
        html.classList.add('trim-on');
        var tp = { v: 0 };
        gsap.to(tp, {
          v: 1, ease: 'none',
          scrollTrigger: { trigger: '.team', start: 'top 92%', end: 'top 25%', scrub: 0.3 },
          onUpdate: function () {
            var w = trim.offsetWidth;
            fringe.style.setProperty('--cut', tp.v.toFixed(4));
            gsap.set(tb, { x: tp.v * (w + 28) - 28 });
          }
        });
      }
      /* проява блоків */
      gsap.utils.toArray('[data-rv]').forEach(function (el) {
        if (!below(el)) return;
        gsap.fromTo(el, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: el.classList.contains('ticket-closed') ? 0.1 : 0,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true }
        });
      });
      /* колода «Авторитетів» розходиться віялом */
      var deck = d.querySelector('.deck');
      if (deck && below(deck)) gsap.from('.deck .card', {
        rotation: 0, x: 0, y: 24, duration: 0.7, ease: 'power3.out', stagger: { each: 0.08, from: 'end' },
        scrollTrigger: { trigger: deck, start: 'top 78%', once: true }
      });
      window.ScrollTrigger.refresh();
    }
    ['scroll', 'wheel', 'touchmove', 'keydown'].forEach(function (e) { window.addEventListener(e, arm, { passive: true }); });
    if (window.scrollY > 0) arm();
  });
  mm.add('(prefers-reduced-motion: reduce)', function () { html.classList.remove('shave'); });

  if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { window.ScrollTrigger.refresh(); });
})();
