const gradeView = document.querySelector('.grade-view');
if (gradeView) {
  const slider = gradeView.querySelector('input');
  slider.addEventListener('input', () => {
    gradeView.style.setProperty('--split', slider.value + '%');
    slider.setAttribute('aria-valuetext', slider.value + '% before');
  });

  const frameButtons = document.querySelectorAll('.grade-choices button');
  frameButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const frame = '/assets/filmmaker/' + button.dataset.frame + '/t.jpg';
      gradeView.querySelectorAll('img').forEach((image) => { image.src = frame; });
      frameButtons.forEach((choice) => {
        choice.setAttribute('aria-pressed', String(choice === button));
      });
    });
  });
}
