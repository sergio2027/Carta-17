/**
 * JUEGO BONUS — RASCA Y GANA ROMÁNTICO
 *
 * Utiliza Canvas HTML5 con efecto táctil de raspado para celulares y computadoras.
 * Al raspar un porcentaje suficiente, devela el ticket de amor y permite avanzar al árbol.
 */

const ScratchCardGame = (() => {
  let canvas, ctx, W, H;
  let isDrawing = false;
  let isRevealed = false;
  let initialized = false;

  function init() {
    canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;

    if (initialized) return;
    initialized = true;

    setupCanvas();
    setupEvents();
  }

  function setupCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    W = rect.width || 320;
    H = rect.height || 170;

    canvas.width  = W * dpr;
    canvas.height = H * dpr;

    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Rellenar lámina plateada/lila reflectante
    drawFoil();
  }

  function drawFoil() {
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#581c87');
    grad.addColorStop(0.3, '#7e22ce');
    grad.addColorStop(0.6, '#a855f7');
    grad.addColorStop(1, '#4c1d95');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Patrón decorativo de destellos
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 35; i++) {
      const rx = (i * 29) % W;
      const ry = (i * 47) % H;
      ctx.beginPath();
      ctx.arc(rx, ry, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Texto guía sobre la lámina
    ctx.fillStyle = '#f3e8ff';
    ctx.font = 'italic 600 14px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Raspa aquí con tu dedo ✨', W / 2, H / 2);
  }

  function setupEvents() {
    const getPos = (e) => {
      const r = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - r.left,
        y: clientY - r.top
      };
    };

    const startScratch = (e) => {
      if (isRevealed) return;
      isDrawing = true;
      scratchAt(getPos(e));
    };

    const moveScratch = (e) => {
      if (!isDrawing || isRevealed) return;
      scratchAt(getPos(e));
      checkProgress();
    };

    const stopScratch = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mousemove', moveScratch);
    window.addEventListener('mouseup', stopScratch);

    canvas.addEventListener('touchstart', (e) => {
      startScratch(e);
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      moveScratch(e);
      e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchend', stopScratch);

    // Botón para avanzar a la siguiente sorpresa (Medidor de Amor)
    document.getElementById('btn-to-tree')?.addEventListener('click', () => {
      const nextSec = document.getElementById('meter-section') || document.getElementById('tree-section');
      nextSec?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function scratchAt(pos) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkProgress() {
    if (isRevealed) return;

    try {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let clearPixels = 0;
      const totalPixels = data.length / 4;

      // Muestrear cada 16 píxeles para excelente rendimiento
      for (let i = 3; i < data.length; i += 64) {
        if (data[i] === 0) clearPixels++;
      }

      const sampleTotal = totalPixels / 16;
      const pct = (clearPixels / sampleTotal) * 100;

      if (pct > 38) {
        autoReveal();
      }
    } catch (e) {
      // Ignorar si hay restricciones de canvas
    }
  }

  function autoReveal() {
    isRevealed = true;

    canvas.style.transition = 'opacity 0.6s ease';
    canvas.style.opacity = '0';
    setTimeout(() => {
      canvas.style.display = 'none';
    }, 600);

    const btn = document.getElementById('btn-to-tree');
    if (btn) {
      btn.classList.remove('hidden');
      btn.style.animation = 'fadeUp 0.8s ease both';
    }
  }

  return { init };
})();
