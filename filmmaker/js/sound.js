/* Sound Design selected finished films. Real soundtrack layers live in sound-demo.js. */
(() => {
  'use strict';
  /* Watch complete pre-existing film files. Roles vary by project. */
  const filmData = {
    geodome: { title: 'GEODOMEX', sub: 'Hers by Day, His by Night / Commercial', poster: '/assets/filmmaker/geodome/t.jpg', src: 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/geodome-main.mp4', href: '/filmmaker/work/geodome/' },
    ffern: { title: 'FFERN', sub: 'Discover Summer 23 / Spec Ad', poster: '/assets/filmmaker/ffern/t.jpg', src: 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/ffern.mp4', href: '/filmmaker/work/ffern/' },
    push: { title: 'SPEEDO', sub: 'Push. Repeat / Branded Content', poster: '/assets/filmmaker/push/t.jpg', src: 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/speedo-push-repeat.mp4', href: '/filmmaker/work/push/' }
  };
  const film = document.getElementById('sd-film-video');
  const filmChoices = [...document.querySelectorAll('[data-sd-film]')];
  filmChoices.forEach(button => button.addEventListener('click', () => {
    const item = filmData[button.dataset.sdFilm];
    if (!item || film.currentSrc === item.src) return;
    film.pause();
    film.setAttribute('poster', item.poster);
    film.src = item.src;
    film.load();
    document.getElementById('sd-film-title').textContent = item.title;
    document.getElementById('sd-film-sub').textContent = item.sub;
    document.getElementById('sd-film-link').href = item.href;
    filmChoices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
  }));
})();
