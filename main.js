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
