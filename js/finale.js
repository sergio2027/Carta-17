/**
 * ESCENA FINAL Y SORPRESA
 *
 * Incluye:
 *  - Corazones lilas flotantes y destellos activos desde que entra en vista.
 *  - Botón «Mil veces, contigo 💜» que detona una ráfaga ascendente de corazones brillantes.
 *  - Revelación del mensaje romántico definitivo.
 *  - Sobre interactivo de SVG puro con animación de apertura en 3D y posdata deslizable.
 */

const FinaleScene = (() => {
  let canvas, ctx, W, H, DPR;
  let hearts = [];
  let sparkles = [];
  let raf, running = false;
  let phase = 'ambient'; // 'ambient' | 'burst' | 'celebration'
  let observed = false;

  function heartPoint(t, cx, cy, sz) {
    return {
      x: cx + sz * 16 * Math.pow(Math.sin(t), 3),
      y: cy - sz * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    };
  }

  function createHeart(isBurst = false) {
    return {
      x: isBurst ? W / 2 + Utils.rand(-W * 0.28, W * 0.28) : Utils.rand(W * 0.08, W * 0.92),
      y: isBurst ? H * 0.65 + Utils.rand(-20, 40) : Utils.rand(H * 0.15, H * 0.95),
      vy: isBurst ? Utils.rand(-5.5, -2.0) : Utils.rand(-1.2, -0.4),
      vx: isBurst ? Utils.rand(-3.2, 3.2) : Utils.rand(-0.4, 0.4),
      sz: Utils.rand(0.0035, isBurst ? 0.0095 : 0.0075) * W,
      op: 0,
      maxOp: Utils.rand(0.55, 0.95),
      hue: Utils.rand(268, 322),
      rot: Utils.rand(-0.2, 0.2),
      rotSpeed: Utils.rand(-0.015, 0.015),
      life: 0,
      maxLife: isBurst ? Utils.rand(90, 160) : Utils.rand(140, 260),
    };
  }

  function createSparkle(x, y) {
    return {
      x: x + Utils.rand(-15, 15),
      y: y + Utils.rand(-15, 15),
      vx: Utils.rand(-1.8, 1.8),
      vy: Utils.rand(-2.4, -0.6),
      r: Utils.rand(1, 2.4),
      op: 1,
      decay: Utils.rand(0.02, 0.04),
      hue: Utils.rand(270, 315)
    };
  }

  function init() {
    canvas = document.getElementById('finale-canvas');
    if (!canvas) return;

    DPR = Math.min(window.devicePixelRatio || 1, 2);
    ctx = canvas.getContext('2d');

    setupObserver();
    setupButton();
    setupEnvelope();
    window.addEventListener('resize', handleResize);
  }

  function handleResize() {
    if (!canvas) return;
    const p = canvas.parentElement;
    W = p.clientWidth;
    H = p.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function setupObserver() {
    const section = document.getElementById('finale-section');
    if (!section) return;

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !observed) {
        observed = true;
        handleResize();
        // Poblar corazones ambientales iniciales
        for (let i = 0; i < 14; i++) {
          hearts.push(createHeart(false));
        }
        startLoop();
      }
    }, { threshold: 0.15 });

    obs.observe(section);
  }

  function startLoop() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(tick);
  }

  function setupButton() {
    const btn = document.getElementById('btn-yes');
    btn?.addEventListener('click', triggerCelebration);
  }

  function triggerCelebration() {
    handleResize();
    const btn = document.getElementById('btn-yes');
    if (btn) {
      btn.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      btn.style.opacity = '0';
      btn.style.transform = 'scale(0.85)';
      setTimeout(() => btn.classList.add('hidden'), 400);
    }

    phase = 'burst';

    // Ráfaga masiva de corazones lilas en abanico
    for (let i = 0; i < 36; i++) {
      hearts.push(createHeart(true));
    }

    // Revelar el mensaje y el sobre
    setTimeout(() => {
      const reveal = document.getElementById('finale-reveal');
      if (reveal) {
        reveal.classList.add('fin-visible');
        reveal.removeAttribute('aria-hidden');
      }
      phase = 'celebration';
    }, 450);
  }

  function setupEnvelope() {
    const wrapper = document.getElementById('envelope-wrapper');
    const postdataReveal = document.getElementById('postdata-reveal');
    const postdataText = document.getElementById('postdata-text');

    if (postdataText) {
      postdataText.textContent = CONFIG.postdata || '';
    }

    const toggleOpen = () => {
      const isOpen = wrapper.classList.toggle('env-opened');
      wrapper.setAttribute('aria-expanded', String(isOpen));
      postdataReveal?.classList.toggle('pd-visible', isOpen);

      // Lanzar destellos desde el sobre
      if (isOpen) {
        const rect = wrapper.getBoundingClientRect();
        const pRect = canvas.parentElement.getBoundingClientRect();
        const centerX = rect.left - pRect.left + rect.width / 2;
        const centerY = rect.top - pRect.top + rect.height / 2;

        for (let i = 0; i < 22; i++) {
          sparkles.push(createSparkle(centerX, centerY));
        }
        for (let i = 0; i < 6; i++) {
          const h = createHeart(true);
          h.x = centerX + Utils.rand(-20, 20);
          h.y = centerY;
          h.vy = Utils.rand(-4, -1.5);
          hearts.push(h);
        }
      }
    };

    wrapper?.addEventListener('click', toggleOpen);
    wrapper?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleOpen();
      }
    });
  }

  // ─── Bucle de renderizado ────────────────────────────────
  function tick() {
    ctx.clearRect(0, 0, W, H);

    // Reponer corazones flotantes
    const maxActive = phase === 'celebration' ? 24 : 12;
    if (hearts.length < maxActive && Math.random() < 0.12) {
      hearts.push(createHeart(false));
    }

    // Actualizar y dibujar corazones
    hearts = hearts.filter(h => {
      h.life++;
      h.x += h.vx;
      h.y += h.vy;
      h.rot += h.rotSpeed;

      if (h.life < 25) {
        h.op = Math.min(h.maxOp, h.op + 0.05);
      } else if (h.life > h.maxLife - 30) {
        h.op = Math.max(0, h.op - 0.035);
      }

      if (h.op <= 0 || h.y < -30) return false;

      drawCanvasHeart(h);
      return true;
    });

    // Destellos del sobre
    sparkles = sparkles.filter(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.op -= s.decay;
      if (s.op <= 0) return false;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue}, 90%, 82%, ${s.op})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#c084fc';
      ctx.fill();
      ctx.shadowBlur = 0;
      return true;
    });

    if (running) raf = requestAnimationFrame(tick);
  }

  function drawCanvasHeart(h) {
    ctx.save();
    ctx.translate(h.x, h.y);
    ctx.rotate(h.rot);
    ctx.globalAlpha = h.op;

    ctx.shadowBlur = 12;
    ctx.shadowColor = `hsla(${h.hue}, 80%, 72%, 0.8)`;

    ctx.beginPath();
    const steps = 36;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const pt = heartPoint(t, 0, 0, h.sz);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();
    ctx.fillStyle = `hsl(${h.hue}, 76%, 74%)`;
    ctx.fill();
    ctx.restore();
  }

  return { init };
})();
