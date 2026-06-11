/* ═══════════════════════════════════════════════════
   CHEF ABOD — JavaScript & Three.js 3D Engine
   Animations, Interactions & 3D Scene
   ═══════════════════════════════════════════════════ */

// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('loaded');
  }, 1500);
});

// ===== THREE.JS 3D HERO SCENE =====
(function initThreeScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xc8a97e, 0.3);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xc8a97e, 1.5, 100);
  pointLight1.position.set(20, 20, 20);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xe8d5b5, 1, 80);
  pointLight2.position.set(-20, -15, 15);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0x8b2252, 0.5, 60);
  pointLight3.position.set(0, -20, 10);
  scene.add(pointLight3);

  // Materials
  const goldMaterial = new THREE.MeshPhongMaterial({
    color: 0xc8a97e,
    transparent: true,
    opacity: 0.15,
    wireframe: true,
    shininess: 100
  });

  const goldSolidMaterial = new THREE.MeshPhongMaterial({
    color: 0xc8a97e,
    transparent: true,
    opacity: 0.08,
    shininess: 150,
    specular: 0xe8d5b5
  });

  const burgundyMaterial = new THREE.MeshPhongMaterial({
    color: 0x8b2252,
    transparent: true,
    opacity: 0.1,
    wireframe: true
  });

  // 3D Objects Array
  const objects3D = [];

  // Large Torus (Donut shape - represents food/ring)
  const torusGeo = new THREE.TorusGeometry(5, 1.5, 16, 100);
  const torus = new THREE.Mesh(torusGeo, goldMaterial);
  torus.position.set(-15, 5, -10);
  scene.add(torus);
  objects3D.push({
    mesh: torus,
    rotSpeed: { x: 0.003, y: 0.005, z: 0.002 },
    floatSpeed: 0.8,
    floatAmp: 2,
    baseY: 5
  });

  // Icosahedron (Gemstone-like - represents quality)
  const icoGeo = new THREE.IcosahedronGeometry(3, 0);
  const ico = new THREE.Mesh(icoGeo, goldSolidMaterial);
  ico.position.set(18, -3, -8);
  scene.add(ico);
  objects3D.push({
    mesh: ico,
    rotSpeed: { x: 0.004, y: 0.003, z: 0.005 },
    floatSpeed: 1.2,
    floatAmp: 3,
    baseY: -3
  });

  // Octahedron (Diamond shape - represents elegance)
  const octGeo = new THREE.OctahedronGeometry(2.5, 0);
  const oct = new THREE.Mesh(octGeo, burgundyMaterial);
  oct.position.set(-8, -8, -5);
  scene.add(oct);
  objects3D.push({
    mesh: oct,
    rotSpeed: { x: 0.005, y: 0.004, z: 0.003 },
    floatSpeed: 0.6,
    floatAmp: 1.5,
    baseY: -8
  });

  // Small Torus Knot (Artistic element)
  const knotGeo = new THREE.TorusKnotGeometry(2, 0.5, 100, 16);
  const knot = new THREE.Mesh(knotGeo, goldMaterial);
  knot.position.set(12, 8, -12);
  scene.add(knot);
  objects3D.push({
    mesh: knot,
    rotSpeed: { x: 0.002, y: 0.006, z: 0.003 },
    floatSpeed: 1,
    floatAmp: 2.5,
    baseY: 8
  });

  // Sphere with wireframe
  const sphereGeo = new THREE.SphereGeometry(2, 16, 16);
  const sphere = new THREE.Mesh(sphereGeo, goldMaterial);
  sphere.position.set(-18, -5, -15);
  scene.add(sphere);
  objects3D.push({
    mesh: sphere,
    rotSpeed: { x: 0.002, y: 0.003, z: 0.001 },
    floatSpeed: 0.7,
    floatAmp: 2,
    baseY: -5
  });

  // Ring (represents a plate)
  const ringGeo = new THREE.RingGeometry(3, 4, 32);
  const ringMat = new THREE.MeshPhongMaterial({
    color: 0xc8a97e,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(5, -10, -8);
  scene.add(ring);
  objects3D.push({
    mesh: ring,
    rotSpeed: { x: 0.004, y: 0.002, z: 0.006 },
    floatSpeed: 0.9,
    floatAmp: 1.8,
    baseY: -10
  });

  // Small decorative dodecahedrons
  for (let i = 0; i < 8; i++) {
    const size = Math.random() * 0.8 + 0.3;
    const geo = new THREE.DodecahedronGeometry(size, 0);
    const mat = new THREE.MeshPhongMaterial({
      color: Math.random() > 0.5 ? 0xc8a97e : 0xe8d5b5,
      transparent: true,
      opacity: Math.random() * 0.08 + 0.03,
      wireframe: Math.random() > 0.5
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20 - 10
    );
    scene.add(mesh);
    objects3D.push({
      mesh: mesh,
      rotSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      },
      floatSpeed: Math.random() * 1.5 + 0.3,
      floatAmp: Math.random() * 3 + 0.5,
      baseY: mesh.position.y
    });
  }

  // Particle System
  const particleCount = 200;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
    sizes[i] = Math.random() * 2 + 0.5;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const particleMat = new THREE.PointsMaterial({
    color: 0xc8a97e,
    transparent: true,
    opacity: 0.4,
    size: 0.15,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Mouse interaction
  const mouse = { x: 0, y: 0 };
  document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Animate 3D objects
    objects3D.forEach((obj) => {
      obj.mesh.rotation.x += obj.rotSpeed.x;
      obj.mesh.rotation.y += obj.rotSpeed.y;
      obj.mesh.rotation.z += obj.rotSpeed.z;
      obj.mesh.position.y = obj.baseY + Math.sin(elapsed * obj.floatSpeed) * obj.floatAmp;
    });

    // Animate particles
    particles.rotation.y = elapsed * 0.02;
    particles.rotation.x = Math.sin(elapsed * 0.1) * 0.05;

    // Camera follows mouse slightly
    camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    // Animate lights
    pointLight1.position.x = Math.sin(elapsed * 0.5) * 25;
    pointLight1.position.y = Math.cos(elapsed * 0.3) * 20;
    pointLight2.position.x = Math.cos(elapsed * 0.4) * 20;

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// ===== BACKGROUND FLOATING PARTICLES (CSS-based) =====
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = Math.random() * 15 + 10 + 's';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    container.appendChild(particle);
  }
})();

// ===== CUSTOM CURSOR =====
(function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor || window.innerWidth < 768) return;

  let cursorX = 0, cursorY = 0;
  let clientX = 0, clientY = 0;

  document.addEventListener('mousemove', (e) => {
    clientX = e.clientX;
    clientY = e.clientY;
    cursor.classList.add('visible');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
  });

  // Smooth cursor follow
  function updateCursor() {
    cursorX += (clientX - cursorX) * 0.12;
    cursorY += (clientY - cursorY) * 0.12;
    cursor.style.left = cursorX - 20 + 'px';
    cursor.style.top = cursorY - 20 + 'px';
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Hover effect on interactive elements
  const hoverElements = document.querySelectorAll('a, button, .menu-card, .gallery-item, .exp-card, .testimonial-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
})();

// ===== NAVBAR SCROLL EFFECT =====
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add scrolled class
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlight
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksEl.classList.toggle('open');
    });

    // Close nav on link click
    navLinksEl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksEl.classList.remove('open');
      });
    });
  }
})();

// ===== SCROLL REVEAL ANIMATIONS =====
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
})();

// ===== ANIMATED COUNTER =====
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * target);

          el.textContent = current.toLocaleString() + '+';

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        }

        requestAnimationFrame(updateCount);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
})();

// ===== MENU CATEGORY FILTER =====
(function initMenuFilter() {
  const buttons = document.querySelectorAll('.menu-cat-btn');
  const featuredCards = document.querySelectorAll('#menuFeatured .menu-card');
  const listSections = document.querySelectorAll('.menu-list-section');
  const featuredContainer = document.getElementById('menuFeatured');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      // Filter featured cards
      let anyFeaturedVisible = false;
      featuredCards.forEach(card => {
        const cardCat = card.dataset.category;
        if (category === 'all' || cardCat === category) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          anyFeaturedVisible = true;
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
        }
      });

      // Show/hide featured container
      if (featuredContainer) {
        featuredContainer.style.display = anyFeaturedVisible ? '' : 'none';
      }

      // Filter list sections
      listSections.forEach(section => {
        const sectionCat = section.dataset.category;
        if (category === 'all' || sectionCat === category) {
          section.style.display = '';
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
          section.classList.remove('hidden');
        } else {
          section.style.display = 'none';
          section.style.opacity = '0';
          section.classList.add('hidden');
        }
      });
    });
  });
})();

// ===== 3D TILT EFFECT ON CARDS =====
(function initTiltEffect() {
  const cards = document.querySelectorAll('.menu-card, .exp-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
})();

// ===== LIGHTBOX =====
function openLightbox(element) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const img = element.querySelector('img');

  if (img && lightbox) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== CONTACT FORM =====
function handleFormSubmit(event) {
  event.preventDefault();

  const btn = event.target.querySelector('.form-submit');
  const originalText = btn.textContent;
  btn.textContent = '✅ تم الإرسال بنجاح!';
  btn.style.background = 'linear-gradient(135deg, #2d8b57, #45c47a)';

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    event.target.reset();
  }, 3000);
}

// ===== PARALLAX ON SCROLL =====
(function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg-image img');
  const floatingElements = document.querySelectorAll('.float-item');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    if (scrollY < heroHeight) {
      const progress = scrollY / heroHeight;

      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - progress * 1.2;
      }

      if (heroBg) {
        heroBg.style.transform = `scale(${1 + progress * 0.1}) translateY(${scrollY * 0.15}px)`;
      }

      floatingElements.forEach((el, i) => {
        const speed = 0.05 + (i * 0.02);
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }
  });
})();

// ===== MAGNETIC BUTTON EFFECT =====
(function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

// ===== TEXT ANIMATION ON HERO =====
(function initTextAnimation() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  // Add subtle glow animation to hero text
  setInterval(() => {
    const glowIntensity = Math.sin(Date.now() / 2000) * 0.3 + 0.7;
    heroTitle.style.filter = `drop-shadow(0 0 ${20 * glowIntensity}px rgba(200, 169, 126, ${0.15 * glowIntensity}))`;
  }, 50);
})();

// ===== STAGGER ANIMATION ON PAGE LOAD =====
(function initStaggerAnimation() {
  const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-buttons');

  heroElements.forEach((el, i) => {
    el.style.animationDelay = `${0.3 + i * 0.2}s`;
  });
})();

console.log('%c🍳 Chef Abod Website Loaded Successfully!', 'color: #c8a97e; font-size: 18px; font-weight: bold; background: #0a0a0a; padding: 10px 20px; border-radius: 8px;');
console.log('%c✨ Built with passion and creativity', 'color: #a09888; font-size: 12px;');
