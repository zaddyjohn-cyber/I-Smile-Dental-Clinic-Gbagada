/* ============================================
   ANIMATIONS.JS — I-Smile Dental Clinic
   GSAP + ScrollTrigger animations
============================================ */

window.addEventListener('load', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* Hero text stagger entrance */
  gsap.timeline({ delay: 0.9 })
    .fromTo('.hero-badge',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .fromTo('.hero-title',  { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .fromTo('.hero-sub',    { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .fromTo('.hero-btns',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .fromTo('.hero-proof',  { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
    .fromTo('.tooth-3d-wrap', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(1.4)' }, '-=0.9');

  /* Stats bar */
  gsap.fromTo('.stat-item', { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.stats-bar', start: 'top 85%' }
  });

  /* Services grid stagger */
  gsap.fromTo('.svc-card', { opacity: 0, y: 40, scale: 0.95 }, {
    opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }
  });

  /* Zigzag rows */
  gsap.fromTo('.zz-img-box, .zz-phone-box', { opacity: 0, x: -50 }, {
    opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
    scrollTrigger: { trigger: '.zigzag', start: 'top 75%' }
  });

  /* Location cards */
  gsap.fromTo('.location-card', { opacity: 0, y: 50 }, {
    opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: { trigger: '.locs-grid', start: 'top 80%' }
  });

  /* MVV cards (about page) */
  gsap.fromTo('.mvv-card', { opacity: 0, y: 30 }, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.mvv-grid', start: 'top 80%' }
  });

  /* Gallery tiles */
  gsap.fromTo('.gallery-tile', { opacity: 0, scale: 0.9 }, {
    opacity: 1, scale: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: '.gallery-masonry', start: 'top 80%' }
  });

  /* Testimonial cards */
  gsap.fromTo('.testi-card', { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.testi-grid', start: 'top 80%' }
  });

  /* Float chips */
  gsap.fromTo('.float-chip', { opacity: 0, scale: 0.7 }, {
    opacity: 1, scale: 1, duration: 0.7, stagger: 0.2, ease: 'back.out(1.5)', delay: 1.4
  });

  /* Parallax blobs */
  document.querySelectorAll('.hero-blob').forEach((blob, i) => {
    gsap.to(blob, {
      y: (i + 1) * 60,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });
  });
});
