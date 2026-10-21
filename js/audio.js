/**
 * REPRODUCTOR DE AUDIO + DISCO DE VINILO GIRATORIO
 *
 * Características:
 *  - Control táctil en forma de tocadiscos con disco de vinilo que gira al sonar la música.
 *  - Brazo / aguja que se posa sobre el disco al reproducir y se retira al pausar.
 *  - Compatible con políticas de autoplay en iOS y Android (se activa al pulsar «Feliz día mi amor»).
 *  - Fallback a múltiples rutas locales en caso de nombres de archivo alternativos.
 */

const AudioPlayer = (() => {
  let audio = null;
  let playing = false;

  function init() {
    const audioConfig = CONFIG.audio || {};
    const audioSrc = audioConfig.src || "Sound/apocalypse.mp3";

    audio = new Audio();
    audio.src = audioSrc;
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = 'auto';

    // Si falla la primera ruta, probar la alternativa
    audio.addEventListener('error', () => {
      if (audioConfig.fallbackSrc && audio.src !== audioConfig.fallbackSrc) {
        audio.src = audioConfig.fallbackSrc;
        if (playing) {
          audio.play().catch(() => {});
        }
      }
    });

    const vinylBtn = document.getElementById('btn-vinyl');
    vinylBtn?.addEventListener('click', toggle);

    // Configurar título y artista
    const titleEl = document.querySelector('.vinyl-song-title');
    const artistEl = document.querySelector('.vinyl-song-artist');
    if (titleEl && audioConfig.title) titleEl.textContent = audioConfig.title;
    if (artistEl && audioConfig.artist) artistEl.textContent = audioConfig.artist;
  }

  function tryPlay() {
    if (!audio || playing) return;

    audio.play()
      .then(() => {
        setPlayingState(true);
      })
      .catch(() => {
        // En caso de bloqueo por el navegador, se iniciará en el próximo toque
      });
  }

  function toggle() {
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlayingState(false);
    } else {
      audio.play()
        .then(() => {
          setPlayingState(true);
        })
        .catch(() => {
          setPlayingState(false);
        });
    }
  }

  function setPlayingState(isPlaying) {
    playing = isPlaying;

    const vinylBtn     = document.getElementById('btn-vinyl');
    const vinylDisc    = document.getElementById('vinyl-disc');
    const vinylTonearm = document.getElementById('vinyl-tonearm');
    const iconPlay     = document.getElementById('vinyl-icon-play');
    const iconPause    = document.getElementById('vinyl-icon-pause');
    const playerWrap   = document.getElementById('vinyl-player');

    if (vinylBtn) vinylBtn.setAttribute('aria-pressed', String(isPlaying));

    if (isPlaying) {
      vinylDisc?.classList.add('is-spinning');
      vinylDisc?.classList.remove('is-paused');
      vinylTonearm?.classList.add('on-disc');
      iconPlay?.classList.add('hidden');
      iconPause?.classList.remove('hidden');
      playerWrap?.classList.add('is-playing');
    } else {
      vinylDisc?.classList.remove('is-spinning');
      vinylDisc?.classList.add('is-paused');
      vinylTonearm?.classList.remove('on-disc');
      iconPlay?.classList.remove('hidden');
      iconPause?.classList.add('hidden');
      playerWrap?.classList.remove('is-playing');
    }
  }

  return {
    init,
    tryPlay,
    toggle,
  };
})();
