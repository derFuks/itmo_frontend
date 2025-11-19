
(function () {
  'use strict';
  const STORAGE_PREFIX = 'spbitmo:html5course';

  // Проверка поддержки Web Storage
  function isStorageAvailable(type) {
    try {
      const storage = window[type];
      const testKey = STORAGE_PREFIX + ':test';
      storage.setItem(testKey, 'ok');
      storage.removeItem(testKey);
      return true;
    } catch (err) {
      console.error('WebStorage у юзера не доступен:', type, err);
      return false;
    }
  }

  // проверка работы хранилок
  (function demoStorage() {
    if (isStorageAvailable('localStorage')) {
      localStorage.setItem(STORAGE_PREFIX + ':lastVisit', new Date().toISOString());
    }

    if (isStorageAvailable('sessionStorage')) {
      if (!sessionStorage.getItem(STORAGE_PREFIX + ':sessionStarted')) {
        sessionStorage.setItem(STORAGE_PREFIX + ':sessionStarted', '1');
      }
    }

    const infoBlock = document.querySelector('.js-storage-info');
    if (infoBlock) {
      const lastVisit = localStorage.getItem(STORAGE_PREFIX + ':lastVisit');
      const sessionFlag = sessionStorage.getItem(STORAGE_PREFIX + ':sessionStarted');
      infoBlock.textContent =
        'Из localStorage время lastVisit = ' +
        (lastVisit || 'нет данных') +
        '; из sessionStorage тяну флаг sessionStarted = ' +
        (sessionFlag || 'нет данных');
    }
  }());



// перенес логику в include.js. Хахах, придется раскомментить обратно, пока хедер отдельным файлом не подключу
  (function initBurger() {
    const burgerBtn = document.querySelector('.js-burger');
    const nav = document.querySelector('.js-main-nav');

    if (!burgerBtn || !nav) {
      // тут может не быть навигации на некоторых страницах
      return;
    }

    burgerBtn.addEventListener('click', function () {
      nav.classList.toggle('nav-opened');
      burgerBtn.classList.toggle('burger--active');
    });
  }());

  // Запись к врачу
  (function initBookingForm() {
    const form = document.querySelector('.js-booking-form');
    if (!form) {
      return;
    }

    const nameInput = form.querySelector('input[name="patientName"]');
    const phoneInput = form.querySelector('input[name="patientPhone"]');
    const doctorSelect = form.querySelector('select[name="doctorId"]');
    const dateInput = form.querySelector('input[name="visitDate"]');
    const commentInput = form.querySelector('textarea[name="comment"]');
    const painInput = form.querySelector('input[name="painLevel"]');
    const statusBox = document.querySelector('.js-form-status');

    function getBookings() {
      if (!isStorageAvailable('sessionStorage')) {
        return [];
      }
      const raw = sessionStorage.getItem(STORAGE_PREFIX + ':bookings');
      if (!raw) {
        return [];
      }
      try {
        return JSON.parse(raw);
      } catch (err) {
        console.error('Ошибка парсинга bookings из sessionStorage', err);
        return [];
      }
    }

    function saveBookings(list) {
      if (!isStorageAvailable('sessionStorage')) {
        console.error('sessionStorage не поддерживается, не сохранить запись. ');
        return;
      }
      sessionStorage.setItem(
        STORAGE_PREFIX + ':bookings',
        JSON.stringify(list)
      );
    }

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();

      if (!nameInput || !phoneInput || !doctorSelect || !dateInput) {
        console.error('Какие-то элементы формы не найдены');
        return;
      }

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const doctorId = doctorSelect.value;
      const date = dateInput.value;
      const comment = commentInput ? commentInput.value.trim() : '';
      const painLevel = painInput ? painInput.value : '';

      if (!name && !phone) {
        console.error('Нужно заполнить хотя бы имя или телефон');
        alert('Введите хотя бы имя или телефон!');
        return;
      }

      if (!doctorId) {
        console.error('Не выбран врач');
        alert('Выберите врача. Даже если не знаете кого выбрать. Операторы скорректируют при необходимости.');
        return;
      }

      if (!date) {
        console.error('Не выбрана дата записи');
        alert('Выберите дату записи.');
        return;
      }

      const bookings = getBookings();
      bookings.push({
        name: name,
        phone: phone,
        doctorId: doctorId,
        date: date,
        comment: comment,
        painLevel: painLevel,
        createdAt: new Date().toISOString()
      });
      saveBookings(bookings);

      if (statusBox) {
        statusBox.textContent =
          'Информация отправлена успешно! Данные записаны в sessionStorage.';
        statusBox.classList.remove('status--error');
        statusBox.classList.add('status--ok');
      } else {
        alert('Информация отправлена успешно!'); //если в верстке не выводится инфа
      }

      // очистка после отправки
      nameInput.value = '';
      phoneInput.value = '';
      dateInput.value = '';
      if (commentInput) {
        commentInput.value = '';
      }
      if (painInput) {
        painInput.value = '5';
      }
    });
  }());

  (function fillDoctorSelects() {
    // doctorsList приходит из файла data/doctors-data.js через window
    if (!window.doctorsList) {
      return;
    }
    const selects = document.querySelectorAll('select[data-doctors-select]');
    if (!selects || selects.length === 0) {
      return;
    }

    selects.forEach(function (select) {
      // проверка на null есть, но тут сама переменная select уже есть
      window.doctorsList.forEach(function (doc) {
        const opt = document.createElement('option');
        opt.value = doc.iddoctor;
        opt.textContent = doc.namelast + ' ' + doc.namefirst + ' — ' + doc.description;
        select.appendChild(opt);
      });
    });
  }());

  // Вывод врачей на странице doctors
  (function renderDoctorsList() {
    const container = document.querySelector('.js-doctors-list');
    if (!container || !window.doctorsList || !window.roomsList || !window.specialtiesList) {
      return;
    }

    function findRoomById(id) {
      return window.roomsList.find(function (r) { return r.idroom === id; });
    }

    function findSpecById(id) {
      return window.specialtiesList.find(function (s) { return s.idspecialty === id; });
    }

    window.doctorsList.forEach(function (doc) {
      const room = findRoomById(doc.rooms);
      const spec = findSpecById(doc.specialty);

      const card = document.createElement('article');
      card.className = 'doctor-card';

      const specTitle = spec ? spec.title : 'Специальность';

      card.innerHTML = `
        <figure class="doctor-card__img-wrap">
          <img src="${doc.picture}" alt="Фотография врача ${doc.namelast}" class="doctor-card__img">
        </figure>
        <div class="doctor-card__body">
          <h3 class="doctor-card__title">
            ${doc.namelast} ${doc.namefirst} ${doc.namesecond || ''}
          </h3>
          <p class="doctor-card__spec">${specTitle}</p>
          <p class="doctor-card__text">${doc.description}</p>
          <p class="doctor-card__meta">
            Стаж с ${doc.universityenddate.slice(0, 4)} года
            ${doc.degree ? ' · ' + doc.degree : ''}
          </p>
          <p class="doctor-card__prices">
            Первый приём: <strong>${doc.priceforfirstvisit}</strong><br>
            Повторный приём: <strong>${doc.pricefornextvisits}</strong>
          </p>
          <p class="doctor-card__room">
            Кабинет: ${room ? room.name : 'уточняется'}
          </p>
          <a href="booking.html" class="btn btn-line doctor-card__btn">Записаться</a>
        </div>
      `;

      container.appendChild(card);
    });
  }());
}());
