/* ============================================
   THREE-HERO.JS — Three.js Particle Smile Scene
   I-Smile Dental Clinic
   ============================================ */

(function initThreeHero() {
  // Skip on mobile for performance
  if (window.innerWidth <= 768) return;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Check Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded — hero canvas hidden');
    canvas.style.display = 'none';
    const gradient = document.querySelector('.hero-gradient-bg');
    if (gradient) gradient.style.display = 'block';
    return;
  }

  /* ============================
     SCENE SETUP
  ============================ */
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x0D1B2A, 1);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);

  /* ============================
     SMILE ARC PARTICLE POSITIONS
  ============================ */
  function generateSmileArc(count) {
    const positions = [];

    // Smile arc (bottom lip of a smile curve)
    const smileCount = Math.floor(count * 0.55);
    for (let i = 0; i < smileCount; i++) {
      const t = (i / (smileCount - 1)) - 0.5; // -0.5 to 0.5
      const x = t * 5.5;
      // Smile curve: inverted parabola so it curves up at ends
      const y = -0.6 * (x * x) * 0.18 - 0.8;
      const z = (Math.random() - 0.5) * 0.4;
      // Spread particles around the curve
      const spread = 0.12;
      positions.push(
        x + (Math.random() - 0.5) * spread * 2,
        y + (Math.random() - 0.5) * spread,
        z
      );
    }

    // Left cheek curve
    const cheekCount = Math.floor(count * 0.1);
    for (let i = 0; i < cheekCount; i++) {
      const angle = (i / cheekCount) * Math.PI * 0.5 + Math.PI * 1.2;
      const r = 2.6 + (Math.random() - 0.5) * 0.2;
      positions.push(
        Math.cos(angle) * r + (Math.random() - 0.5) * 0.2,
        Math.sin(angle) * r + 0.5 + (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.5
      );
    }

    // Right cheek curve
    for (let i = 0; i < cheekCount; i++) {
      const angle = (i / cheekCount) * Math.PI * 0.5 - Math.PI * 0.2;
      const r = 2.6 + (Math.random() - 0.5) * 0.2;
      positions.push(
        Math.cos(angle) * r + (Math.random() - 0.5) * 0.2,
        Math.sin(angle) * r + 0.5 + (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.5
      );
    }

    // Scattered ambient particles
    const ambientCount = count - smileCount - cheekCount * 2;
    for (let i = 0; i < ambientCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3
      );
    }

    return new Float32Array(positions);
  }

  /* ============================
     PARTICLE SYSTEM
  ============================ */
  const particleCount = 1200;
  const positions = generateSmileArc(particleCount);

  // Velocity for each particle (for gentle drift)
  const velocities = new Float32Array(particleCount * 3);
  const phases = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    velocities[i * 3]     = (Math.random() - 0.5) * 0.001;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    phases[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));

  // Color attribute — mix white and yellow
  const colors = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const isYellow = Math.random() > 0.55;
    if (isYellow) {
      colors[i * 3]     = 244 / 255; // R
      colors[i * 3 + 1] = 208 / 255; // G
      colors[i * 3 + 2] = 63  / 255; // B
    } else {
      const brightness = 0.75 + Math.random() * 0.25;
      colors[i * 3]     = brightness;
      colors[i * 3 + 1] = brightness;
      colors[i * 3 + 2] = brightness;
    }
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Size attribute
  const sizes = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    sizes[i] = Math.random() * 3 + 1.5;
  }
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Particle texture (round glow)
  const particleTexture = createParticleTexture();

  const material = new THREE.PointsMaterial({
    size: 0.08,
    map: particleTexture,
    transparent: true,
    alphaTest: 0.01,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  /* ============================
     PARTICLE GLOW TEXTURE
  ============================ */
  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }

  /* ============================
     AMBIENT LIGHT PARTICLES (larger glow blobs)
  ============================ */
  const glowGeometry = new THREE.BufferGeometry();
  const glowCount = 6;
  const glowPositions = new Float32Array([
    -2.5, 0.5, -1,
     2.5, 0.5, -1,
     0,  -1.2, -0.5,
    -1.5, 1.5, -2,
     1.5, 1.5, -2,
     0,   2,   -2
  ]);
  glowGeometry.setAttribute('position', new THREE.BufferAttribute(glowPositions, 3));

  const glowMaterial = new THREE.PointsMaterial({
    size: 1.8,
    map: particleTexture,
    transparent: true,
    opacity: 0.06,
    color: 0xF4D03F,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const glowSystem = new THREE.Points(glowGeometry, glowMaterial);
  scene.add(glowSystem);

  /* ============================
     MOUSE INTERACTION
  ============================ */
  let mouseX = 0, mouseY = 0;
  let targetRotX = 0, targetRotY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    targetRotY = mouseX * 0.15;
    targetRotX = -mouseY * 0.1;
  }, { passive: true });

  /* ============================
     RESIZE HANDLER
  ============================ */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* ============================
     ANIMATION LOOP
  ============================ */
  const clock = new THREE.Clock();
  const posAttr = geometry.attributes.position;
  const origPositions = positions.slice(); // store original

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Gentle smile particle pulse (sine wave per particle)
    for (let i = 0; i < particleCount; i++) {
      const phase = phases[i];
      const pulse = Math.sin(time * 1.2 + phase) * 0.03;
      posAttr.array[i * 3]     = origPositions[i * 3]     + pulse * 0.5 + velocities[i * 3]     * Math.sin(time + phase);
      posAttr.array[i * 3 + 1] = origPositions[i * 3 + 1] + pulse       + velocities[i * 3 + 1] * Math.cos(time + phase);
      posAttr.array[i * 3 + 2] = origPositions[i * 3 + 2] + pulse * 0.3;
    }
    posAttr.needsUpdate = true;

    // Smooth camera rotation following mouse
    particleSystem.rotation.y += (targetRotY - particleSystem.rotation.y) * 0.04;
    particleSystem.rotation.x += (targetRotX - particleSystem.rotation.x) * 0.04;

    // Slow global rotation
    particleSystem.rotation.y += 0.0005;

    // Glow pulse
    glowMaterial.opacity = 0.05 + Math.sin(time * 0.8) * 0.025;
    glowSystem.rotation.y = particleSystem.rotation.y * 0.3;

    renderer.render(scene, camera);
  }

  animate();

  // Small startup delay to ensure DOM is ready
  setTimeout(() => {
    canvas.style.opacity = '1';
  }, 100);

})();
