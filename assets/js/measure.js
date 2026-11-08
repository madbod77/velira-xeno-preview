/* Velira — вимірювання реклами з повагою до згоди.
   Поки ID порожні, нічого не завантажується, банера немає, cookies немає.
   Після створення ресурсів Google вписати ID сюди — і банер згоди з’явиться сам. */
(function (w, d) {
  'use strict';
  var CFG = {
    ga4: '',            // G-XXXXXXXXXX — потік даних GA4 для veliraweb.com.ua
    ads: '',            // AW-XXXXXXXXXX — тег Google Ads
    adsLead: '',        // мітка конверсії «Заявка з форми» (частина після «/»)
    adsTelegram: ''     // мітка конверсії «Клік на Telegram»
  };
  var KEY = 'velira.consent.v1';
  var enabled = !!(CFG.ga4 || CFG.ads);

  /* --- атрибуція: лише на час вкладки (sessionStorage), без cookies --- */
  var ATTR = 'velira.attr.v1', PARAMS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  var attr = {};
  try { attr = JSON.parse(sessionStorage.getItem(ATTR) || '{}') || {}; } catch (e) { attr = {}; }
  try {
    var q = new URLSearchParams(location.search), got = false;
    PARAMS.forEach(function (k) { var v = q.get(k); if (v) { attr[k] = v.slice(0, 200); got = true; } });
    if (got || !attr.landing) {
      attr.landing = (location.pathname + location.search).slice(0, 300);
      if (d.referrer && !attr.referrer) attr.referrer = d.referrer.slice(0, 300);
    }
    sessionStorage.setItem(ATTR, JSON.stringify(attr));
  } catch (e) { /* приватне вікно — просто без атрибуції */ }

  var read = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var save = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };
  var loaded = false;

  function load() {
    if (loaded || !enabled) return; loaded = true;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    w.gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'denied' });
    w.gtag('js', new Date());
    if (CFG.ga4) w.gtag('config', CFG.ga4);
    if (CFG.ads) w.gtag('config', CFG.ads);
    var s = d.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CFG.ga4 || CFG.ads);
    d.head.appendChild(s);
  }

  /* Подія для GA4 і, якщо задано мітку, конверсія Google Ads. Без згоди — нічого. */
  w.veliraTrack = function (name, params) {
    if (!loaded || typeof w.gtag !== 'function') return;
    w.gtag('event', name, params || {});
    var label = (name === 'lead_form_submit' || name === 'lead_telegram_draft') ? CFG.adsLead : name === 'telegram_click' ? CFG.adsTelegram : '';
    if (CFG.ads && label) w.gtag('event', 'conversion', { send_to: CFG.ads + '/' + label });
  };
  w.veliraAttribution = function () { return attr; };

  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="https://t.me/"]');
    if (a) w.veliraTrack('telegram_click', { link_url: a.href, placement: a.closest('section, header, footer') ? (a.closest('section, header, footer').id || a.closest('section, header, footer').tagName.toLowerCase()) : 'page' });
  });

  if (!enabled) return;

  /* --- банер згоди --- */
  function banner() {
    if (d.getElementById('consent')) return;
    var b = d.createElement('div');
    b.id = 'consent'; b.className = 'consent-bar'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-live', 'polite'); b.setAttribute('aria-label', 'Згода на аналітику');
    b.innerHTML = '<p>Ми використовуємо Google Analytics і Google Ads, щоб рахувати заявки з реклами. Вони вмикаються лише з вашої згоди. <a href="privacy.html#cookies">Детальніше</a></p>' +
      '<div class="consent-bar__b"><button type="button" class="btn btn-light" data-c="granted">Дозволити</button><button type="button" class="btn btn-ghost" data-c="denied">Лише необхідні</button></div>';
    b.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-c'); if (!v) return;
      save(v); b.remove();
      if (v === 'granted') load();
      else if (loaded) w.gtag('consent', 'update', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    });
    d.body.appendChild(b);
  }
  function ready(fn) { if (d.readyState !== 'loading') fn(); else d.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var c = read();
    if (c === 'granted') load(); else if (c !== 'denied') banner();
    var nav = d.querySelector('.foot nav');
    if (nav && !d.getElementById('consent-open')) {
      var btn = d.createElement('button'); btn.type = 'button'; btn.id = 'consent-open'; btn.className = 'foot__cookie'; btn.textContent = 'Cookies';
      btn.addEventListener('click', function () { try { localStorage.removeItem(KEY); } catch (e) {} banner(); });
      nav.appendChild(btn);
    }
  });
})(window, document);
