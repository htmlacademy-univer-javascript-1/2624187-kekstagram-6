import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_LIMIT = 10;
const FILTER_DELAY = 500;

const filtersSection = document.querySelector('.img-filters');
const filtersForm = filtersSection.querySelector('.img-filters__form');

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const shuffleRandomly = () => Math.random() - 0.5;

const sortByCommentCount = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;

let activeFilter = FilterType.DEFAULT;
let photosCollection = [];

const getFilteredPhotos = () => {
  switch (activeFilter) {
    case FilterType.RANDOM:
      return [...photosCollection].sort(shuffleRandomly).slice(0, RANDOM_PHOTOS_LIMIT);
    case FilterType.DISCUSSED:
      return [...photosCollection].sort(sortByCommentCount);
    default:
      return [...photosCollection];
  }
};

const updateActiveFilterButton = (clickedBtn) => {
  const currentActiveBtn = filtersForm.querySelector('.img-filters__button--active');
  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('img-filters__button--active');
  }
  clickedBtn.classList.add('img-filters__button--active');
};

const delayedRender = debounce((filteredPhotos) => {
  renderThumbnails(filteredPhotos);
}, FILTER_DELAY);

const handleFilterClick = (evt) => {
  const clickedBtn = evt.target;
  if (!clickedBtn.classList.contains('img-filters__button')) {
    return;
  }

  if (clickedBtn.id === activeFilter) {
    return;
  }

  activeFilter = clickedBtn.id;
  updateActiveFilterButton(clickedBtn);
  delayedRender(getFilteredPhotos());
};

export const initFilters = (loadedPhotos) => {
  photosCollection = loadedPhotos;
  filtersSection.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', handleFilterClick);
};
