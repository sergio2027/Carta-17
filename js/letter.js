/**
 * ANIMACIÓN DE ESCRITURA PROGRESIVA — CARTA DE LOS 17 MESES
 */

const LetterWriter = (() => {
  let observed = false;
  let typing = false;
  let done = false;
  let timer = null;

  function init() {
    setupObserver();
    document.getElementById('btn-show-all')
      ?.addEventListener('click', showAll);
  }

  function setupObserver() {
    const section = document.getElementById('letter-section');
    if (!section) return;

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !observed) {
        observed = true;
        obs.disconnect();
        setTimeout(beginTyping, 400);
      }
    }, { threshold: 0.2 });

    obs.observe(section);
  }

  function fullHTML() {
    const { salutation, dedication, paragraphs, closing, signature } = CONFIG.letter;
    let h = `<span class="l-salutation">${salutation}</span>`;
    if (dedication) {
      h += `<span class="l-dedication">${dedication}</span>`;
    }
    paragraphs.forEach(p => {
      h += `<span class="l-para">${p}</span>`;
    });
    h += `<span class="l-closing">${closing}</span>`;
    h += `<span class="l-signature">${signature}</span>`;
    return h;
  }

  function beginTyping() {
    if (typing || done) return;
    if (Utils.prefersReducedMotion()) {
      showAll();
      return;
    }

    typing = true;
    const { salutation, dedication, paragraphs, closing, signature } = CONFIG.letter;

    const parts = [
      { cls: 'l-salutation', text: salutation },
      ...(dedication ? [{ cls: 'l-dedication', text: dedication }] : []),
      ...paragraphs.map(p => ({ cls: 'l-para', text: p })),
      { cls: 'l-closing',   text: closing },
      { cls: 'l-signature', text: signature },
    ];

    const container = document.getElementById('letter-text');
    if (!container) return;
    container.innerHTML = '';

    const cursor = document.createElement('span');
    cursor.id = 'letter-cursor-inline';
    cursor.className = 'letter-cursor-active';
    cursor.textContent = '|';
    cursor.setAttribute('aria-hidden', 'true');

    let partIndex = 0;
    let charIndex = 0;
    let currentElement = null;

    function typeNextChar() {
      if (partIndex >= parts.length) {
        typing = false;
        done = true;
        cursor.remove();
        document.getElementById('btn-show-all')?.classList.add('hidden');
        return;
      }

      const currentPart = parts[partIndex];

      if (charIndex === 0) {
        currentElement = document.createElement('span');
        currentElement.className = currentPart.cls;
        container.appendChild(currentElement);
        currentElement.appendChild(cursor);
      }

      if (charIndex < currentPart.text.length) {
        const char = currentPart.text[charIndex];
        const textNode = document.createTextNode(char);
        currentElement.insertBefore(textNode, cursor);
        charIndex++;

        let delay = 34;
        if (char === '.' || char === '!' || char === '?') {
          delay = 240;
        } else if (char === ',' || char === ';' || char === ':') {
          delay = 140;
        } else if (char === ' ') {
          delay = 26;
        } else {
          delay = Utils.randInt(28, 44);
        }

        timer = setTimeout(typeNextChar, delay);
      } else {
        partIndex++;
        charIndex = 0;
        const pauseBetweenParts = (partIndex <= 2 || partIndex >= parts.length - 2) ? 360 : 260;
        timer = setTimeout(typeNextChar, pauseBetweenParts);
      }
    }

    typeNextChar();
  }

  function showAll() {
    if (timer) clearTimeout(timer);
    typing = false;
    done = true;

    const container = document.getElementById('letter-text');
    const oldCursor = document.getElementById('letter-cursor');
    const inlineCursor = document.getElementById('letter-cursor-inline');
    const btn = document.getElementById('btn-show-all');

    if (container) container.innerHTML = fullHTML();
    oldCursor?.remove();
    inlineCursor?.remove();
    btn?.classList.add('hidden');
  }

  return { init };
})();
