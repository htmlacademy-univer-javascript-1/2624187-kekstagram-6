const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Артём', 'Мария', 'Дмитрий', 'Анна', 'Сергей'];
const DESCRIPTIONS = ['Отличный день!', 'Закат волшебный', 'Воспоминания', 'Лучший кадр'];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

const usedCommentIds = new Set();

function createUniqueCommentId() {
  let newId;
  do {
    newId = getRandomNumber(1000, 9999);
  } while (usedCommentIds.has(newId));

  usedCommentIds.add(newId);
  return newId;
}

function createComment() {
  const messageCount = getRandomNumber(1, 2);
  let messageText = '';

  for (let i = 0; i < messageCount; i++) {
    messageText += getRandomItem(MESSAGES) + ' ';
  }

  return {
    id: createUniqueCommentId(),
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: messageText.trim(),
    name: getRandomItem(NAMES)
  };
}

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

const photos = generatePhotos();

console.log('Всего фотографий:', photos.length);
console.log('Первая фотография:', photos[0]);
