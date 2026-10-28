const translationToggle = document.querySelector('#translation-toggle');
translationToggle.addEventListener('click', () => { const hidden = document.querySelector('.reading-text').classList.toggle('translations-hidden'); translationToggle.textContent = hidden ? 'Показать перевод и разбор' : 'Скрыть перевод и разбор'; translationToggle.setAttribute('aria-pressed', String(hidden)); });
const menu = document.querySelector('.sidebar'); const menuToggle = document.querySelector('#menu-toggle');
menuToggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
