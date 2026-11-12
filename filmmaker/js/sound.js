/* Sound page interactions. Existing portfolio media only. No generated or invented client audio. */
(() => {
  'use strict';
  const video = document.getElementById('sd-ab-video');
  if (!video) return;

  const play = document.getElementById('sd-play');
  const overlay = document.getElementById('sd-video-play');
  const area = video.closest('.sd-video-area');
  const seek = document.getElementById('sd-seek');
  const time = document.getElementById('sd-time');
  const status = document.getElementById('sd-status');
  const mode = document.getElementById('sd-video-mode');
  const signalLabel = document.getElementById('sd-signal-label');
  const mixButtons = [...document.querySelectorAll('[data-sd-mix]')];
  const canvas = document.getElementById('sd-waveform');
  const ctx2d = canvas?.getContext('2d');
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let context = null;
  let analyser = null;
  let gains = null;
  let selected = 0;
  let animationId = null;
  let stream = null;

  const setStatus = message => { if (status) status.textContent = message; };
  const clock = seconds => {
    if (!Number.isFinite(seconds)) return '00:00';
    const s = Math.max(0, Math.floor(seconds));
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  };
  const refreshTime = () => {
    time.textContent = clock(video.currentTime) + ' / ' + clock(video.duration);
    if (Number.isFinite(video.duration) && video.duration > 0) {
      seek.value = String(Math.round(video.currentTime / video.duration * 1000));
      seek.style.setProperty('--sd-progress', (video.currentTime / video.duration * 100) + '%');
    }
  };
  const canvasSize = () => {
    if (!ctx2d) return;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(canvas.clientWidth * scale));
    canvas.height = Math.max(1, Math.floor(canvas.clientHeight * scale));
  };
  const draw = () => {
    if (!ctx2d) return;
    const w = canvas.width, h = canvas.height;
    ctx2d.clearRect(0, 0, w, h);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#d7ff3a';
    const muted = getComputedStyle(document.documentElement).getPropertyValue('--edge').trim() || '#343932';
    ctx2d.strokeStyle = muted;
    ctx2d.lineWidth = Math.max(1, w / 1000);
    ctx2d.beginPath();
    ctx2d.moveTo(0, h / 2);
    ctx2d.lineTo(w, h / 2);
    ctx2d.stroke();
    ctx2d.strokeStyle = accent;
    ctx2d.lineWidth = Math.max(1.5, w / 550);
    ctx2d.beginPath();
    if (analyser && !video.paused) {
      const data = new Uint8Array(analyser.fftSize);
      analyser.getByteTimeDomainData(data);
      for (let i = 0; i < data.length; i++) {
        const x = i / (data.length - 1) * w;
        const y = (data[i] / 128 - 1) * h * .43 + h / 2;
        if (i === 0) ctx2d.moveTo(x, y);
        else ctx2d.lineTo(x, y);
      }
    } else {
      ctx2d.moveTo(0, h / 2);
      ctx2d.lineTo(w, h / 2);
    }
    ctx2d.stroke();
    if (!video.paused) animationId = requestAnimationFrame(draw);
    else animationId = null;
  };
  const prepareAudio = () => {
    if (context) return;
    if (!AudioContextClass) throw new Error('Audio switching is unavailable in this browser.');
    context = new AudioContextClass();
    const source = context.createMediaElementSource(video);
    const split = context.createChannelSplitter(2);
    source.connect(split);
    gains = [context.createGain(), context.createGain()];
    const sum = context.createGain();
    gains.forEach((gain, index) => {
      split.connect(gain, index);
      gain.gain.value = index === selected ? 1 : 0;
      gain.connect(sum);
    });
    analyser = context.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = .7;
    sum.connect(analyser);
    analyser.connect(context.destination);
  };
  const togglePlay = async () => {
    if (!video.paused) { video.pause(); return; }
    try {
      prepareAudio();
      await context.resume();
      await video.play();
      setStatus('Playing sound study. Switch A and B to compare at the same moment.');
    } catch (error) {
      setStatus('Playback is unavailable here. Try another browser or open this page without an in-app browser.');
      if (!context) {
        video.controls = true;
        mixButtons.forEach(button => { button.disabled = true; });
      }
    }
  };
  [play, overlay].forEach(button => button?.addEventListener('click', togglePlay));
  const selectMix = next => {
    selected = next;
    if (gains && context) {
      gains.forEach((gain, index) => {
        gain.gain.setTargetAtTime(index === selected ? 1 : 0, context.currentTime, .013);
      });
    }
    mixButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.sdMix) === selected)));
    mode.textContent = selected === 0 ? 'LISTENING TO / ORIGINAL' : 'LISTENING TO / WITH SFX';
    signalLabel.textContent = selected === 0 ? 'A / ORIGINAL' : 'B / WITH SFX';
    if (video.paused) setStatus('Selected ' + (selected === 0 ? 'original ambient bed' : 'SFX treatment') + '. Press play to listen.');
  };
  mixButtons.forEach(button => button.addEventListener('click', () => selectMix(Number(button.dataset.sdMix))));
  seek.addEventListener('input', () => {
    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Number(seek.value) / 1000 * video.duration;
      refreshTime();
    }
  });
  video.addEventListener('loadedmetadata', refreshTime);
  video.addEventListener('timeupdate', refreshTime);
  video.addEventListener('play', () => {
    play.innerHTML = 'PAUSE <span aria-hidden="true">Ⅱ</span>';
    play.setAttribute('aria-label', 'Pause sound comparison');
    overlay.setAttribute('aria-label', 'Pause sound comparison');
    overlay.innerHTML = '<span aria-hidden="true">Ⅱ</span>';
    area.classList.add('is-playing');
    if (animationId === null) draw();
  });
  video.addEventListener('pause', () => {
    play.innerHTML = 'PLAY <span aria-hidden="true">▶</span>';
    play.setAttribute('aria-label', 'Play sound comparison');
    overlay.setAttribute('aria-label', 'Play sound comparison');
    overlay.innerHTML = '<span aria-hidden="true">▶</span>';
    area.classList.remove('is-playing');
    if (animationId !== null) cancelAnimationFrame(animationId);
    animationId = null;
    draw();
  });
  video.addEventListener('ended', () => setStatus('End of the study. Press play to hear it again.'));
  video.addEventListener('error', () => setStatus('The sound study could not be loaded. Try refreshing this page.'));
  window.addEventListener('resize', () => { canvasSize(); if (video.paused) draw(); });
  canvasSize(); draw(); refreshTime();

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
