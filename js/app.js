/**
 * COORDINADOR PRINCIPAL + MODAL DE FOTOGRAFÍAS
 */

// ════════════════════════════════════════════════════════════
// MODAL DE FOTOGRAFÍAS
// ════════════════════════════════════════════════════════════
const PhotoModal = (() => {
  function init() {
    document.getElementById('modal-close')
      ?.addEventListener('click', close);
    document.getElementById('modal-backdrop')
      ?.addEventListener('click', close);
    document.getElementById('photo-modal')
      ?.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
      });
  }

  function open(idx) {
    const modal       = document.getElementById('photo-modal');
    const img         = document.getElementById('modal-img');
    const placeholder = document.getElementById('modal-placeholder');
    const phrase      = document.getElementById('modal-phrase');
    if (!modal) return;

    const photo = (CONFIG.photos || [])[idx];
    if (!photo) return;

    if (phrase) {
      phrase.textContent = photo.phrase || '';
    }

    if (img && placeholder) {
      img.src = '';
      img.style.display = 'none';
      placeholder.style.display = 'flex';
      img.alt = photo.alt || 'Recuerdo de Dania y Sergio';

      if (photo.src) {
        const testImg = new Image();
        testImg.onload = () => {
          img.src = photo.src;
          img.style.display = 'block';
          placeholder.style.display = 'none';
        };
        testImg.onerror = () => {
          if (photo.fallbackSrc) {
            const fallbackImg = new Image();
            fallbackImg.onload = () => {
              img.src = photo.fallbackSrc;
              img.style.display = 'block';
              placeholder.style.display = 'none';
            };
            fallbackImg.onerror = () => {
              img.style.display = 'none';
              placeholder.style.display = 'flex';
            };
            fallbackImg.src = photo.fallbackSrc;
          } else {
            img.style.display = 'none';
            placeholder.style.display = 'flex';
          }
        };
        testImg.src = photo.src;
      }
    }

    modal.classList.add('modal-open');
    modal.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-close')?.focus();
  }

  function close() {
    const modal = document.getElementById('photo-modal');
    modal?.classList.remove('modal-open');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  return { init, open, close };
})();

// ════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ════════════════════════════════════════════════════════════
const App = (() => {
  function init() {
    ParticleSystem.init();
    LoveTimer.init();
    LoveQuiz.init();
    LoveMeter.init();
    LoveJar.init();
    LovePromises.init();
    MagicTree.init();
    LetterWriter.init();
    FinaleScene.init();
    PhotoModal.init();
    AudioPlayer.init();

    document.getElementById('btn-enter')
      ?.addEventListener('click', handleEnter);

    document.getElementById('btn-tree-to-letter')?.addEventListener('click', () => {
      document.getElementById('letter-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('btn-letter-to-promises')?.addEventListener('click', () => {
      document.getElementById('promises-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('btn-promises-to-finale')?.addEventListener('click', () => {
      document.getElementById('finale-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function handleEnter() {
    const btn = document.getElementById('btn-enter');
    if (btn) {
      btn.disabled = true;
      btn.style.pointerEvents = 'none';
      btn.style.transform = 'scale(0.96)';
    }

    // Iniciar música automáticamente con el toque
    AudioPlayer.tryPlay();

    // Ráfaga de destellos y avance fluido al cronómetro y al árbol
    ParticleSystem.startDisperse(() => {
      const timerSec = document.getElementById('timer-section');
      if (timerSec) {
        timerSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const tree = document.getElementById('tree-section');
        tree?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
