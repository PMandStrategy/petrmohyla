/* ============================================================
   PETR MOHYLA — main.js
   Scroll reveal + mobile nav toggle + footer year
   ============================================================ */

'use strict';

// ── Footer year ──────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Mobile nav toggle ────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const mainNav   = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('is-open', !expanded);
    document.body.style.overflow = !expanded ? 'hidden' : '';
  });

  // Close on nav link click
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('is-open');
      document.body.style.overflow = '';
      navToggle.focus();
    }
  });
}

// ── Scroll reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.service-card, .when-item, .why-me-card, .benefit-item, ' +
  '.hero-content, .hero-visual, .why-marketing-text, ' +
  '.when-contact-image, .cta-inner, .clients-grid'
);

revealEls.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => observer.observe(el));
} else {
  // Fallback for browsers without IntersectionObserver
  revealEls.forEach(el => el.classList.add('visible'));
}
