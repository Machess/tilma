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
