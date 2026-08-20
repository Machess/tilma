// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal sections as they scroll into view.
// JS only toggles a class; CSS (.reveal / .is-visible) owns the actual animation.
const revealEls = document.querySelectorAll('.section, .contact');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Nav bar gets a slightly stronger border once the page has scrolled.
const nav = document.querySelector('header.nav');
const SCROLL_THRESHOLD = 40;

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
});

// ---------- Mobile menu (burger) ----------
// Same links as the desktop nav, shown in a dropdown under the header.
const navBurger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

if (navBurger && mobileMenu) {
  const closeMobileMenu = () => {
    navBurger.classList.remove('is-open');
    navBurger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
  };

  const toggleMobileMenu = () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    navBurger.classList.toggle('is-open', isOpen);
    navBurger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  };

  navBurger.addEventListener('click', toggleMobileMenu);

  // Close after picking a link, and if the viewport grows past mobile width.
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMobileMenu();
  });
}

// ---------- Hero toggle ----------
// Desktop: three states — "both" is the default split view, and each
// button expands its side to full width (click it again to go back to both).
// Mobile: there's no stacked "both" view (see the CSS media query) — it
// always shows exactly one side, defaulting to Engineering. On mobile each
// button just switches to its own side; clicking the already-active one
// does nothing; there's nothing to "toggle off" to.
const heroSlider = document.getElementById('heroSlider');
const heroPanelTech = document.getElementById('heroPanelTech');
const heroPanelCustomer = document.getElementById('heroPanelCustomer');
const toggleTech = document.getElementById('toggleTech');
const toggleCustomer = document.getElementById('toggleCustomer');

if (heroSlider && toggleTech && toggleCustomer) {
  const MOBILE_QUERY = '(max-width: 900px)';
  const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

  let state = isMobile() ? 'tech' : 'both'; // 'both' | 'tech' | 'customer'

  const applyState = () => {
    heroSlider.classList.toggle('state-tech', state === 'tech');
    heroSlider.classList.toggle('state-customer', state === 'customer');

    toggleTech.setAttribute('aria-pressed', String(state === 'tech'));
    toggleCustomer.setAttribute('aria-pressed', String(state === 'customer'));

    // Hide the fully-covered panel from assistive tech; both are announced in 'both' state.
    if (heroPanelTech) heroPanelTech.setAttribute('aria-hidden', String(state === 'customer'));
    if (heroPanelCustomer) heroPanelCustomer.setAttribute('aria-hidden', String(state === 'tech'));
  };

  toggleTech.addEventListener('click', () => {
    state = isMobile() ? 'tech' : (state === 'tech' ? 'both' : 'tech');
    applyState();
  });

  toggleCustomer.addEventListener('click', () => {
    state = isMobile() ? 'customer' : (state === 'customer' ? 'both' : 'customer');
    applyState();
  });

  applyState();

  // If the viewport crosses the mobile breakpoint after load (window
  // resize, device rotation), make sure 'both' never lingers on mobile.
  window.addEventListener('resize', () => {
    if (isMobile() && state === 'both') {
      state = 'tech';
      applyState();
    }
  });
}

// ---------- Hero scroll buttons ----------
// One lives in each panel's hero-actions row, next to View LinkedIn.
const scrollButtons = document.querySelectorAll('.hero-scroll-btn');
const aboutSection = document.getElementById('about');

if (scrollButtons.length && aboutSection) {
  scrollButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
