/* Keep all equipment in equal visual frames, including PNGs with invisible padding. */
document.querySelectorAll('.gear-section:has(.gear-row)').forEach((section) => {
  const row = section.querySelector('.gear-row');
  const previous = section.querySelector('[data-gear-step="-1"]');
  const next = section.querySelector('[data-gear-step="1"]');

  function updateControls() {
    previous.disabled = row.scrollLeft < 2;
    next.disabled = row.scrollWidth - row.clientWidth - row.scrollLeft < 2;
  }

  function move(direction) {
    const itemWidth = row.firstElementChild.getBoundingClientRect().width;
    const gap = Number.parseFloat(getComputedStyle(row).columnGap);
    row.scrollBy({
      left: direction * (itemWidth + gap),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  row.addEventListener('scroll', updateControls, { passive:true });
  new ResizeObserver(updateControls).observe(row);
  updateControls();

  row.querySelectorAll('figure img').forEach((img) => {
    // A fixed media slot prevents cards from changing height as images load.
    const media = document.createElement('div');
    media.className = 'gear-media';
    img.parentNode.insertBefore(media, img);
    media.appendChild(img);

    let contentBounds = null;
    let measured = false;

    function measureContent() {
      if (measured || !img.naturalWidth || !img.naturalHeight) return;
      measured = true;
      const nW = img.naturalWidth, nH = img.naturalHeight;
      const ratio = Math.min(1, 240 / Math.max(nW, nH));
      const w = Math.max(1, Math.round(nW * ratio));
      const h = Math.max(1, Math.round(nH * ratio));
      try {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently:true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;
        let left = w, top = h, right = -1, bottom = -1, hasTransparency = false;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const alpha = data[(y * w + x) * 4 + 3];
            if (alpha < 250) hasTransparency = true;
            if (alpha >= 12) {
              if (x < left) left = x;
              if (x > right) right = x;
              if (y < top) top = y;
              if (y > bottom) bottom = y;
            }
          }
        }
        // Opaque JPEGs/SVGs retain their original geometry.
        if (!hasTransparency || right < left || bottom < top) return;
        contentBounds = {
          left: left / w * nW,
          top: top / h * nH,
          width: (right - left + 1) / w * nW,
          height: (bottom - top + 1) / h * nH
        };
      } catch (err) {
        // A blocked/unsupported canvas must never prevent regular images from displaying.
        contentBounds = null;
      }
    }

    function fitToFrame() {
      if (!img.naturalWidth || !img.naturalHeight) return;
      measureContent();
      const slotW = media.clientWidth, slotH = media.clientHeight;
      if (!slotW || !slotH) return;
      const nW = img.naturalWidth, nH = img.naturalHeight;
      const b = contentBounds || { left:0, top:0, width:nW, height:nH };
      const baseScale = Math.min(slotW / nW, slotH / nH);
      const zoom = Math.min(0.92 * slotW / (b.width * baseScale),
                            0.92 * slotH / (b.height * baseScale));
      const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
      const tx = -(cx - nW / 2) * baseScale * zoom;
      const ty = -(cy - nH / 2) * baseScale * zoom;
      img.style.transform = 'translate(' + tx.toFixed(2) + 'px, ' +
                            ty.toFixed(2) + 'px) scale(' + zoom.toFixed(3) + ')';
    }

    if (img.complete && img.naturalWidth) fitToFrame();
    else img.addEventListener('load', fitToFrame, { once:true });
    new ResizeObserver(fitToFrame).observe(media);
  });
});
