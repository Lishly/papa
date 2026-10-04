const loader = document.getElementById('loader');
const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const heartsLayer = document.getElementById('heartsLayer');
const rotatingQuote = document.getElementById('rotatingQuote');

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 650);
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  document.body.classList.toggle('menu-open');
  menuToggle.textContent = navMenu.classList.contains('open') ? '×' : '☰';
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle.textContent = '☰';
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const quotes = [
  "A father's love is a quiet strength that echoes for a lifetime.",
  "The best fathers do not only raise children; they build courage, faith, and character.",
  "A father’s guidance becomes a light that remains even when the road is dark.",
  "Behind every confident child is a father who believed before the world applauded."
];
let quoteIndex = 0;
setInterval(() => {
  rotatingQuote.style.opacity = 0;
  setTimeout(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    rotatingQuote.textContent = quotes[quoteIndex];
    rotatingQuote.style.opacity = 1;
  }, 500);
}, 4300);

function createHeart() {
  const heart = document.createElement('span');
  const size = Math.random() * 18 + 12;
  const duration = Math.random() * 8 + 7;
  const opacity = Math.random() * 0.42 + 0.18;
  const left = Math.random() * 100;
  const drift = (Math.random() * 160 - 80).toFixed(0) + 'px';

  heart.className = 'heart';
  heart.textContent = '❤️';
  heart.style.left = left + 'vw';
  heart.style.fontSize = size + 'px';
  heart.style.opacity = opacity;
  heart.style.animationDuration = duration + 's';
  heart.style.setProperty('--heart-drift', drift);
  heartsLayer.appendChild(heart);

  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(createHeart, 620);
for (let i = 0; i < 9; i++) setTimeout(createHeart, i * 250);

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.addEventListener('error', () => heroVideo.style.display = 'none');
}
