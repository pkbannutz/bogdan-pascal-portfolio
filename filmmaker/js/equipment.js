/* One consistent visual frame and seamless alternating equipment carousels. */
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const hoverCapable = window.matchMedia('(hover: hover)');
const loopingRows = [];
let alternatingDirection = 1;
const SCROLL_SPEED_PX_PER_SECOND = 19;
const MANUAL_PAUSE_MS = 2600;

function fitGearImage(img) {
  // A stable frame preserves card heights while images load.
  if (img.parentElement.classList.contains('gear-media')) return;
  const media = document.createElement('div');
  media.className = 'gear-media';
  img.parentNode.insertBefore(media, img);
  media.appendChild(img);

  let bounds = null;
  let measured = false;

  function measureContent() {
    if (measured || !img.naturalWidth || !img.naturalHeight) return;
    measured = true;
    const nW = img.naturalWidth, nH = img.naturalHeight;
    const factor = Math.min(1, 240 / Math.max(nW, nH));
    const w = Math.max(1, Math.round(nW * factor));
    const h = Math.max(1, Math.round(nH * factor));
    try {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const pixels = ctx.getImageData(0, 0, w, h).data;
      let left = w, top = h, right = -1, bottom = -1;
      let hasTransparency = false;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const alpha = pixels[(y * w + x) * 4 + 3];
          if (alpha < 250) hasTransparency = true;
          if (alpha >= 12) {
            if (x < left) left = x;
            if (x > right) right = x;
            if (y < top) top = y;
            if (y > bottom) bottom = y;
          }
        }
      }
      // Do not trim opaque JPEGs, SVGs, or pictures without transparent margins.
      if (!hasTransparency || right < left || bottom < top) return;
      bounds = {
        left: left / w * nW,
        top: top / h * nH,
        width: (right - left + 1) / w * nW,
        height: (bottom - top + 1) / h * nH
      };
    } catch (err) {
      // Tainted or unsupported canvases fall back to the original image dimensions.
      bounds = null;
    }
  }

  function fit() {
    if (!img.naturalWidth || !img.naturalHeight) return;
    measureContent();
    const slotW = media.clientWidth, slotH = media.clientHeight;
    if (!slotW || !slotH) return;
    const nW = img.naturalWidth, nH = img.naturalHeight;
    const b = bounds || { left: 0, top: 0, width: nW, height: nH };
    const base = Math.min(slotW / nW, slotH / nH);
    const zoom = Math.min(0.92 * slotW / (b.width * base),
                          0.92 * slotH / (b.height * base));
    const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    const tx = -(cx - nW / 2) * base * zoom;
    const ty = -(cy - nH / 2) * base * zoom;
    // The separate CSS scale property adds a 5% hover lift without
    // overwriting this precise transparency-aware transform.
    img.style.transform = 'translate(' + tx.toFixed(2) + 'px, ' +
                          ty.toFixed(2) + 'px) scale(' + zoom.toFixed(3) + ')';
  }

  if (img.complete && img.naturalWidth) fit();
  else img.addEventListener('load', fit, { once: true });
  new ResizeObserver(fit).observe(media);
}

document.querySelectorAll('.gear-section:has(.gear-row)').forEach((section) => {
  const row = section.querySelector('.gear-row');
  const previous = section.querySelector('[data-gear-step="-1"]');
  const next = section.querySelector('[data-gear-step="1"]');
  // Hidden, restorable products must never be shown or duplicated.
  const originals = [...row.children].filter((card) => !card.hidden);
  const shouldLoop = originals.length > 4;
  let loop = null;

  if (shouldLoop) {
    const copies = originals.map((card) => {
      const copy = card.cloneNode(true);
      copy.classList.add('gear-loop-copy');
      copy.setAttribute('aria-hidden', 'true');
      copy.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
      copy.querySelectorAll('[tabindex]').forEach((el) => el.setAttribute('tabindex', '-1'));
      row.appendChild(copy);
      return copy;
    });

    row.classList.add('gear-is-looping');
    loop = {
      row,
      originals,
      copies,
      direction: alternatingDirection,
      distance: 0,
      visible: false,
      pointerDown: false,
      pauseUntil: 0
    };
    alternatingDirection *= -1;
    loopingRows.push(loop);
  }

  // Fit both original cards and visually repeated cards, never generating
  // another product image or changing its original file.
  row.querySelectorAll('figure img').forEach(fitGearImage);

  function measureCycle() {
    if (!loop || motionPreference.matches) return;
    const first = loop.originals[0].getBoundingClientRect();
    const nextFirst = loop.copies[0].getBoundingClientRect();
    const distance = nextFirst.left - first.left;
    if (!(distance > 0)) return;
    if (!loop.distance) {
      loop.distance = distance;
      // Starting at the repeated first item makes reverse scrolling seamless.
      row.scrollLeft = loop.direction < 0 ? distance : 0;
    } else if (Math.abs(loop.distance - distance) > 0.5) {
      const previousDistance = loop.distance;
      const phase = ((row.scrollLeft % previousDistance) + previousDistance) % previousDistance;
      loop.distance = distance;
      row.scrollLeft = phase / previousDistance * distance;
    }
  }

  function updateControls() {
    if (loop && !motionPreference.matches) {
      previous.disabled = false;
      next.disabled = false;
      return;
    }
    previous.disabled = row.scrollLeft < 2;
    next.disabled = row.scrollWidth - row.clientWidth - row.scrollLeft < 2;
  }

  function pauseForInteraction() {
    if (loop) loop.pauseUntil = performance.now() + MANUAL_PAUSE_MS;
  }

  function move(direction) {
    pauseForInteraction();
    const first = originals[0];
    if (!first) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const step = first.getBoundingClientRect().width + gap;
    let target = row.scrollLeft + direction * step;
    if (loop && loop.distance && !motionPreference.matches) {
      if (target < 0) {
        row.scrollLeft += loop.distance;
        target += loop.distance;
      } else if (target >= loop.distance) {
        row.scrollLeft -= loop.distance;
        target -= loop.distance;
      }
    }
    row.scrollTo({
      left: target,
      behavior: motionPreference.matches ? 'instant' : 'smooth'
    });
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  row.addEventListener('scroll', updateControls, { passive: true });

  const observer = new ResizeObserver(() => {
    measureCycle();
    updateControls();
  });
  observer.observe(row);
  if (loop) observer.observe(originals[0]);

  if (loop) {
    row.addEventListener('wheel', pauseForInteraction, { passive: true });
    row.addEventListener('touchstart', pauseForInteraction, { passive: true });
    row.addEventListener('touchend', pauseForInteraction, { passive: true });
    row.addEventListener('focusin', pauseForInteraction);
    row.addEventListener('pointerdown', (event) => {
      pauseForInteraction();
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      loop.pointerDown = true;
      if (event.pointerType !== 'mouse') return;
      loop.dragging = true;
      loop.startX = event.clientX;
      loop.startScroll = row.scrollLeft;
      row.classList.add('gear-is-dragging');
      try {
        row.setPointerCapture(event.pointerId);
      } catch (err) {
        loop.pointerDown = false;
        loop.dragging = false;
        row.classList.remove('gear-is-dragging');
      }
    });
    row.addEventListener('pointermove', (event) => {
      if (!loop.dragging) return;
      row.scrollLeft = loop.startScroll - (event.clientX - loop.startX);
    });
    const endDrag = () => {
      loop.pointerDown = false;
      loop.dragging = false;
      row.classList.remove('gear-is-dragging');
      pauseForInteraction();
    };
    row.addEventListener('pointerup', endDrag);
    row.addEventListener('pointercancel', endDrag);
    const intersection = new IntersectionObserver((entries) => {
      loop.visible = entries[0]?.isIntersecting ?? false;
    }, { rootMargin: '160px 0px' });
    intersection.observe(row);
  }
  measureCycle();
  updateControls();
});

// A single animation loop services all overflowing rows, with alternating
// directions and a continuous, non-reversing wrap between identical cycles.
let lastTime = 0;
function animateGear(time) {
  const elapsed = lastTime ? Math.min((time - lastTime) / 1000, 0.06) : 0;
  lastTime = time;
  if (!document.hidden && !motionPreference.matches) {
    for (const loop of loopingRows) {
      if (!loop.visible || !loop.distance || loop.pointerDown ||
          time < loop.pauseUntil || loop.row.matches(':focus-within') ||
          (hoverCapable.matches && loop.row.matches(':hover'))) continue;
      const distance = loop.distance;
      const position = loop.row.scrollLeft + loop.direction * SCROLL_SPEED_PX_PER_SECOND * elapsed;
      loop.row.scrollLeft = ((position % distance) + distance) % distance;
    }
  }
  requestAnimationFrame(animateGear);
}

motionPreference.addEventListener('change', () => {
  for (const loop of loopingRows) {
    loop.distance = 0;
    loop.row.scrollLeft = 0;
    const previous = loop.row.closest('.gear-section').querySelector('[data-gear-step="-1"]');
    const next = loop.row.closest('.gear-section').querySelector('[data-gear-step="1"]');
    if (motionPreference.matches) {
      previous.disabled = true;
      next.disabled = loop.row.scrollWidth - loop.row.clientWidth < 2;
    } else {
      previous.disabled = false;
      next.disabled = false;
    }
    if (!motionPreference.matches) requestAnimationFrame(() => {
      const first = loop.originals[0].getBoundingClientRect();
      const copy = loop.copies[0].getBoundingClientRect();
      const distance = copy.left - first.left;
      if (distance > 0) {
        loop.distance = distance;
        loop.row.scrollLeft = loop.direction < 0 ? distance : 0;
      }
    });
  }
});
requestAnimationFrame(animateGear);
