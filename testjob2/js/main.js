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