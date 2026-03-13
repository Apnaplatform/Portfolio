const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

const typedEl = document.getElementById('typed');
const words = [
  'UI Engineering',
  'Creative Frontend',
  'API Integrations',
  'Responsive Design'
];
let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];
  typedEl.textContent = currentWord.slice(0, letterIndex);

  if (!deleting && letterIndex < currentWord.length) {
    letterIndex += 1;
  } else if (deleting && letterIndex > 0) {
    letterIndex -= 1;
  } else {
    deleting = !deleting;
    if (!deleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const speed = deleting ? 60 : 110;
  setTimeout(typeLoop, deleting && letterIndex === 0 ? 500 : speed);
}

typeLoop();

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

const sections = document.querySelectorAll('section');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

const aboutToggles = document.querySelectorAll('.about-toggle');

aboutToggles.forEach((card) => {
  card.addEventListener('click', () => {
    const isOpen = card.getAttribute('aria-expanded') === 'true';
    aboutToggles.forEach((item) => item.setAttribute('aria-expanded', 'false'));
    card.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });
});
