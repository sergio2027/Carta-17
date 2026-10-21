/**
 * CRONÓMETRO DE AMOR — TIEMPO JUNTOS EN VIVO
 *
 * Calcula con precisión milimétrica el tiempo transcurrido desde:
 * 21 de mayo a las 10:00 PM (22:00:00) hasta el instante actual.
 *
 * Muestra: Días, Horas, Minutos, Segundos y Microsegundos (alta resolución).
 */

const LoveTimer = (() => {
  let elDays, elHours, elMinutes, elSeconds, elMs;
  let targetDate = null;
  let running = false;
  let rafId = null;

  function init() {
    elDays    = document.getElementById('timer-days');
    elHours   = document.getElementById('timer-hours');
    elMinutes = document.getElementById('timer-minutes');
    elSeconds = document.getElementById('timer-seconds');
    elMs      = document.getElementById('timer-ms');

    if (!elDays) return;

    // Fecha configurada o 21 de mayo a las 22:00:00
    const rawDate = CONFIG.startDate || "2025-05-21T22:00:00";
    targetDate = new Date(rawDate);

    // Si la fecha es inválida, fallback
    if (isNaN(targetDate.getTime())) {
      targetDate = new Date(2025, 4, 21, 22, 0, 0); // Mayo es mes 4 en JS (0-indexed)
    }

    start();

    // Pausar si la pestaña no es visible para ahorrar batería
    PageVis.onChange(() => {
      if (PageVis.isHidden()) {
        stop();
      } else {
        start();
      }
    });
  }

  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(update);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  function update() {
    const now = new Date();
    let diff = now.getTime() - targetDate.getTime();

    // Si la diferencia fuera negativa (por ajuste de zona horaria o fecha futura), mostramos 0
    if (diff < 0) diff = 0;

    const MS_IN_SEC  = 1000;
    const MS_IN_MIN  = 60 * MS_IN_SEC;
    const MS_IN_HOUR = 60 * MS_IN_MIN;
    const MS_IN_DAY  = 24 * MS_IN_HOUR;

    const days = Math.floor(diff / MS_IN_DAY);
    diff %= MS_IN_DAY;

    const hours = Math.floor(diff / MS_IN_HOUR);
    diff %= MS_IN_HOUR;

    const minutes = Math.floor(diff / MS_IN_MIN);
    diff %= MS_IN_MIN;

    const seconds = Math.floor(diff / MS_IN_SEC);
    const ms = Math.floor(diff % MS_IN_SEC);

    // Microsegundos de alta resolución usando performance.now()
    const microFrac = Math.floor((performance.now() * 1000) % 1000);
    const combinedMicros = String(ms).padStart(3, '0') + String(microFrac).padStart(3, '0').slice(0, 3);

    if (elDays)    elDays.textContent    = days.toLocaleString('es-ES');
    if (elHours)   elHours.textContent   = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
    if (elMs)      elMs.textContent      = combinedMicros;

    if (running) {
      rafId = requestAnimationFrame(update);
    }
  }

  return { init };
})();
