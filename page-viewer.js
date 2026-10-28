const reader = document.querySelector('#page-reader');
const stage = document.querySelector('#reader-stage');
const pagesContainer = document.querySelector('.reader-pages');
const papers = [...document.querySelectorAll('.reader-paper')];
const firstPage = Number(reader.dataset.firstPage || 116);
const lessonNumber = reader.dataset.lesson || '9';
const pageStorageKey = 'francais-lesson-' + lessonNumber + '-page';
const qualityStorageKey = 'francais-lesson-' + lessonNumber + '-quality';
const thumbnails = [...document.querySelectorAll('.reader-thumbnail')];
const pageSelect = document.querySelector('#page-select');
const previousButton = document.querySelector('#previous-page');
const nextButton = document.querySelector('#next-page');
const thumbnailToggle = document.querySelector('#thumbnails-toggle');
const zoomOut = document.querySelector('#zoom-out');
const zoomIn = document.querySelector('#zoom-in');
const zoomLabel = document.querySelector('#zoom-reset');
const fitWidthButton = document.querySelector('#fit-width');
const fitPageButton = document.querySelector('#fit-page');
const fullscreenButton = document.querySelector('#fullscreen-toggle');
const qualityButton = document.querySelector('#quality-toggle');
const pageSizes = papers.map(paper => { const image = paper.querySelector('img'); return [Number(image.getAttribute('width')),Number(image.getAttribute('height'))]; });
const narrowScreen = window.matchMedia('(max-width:720px)');
let currentIndex = 0;
let currentWidth = 730;
let fitMode = 'width';
let scrollFrame = null;
let resizeFrame = null;
function savedPage() { try { return Number(localStorage.getItem(pageStorageKey)) - firstPage; } catch { return -1; } }
const hashMatch = location.hash.match(/^#page-(\d+)$/);
let initialIndex = hashMatch ? Number(hashMatch[1]) - firstPage : savedPage();
if (!Number.isInteger(initialIndex) || initialIndex < 0 || initialIndex >= papers.length) initialIndex = 0;

function updateCurrent(index) {
  currentIndex = Math.max(0, Math.min(papers.length - 1, index));
  pageSelect.value = String(currentIndex);
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === papers.length - 1;
  thumbnails.forEach((thumbnail, i) => {
    if (i === currentIndex) thumbnail.setAttribute('aria-current', 'page');
    else thumbnail.removeAttribute('aria-current');
  });
  document.querySelector('#reader-position').textContent = (currentIndex + 1) + ' из ' + papers.length + ' страниц';
  try { localStorage.setItem(pageStorageKey, String(firstPage + currentIndex)); } catch {}
  history.replaceState(null, '', '#page-' + (firstPage + currentIndex));
}

function goToPage(index) {
  updateCurrent(index);
  stage.scrollTo({ top: papers[currentIndex].offsetTop - 14, behavior: 'auto' });
}

function setPaperWidth(width, mode, preservePosition = true) {
  if (resizeFrame !== null) { cancelAnimationFrame(resizeFrame); resizeFrame = null; }
  const paper = papers[currentIndex];
  const relativeTop = (stage.scrollTop - paper.offsetTop) / paper.offsetHeight;
  currentWidth = Math.round(mode ? Math.max(1, width) : Math.max(73, Math.min(2200, width)));
  fitMode = mode;
  if (mode) pagesContainer.dataset.fit = mode;
  else delete pagesContainer.dataset.fit;
  pagesContainer.style.setProperty('--paper-width', currentWidth + 'px');
  zoomLabel.textContent = Math.round(currentWidth / 730 * 100) + '%';
  zoomOut.disabled = currentWidth <= 73;
  zoomIn.disabled = currentWidth >= 2200;
  fitWidthButton.setAttribute('aria-pressed', String(mode === 'width'));
  fitPageButton.setAttribute('aria-pressed', String(mode === 'page'));
  if (preservePosition) {
    stage.scrollTop = paper.offsetTop + relativeTop * paper.offsetHeight;
    stage.scrollLeft = Math.max(0, (pagesContainer.scrollWidth - stage.clientWidth) / 2);
  }
}

function fittedWidth(mode) {
  const pagePadding = getComputedStyle(pagesContainer);
  const availableWidth = Math.max(1, stage.clientWidth - parseFloat(pagePadding.paddingLeft) - parseFloat(pagePadding.paddingRight));
  if (mode === 'page') {
    const [width,height] = pageSizes[currentIndex];
    return Math.min(availableWidth, (stage.clientHeight - 64) * width / height);
  }
  return availableWidth;
}

function fit(mode) { setPaperWidth(fittedWidth(mode), mode); }
function changeZoom(direction) {
  const scale = Math.round(currentWidth / 730 * 100);
  const nextScale = direction > 0 ? Math.floor(scale / 25) * 25 + 25 : Math.ceil(scale / 25) * 25 - 25;
  setPaperWidth(nextScale / 100 * 730, null);
}
function setThumbnails(open) {
  reader.classList.toggle('thumbnails-hidden', !open);
  thumbnailToggle.setAttribute('aria-expanded', String(open));
  if (fitMode && !narrowScreen.matches) fit(fitMode);
}

pageSelect.addEventListener('change', () => goToPage(Number(pageSelect.value)));
previousButton.addEventListener('click', () => goToPage(currentIndex - 1));
nextButton.addEventListener('click', () => goToPage(currentIndex + 1));
thumbnails.forEach((thumbnail,index) => thumbnail.addEventListener('click', () => {
  goToPage(index);
  if (narrowScreen.matches) setThumbnails(false);
}));
thumbnailToggle.addEventListener('click', () => setThumbnails(reader.classList.contains('thumbnails-hidden')));
zoomOut.addEventListener('click', () => changeZoom(-1));
zoomIn.addEventListener('click', () => changeZoom(1));
zoomLabel.addEventListener('click', () => setPaperWidth(730, null));
fitWidthButton.addEventListener('click', () => fit('width'));
fitPageButton.addEventListener('click', () => { fit('page'); goToPage(currentIndex); });
stage.addEventListener('click', () => { if (narrowScreen.matches && !reader.classList.contains('thumbnails-hidden')) setThumbnails(false); });

stage.addEventListener('scroll', () => {
  if (scrollFrame !== null) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = null;
    const top = stage.scrollTop + Math.min(160,stage.clientHeight * 0.25);
    let index = 0;
    papers.forEach((paper,i) => { if (paper.offsetTop <= top) index = i; });
    if (index !== currentIndex) updateCurrent(index);
  });
}, {passive:true});

document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey || /^(INPUT|SELECT|TEXTAREA)$/.test(event.target.tagName)) return;
  if (event.key === 'ArrowLeft') { event.preventDefault(); goToPage(currentIndex - 1); }
  else if (event.key === 'ArrowRight') { event.preventDefault(); goToPage(currentIndex + 1); }
  else if (event.key === '+' || event.key === '=') { event.preventDefault(); changeZoom(1); }
  else if (event.key === '-') { event.preventDefault(); changeZoom(-1); }
  else if (event.key === '0') { event.preventDefault(); fit('width'); }
  else if (event.key === 'Escape' && narrowScreen.matches) setThumbnails(false);
});

fullscreenButton.hidden = !document.fullscreenEnabled;
fullscreenButton.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await reader.requestFullscreen();
  } catch { fullscreenButton.title = 'Полноэкранный режим недоступен в этом браузере'; }
});
document.addEventListener('fullscreenchange', () => {
  const active = Boolean(document.fullscreenElement);
  fullscreenButton.setAttribute('aria-label', active ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим');
  fullscreenButton.title = active ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим';
});

new ResizeObserver(() => {
  if (!fitMode) return;
  if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => { resizeFrame = null; if (fitMode) fit(fitMode); });
}).observe(stage);
narrowScreen.addEventListener('change', () => setThumbnails(!narrowScreen.matches));
function setQuality(enhanced) {
  qualityButton.setAttribute('aria-pressed', String(enhanced));
  qualityButton.title = enhanced ? 'Улучшенные страницы. Нажмите, чтобы посмотреть оригиналы.' : 'Оригиналы. Нажмите, чтобы включить улучшенные страницы.';
  papers.forEach(paper => {
    const image = paper.querySelector('img');
    const source = enhanced ? image.dataset.enhancedSrc : image.dataset.originalSrc;
    paper.querySelector('.reader-image-error').hidden = true;
    if (image.getAttribute('src') !== source) image.src = source;
  });
  try { localStorage.setItem(qualityStorageKey, enhanced ? 'enhanced' : 'original'); } catch {}
}
qualityButton.addEventListener('click', () => setQuality(qualityButton.getAttribute('aria-pressed') !== 'true'));
papers.forEach(paper => {
  const image = paper.querySelector('img');
  image.addEventListener('error', () => {
    if (image.getAttribute('src') !== image.dataset.originalSrc) image.src = image.dataset.originalSrc;
    else paper.querySelector('.reader-image-error').hidden = false;
  });
});
let useEnhanced = true;
try { useEnhanced = localStorage.getItem(qualityStorageKey) !== 'original'; } catch {}
setQuality(useEnhanced);
setThumbnails(!narrowScreen.matches);
setPaperWidth(fittedWidth('width'), 'width', false);
goToPage(initialIndex);

