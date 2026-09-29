// ===== PARTICLE NETWORK =====
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

function initParticles() {
  particles = [];
  const count = Math.floor((W * H) / 12000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#8A2BE2' : '#00E5D4'
    });
  }
}
initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, W, H);

  // draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(138,43,226,${0.18 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // draw nodes
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur  = 6;
    ctx.fill();
    ctx.shadowBlur  = 0;

    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== TYPEWRITER =====
const roles = [
  'Computer Science Engineering Student',
  'Backend Developer',
  'ML Enthusiast',
  'Cloud & DevOps Engineer',
  'Problem Solver'
];
let rIdx = 0, cIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const cur = roles[rIdx];
  typeEl.textContent = deleting ? cur.slice(0, --cIdx) : cur.slice(0, ++cIdx);
  if (!deleting && cIdx === cur.length) { deleting = true; setTimeout(typeWriter, 1800); return; }
  if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  setTimeout(typeWriter, deleting ? 45 : 80);
}
typeWriter();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 30px rgba(0,0,0,0.5)' : 'none';
});

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== SCROLL FADE-IN =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity   = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.project-card, .skill-group, .stat-card, .timeline-card, .edu-card, .contact-card'
).forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});
