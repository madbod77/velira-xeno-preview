/* Velira — /tsiny/: кошторис, що збирається з вибраних пунктів (ц.17 · M2). Без GSAP.
   Обраний формат → чек передруковується: рядки «друкуються» зліва направо (clip-path, steps), суми — легкий зсув угору
   (opacity / transform). Валюта ₴ / $ — для всіх .pv на сторінці. «Обговорити цей кошторис» несе формат і «терміново» у форму
   (форма — спільна, form.js). Без JS: чек показує Spark статично, усі формати й ціни — у рядках списку. */
(function () {
  var bill = document.getElementById('chek');
  if (!bill) return;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var b = function (k) { return $('[data-b="' + k + '"]', bill); };
  var motion = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: no-preference)').matches);
  var RATE = 41.5, NB = ' ', IN = 'у ціні', OFFER = 'у пропозиції';
  var TG = 'https://t.me/madbod_77?text=', TG_BASE = 'Добрий день! Пишу зі сторінки «Ціни» на сайті Velira. Мені потрібно: ';

  // склад кожного формату — ті самі рядки, що в списку й на головній (src/websites.html, offer-standard/premium.html)
  var F = {
    'Spark': { usd: 150, from: true, rush: true, kind: 'лендинг', tg: 'лендинг (Spark)',
      lines: ['Одна сторінка під одну дію', 'Адаптив: телефон · планшет · ПК', 'Базові анімації й форма заявки', 'Допомога з підключенням домену'],
      note: ['1 раунд правок', IN] },
    'Orbit': { usd: 250, from: true, rush: true, kind: 'бізнес-сайт', tg: 'бізнес-сайт (Orbit)',
      lines: ['До 5–7 секцій або сторінок', 'Адаптив: телефон · планшет · ПК', 'Преміальні анімації', 'Форми та інтеграція з Telegram', 'Допомога з підключенням домену'],
      note: ['2 раунди правок', IN] },
    'Supernova': { usd: 500, from: true, rush: true, kind: 'магазин', tg: 'магазин або сайт зі складними функціями (Supernova)',
      lines: ['Магазин або сайт зі складними функціями', 'Максимум 3D та інтерактиву', 'Оплати, CRM або каталог', 'Адаптив і допомога з доменом'],
      note: ['3 раунди правок', IN] },
    'Premium': { usd: 5000, from: true, rush: false, kind: 'авторський сайт', tg: 'авторський сайт (Premium)', sched: ['Графік робіт — індивідуальний', OFFER],
      lines: ['Повністю авторський дизайн', 'Кастомні 3D-сцени та складні анімації', 'Тонка типографіка й артдирекшн', 'Пріоритетна підтримка', 'Адаптив і допомога з доменом'],
      note: ['Кількість раундів правок', OFFER] },
    'Standard System': { usd: 1000, from: false, rush: false, split: false, kind: 'сайт, розмова й автоматизація', tg: 'сайт, розмова з клієнтом і автоматизація (Standard System)',
      sched: ['Строк', OFFER],
      lines: ['Сайт: пропозиція, наступний крок і форма заявки', 'Канал розмови: Telegram-бот або інший доречний сценарій', 'Автоматизація одного повторюваного процесу'],
      note: ['Обсяг робіт фіксуємо до старту', OFFER] },
    'Premium System': { usd: 7500, from: false, rush: false, split: false, kind: 'кілька процесів', tg: 'Premium System', sched: ['Строк', OFFER],
      lines: ['Авторський дизайн', 'Глибша автоматизація кількох процесів', 'Продуктова перевірка й аналітика', 'Пріоритетна підтримка'],
      note: ['Обсяг робіт фіксуємо до старту', OFFER] }
  };

  // 1867.5 → «1 867,50»; 6225 → «6 225»
  var group = function (x) {
    var i = Math.floor(x + 1e-9), f = Math.round((x - i) * 100);
    if (f === 100) { i += 1; f = 0; }
    return String(i).replace(/\B(?=(\d{3})+(?!\d))/g, NB) + (f ? ',' + (f < 10 ? '0' : '') + f : '');
  };
  var state = { f: 'Spark', rush: false, cur: 'uah' };
  var money = function (usd) { return state.cur === 'usd' ? '$' + group(usd) : group(usd * RATE) + NB + '₴'; };
  var moneyUah = function (usd) { return group(usd * RATE) + NB + '₴'; };

  var rushBox = $('input[name="rush"]', bill), form = document.getElementById('lead-form');
  var radios = $$('input[name="est"]');
  var dockN = $('[data-dock-n]'), dockP = $('[data-dock-p]');

  var reprint = function (els) {
    if (!motion) return;
    els.forEach(function (el, i) {
      if (!el) return;
      el.classList.remove('is-print'); void el.offsetWidth;
      el.style.animationDelay = (i * 45) + 'ms'; el.classList.add('is-print');
    });
  };
  var roll = function (els) {
    if (!motion) return;
    els.forEach(function (el) { if (!el) return; el.classList.remove('is-roll'); void el.offsetWidth; el.classList.add('is-roll'); });
  };
  var line = function (text, val, cls) {
    var p = document.createElement('p'), s = document.createElement('span'), i = document.createElement('i');
    p.className = 'bill__ln' + (cls ? ' ' + cls : ''); s.textContent = text; i.textContent = val;
    p.appendChild(s); p.appendChild(i); return p;
  };

  var render = function (what) {
    var d = F[state.f], k = d.rush && state.rush ? 1.5 : 1, pre = d.from ? 'від ' : '', total = d.usd * k;
    b('name').textContent = state.f;
    b('kind').textContent = d.kind;
    b('base').textContent = pre + money(d.usd);
    if (what === 'fmt' || what === 'init') {
      var box = b('lines'); box.textContent = '';
      d.lines.forEach(function (t) { box.appendChild(line(t, IN)); });
      box.appendChild(line(d.note[0], d.note[1], 'bill__ln--note'));
    }
    b('rush').hidden = !d.rush;
    b('rushline').hidden = !(d.rush && state.rush);
    b('rushadd').textContent = '+ ' + pre + money(d.usd * .5);
    b('sched').hidden = !d.sched;
    if (d.sched) { b('schedtx').textContent = d.sched[0]; b('sched').querySelector('i').textContent = d.sched[1]; }
    b('totallbl').textContent = d.from ? 'Разом, від' : 'Разом';
    b('total').textContent = money(total);
    // ц.17 fix1: 30/70 у джерелі — лише для форматів сайтів (Spark–Premium); для систем частки й суми — у пропозиції (TODO 15)
    var split = d.split !== false;
    b('pay').classList.toggle('is-nosplit', !split);
    b('l30').innerHTML = split ? '<b>30%</b> — на старті' : '<b>Передоплата</b> — на старті';
    b('l70').innerHTML = split ? '<b>70%</b> — після погодженого прев’ю' : '<b>Решта</b> — після погодженого прев’ю';
    b('p30').textContent = split ? pre + money(total * .3) : OFFER;
    b('p70').textContent = split ? pre + money(total * .7) : OFFER;
    b('go').setAttribute('data-format', state.f);
    var tgText = TG_BASE + d.tg + ' — за кошторисом ' + pre + moneyUah(total) + '. ' + (k > 1 ? 'Терміново — за 48 годин. ' : '');
    b('tg').href = TG + encodeURIComponent(tgText);
    if (dockN) { dockN.textContent = ''; var nb = document.createElement('b'); nb.textContent = state.f; dockN.appendChild(nb); dockN.appendChild(document.createTextNode(' · ' + d.kind)); }
    if (dockP) dockP.textContent = pre + money(total);
    if (what === 'init') return;
    b('live').textContent = 'Кошторис: ' + state.f + ', разом ' + pre + money(total) + (k > 1 ? ', терміново' : '') + '.';
    // рух: формат — передрук усіх рядків; терміновість і валюта — лише суми
    var sums = [b('base'), b('total'), b('p30'), b('p70')];
    if (what === 'fmt') reprint([$('.bill__ln--fmt', bill)].concat($$('.bill__ln', b('lines'))).concat([b('sched')]));
    if (what === 'rush') reprint([b('rushline')]);
    roll(sums);
  };

  // формат і «терміново» — у форму, щойно ви щось обрали в кошторисі (чіп у формі вже стоїть, коли ви до неї дійдете)
  var toForm = function () {
    if (!form) return;
    var r = form.querySelector('input[name="format"][value="' + state.f + '"]');
    if (r && !r.checked) { r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); }
    var u = form.elements.urgent, want = !!(F[state.f].rush && state.rush);
    if (u && u.checked !== want) { u.checked = want; u.dispatchEvent(new Event('change', { bubbles: true })); }
  };

  radios.forEach(function (r) {
    r.addEventListener('change', function () { if (!r.checked || !F[r.value]) return; state.f = r.value; render('fmt'); toForm(); });
  });
  if (rushBox) rushBox.addEventListener('change', function () { state.rush = rushBox.checked; render('rush'); toForm(); });
  b('go').addEventListener('click', toForm);

  // валюта: усі ціни сторінки (.pv[data-usd]) і чек
  var curBtns = $$('[data-cur]', bill);
  curBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var c = btn.getAttribute('data-cur'); if (c === state.cur) return;
      state.cur = c;
      curBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === btn)); });
      $$('.pv[data-usd]').forEach(function (el) { el.textContent = money(Number(el.getAttribute('data-usd'))); });
      render('cur');
    });
  });

  // вихід чека зі щілини (CSS, ПК): після кінця знімаємо клас — анімація більше не існує, і повторний розрахунок стилів
  // (зміна розміру вікна, знімок усієї сторінки) не запускає її знову з прихованого стану
  var paper = $('.bill__paper', bill), fed = function () { bill.classList.remove('is-feed'); };
  if (bill.classList.contains('is-feed')) {
    if (paper && getComputedStyle(paper).animationName === 'bill-feed') { paper.addEventListener('animationend', fed); setTimeout(fed, 2600); }
    else fed();
  }

  // повернення назад у браузері відновлює вибір — чек має збігатися з ним
  var checked = radios.filter(function (r) { return r.checked; })[0];
  if (checked && F[checked.value]) state.f = checked.value;
  if (rushBox) state.rush = rushBox.checked;
  if (state.f !== 'Spark' || state.rush) render('init');
})();
