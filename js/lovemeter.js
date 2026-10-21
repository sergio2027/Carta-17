/**
 * MEDIDOR DE AMOR INFINITO — LOVE-O-METER
 *
 * Interacción táctil donde Dania mantiene presionado el botón.
 * El medidor se sobrecarga hasta estallar en un mensaje de amor infinito.
 */

const LoveMeter = (() => {
  let btn, gaugeFill, numEl, feedbackEl;
  let timerId = null;
  let percent = 0;
  let isOverloaded = false;

  function init() {
    btn        = document.getElementById('btn-meter-hold');
    gaugeFill  = document.getElementById('meter-gauge-fill');
    numEl      = document.getElementById('meter-number');
    feedbackEl = document.getElementById('meter-result');

    if (!btn) return;

    btn.addEventListener('mousedown', startMeasuring);
    window.addEventListener('mouseup', stopMeasuring);

    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startMeasuring();
    }, { passive: false });

    window.addEventListener('touchend', stopMeasuring);
  }

  function startMeasuring() {
    if (isOverloaded) return;

    btn.classList.add('is-holding');
    percent = 0;

    const startTime = performance.now();
    const duration = 2400; // ms para sobrecarga total

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Crecimiento exponencial del porcentaje
      if (progress < 0.4) {
        percent = Math.floor(progress * 250);
      } else if (progress < 0.7) {
        percent = Math.floor(progress * 1500);
      } else if (progress < 0.95) {
        percent = Math.floor(progress * 85000);
      } else {
        percent = 999999999;
      }

      if (numEl) numEl.textContent = percent >= 999999 ? '∞%' : `${percent.toLocaleString('es-ES')}%`;
      if (gaugeFill) gaugeFill.style.width = `${progress * 100}%`;

      if (progress >= 1) {
        triggerOverload();
      } else {
        timerId = requestAnimationFrame(step);
      }
    }

    timerId = requestAnimationFrame(step);
  }

  function stopMeasuring() {
    if (isOverloaded) return;

    if (timerId) {
      cancelAnimationFrame(timerId);
      timerId = null;
    }

    btn.classList.remove('is-holding');

    if (percent < 1000) {
      if (gaugeFill) gaugeFill.style.width = '0%';
      if (numEl) numEl.textContent = '0%';
      if (feedbackEl) {
        feedbackEl.className = 'meter-feedback';
        feedbackEl.textContent = '¡Casi mi amor! Mantén presionado un poquito más con tu dedo... 💜';
      }
    }
  }

  function triggerOverload() {
    isOverloaded = true;
    if (timerId) cancelAnimationFrame(timerId);

    btn.classList.remove('is-holding');
    btn.classList.add('is-completed');

    if (numEl) numEl.textContent = 'INFINITO 💜';
    if (gaugeFill) gaugeFill.style.width = '100%';

    const card = document.getElementById('meter-card');
    card?.classList.add('shake-anim');

    if (feedbackEl) {
      feedbackEl.className = 'meter-feedback is-overloaded';
      feedbackEl.innerHTML = `
        <div class="meter-alert-box">
          <span class="meter-alert-badge">🚨 ¡CAPACIDAD SUPERADA! 🚨</span>
          <p class="meter-alert-text">
            <strong>Error 404:</strong> El amor que Sergio siente por Dania es <strong>INFINITO</strong> e incalculable. Ningún sistema de este planeta tiene memoria suficiente para medirlo. 💜✨
          </p>
          <button id="btn-meter-next" class="btn-main" style="margin-top: 1.2rem; font-size: 0.95rem;">
            <span class="btn-inner">Continuar al Frasco de las 17 Razones ✨</span>
            <span class="btn-ring" aria-hidden="true"></span>
          </button>
        </div>
      `;

      document.getElementById('btn-meter-next')?.addEventListener('click', () => {
        document.getElementById('jar-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  return { init };
})();
