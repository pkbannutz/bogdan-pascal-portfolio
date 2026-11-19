/* Keep the selected kit strip still when it fits, loop when it overflows. */
(() => {
  const viewport = document.querySelector('[data-svc-kit-marquee]');
  if (!viewport) return;
  const track = viewport.querySelector('.svc-kit-marquee-track');
  const originals = viewport.querySelector('.svc-kit-marquee-set');
  let copy = null;
  const update = () => {
    const overflow = originals.scrollWidth > viewport.clientWidth + 2;
    if (overflow && !copy) {
      copy = originals.cloneNode(true);
      copy.classList.add('is-copy');
      copy.setAttribute('aria-hidden', 'true');
      copy.inert = true;
      track.appendChild(copy);
    } else if (!overflow && copy) {
      copy.remove();
      copy = null;
    }
    viewport.classList.toggle('is-rolling', overflow);
  };
  if ('ResizeObserver' in window) new ResizeObserver(update).observe(viewport);
  else window.addEventListener('resize', update);
  update();
})();
