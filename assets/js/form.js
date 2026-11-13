/* Velira — спільна форма заявки (головна й сторінки послуг), ц.17.
   Винесено з site.js без зміни поведінки головної: є data-endpoint → заявка йде на сервер (Google Apps Script);
   нема або сервер не відповів → відкриваємо Telegram з уже написаним текстом заявки.
   Нове (cro.md 2.3, 2.4, 2.9, 2.13): формат одним дотиком (поле format), «Терміново», посилання рядків цін
   (a[data-format]) вписують формат у форму, кнопки Telegram (a[data-tg]) отримують текст зі сторінки й формату.
   Поки сервер не знає поле format, воно йде ще й на початок brief: «[Формат: …] ». */
(function () {
  var form = document.getElementById('lead-form');
  if (!form) return;
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var status = form.querySelector('.form__status'), sendBtn = form.querySelector('[type="submit"]');
  var brief = form.elements.brief, briefOpt = form.querySelector('.form__opt');
  var TG = 'https://t.me/madbod_77', PRIVACY_VERSION = form.getAttribute('data-privacy') || '';
  var SOURCE = form.getAttribute('data-source') || 'home', PAGE = form.getAttribute('data-page-name') || '';
  var say = function (html) { status.innerHTML = html; };
  var tgLink = function (text) { return TG + '?text=' + encodeURIComponent(text); };
  var track = function (n, p) { if (typeof window.veliraTrack === 'function') window.veliraTrack(n, p); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // назва формату для людини (текст Telegram і заявка без власного опису) і приклад у полі «Що потрібно зробити?»
  var FORMATS = {
    'Spark': ['лендинг (Spark)', 'Наприклад: лендинг для курсу з формою запису'],
    'Orbit': ['бізнес-сайт (Orbit)', 'Наприклад: сайт студії з послугами, цінами й формою'],
    'Supernova': ['магазин або сайт зі складними функціями (Supernova)', 'Наприклад: магазин з каталогом і оплатою'],
    'Premium': ['авторський сайт (Premium)', 'Наприклад: сайт бренду з власною 3D-сценою'],
    'Standard System': ['сайт, розмова з клієнтом і автоматизація (Standard System)', 'Наприклад: сайт, бот і передача заявок у таблицю'],
    'Premium System': ['Premium System', 'Наприклад: сайт і автоматизація кількох процесів'],
    'Telegram-бот': ['Telegram-бот', 'Наприклад: бот, що приймає заявки й ставить потрібні питання'],
    'Інше': ['', '']
  };
  var radios = $$('input[name="format"]', form), urgentBox = form.elements.urgent || null;
  var hint0 = brief ? brief.getAttribute('placeholder') || '' : '';
  var current = function () { var r = radios.filter(function (x) { return x.checked; })[0]; return r ? r.value : ''; };
  // ц.18 fix1: «Терміново · 48 год ×1,5» — лише Spark / Orbit / Supernova (src/websites.html + studio.js; Premium — індивідуальний графік,
  // системи й бот — строк у пропозиції). Для них прапорець ховаємо й знімаємо; «Ще не знаю» й без формату — лишаємо (у підписі названо формати)
  var RUSH = { 'Spark': 1, 'Orbit': 1, 'Supernova': 1, 'Інше': 1, '': 1 };
  var urgentRow = urgentBox ? urgentBox.closest('.fmt__urgent') : null;
  var rushOk = function (f) { return !!RUSH[f || '']; };
  var isUrgent = function () { return !!(urgentBox && urgentBox.checked && rushOk(current())); };
  // формат, обраний чіпом (не «Ще не знаю»), робить опис необов'язковим: тоді в заявку йде назва формату
  var known = function (f) { return !!(f && FORMATS[f] && FORMATS[f][0]); };

  // готовий початок повідомлення в Telegram: зі сторінки (data-tg) + формат + терміновість
  var tgButtons = $$('a[data-tg]');
  var tgText = function (base) {
    var f = current(), t = base;
    if (known(f)) t += FORMATS[f][0] + '. ';
    if (isUrgent()) t += 'Терміново — за 48 годин. ';
    return t;
  };
  var sync = function () {
    var f = current();
    if (urgentRow) { var ok = rushOk(f); urgentRow.hidden = !ok; if (!ok) urgentBox.checked = false; }
    tgButtons.forEach(function (a) { a.href = tgLink(tgText(a.getAttribute('data-tg'))); });
    if (brief) {
      var need = !known(f);
      brief.required = need;
      brief.setAttribute('aria-required', String(need));
      if (briefOpt) briefOpt.hidden = need;
      brief.setAttribute('placeholder', known(f) ? FORMATS[f][1] : hint0);
      if (!need) brief.removeAttribute('aria-invalid');
    }
    radios.forEach(function (r) { var c = r.closest('.fmt__c'); if (c && r.checked && c.hidden) c.hidden = false; });
  };
  radios.forEach(function (r) {
    r.addEventListener('change', sync);
  });
  if (urgentBox) urgentBox.addEventListener('change', sync);

  // спалах обраного чіпа (лише opacity/transform у CSS; без руху — просто обраний стан)
  var flash = function (r) {
    var c = r && r.closest('.fmt__c'); if (!c || reduce) return;
    c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash');
    setTimeout(function () { c.classList.remove('is-flash'); }, 1300);
  };
  // рядки цін і кнопки «Обговорити Spark →»: формат уже вписаний, далі — звичайний перехід за якорем до форми
  $$('a[data-format]').forEach(function (a) {
    a.addEventListener('click', function () {
      var f = a.getAttribute('data-format'), r = radios.filter(function (x) { return x.value === f; })[0];
      if (!r) return;
      var c = r.closest('.fmt__c'); if (c) c.hidden = false;
      r.checked = true; sync(); flash(r);
      // клавіатура: фокус — на обраному чіпі (без прокрутки: її робить сам якір)
      setTimeout(function () { try { r.focus({ preventScroll: true }); } catch (e) { r.focus(); } }, 0);
    });
  });

  // ц.18: аналітика після згоди надсилає лише події, перелічені в privacy.html («заявка» й «перехід у Telegram»)

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = current(), urgent = isUrgent();
    var bad = $$('[required]', form).filter(function (x) {
      var ok = x.type === 'checkbox' ? x.checked : x.value.trim().length > 0;
      if (x.type !== 'checkbox') x.setAttribute('aria-invalid', String(!ok));
      return !ok;
    });
    if (bad.length) { say(known(f) ? 'Заповніть ім’я й контакт і позначте обидві згоди.' : 'Заповніть усі поля й позначте обидві згоди.'); bad[0].focus(); return; }
    var v = function (n) { return (form.elements[n] && form.elements[n].value || '').trim(); };
    var task = v('brief') || (known(f) ? FORMATS[f][0].charAt(0).toUpperCase() + FORMATS[f][0].slice(1) : '');
    var tag = f ? '[Формат: ' + f + (urgent ? ' · терміново, 48 год' : '') + '] ' : (urgent ? '[Терміново, 48 год] ' : '');
    var attr = typeof window.veliraAttribution === 'function' ? window.veliraAttribution() : {};
    var from = [attr.gclid || attr.gbraid || attr.wbraid ? 'Google Ads' : attr.utm_source, attr.utm_campaign].filter(Boolean).join(' · ');
    var text = 'Заявка з сайту Velira' + (PAGE ? ' · сторінка «' + PAGE + '»' : '') + '\nІм’я / бренд: ' + v('name') + '\nКонтакт: ' + v('contact') +
      (f ? '\nФормат: ' + f : '') + (urgent ? '\nТерміново: за 48 годин (×1,5, якщо погодимо до старту)' : '') +
      '\nЗадача: ' + task + (from ? '\nЗвідки: ' + from : '');
    var endpoint = form.getAttribute('data-endpoint') || '';
    var fallback = function (lead, label) {
      say(lead + ' <a class="form__tg" href="' + tgLink(text) + '" target="_blank" rel="noopener">' + (label || 'Відкрити Telegram з текстом заявки') + '</a>');
    };
    if (!endpoint) {
      var win = window.open(tgLink(text), '_blank', 'noopener');
      if (win) fallback('Відкрили Telegram з текстом заявки — натисніть «Надіслати» в чаті.', 'Чат не відкрився?');
      else fallback('Текст заявки готовий.');
      return;
    }
    var payload = {
      name: v('name'), contact: v('contact'), brief: (tag + task).slice(0, 2000), company: v('company'),
      privacyAcknowledged: form.elements.privacyAcknowledged.checked,
      deliveryConsent: form.elements.deliveryConsent.checked,
      privacyVersion: PRIVACY_VERSION, source: SOURCE, language: 'uk', page: location.href.split('#')[0].slice(0, 300), attribution: attr,
      format: f
    };
    sendBtn.disabled = true; say('Надсилаємо…');
    var ctl = 'AbortController' in window ? new AbortController() : null, timer = setTimeout(function () { if (ctl) ctl.abort(); }, 12000);
    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || res.ok !== true) throw new Error((res && res.error) || 'not ok');
        form.reset(); $$('[aria-invalid]', form).forEach(function (x) { x.removeAttribute('aria-invalid'); });
        sync();
        // cro.md 2.13: після надсилання — продовження в Telegram з тим самим текстом
        say('Заявку отримали. Відповімо за контактом, який ви вказали. <a class="form__tg" href="' + tgLink(text) + '" target="_blank" rel="noopener">Зручніше в Telegram — відкрийте чат із текстом заявки ↗</a>');
        track('lead_form_submit', { method: 'form', format: f });
      })
      .catch(function () { fallback('Не вдалося надіслати з сайту.'); })
      .then(function () { clearTimeout(timer); sendBtn.disabled = false; });
  });

  sync();
})();
