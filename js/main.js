/* ============================================
   PUNCH YOUR AGENT — Main JS
   ============================================ */

(function () {
  'use strict';

  // ---------- Sticky header ----------
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ---------- Mobile menu ----------
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      menuBtn.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Scroll fade-in ----------
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---------- Contact form: pre-fill subject from URL ----------
  var params = new URLSearchParams(window.location.search);
  var subjectParam = params.get('subject');
  if (subjectParam) {
    var subjectSelect = document.getElementById('contactSubject');
    if (subjectSelect) {
      var map = {
        story: 'Submit Your Story',
        podcast: 'Come On The Podcast',
        sponsorship: 'Sponsorship'
      };
      if (map[subjectParam]) {
        subjectSelect.value = map[subjectParam];
      }
    }
  }
})();
