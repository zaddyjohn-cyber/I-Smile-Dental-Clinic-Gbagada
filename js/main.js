/* ============================================
   MAIN.JS — I-Smile Dental Clinic
   Premium rebuild — all interactive JS
============================================ */

/* ============================
   PAGE LOADER
============================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initReveal();
  }, 800);
});

document.body.style.overflow = 'hidden';

/* ============================
   CUSTOM CURSOR
============================ */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

if (cursor && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .svc-card, [data-tilt], .nav-cta').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      cursorRing.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      cursorRing.classList.remove('cursor-hover');
    });
  });

  document.addEventListener('mousedown', () => cursor.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('cursor-click'));
}

/* ============================
   NAVBAR SCROLL BEHAVIOUR
============================ */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  if (navbar) {
    if (y > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (y > lastScroll + 5 && y > 300) {
      navbar.classList.add('nav-hidden');
    } else if (y < lastScroll - 5) {
      navbar.classList.remove('nav-hidden');
    }
    lastScroll = y;
  }

  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('show', y > 600);
  }
}, { passive: true });

document.getElementById('scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================
   HAMBURGER MENU
============================ */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

function openMenu() {
  hamburger?.classList.add('open');
  mobileMenu?.classList.add('open');
  menuOverlay?.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger?.classList.remove('open');
  mobileMenu?.classList.remove('open');
  menuOverlay?.classList.remove('show');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
});
menuOverlay?.addEventListener('click', closeMenu);
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

/* ============================
   SCROLL REVEAL
============================ */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .tl-item, .underline-draw').forEach(el => obs.observe(el));
}
initReveal();

/* ============================
   STATS COUNTER
============================ */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const start  = Date.now();
      (function tick() {
        const p = Math.min((Date.now() - start) / 1800, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(target * e) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })();
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter-value').forEach(el => counterObs.observe(el));

/* ============================
   WHATSAPP FLOAT
============================ */
(function injectWhatsApp() {
  const wa = document.createElement('a');
  wa.href      = 'https://wa.me/2348133557279?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20I-Smile%20Dental%20Clinic';
  wa.target    = '_blank';
  wa.rel       = 'noopener noreferrer';
  wa.className = 'wa-float';
  wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.innerHTML = `
    <div class="wa-ring"></div>
    <div class="wa-icon">
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </div>
    <div class="wa-tooltip">Chat on WhatsApp</div>
  `;
  document.body.appendChild(wa);
})();

/* ============================
   GALLERY FILTER
============================ */
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-tile');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.style.opacity = '0';
        item.style.display = '';
        setTimeout(() => { item.style.opacity = '1'; item.style.transition = 'opacity 0.4s'; }, 10);
      } else {
        item.style.opacity = '0';
        setTimeout(() => { item.style.display = 'none'; }, 400);
      }
    });
  });
});

/* ============================
   FAQ ACCORDION
============================ */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q')?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ============================
   CONTACT FORM
============================ */
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('button[type="submit"]');
  const orig = btn?.textContent;

  if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (res.ok) {
      showToast('Message sent! We\'ll be in touch soon 😊', 'success');
      form.reset();
    } else {
      showToast('Something went wrong. Please call us directly.', 'error');
    }
  } catch {
    showToast('Network error. Call us on 08133557279.', 'error');
  } finally {
    if (btn) { btn.textContent = orig; btn.disabled = false; }
  }
});

/* ============================
   TOAST
============================ */
function showToast(msg, type = 'success') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast ${type}`;
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => t.classList.remove('show'), 4500);
}

/* ============================
   ACTIVE NAV LINK
============================ */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }
});

/* ============================
   STAR PARTICLES (testimonials)
============================ */
const starsBg = document.querySelector('.stars-bg');
if (starsBg) {
  for (let i = 0; i < 35; i++) {
    const s = document.createElement('div');
    s.className   = 'star-p';
    s.textContent = ['⭐','✨','💫'][Math.floor(Math.random() * 3)];
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;font-size:${0.6+Math.random()*0.9}rem;animation-delay:${Math.random()*8}s;animation-duration:${4+Math.random()*6}s;`;
    starsBg.appendChild(s);
  }
}

/* ============================
   HERO PARTICLES
============================ */
document.querySelectorAll('.hp').forEach(p => {
  p.style.cssText = `
    position:absolute;
    width:${4+Math.random()*6}px;height:${4+Math.random()*6}px;
    border-radius:50%;background:var(--accent);
    opacity:${0.1+Math.random()*0.25};
    left:${Math.random()*100}%;top:${Math.random()*100}%;
    animation:floatSlow ${5+Math.random()*8}s ease-in-out infinite;
    animation-delay:${Math.random()*5}s;
  `;
});

/* ============================
   VANILLA TILT
============================ */
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 10, speed: 500, glare: true, 'max-glare': 0.12, perspective: 1000
  });
}

/* ============================
   GLIGHTBOX
============================ */
if (typeof GLightbox !== 'undefined') {
  GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
}
