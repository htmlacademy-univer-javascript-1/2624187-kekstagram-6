import { initImageUploadForm } from './form.js';
import { renderThumbnails } from './thumbnails.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { initFilters } from './photo-filters.js';

function initializeApplication() {
  if (typeof window.Pristine !== 'function') {
    setTimeout(initializeApplication, 100);
    return;
  }

  getData(
    (photosData) => {
      renderThumbnails(photosData);
      initFilters(photosData);
    },
    () => {
      showAlert('Не удалось загрузить данные. Попробуйте обновить страницу');
    }
  );

  initImageUploadForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeApplication, 0);
  });
} else {
  setTimeout(initializeApplication, 0);
}
