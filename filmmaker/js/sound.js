/* Sound page: interactive layer explorer and selected finished films. */
(() => {
  'use strict';
  /* Clickable track map explains sound craft; it does not claim to play isolated stems. */
  const layers = {
    voice: { index: '01 / THE HUMAN ELEMENT', title: 'MAKE EVERY<br>WORD LAND.', desc: 'The quietest part of a film can carry the most meaning. Dialogue cleanup, consistent tone and careful placement keep the voice natural and the story clear.', tags: 'DIALOGUE EDIT / NOISE CONTROL / PRESENCE' },
    foley: { index: '02 / THE PHYSICAL ELEMENT', title: 'GIVE MOVEMENT<br>ITS WEIGHT.', desc: 'Footsteps, clothing, contact and impact can turn an image into something tactile. It is about making an action feel real, not making every action louder.', tags: 'FOLEY / TEXTURE / CUSTOM EFFECTS' },
    world: { index: '03 / THE ENVIRONMENT', title: 'BUILD A WORLD<br>BEYOND FRAME.', desc: 'Air, distant activity, subtle changes in tone and the gaps between them tell us where we are. Atmosphere gives the picture a place to live.', tags: 'AMBIENCE / ROOM TONE / TRANSITIONS' },
    space: { index: '04 / THE FINAL PERSPECTIVE', title: 'MAKE IT ALL<br>BELONG.', desc: 'Distance, focus, music and dynamics bring the separate elements together. The final mix should guide attention without asking to be noticed.', tags: 'PERSPECTIVE / BALANCE / FINAL MIX' }
  };
  const tracks = [...document.querySelectorAll('[data-sd-layer]')];
  const title = document.getElementById('sd-layer-title');
  const description = document.getElementById('sd-layer-desc');
  const index = document.getElementById('sd-layer-index');
  const tags = document.getElementById('sd-layer-tags');
  tracks.forEach((track, row) => {
    const wave = track.querySelector('.sd-track-wave');
    if (wave) {
      for (let n = 0; n < 48; n++) {
        const bar = document.createElement('i');
        const value = Math.abs(Math.sin((n + 1) * (.32 + row * .09)) * Math.cos((n + 4) * (.19 + row * .07)));
        bar.style.height = (8 + Math.round(value * (row === 2 ? 60 : 88))) + '%';
        wave.appendChild(bar);
      }
    }
    track.addEventListener('click', () => {
      const layer = layers[track.dataset.sdLayer];
      if (!layer) return;
      tracks.forEach(item => item.setAttribute('aria-pressed', String(item === track)));
      index.textContent = layer.index;
      title.innerHTML = layer.title;
      description.textContent = layer.desc;
      tags.textContent = layer.tags;
    });
  });

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
