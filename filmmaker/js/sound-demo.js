/* Real film / stem switcher. The old explainer remains visible until R2 assets exist. */
(() => {
  'use strict';
  const base = 'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/sound-design/';
  const sources = {all:'hotel-all.m4a',folley:'hotel-folley.m4a',vo:'hotel-vo.m4a',music:'hotel-music.m4a'};
  const labels = {all:'FULL MIX',folley:'FOLEY & SFX',vo:'VOICEOVER',music:'MUSIC'};
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
  let context, gains = {}, buffers = {}, playing = {}, playStart = 0;
  let selected = 'all', silenced = false, loading, busy = false, isScrubbing = false;
  let refreshTimeout;
  const formatTime = value => {
    const seconds = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
    return String(Math.floor(seconds / 60)).padStart(2,'0') + ':' + String(seconds % 60).padStart(2,'0');
  };
  const updateUi = () => {
    const duration = Number.isFinite(video.duration) ? video.duration : 51.88;
    if (!isScrubbing) scrub.value = String(video.currentTime || 0);
    scrub.max = String(duration);
    time.textContent = formatTime(video.currentTime) + ' / ' + formatTime(duration);
    const running = !video.paused && !video.ended;
    play.textContent = running ? 'PAUSE' : 'PLAY';
    overlay.hidden = running;
    overlay.querySelector('strong').textContent = video.ended ? 'REPLAY THE FILM' : 'PLAY THE FILM';
    mute.textContent = silenced ? 'SOUND OFF' : 'SOUND ON';
    mute.setAttribute('aria-pressed', String(silenced));
  };
  function setTrack(name) {
    if (!Object.hasOwn(sources,name)) return;
    selected = name;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.realStem === name)));
    active.textContent = 'NOW HEARING / ' + labels[name];
    Object.entries(gains).forEach(([key,gain]) => {
      const volume = !silenced && name === key ? 1 : 0;
      gain.gain.cancelScheduledValues(context.currentTime);
      gain.gain.setTargetAtTime(volume, context.currentTime, .008);
    });
  }
  async function prepare() {
    if (loading) return loading;
    loading = (async () => {
      status.textContent = 'LOADING SOUNDTRACKS / KEEP THIS TAB OPEN';
      context = new (window.AudioContext || window.webkitAudioContext)();
      const files = await Promise.all(keys.map(async key => {
        const response = await fetch(base + sources[key], {mode:'cors'});
        if (!response.ok) throw Error('A soundtrack could not load (' + response.status + ')');
        const bytes = await response.arrayBuffer();
        return [key,await context.decodeAudioData(bytes)];
      }));
      for (const [key,buffer] of files) {
        buffers[key] = buffer;
        const gain = context.createGain();
        gain.gain.value = key === selected && !silenced ? 1 : 0;
        gain.connect(context.destination);
        gains[key] = gain;
      }
      status.textContent = 'LISTEN TO EACH LAYER AS THE PICTURE PLAYS.';
    })().catch(e => { loading = undefined;status.textContent = 'Soundtracks could not load. Please retry.';throw e; });
    return loading;
  }
  function stopAudio() {
    Object.values(playing).forEach(source => {try{source.stop()}catch(e){}try{source.disconnect()}catch(e){}});
    playing = {};
  }
  function startAudio() {
    if (!context || keys.some(k => !buffers[k]) || video.paused) return;
    stopAudio();
    const pos = Math.max(0, Math.min(video.currentTime,Math.min(...keys.map(k => buffers[k].duration)) - .02));
    const when = context.currentTime + .018;
    playStart = when - pos / video.playbackRate;
    for (const key of keys) {
      const source = context.createBufferSource();
      source.buffer = buffers[key];
      source.playbackRate.value = video.playbackRate;
      source.connect(gains[key]);
      source.start(when,pos);
      playing[key] = source;
    }
    setTrack(selected);
    video.muted = true;
  }
  async function togglePlay() {
    if (busy) return;
    if (!video.paused) {video.pause();return;}
    busy = true;
    try {
      if (!loading) { prepare().catch(() => {}); return; }
      if (!keys.every(key => buffers[key])) { status.textContent = 'PREPARING THE AUDIO. TRY PLAY AGAIN IN A MOMENT.'; return; }
      if (video.ended || video.currentTime >= video.duration - .04) video.currentTime = 0;
      video.muted = true;
      // Both requests happen in this user gesture for mobile browser playback policies.
      const audioResume = context.resume();
      const videoStart = video.play();
      await Promise.all([audioResume, videoStart]);
    } catch (error) {status.textContent = 'PLAYBACK FAILED. CHECK YOUR CONNECTION AND TRY AGAIN.';}
    finally {busy = false;updateUi();}
  }
  video.addEventListener('play',() => {if (context && keys.every(k => buffers[k])) startAudio();updateUi()});
  video.addEventListener('pause',() => {stopAudio();updateUi()});
  video.addEventListener('ended',() => {stopAudio();updateUi()});
  video.addEventListener('seeking',() => {stopAudio();updateUi()});
  video.addEventListener('seeked',() => {if (!video.paused) startAudio();updateUi()});
  video.addEventListener('ratechange',() => {if (!video.paused) startAudio()});
  video.addEventListener('waiting',stopAudio);
  video.addEventListener('stalled',stopAudio);
  video.addEventListener('playing',() => {if (context && keys.every(k => buffers[k]) && !Object.keys(playing).length) startAudio()});
  video.addEventListener('timeupdate',() => {
    if (context && Object.keys(playing).length && !video.paused) {
      const audioPosition = (context.currentTime - playStart) * video.playbackRate;
      if (Math.abs(video.currentTime - audioPosition) > .20) startAudio();
    }
    updateUi();
  });
  video.addEventListener('loadedmetadata',updateUi);
  play.addEventListener('click',togglePlay);
  overlay.addEventListener('click',togglePlay);
  video.addEventListener('click',togglePlay);
  buttons.forEach(button => button.addEventListener('click',() => setTrack(button.dataset.realStem)));
  mute.addEventListener('click',() => {silenced = !silenced;setTrack(selected);updateUi()});
  scrub.addEventListener('pointerdown',() => {isScrubbing = true});
  scrub.addEventListener('input',() => {time.textContent = formatTime(Number(scrub.value)) + ' / ' + formatTime(video.duration)});
  scrub.addEventListener('change',() => {video.currentTime = Number(scrub.value);isScrubbing = false;updateUi()});
  scrub.addEventListener('pointerup',() => {isScrubbing = false});
  document.addEventListener('visibilitychange',() => {
    if (document.hidden && !video.paused) video.pause();
  });
  // Never replace the working original explainer unless every asset is published.
  Promise.all(['hotel-film.mp4','hotel-poster.jpg',...Object.values(sources)].map(async filename => {
    const response = await fetch(base + filename, {method:'HEAD',mode:'cors',cache:'no-store'});
    if (!response.ok) throw Error('Media pending: ' + filename);
  })).then(() => {
    demo.hidden = false;
    const fallback = demo.nextElementSibling;
    if (fallback && fallback.classList.contains('sd-layer-room')) fallback.hidden = true;
    updateUi();
    prepare().catch(() => {});
  }).catch(() => {});
})();
