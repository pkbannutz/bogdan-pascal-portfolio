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
  row.addEventListener('scroll', updateControls, { passive: true });
  new ResizeObserver(updateControls).observe(row);
  updateControls();
});
