/**
 * COFRE DE PROMESAS PARA EL FUTURO — 3 CARTAS SELLADAS
 *
 * Permite a Dania abrir 3 cartas selladas con lacre dedicadas a momentos futuros.
 */

const LovePromises = (() => {
  let promises = [];

  function init() {
    promises = CONFIG.promises || [];
    if (!promises.length) return;

    setupCards();

    document.getElementById('promise-modal-close')
      ?.addEventListener('click', closePromiseModal);
    document.getElementById('promise-modal-backdrop')
      ?.addEventListener('click', closePromiseModal);
  }

  function setupCards() {
    promises.forEach((p, idx) => {
      const card = document.getElementById(`promise-card-${idx + 1}`);
      card?.addEventListener('click', () => openPromise(p, card));
    });
  }

  function openPromise(promiseData, cardEl) {
    cardEl?.classList.add('is-opened');

    const modal   = document.getElementById('promise-modal');
    const titleEl = document.getElementById('promise-modal-title');
    const textEl  = document.getElementById('promise-modal-text');

    if (!modal) return;

    if (titleEl) titleEl.textContent = promiseData.title || '';
    if (textEl)  textEl.textContent  = promiseData.content || '';

    modal.classList.add('modal-open');
    modal.removeAttribute('aria-hidden');
  }

  function closePromiseModal() {
    const modal = document.getElementById('promise-modal');
    modal?.classList.remove('modal-open');
    modal?.setAttribute('aria-hidden', 'true');
  }

  return { init };
})();
