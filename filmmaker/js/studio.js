const themeToggle = document.querySelector('[data-theme-toggle]');
const themeRoot = document.documentElement;
function labelTheme() {
  const light = themeRoot.dataset.theme === 'light';
  themeToggle.textContent = light ? 'Dark' : 'Light';
  themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
}
labelTheme();
themeToggle.addEventListener('click', () => {
  themeRoot.dataset.theme = themeRoot.dataset.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('bp-preview-theme', themeRoot.dataset.theme);
  labelTheme();
});

const cuts = [...document.querySelectorAll('[data-cut]')];
cuts.forEach((button) => button.addEventListener('click', () => {
  const image = document.querySelector('.edit-monitor img');
  image.src = '/assets/filmmaker/' + button.dataset.cut + '/t.jpg';
  image.alt = button.textContent.trim() + ' frame from the sample timeline';
  cuts.forEach((cut) => cut.setAttribute('aria-pressed', String(cut === button)));
}));

const strip = document.querySelector('.kit-strip');
document.querySelectorAll('[data-kit-step]').forEach((button) => button.addEventListener('click', () => {
  const distance = strip.firstElementChild.getBoundingClientRect().width + 12;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  strip.scrollBy({left: distance * Number(button.dataset.kitStep), behavior: reducedMotion ? 'instant' : 'smooth'});
}));

const video = document.querySelector('.sound-room video');
if (video) {
  const play = document.querySelector('[data-play]');
  const choices = [...document.querySelectorAll('[data-mix]')];
  const clock = document.querySelector('.sound-controls output');
  let context;
  let gains;
  let selected = 0;
  function connectAudio() {
    if (context) return;
    context = new AudioContext();
    const source = context.createMediaElementSource(video);
    const split = context.createChannelSplitter(2);
    source.connect(split);
    gains = choices.map((_, index) => {
      const gain = context.createGain();
      gain.gain.value = Number(selected === index);
      split.connect(gain, index);
      gain.connect(context.destination);
      return gain;
    });
  }
  play.addEventListener('click', async () => {
    if (!video.paused) { video.pause(); return; }
    try {
      connectAudio();
      await context.resume();
      await video.play();
    } catch {
      clock.textContent = 'Playback unavailable';
    }
  });
  choices.forEach((button) => button.addEventListener('click', () => {
    selected = Number(button.dataset.mix);
    if (gains) gains.forEach((gain, index) => {
      gain.gain.setTargetAtTime(Number(index === selected), context.currentTime, .012);
    });
    choices.forEach((choice) => choice.setAttribute('aria-pressed', String(choice === button)));
  }));
  video.addEventListener('play', () => { play.textContent = 'Pause'; });
  video.addEventListener('pause', () => { play.textContent = 'Play'; });
  video.addEventListener('timeupdate', () => {
    const seconds = Math.floor(video.currentTime);
    clock.textContent = String(Math.floor(seconds / 60)).padStart(2,'0') + ':' + String(seconds % 60).padStart(2,'0');
  });
}
