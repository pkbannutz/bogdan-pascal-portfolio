/* Equipment gallery: fixed image frames, finite manual browsing, two lazy expansion stages. */
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

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

function initializeGearSection(section) {
  const row = section.querySelector('.gear-row');
  const previous = section.querySelector('[data-gear-step="-1"]');
  const next = section.querySelector('[data-gear-step="1"]');
  // Keep saved-but-hidden entries excluded from navigation and image fitting.
  const visibleCards = [...row.children].filter((card) => !card.hidden);
  row.querySelectorAll('figure img').forEach((img) => {
    if (!img.closest('[hidden]')) fitGearImage(img);
  });

  function updateControls() {
    const maximum = Math.max(0, row.scrollWidth - row.clientWidth);
    row.classList.toggle('gear-can-scroll', maximum > 2);
    previous.disabled = row.scrollLeft <= 2;
    next.disabled = row.scrollLeft >= maximum - 2;
  }

  function move(direction) {
    const firstCard = visibleCards[0];
    if (!firstCard) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const maximum = Math.max(0, row.scrollWidth - row.clientWidth);
    row.scrollTo({
      left: Math.max(0, Math.min(maximum, row.scrollLeft + direction * step)),
      behavior: motionPreference.matches ? 'instant' : 'smooth'
    });
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  row.addEventListener('scroll', updateControls, { passive: true });
  new ResizeObserver(updateControls).observe(row);

  // Keep drag-to-browse for desktop mouse users. Touch swiping and trackpad
  // scrolling remain native; no automatic movement or duplicate products.
  let drag = null;
  row.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 ||
        row.scrollWidth - row.clientWidth < 2) return;
    drag = { id: event.pointerId, x: event.clientX, left: row.scrollLeft };
    row.classList.add('gear-is-dragging');
    try {
      row.setPointerCapture(event.pointerId);
    } catch (err) {
      drag = null;
      row.classList.remove('gear-is-dragging');
    }
  });
  row.addEventListener('pointermove', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    row.scrollLeft = drag.left - (event.clientX - drag.x);
  });
  const endDrag = (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    drag = null;
    row.classList.remove('gear-is-dragging');
    updateControls();
  };
  row.addEventListener('pointerup', endDrag);
  row.addEventListener('pointercancel', endDrag);
  row.addEventListener('dragstart', (event) => event.preventDefault());
  updateControls();
}

document.querySelectorAll('.gear-section:has(.gear-row)').forEach(initializeGearSection);

// Load each expansion level only when its Show more click occurs.
// The two motion rigs are fetched on click one, and the five secondary
// categories are fetched on click two. Nothing is fetched on initial load.
const extraToggle = document.querySelector('[data-gear-more-toggle]');
const motionRegion = document.querySelector('#gear-motion-sections');
const extraRegion = document.querySelector('#gear-extra-sections');
if (extraToggle && motionRegion && extraRegion) {
  const label = extraToggle.querySelector('[data-gear-more-label]');
  const status = document.querySelector('[data-gear-more-status]');
  const levels = [
    { region: motionRegion, path: '/filmmaker/equipment/motion-sections.html?v=20261112', expected: 2, loaded: false },
    { region: extraRegion, path: '/filmmaker/equipment/extra-sections.html?v=20261112b', expected: 5, loaded: false }
  ];
  let openCount = 0;
  let loading = false;

  function updateExpanded() {
    levels.forEach((entry, index) => {
      entry.region.hidden = index >= openCount;
    });
    extraToggle.setAttribute('aria-expanded', String(openCount > 0));
    label.textContent = openCount === levels.length ? 'SHOW LESS EQUIPMENT' : 'SHOW MORE EQUIPMENT';
  }

  async function ensureLoaded(entry) {
    if (entry.loaded) return;
    const response = await fetch(entry.path);
    if (!response.ok) throw new Error('Could not load equipment categories.');
    const template = document.createElement('template');
    template.innerHTML = await response.text();
    const sections = [...template.content.children].filter((node) =>
      node.matches('.gear-section:has(.gear-row)')
    );
    if (sections.length !== entry.expected) throw new Error('Incomplete equipment list.');
    entry.region.appendChild(template.content);
    // Make the newly requested row visible before measuring image frames and controls.
    entry.region.hidden = false;
    sections.forEach(initializeGearSection);
    entry.loaded = true;
  }

  extraToggle.addEventListener('click', async () => {
    if (loading) return;

    if (openCount === levels.length) {
      openCount = 0;
      updateExpanded();
      return;
    }

    const entry = levels[openCount];
    loading = true;
    extraToggle.disabled = true;
    label.textContent = 'LOADING EQUIPMENT...';
    if (status) status.hidden = true;
    try {
      await ensureLoaded(entry);
      openCount++;
      updateExpanded();
    } catch (err) {
      updateExpanded();
      if (status) {
        status.textContent = 'Could not load the additional equipment. Please try again.';
        status.hidden = false;
      }
    } finally {
      loading = false;
      extraToggle.disabled = false;
    }
  });
}

