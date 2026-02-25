 // ── NAVBAR SCROLL
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── HAMBURGER / MOBILE MENU
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');

    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    closeMenu.addEventListener('click', closeMobileMenu);
    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }

    // ── SCROLL REVEAL
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => revealObserver.observe(el));

    // ── BACK TO TOP
    const btt = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ── CONTACT FORM
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        const nom = document.getElementById('nom').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const sujet = document.getElementById('sujet').value;
        if (!nom || !email || !message || !sujet) {
          e.preventDefault();
          alert('Veuillez remplir tous les champs obligatoires (*).');
          return;
        }
        // Show success (form submits via mailto)
        setTimeout(() => {
          formSuccess.style.display = 'block';
          contactForm.reset();
        }, 300);
      });
    }

    // ── ACTIVE NAV LINK ON SCROLL
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.fontWeight = '500';
          });
          const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.style.fontWeight = '700';
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => sectionObserver.observe(s));

    // ── MODULE TAGS HOVER FEEDBACK
    document.querySelectorAll('.module-tag').forEach(tag => {
      tag.style.cursor = 'pointer';
    });