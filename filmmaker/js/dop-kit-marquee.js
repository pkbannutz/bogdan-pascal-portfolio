/* Selected DoP kit: measured transparency-aware images and a continuous ticker. */
(() => {
  const viewport = document.querySelector('[data-svc-kit-marquee]');
  if (!viewport) return;

  const track = viewport.querySelector('.svc-kit-marquee-track');
  const originals = viewport.querySelector('.svc-kit-marquee-set');
  const boundsCache = new WeakMap();
  const fittedImages = new WeakSet();
  const sizeObserver = typeof ResizeObserver === 'function'
    ? new ResizeObserver(entries => {
        for (const entry of entries) {
          const image = entry.target.querySelector('img');
          if (image) fitImage(image);
        }
      })
    : null;
  let copy = null;

  // Same method as the main Equipment gallery: inspect actual opaque pixels,
  // then fit and centre the visible object within 92% of its fixed frame.
  function measureVisibleBounds(image) {
    if (boundsCache.has(image)) return boundsCache.get(image);
    const width = image.naturalWidth, height = image.naturalHeight;
    if (!width || !height) return null;
    let bounds = null;
    const factor = Math.min(1, 240 / Math.max(width, height));
    const scaledWidth = Math.max(1, Math.round(width * factor));
    const scaledHeight = Math.max(1, Math.round(height * factor));
    try {
      const canvas = document.createElement('canvas');
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
      const context = canvas.getContext('2d', {willReadFrequently: true});
      if (context) {
        context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
        const pixels = context.getImageData(0, 0, scaledWidth, scaledHeight).data;
        let left = scaledWidth, top = scaledHeight, right = -1, bottom = -1;
        let hasTransparency = false;
        for (let y = 0; y < scaledHeight; y++) {
          for (let x = 0; x < scaledWidth; x++) {
            const alpha = pixels[(y * scaledWidth + x) * 4 + 3];
            if (alpha < 250) hasTransparency = true;
            if (alpha >= 12) {
              if (x < left) left = x;
              if (x > right) right = x;
              if (y < top) top = y;
              if (y > bottom) bottom = y;
            }
          }
        }
        if (hasTransparency && right >= left && bottom >= top) {
          bounds = {
            left: left / scaledWidth * width,
            top: top / scaledHeight * height,
            width: (right - left + 1) / scaledWidth * width,
            height: (bottom - top + 1) / scaledHeight * height
          };
        }
      }
    } catch (error) {
      // Opaque files and unreadable canvas data use a safe object-fit fallback.
    }
    boundsCache.set(image, bounds);
    return bounds;
  }

  function fitImage(image) {
    const frame = image.closest('.svc-kit-tile-media');
    if (!frame || !image.naturalWidth || !image.naturalHeight) return;
    const slotWidth = frame.clientWidth, slotHeight = frame.clientHeight;
    if (!slotWidth || !slotHeight) return;
    const naturalWidth = image.naturalWidth, naturalHeight = image.naturalHeight;
    const visible = measureVisibleBounds(image) || {
      left: 0, top: 0, width: naturalWidth, height: naturalHeight
    };
    const base = Math.min(slotWidth / naturalWidth, slotHeight / naturalHeight);
    const zoom = Math.min(
      .92 * slotWidth / (visible.width * base),
      .92 * slotHeight / (visible.height * base)
    );
    const centreX = visible.left + visible.width / 2;
    const centreY = visible.top + visible.height / 2;
    const translateX = -(centreX - naturalWidth / 2) * base * zoom;
    const translateY = -(centreY - naturalHeight / 2) * base * zoom;
    image.style.transform = 'translate(' + translateX.toFixed(2) + 'px, ' +
      translateY.toFixed(2) + 'px) scale(' + zoom.toFixed(3) + ')';
  }

  function watchImages(set) {
    for (const image of set.querySelectorAll('.svc-kit-tile-media img')) {
      if (fittedImages.has(image)) continue;
      fittedImages.add(image);
      if (sizeObserver) sizeObserver.observe(image.parentElement);
      if (image.complete && image.naturalWidth) fitImage(image);
      else image.addEventListener('load', () => fitImage(image), {once: true});
    }
  }

  function update() {
    const overflow = originals.scrollWidth > viewport.clientWidth + 2;
    if (overflow && !copy) {
      copy = originals.cloneNode(true);
      copy.classList.add('is-copy');
      copy.setAttribute('aria-hidden', 'true');
      copy.inert = true;
      track.appendChild(copy);
      watchImages(copy);
    } else if (!overflow && copy) {
      if (sizeObserver) {
        for (const frame of copy.querySelectorAll('.svc-kit-tile-media')) sizeObserver.unobserve(frame);
      }
      copy.remove();
      copy = null;
    }
    viewport.classList.toggle('is-rolling', overflow);
    if (!sizeObserver) {
      for (const image of track.querySelectorAll('.svc-kit-tile-media img')) fitImage(image);
    }
  }

  watchImages(originals);
  if (typeof ResizeObserver === 'function') new ResizeObserver(update).observe(viewport);
  window.addEventListener('resize', update);
  update();
})();
