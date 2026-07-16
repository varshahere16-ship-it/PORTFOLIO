// script.js - extracted from original inline script in index.html
(function(){
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Typing effect
  const typingEl = document.getElementById('typingText');
  const phrases = [
    'Aspiring Full Stack Web Developer',
    'MERN Stack Developer',
    'React Developer',
    'Node.js Developer'
  ];

  if (typingEl && !prefersReduced){
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let speed = 45;

    function tick(){
      const current = phrases[phraseIndex];
      if (!deleting){
        typingEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex >= current.length){
          deleting = true;
          speed = 28;
          return setTimeout(tick, 900);
        }
      } else {
        typingEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex <= 0){
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          speed = 45;
          return setTimeout(tick, 450);
        }
      }
      setTimeout(tick, speed);
    }

    typingEl.textContent = '';
    setTimeout(tick, 250);
  } else if (typingEl){
    typingEl.textContent = 'Aspiring Full Stack Web Developer';
  }

  // Scroll reveal using IntersectionObserver
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (!prefersReduced && 'IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      for (const e of entries){
        if (e.isIntersecting){
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.18 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // Active section nav highlight
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const mobileNavLinks = Array.from(document.querySelectorAll('[data-mobile-menu] a[data-navlink]'));
  const sectionIds = ['summary','skills','experience','projects','education','certifications','contact'];

  function setActive(id){
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      const target = href ? href.replace('#','') : '';
      a.removeAttribute('aria-current');
      if (target === id) a.setAttribute('aria-current','page');
    });
    mobileNavLinks.forEach(a => {
      const href = a.getAttribute('href');
      const target = href ? href.replace('#','') : '';
      a.removeAttribute('aria-current');
      if (target === id) a.setAttribute('aria-current','page');
    });
  }

  if ('IntersectionObserver' in window){
    const opts = { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0.01 };
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (e.isIntersecting){
          setActive(e.target.id);
        }
      });
    }, opts);

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  // Hamburger menu
  const hamburger = document.querySelector('[data-hamburger]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (hamburger && mobileMenu){
    function closeMenu(){
      hamburger.setAttribute('aria-expanded','false');
      mobileMenu.hidden = true;
    }
    function toggleMenu(){
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.hidden = expanded;
    }

    hamburger.addEventListener('click', ()=> toggleMenu());
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') closeMenu();
    });
    mobileMenu.addEventListener('click', (e)=>{
      const link = e.target.closest('a');
      if (link) closeMenu();
    });
  }

  // Button ripple / cursor glow
  const glow = document.querySelector('.cursor-glow');
  if (glow && !prefersReduced){
    let raf = null;
    document.addEventListener('mousemove', (e)=>{
      if (raf) return;
      raf = requestAnimationFrame(()=>{
        raf = null;
        glow.style.opacity = 1;
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      });
    }, { passive:true });
    document.addEventListener('mouseleave', ()=>{ glow.style.opacity = 0; });
  }

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('pointermove', (e)=>{
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--x', x + '%');
      btn.style.setProperty('--y', y + '%');
    });
  });

})();

