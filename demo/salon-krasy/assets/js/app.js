/* «Десять тонів» · концепт Velira — сцена з пасмом, картки цін на позначках довжини, передачі між секціями, аркуш дії.
   Рух: лише transform / opacity / clip-path / filter; пружини як в iOS; рендер WebGL — тільки поки щось рухається.
   Без WebGL або з prefers-reduced-motion — статичний стан із постером і тим самим змістом. */
(function () {
  'use strict';
  var W = window, D = document, R = D.documentElement, gsap = W.gsap;
  var $ = function (s, c) { return (c || D).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || D).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var c01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var sm = function (v) { v = c01(v); return v * v * (3 - 2 * v); };
  var mix = function (a, b, t) { return a + (b - a) * t; };
  var NB = ' ';
  var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NB); };

  if (!gsap || !W.Strand) { R.classList.remove('js'); R.classList.remove('motion'); return; }   // без бібліотек — статичний стан, як без JS
  var late = !R.classList.contains('js');           // запасний таймер уже показав статичний стан — вхід не програємо
  W.__appReady = true;
  R.classList.add('js');
  var reduce = !!(W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var motion = !reduce && !late && R.classList.contains('motion');
  if (!motion) R.classList.remove('motion');

  // Умовні ціни й описи — з брифу концепту (медіани публічних прайсів київських салонів, листопад 2026)
  var TECH = [
    { name: 'Балаяж', gen: 'балаяж', desc: 'Балаяж: світлі пасма мазками, корінь лишається своїм.', time: '3–5 год', prices: [4500, 5500, 6150, 7000], before: 5, img: 'tech-balayage' },
    { name: 'Омбре', gen: 'омбре', desc: 'Омбре: темніший корінь, світліші кінці.', time: '3–5 год', prices: [4500, 5500, 6150, 7000], before: 5, img: 'tech-ombre' },
    { name: 'Корені', gen: 'корені', desc: 'Корені: фарба лише на відрослу частину.', time: 'близько 1,5 год', prices: [1800, 1800, 1800, 1800], flat: true, before: 6, img: 'tech-roots' },
    { name: 'Однотонне', gen: 'однотонне', desc: 'Однотонне: один колір від кореня до кінців.', time: '1,5–2 год', prices: [2400, 2750, 3100, 4150], before: 5, img: 'tech-solid' },
    { name: 'Тонування', gen: 'тонування', desc: 'Тонування: змінює відтінок, а не рівень.', time: 'близько 1,5 год', prices: [1750, 2100, 2500, 3500], before: 7, img: 'tech-toner' }
  ];
  var MARKS = [
    { t: 0.29, label: 'до підборіддя', cm: 'до 15 см', side: 1 },
    { t: 0.48, label: 'до плечей', cm: '15–25 см', side: -1 },
    { t: 0.67, label: 'до лопаток', cm: '25–35 см', side: 1 },
    { t: 0.885, label: 'до пояса', cm: 'від 45 см', side: -1 }
  ];
  var WEEKS = [{ w: '4 тижні', cm: '1,2' + NB + 'см', t: 0.0235 }, { w: '8 тижнів', cm: '2,3' + NB + 'см', t: 0.045 }, { w: '12 тижнів', cm: '3,5' + NB + 'см', t: 0.0686 }];
  var ROOT_T = 0.29, ROOT_CHIP = 0;
  var LIGHT0 = [0.78, 1.4, 2.3];                    // те саме світло, що на постері

  /* ── елементи ── */
  var world = $('.world'), canvas = $('#strand'), cone = $('.world__cone'), poster = $('#poster');
  var heroScene = $('.scene--hero'), heroIn = $('#hero-in'), box = $('#strandbox'), hint = $('#hint');
  var rail = $('#rail'), railScroll = $('.rail__scroll'), track = $('.rail__track'), tabs = $$('[role="radio"]', track), subEl = $('#sub span'), ink = $('#ink');
  var dock = $('#dock'), island = $('#island'), navEl = $('.nav'), heroCta = $('.heroact .btn'), railMore = $('#railmore');
  var sheetTech = $('.sheet--tech'), stageLen = $('.stage--len'), sheetPhoto = $('.sheet--photo'), stageGrow = $('.stage--grow'), sheetBook = $('.sheet--book'), bookH2 = $('#h2-book'), techHead = $('.head', $('.sheet--tech')), bookHead = $('.head', $('.sheet--book')), growHead = $('.head', $('.scene--grow')), foot = $('.foot');
  var sceneLen = $('.scene--len'), sceneGrow = $('.scene--grow');
  var lenIn = $('.scene__in', sceneLen), lenHead = $('.head', sceneLen), lenViz = $('.lenviz'), lenPanel = $('.lenpanel'), lenFocus = $('.lenviz__focus'), lenGap = $('#lengap'), lenSeg = $('#lenseg'), lenPick = $('#lenpick');
  var lenCards = $$('.lencard'), lenCard = lenCards[0];
  var growIn = $('.scene__in', sceneGrow), growViz = $('.growviz'), growTag = $('#growtag'), growSeg = $('#growseg');
  var tones = $('#tones'), toneEls = $$('i', tones), fly = $('#fly'), flyA = $('.fly__a'), flyB = $('.fly__b'), slotA = $('#slot-a'), slotB = $('#slot-b');
  var sumLabels = $$('[data-sum-label]'), sumPrices = $$('[data-sum-price]');

  var small = W.innerWidth < 960;
  var strand = new W.Strand(canvas, { fibres: small ? 4600 : 7200, segs: small ? 52 : 64 });
  var S = strand.s;
  S.light = LIGHT0.slice();

  var st = { tech: 0, len: -1, weeks: 1, W: 0, H: 0, WH: 0, desktop: false, time: 0, last: 0, scene: '', lenIdx: -1, life: 0, paused: false, live: false, gl: false,
    heroSc: 1, dockRest: null, flyIn: false, tonesOn: false, armed: false, introDone: !motion };
  var G = { boxX: 0, boxY: 0, boxW: 0, boxH: 0, unit0: 1, cx0: 0, cy0: 0, tTech: 0, bTech: 0, tLen: 0, tPhoto: 0, bPhoto: 0, tGrow: 0, tBook: 0, bBook: 0, bookEnd: 0.3,
    lenFocusY: 0, lenVizX: 0, lenVizY: 0, growVizX: 0, growVizY: 0, growTop: 0, slotA: null, slotB: null, toneScale: 1 };
  var I = { front: 1.3, glow: 0, wipe: 1.3, pre: 1, ghost: 0, markGlow: 1, dim: 0.07, regrow: 0, canvasA: 0 };   // те, що ведуть твіни
  var light = { x: 0.62, y: 0.12, tx: 0.62, ty: 0.12, user: 0 };                                               // світло сцени, частки екрана
  var tilt = { yaw: 0, pitch: 0, tyaw: 0, tpitch: 0 };
  var cam = { cy: null, unit: null, cx: null };                                                                 // камера сцен «Довжина» з інерцією
  var chips = $$('.chip').map(function (el, i) {
    return { el: el, btn: $('button', el), len: $('.chip__len', el), price: $('.chip__price b', el), i: i, t: MARKS[i].t, side: MARKS[i].side, pop: motion ? 0 : 1, vis: 1, x: null, y: null, w: 0, h: 0, sx: 0, sy: 0 };
  });

  // пружина (коеф. загасання 0.62): ≈ 8 % перельоту, як у системних анімаціях iOS
  function springEase(z, w) {
    var wd = w * Math.sqrt(1 - z * z);
    return function (t) { return t >= 1 ? 1 : 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t)); };
  }
  var spring = springEase(0.62, 11), softSpring = springEase(0.8, 10);

  /* ── кадр на вимогу: рендер іде лише тоді, коли щось рухається ── */
  var rafId = 0;
  function kick() { if (!rafId && !st.paused) rafId = W.requestAnimationFrame(frame); }
  function tw(target, vars) { vars.onUpdate = kick; return gsap.to(target, vars); }
  var lifeT = 0;
  function wake() {                                   // «життя» сцени: світло дихає й пасмо гойдається ще кілька секунд після дотику, потім спокій
    if (!motion) return;
    gsap.killTweensOf(st, 'life');
    tw(st, { life: 1, duration: 0.5, ease: 'power1.out' });
    W.clearTimeout(lifeT);
    lifeT = W.setTimeout(function () { tw(st, { life: 0, duration: 1.6, ease: 'power1.inOut' }); }, 7000);
  }

  function offs(el, stop) { var x = 0, y = 0; while (el && el !== stop) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return { x: x, y: y }; }

  /* ── розкладка: де стоїть пасмо і де починаються секції ── */
  function layout() {
    st.W = heroScene.clientWidth; st.H = heroScene.clientHeight; st.desktop = st.W >= 960;
    st.WH = world.clientHeight || st.H;
    var o = offs(box, heroScene);
    G.boxW = box.offsetWidth; G.boxH = box.offsetHeight; G.boxX = o.x - G.boxW / 2; G.boxY = o.y;   // коробка зсунута translateX(-50%)
    G.unit0 = G.boxH / 2.08; G.cx0 = G.boxX + G.boxW / 2; G.cy0 = G.boxY + G.boxH / 2;
    chips.forEach(function (c) { c.w = c.el.offsetWidth; c.h = c.el.offsetHeight; c.x = null; });
    if (st.gl) strand.resize(st.W, st.WH, Math.min(W.devicePixelRatio || 1, R.classList.contains('lite') ? 1.5 : 2));
    G.tTech = sheetTech.offsetTop; G.bTech = G.tTech + sheetTech.offsetHeight;
    G.tLen = stageLen.offsetTop; G.tPhoto = sheetPhoto.offsetTop; G.bPhoto = G.tPhoto + sheetPhoto.offsetHeight;
    G.tGrow = stageGrow.offsetTop; G.tBook = sheetBook.offsetTop; G.bBook = G.tBook + sheetBook.offsetHeight;
    G.techHeadY = offs(techHead, sheetTech).y; G.bookHeadY = offs(bookHead, sheetBook).y; G.growHeadY = offs(growHead, sceneGrow).y; G.dockTop = dock.getBoundingClientRect().top; st.techHeadOp = st.bookHeadOp = st.growHeadOp = -1;
    if (st.live) {
      var v = offs(lenViz, sceneLen), cardO = offs(lenCard, sceneLen), p = offs(lenPanel, sceneLen);
      G.lenVizX = v.x; G.lenVizY = v.y;
      G.lenFocusY = st.desktop ? cardO.y + 40 : cardO.y + 30;
      G.lenCardX = cardO.x; G.lenPanelY = p.y; G.lenPanelX = p.x; G.gapW = lenGap.offsetWidth;
      var ho = offs(lenHead, sceneLen); G.lenHeadBot = ho.y + lenHead.offsetHeight; G.lenHeadR = ho.x + lenHead.offsetWidth;
      var gv = offs(growViz, sceneGrow);
      G.growVizX = gv.x; G.growVizY = gv.y; G.growVizH = growViz.offsetHeight; G.growVizW = growViz.offsetWidth; G.growTagW = growTag.offsetWidth; G.growTagH = growTag.offsetHeight; G.growH2Y = offs($('#h2-grow'), sceneGrow).y;
      var a = offs(slotA, sheetPhoto), b = offs(slotB, sheetPhoto);
      G.slotA = { x: a.x, y: a.y, w: slotA.offsetWidth, h: slotA.offsetHeight }; G.slotB = { x: b.x, y: b.y, w: slotB.offsetWidth, h: slotB.offsetHeight };
      flyA.style.width = flyB.style.width = G.slotA.w + 'px'; flyA.style.height = flyB.style.height = G.slotA.h + 'px';
      var Rr = Math.sqrt(st.W * st.W / 4 + st.H * st.H) * 1.03, base = st.desktop ? 720 : 420;
      G.toneScale = Rr / (base / 2);
      // платина «закрита», коли останнє коло доходить до верху екрана (радіус = H): у цю мить заголовок «Оберіть день і час» має стояти на 28 %
      var cover = 0.56 + 0.44 * (st.H / Rr), sCover = 0.28 - offs(bookH2, sheetBook).y / st.H;
      G.bookEnd = Math.min(0.35, 0.85 - (0.85 - sCover) / cover);
      toneEls.forEach(function (el) { el.style.width = el.style.height = base + 'px'; el.style.margin = '0 0 ' + (-base / 2) + 'px ' + (-base / 2) + 'px'; });
    }
    cam.cy = null;
    thumb();
    railEdge();
    if (st.desktop) {
      // меню стоїть одразу за плашкою: та сама висота 44 px, проміжок 24 px
      var ir = island.getBoundingClientRect(), left = Math.round(ir.right + 24);
      navEl.style.left = left + 'px';
      navEl.style.visibility = left + navEl.offsetWidth > st.W - 20 ? 'hidden' : 'visible';
      var cr = heroCta.getBoundingClientRect(), sr = heroScene.getBoundingClientRect();
      G.ctaTop = cr.top - sr.top; G.ctaBottom = cr.bottom - sr.top;
      var fh = $('#h2-foto'), fb = $('.btn--ink', sheetPhoto);
      G.fotoTop = offs(fh, null).y; G.fotoBot = offs(fb, null).y + fb.offsetHeight; G.dockH = dock.offsetHeight;
    }
  }

  function thumb(scrollIntoView) {
    var b = tabs[st.tech], l = b.offsetLeft, r = track.offsetWidth - l - b.offsetWidth;
    track.style.setProperty('--cl', l + 'px'); track.style.setProperty('--cr', r + 'px');
    if (scrollIntoView && railScroll.scrollWidth > railScroll.clientWidth + 2) {
      railScroll.scrollTo({ left: l - (railScroll.clientWidth - b.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    }
  }
  function railEdge() {
    var fits = railScroll.scrollWidth <= railScroll.clientWidth + 2;
    rail.classList.toggle('fits', fits);
    rail.classList.toggle('at-end', !fits && railScroll.scrollLeft + railScroll.clientWidth >= railScroll.scrollWidth - 8);
  }
  railScroll.addEventListener('scroll', railEdge, { passive: true });
  railMore.addEventListener('click', function () {
    var end = rail.classList.contains('at-end');
    railScroll.scrollTo({ left: end ? 0 : railScroll.scrollLeft + railScroll.clientWidth * 0.62, behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ── картки цін: прив’язані до позначок довжини в просторі пасма ── */
  function placeChips(sy) {
    var lx = light.x * st.W, ly = light.y * st.H, i, c, a, x, y, sc, op, sx, sy2, float = motion ? st.life : 0;
    for (i = 0; i < chips.length; i++) {
      c = chips[i];
      a = strand.project(c.t, c.side * 0.27, c.side * -0.05);
      sc = (0.6 + 0.4 * c.pop) * (1 + a.z * 0.4) * (0.86 + 0.14 * c.vis);
      x = c.side < 0 ? a.x - c.w : a.x;
      if (st.desktop && i === 1) x += 48;               // «до плечей» на ПК: якір на 48 px правіше — проміжок до заголовка ≥ 48 px
      // картка росте від свого краю біля пасма — тримаємо її цілою в межах екрана й у збільшеному стані
      x = c.side < 0 ? clamp(x, 8 + Math.max(0, c.w * (sc - 1)), st.W - 8 - c.w) : clamp(x, 8, st.W - 8 - c.w * Math.max(1, sc));
      y = a.y - c.h / 2 + Math.sin(st.time * 0.9 + i * 1.9) * 3 * float;
      if (c.x === null || !motion) { c.x = x; c.y = y; } else { c.x += (x - c.x) * 0.22; c.y += (y - c.y) * 0.22; }   // легка інерція
      op = c01(c.pop * 1.5) * c.vis * clamp(1 + (a.z + 0.14) * 1.8, 0.35, 1);       // картка, що пішла вглиб, тьмяніє
      c.el.style.transform = 'translate3d(' + (c.x - G.boxX).toFixed(1) + 'px,' + (c.y - G.boxY).toFixed(1) + 'px,0) scale(' + sc.toFixed(3) + ')';
      c.el.style.opacity = op.toFixed(3);
      c.el.style.pointerEvents = c.vis > 0.5 && c.pop > 0.5 ? '' : 'none';
      if (!R.classList.contains('lite')) {
        sx = Math.round(lx - c.x); sy2 = Math.round(ly - c.y);
        if (sx !== c.sx || sy2 !== c.sy) { c.sx = sx; c.sy = sy2; c.btn.style.setProperty('--sx', sx + 'px'); c.btn.style.setProperty('--sy', sy2 + 'px'); }
      }
    }
  }
  function placeHint() {
    if (!hint || st.hintGone) return;
    var c = chips[2];
    if (c.x === null) return;
    var hw = hint.offsetWidth || 190, hh = hint.offsetHeight || 32, x = st.desktop ? clamp(c.x + 6, 8, st.W - hw - 12) : st.W - hw - 12, y = st.desktop ? c.y + c.h + 10 : chips[3].y + chips[3].h - 30;
    // підказка не лягає на картку ціни: зсуваємо вбік, а коли місця немає — ховаємо (картки самі є цілями дотику)
    var off = false;
    for (var i = 0; i < chips.length; i++) {
      var k = chips[i]; if (k.x === null || k.vis < 0.5) continue;
      if (x < k.x + k.w + 8 && x + hw + 8 > k.x && y < k.y + k.h + 6 && y + hh + 6 > k.y) {
        if (!st.desktop && k.x + k.w + 8 + hw <= st.W - 8) x = k.x + k.w + 8; else off = true;
      }
    }
    if (off !== st.hintOff) { st.hintOff = off; hint.style.visibility = off ? 'hidden' : ''; }
    hint.style.transform = 'translate3d(' + (x - G.boxX).toFixed(1) + 'px,' + (y - G.boxY).toFixed(1) + 'px,0)';
  }

  /* ── кадр ── */
  var fps = { n: 0, t: 0, done: false };
  function sceneAt(y) {
    if (y < G.tTech) return 'hero';
    if (y < G.bTech - st.H) return '';
    if (y < G.tPhoto) return 'len';
    if (y < G.bPhoto - st.H) return '';
    if (y < G.tBook) return 'grow';
    if (y < G.bBook - st.H) return '';
    return 'end';
  }
  function enterScene(name) {
    st.scene = name;
    canvas.style.visibility = name ? 'visible' : 'hidden';
    gsap.killTweensOf(I, 'wipe,pre');
    I.wipe = 1.3; I.pre = 1; cam.cy = null;
    var k = name === 'grow' ? 2 : st.tech;
    S.techO = S.techA = S.techB = k;
    I.regrow = name === 'grow' ? WEEKS[st.weeks].t : 0;
    I.markGlow = name === 'hero' || name === 'len' ? 1 : 0;
    gsap.killTweensOf(I, 'ghost');
    I.ghost = name === 'hero' && st.len >= 0 && !TECH[st.tech].flat ? 1 : 0;
    if (I.ghost) S.len = MARKS[st.len].t;
    world.classList.toggle('is-len', name === 'len');
  }

  function frame(now) {
    rafId = 0;
    var t = now / 1000, dt = st.last ? Math.min(0.05, t - st.last) : 0.016; st.last = t;
    var moving = false;
    if (motion) st.time += dt * (0.25 + 0.75 * st.life);
    var y = W.pageYOffset || 0, H = st.H || 1, Wd = st.W;

    if (!st.live) {                                   // статичний режим: постер, картки на місцях
      S.unit = G.unit0; S.cx = G.cx0; S.cy = G.cy0; S.yaw = 0; S.pitch = 0; S.time = 0; S.sway = 0;
      placeChips(); placeHint();
      st.last = 0; dockState(y);
      return;
    }

    var sc = sceneAt(y);
    if (sc !== st.scene) enterScene(sc);

    // світло: без дотику повільно дихає біля пасма
    if (!light.user) { light.tx = (sc === 'hero' ? G.cx0 / Wd : 0.5) + 0.10 + 0.17 * Math.sin(st.time * 0.31) * st.life; light.ty = 0.11 + 0.06 * Math.sin(st.time * 0.23 + 1.3) * st.life; }
    var dlx = light.tx - light.x, dly = light.ty - light.y, dyw = tilt.tyaw - tilt.yaw, dpt = tilt.tpitch - tilt.pitch;
    light.x += dlx * 0.07; light.y += dly * 0.07; tilt.yaw += dyw * 0.08; tilt.pitch += dpt * 0.08;
    if (Math.abs(dlx) + Math.abs(dly) > 0.0012 || Math.abs(dyw) + Math.abs(dpt) > 0.0008) moving = true;
    if (st.life > 0.001) moving = true;

    S.time = st.time; S.sway = 0.02 * st.life;
    S.front = I.front; S.glow = I.glow; S.wipe = I.wipe; S.pre = I.pre; S.ghost = I.ghost; S.dim = I.dim; S.regrow = I.regrow; S.markGlow = I.markGlow;
    var k;
    S.root = 0;

    if (sc === 'hero') {
      var hold = sm(y / (0.7 * H)), cov = sm((y - 0.7 * H) / H);
      // картки рахуємо в координатах сцени без «відступу вглиб» — сцена масштабується цілою
      S.unit = G.unit0; S.cx = G.cx0; S.cy = G.cy0;
      S.yaw = tilt.yaw + 0.5 * hold; S.pitch = tilt.pitch - 0.05 * hold;
      placeChips(); placeHint();
      var s1 = 1 - 0.06 * cov, ox = Wd / 2, oy = H * 0.46;
      S.unit = G.unit0 * s1; S.cx = ox + (G.cx0 - ox) * s1; S.cy = oy + (G.cy0 - oy) * s1;
      S.gain = 1 - 0.68 * cov;
      S.light[0] = LIGHT0[0] + ((light.x - 0.1) * Wd - G.cx0) / G.unit0 * 2.0;
      S.light[1] = LIGHT0[1] + ((0.12 - light.y) * H) / G.unit0 * 2.0;
      for (k = 0; k < 4; k++) { S.marks[k] = chips[k].t; S.markW[k] = chips[k].vis * (st.len === k ? 2.2 : st.len >= 0 ? 0.5 : 1); }
      var sv = Math.round(s1 * 2000) / 2000;
      if (sv !== st.heroSc) { st.heroSc = sv; heroIn.style.transform = sv < 1 ? 'scale(' + sv + ')' : ''; heroIn.style.opacity = (1 - 0.62 * cov).toFixed(3); }
      if (cone) cone.style.transform = 'translate3d(' + ((light.x - 0.5) * Wd * 0.9).toFixed(1) + 'px,0,0)';
    } else if (sc === 'len') {
      var q = y - G.tLen, into = Math.max(0, -q), ent = sm((y - (G.bTech - H)) / H), P = c01((y - (G.tPhoto - H)) / H);
      var u = clamp((q - 0.12 * H) / (0.38 * H), 0, 3), fl = Math.min(2, Math.floor(u)), m = fl + sm((u - fl - 0.2) / 0.6);
      var tf = mix(MARKS[fl].t, MARKS[fl + 1].t, m - fl), idx = Math.round(m);
      var unitL = st.desktop ? H * 0.62 : Math.min(H * 0.44, Wd * 0.98), cxL = st.desktop ? Wd * 0.5 : Wd * 0.19;
      var back = sm(P / 0.42);
      var unitF = st.desktop ? H * 0.43 : Math.min(H * 0.4, Wd * 0.95), cxF = Wd * 0.5, cyF = H * 0.47;
      var unit = mix(unitL * mix(0.9, 1, ent), unitF, back), cx = mix(cxL, cxF, back);
      var fy = G.lenFocusY + into, cyT = mix(fy - (2 * tf - 1) * unitL, cyF, back);
      if (cam.cy === null) cam.cy = cyT; else { var dcy = cyT - cam.cy; cam.cy += dcy * 0.2; if (Math.abs(dcy) > 0.4) moving = true; }   // камера з інерцією
      S.unit = unit; S.cx = cx; S.cy = cam.cy; S.yaw = tilt.yaw + 0.16 - 0.1 * (m / 3); S.pitch = 0;
      S.gain = mix(0.4, 1, ent);
      S.light[0] = LIGHT0[0] + 0.25; S.light[1] = LIGHT0[1] + (2 * tf - 1) * -1.0 * (1 - back);   // світло їде разом із камерою
      for (k = 0; k < 4; k++) { S.marks[k] = MARKS[k].t; S.markW[k] = (1 - back) * (k === idx ? 2.4 : 0.6); }
      if (idx !== st.lenIdx) setLenCard(idx, st.lenIdx >= 0);
      // позначка фокуса й підказка про проміжок 35–45 см
      var edge = strand.project(tf, 0.3, 0);
      lenFocus.style.transform = 'translate3d(' + (edge.x - G.lenVizX + 4).toFixed(1) + 'px,' + (fy - into - G.lenVizY).toFixed(1) + 'px,0)';
      lenFocus.style.opacity = ((1 - back) * ent).toFixed(2);
      // капсула тримає повну непрозорість, поки камера їде між «лопатками» й «поясом», і гасне, не заходячи на текст заголовка
      var gp = strand.project(0.78, st.desktop ? 0.3 : 0, 0), gw = G.gapW || 150;
      var gx = st.desktop ? Math.min(Math.max(strand.project(0.78, 0, 0).x + 24, gp.x + 10), G.lenPanelX - gw - 16) - G.lenVizX : Math.max(16 - G.lenVizX, Math.min(gp.x - G.lenVizX - gw / 2, G.lenCardX - G.lenVizX - gw - 8));
      var gOn = c01(1 - Math.max(0, Math.abs(tf - 0.7775) - (st.desktop ? 0.115 : 0.07)) / 0.035)   // на ПК капсула тримається від «лопаток» до «пояса»
         * (1 - back) * (gx + G.lenVizX < G.lenHeadR ? c01((gp.y - into - 15 - G.lenHeadBot - 6) / 20) : 1);
      lenGap.style.transform = 'translate3d(' + gx.toFixed(1) + 'px,' + (gp.y - into - G.lenVizY - 15).toFixed(1) + 'px,0)';
      lenGap.style.opacity = gOn.toFixed(2);
      lenPanel.style.opacity = (1 - 0.75 * back).toFixed(2);
      // на ПК кадри стартують біля заголовка — він гасне раніше, ніж вони з'являються
      lenHead.style.opacity = (st.desktop ? 1 - Math.max(back, sm(P / 0.14)) : 1 - back).toFixed(2);
      var scr = Math.round((1 - back) * 50) / 50; if (scr !== st.scrim) { st.scrim = scr; sceneLen.style.setProperty('--scrim', scr); }
      G.flyPose = [cxF, unitF, cyF];
    } else if (sc === 'grow') {
      var q2 = y - G.tGrow, into2 = Math.max(0, -q2), ent2 = sm((y - (G.bPhoto - H)) / H);
      var unitG = st.desktop ? H * 0.8 : Math.min(H * 0.9, Wd * 1.8), cxG = st.desktop ? Wd * 0.545 : Wd * 0.44;
      S.root = 1; S.unit = unitG * mix(0.92, 1, ent2); S.cx = cxG; S.cy = G.growVizY + into2 + 8 + S.unit; S.yaw = tilt.yaw + 0.1; S.pitch = 0;
      S.gain = mix(0.4, 1, ent2);
      S.light[0] = LIGHT0[0]; S.light[1] = LIGHT0[1] - 0.2;
      var bp = strand.project(I.regrow, 0.26, 0);
      if (st.desktop) {
        // на ПК капсула стоїть на межі кореня: y межі в шейдері, обмежений [верх заголовка, 70 % екрана]; правий край — за 24 px від лівого краю пасма
        var hTop = into2 + G.growH2Y, tagW = G.growTagW || 230, tagH = G.growTagH || 40, lp = strand.project(I.regrow, -0.18, 0);
        var gy = Math.min(Math.max(bp.y - tagH / 2, hTop), 0.7 * H), gx2 = Math.max(16, lp.x - 24 - tagW);
        growTag.style.transform = 'translate3d(' + (gx2 - G.growVizX).toFixed(1) + 'px,' + (gy - into2 - G.growVizY).toFixed(1) + 'px,0)';
        growTag.style.opacity = c01((0.6 * H - hTop) / (0.06 * H)).toFixed(2);   // з’являється, лише коли заголовок вище 60 % екрана
      } else {
        if (growTag.style.opacity) growTag.style.opacity = '';
        growTag.style.transform = 'translate3d(' + clamp(bp.x - G.growVizX + 6, 0, Math.max(0, G.growVizW - (G.growTagW || 230))).toFixed(1) + 'px,' + Math.max(6, bp.y - into2 - G.growVizY - 19).toFixed(1) + 'px,0)';
      }
    } else if (sc === 'end') {
      S.unit = st.desktop ? H * 0.42 : Math.min(H * 0.36, Wd * 0.9); S.cx = Wd * 0.5; S.cy = H * 0.4; S.yaw = tilt.yaw + 0.3; S.pitch = 0; S.gain = 0.9;
      S.light[0] = LIGHT0[0]; S.light[1] = LIGHT0[1];
    }
    flyPhotos(c01((y - (G.tPhoto - H)) / H), y);
    // кільця ведемо за верхом аркуша «Запис»: від 85 % екрана до G.bookEnd — платина закривається, коли заголовок стоїть на ~28 %
    var gOff = y >= G.tBook; if (gOff !== st.growOff) { st.growOff = gOff; R.classList.toggle('grow-off', gOff); }
    tonesFrame(c01((0.85 - (G.tBook - y) / H) / (0.85 - G.bookEnd)), sc);

    if (sc) {
      strand.render();
      if (!fps.done && st.introDone && sc === 'hero') {          // слабкий пристрій — менше волосин, без скла
        fps.t += dt; fps.n++;
        if (fps.n === 40) { fps.done = true; if (fps.t / 40 > 0.026) { strand.quality = 0.6; R.classList.add('lite'); layout(); } }
      }
    }
    if (I.canvasA !== st.canvasA) { st.canvasA = I.canvasA; canvas.style.opacity = I.canvasA.toFixed(3); }

    dockState(y);
    techHeadGate(y);
    if (moving) kick();
  }

  // телефон: заголовки «Техніки», «Між візитами» і «Запис» не визирають з-під нижньої панелі — з’являються, коли їхній верх уже над нею
  function techHeadGate(y) {
    gate(techHead, G.tTech + G.techHeadY - y, 'techHeadOp');
    gate(bookHead, G.tBook + G.bookHeadY - y, 'bookHeadOp');
    gate(growHead, Math.max(0, G.tGrow - y) + G.growHeadY, 'growHeadOp');
    function gate(el, top, key) {
      var op = !st.desktop && G.dockTop ? Math.round(c01((G.dockTop - 32 - top) / 44) * 50) / 50 : 1;
      if (op !== st[key]) { st[key] = op; el.style.opacity = op < 1 ? op : ''; }
    }
  }
  // нижня панель на ПК з’являється лише тоді, коли дію першого екрана накрито аркушем (або вона пішла за край)
  function dockState(y) {
    if (!st.desktop) return;
    var on = st.live ? y > 0.7 * st.H + (st.H - (G.ctaTop || st.H * 0.7)) : y > (G.ctaBottom || st.H * 0.8);
    // над заголовком і дією «Фото замість здогадок» панель ховається: там та сама дія вже на екрані
    if (on && G.fotoTop !== undefined) { var band = y + st.H - 22 - (G.dockH || 62) - 16; if (band < G.fotoBot && y + st.H > G.fotoTop) on = false; }
    if (on !== st.dockOn) { st.dockOn = on; dock.classList.toggle('is-on', on); }
  }

  /* ── передача «Довжина → Фото»: пасмо віддає два кадри в рамки наступного аркуша ── */
  function flyPhotos(P, y) {
    var on = P > 0.12 && P < 0.6 && !!G.flyPose, cxF = on ? G.flyPose[0] : 0, unitF = on ? G.flyPose[1] : 1, cyF = on ? G.flyPose[2] : 0;
    if (on !== st.flyOn) { st.flyOn = on; fly.style.visibility = on ? 'visible' : 'hidden'; }
    var landed = P >= 0.6;
    if (landed !== st.flyIn) { st.flyIn = landed; slotA.classList.toggle('is-in', landed); slotB.classList.toggle('is-in', landed); }
    if (!on) return;
    var appear = sm((P - 0.12) / 0.12), f = sm((P - 0.26) / 0.34), sy = G.tPhoto - y, w = G.slotA.w;
    // на ПК кадри стартують лівіше пасма й ідуть униз-ліворуч, не зачіпаючи праву колонку з чатом
    one(flyA, G.slotA, cxF - w * (st.desktop ? 1.55 : 0.92), Math.max(74, cyF - unitF * 0.92), -5, 0);
    one(flyB, G.slotB, cxF - w * (st.desktop ? 0.78 : 0.08), cyF - unitF * 0.26, 4, 0.06);
    function one(el, slot, x0, y0, rot, lag) {
      var ff = sm((f - lag) / (1 - lag)), ap = c01(appear * 1.4 - lag * 3);
      var x = mix(x0, slot.x, ff), yy = mix(y0, slot.y + sy, ff), s = mix(0.86, 1, ff) * mix(0.7, 1, ap), r = rot * (1 - ff);
      el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + yy.toFixed(1) + 'px,0) rotate(' + r.toFixed(2) + 'deg) scale(' + s.toFixed(3) + ')';
      el.style.opacity = ap.toFixed(2);
    }
  }

  /* ── передача «Між візитами → Запис»: десять тонів піднімаються знизу до платини ── */
  function tonesFrame(P, sc) {
    var on = P > 0.001 && P < 1, done = P >= 1 && sc !== 'end';
    if (on !== st.tonesOn) { st.tonesOn = on; tones.style.visibility = on ? 'visible' : 'hidden'; }
    // платина стала тлом: темна сцена під нею вимикається, аркуш «Запис» піднімається вже по платині
    if (done !== st.tonesDone) { st.tonesDone = done; R.classList.toggle('tones-done', done); }
    if (!on) return;
    for (var i = 0; i < toneEls.length; i++) {
      var p = c01((P - (i - 1) * 0.07) / 0.44), e = i ? p : 0;   // кола ведуть за прокруткою лінійно: останнє (10.1) закінчується при P = 1   // тон 1 — сама темна сцена, далі дев’ять кіл
      toneEls[i].style.transform = 'scale(' + (e * G.toneScale).toFixed(3) + ')';
    }
  }

  /* ── одометр: кожна цифра в своїй колонці — стара виїжджає вгору, нова заїжджає знизу; однакові цифри стоять ── */
  function roll(el, text, delay) {
    var cur = el._txt !== undefined ? el._txt : el.textContent;
    if (cur === text) return;
    el._txt = text;
    if (el._tl) { el._tl.kill(); el._tl = null; }
    if (!motion) { el.textContent = text; el.classList.remove('roll'); return; }
    var n = Math.max(cur.length, text.length), a = cur.padStart(n, '\u2007'), b = text.padStart(n, '\u2007'), olds = [], news = [], i;
    el.textContent = ''; el.classList.add('roll');
    var sr = D.createElement('span'); sr.className = 'roll__sr'; sr.textContent = text; el.appendChild(sr);
    for (i = 0; i < n; i++) {
      var col = D.createElement('span'), nb = b[i] === '\u2007' && i < n - text.length ? '' : b[i];
      col.className = 'roll__col'; col.setAttribute('aria-hidden', 'true');
      var neu = D.createElement('span'); neu.className = 'roll__new'; neu.textContent = nb; col.appendChild(neu);
      if (a[i] !== b[i]) {
        var old = D.createElement('span'); old.className = 'roll__old'; old.textContent = a[i] === '\u2007' ? '' : a[i]; col.appendChild(old);
        olds.push(old); news.push(neu);
      }
      el.appendChild(col);
    }
    el._tl = gsap.timeline({ delay: delay || 0, onComplete: function () { el.textContent = text; el.classList.remove('roll'); el._tl = null; } })
      .fromTo(olds, { yPercent: 0 }, { yPercent: -110, duration: 0.38, ease: 'power3.out' }, 0)
      .fromTo(news, { yPercent: 110 }, { yPercent: 0, duration: 0.38, ease: 'power3.out' }, 0);
  }
  // коротка зміна підпису: розмиття не більше 2 px і не довше 0,2 с
  function swapText(el, text, then, delay) {
    if (el.textContent === text && !el._swap) return;
    if (!motion) { el.textContent = text; if (then) then(); return; }
    if (el._stl) el._stl.kill();
    gsap.killTweensOf(el);
    el._swap = true;
    el._stl = gsap.timeline({ delay: delay || 0, onComplete: function () { el._swap = false; el._stl = null; } })
      .to(el, { opacity: 0, filter: 'blur(2px)', duration: 0.09, ease: 'power1.in' })
      .add(function () { el.textContent = text; if (then) then(); })
      .to(el, { opacity: 1, filter: 'blur(0px)', duration: 0.11, ease: 'power1.out', clearProps: 'filter' });
  }

  /* ── слово заголовка бере колір техніки: мазок пензля з нахиленим краєм ── */
  function brushPoly(p) {                              // край пензля: нахил як у курсиву + «щетина»
    var x = -22 + p * 144, pts = ['0% 0%'], n = 6, i, yy, jitter = [0, 2.2, -1.4, 1.8, -2.4, 1.2, 0];
    for (i = 0; i <= n; i++) { yy = i / n * 100; pts.push((x + 16 - yy * 0.16 + jitter[i]).toFixed(1) + '% ' + yy.toFixed(1) + '%'); }
    pts.push('0% 100%');
    return 'polygon(' + pts.join(',') + ')';
  }
  function paintInk(i, delay) {
    var base = $('.ink__base', ink), g = 'var(--g' + i + ')';
    $$('.ink__over', ink).forEach(function (o) { gsap.killTweensOf(o._p); o.remove(); });
    if (!motion) { base.style.backgroundImage = g; return; }
    var over = D.createElement('span'); over.className = 'ink__over'; over.setAttribute('aria-hidden', 'true'); over.textContent = base.textContent; over.style.backgroundImage = g;
    over.style.clipPath = brushPoly(0); ink.appendChild(over);
    var p = over._p = { v: 0 };
    gsap.to(p, { v: 1, duration: 0.8, delay: delay || 0, ease: 'power2.inOut', onUpdate: function () { over.style.clipPath = brushPoly(p.v); },
      onComplete: function () { base.style.backgroundImage = g; over.remove(); } });
  }

  function priceText(T) {
    if (st.len >= 0) return 'від ' + fmt(T.prices[st.len]) + NB + '₴';
    if (T.flat) return 'від ' + fmt(T.prices[0]) + NB + '₴';
    return fmt(Math.min.apply(null, T.prices)) + (st.W && st.W < 375 ? '–' : ' – ') + fmt(Math.max.apply(null, T.prices)) + NB + '₴';
  }
  function summary(animate) {
    var T = TECH[st.tech];
    var label = T.name + ' · ' + (st.len >= 0 ? MARKS[st.len].label : T.flat ? 'будь-яка довжина' : 'усі довжини'), price = priceText(T);
    var short = st.len >= 0 ? MARKS[st.len].label : T.name;
    sumLabels.forEach(function (el) { el.textContent = label; if (el.classList.contains('dock__label') && el.clientWidth && el.scrollWidth > el.clientWidth + 1) el.textContent = short; });   // на вузькому екрані — коротко
    sumPrices.forEach(function (el) { if (animate) roll(el, price, 0.12); else { el.textContent = price; el._txt = price; } });
    ['#book-sum', '#bs-sum', '#bs-sum2'].forEach(function (s) { $(s).textContent = label; });
    ['#book-price', '#bs-price'].forEach(function (s) { $(s).textContent = price; });
    ['#book-sw', '#bs-sw', '#bs-sw2'].forEach(function (s) { $(s).className = 'sw sw--' + st.tech; });
    $$('.tcard__pick').forEach(function (b, k) { var on = k === st.tech; b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.firstChild.textContent = on ? 'Обрано' : 'Обрати'; });
    lenCards.forEach(function (card) { $$('li', card).forEach(function (li) { li.classList.toggle('is-on', +li.getAttribute('data-tech') === st.tech); }); });
    lenPick.setAttribute('aria-pressed', st.len >= 0 && st.len === st.lenIdx ? 'true' : 'false');
    lenPick.firstChild.textContent = st.len >= 0 && st.len === st.lenIdx ? 'Моя довжина' : 'Це моя довжина';
  }

  /* ── техніка: спершу стан «до», потім мазок пензля проходить пасмом; ціни перераховуються на позначках ── */
  function setTech(i, from) {
    if (i === st.tech) return;
    st.tech = i;
    var T = TECH[i];
    tabs.forEach(function (b, k) { b.setAttribute('aria-checked', k === i ? 'true' : 'false'); b.tabIndex = k === i ? 0 : -1; });
    thumb(true);
    if (T.flat && st.len >= 0) setLen(-1, true);
    hideHint();
    if (st.live) {
      if (st.scene === 'hero' || st.scene === 'len' || st.scene === 'end') {
        gsap.killTweensOf(I, 'wipe,pre');
        S.techO = S.techB; S.techA = T.before; S.techB = i;
        I.pre = 0; I.wipe = -0.14;
        tw(I, { pre: 1, duration: 0.3, ease: 'power1.out' });
        tw(I, { wipe: 1.3, duration: 1.1, delay: 0.26, ease: 'power2.inOut' });
      }
    } else if (poster && !poster.hidden) {
      poster.src = 'assets/img/' + (i === 0 ? 'strand-poster' : T.img) + '.webp';
    }
    chips.forEach(function (c, k) {
      roll(c.price, fmt(T.prices[k]), 0.2 + MARKS[k].t * 0.7);
      gsap.killTweensOf(c, 't,vis');
      // «Корені»: ціна одна на будь-яку довжину — картки злітаються до кореня в одну
      var tt = T.flat ? ROOT_T : MARKS[k].t, vv = T.flat && k !== ROOT_CHIP ? 0 : 1;
      var lab = T.flat && k === ROOT_CHIP ? 'будь-яка довжина' : MARKS[k].label;
      if (c.len.textContent !== lab) swapText(c.len, lab, function () { c.w = c.el.offsetWidth; kick(); if (!st.live) frame(0); });
      if (!motion) { c.t = tt; c.vis = vv; }
      else {
        tw(c, { t: tt, duration: 0.9, ease: softSpring, delay: T.flat ? k * 0.03 : (3 - k) * 0.03 });
        tw(c, { vis: vv, duration: vv ? 0.5 : 0.32, ease: 'power2.out', delay: vv ? 0.25 : 0.1 });
      }
    });
    paintInk(i, 0.3);
    if (typeof openCard === 'function') openCard(i, from === 'card');
    swapText(subEl, T.desc + ' Умовно ' + T.time + '.');
    summary(true);
    wake(); kick();
  }

  /* ── довжина: дотик до картки ставить довжину; нижче позначки пасмо виходить із фокуса ── */
  function setLen(k, silent) {
    if (TECH[st.tech].flat) k = -1;
    st.len = k === st.len ? -1 : k;
    chips.forEach(function (c) {
      var on = c.i === st.len;
      c.el.classList.toggle('is-sel', on); c.btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    hideHint();
    if (st.live && st.scene === 'hero') {
      gsap.killTweensOf(I, 'ghost'); gsap.killTweensOf(S, 'len');
      if (st.len >= 0) {
        if (I.ghost < 0.05) S.len = 1.05;
        tw(S, { len: MARKS[st.len].t, duration: 0.7, ease: softSpring });
        tw(I, { ghost: 1, duration: 0.4, ease: 'power2.out' });
      } else tw(I, { ghost: 0, duration: 0.45, ease: 'power2.out' });
    }
    if (!silent) summary(true);
    wake(); kick();
  }
  function hideHint() {
    if (st.hintGone) return; st.hintGone = true;
    if (hint) gsap.to(hint, { opacity: 0, duration: 0.25, ease: 'power1.in' });
  }

  /* ── «Довжина»: картка цін для позначки, на якій стоїть камера ── */
  function setLenCard(idx, animate) {
    st.lenIdx = idx;
    var M = MARKS[idx], h3 = $('h3', lenCard), cm = $('header p', lenCard);
    // підпис міняється в середині перекочування цін (≈0,17 с): назва й ціни ніколи не розходяться
    if (animate) { swapText(h3, M.label, null, 0.08); swapText(cm, M.cm, null, 0.08); } else { h3.textContent = M.label; cm.textContent = M.cm; }
    $$('.num', lenCard).forEach(function (el, k) { var txt = fmt(TECH[k].prices[idx]); if (animate) roll(el, txt, k * 0.025); else { el.textContent = txt; el._txt = txt; } });
    segSet(lenSeg, idx);
    lenPick.setAttribute('aria-pressed', st.len === idx ? 'true' : 'false');
    lenPick.firstChild.textContent = st.len === idx ? 'Моя довжина' : 'Це моя довжина';
  }

  /* ── сегментований перемикач ── */
  function segSet(el, i) {
    var bs = $$('[role="radio"]', el);
    el.style.setProperty('--n', bs.length); el.style.setProperty('--i', i);
    el.classList.toggle('has-value', i >= 0);
    bs.forEach(function (b, k) { b.setAttribute('aria-checked', k === i ? 'true' : 'false'); b.tabIndex = k === i || (i < 0 && k === 0) ? 0 : -1; });
  }
  function segInit(el, start, onPick) {
    var bs = $$('[role="radio"]', el);
    segSet(el, start);
    bs.forEach(function (b, i) {
      b.addEventListener('click', function () { segSet(el, i); onPick(i); });
      b.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var n = (i + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length; bs[n].focus(); segSet(el, n); onPick(n); e.preventDefault();
      });
    });
  }

  /* ── фірмовий момент: вмикається світло салону ── */
  function buildIntro(withGL) {
    var tl = gsap.timeline({ paused: true, onUpdate: kick });
    var inv = function (v) { v = c01(v); return v < 0.5 ? Math.sqrt(v / 2) : 1 - Math.sqrt((1 - v) / 2); };   // обернена до power1.inOut
    var F0 = -0.12, F1 = 1.3, T0 = 0.1, DUR = 1.3;
    if (cone) tl.fromTo(cone, { opacity: 0.22 }, { opacity: 1, duration: 1.1, ease: 'power2.out' }, 0.05);
    if (withGL) {
      tl.fromTo(I, { canvasA: 0 }, { canvasA: 1, duration: 0.3, ease: 'power1.out' }, 0);
      tl.to(poster, { opacity: 0, duration: 0.3, ease: 'power1.in' }, 0.04);
      tl.add(function () { poster.hidden = true; }, 0.4);
      tl.fromTo(I, { front: F0 }, { front: F1, duration: DUR, ease: 'power1.inOut' }, T0);
      tl.fromTo(I, { markGlow: 0 }, { markGlow: 1, duration: 0.5, ease: 'none' }, T0 + 0.2);
      tl.fromTo(I, { glow: 1 }, { glow: 0, duration: 0.55, ease: 'power1.out' }, T0 + DUR - 0.1);
      tl.to(I, { dim: 0.07, duration: 0.4, ease: 'none' }, T0 + DUR);
    } else {
      tl.to(poster, { opacity: 1, duration: 1.1, ease: 'power2.out' }, 0);
    }
    chips.forEach(function (c) {
      // картка вискакує тієї миті, коли фронт світла проходить її позначку довжини
      tl.fromTo(c, { pop: 0 }, { pop: 1, duration: 0.8, ease: spring }, T0 + DUR * inv((c.t - 0.06 - F0) / (F1 - F0)));
    });
    tl.add(function () { paintInk(0, 0); }, 0.62);
    tl.add(function () { R.classList.add('intro-done'); st.introDone = true; st.last = 0; }, T0 + DUR + 0.25);
    if (hint) tl.fromTo(hint, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, T0 + DUR + 0.45);
    return tl;
  }

  /* ── старт ── */
  chips.forEach(function (c, k) { c.price.textContent = fmt(TECH[0].prices[k]); });
  layout();
  summary(false);
  if (!motion) { R.classList.add('intro-done'); if (hint) hint.style.opacity = 1; }
  frame(0);                                            // картки на свої місця ще до світла
  rail.classList.add('is-ready');

  function goLive() {                                  // WebGL готовий: закріплені сцени, пасмо замість постера
    st.gl = true; st.live = true;
    R.classList.add('live');
    canvas.hidden = false;
    lenCards.forEach(function (c, i) { if (i) c.hidden = true; });
    layout();
    I.dim = 0.2; I.front = -0.12; I.glow = 1; I.markGlow = 0;
    enterScene(sceneAt(W.pageYOffset || 0));
    I.markGlow = 0;
    setLenCard(0, false); st.lenIdx = -1;
    segSet(growSeg, st.weeks);
    frame(W.performance.now());
    var tl = buildIntro(true);
    tl.play(0); wake();
    W.__c.tl = tl;
  }
  function noGL() {                                    // запасний шлях: постер із тим самим змістом
    R.classList.add('no-gl');
    if (motion) { var tl = buildIntro(false); tl.eventCallback('onUpdate', function () { placeNow(); }); tl.play(0); W.__c.tl = tl; }
  }
  function placeNow() { S.unit = G.unit0; S.cx = G.cx0; S.cy = G.cy0; S.yaw = 0; S.pitch = 0; placeChips(); placeHint(); }

  W.__c = { I: I, S: S, st: st, G: G, strand: strand, chips: chips, setTech: setTech, setLen: setLen, light: light, layout: layout, kick: kick };

  function boot() {
    if (!motion) return;                               // без руху — постер і статична розкладка
    if (!strand.begin()) { noGL(); return; }
    var tries = 0;
    (function poll() {
      if (strand.failed) { noGL(); return; }
      if (!strand.ready()) { if (++tries > 240) { noGL(); return; } W.requestAnimationFrame(poll); return; }
      W.requestAnimationFrame(function () { if (!strand.build()) { noGL(); return; } W.requestAnimationFrame(goLive); });
    })();
  }
  // WebGL — після першого малювання: постер уже на екрані
  W.requestAnimationFrame(function () { W.setTimeout(boot, 0); });
  strand.onlost = function () { st.live = false; st.gl = false; R.classList.remove('live'); canvas.hidden = true; if (poster) { poster.hidden = false; poster.style.opacity = 1; } layout(); frame(0); };

  var rz, lastW = W.innerWidth;
  W.addEventListener('resize', function () {
    W.clearTimeout(rz); rz = W.setTimeout(function () {
      if (W.innerWidth === lastW && st.live && Math.abs(heroScene.clientHeight - st.H) < 1) return;   // панель адреси iOS: висота «малої» області не змінилась
      lastW = W.innerWidth; layout(); kick(); if (!st.live) frame(0);
    }, 140);
  });
  W.addEventListener('orientationchange', function () { W.setTimeout(function () { layout(); kick(); if (!st.live) frame(0); }, 260); });
  W.addEventListener('scroll', function () {
    if (!st.armed) { st.armed = true; arm(); }
    if (!st.live) dockState(W.pageYOffset || 0);
    kick();
  }, { passive: true });
  D.addEventListener('visibilitychange', function () { if (!D.hidden) { st.last = 0; kick(); } });
  if (D.fonts && D.fonts.ready) D.fonts.ready.then(function () { layout(); kick(); if (!st.live) frame(0); });

  /* ── керування першого екрана ── */
  tabs.forEach(function (b, i) {
    b.addEventListener('click', function () { setTech(i); });
    b.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length; tabs[n].focus(); setTech(n); e.preventDefault();
    });
  });
  chips.forEach(function (c) { c.btn.addEventListener('click', function () { setLen(c.i); }); });

  // світло йде за пальцем або курсором (без датчиків руху й системних запитів)
  var idle;
  if (motion) {
    heroScene.addEventListener('pointermove', function (e) {
      if (!st.live) return;
      light.user = 1; light.tx = clamp(e.clientX / st.W, 0.05, 0.95); light.ty = clamp(e.clientY / st.H, 0.02, 0.8);
      tilt.tyaw = (e.clientX / st.W - 0.5) * 0.24; tilt.tpitch = (e.clientY / st.H - 0.4) * 0.08;
      W.clearTimeout(idle); idle = W.setTimeout(function () { light.user = 0; tilt.tyaw = 0; tilt.tpitch = 0; kick(); }, 2600);
      if (st.life < 0.5) wake();
      kick();
    }, { passive: true });
  }

  /* ── П’ять технік: картки-зразки ── */
  var tscroll = $('#tscroll'), tcards = $$('.tcard'), tdots = $$('#tdots i'), tact = -1;
  function brushCard(card) {
    if (card._done || !motion) return; card._done = true;
    var after = $('.tcard__after', card), p = { v: 0 };
    gsap.to(p, { v: 1, duration: 0.95, delay: 0.12, ease: 'power2.inOut', onUpdate: function () { after.style.clipPath = cardPoly(p.v); }, onComplete: function () { after.style.clipPath = ''; } });
  }
  function cardPoly(p) {                               // у координатах зображення до повороту: корінь угорі, край пензля нахилений і зі щетиною
    var yv = -16 + p * 132, pts = ['0% 0%', '100% 0%'], j = [0, 1.6, -1.2, 2, -1.8, 0.8, 0], i, x;
    for (i = 6; i >= 0; i--) { x = i / 6 * 100; pts.push(x.toFixed(1) + '% ' + (yv + 10 - x * 0.1 + j[i]).toFixed(1) + '%'); }
    return 'polygon(' + pts.join(',') + ')';
  }
  function tFocus() {
    var mid = tscroll.scrollLeft + tscroll.clientWidth / 2, best = 0, bd = 1e9;
    tcards.forEach(function (card, i) {
      var c = card.offsetLeft + card.offsetWidth / 2, d = Math.abs(c - mid);
      if (d < bd) { bd = d; best = i; }
      if (motion && !st.desktop) card.style.transform = 'scale(' + (1 - 0.05 * c01(d / card.offsetWidth)).toFixed(3) + ')';
    });
    if (best !== tact) { tact = best; tdots.forEach(function (d, i) { d.classList.toggle('is-on', i === best); }); if (st.armed && !st.desktop) brushCard(tcards[best]); }
  }
  var tfRaf = 0;
  tscroll.addEventListener('scroll', function () { if (!tfRaf) tfRaf = W.requestAnimationFrame(function () { tfRaf = 0; tFocus(); }); }, { passive: true });
  tFocus();
  $$('.tcard__pick').forEach(function (b, i) { b.addEventListener('click', function () { setTech(i, 'card'); }); });
  // на ПК одна картка розгорнута: решта з’їжджають убік (transform), опис відкривається маскою (clip-path)
  var tOpen = 0, cardSpring = springEase(0.78, 9.5);
  function openCard(i, animate) {
    if (i === tOpen) return;
    var r0 = tcards.map(function (c) { return c.getBoundingClientRect(); });
    tcards.forEach(function (c, k) { c.classList.toggle('is-open', k === i); $('.tcard__open', c).setAttribute('aria-expanded', k === i ? 'true' : 'false'); });
    tOpen = i;
    if (!animate || !motion || !st.desktop) return;
    tcards.forEach(function (c, k) {
      var r1 = c.getBoundingClientRect(), dx = r0[k].left - r1.left;
      gsap.killTweensOf(c);
      if (k === i) gsap.fromTo(c, { x: dx, clipPath: 'inset(0px ' + Math.max(0, r1.width - r0[k].width).toFixed(1) + 'px 0px 0px round 28px)' }, { x: 0, clipPath: 'inset(0px 0px 0px 0px round 28px)', duration: 0.55, ease: cardSpring, clearProps: 'clipPath,transform' });
      else gsap.fromTo(c, { x: dx }, { x: 0, duration: 0.55, ease: cardSpring, clearProps: 'transform' });
    });
    tcards[i]._done = false; brushCard(tcards[i]);
  }
  $$('.tcard__open').forEach(function (b, i) { b.addEventListener('click', function () { openCard(i, true); }); });

  /* ── поява при підході: вмикається лише після першої прокрутки, тож без прокрутки весь зміст видно одразу ── */
  var bubbles = $$('.bubble');
  function arm() {
    if (st.live) R.classList.add('fly-armed');
    if (!motion || !('IntersectionObserver' in W)) return;
    var vh = W.innerHeight;
    tcards.forEach(function (card) {
      if (card.getBoundingClientRect().top < vh * 0.9) { card._done = true; return; }
      $('.tcard__after', card).style.clipPath = cardPoly(0);
    });
    var ioT = new W.IntersectionObserver(function (es) {
      es.forEach(function (e) { if (!e.isIntersecting) return; ioT.unobserve(e.target);
        if (st.desktop) tcards.forEach(function (c, i) { W.setTimeout(function () { brushCard(c); }, i * 90); });
        else brushCard(tcards[tact < 0 ? 0 : tact]);      // сусідні картки фарбуються, коли до них догортають
      });
    }, { threshold: 0.35 });
    ioT.observe(tscroll);
    var th = $('#thread');
    if (th.getBoundingClientRect().top > vh * 0.9) {
      gsap.set(bubbles, { opacity: 0.14, scale: 0.94 });
      var io = new W.IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return; io.disconnect();
        bubbles.forEach(function (b, i) { gsap.to(b, { opacity: 1, scale: 1, duration: 0.55, delay: 0.1 + i * 0.26, ease: spring, clearProps: 'transform' }); });
      }, { threshold: 0.3 });
      io.observe(th);
    }
  }

  /* ── «Довжина»: перемикач і «моя довжина» ── */
  segInit(lenSeg, 0, function (i) {
    if (!st.live) return;
    W.scrollTo({ top: G.tLen + (0.12 + 0.38 * i + (i === 3 ? 0.05 : 0.02)) * st.H, behavior: reduce ? 'auto' : 'smooth' });
  });
  lenPick.addEventListener('click', function () {
    var idx = Math.max(0, st.lenIdx);
    if (TECH[st.tech].flat) { st.len = -1; }
    st.len = st.len === idx ? -1 : idx;
    chips.forEach(function (c) { var on = c.i === st.len; c.el.classList.toggle('is-sel', on); c.btn.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    hideHint(); summary(true);
  });

  /* ── «Між візитами»: корінь відростає ── */
  segInit(growSeg, st.weeks, function (i) {
    st.weeks = i;
    var w = WEEKS[i];
    roll($('#growcm'), w.cm, 0.05);
    $('#growweeks').textContent = w.w; $('#growcm2').textContent = w.cm;
    if (st.live) { gsap.killTweensOf(I, 'regrow'); tw(I, { regrow: w.t, duration: 0.9, ease: softSpring }); wake(); kick(); }
  });

  /* ── запис: демо-маршрут заявки, нічого не надсилається ── */
  var book = $('#book'), bk = { day: '', time: '' }, routeLis = $$('#route li');
  function pickRow(sel, key, attr) {
    var bs = $$(sel, book);
    bs.forEach(function (b, i) {
      b.tabIndex = i ? -1 : 0;
      b.addEventListener('click', function () { bk[key] = b.getAttribute(attr); bs.forEach(function (x) { var on = x === b; x.setAttribute('aria-checked', on ? 'true' : 'false'); x.tabIndex = on ? 0 : -1; }); $('#book-err').hidden = true; });
      b.addEventListener('keydown', function (e) { if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; var n = (i + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length; bs[n].focus(); bs[n].click(); e.preventDefault(); });
    });
  }
  pickRow('[data-day]', 'day', 'data-day'); pickRow('[data-time]', 'time', 'data-time');
  book.addEventListener('submit', function (e) {
    e.preventDefault();
    var err = $('#book-err'), done = $('#book-done');
    if (!bk.day || !bk.time) {
      err.hidden = false; done.hidden = true;
      $$('.pick__row', book).forEach(function (r) { r.classList.remove('is-shake'); void r.offsetWidth; if (motion) r.classList.add('is-shake'); });
      return;
    }
    err.hidden = true;
    var T = TECH[st.tech], row = T.name + ' · ' + (st.len >= 0 ? MARKS[st.len].label : 'довжину уточнить бот') + ' · ' + bk.day + ' ' + bk.time;
    $('#route-site').textContent = 'заявку зібрано: ' + row;
    $('#route-row').textContent = 'новий рядок: ' + row;
    routeLis.forEach(function (li) { li.classList.remove('is-on'); });
    done.hidden = true;
    routeLis.forEach(function (li, i) { W.setTimeout(function () { li.classList.add('is-on'); if (i === routeLis.length - 1) { done.hidden = false; if (motion) gsap.fromTo(done, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'transform' }); } }, motion ? 120 + i * 380 : 0); });
  });

  /* ── аркуш дії знизу: ручка, пружина, закриття жестом ── */
  var modal = $('#modal'), bsheet = $('#bsheet'), bsform = $('#bsform'), bsdone = $('#bsdone'), grab = $('#bs-grab'), dyedSeg = $('#dyedseg');
  var bs = { open: false, slots: [false, false], dyed: '', last: null, y: 0 };
  var sheetSpring = springEase(0.78, 9.5);
  function sheetTo(v, opts) {
    gsap.killTweensOf(bs);
    if (!motion) { bs.y = v; bsheet.style.transform = 'translate3d(0,' + v + '%,0)'; if (opts && opts.done) opts.done(); return; }
    gsap.to(bs, { y: v, duration: opts && opts.dur || 0.68, ease: opts && opts.ease || sheetSpring, onUpdate: function () { bsheet.style.transform = 'translate3d(0,' + bs.y.toFixed(2) + '%,0)'; }, onComplete: opts && opts.done });
  }
  function openSheet(e) {
    if (bs.open) return;
    bs.open = true; bs.last = D.activeElement;
    if (!bsdone.hidden) { bsdone.hidden = true; bsform.hidden = false; resetSheet(); }
    summary(false);
    modal.hidden = false; void modal.offsetWidth; modal.classList.add('is-open');
    R.style.overflow = 'hidden';
    st.paused = true;                                   // під аркушем сцена не рендериться
    bs.y = 110; bsheet.style.transform = 'translate3d(0,110%,0)';
    sheetTo(0);
    bsheet.focus({ preventScroll: true });
  }
  function closeSheet() {
    if (!bs.open) return;
    bs.open = false;
    modal.classList.remove('is-open');
    sheetTo(112, { dur: 0.3, ease: 'power2.in', done: function () { modal.hidden = true; R.style.overflow = ''; st.paused = false; st.last = 0; kick(); if (bs.last && bs.last.focus) bs.last.focus({ preventScroll: true }); } });
  }
  function resetSheet() {
    bs.slots = [false, false]; bs.dyed = '';
    $$('.slot', bsform).forEach(function (s) { s.setAttribute('aria-pressed', 'false'); $('.slot__s', s).textContent = 'додати'; });
    segSet(dyedSeg, -1); $('#bs-err').hidden = true;
  }
  $$('[data-open-sheet]').forEach(function (b) { b.addEventListener('click', openSheet); });
  $$('[data-close-sheet]').forEach(function (b) { b.addEventListener('click', closeSheet); });
  D.addEventListener('keydown', function (e) {
    if (!bs.open) return;
    if (e.key === 'Escape') { closeSheet(); return; }
    if (e.key !== 'Tab') return;
    var f = $$('button,a[href],[tabindex="0"]', bsheet).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], lastEl = f[f.length - 1];
    if (e.shiftKey && (D.activeElement === first || D.activeElement === bsheet)) { lastEl.focus(); e.preventDefault(); }
    else if (!e.shiftKey && D.activeElement === lastEl) { first.focus(); e.preventDefault(); }
  });
  $$('.slot', bsform).forEach(function (s, i) {
    s.addEventListener('click', function () {
      bs.slots[i] = !bs.slots[i];
      s.setAttribute('aria-pressed', bs.slots[i] ? 'true' : 'false');
      $('.slot__s', s).textContent = bs.slots[i] ? 'зразок додано' : 'додати';
      if (bs.slots[0] && bs.slots[1] && bs.dyed) $('#bs-err').hidden = true;
    });
  });
  segInit(dyedSeg, -1, function (i) { bs.dyed = i === 0 ? 'так' : 'ні'; if (bs.slots[0] && bs.slots[1]) $('#bs-err').hidden = true; });
  bsform.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!bs.slots[0] || !bs.slots[1] || !bs.dyed) {
      $('#bs-err').hidden = false;
      var bad = $$('.slot', bsform).filter(function (s, i) { return !bs.slots[i]; }); if (!bs.dyed) bad.push(dyedSeg);
      bad.forEach(function (el) { el.classList.remove('is-shake'); void el.offsetWidth; if (motion) el.classList.add('is-shake'); });
      return;
    }
    $('#bs-dyed').textContent = 'фарбувались: ' + bs.dyed;
    bsform.hidden = true; bsdone.hidden = false;
    if (motion) gsap.fromTo($$('#bsdone > *'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05, clearProps: 'transform,opacity' });
    $('#bs-done-title').focus({ preventScroll: true });
  });
  // жест: тягнемо аркуш донизу за ручку
  var drag = null;
  grab.addEventListener('pointerdown', function (e) {
    drag = { y0: e.clientY, t0: e.timeStamp, y: e.clientY, t: e.timeStamp, v: 0, h: bsheet.offsetHeight };
    grab.setPointerCapture(e.pointerId); gsap.killTweensOf(bs);
  });
  grab.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dy = Math.max(0, e.clientY - drag.y0), dt = e.timeStamp - drag.t;
    if (dt > 0) drag.v = (e.clientY - drag.y) / dt;
    drag.y = e.clientY; drag.t = e.timeStamp;
    bs.y = dy / drag.h * 100; bsheet.style.transform = 'translate3d(0,' + bs.y.toFixed(2) + '%,0)';
  });
  function dragEnd(e) {
    if (!drag) return;
    var dy = Math.max(0, e.clientY - drag.y0), v = drag.v; drag = null;
    if (dy > 110 || v > 0.55) closeSheet(); else sheetTo(0, { dur: 0.5 });
  }
  grab.addEventListener('pointerup', dragEnd); grab.addEventListener('pointercancel', dragEnd);

  /* ── меню на ПК: плавний перехід до розділу ── */
  $$('.nav a, .brand').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href'); if (!id || id.charAt(0) !== '#') return;
      var el = D.getElementById(id.slice(1)); if (!el) return;
      e.preventDefault();
      var top = id === '#top' ? 0 : el.classList.contains('scene') ? el.parentNode.offsetTop + (st.live ? st.H * 0.14 : 0) : el.offsetTop;
      W.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
