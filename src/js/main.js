// ============================================================
//  EFTA Ambatobe — Script global
//  Chargement composants + interactions communes
// ============================================================

// ── CHARGEMENT DES COMPOSANTS (navbar + footer)
async function loadComponent(id, path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Composant introuvable : ' + path);
    const html = await res.text();
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = html;
      el.removeAttribute('id'); // déplace le contenu au bon niveau
    }
    // Une fois la navbar injectée, on initialise ses comportements
    if (id === 'navbar-placeholder') initNavbar();
    if (id === 'footer-placeholder') initBackToTop();
  } catch (e) {
    console.warn(e.message);
  }
}

// Détecte le chemin relatif selon la profondeur de la page
function getBasePath() {
  // Toutes les pages sont à la racine du projet
  return './src/components/';
}

document.addEventListener('DOMContentLoaded', () => {
  const base = getBasePath();
  loadComponent('navbar-placeholder', base + 'navbar.html');
  loadComponent('footer-placeholder', base + 'footer.html');

  // Scroll Reveal (fonctionne même avant l'injection des composants)
  initReveal();

  // Active link
  highlightActiveNav();

  // FAQ (si présente sur la page)
  initFAQ();

  // Formulaire de contact (si présent)
  initContactForm();

  // Chatbot (si présent)
  if (typeof initChatbot === 'function') initChatbot();
});

// ── NAVBAR
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenuBtn = document.getElementById('closeMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMobileMenu);
    });
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', false); }
  document.body.style.overflow = '';
}

// ── HIGHLIGHT LIEN ACTIF
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  // Appelé après injection de la navbar
  setTimeout(() => {
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.split('#')[0] === currentPage) {
        link.classList.add('active');
      }
    });
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.split('#')[0] === currentPage) {
        link.style.color = 'var(--or)';
      }
    });
  }, 200);
}

// ── SCROLL REVEAL
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}

// ── BACK TO TOP
function initBackToTop() {
  const btt = document.getElementById('backToTop');
  if (!btt) return;
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
  });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── FAQ ACCORDION
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Ferme tous les autres
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── FORMULAIRE CONTACT
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    const nom = form.querySelector('#nom')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();
    const sujet = form.querySelector('#sujet')?.value;
    if (!nom || !email || !message || !sujet) {
      e.preventDefault();
      alert('Veuillez remplir tous les champs obligatoires (*).');
      return;
    }
    setTimeout(() => {
      if (success) success.style.display = 'block';
      form.reset();
    }, 300);
  });
}

// ── FILTRES ACTUALITÉS
function initActuFilters() {
  const btns = document.querySelectorAll('.actu-filter-btn');
  const cards = document.querySelectorAll('.actu-card[data-cat]');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ── MODULE TAGS
document.querySelectorAll('.module-tag').forEach(tag => {
  tag.style.cursor = 'pointer';
});
