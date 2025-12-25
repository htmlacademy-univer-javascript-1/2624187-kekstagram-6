const STORAGE_KEY = 'kekstagram-likes';
let likedPhotos = {};

function loadLikedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      likedPhotos = JSON.parse(saved);
    }
  } catch (err) {
    likedPhotos = {};
  }
}

function saveLikedState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likedPhotos));
  } catch (err) {
    // Ошибка - пропуск
  }
}

function setPhotoLiked(photoIdentifier, liked) {
  if (liked) {
    likedPhotos[photoIdentifier] = true;
  } else {
    delete likedPhotos[photoIdentifier];
  }
  saveLikedState();
}

function isPhotoLiked(photoIdentifier) {
  return Boolean(likedPhotos[photoIdentifier]);
}

function togglePhotoLike(photoIdentifier) {
  const newState = !isPhotoLiked(photoIdentifier);
  setPhotoLiked(photoIdentifier, newState);
  return newState;
}

loadLikedState();

export { togglePhotoLike, isPhotoLiked };
