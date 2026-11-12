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

  /* The dedicated sound page retains its newer, independent listening-room player. */
})();
