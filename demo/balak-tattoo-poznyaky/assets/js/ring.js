/* «Проколоте слово»: сталеве кільце з кулькою висить у стовбурі K. three.js 0.185 (локально). */
import * as THREE from '../vendor/three/three.module.min.js';

export function start(B) {
  const canvas = document.querySelector('.ring-gl');
  const stage = document.querySelector('.stage');
  const D = Math.PI / 180;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch (e) { document.documentElement.classList.add('no-gl'); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(18, 1, 10, 100000);

  /* Власне середовище: верхній софтбокс (лампа), тепла бічна смуга, червона смуга знизу (пігмент). */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshBasicMaterial({ color: 0x060607, side: THREE.BackSide })));
  const panel = (w, h, rgb, x, y, z) => {
    const mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    mat.color.setRGB(rgb[0], rgb[1], rgb[2]);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m); return m;
  };
  panel(14, 2.4, [10, 9.6, 9], 0, 10, 1.5);       // лампа над кільцем
  panel(1.6, 12, [1.8, 1.7, 1.6], -10, 1, 3);     // тепла бічна
  panel(12, 1.8, [6, .28, .32], 2, -10, 3.5);     // червона смуга знизу
  panel(5, 5, [.9, .9, .95], 7, 2, 10);            // переднє заповнення праворуч
  panel(8, 4, [1.1, 1.08, 1.05], -6, 4, 9);        // м'яке переднє ліворуч
  scene.environment = pmrem.fromScene(env, .012).texture;

  const key = new THREE.DirectionalLight(0xfff4e2, 1.4); key.position.set(.2, 1, .35); scene.add(key);
  const redFlash = new THREE.PointLight(0xff2a2a, 0, 0, 2); scene.add(redFlash);

  const mat = new THREE.MeshStandardMaterial({ color: 0xe2e4e8, metalness: 1, roughness: .16 });

  const pivot = new THREE.Group();
  const spin = new THREE.Group();
  const ringG = new THREE.Group();
  pivot.add(spin); spin.add(ringG); scene.add(pivot);
  let torus, bead, occ;

  function build() {
    const L = B.layout; if (!L) return;
    if (torus) { ringG.remove(torus, bead); torus.geometry.dispose(); bead.geometry.dispose(); }
    const R = L.R, tube = L.tube, beadR = tube * 2.5;
    const gap = (beadR * 1.7) / R;
    torus = new THREE.Mesh(new THREE.TorusGeometry(R, tube, 32, 200, Math.PI * 2 - gap), mat);
    torus.rotation.z = -Math.PI / 2 + gap / 2;
    bead = new THREE.Mesh(new THREE.SphereGeometry(beadR, 48, 32), mat);
    bead.position.set(0, -R, 0);
    ringG.add(torus, bead);
    ringG.position.set(0, -R, 0);

    if (occ) { scene.remove(occ); occ.geometry.dispose(); occ.material.map.dispose(); occ.material.dispose(); }
    const tex = new THREE.CanvasTexture(L.glyph);
    occ = new THREE.Mesh(new THREE.PlaneGeometry(L.gw, L.gh),
      new THREE.MeshBasicMaterial({ map: tex, alphaTest: .5, colorWrite: false }));
    occ.position.set(L.gx + L.gw / 2 - L.W / 2, L.H / 2 - (L.gy + L.gh / 2), 0);
    occ.renderOrder = -1;
    scene.add(occ);

    renderer.setSize(L.W, L.H, false);
    camera.aspect = L.W / L.H;
    camera.position.set(0, 0, (L.H / 2) / Math.tan(9 * D));
    camera.far = camera.position.z * 4;
    camera.updateProjectionMatrix();
    redFlash.position.set(0, 0, R * 2);
  }

  /* Інтро: падіння в прокол (0,8 с) → загасаючий маятник (1,6 с) → ледь помітне дихання. */
  const skipIntro = B.reduce || B.p > .02;
  let t0 = performance.now();
  const intro = t => {
    if (skipIntro) return { dy: 0, dx: 0, spinX: 0, swing: 0, flash: 0, idle: true };
    const L = B.layout;
    const fall = .8, k = Math.min(1, t / fall);
    if (t < fall) {
      const e = k * k;
      return { dy: (1 - e) * (L.py + L.R * 2.3 + 40), dx: (1 - e) * 70, spinX: -(1 - (1 - Math.pow(1 - k, 3))) * Math.PI * 2.5, swing: 0, flash: 0 };
    }
    const tt = t - fall;
    const swing = 18 * D * Math.exp(-tt / .55) * Math.sin(2 * Math.PI * tt / 1.07) + 1.1 * D * Math.sin(tt * 1.3) * Math.min(1, tt / 2);
    const twist = 7 * D * Math.exp(-tt / .6) * Math.sin(2 * Math.PI * tt / .8);
    const flash = tt < .3 ? Math.sin(Math.PI * tt / .3) : 0;
    return { dy: 0, dx: 0, spinX: twist, swing, flash };
  };

  let mx = 0, my = 0, tmx = 0, tmy = 0;
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !B.reduce) {
    addEventListener('pointermove', e => { tmx = e.clientX / innerWidth - .5; tmy = e.clientY / innerHeight - .5; }, { passive: true });
  }

  const shade = document.querySelector('.lamp-shade');
  const pinEl = document.querySelector('.pin');
  const shadeBottom = () => shade.getBoundingClientRect().bottom - pinEl.getBoundingClientRect().top;
  let shown = false;
  function render(now) {
    const L = B.layout; if (!L || !torus) return;
    const q = B.motion ? B.pose(B.p) : B.pose(0);
    const tSec = (now - t0) / 1000;
    const it = intro(tSec);
    // кільце падає з-під абажура лампи: поки падає, канвас обрізано під лампою (не перетинає шапку й позначку концепту)
    const falling = !skipIntro && tSec < .85;
    canvas.style.clipPath = falling ? `inset(${shadeBottom().toFixed(0)}px 0 0 0)` : '';
    const free = 1 - q.b;
    mx += (tmx - mx) * .08; my += (tmy - my) * .08;
    pivot.position.set(q.px + it.dx * free - L.W / 2, L.H / 2 - q.py + it.dy * free, 0);
    pivot.scale.setScalar(q.s);
    pivot.rotation.z = (it.swing + mx * 5 * D) * free;
    spin.rotation.y = q.phi + it.spinX * free + my * 6 * D * free;
    redFlash.intensity = it.flash * 2.2e6 * (L.R / 80) * (L.R / 80);
    redFlash.position.set(q.px - L.W / 2, L.H / 2 - q.py - L.R * 2 * q.s, L.R * 1.4);
    occ.visible = q.b < .5;
    canvas.style.visibility = q.c > .985 ? 'hidden' : 'visible';
    renderer.render(scene, camera);
    if (!shown) { shown = true; canvas.style.transition = 'opacity .5s cubic-bezier(.4,0,.2,1)'; canvas.style.opacity = '1'; }
  }

  let raf = 0, visible = true;
  const loop = now => {
    raf = 0;
    if (!visible) return;
    render(now);
    if (!B.reduce) raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) kick(); }).observe(stage);

  B.listeners.push(type => {
    if (type === 'layout') build();
    if (B.reduce) kick();
  });
  build();
  t0 = performance.now();
  kick();
}
