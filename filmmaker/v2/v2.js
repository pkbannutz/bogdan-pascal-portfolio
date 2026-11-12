/* Isolated V2 preview navigation and interactions. Original routes remain untouched. */
(() => {
  'use strict';

  // Preserve preview navigation even for links populated later by shared portfolio JS.
  document.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest('a[href]');
    if (!anchor || anchor.hasAttribute('data-v2-original') || anchor.closest('.v2-preview-strip') || anchor.closest('.v2-review')) return;
    const target = new URL(anchor.href, location.href);
    if (target.origin !== location.origin || !target.pathname.startsWith('/filmmaker/') ||
        target.pathname.startsWith('/filmmaker/v2/')) return;
    event.preventDefault();
    event.stopPropagation();
    location.assign('/filmmaker/v2' + target.pathname.slice('/filmmaker'.length) + target.search + target.hash);
  }, true);

  const workToggle = document.querySelector('.v2-work-more');
  if (workToggle) {
    workToggle.addEventListener('click', () => {
      const expanded = document.body.classList.toggle('v2-show-all-work');
      workToggle.setAttribute('aria-expanded', String(expanded));
      workToggle.textContent = expanded ? 'SHOW FEWER FILMS ↑' : 'VIEW ALL 23 FILMS ↓';
    });
  }

  const fpvToggle = document.querySelector('.v2-fpv-more');
  if (fpvToggle) {
    fpvToggle.addEventListener('click', () => {
      const expanded = document.body.classList.toggle('v2-show-fpv-all');
      fpvToggle.setAttribute('aria-expanded', String(expanded));
      fpvToggle.textContent = expanded ? 'SHOW FEWER FILMS ↑' : 'SHOW TWO MORE FILMS ↗';
    });
  }

  // Selected grading work can be watched without adding another full-height viewer.
  const watch = document.querySelector('.v2-watch-selected');
  if (watch) {
    const films = {
      geodome: {kind: 'video', url: 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/geodome-main.mp4'},
      therme: {kind: 'embed', url: 'https://player.vimeo.com/video/1181302232?title=0&byline=0&portrait=0&dnt=1'},
      dyla: {kind: 'embed', url: 'https://player.vimeo.com/video/1047813220?title=0&byline=0&portrait=0&dnt=1'},
      push: {kind: 'video', url: 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/speedo-push-repeat.mp4'},
      particle: {kind: 'video', url: 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/particle.mp4'},
      leo: {kind: 'video', url: 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/leo.mp4'}
    };
    const dialog = document.createElement('dialog');
    dialog.className = 'v2-watch-dialog';
    dialog.setAttribute('aria-label', 'Selected colour grading film');
    dialog.innerHTML = '<div class="v2-watch-head"><strong>SELECTED FILM</strong><button type="button" aria-label="Close selected film">CLOSE ×</button></div><div class="v2-watch-media"></div><a class="v2-watch-project" href="#">VIEW FULL PROJECT ↗</a>';
    document.body.appendChild(dialog);
    const media = dialog.querySelector('.v2-watch-media');
    const close = () => { if (dialog.open) dialog.close(); media.replaceChildren(); };
    dialog.querySelector('button').addEventListener('click', close);
    dialog.addEventListener('close', () => media.replaceChildren());
    dialog.addEventListener('click', event => { if (event.target === dialog) close(); });

    watch.addEventListener('click', () => {
      const active = document.querySelector('[data-cg-project][aria-pressed="true"]');
      const id = active?.dataset.cgProject || 'geodome';
      const film = films[id];
      if (!film) return;
      media.replaceChildren();
      const player = document.createElement(film.kind === 'video' ? 'video' : 'iframe');
      if (film.kind === 'video') {
        player.controls = true;
        player.playsInline = true;
        player.preload = 'metadata';
      } else {
        player.allow = 'autoplay; fullscreen; picture-in-picture';
        player.allowFullscreen = true;
      }
      player.src = film.url;
      player.title = 'Selected colour grading film';
      media.appendChild(player);
      dialog.querySelector('.v2-watch-project').href = '/filmmaker/v2/work/' + id + '/';
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else location.href = '/filmmaker/v2/work/' + id + '/';
    });
  }
})();