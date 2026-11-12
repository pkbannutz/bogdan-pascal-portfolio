/* Colour Grading V3 preview only: launch the active project in a lightweight film dialog. */
(() => {
  'use strict';
  const openButton = document.querySelector('.cg .v3-watch-selected');
  if (!openButton) return;

  // Media details match the originals used by the film viewer.
  const films = {
    geodome: {title: 'GeoDomeX / Hers by Day, His by Night', type: 'video', src: 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/geodome-main.mp4', poster: '/assets/filmmaker/geodome/t.jpg', page: '/filmmaker/work/geodome/'},
    therme: {title: 'Therme / BBC StoryWorks', type: 'embed', src: 'https://player.vimeo.com/video/1181302232?title=0&byline=0&portrait=0&dnt=1', page: '/filmmaker/work/therme/'},
    dyla: {title: "Dyla's Atelier / A Designer's Story", type: 'embed', src: 'https://player.vimeo.com/video/1047813220?title=0&byline=0&portrait=0&dnt=1', page: '/filmmaker/work/dyla/'},
    push: {title: 'Speedo / Push. Repeat', type: 'video', src: 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/speedo-push-repeat.mp4', poster: '/assets/filmmaker/push/t.jpg', page: '/filmmaker/work/push/'},
    particle: {title: 'Particle / For Men', type: 'video', src: 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/particle.mp4', poster: '/assets/filmmaker/particle/t.jpg', page: '/filmmaker/work/particle/'},
    leo: {title: 'Dear Leo', type: 'video', src: 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/leo.mp4', poster: '/assets/filmmaker/leo/t.jpg', page: '/filmmaker/work/leo/'}
  };

  const dialog = document.createElement('dialog');
  dialog.className = 'v3-watch-dialog';
  dialog.setAttribute('aria-label', 'Selected colour grading film');
  dialog.innerHTML = `
    <div class="v3-watch-head">
      <div><span>SELECTED FILM</span><h2 id="v3-watch-title"></h2></div>
      <button type="button" class="v3-watch-close" aria-label="Close film viewer">CLOSE ×</button>
    </div>
    <div class="v3-watch-media" aria-label="Film player"></div>
    <div class="v3-watch-foot"><span>FINISHED FILM / COLOUR GRADING</span><a href="/filmmaker/work/geodome/" class="v3-watch-project">VIEW FULL PROJECT ↗</a></div>`;
  document.body.appendChild(dialog);
  const media = dialog.querySelector('.v3-watch-media');
  const filmTitle = dialog.querySelector('#v3-watch-title');
  const filmLink = dialog.querySelector('.v3-watch-project');
  const closeButton = dialog.querySelector('.v3-watch-close');

  function clearMedia() {
    const video = media.querySelector('video');
    if (video) video.pause();
    media.replaceChildren();
  }
  function closeDialog() {
    if (dialog.open) dialog.close();
    clearMedia();
    openButton.focus({preventScroll: true});
  }
  closeButton.addEventListener('click', closeDialog);
  dialog.addEventListener('close', () => {
    clearMedia();
    openButton.focus({preventScroll: true});
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });

  openButton.addEventListener('click', () => {
    const active = document.querySelector('.cg [data-cg-project][aria-pressed="true"]');
    const filmId = active?.dataset.cgProject || 'geodome';
    const film = films[filmId];
    if (!film) return;

    clearMedia();
    filmTitle.textContent = film.title;
    filmLink.href = film.page;
    filmLink.setAttribute('aria-label', 'Open the ' + film.title + ' project page');

    const player = document.createElement(film.type === 'video' ? 'video' : 'iframe');
    player.title = film.title;
    if (film.type === 'video') {
      player.controls = true;
      player.playsInline = true;
      player.preload = 'metadata';
      player.poster = film.poster;
    } else {
      player.allow = 'autoplay; fullscreen; picture-in-picture';
      player.allowFullscreen = true;
      player.loading = 'lazy';
      player.referrerPolicy = 'strict-origin-when-cross-origin';
    }
    player.src = film.src;
    media.appendChild(player);

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      closeButton.focus({preventScroll: true});
    } else {
      // Accessibility fallback: don't strand the user with an unopenable player.
      location.href = film.page;
    }
  });
})();