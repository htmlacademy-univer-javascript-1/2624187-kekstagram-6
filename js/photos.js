import { getRandomNumber, getRandomItem } from './util.js';
import { createComment } from './comments.js';
import { DESCRIPTIONS } from './data.js';

function createPhoto(photoId) {
  const commentsCount = getRandomNumber(0, 30);
  const photoComments = [];

  for (let i = 0; i < commentsCount; i++) {
    photoComments.push(createComment());
  }

  return {
    id: photoId,
    url: 'photos/' + photoId + '.jpg',
    description: getRandomItem(DESCRIPTIONS),
    likes: getRandomNumber(15, 200),
    comments: photoComments
  };
}

function generatePhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
}

export { generatePhotos };
