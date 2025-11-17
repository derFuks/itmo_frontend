(function () {
  'use strict';

  // утилита для вставки HTML-фрагмента, не мое
  function loadFragment(targetSelector, url, callback) {
    var target = document.querySelector(targetSelector);
    if (!target) {
      // если блока нет на странице - просто выходим
      return;
    }
    // проверяем наличие fetch (на всякий случай для старых браузеров)
    if (typeof window.fetch !== 'function') {
      console.error('fetch не поддерживается, include для', url, 'не сработает');
      return;
    }

    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          // тут просто логирует
          console.error('Не удалось загрузить фрагмент:', url, response.status);
          return '';
        }
        return response.text();
      })
      .then(function (html) {
        if (!html) {
          return;
        }
        target.innerHTML = html;
        if (typeof callback === 'function') {
          callback();
        }
      })
      .catch(function (err) {
        console.error('Ошибка при загрузке фрагмента', url, err);
      });
  }


  
  function initHeaderBehavior() {
    var burgerBtn = document.querySelector('.js-burger');
    var nav = document.querySelector('.js-main-nav');

    if (!burgerBtn || !nav) {
      // если на какой-то странице не запланировал навигацию - тоже ок
      return;
    }

    burgerBtn.addEventListener('click', function () {
      nav.classList.toggle('nav-opened');
      burgerBtn.classList.toggle('burger--active');
    });
  }

  // Запускаем всё после полной загрузки DOM
  document.addEventListener('DOMContentLoaded', function () {
    // header
    loadFragment('[data-include="header"]', 'header.html', function () {
      // после того как шапка реально вставилась
      initHeaderBehavior();
    });

    loadFragment('[data-include="footer"]', 'footer.html');
  });
}());
