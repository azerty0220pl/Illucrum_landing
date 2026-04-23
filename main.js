(function () {
  // Theme
  const t = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  if (t) {
    t.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
  // Hamburger
  const h = document.getElementById('hamburger');
  const n = document.getElementById('navLinks');
  if (h && n) {
    h.addEventListener('click', () => n.classList.toggle('open'));
  }
  // Scroll reveal
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('open');
    });
  });
  // Contact click tracking (WhatsApp + Telegram) -> GTM dataLayer
  document.addEventListener('click', function (ev) {
    const link = ev.target.closest && ev.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    let method = '';
    if (/^https?:\/\/(?:[a-z0-9-]+\.)*wa\.me\//i.test(href) || /^https?:\/\/(?:[a-z0-9-]+\.)*whatsapp\.com\//i.test(href)) {
      method = 'whatsapp';
    } else if (/^https?:\/\/(?:[a-z0-9-]+\.)*t\.me\//i.test(href) || /^https?:\/\/(?:[a-z0-9-]+\.)*telegram\.(?:me|org)\//i.test(href)) {
      method = 'telegram';
    }
    if (!method) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'contact_click',
      contact_method: method,
      link_url: link.href,
      link_text: (link.textContent || '').trim().slice(0, 120),
      page_location: window.location.href
    });
  });
})();

// Cookie consent (Google Consent Mode v2)
(function () {
  var STORAGE = 'illu_consent';
  var stored = null;
  try { stored = localStorage.getItem(STORAGE); } catch (e) {}
  if (stored === 'granted' || stored === 'denied') return;

  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML =
    '<p>We use cookies for analytics and advertising. See our <a href="/legal/privacy">Privacy Policy</a>.</p>' +
    '<div class="cookie-actions">' +
      '<button type="button" class="cookie-btn cookie-btn-reject">Reject</button>' +
      '<button type="button" class="cookie-btn cookie-btn-accept">Accept</button>' +
    '</div>';
  document.body.appendChild(banner);
  requestAnimationFrame(function () { banner.classList.add('is-visible'); });

  function decide(granted) {
    try { localStorage.setItem(STORAGE, granted ? 'granted' : 'denied'); } catch (e) {}
    if (typeof window.gtag === 'function') {
      var v = granted ? 'granted' : 'denied';
      window.gtag('consent', 'update', {
        ad_storage: v,
        analytics_storage: v,
        ad_user_data: v,
        ad_personalization: v
      });
    }
    banner.classList.remove('is-visible');
    setTimeout(function () { banner.remove(); }, 400);
  }

  banner.querySelector('.cookie-btn-accept').addEventListener('click', function () { decide(true); });
  banner.querySelector('.cookie-btn-reject').addEventListener('click', function () { decide(false); });
})();
