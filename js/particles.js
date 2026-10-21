/**
 * SISTEMA DE PARTÍCULAS + CORAZONES LILAS LUMINOSOS
 * Generado con Canvas para máximo rendimiento y fluidez en móviles.
 *
 * Características:
 *  - Destellos ambientales flotantes en tonos violeta, lila y plata.
 *  - Múltiples corazones lilas formados progresivamente por destellos que se reúnen.
 *  - Los corazones flotan suavemente, pulsan y respiran con resplandor difuso.
 *  - Al pulsar «Feliz día mi amor», intensifican su brillo al máximo y se dispersan
 *    como estrellas fugaces y destellos resplandecientes.
 */

const ParticleSystem = (() => {
  let canvas, ctx;
  let W, H, DPR;
  let ambientParticles = [];
  let heartParticles = [];
  let hearts = [];
  let raf, running = false;
  let phase = 'living'; // 'living' | 'flare' | 'disperse' | 'done'
  let flareStart = 0;
  let disperseStart = 0;
  let onDoneCb = null;

  // Fórmula paramétrica de corazón
  function heartPt(t, cx, cy, sz) {
    return {
      x: cx + sz * 16 * Math.pow(Math.sin(t), 3),
      y: cy - sz * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    };
  }

  function getHeartConfigurations() {
    const isMobile = W < 600;
    if (isMobile) {
      return [
        { cx: W * 0.22, cy: H * 0.22, sz: W * 0.0075, speed: 1.6, phaseOffset: 0,   alpha: 0.85 },
        { cx: W * 0.78, cy: H * 0.26, sz: W * 0.0062, speed: 1.3, phaseOffset: 1.8, alpha: 0.80 },
        { cx: W * 0.50, cy: H * 0.74, sz: W * 0.0095, speed: 1.8, phaseOffset: 3.2, alpha: 0.90 },
      ];
    }
    return [
      { cx: W * 0.18, cy: H * 0.24, sz: W * 0.0065, speed: 1.5, phaseOffset: 0,   alpha: 0.85 },
      { cx: W * 0.82, cy: H * 0.28, sz: W * 0.0055, speed: 1.2, phaseOffset: 1.5, alpha: 0.80 },
      { cx: W * 0.50, cy: H * 0.72, sz: W * 0.0080, speed: 1.7, phaseOffset: 2.8, alpha: 0.90 },
      { cx: W * 0.14, cy: H * 0.70, sz: W * 0.0045, speed: 1.4, phaseOffset: 4.1, alpha: 0.75 },
      { cx: W * 0.86, cy: H * 0.70, sz: W * 0.0048, speed: 1.3, phaseOffset: 5.2, alpha: 0.75 },
    ];
  }

  function createAmbientParticle() {
    return {
      x: Utils.rand(0, W),
      y: Utils.rand(0, H),
      vx: Utils.rand(-0.25, 0.25),
      vy: Utils.rand(-0.45, -0.1),
      r: Utils.rand(1, 2.6),
      op: Utils.rand(0.2, 0.7),
      baseOp: Utils.rand(0.2, 0.7),
      hue: Utils.rand(265, 310),
      twinkleSpeed: Utils.rand(0.0015, 0.0035),
      seed: Math.random() * 100,
      evx: 0,
      evy: 0,
    };
  }

  function createHeartParticle(targetX, targetY, heartIndex, heartConfig) {
    const spawnDist = Utils.rand(80, 220);
    const spawnAngle = Math.random() * Math.PI * 2;
    return {
      x: targetX + Math.cos(spawnAngle) * spawnDist,
      y: targetY + Math.sin(spawnAngle) * spawnDist,
      startX: targetX + Math.cos(spawnAngle) * spawnDist,
      startY: targetY + Math.sin(spawnAngle) * spawnDist,
      targetX,
      targetY,
      targetRelX: targetX - heartConfig.cx,
      targetRelY: targetY - heartConfig.cy,
      heartIndex,
      progress: 0,
      formSpeed: Utils.rand(0.008, 0.016),
      r: Utils.rand(1.2, 2.8),
      op: 0,
      targetOp: Utils.rand(0.7, 0.98),
      hue: Utils.rand(270, 318),
      evx: 0,
      evy: 0,
    };
  }

  function init() {
    canvas = document.getElementById('canvas-particles');
    if (!canvas) return;

    DPR = Math.min(window.devicePixelRatio || 1, 2);
    ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize);

    setupScene();

    PageVis.onChange(() => {
      if (PageVis.isHidden()) {
        cancelAnimationFrame(raf);
        running = false;
      } else if (phase !== 'done') {
        startLoop();
      }
    });

    startLoop();
  }

  function setupScene() {
    ambientParticles = [];
    heartParticles = [];
    hearts = [];

    const tier = Utils.getPerformanceTier();
    const ambCount = tier === 'high' ? 85 : tier === 'medium' ? 55 : 35;
    for (let i = 0; i < ambCount; i++) {
      ambientParticles.push(createAmbientParticle());
    }

    const configs = getHeartConfigurations();
    hearts = configs.map(cfg => ({
      ...cfg,
      currentY: cfg.cy,
      glow: 0,
    }));

    const ptsPerHeart = tier === 'high' ? 38 : tier === 'medium' ? 28 : 20;

    hearts.forEach((h, hIdx) => {
      for (let i = 0; i < ptsPerHeart; i++) {
        const t = (i / ptsPerHeart) * Math.PI * 2;
        const pt = heartPt(t, h.cx, h.cy, h.sz);
        heartParticles.push(createHeartParticle(pt.x, pt.y, hIdx, h));
      }
    });
  }

  function resize() {
    if (!canvas) return;
    const p = canvas.parentElement;
    W = p.clientWidth;
    H = p.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // Si todavía estamos en living, reajustamos suavemente
    if (phase === 'living') {
      const configs = getHeartConfigurations();
      hearts.forEach((h, idx) => {
        if (configs[idx]) {
          h.cx = configs[idx].cx;
          h.cy = configs[idx].cy;
          h.sz = configs[idx].sz;
        }
      });
    }
  }

  function startLoop() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(tick);
  }

  // ─── Bucle de animación ──────────────────────────────────
  function tick(now) {
    ctx.clearRect(0, 0, W, H);

    if (phase === 'living') {
      tickLiving(now);
    } else if (phase === 'flare') {
      tickFlare(now);
    } else if (phase === 'disperse') {
      tickDisperse(now);
    }

    if (running) raf = requestAnimationFrame(tick);
  }

  // ─── Fase 1: Vida normal (formación progresiva, flotación, pulso) ──
  function tickLiving(now) {
    const time = now * 0.001;

    // Actualizar movimiento de corazones (flotación vertical suave)
    hearts.forEach((h, idx) => {
      const floatY = Math.sin(time * h.speed + h.phaseOffset) * 9;
      h.currentY = h.cy + floatY;
      h.glow = 0.5 + 0.5 * Math.sin(time * (h.speed * 1.3) + h.phaseOffset);
    });

    // 1. Destellos ambientales
    ambientParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.op = p.baseOp + Math.sin(time * 2 + p.seed) * 0.25;
      p.op = Utils.clamp(p.op, 0.1, 0.85);

      if (p.y < -10) p.y = H + 10;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 82%, 78%, ${p.op})`;
      ctx.fill();
    });

    // 2. Dibujar aura de cada corazón
    hearts.forEach(h => {
      drawHeartAura(h.cx, h.currentY, h.sz * 1.15, h.alpha * (0.16 + h.glow * 0.14));
    });

    // 3. Partículas que forman los corazones
    heartParticles.forEach(p => {
      const h = hearts[p.heartIndex];
      if (!h) return;

      // Formación progresiva inicial (reunión de destellos)
      if (p.progress < 1) {
        p.progress = Math.min(1, p.progress + p.formSpeed);
        const ease = Utils.easeOutCubic(p.progress);
        p.x = Utils.lerp(p.startX, h.cx + p.targetRelX, ease);
        p.y = Utils.lerp(p.startY, h.currentY + p.targetRelY, ease);
        p.op = Utils.lerp(0, p.targetOp, ease);
      } else {
        // Una vez formado, acompaña la flotación suave y ligera vibración de destello
        p.x = h.cx + p.targetRelX + Math.sin(time * 3 + p.targetRelX) * 0.8;
        p.y = h.currentY + p.targetRelY + Math.cos(time * 3 + p.targetRelY) * 0.8;
        p.op = p.targetOp * (0.75 + 0.25 * Math.sin(time * 4 + p.targetRelX * 0.1));
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 86%, 82%, ${p.op})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `hsla(${p.hue}, 86%, 75%, 0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  function drawHeartAura(cx, cy, sz, alpha) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.filter = 'blur(12px)';
    ctx.beginPath();
    const steps = 48;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const pt = heartPt(t, cx, cy, sz);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();
    ctx.fillStyle = '#c084fc';
    ctx.fill();
    ctx.restore();
  }

  // ─── Fase 2: Intensificación al pulsar «Feliz día mi amor» ──
  function startDisperse(onDone) {
    onDoneCb = onDone;
    phase = 'flare';
    flareStart = performance.now();
  }

  function tickFlare(now) {
    const elapsed = now - flareStart;
    const flareDuration = 380; // ms de destello intenso
    const norm = Utils.clamp(elapsed / flareDuration, 0, 1);

    // Brillo en explosión (blanco / lila luminoso)
    const flareScale = 1 + norm * 0.35;
    const flareAlpha = 0.35 + norm * 0.55;

    hearts.forEach(h => {
      drawHeartAura(h.cx, h.currentY, h.sz * flareScale, flareAlpha);
    });

    heartParticles.forEach(p => {
      const h = hearts[p.heartIndex];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (1 + norm * 1.5), 0, Math.PI * 2);
      ctx.fillStyle = norm > 0.6 ? '#ffffff' : '#f3e8ff';
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#c084fc';
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    if (norm >= 1) {
      beginDisperseExplosion();
    }
  }

  // ─── Fase 3: Dispersión como pequeñas estrellas ──────────
  function beginDisperseExplosion() {
    phase = 'disperse';
    disperseStart = performance.now();

    // Asignar velocidades de estrella fugaz hacia afuera
    heartParticles.forEach(p => {
      const h = hearts[p.heartIndex];
      const ang = Math.atan2(p.y - h.currentY, p.x - h.cx) + Utils.rand(-0.4, 0.4);
      const speed = Utils.rand(4, 11);
      p.evx = Math.cos(ang) * speed;
      p.evy = Math.sin(ang) * speed - Utils.rand(1, 4); // impulso hacia arriba
      p.decay = Utils.rand(0.012, 0.024);
      p.trail = [];
    });

    ambientParticles.forEach(p => {
      p.evx = Utils.rand(-5, 5);
      p.evy = Utils.rand(-7, 2);
      p.decay = Utils.rand(0.014, 0.026);
    });

    if (onDoneCb) {
      setTimeout(onDoneCb, 650);
    }
  }

  function tickDisperse(now) {
    let alive = false;

    // Dibujar estrellas de corazón dispersándose con estela
    heartParticles.forEach(p => {
      if (p.op <= 0) return;
      alive = true;

      p.x += p.evx;
      p.y += p.evy;
      p.evx *= 0.96;
      p.evy += 0.12; // gravedad suave
      p.op -= p.decay;

      // Estela de destello
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.6, p.r * (p.op / p.targetOp)), 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 90%, 82%, ${Math.max(0, p.op)})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsla(${p.hue}, 90%, 75%, 0.7)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ambientParticles.forEach(p => {
      if (p.op <= 0) return;
      alive = true;
      p.x += p.evx;
      p.y += p.evy;
      p.op -= p.decay;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 78%, ${Math.max(0, p.op)})`;
      ctx.fill();
    });

    if (!alive) {
      running = false;
      phase = 'done';
    }
  }

  return {
    init,
    startDisperse,
  };
})();
