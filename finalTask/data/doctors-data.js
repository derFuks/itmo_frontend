// Справочники подключаю файлом пока вместо нормальной бд

(function () {
  'use strict';

  // Кабинеты врачей (координаты почти рандом)
  window.roomsList = [
    {
      idroom: 'r0001',
      name: 'Кабинет травматолога, центр города',
      specialty: 'sp001',
      lat: 59.932,
      lon: 30.36
    },
    {
      idroom: 'r0002',
      name: 'Кабинет невролога, северный район',
      specialty: 'sp002',
      lat: 59.98,
      lon: 30.32
    },
    {
      idroom: 'r0003',
      name: 'Кабинет травматолога, южный район',
      specialty: 'sp001',
      lat: 59.9,
      lon: 30.3
    },
    {
      idroom: 'r0004',
      name: 'Неврологическое отделение, восточный округ',
      specialty: 'sp002',
      lat: 59.94,
      lon: 30.43
    },
    {
      idroom: 'r0005',
      name: 'Травматологический центр, западный округ',
      specialty: 'sp001',
      lat: 59.93,
      lon: 30.27
    }
  ];

  // Справочник специальностей
  window.specialtiesList = [
    {
      idspecialty: 'sp001',
      code: 'trauma',
      title: 'Врач-травматолог',
      description: 'Занимается повреждениями костей, суставов, связок и мышц.'
    },
    {
      idspecialty: 'sp002',
      code: 'neuro',
      title: 'Врач-невролог',
      description: 'Диагностика и лечение заболеваний нервной системы.'
    },
    {
      idspecialty: 'sp003',
      code: 'reumo',
      title: 'Врач-ревматолог',
      description: 'Диагностика и лечение заболеваний ревматологического направления (мелкие суставы, хронические заболевания и т.д)'
    }

  ];

  // Список врачей
  window.doctorsList = [
    {
      iddoctor: 'd000001',
      namefirst: 'Петр',
      namesecond: 'Васильевич',
      namelast: 'Шпак',
      specialty: 'sp001',
      rooms: 'r0001',
      picture: '/media/doc_picture001.png',
      description: 'Стаж работы более 30 лет, специализация — спортивные травмы и переломы.',
      birthdate: '1967-12-01',
      universityenddate: '1989-08-01',
      degree: 'врач высшей категории',
      priceforfirstvisit: '7000 руб.',
      pricefornextvisits: '5000 руб.',
      commets: ''
    },
    {
      iddoctor: 'd000002',
      namefirst: 'Ирина',
      namesecond: 'Юрьевна',
      namelast: 'Комсомольская',
      specialty: 'sp002',
      rooms: 'r0002',
      picture: '/media/doc_picture001.png',
      description: 'Невролог, специализируется на хронических головных болях и нарушениях сна.',
      birthdate: '1982-12-01',
      universityenddate: '1999-08-01',
      degree: 'доктор медицинских наук',
      priceforfirstvisit: '12000 руб.',
      pricefornextvisits: '10500 руб.',
      commets: 'принимает только по вторникам'
    },
    {
      iddoctor: 'd000003',
      namefirst: 'Вахтанг',
      namesecond: 'Анатольевич',
      namelast: 'Захарян',
      specialty: 'sp002',
      rooms: 'r0002',
      picture: '/media/doc_picture001.png',
      description: 'Специалист по восстановлению после инсультов и травм позвоночника.',
      birthdate: '1961-12-01',
      universityenddate: '1994-08-01',
      degree: 'кандидат медицинских наук',
      priceforfirstvisit: '3000 руб.',
      pricefornextvisits: '3000 руб.',
      commets: ''
    },
    {
      iddoctor: 'd000004',
      namefirst: 'Мария',
      namesecond: 'Алексеевна',
      namelast: 'Улетова',
      specialty: 'sp001',
      rooms: 'r0003',
      picture: '/media/doc_picture004.png',
      description: 'Травматолог, ведёт приём пациентов с бытовыми и производственными травмами.',
      birthdate: '1985-05-10',
      universityenddate: '2008-07-01',
      degree: '',
      priceforfirstvisit: '5500 руб.',
      pricefornextvisits: '4000 руб.',
      commets: ''
    },
    {
      iddoctor: 'd000005',
      namefirst: 'Егор',
      namesecond: 'Сергеевич',
      namelast: 'Угарайло',
      specialty: 'sp001',
      rooms: 'r0005',
      picture: '/media/doc_picture005.png',
      description: 'Специализируется на артроскопических операциях и травмах коленного сустава.',
      birthdate: '1979-03-22',
      universityenddate: '2002-07-01',
      degree: 'врач высшей категории',
      priceforfirstvisit: '8000 руб.',
      pricefornextvisits: '6000 руб.',
      commets: ''
    },
    {
      iddoctor: 'd000006',
      namefirst: 'Аллита',
      namesecond: 'Ольгович',
      namelast: 'Руднева',
      specialty: 'sp002',
      rooms: 'r0004',
      picture: '/media/doc_picture006.png',
      description: 'Невролог, ведущий специалист по лечению мигрени и тревожных расстройств.',
      birthdate: '1972-09-15',
      universityenddate: '1995-07-01',
      degree: 'врач высшей категории',
      priceforfirstvisit: '9000 руб.',
      pricefornextvisits: '7000 руб.',
      commets: ''
    },
    {
      iddoctor: 'd000007',
      namefirst: 'Сергей',
      namesecond: 'Сергеевич',
      namelast: 'Малышев',
      specialty: 'sp001',
      rooms: 'r0001',
      picture: '/media/doc_picture007.png',
      description: 'Работает с детскими травмами, особенно переломами и вывихами.',
      birthdate: '1990-01-30',
      universityenddate: '2013-07-01',
      degree: '',
      priceforfirstvisit: '4000 руб.',
      pricefornextvisits: '3500 руб.',
      commets: ''
    },
    {
      iddoctor: 'd000008',
      namefirst: 'Николь',
      namesecond: 'Николаевна',
      namelast: 'Пацюк',
      specialty: 'sp002',
      rooms: 'r0004',
      picture: '/media/doc_picture008.png',
      description: 'Ведёт пациентов с хронической болью в спине и шее, использует комплексный подход.',
      birthdate: '1983-11-02',
      universityenddate: '2006-07-01',
      degree: '',
      priceforfirstvisit: '6500 руб.',
      pricefornextvisits: '4500 руб.',
      commets: ''
    },
    {
      iddoctor: 'd000009',
      namefirst: 'Артемий',
      namesecond: 'Татьянович',
      namelast: 'Лебедев',
      specialty: 'sp001',
      rooms: 'r0005',
      picture: '/media/doc_picture009.png',
      description: 'Специализируется на моральных травмах, нанесенных верстальщиками и UI специалистами.',
      birthdate: '1976-07-19',
      universityenddate: '1999-07-01',
      degree: 'кандидат медицинских наук',
      priceforfirstvisit: '7500 руб.',
      pricefornextvisits: '5500 руб.',
      commets: ''
    }
  ];
}());
