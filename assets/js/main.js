/*=============== SOCIAL LINKS CONFIGURATION ===============*/
const socialLinks = [
   {
      name: 'Email',
      url: 'mailto:rajayush6200@gmail.com',
      iconClass: 'ri-mail-line',
      isEmail: true
   },
   {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rajayush6200/',
      iconClass: 'ri-linkedin-box-line',
      isEmail: false
   },
   {
      name: 'GitHub',
      url: 'https://github.com/rajayush6200',
      iconClass: 'ri-github-line',
      isEmail: false
   },
   {
      name: 'X (Twitter)',
      url: 'https://x.com/@AyushRaj444',
      iconClass: 'ri-twitter-x-line',
      isEmail: false
   }
];

const homeSocialContainer = document.getElementById('home-social');
if (homeSocialContainer) {
   homeSocialContainer.innerHTML = socialLinks.map(link => `
      <a href="${link.url}" class="home__social-link" ${link.isEmail ? '' : 'target="_blank" rel="noopener noreferrer"'} aria-label="${link.name}">
         <i class="${link.iconClass}"></i>
      </a>
   `).join('');
}


/*=============== PROJECTS GRID — Scroll Reveal ===============*/
// IntersectionObserver-based staggered reveal for the 2×2 project grid
const projectCards = document.querySelectorAll('.projects__card-v2');

if (projectCards.length > 0 && 'IntersectionObserver' in window) {
   // Set initial hidden state
   projectCards.forEach(card => card.classList.add('sr--hidden'));

   const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.remove('sr--hidden');
            entry.target.classList.add('sr--visible');
            projectObserver.unobserve(entry.target);
         }
      });
   }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
   });

   projectCards.forEach(card => projectObserver.observe(card));
}

/*=============== SKILLS — Scroll Reveal & Count-Up ===============*/

// --- Skill cards stagger scroll reveal ---
const skillCards = document.querySelectorAll('.skills__card');
if (skillCards.length > 0 && 'IntersectionObserver' in window) {
   skillCards.forEach(card => card.classList.add('sr--hidden'));

   const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
         if (entry.isIntersecting) {
            // slight stagger using a tiny per-card delay
            const card = entry.target;
            const delay = Array.from(skillCards).indexOf(card) * 80;
            setTimeout(() => {
               card.classList.remove('sr--hidden');
               card.classList.add('sr--visible');
            }, delay);
            skillObserver.unobserve(card);
         }
      });
   }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

   skillCards.forEach(card => skillObserver.observe(card));
}

// --- Count-up animation for Skills stat numbers ---
function animateCountUp(el, target, suffix, duration) {
   const start = 0;
   const step = Math.ceil(duration / target) || 1;
   const fps  = 16; // ~60fps
   const increment = target / (duration / fps);
   let current = start;

   const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
         current = target;
         clearInterval(timer);
      }
      el.textContent = Math.round(current) + suffix;
   }, fps);
}

const skillStatEls = document.querySelectorAll('.skills__stat-number[data-target]');
if (skillStatEls.length > 0 && 'IntersectionObserver' in window) {
   let counted = false;

   const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting && !counted) {
            counted = true;
            skillStatEls.forEach((el, i) => {
               const target = parseInt(el.dataset.target, 10);
               const suffix = el.dataset.suffix || '';
               const delay  = i * 120;
               setTimeout(() => animateCountUp(el, target, suffix, 900), delay);
            });
            statObserver.disconnect();
         }
      });
   }, { threshold: 0.35 });

   const statsGrid = document.querySelector('.skills__stats-grid');
   if (statsGrid) statObserver.observe(statsGrid);
}

/*=============== CERTIFICATIONS — Scroll Reveal ===============*/
const certCards = document.querySelectorAll('.certifications__card');

if (certCards.length > 0 && 'IntersectionObserver' in window) {
   certCards.forEach(card => card.classList.add('sr--hidden'));

   const certObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            const card = entry.target;
            const delay = Array.from(certCards).indexOf(card) * 100;
            setTimeout(() => {
               card.classList.remove('sr--hidden');
               card.classList.add('sr--visible');
            }, delay);
            certObserver.unobserve(card);
         }
      });
   }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

   certCards.forEach(card => certObserver.observe(card));
}

/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('contact-copy');
const emailEl = document.getElementById('contact-email');

if (copyBtn && emailEl) {
   copyBtn.addEventListener('click', () => {
      const email = emailEl.textContent.trim();

      if (navigator.clipboard && window.isSecureContext) {
         navigator.clipboard.writeText(email).then(() => {
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="ri-check-line"></i> Copied!';
            emailEl.classList.add('email-copied');

            setTimeout(() => {
               copyBtn.innerHTML = original;
               emailEl.classList.remove('email-copied');
            }, 2500);
         }).catch(console.error);
      }
   });
}



/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
   const scrollDown = window.scrollY;

   sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const sectionsClass = document.querySelector(`.nav__link[href*="${sectionId}"]`);

      if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
         sectionsClass && sectionsClass.classList.add('active-link');
      } else {
         sectionsClass && sectionsClass.classList.remove('active-link');
      }
   });
}

window.addEventListener('scroll', scrollActive);

/*=============== SCROLL HEADER (GLASS EFFECT) ===============*/
function scrollHeader() {
   const header = document.getElementById('header');
   if (header) {
      if (window.scrollY >= 50) {
         header.classList.add('scroll-header');
      } else {
         header.classList.remove('scroll-header');
      }
   }
}

window.addEventListener('scroll', scrollHeader);

/*=============== NAV MENU TOGGLE ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

function openMenu() {
   navMenu && navMenu.classList.add('show-menu');
   navToggle && navToggle.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
   navMenu && navMenu.classList.remove('show-menu');
   navToggle && navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle) {
   navToggle.addEventListener('click', openMenu);
}

if (navClose) {
   navClose.addEventListener('click', closeMenu);
}

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
   link.addEventListener('click', closeMenu);
});

/* Close nav with Escape key */
document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show-menu')) {
      closeMenu();
      navToggle && navToggle.focus(); // Return focus to toggle button
   }
});

/*=============== CUSTOM CURSOR ===============*/
const cursorBig = document.querySelector('.cursor__ball--big');
const cursorSmall = document.querySelector('.cursor__ball--small');

let bigX = 0, bigY = 0;
let smallX = 0, smallY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
   mouseX = e.clientX;
   mouseY = e.clientY;

   smallX = mouseX;
   smallY = mouseY;
   if (cursorSmall) {
      cursorSmall.style.transform = `translate(${smallX - 5}px, ${smallY - 5}px)`;
   }
});

function animateCursor() {
   bigX += (mouseX - bigX) * 0.12;
   bigY += (mouseY - bigY) * 0.12;

   if (cursorBig) {
      cursorBig.style.transform = `translate(${bigX - 15}px, ${bigY - 15}px)`;
   }

   requestAnimationFrame(animateCursor);
}

animateCursor();

const hoverables = document.querySelectorAll(
   'a, button, .nav__toggle, .nav__close, .projects__card, .projects__card-v2, .projects__btn-primary, .projects__btn-secondary, .home__social-link, .certifications__card, .certifications__btn, .contact__platform-card, .contact__info-card, .contact__form-card, .contact__submit-btn'
);

hoverables.forEach(el => {
   el.addEventListener('mouseenter', () => {
      if (cursorBig) {
         cursorBig.querySelector('circle').setAttribute('r', 20);
         cursorBig.style.opacity = '0.35';
         cursorBig.style.mixBlendMode = 'screen';
      }
   });

   el.addEventListener('mouseleave', () => {
      if (cursorBig) {
         cursorBig.querySelector('circle').setAttribute('r', 12);
         cursorBig.style.opacity = '1';
         cursorBig.style.mixBlendMode = 'difference';
      }
   });
});

document.addEventListener('mouseleave', () => {
   if (cursorBig) cursorBig.classList.add('cursor--hidden');
   if (cursorSmall) cursorSmall.classList.add('cursor--hidden');
});

document.addEventListener('mouseenter', () => {
   if (cursorBig) cursorBig.classList.remove('cursor--hidden');
   if (cursorSmall) cursorSmall.classList.remove('cursor--hidden');
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'bottom',
   distance: '50px',
   duration: 1100,
   delay: 150,
   reset: false,
   easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
});

// Home section
sr.reveal('.home__greeting',     { delay: 100, origin: 'left' });
sr.reveal('.home__name',         { delay: 200 });
sr.reveal('.home__static-role',  { delay: 300 });
sr.reveal('.home__tech-clip',    { delay: 380 });
sr.reveal('.home__profession-group', { delay: 430 });
sr.reveal('.home__credibility',  { delay: 480 });
sr.reveal('.home__badge-row',    { delay: 520, origin: 'left' });
sr.reveal('.home__social',       { delay: 580 });
sr.reveal('.home__cv',           { delay: 640 });
sr.reveal('.home__img',          { origin: 'right', delay: 300, distance: '80px' });

// About section
sr.reveal('.about__img',             { origin: 'left', delay: 150, distance: '60px' });
sr.reveal('.about__eyebrow',         { delay: 150, origin: 'left' });
sr.reveal('.about__title',           { delay: 250 });
sr.reveal('.about__description-wrap',{ delay: 350 });
sr.reveal('.about__stats',           { delay: 450 });
sr.reveal('.about__cta',             { delay: 550, origin: 'left' });

// Section titles
sr.reveal('.section__title', { delay: 100 });

// Projects (old swiper cards — kept for fallback compatibility)
sr.reveal('.projects__card', { interval: 150 });

// Projects V2 section header
sr.reveal('.projects__eyebrow',         { delay: 100 });
sr.reveal('.projects__section-title',   { delay: 180 });
sr.reveal('.projects__accent-line',     { delay: 240, distance: '0px' });
sr.reveal('.projects__section-subtitle',{ delay: 300 });

// Skills section
sr.reveal('.skills__eyebrow',           { delay: 100 });
sr.reveal('.skills__section-title',     { delay: 180 });
sr.reveal('.skills__accent-line',       { delay: 240, distance: '0px' });
sr.reveal('.skills__section-subtitle',  { delay: 300 });
sr.reveal('.skills__focus-card',        { delay: 150, origin: 'right', distance: '40px' });
sr.reveal('.skills__stat-card',         { interval: 100, origin: 'bottom' });
sr.reveal('.skills__stack-title',       { delay: 100 });
sr.reveal('.skills__stack-line',        { delay: 160, distance: '0px' });
sr.reveal('.skills__chip',              { interval: 40, origin: 'bottom', distance: '20px' });

// Contact — Premium slide-in animations (left col from left, right col from right)
(function () {
  if (!('IntersectionObserver' in window)) return;

  const contactLeft = document.querySelector('.contact__left');
  const contactRight = document.querySelector('.contact__right');

  const contactColObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Slight stagger: right column appears 150ms after left
        const delay = el === contactRight ? 150 : 0;
        setTimeout(() => {
          el.classList.remove('sr--hidden');
          el.classList.add('sr--visible');
        }, delay);
        contactColObserver.unobserve(el);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  [contactLeft, contactRight].forEach(el => {
    if (el) {
      el.classList.add('sr--hidden');
      contactColObserver.observe(el);
    }
  });

  // Platform cards: stagger reveal for full-width social row
  const platformCards = document.querySelectorAll('.contact__platform-card');
  const socialSection = document.querySelector('.contact__social-section');

  if (platformCards.length > 0) {
    platformCards.forEach(card => card.classList.add('sr--hidden'));

    const platformObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          platformCards.forEach((card, idx) => {
            setTimeout(() => {
              card.classList.remove('sr--hidden');
              card.classList.add('sr--visible');
            }, idx * 90);
          });
          platformObserver.disconnect();
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    if (socialSection) platformObserver.observe(socialSection);
  }
}());

// Keep ScrollReveal for the section header only
sr.reveal('.contact__header', { delay: 80, origin: 'bottom', distance: '30px' });
sr.reveal('.contact__social-title', { delay: 100, origin: 'bottom', distance: '20px' });
sr.reveal('.contact__social-accent', { delay: 160, distance: '0px' });

// CTA
sr.reveal('.cta__container', { origin: 'bottom', delay: 150, distance: '40px', scale: 0.95 });

// Certifications section header
sr.reveal('.certifications__eyebrow',          { delay: 100 });
sr.reveal('.certifications__section-title',    { delay: 180 });
sr.reveal('.certifications__accent-line',      { delay: 240, distance: '0px' });
sr.reveal('.certifications__section-subtitle', { delay: 300 });

/*=============== PARALLAX AMBIENT GLOW ON MOUSE MOVE ===============*/
const homeBlob = document.querySelector('.home__blob-inner');
if (homeBlob) {
   document.addEventListener('mousemove', (e) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 30;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 20;
      homeBlob.style.transform = `translateX(calc(-50% + ${xRatio}px)) translateY(${yRatio}px)`;
   });
}

/*=============== MICRO-INTERACTION: MAGNETIC BUTTONS ===============*/
const magneticBtns = document.querySelectorAll('.button, .home__social-link');

magneticBtns.forEach(btn => {
   btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
   });

   btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
   });
});

/*=============== SCROLL PROGRESS INDICATOR ===============*/
const progressBar = document.createElement('div');
progressBar.style.cssText = `
   position: fixed;
   top: 0;
   left: 0;
   width: 0%;
   height: 2px;
   background: linear-gradient(90deg, hsl(255, 85%, 58%), hsl(255, 70%, 75%));
   z-index: 10000;
   transition: width 0.1s ease;
   pointer-events: none;
   box-shadow: 0 0 8px hsla(255, 80%, 60%, 0.6);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
   const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
   const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
   const progress = (scrollTop / scrollHeight) * 100;
   progressBar.style.width = progress + '%';
});


/*=============== EMAIL JS INTEGRATION ===============*/
// Initialize EmailJS
emailjs.init('YxwRexRnEUmoL_-g7');

const contactForm = document.getElementById('contact-form');
const contactBtn = document.getElementById('contact-submit-btn');
const contactStatus = document.getElementById('contact-form-status');
const emailInput = document.getElementById('from_email');

// Email validation regex
const validateEmail = (email) => {
   return String(email)
     .toLowerCase()
     .match(
       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     );
};

if (contactForm) {
   contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic frontend validation for email
      if (!validateEmail(emailInput.value)) {
         emailInput.parentElement.classList.add('error');
         return;
      } else {
         emailInput.parentElement.classList.remove('error');
      }

      // Show loading state
      contactBtn.classList.add('loading');
      contactBtn.disabled = true;
      contactStatus.className = 'contact__form-status'; // Reset classes
      contactStatus.style.display = 'none';

      // Send form using EmailJS
      emailjs.sendForm('service_portfolio', 'template_ph2e7ul', this)
         .then(() => {
            // Success state
            contactBtn.classList.remove('loading');
            contactBtn.disabled = false;
            
            contactStatus.textContent = "Message sent successfully. I'll get back to you soon.";
            contactStatus.classList.add('success');
            contactStatus.style.display = 'block';

            // Clear form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
               contactStatus.style.display = 'none';
               contactStatus.classList.remove('success');
            }, 5000);

         }, (error) => {
            // Error state
            contactBtn.classList.remove('loading');
            contactBtn.disabled = false;

            contactStatus.textContent = "Failed to send message. Please try again.";
            contactStatus.classList.add('error');
            contactStatus.style.display = 'block';
            console.error('EmailJS Error:', error);

            // Hide error message after 5 seconds
            setTimeout(() => {
               contactStatus.style.display = 'none';
               contactStatus.classList.remove('error');
            }, 5000);
         });
   });
}

// Remove error class on input
if (emailInput) {
   emailInput.addEventListener('input', () => {
      emailInput.parentElement.classList.remove('error');
   });
}
