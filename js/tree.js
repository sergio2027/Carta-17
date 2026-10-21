/**
 * ÁRBOL MÁGICO SVG ANIMADO
 *
 * Secuencia cinematográfica de 6 etapas:
 *   1. Se encienden pequeñas luces en el suelo.
 *   2. Las raíces y el tronco se dibujan progresivamente.
 *   3. Las ramas crecen con animaciones orgánicas SVG.
 *   4. Las flores comienzan a brotar.
 *   5. Las flores lilas se iluminan con resplandor.
 *   6. Las flores revelan los elegantes marcos con las fotos de la pareja.
 */

const MagicTree = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  let observed = false;

  // ── Posiciones de flores con marco de fotografía ─────────
  // Distribuidas armoniosamente en los extremos de las ramas
  const PHOTO_FLOWERS = [
    { x: 74,  y: 300, idx: 0 },
    { x: 282, y: 290, idx: 1 },
    { x: 62,  y: 382, idx: 2 },
    { x: 298, y: 375, idx: 3 },
    { x: 92,  y: 222, idx: 4 },
    { x: 270, y: 230, idx: 5 },
  ];

  // ── Flores decorativas complementarias ───────────────────
  const DECO_FLOWERS = [
    { x: 104, y: 280 },
    { x: 242, y: 274 },
    { x: 172, y: 246 },
    { x: 152, y: 335 },
    { x: 212, y: 328 },
    { x: 176, y: 308 },
    { x: 132, y: 366 },
    { x: 228, y: 360 },
  ];

  // ── Puntos de luz en ramas ────────────────────────────────
  const BRANCH_LIGHTS = [
    { x: 148, y: 436 }, { x: 203, y: 432 }, { x: 118, y: 372 },
    { x: 237, y: 367 }, { x: 138, y: 302 }, { x: 224, y: 296 },
    { x: 153, y: 278 }, { x: 201, y: 273 }, { x: 130, y: 258 },
    { x: 220, y: 252 }, { x: 175, y: 340 }, { x: 165, y: 385 },
  ];

  // ── Luces de suelo (raíces y musgo brillante) ─────────────
  const GROUND_LIGHTS = [
    { x: 80,  y: 532 }, { x: 110, y: 526 }, { x: 140, y: 516 },
    { x: 168, y: 518 }, { x: 192, y: 518 }, { x: 220, y: 516 },
    { x: 250, y: 526 }, { x: 280, y: 532 },
  ];

  // ─── Inicialización con IntersectionObserver ─────────────
  function init() {
    const section = document.getElementById('tree-section');
    if (!section) return;

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !observed) {
        observed = true;
        obs.disconnect();
        setTimeout(runSequence, 280);
      }
    }, { threshold: 0.15 });

    obs.observe(section);
  }

  function runSequence() {
    if (Utils.prefersReducedMotion()) {
      showAllInstant();
      return;
    }

    // Etapa 1: Luces en el suelo
    showGroundLights(() => {
      // Etapa 2 y 3: Raíces, tronco y ramas
      drawRootsAndBranches(() => {
        // Etapa 4: Flores brotan
        bloomFlowers(() => {
          // Etapa 5 y 6: Flores lilas se iluminan y revelan fotos
          illuminateAndRevealPhotos();
        });
      });
    });
  }

  // ─── Etapa 1: Luces del suelo ────────────────────────────
  function showGroundLights(cb) {
    const groundEl = document.querySelector('#tree-ground ellipse');
    if (groundEl) {
      groundEl.style.transition = 'opacity 1s ease';
      requestAnimationFrame(() => { groundEl.style.opacity = '0.85'; });
    }

    const container = document.getElementById('tree-lights');
    if (!container) { setTimeout(cb, 700); return; }

    GROUND_LIGHTS.forEach((pos, i) => {
      setTimeout(() => {
        const c = makeSVGEl('circle', {
          cx: pos.x, cy: pos.y, r: 2.2,
          fill: '#c084fc', opacity: 0
        });
        c.style.transition = 'opacity 0.6s ease';
        container.appendChild(c);
        requestAnimationFrame(() => {
          c.style.opacity = '0.9';
          startTwinkle(c, 1.4 + Math.random() * 0.9, Math.random());
        });
      }, i * 75);
    });

    setTimeout(cb, 750);
  }

  // ─── Etapa 2 y 3: Raíces, Tronco y Ramas ──────────────────
  function drawRootsAndBranches(cb) {
    const pathsConf = [
      // Raíces (crecen primero)
      { id: 'root-l',       delay: 0,    dur: 520 },
      { id: 'root-r',       delay: 50,   dur: 520 },
      { id: 'root-c',       delay: 80,   dur: 460 },
      // Tronco asciende
      { id: 'trunk',        delay: 220,  dur: 850 },
      // Ramas bajas
      { id: 'branch-l2',    delay: 800,  dur: 600 },
      { id: 'branch-r2',    delay: 880,  dur: 600 },
      // Ramas medias
      { id: 'branch-l1',    delay: 1100, dur: 580 },
      { id: 'branch-r1',    delay: 1180, dur: 580 },
      { id: 'branch-l1a',   delay: 1400, dur: 450 },
      { id: 'branch-r1a',   delay: 1460, dur: 450 },
      // Ramas superiores
      { id: 'branch-top-l', delay: 1560, dur: 540 },
      { id: 'branch-top-r', delay: 1620, dur: 540 },
      { id: 'branch-top-c', delay: 1680, dur: 420 },
    ];

    let maxEnd = 0;
    pathsConf.forEach(({ id, delay, dur }) => {
      const el = document.getElementById(id);
      if (!el) return;

      let len = 600;
      try { len = el.getTotalLength() || 600; } catch (e) {}

      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;

      maxEnd = Math.max(maxEnd, delay + dur);

      setTimeout(() => {
        el.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        el.style.strokeDashoffset = '0';
      }, delay);
    });

    // Puntos de luz brotan en las ramas conforme crecen
    setTimeout(() => addBranchLights(), 900);
    setTimeout(cb, maxEnd + 200);
  }

  function addBranchLights() {
    const container = document.getElementById('tree-lights');
    if (!container) return;

    BRANCH_LIGHTS.forEach((pos, i) => {
      setTimeout(() => {
        const c = makeSVGEl('circle', {
          cx: pos.x, cy: pos.y, r: 1.8,
          fill: '#f3e8ff', opacity: 0
        });
        c.style.transition = 'opacity 0.5s ease';
        container.appendChild(c);
        requestAnimationFrame(() => {
          c.style.opacity = '0.75';
          startTwinkle(c, 1.8 + Math.random() * 1.2, Math.random() * 1.5);
        });
      }, i * 65);
    });
  }

  // ─── Etapa 4: Flores brotan ──────────────────────────────
  function bloomFlowers(cb) {
    const container = document.getElementById('tree-flowers');
    if (!container) { cb && cb(); return; }
    container.innerHTML = '';

    const all = [
      ...DECO_FLOWERS.map(f => ({ ...f, isPhoto: false })),
      ...PHOTO_FLOWERS.map(f => ({ ...f, isPhoto: true })),
    ];

    let maxDelay = 0;
    all.forEach((f, i) => {
      const delay = 100 + i * 95;
      maxDelay = Math.max(maxDelay, delay);

      setTimeout(() => {
        const group = makeFlowerElement(f.x, f.y, f.isPhoto, f.isPhoto ? f.idx : -1);
        container.appendChild(group);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const inner = group.querySelector('.flower-inner');
            if (inner) {
              inner.style.opacity = '1';
              inner.style.transform = 'scale(1)';
            }
          });
        });
      }, delay);
    });

    setTimeout(cb, maxDelay + 400);
  }

  // ─── Creación de flor y marco fotográfico ─────────────────
  function makeFlowerElement(x, y, isPhoto, photoIdx) {
    const outer = makeSVGEl('g', {
      transform: `translate(${x},${y})`,
      class: isPhoto ? 'tree-flower-outer flower-photo' : 'tree-flower-outer'
    });

    const inner = makeSVGEl('g', { class: 'flower-inner' });
    inner.style.cssText =
      'opacity:0; transform:scale(0); transform-origin:0 0; ' +
      'transition: opacity 0.55s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);';
    outer.appendChild(inner);

    const baseHue = 272 + (photoIdx >= 0 ? photoIdx * 7 : Math.random() * 25);

    if (!isPhoto) {
      // Flor decorativa clásica (5 pétalos lilas)
      const petalN = 5;
      const petalR = 7;
      const orbitR = 9;

      const glow = makeSVGEl('circle', {
        cx: 0, cy: 0, r: 16,
        fill: `hsla(${baseHue}, 75%, 68%, 0.16)`,
        filter: 'url(#glow-soft)'
      });
      inner.appendChild(glow);

      for (let i = 0; i < petalN; i++) {
        const ang = (i / petalN) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(ang) * orbitR;
        const py = Math.sin(ang) * orbitR;
        const rot = (ang * 180 / Math.PI) + 90;

        const petal = makeSVGEl('ellipse', {
          cx: px, cy: py,
          rx: petalR, ry: petalR * 0.62,
          fill: `hsl(${baseHue + i * 3}, 70%, 64%)`,
          opacity: 0.88,
          transform: `rotate(${rot} ${px} ${py})`
        });
        inner.appendChild(petal);
      }

      // Centro luminoso
      const center = makeSVGEl('circle', {
        cx: 0, cy: 0, r: 3.5,
        fill: '#f3e8ff',
        filter: 'url(#glow-soft)'
      });
      inner.appendChild(center);

    } else {
      // ── MARCO ELEGANTE DE FOTOGRAFÍA ──
      const photo = (CONFIG.photos && CONFIG.photos[photoIdx]) || {};
      const radius = 17;

      // 1. Halo difuso
      const glow = makeSVGEl('circle', {
        cx: 0, cy: 0, r: radius + 11,
        fill: `hsla(${baseHue}, 80%, 70%, 0.22)`,
        filter: 'url(#glow-soft)',
        class: 'photo-glow-aura'
      });
      inner.appendChild(glow);

      // 2. Pétalos decorativos alrededor del medallón
      const petalCount = 8;
      for (let i = 0; i < petalCount; i++) {
        const ang = (i / petalCount) * Math.PI * 2;
        const px = Math.cos(ang) * (radius + 4);
        const py = Math.sin(ang) * (radius + 4);
        const rot = (ang * 180 / Math.PI) + 90;

        const petal = makeSVGEl('ellipse', {
          cx: px, cy: py,
          rx: 6, ry: 4,
          fill: `hsl(${baseHue + i * 4}, 72%, 68%)`,
          opacity: 0.85,
          transform: `rotate(${rot} ${px} ${py})`
        });
        inner.appendChild(petal);
      }

      // 3. Fondo del marco (camafeo)
      const frameBg = makeSVGEl('circle', {
        cx: 0, cy: 0, r: radius,
        fill: '#1a0a2e',
        stroke: 'rgba(192, 132, 252, 0.4)',
        'stroke-width': 1
      });
      inner.appendChild(frameBg);

      // 4. Placeholder SVG en caso de que la foto no exista
      const placeholderGroup = makeSVGEl('g', { class: 'tree-photo-placeholder' });
      // Mini corazón cameo
      const heartIcon = makeSVGEl('path', {
        d: 'M0 3 C0 0 -3.5 -3.5 -7 -3.5 C-10 -3.5 -11.5 -1 -11.5 2 C-11.5 5 -8 9 0 13 C8 9 11.5 5 11.5 2 C11.5 -1 10 -3.5 7 -3.5 C3.5 -3.5 0 0 0 3 Z',
        fill: '#c084fc',
        opacity: 0.8,
        transform: 'translate(0,-5) scale(0.7)'
      });
      const photoLabel = makeSVGEl('text', {
        x: 0, y: 10,
        'text-anchor': 'middle',
        'font-size': '8',
        'font-family': 'serif',
        fill: '#e9d5ff',
        opacity: 0.85
      });
      photoLabel.textContent = `Nº ${photoIdx + 1}`;
      placeholderGroup.appendChild(heartIcon);
      placeholderGroup.appendChild(photoLabel);
      inner.appendChild(placeholderGroup);

      // 5. Imagen real si se proporciona
      if (photo.src) {
        const img = makeSVGEl('image', {
          href: photo.src,
          x: -radius,
          y: -radius,
          width: radius * 2,
          height: radius * 2,
          preserveAspectRatio: 'xMidYMid slice',
          'clip-path': 'url(#photo-frame-clip)',
          opacity: 0
        });
        img.style.transition = 'opacity 0.4s ease';

        // Comprobar si la imagen carga de verdad
        const testImg = new Image();
        testImg.onload = () => {
          img.setAttribute('opacity', '1');
          placeholderGroup.style.display = 'none';
        };
        testImg.onerror = () => {
          if (photo.fallbackSrc) {
            const fallbackImg = new Image();
            fallbackImg.onload = () => {
              img.setAttribute('href', photo.fallbackSrc);
              img.setAttribute('opacity', '1');
              placeholderGroup.style.display = 'none';
            };
            fallbackImg.onerror = () => {
              img.style.display = 'none';
            };
            fallbackImg.src = photo.fallbackSrc;
          } else {
            img.style.display = 'none';
          }
        };
        testImg.src = photo.src;

        inner.appendChild(img);
      }

      // 6. Aro exterior biselado con detalles de perla
      const borderRing = makeSVGEl('circle', {
        cx: 0, cy: 0, r: radius,
        fill: 'none',
        stroke: '#f3e8ff',
        'stroke-width': 1.6,
        filter: 'url(#glow-soft)'
      });
      inner.appendChild(borderRing);

      // 7. Accesibilidad e interacción
      outer.style.cursor = 'pointer';
      outer.setAttribute('role', 'button');
      outer.setAttribute('tabindex', '0');
      outer.setAttribute('aria-label', `Recuerdo ${photoIdx + 1}: ${photo.phrase || 'Ver foto'}`);

      const triggerOpen = () => PhotoModal.open(photoIdx);
      outer.addEventListener('click', triggerOpen);
      outer.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerOpen();
        }
      });
    }

    return outer;
  }

  // ─── Etapa 5 y 6: Iluminación y pulso de fotos ───────────
  function illuminateAndRevealPhotos() {
    let i = 0;
    document.querySelectorAll('.flower-photo').forEach(f => {
      f.style.animation = `flowerPulse 3.2s ease-in-out ${i * 0.45}s infinite`;
      i++;
    });
  }

  // ─── Modo sin animaciones (Accesibilidad / Reduced Motion) ─
  function showAllInstant() {
    document.querySelectorAll('.tree-path').forEach(p => {
      p.style.strokeDashoffset = '0';
    });
    const gnd = document.querySelector('#tree-ground ellipse');
    if (gnd) gnd.style.opacity = '0.85';

    bloomFlowers(() => illuminateAndRevealPhotos());
    addBranchLights();
    showGroundLights(() => {});
  }

  // ─── Ayudantes ───────────────────────────────────────────
  function makeSVGEl(tag, attrs = {}) {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }

  function startTwinkle(el, period, offset) {
    let t0 = null;
    function step(ts) {
      if (!t0) t0 = ts - offset * 1000;
      const ph = ((ts - t0) / (period * 1000)) * Math.PI * 2;
      const op = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(ph));
      el.style.opacity = op;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  return { init };
})();
