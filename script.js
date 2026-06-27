// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach((item) => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// Fade-in animation for sections as they scroll into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.section').forEach((section) => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(24px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

const style = document.createElement('style');
style.textContent = '.section.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);