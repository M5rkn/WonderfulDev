document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.theme-toggle');
  const body = document.body;
  const darkClass = 'theme-dark';
  const lightClass = 'theme-light';
  const iconSun = document.querySelector('.icon-sun');
  const iconMoon = document.querySelector('.icon-moon');

  function updateIcon() {
    if (body.classList.contains(darkClass)) {
      iconSun.style.display = '';
      iconMoon.style.display = 'none';
    } else {
      iconSun.style.display = 'none';
      iconMoon.style.display = '';
    }
  }

  // Проверка сохранённой темы
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    body.classList.add(lightClass);
    body.classList.remove(darkClass);
  } else {
    body.classList.add(darkClass);
    body.classList.remove(lightClass);
  }
  updateIcon();

  btn.addEventListener('click', function () {
    if (body.classList.contains(darkClass)) {
      body.classList.remove(darkClass);
      body.classList.add(lightClass);
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove(lightClass);
      body.classList.add(darkClass);
      localStorage.setItem('theme', 'dark');
    }
    updateIcon();
  });
});

// Custom cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

function moveCursor(e) {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
}
document.addEventListener('mousemove', moveCursor);

function setCursorHover(state) {
  if (state) cursor.classList.add('cursor-hover');
  else cursor.classList.remove('cursor-hover');
}

['a', 'button', '.see-more', '.theme-toggle', '.hero-link'].forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    el.addEventListener('mouseenter', () => setCursorHover(true));
    el.addEventListener('mouseleave', () => setCursorHover(false));
  });
});

// Скрывать кастомный курсор на мобильных
function checkTouch() {
  if ('ontouchstart' in window) cursor.style.display = 'none';
}
window.addEventListener('touchstart', checkTouch);
checkTouch();

// Валидация и отправка формы контактов
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const formError = document.getElementById('formError');
  const formSuccess = document.getElementById('formSuccess');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.style.display = 'none';
    formSuccess.style.display = 'none';
    const name = contactForm.elements['name'].value.trim();
    const email = contactForm.elements['email'].value.trim();
    const message = contactForm.elements['message'].value.trim();
    // Проверка
    if (!name || !email || !message) {
      formError.textContent = 'Пожалуйста, заполните все поля.';
      formError.style.display = 'block';
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      formError.textContent = 'Введите корректный email.';
      formError.style.display = 'block';
      return;
    }
    // Отправка
    const formData = new FormData(contactForm);
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        formSuccess.textContent = 'Сообщение отправлено!';
        formSuccess.style.display = 'block';
        contactForm.reset();
      } else {
        formError.textContent = 'Ошибка отправки. Попробуйте позже.';
        formError.style.display = 'block';
      }
    } catch {
      formError.textContent = 'Ошибка сети. Попробуйте позже.';
      formError.style.display = 'block';
    }
  });
}

// Переключатель языка
const langBtn = document.querySelector('.lang-toggle');
const langData = {
  ru: {
    index: {
      title: 'Я — Марк',
      subtitle: 'Веб-разработчик. Преобразую идеи в элегантные и функциональные веб-проекты, объединяя креативный дизайн с современными технологиями.',
      more: 'Подробнее обо мне',
      contacts: 'Контакты',
      about: 'Обо мне',
      projects: 'Проекты',
      send: 'Отправить сообщение',
      back: 'Вернуться на главную',
      name: 'Имя',
      email: 'Email',
      message: 'Сообщение',
      contactTitle: 'Контакты.',
      contactDesc: 'Свяжитесь со мной или напишите напрямую на <b>markoilynickiy@gmail.com</b>',
      success: 'Сообщение отправлено!',
      error: 'Ошибка отправки. Попробуйте позже.',
      fill: 'Пожалуйста, заполните все поля.',
      emailErr: 'Введите корректный email.',
      footer: '© 2025 WonderfulDev. Все права защищены.'
    },
    nav: ['Обо мне', 'Проекты', 'Контакты'],
    about: {
      title: 'Обо мне',
      intro1: 'Веб-разработчик. Преобразую идеи в элегантные и функциональные веб-проекты, объединяя креативный дизайн с современными технологиями. Мой подход — это баланс между эстетикой, скоростью и удобством для пользователя.',
      intro2: 'Мой стек: <b>React</b>, <b>Vue.js</b>, <b>JavaScript/TypeScript</b>, <b>Node.js</b>, <b>MongoDB</b>, <b>Figma</b>, <b>UI/UX</b>. Специализируюсь на создании современных сайтов, веб-приложений, интернет-магазинов и корпоративных порталов. В работе использую только актуальные инструменты и лучшие практики.',
      intro3: 'Если вы хотите получить современный сайт, который будет работать быстро, удобно и приносить результат — <a href="contacts.html" class="hero-link">свяжитесь со мной</a>.',
      blocks: [
        {
          h: 'Профессиональный подход',
          t: 'Я — веб-разработчик с опытом создания современных сайтов и приложений. Мой фокус — не только на внешней красоте, но и на удобстве, скорости и безопасности. Использую только актуальные технологии и стандарты.'
        },
        {
          h: 'Технические навыки',
          t: '<ul><li>Frontend: React, Vue.js, JavaScript/TypeScript</li><li>Backend: Node.js, Express, MongoDB</li><li>UI/UX: Figma, Adobe XD</li><li>DevOps: Git, Docker, CI/CD</li></ul>'
        },
        {
          h: 'Продуктовый взгляд',
          t: 'Понимаю бизнес-задачи, умею анализировать требования и предлагать решения, которые работают на результат. Веду проекты от идеи до запуска, всегда на связи с заказчиком.'
        },
        {
          h: 'Обучение и развитие',
          t: '<ul><li>Human Centered Design, Acumen</li><li>Data Structure & Algorithms, Udemy</li><li>Adaptive Leadership, edX</li><li>Learning to Learn, Udemy</li><li>Постоянное саморазвитие</li></ul>'
        },
        {
          h: 'Мои плейлисты',
          t: '<ul><li>Rap UK - One of the finest rap in UK. Cover: Aitch</li><li>Chill Lofi Study Beats - The perfect study beats, twenty four seven. with over 178 SONGS</li><li>Mood Booster 🎅🏽 - Get happy with today\'s dose of feel-good songs!</li></ul>'
        }
      ]
    },
    projects: {
      title: 'Проекты.',
      cards: [
        {
          name: 'Платформа обучения',
          desc: 'Система онлайн-курсов с личным кабинетом, прогрессом и тестированием.'
        },
        {
          name: 'CRM для агентства',
          desc: 'Автоматизация работы агентства: клиенты, задачи, аналитика, отчёты.'
        },
        {
          name: 'UI/UX-дизайн платформы',
          desc: 'Дизайн и прототипирование сложных интерфейсов для SaaS и мобильных приложений.'
        },
        {
          name: 'Интернет-магазин',
          desc: 'Магазин с фильтрами, корзиной, оплатой и админ-панелью для управления товарами.'
        },
        {
          name: 'Калькулятор стоимости',
          desc: 'Интерактивный калькулятор для расчёта стоимости услуг под задачи клиента.'
        },
        {
          name: 'Портал для стартапа',
          desc: 'Платформа для презентации и продвижения стартапа с блогом и формой обратной связи.'
        }
      ]
    }
  },
  en: {
    index: {
      title: 'I am Mark',
      subtitle: 'Web developer. I turn ideas into elegant and functional web projects, combining creative design with modern technologies.',
      more: 'Learn more about me',
      contacts: 'Contact',
      about: 'About',
      projects: 'Projects',
      send: 'Send Message',
      back: 'Go Back Home',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      contactTitle: 'Contact.',
      contactDesc: 'Get in touch or email me directly at <b>markoilynickiy@gmail.com</b>',
      success: 'Message sent!',
      error: 'Sending error. Try again later.',
      fill: 'Please fill in all fields.',
      emailErr: 'Enter a valid email.',
      footer: '© 2025 WonderfulDev. All rights reserved.'
    },
    nav: ['About', 'Projects', 'Contact'],
    about: {
      title: 'About',
      intro1: 'Web developer. I turn ideas into elegant and functional web projects, combining creative design with modern technologies. My approach is a balance between aesthetics, speed, and user convenience.',
      intro2: 'My stack: <b>React</b>, <b>Vue.js</b>, <b>JavaScript/TypeScript</b>, <b>Node.js</b>, <b>MongoDB</b>, <b>Figma</b>, <b>UI/UX</b>. I specialize in modern websites, web apps, e-commerce, and corporate portals. I use only up-to-date tools and best practices.',
      intro3: 'If you want a modern website that works fast, is convenient, and brings results — <a href="contacts.html" class="hero-link">contact me</a>.',
      blocks: [
        {
          h: 'Professional Approach',
          t: 'I am a web developer with experience in creating modern websites and apps. My focus is not only on appearance, but also on usability, speed, and security. I use only up-to-date technologies and standards.'
        },
        {
          h: 'Technical Skills',
          t: '<ul><li>Frontend: React, Vue.js, JavaScript/TypeScript</li><li>Backend: Node.js, Express, MongoDB</li><li>UI/UX: Figma, Adobe XD</li><li>DevOps: Git, Docker, CI/CD</li></ul>'
        },
        {
          h: 'Product Mindset',
          t: 'I understand business tasks, can analyze requirements and offer solutions that deliver results. I lead projects from idea to launch, always in touch with the client.'
        },
        {
          h: 'Learning & Growth',
          t: '<ul><li>Human Centered Design, Acumen</li><li>Data Structure & Algorithms, Udemy</li><li>Adaptive Leadership, edX</li><li>Learning to Learn, Udemy</li><li>Constant self-development</li></ul>'
        },
        {
          h: 'My Playlists',
          t: '<ul><li>Rap UK - One of the finest rap in UK. Cover: Aitch</li><li>Chill Lofi Study Beats - The perfect study beats, twenty four seven. with over 178 SONGS</li><li>Mood Booster 🎅🏽 - Get happy with today\'s dose of feel-good songs!</li></ul>'
        }
      ]
    },
    projects: {
      title: 'Projects.',
      cards: [
        {
          name: 'Learning Platform',
          desc: 'Online course system with personal account, progress tracking, and testing.'
        },
        {
          name: 'Agency CRM',
          desc: 'Automation for agencies: clients, tasks, analytics, and reporting.'
        },
        {
          name: 'Platform UI/UX Design',
          desc: 'Design and prototyping of complex interfaces for SaaS and mobile apps.'
        },
        {
          name: 'E-commerce',
          desc: 'Store with filters, cart, payment, and admin panel for product management.'
        },
        {
          name: 'Cost Calculator',
          desc: 'Interactive calculator for estimating service costs for client needs.'
        },
        {
          name: 'Startup Portal',
          desc: 'A platform for presenting and promoting a startup with a blog and feedback form.'
        }
      ]
    }
  }
};

function setLang(lang) {
  localStorage.setItem('lang', lang);
  if (document.querySelector('.lang-toggle')) {
    document.querySelector('.lang-toggle').textContent = lang === 'ru' ? 'EN' : 'RU';
  }
  // index.html
  if (document.querySelector('.hero')) {
    const d = langData[lang].index;
    document.querySelector('.hero h1').textContent = d.title;
    document.querySelector('.hero .subtitle').textContent = d.subtitle;
    document.querySelector('.see-more').innerHTML = d.more + ' <span class="arrow-anim">&rarr;</span>';
    // nav
    document.querySelectorAll('.nav-list a')[0].textContent = d.about;
    document.querySelectorAll('.nav-list a')[1].textContent = d.projects;
    document.querySelectorAll('.nav-list a')[2].textContent = d.contacts;
  }
  // contacts.html
  if (document.querySelector('.contact-section')) {
    const d = langData[lang].index;
    document.querySelector('.contact-title').textContent = d.contactTitle;
    document.querySelector('.contact-desc').innerHTML = d.contactDesc;
    document.querySelector('input[name="name"]').placeholder = d.name;
    document.querySelector('input[name="email"]').placeholder = d.email;
    document.querySelector('textarea[name="message"]').placeholder = d.message;
    document.querySelector('.btn-primary').textContent = d.send;
    document.querySelector('.back-link').innerHTML = d.back + ' <span class="arrow">→</span>';
    // nav
    document.querySelectorAll('.nav-list a')[0].textContent = d.about;
    document.querySelectorAll('.nav-list a')[1].textContent = d.projects;
    document.querySelectorAll('.nav-list a')[2].textContent = d.contacts;
  }
  // about.html
  if (document.querySelector('.about-section')) {
    const d = langData[lang].about;
    document.querySelector('.about-title').textContent = d.title;
    const intro = document.querySelectorAll('.about-intro p');
    if (intro.length === 3) {
      intro[0].textContent = d.intro1;
      intro[1].innerHTML = d.intro2;
      intro[2].innerHTML = d.intro3;
    }
    // Блоки
    const blocks = document.querySelectorAll('.about-line');
    d.blocks.forEach((b, i) => {
      if (!blocks[i]) return;
      blocks[i].querySelector('h3').textContent = b.h;
      blocks[i].querySelector('.about-line-content p, .about-line-content ul').innerHTML = b.t;
    });
    // nav
    document.querySelectorAll('.nav-list a')[0].textContent = langData[lang].nav[0];
    document.querySelectorAll('.nav-list a')[1].textContent = langData[lang].nav[1];
    document.querySelectorAll('.nav-list a')[2].textContent = langData[lang].nav[2];
  }
  // projects.html
  if (document.querySelector('.projects-section')) {
    const d = langData[lang].projects;
    document.querySelector('.projects-title').textContent = d.title;
    const cards = document.querySelectorAll('.project-card');
    d.cards.forEach((c, i) => {
      if (!cards[i]) return;
      cards[i].querySelector('.project-name').textContent = c.name;
      cards[i].querySelector('.project-desc').textContent = c.desc;
    });
    // nav
    document.querySelectorAll('.nav-list a')[0].textContent = langData[lang].nav[0];
    document.querySelectorAll('.nav-list a')[1].textContent = langData[lang].nav[1];
    document.querySelectorAll('.nav-list a')[2].textContent = langData[lang].nav[2];
  }
  // футер
  const footer = document.querySelector('footer.footer small');
  if (footer) {
    footer.textContent = langData[lang].footer;
  }
}
if (langBtn) {
  langBtn.addEventListener('click', () => {
    const cur = localStorage.getItem('lang') || 'ru';
    setLang(cur === 'ru' ? 'en' : 'ru');
  });
}
// При загрузке страницы
setLang(localStorage.getItem('lang') || 'ru'); 