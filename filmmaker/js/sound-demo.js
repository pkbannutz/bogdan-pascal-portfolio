/* The hotel film with five genuine WAV stems, synchronized on the video's timeline. */
(() => {
  'use strict';
  const base = 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/';
  const filmFile = '16X9HOTEL_LONG_FINAL GRADE & SOUND-.mp4';
  const sources = {
    all: 'SFX_ALL_16X9HOTEL_LONG_FINAL GRADE & SOUND-.wav',
    foley: 'SFX_FOLLEY_16X9HOTEL_LONG_FINAL GRADE & SOUND-.wav',
    foleyvo: 'SFX_FOLLEY+VO_16X9HOTEL_LONG_FINAL GRADE & SOUND-.wav',
    vo: 'SFX_VO_16X9HOTEL_LONG_FINAL GRADE & SOUND-.wav',
    music: 'SFX_MUSIC_16X9HOTEL_LONG_FINAL GRADE & SOUND-.wav'
  };
  const labels = {all: 'ALL', foley: 'FOLEY', foleyvo: 'FOLEY + VO', vo: 'VO', music: 'MUSIC'};
  const demo = document.getElementById('sd-real-demo');
  if (!demo) return;
  const video = document.getElementById('sd-real-video');
  const play = document.getElementById('sd-real-play');
  const overlay = document.getElementById('sd-real-overlay');
  const mute = document.getElementById('sd-real-mute');
  const scrub = document.getElementById('sd-real-scrub');
  const time = document.getElementById('sd-real-time');
  const active = document.getElementById('sd-real-active');
  const status = document.getElementById('sd-real-status');
  const buttons = [...demo.querySelectorAll('[data-real-stem]')];
  const keys = Object.keys(sources);
  const waveforms = {};
  const gains = {};
  const buffers = {};
  let playing = {}, context, selected = 'all', silenced = false;
  let loadPromise, ready = false, busy = false, isScrubbing = false;
  let raf = 0, playStart = 0, lastStartAt = -Infinity;
  const fileUrl = filename => base + encodeURIComponent(filename);
  const formatTime = value => {
    const seconds = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
    return String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
  };
  const mediaDuration = () => Number.isFinite(video.duration) ? video.duration : 51.88;

  function updateUi() {
    const duration = mediaDuration();
    if (!isScrubbing) scrub.value = String(video.currentTime || 0);
    scrub.max = String(duration);
    time.textContent = formatTime(video.currentTime) + ' / ' + formatTime(duration);
    const running = !video.paused && !video.ended;
    play.textContent = running ? 'PAUSE' : 'PLAY';
    overlay.hidden = running;
    overlay.querySelector('strong').textContent = video.ended ? 'REPLAY THE FILM' : 'PLAY THE FILM';
    mute.textContent = silenced ? 'SOUND OFF' : 'SOUND ON';
    mute.setAttribute('aria-pressed', String(silenced));
  }

  function updatePlayhead() {
    const duration = mediaDuration();
    const progress = Math.min(100, Math.max(0, duration > 0 ? (video.currentTime / duration) * 100 : 0));
    for (const button of buttons) {
      const cursor = button.querySelector('.sd-real-playhead');
      if (cursor) cursor.style.left = progress + '%';
    }
  }
  function animate() {
    raf = 0;
    updatePlayhead();
    if (!video.paused && !video.ended && !document.hidden) raf = requestAnimationFrame(animate);
  }
  function startAnimation() {
    if (!raf && !document.hidden) raf = requestAnimationFrame(animate);
  }
  function stopAnimation() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    updatePlayhead();
  }

  /* Bars are measured from the actual decoded PCM, not a decorative animation.
     Each peak represents a matching time slice from the audio file. */
  function measureWaveform(buffer, count) {
    const result = new Float32Array(count);
    const channels = Array.from({length: Math.min(buffer.numberOfChannels, 2)}, (_, i) => buffer.getChannelData(i));
    for (let n = 0; n < count; n++) {
      const start = Math.floor(n * buffer.length / count);
      const end = Math.min(buffer.length, Math.floor((n + 1) * buffer.length / count));
      const step = Math.max(1, Math.floor((end - start) / 280));
      let max = 0;
      for (let i = start; i < end; i += step) {
        for (const channel of channels) max = Math.max(max, Math.abs(channel[i] || 0));
      }
      result[n] = Math.max(0.018, Math.pow(Math.min(1, max), .8));
    }
    return result;
  }
  function drawWaveform(key) {
    const info = waveforms[key];
    if (!info || !info.peaks) return;
    const canvas = info.canvas;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width, height = rect.height;
    if (!width || !height) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const button = canvas.closest('.sd-real-track');
    const activeTrack = button.getAttribute('aria-pressed') === 'true';
    ctx.fillStyle = getComputedStyle(button).color;
    ctx.globalAlpha = activeTrack ? .88 : .55;
    const peaks = info.peaks;
    const cell = width / peaks.length;
    const barWidth = Math.max(1, cell * .63);
    for (let i = 0; i < peaks.length; i++) {
      const h = Math.max(2, peaks[i] * (height - 2));
      ctx.fillRect(i * cell, (height - h) / 2, barWidth, h);
    }
  }
  function redrawAll() {
    for (const key of keys) drawWaveform(key);
  }

  function setTrack(key) {
    if (!Object.prototype.hasOwnProperty.call(sources, key)) return;
    selected = key;
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.realStem === key));
    active.textContent = 'NOW HEARING / ' + labels[key];
    if (context) {
      for (const [name, gain] of Object.entries(gains)) {
        const volume = !silenced && name === key ? 1 : 0;
        gain.gain.cancelScheduledValues(context.currentTime);
        gain.gain.setTargetAtTime(volume, context.currentTime, .008);
      }
    }
    redrawAll();
    updatePlayhead();
  }

  async function prepare() {
    if (loadPromise) return loadPromise;
    loadPromise = (async () => {
      status.textContent = 'PREPARING THE REAL WAVEFORMS AND SOUNDTRACKS';
      const AudioContextType = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextType) throw Error('Web Audio unavailable');
      context = new AudioContextType();
      const files = await Promise.all(keys.map(async key => {
        const response = await fetch(fileUrl(sources[key]), {mode: 'cors'});
        if (!response.ok) throw Error('Missing audio file: ' + key);
        const bytes = await response.arrayBuffer();
        return [key, await context.decodeAudioData(bytes)];
      }));
      for (const [key, buffer] of files) {
        buffers[key] = buffer;
        const gain = context.createGain();
        gain.gain.value = selected === key && !silenced ? 1 : 0;
        gain.connect(context.destination);
        gains[key] = gain;
        const canvas = demo.querySelector('[data-sd-wave="' + key + '"]');
        if (canvas) waveforms[key] = {canvas, peaks: measureWaveform(buffer, 150)};
      }
      ready = true;
      status.textContent = 'SELECT ANY LAYER TO START. SWITCH AT ANY TIME.';
    })().catch(error => {
      loadPromise = undefined;
      ready = false;
      status.textContent = 'A SOUNDTRACK COULD NOT LOAD. PLEASE REFRESH.';
      throw error;
    });
    return loadPromise;
  }

  function stopAudio() {
    for (const source of Object.values(playing)) {
      try { source.stop(); } catch (e) {}
      try { source.disconnect(); } catch (e) {}
    }
    playing = {};
  }
  function startAudio() {
    if (!ready || video.paused || video.ended || video.seeking || context.state !== 'running') return;
    const endsAt = Math.min(...keys.map(key => buffers[key].duration));
    const position = video.currentTime;
    if (position >= endsAt - .01) return;
    stopAudio();
    const when = context.currentTime + .018;
    playStart = when - position / video.playbackRate;
    lastStartAt = context.currentTime;
    for (const key of keys) {
      const source = context.createBufferSource();
      source.buffer = buffers[key];
      source.playbackRate.value = video.playbackRate;
      source.connect(gains[key]);
      source.start(when, Math.max(0, position));
      playing[key] = source;
    }
    setTrack(selected);
    video.muted = true;
  }

  /* A track click is one gesture: switch instantly if already playing,
     or start from the current frame, resetting after the ending. */
  async function startFromGesture() {
    if (!ready || busy) return;
    busy = true;
    try {
      if (video.ended || video.currentTime >= mediaDuration() - .04) video.currentTime = 0;
      video.muted = true;
      const resume = context.resume();
      const movie = video.play();
      await Promise.all([resume, movie]);
      if (!Object.keys(playing).length && !video.paused && !video.seeking) startAudio();
      status.textContent = 'SWITCH TRACKS ANY TIME. PICTURE STAYS IN SYNC.';
    } catch (error) {
      status.textContent = 'COULD NOT START PLAYBACK. SELECT A LAYER AGAIN.';
    } finally {
      busy = false;
      updateUi();
    }
  }
  function togglePlay() {
    if (video.paused || video.ended) startFromGesture();
    else video.pause();
  }

  for (const button of buttons) {
    button.addEventListener('click', () => {
      const key = button.dataset.realStem;
      setTrack(key);
      if (video.paused || video.ended) startFromGesture();
    });
  }
  overlay.addEventListener('click', togglePlay);
  play.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  mute.addEventListener('click', () => {
    silenced = !silenced;
    setTrack(selected);
    updateUi();
  });

  video.addEventListener('play', () => {
    if (context && context.state === 'running') startAudio();
    startAnimation();
    updateUi();
  });
  video.addEventListener('playing', () => {
    if (!Object.keys(playing).length) startAudio();
    startAnimation();
    updateUi();
  });
  video.addEventListener('pause', () => {stopAudio(); stopAnimation(); updateUi();});
  video.addEventListener('ended', () => {stopAudio(); stopAnimation(); updateUi();});
  video.addEventListener('waiting', stopAudio);
  video.addEventListener('stalled', stopAudio);
  video.addEventListener('seeking', () => {stopAudio(); updatePlayhead();});
  video.addEventListener('seeked', () => {
    if (!video.paused && context?.state === 'running') startAudio();
    updatePlayhead();
    updateUi();
  });
  video.addEventListener('ratechange', () => {if (!video.paused) startAudio();});
  video.addEventListener('timeupdate', () => {
    if (context?.state === 'running' && Object.keys(playing).length && !video.paused && !video.seeking) {
      const audioPosition = (context.currentTime - playStart) * video.playbackRate;
      if (Math.abs(video.currentTime - audioPosition) > .25 && context.currentTime - lastStartAt > .35) startAudio();
    }
    updatePlayhead();
    updateUi();
  });
  video.addEventListener('loadedmetadata', () => {updateUi(); updatePlayhead();});
  scrub.addEventListener('pointerdown', () => {isScrubbing = true;});
  scrub.addEventListener('input', () => {
    time.textContent = formatTime(Number(scrub.value)) + ' / ' + formatTime(mediaDuration());
  });
  scrub.addEventListener('change', () => {
    video.currentTime = Number(scrub.value);
    isScrubbing = false;
    updateUi();
    updatePlayhead();
  });
  scrub.addEventListener('pointerup', () => {isScrubbing = false;});
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {if (!video.paused) video.pause(); stopAnimation();}
    else updatePlayhead();
  });
  window.addEventListener('resize', redrawAll);
  new MutationObserver(redrawAll).observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});

  /* Keep the original explainer until every Cloudflare asset has loaded and decoded.
     No broken media player is shown to visitors on a slow or interrupted connection. */
  Promise.all([filmFile, ...Object.values(sources)].map(async filename => {
    const response = await fetch(fileUrl(filename), {method: 'HEAD', mode: 'cors', cache: 'no-store'});
    if (!response.ok) throw Error('Media pending: ' + filename);
  })).then(async () => {
    await prepare();
    demo.hidden = false;
    const fallback = demo.nextElementSibling;
    if (fallback && fallback.classList.contains('sd-layer-room')) fallback.hidden = true;
    updateUi();
    redrawAll();
    updatePlayhead();
  }).catch(() => {});
})();
