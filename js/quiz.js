/**
 * JUEGO DE TRIVIA — ¿CUÁNTO NOS CONOCEMOS?
 *
 * Presenta 4 preguntas románticas con retroalimentación instantánea,
 * barra de progreso y transición fluida al juego bonus de Rasca y Gana.
 */

const LoveQuiz = (() => {
  let currentIndex = 0;
  let questions = [];
  let isAnswered = false;

  function init() {
    questions = CONFIG.quiz || [];
    if (!questions.length) return;

    renderQuestion(0);
  }

  function renderQuestion(index) {
    currentIndex = index;
    isAnswered = false;

    const q = questions[index];
    if (!q) {
      showCompletion();
      return;
    }

    const counterEl = document.getElementById('quiz-counter');
    const questionEl = document.getElementById('quiz-question-text');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const progressEl = document.getElementById('quiz-progress-bar');

    if (counterEl) counterEl.textContent = `Pregunta ${index + 1} de ${questions.length}`;
    if (progressEl) {
      const pct = ((index) / questions.length) * 100;
      progressEl.style.width = `${pct}%`;
    }
    if (questionEl) questionEl.textContent = q.question;

    if (feedbackEl) {
      feedbackEl.className = 'quiz-feedback hidden';
      feedbackEl.textContent = '';
    }

    if (optionsEl) {
      optionsEl.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((opt, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.type = 'button';
        btn.setAttribute('aria-label', `Opción ${letters[optIdx]}: ${opt.text}`);

        btn.innerHTML = `
          <span class="opt-letter">${letters[optIdx]}</span>
          <span class="opt-text">${opt.text}</span>
        `;

        btn.addEventListener('click', () => handleSelect(opt, btn, q));
        optionsEl.appendChild(btn);
      });
    }
  }

  function handleSelect(opt, btn, q) {
    if (isAnswered) return;

    const feedbackEl = document.getElementById('quiz-feedback');

    if (opt.correct) {
      isAnswered = true;
      btn.classList.add('is-correct');

      if (feedbackEl) {
        feedbackEl.className = 'quiz-feedback is-correct';
        feedbackEl.textContent = q.comment || '¡Correcto mi amor! 🥰💜';
      }

      // Avanzar a la siguiente tras una pausa emotiva
      setTimeout(() => {
        if (currentIndex + 1 < questions.length) {
          renderQuestion(currentIndex + 1);
        } else {
          showCompletion();
        }
      }, 1600);

    } else {
      btn.classList.add('is-wrong');
      btn.classList.add('shake-anim');

      if (feedbackEl) {
        feedbackEl.className = 'quiz-feedback is-wrong';
        feedbackEl.textContent = '¡Casi mi amor! Haz memoria, inténtalo de nuevo 😉💜';
      }

      setTimeout(() => {
        btn.classList.remove('shake-anim');
      }, 500);
    }
  }

  function showCompletion() {
    const cardEl = document.getElementById('quiz-card-content');
    const progressEl = document.getElementById('quiz-progress-bar');
    if (progressEl) progressEl.style.width = '100%';

    if (cardEl) {
      cardEl.innerHTML = `
        <div class="quiz-completed-box">
          <span class="quiz-trophy-icon">🏆💜</span>
          <h3 class="quiz-complete-title">¡Nos conocemos como nadie en el mundo!</h3>
          <p class="quiz-complete-sub">Acertaste todas las preguntas sobre nuestra historia, mi Dania hermosa.</p>
          <button id="btn-unlock-scratch" class="btn-main" style="margin-top: 1.2rem;">
            <span class="btn-inner">Descubrir mi sorpresa 🎁</span>
            <span class="btn-ring" aria-hidden="true"></span>
          </button>
        </div>
      `;

      document.getElementById('btn-unlock-scratch')?.addEventListener('click', () => {
        const scratchSection = document.getElementById('scratch-section');
        if (scratchSection) {
          scratchSection.classList.remove('hidden');
          scratchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          ScratchCardGame.init();
        }
      });
    }
  }

  return { init };
})();
