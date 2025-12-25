import { isPhotoLiked, togglePhotoLike } from './favorites.js';

const COMMENTS_BATCH_SIZE = 5;

const pageBody = document.querySelector('body');
const fullscreenView = document.querySelector('.big-picture');
const fullscreenImage = fullscreenView.querySelector('.big-picture__img img');
const imageDescription = fullscreenView.querySelector('.social__caption');
const loadMoreButton = fullscreenView.querySelector('.comments-loader');
const closeButtonElement = fullscreenView.querySelector('.big-picture__cancel');
const commentCounter = fullscreenView.querySelector('.social__comment-count');
const commentsList = fullscreenView.querySelector('.social__comments');
const likesCounter = fullscreenView.querySelector('.likes-count');
const likesButton = fullscreenView.querySelector('.social__likes');

let currentCommentsList = [];
let displayedCommentsCount = 0;
let currentPhotoData = null;

function createCommentElement(commentData) {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const avatarImage = document.createElement('img');
  avatarImage.classList.add('social__picture');
  avatarImage.src = commentData.avatar;
  avatarImage.alt = commentData.name;
  avatarImage.height = 35;
  avatarImage.width = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = commentData.message;

  commentItem.appendChild(avatarImage);
  commentItem.appendChild(commentText);

  return commentItem;
}

function renderCommentsBatch(initialLoad = false) {
  if (initialLoad) {
    commentsList.innerHTML = '';
    displayedCommentsCount = 0;
  }

  const fragment = document.createDocumentFragment();
  const commentsToDisplay = Math.min(displayedCommentsCount + COMMENTS_BATCH_SIZE, currentCommentsList.length);

  for (let i = displayedCommentsCount; i < commentsToDisplay; i++) {
    const commentElement = createCommentElement(currentCommentsList[i]);
    fragment.appendChild(commentElement);
  }

  commentsList.appendChild(fragment);
  displayedCommentsCount = commentsToDisplay;

  commentCounter.innerHTML = `<span class="social__comment-shown-count">${displayedCommentsCount}</span> из <span class="social__comment-total-count">${currentCommentsList.length}</span> комментариев`;

  if (displayedCommentsCount >= currentCommentsList.length) {
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
  }
}

function showBigPicture(photoInfo) {
  currentPhotoData = photoInfo;

  fullscreenImage.src = photoInfo.url;
  likesCounter.textContent = photoInfo.likes;
  imageDescription.textContent = photoInfo.description;

  currentCommentsList = photoInfo.comments.slice();

  renderCommentsBatch(true);

  commentCounter.classList.remove('hidden');

  const liked = isPhotoLiked(photoInfo.id);
  likesButton.classList.toggle('social__likes--active', liked);

  fullscreenView.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  document.addEventListener('keydown', handleEscKeyPress);
}

function closeBigPicture() {
  fullscreenView.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', handleEscKeyPress);

  currentPhotoData = null;
  currentCommentsList = [];
  displayedCommentsCount = 0;
}

function handleEscKeyPress(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

function handleLikeClick() {
  if (!currentPhotoData) {
    return;
  }

  const liked = togglePhotoLike(currentPhotoData.id);

  likesButton.classList.toggle('social__likes--active', liked);

  if (liked) {
    currentPhotoData.likes += 1;
  } else {
    currentPhotoData.likes -= 1;
  }

  likesCounter.textContent = currentPhotoData.likes;
}

closeButtonElement.addEventListener('click', closeBigPicture);
loadMoreButton.addEventListener('click', () => renderCommentsBatch());
likesButton.addEventListener('click', handleLikeClick);

export { showBigPicture };
