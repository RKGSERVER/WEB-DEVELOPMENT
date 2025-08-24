// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('show');
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.classList.add('show');
  else backToTop.classList.remove('show');
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Fake contact submission (replace with a real endpoint when ready)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
contactForm?.addEventListener('submit', async () => {
  formStatus.textContent = 'Sending...';
  await new Promise(r => setTimeout(r, 800)); // simulate network
  formStatus.textContent = 'Thanks! We will get back to you soon.';
  contactForm.reset();
  setTimeout(() => (formStatus.textContent = ''), 3000);
});
