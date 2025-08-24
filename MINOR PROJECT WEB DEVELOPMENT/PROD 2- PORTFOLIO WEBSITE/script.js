// ==============================
// Mobile nav toggle (defensive)
// ==============================
const navToggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#primary-menu');
if (navToggle && menu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      menu.style.display = 'flex';
      menu.style.flexDirection = 'column';
      menu.style.gap = '10px';
      menu.style.background = 'rgba(11,13,16,.95)';
      menu.style.padding = '12px';
      menu.style.border = '1px solid var(--border)';
      menu.style.borderRadius = '10px';
      menu.style.position = 'absolute';
      menu.style.right = '20px';
      menu.style.top = '56px';
    } else {
      menu.style.display = 'none';
    }
  });
}

// ==============================
// Back to top button
// ==============================
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 480);
  }, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ==============================
// Dynamic year
// ==============================
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ==============================
// Smooth scroll with header offset
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ==============================
// THEME: robust dark/light handling
// ==============================
(function themeController(){
  const THEME_KEY = 'pref-theme';
  const root = document.documentElement; // set attribute on <html>
  const toggleBtn = document.querySelector('.theme-toggle');
  const toggleIcon = document.querySelector('.theme-icon');

  function setIcon(theme) {
    if (!toggleIcon) return;
    toggleIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  function normalize(theme) {
    return theme === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme, persist = true) {
    const t = normalize(theme);
    root.setAttribute('data-theme', t);
    setIcon(t);
    if (persist) {
      try { localStorage.setItem(THEME_KEY, t); } catch {}
    }
  }

  // Ensure there is an initial attribute so CSS applies immediately
  if (!root.hasAttribute('data-theme')) {
    root.setAttribute('data-theme', 'dark');
  }

  // Initial: saved > system > dark
  (function init(){
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch {}
    if (saved !== 'light' && saved !== 'dark') saved = null;

    if (saved) {
      applyTheme(saved, false);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light', false);
    }
  })();

  // Toggle click
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);

      // Screen reader announcement
      let live = document.getElementById('theme-live');
      if (!live) {
        live = document.createElement('div');
        live.id = 'theme-live';
        live.setAttribute('aria-live', 'polite');
        live.className = 'sr-only';
        document.body.appendChild(live);
      }
      live.textContent = `Theme set to ${next}`;
    });
  }

  // React to OS changes only if user hasn't explicitly chosen
  if ('matchMedia' in window) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = e => {
      let saved = null;
      try { saved = localStorage.getItem(THEME_KEY); } catch {}
      if (!saved) applyTheme(e.matches ? 'dark' : 'light', false);
    };
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else if (mq.addListener) mq.addListener(handler); // Safari fallback
  }
})();

// ==============================
// Accessibility: inject sr-only if missing
// ==============================
(function injectSR(){
  if (!document.querySelector('.sr-only')) {
    const style = document.createElement('style');
    style.innerHTML = `.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`;
    document.head.appendChild(style);
  }
})();

// ==============================
/* Prevent back-to-top overlapping the footer (with fallback) */
(function avoidFooterOverlap(){
  const btt = document.querySelector('.back-to-top');
  const footer = document.querySelector('.site-footer');
  if (!btt || !footer) return;

  const raiseOn = isVisible => {
    btt.classList.toggle('raise', isVisible);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => raiseOn(entry.isIntersecting));
    }, { root: null, threshold: 0, rootMargin: '0px 0px -10% 0px' });
    io.observe(footer);
  } else {
    const update = () => {
      const r = footer.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      raiseOn(r.top < vh && r.bottom > 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();
