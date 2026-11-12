/* Shared interactions for the service portfolios. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  document.querySelectorAll('[data-svc-browser]').forEach(function (browser) {
    var image = browser.querySelector('[data-svc-image]');
    var heading = browser.querySelector('[data-svc-title]');
    var description = browser.querySelector('[data-svc-description]');
    var caption = browser.querySelector('[data-svc-caption]');
    var counter = browser.querySelector('[data-svc-counter]');
    var link = browser.querySelector('[data-svc-link]');
    var buttons = Array.from(browser.querySelectorAll('[data-svc-choice]'));
    if (!image || !buttons.length) return;

    function choose(button) {
      var index = buttons.indexOf(button);
      if (index < 0) return;
      buttons.forEach(function (item) {
        item.setAttribute('aria-pressed', String(item === button));
      });
      var nextSrc = button.dataset.image;
      if (nextSrc && image.getAttribute('src') !== nextSrc) {
        image.style.opacity = '.45';
        image.onload = function () { image.style.opacity = '1'; };
        image.onerror = function () { image.style.opacity = '1'; };
        image.src = nextSrc;
      }
      image.alt = button.dataset.alt || button.textContent.trim();
      if (heading) heading.textContent = button.dataset.title || button.textContent.trim();
      if (description) description.textContent = button.dataset.description || '';
      if (caption) caption.textContent = button.dataset.caption || '';
      if (counter) counter.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(buttons.length).padStart(2, '0');
      if (link) {
        if (button.dataset.link) {
          link.href = button.dataset.link;
          link.hidden = false;
        } else {
          link.hidden = true;
        }
      }
    }

    buttons.forEach(function (button, index) {
      button.addEventListener('click', function () { choose(button); });
      button.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        var offset = event.key === 'ArrowRight' ? 1 : -1;
        var next = buttons[(index + offset + buttons.length) % buttons.length];
        choose(next);
        next.focus();
      });
      if (browser.hasAttribute('data-svc-hover-preview')) {
        button.addEventListener('pointerenter', function (event) {
          if (event.pointerType === 'mouse') choose(button);
        });
      }
    });
  });

  var soundRoot = document.querySelector('[data-svc-sound]');
  if (!soundRoot) return;
  var video = soundRoot.querySelector('[data-svc-video]');
  var playButton = soundRoot.querySelector('[data-svc-play]');
  var mixButtons = Array.from(soundRoot.querySelectorAll('[data-svc-mix]'));
  var muteButton = soundRoot.querySelector('[data-svc-mute]');
  var seek = soundRoot.querySelector('[data-svc-seek]');
  var timer = soundRoot.querySelector('[data-svc-time]');
  var message = soundRoot.querySelector('[data-svc-message]');
  var canvas = soundRoot.querySelector('[data-svc-wave]');
  if (!video || !playButton || !canvas) return;

  var audioContext = null, analyser = null, master = null, gains = null, selected = 0;
  var muted = false, frame = null, waveContext = canvas.getContext('2d');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  video.removeAttribute('controls');

  function stamp(time) {
    if (!Number.isFinite(time)) return '00:00';
    var t = Math.max(0, Math.floor(time));
    return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
  }

  function updateClock() {
    if (timer) timer.textContent = stamp(video.currentTime) + ' / ' + stamp(video.duration);
    if (seek && Number.isFinite(video.duration) && video.duration > 0) {
      seek.value = String(Math.round(video.currentTime / video.duration * 1000));
    }
  }

  function setMix(index) {
    selected = index;
    mixButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(Number(button.dataset.svcMix) === selected));
    });
    if (gains && audioContext) {
      gains.forEach(function (gain, i) {
        gain.gain.setTargetAtTime(i === selected ? 1 : 0, audioContext.currentTime, .018);
      });
    }
  }

  function buildAudioGraph() {
    if (audioContext) return;
    var Constructor = window.AudioContext || window.webkitAudioContext;
    if (!Constructor) throw new Error('Web Audio unavailable');
    audioContext = new Constructor();
    var source = audioContext.createMediaElementSource(video);
    var channels = audioContext.createChannelSplitter(2);
    master = audioContext.createGain();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = .65;
    gains = [audioContext.createGain(), audioContext.createGain()];
    source.connect(channels);
    channels.connect(gains[0], 0);
    channels.connect(gains[1], 1);
    gains.forEach(function (gain, i) {
      gain.gain.value = i === selected ? 1 : 0;
      gain.connect(master);
    });
    master.gain.value = muted ? 0 : 1;
    master.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  async function togglePlay() {
    if (!video.paused) { video.pause(); return; }
    try {
      buildAudioGraph();
      await audioContext.resume();
      await video.play();
      if (message) message.textContent = 'Switch between the two mixes while the clip plays. The picture stays in sync.';
    } catch (error) {
      if (message) message.textContent = 'The interactive audio player could not start. Use the video controls to try the clip directly.';
      video.setAttribute('controls', '');
      try { await video.play(); } catch (ignored) {}
    }
  }

  function setMuted(next) {
    muted = next;
    muteButton.setAttribute('aria-pressed', String(muted));
    muteButton.textContent = muted ? 'UNMUTE' : 'MUTE';
    if (master && audioContext) {
      master.gain.setTargetAtTime(muted ? 0 : 1, audioContext.currentTime, .018);
    } else {
      video.muted = muted;
    }
  }

  function sizeCanvas() {
    if (!waveContext) return;
    var width = Math.max(240, canvas.getBoundingClientRect().width);
    var height = 120;
    var ratio = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    waveContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawWave();
  }

  function drawWave() {
    if (!waveContext) return;
    var w = canvas.width / Math.min(2, window.devicePixelRatio || 1);
    var h = canvas.height / Math.min(2, window.devicePixelRatio || 1);
    waveContext.clearRect(0, 0, w, h);
    waveContext.fillStyle = '#09100a';
    waveContext.fillRect(0, 0, w, h);
    waveContext.strokeStyle = '#2b3d2a';
    waveContext.lineWidth = 1;
    for (var y = 20; y < h; y += 20) {
      waveContext.beginPath();
      waveContext.moveTo(0, y + .5);
      waveContext.lineTo(w, y + .5);
      waveContext.stroke();
    }
    waveContext.beginPath();
    waveContext.lineWidth = 2;
    waveContext.strokeStyle = '#d7ff3a';
    if (analyser && !video.paused) {
      var buffer = new Uint8Array(analyser.fftSize);
      analyser.getByteTimeDomainData(buffer);
      for (var x = 0; x < w; x += 2) {
        var sample = buffer[Math.min(buffer.length - 1, Math.floor((x / w) * buffer.length))];
        var level = (sample - 128) / 128;
        if (x === 0) waveContext.moveTo(x, h / 2 + level * h * .39);
        else waveContext.lineTo(x, h / 2 + level * h * .39);
      }
    } else {
      waveContext.moveTo(0, h / 2);
      waveContext.lineTo(w, h / 2);
    }
    waveContext.stroke();
  }

  function frameLoop() {
    drawWave();
    if (!video.paused && !reducedMotion) frame = requestAnimationFrame(frameLoop);
  }

  playButton.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  mixButtons.forEach(function (button) {
    button.addEventListener('click', function () { setMix(Number(button.dataset.svcMix)); });
  });
  if (muteButton) muteButton.addEventListener('click', function () { setMuted(!muted); });
  if (seek) seek.addEventListener('input', function () {
    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Number(seek.value) / 1000 * video.duration;
      updateClock();
    }
  });
  video.addEventListener('timeupdate', updateClock);
  video.addEventListener('loadedmetadata', updateClock);
  video.addEventListener('play', function () {
    playButton.textContent = 'PAUSE';
    cancelAnimationFrame(frame);
    if (!reducedMotion) frame = requestAnimationFrame(frameLoop);
    else drawWave();
  });
  video.addEventListener('pause', function () {
    playButton.textContent = 'PLAY';
    if (frame) cancelAnimationFrame(frame);
    drawWave();
  });
  video.addEventListener('ended', function () {
    playButton.textContent = 'REPLAY';
    if (frame) cancelAnimationFrame(frame);
    drawWave();
  });
  soundRoot.addEventListener('keydown', function (event) {
    if (event.target && event.target.tagName === 'INPUT') return;
    if (event.key === '1' || event.key === '2') {
      event.preventDefault();
      setMix(Number(event.key) - 1);
    }
  });
  window.addEventListener('resize', sizeCanvas, {passive:true});
  sizeCanvas();
  updateClock();
  setMix(0);
})();
