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

// ---------- Hero toggle ----------
// Two buttons instead of a drag gesture:
// - "Engineering" expands the tech side to full width (click again to go back to both)
// - "Customer" expands the customer/business side to full width (click again to go back to both)
const heroSlider = document.getElementById('heroSlider');
const heroPanelTech = document.getElementById('heroPanelTech');
const heroPanelCustomer = document.getElementById('heroPanelCustomer');
const toggleTech = document.getElementById('toggleTech');
const toggleCustomer = document.getElementById('toggleCustomer');

if (heroSlider && toggleTech && toggleCustomer) {
  let state = 'both'; // 'both' | 'tech' | 'customer'

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
    state = state === 'tech' ? 'both' : 'tech';
    applyState();
  });

  toggleCustomer.addEventListener('click', () => {
    state = state === 'customer' ? 'both' : 'customer';
    applyState();
  });

  applyState();
}

// ---------- Scroll cue ----------
const scrollCue = document.getElementById('scrollCue');
const aboutSection = document.getElementById('about');

if (scrollCue && aboutSection) {
  scrollCue.addEventListener('click', () => {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  });
}
