const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const glow = document.querySelector('.cursor-glow');
const revealElements = document.querySelectorAll('.reveal');
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.project-card');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', current);
  localStorage.setItem('portfolio-theme', current);
  themeToggle.textContent = current === 'dark' ? '☀️' : '🌙';
});

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('is-open');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('is-open'));
});

window.addEventListener('mousemove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => observer.observe(element));

const animateCounters = () => {
  document.querySelectorAll('.count').forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1200;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      counter.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
};

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        countObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);

const statsSection = document.querySelector('.stats-grid');
if (statsSection) countObserver.observe(statsSection);

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((btn) => btn.classList.remove('is-active'));
    tab.classList.add('is-active');
    const filter = tab.dataset.filter;

    cards.forEach((card) => {
      const category = card.dataset.category;
      card.style.display = filter === 'all' || filter === category ? 'block' : 'none';
    });
  });
});
