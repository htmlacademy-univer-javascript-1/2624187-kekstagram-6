import { showBigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

function generateThumbnail(photoData) {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  const imageElement = thumbnailElement.querySelector('.picture__img');

  thumbnailElement.querySelector('.picture__likes').textContent = photoData.likes;
  thumbnailElement.querySelector('.picture__comments').textContent = photoData.comments.length;

  imageElement.alt = photoData.description;
  imageElement.src = photoData.url;

  thumbnailElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(photoData);
  });

  return thumbnailElement;
}

function renderThumbnails(photosArray) {
  const existingThumbnails = picturesContainerElement.querySelectorAll('.picture');
  const fragment = document.createDocumentFragment();
  existingThumbnails.forEach((thumbnail) => thumbnail.remove());

  photosArray.forEach((photoItem) => {
    const thumbnail = generateThumbnail(photoItem);
    fragment.appendChild(thumbnail);
  });

  picturesContainerElement.appendChild(fragment);
}

export { renderThumbnails };
