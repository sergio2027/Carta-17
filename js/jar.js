/**
 * EL FRASCO DE LAS 17 RAZONES POR LAS QUE TE AMO
 *
 * Muestra un frasco mágico con estrellas flotantes.
 * Al tocarlo, extrae una estrellita y revela una de las 17 razones.
 */

const LoveJar = (() => {
  let discovered = new Set();
  let reasons = [];
  let isAnimating = false;

  function init() {
    reasons = CONFIG.reasons || [];
    if (!reasons.length) return;

    const jarEl = document.getElementById('magic-jar');
    jarEl?.addEventListener('click', pullReason);

    document.getElementById('jar-modal-close')
      ?.addEventListener('click', closeReasonModal);
    document.getElementById('jar-modal-backdrop')
      ?.addEventListener('click', closeReasonModal);

    document.getElementById('btn-jar-to-tree')?.addEventListener('click', () => {
      document.getElementById('tree-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    updateCounter();
  }

  function pullReason() {
    if (isAnimating) return;
    isAnimating = true;

    // Obtener las razones aún no descubiertas
    let available = [];
    reasons.forEach((r, i) => {
      if (!discovered.has(i)) available.push(i);
    });

    // Si ya descubrió todas, reiniciar para que pueda releerlas
    if (available.length === 0) {
      available = reasons.map((_, i) => i);
    }

    const chosenIdx = available[Math.floor(Math.random() * available.length)];
    discovered.add(chosenIdx);

    // Animación de extracción de estrellita
    const starEl = document.getElementById('jar-flying-star');
    if (starEl) {
      starEl.classList.remove('hidden');
      starEl.classList.add('fly-up-anim');

      setTimeout(() => {
        starEl.classList.remove('fly-up-anim');
        starEl.classList.add('hidden');
        showReasonModal(chosenIdx, reasons[chosenIdx]);
        isAnimating = false;
        updateCounter();
      }, 700);
    } else {
      showReasonModal(chosenIdx, reasons[chosenIdx]);
      isAnimating = false;
      updateCounter();
    }
  }

  function showReasonModal(index, text) {
    const modal     = document.getElementById('jar-modal');
    const titleEl   = document.getElementById('jar-modal-title');
    const textEl    = document.getElementById('jar-modal-text');

    if (!modal) return;

    if (titleEl) titleEl.textContent = `Razón Nº ${index + 1} de 17 💜`;
    if (textEl)  textEl.textContent  = `«${text}»`;

    modal.classList.add('modal-open');
    modal.removeAttribute('aria-hidden');
  }

  function closeReasonModal() {
    const modal = document.getElementById('jar-modal');
    modal?.classList.remove('modal-open');
    modal?.setAttribute('aria-hidden', 'true');
  }

  function updateCounter() {
    const counterEl = document.getElementById('jar-counter');
    if (counterEl) {
      const count = Math.min(discovered.size, reasons.length);
      counterEl.textContent = `Has descubierto ${count} de 17 razones 💜`;
    }
  }

  return { init };
})();
