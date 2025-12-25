import { isEscapeKey } from './util.js';
import { resetScale, initScale } from './scale.js';
import { resetEffects, initEffects } from './image-effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png'];
const VALID_HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_SIZE = 140;

const pageBody = document.body;
const fileInput = document.querySelector('#upload-file');
const imageOverlay = document.querySelector('.img-upload__overlay');
const previewImage = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');
const uploadForm = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('#upload-cancel');

let commentInput = null;
let hashtagsInput = null;
let submitButtonElement = null;
let pristineInstance = null;

function locateFormElements() {
  if (!uploadForm) {
    return false;
  }

  commentInput = uploadForm.querySelector('.text__description');
  hashtagsInput = uploadForm.querySelector('.text__hashtags');
  submitButtonElement = uploadForm.querySelector('.img-upload__submit');

  return hashtagsInput && commentInput && submitButtonElement;
}

const validateNonEmptyHashtag = (inputValue) => {
  if (!inputValue) {
    return true;
  }
  const tags = inputValue.trim().split(/\s+/).filter((item) => item.length > 0);
  return !tags.some((tag) => tag === '#');
};

const validateHashtagsQuantity = (inputValue) => {
  if (!inputValue) {
    return true;
  }
  const tags = inputValue.trim().split(/\s+/).filter((item) => item.length > 0);
  return tags.length <= MAX_HASHTAGS;
};

const validateHashtagsStructure = (inputValue) => {
  if (!inputValue) {
    return true;
  }
  const tags = inputValue.trim().split(/\s+/).filter((item) => item.length > 0);
  return !tags.some((tag) => !VALID_HASHTAG_PATTERN.test(tag));
};

const validateHashtagsUniqueness = (inputValue) => {
  if (!inputValue) {
    return true;
  }
  const tags = inputValue.trim().split(/\s+/).filter((item) => item.length > 0);
  const uniqueTags = new Set(tags.map((tag) => tag.toLowerCase()));
  return uniqueTags.size === tags.length;
};

const validateCommentLength = (inputValue) => !inputValue || inputValue.length <= MAX_COMMENT_SIZE;

const handleFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const disableSubmitButton = () => {
  if (submitButtonElement) {
    submitButtonElement.disabled = true;
    submitButtonElement.textContent = 'Публикую...';
  }
};

const enableSubmitButton = () => {
  if (submitButtonElement) {
    submitButtonElement.disabled = false;
    submitButtonElement.textContent = 'Опубликовать';
  }
};

function closeImageOverlay() {
  uploadForm.reset();
  if (pristineInstance) {
    pristineInstance.reset();
  }
  resetScale();
  resetEffects();
  imageOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', handleFormEscKeydown);
  closeButton.removeEventListener('click', closeImageOverlay);
}

function handleFormEscKeydown(evt) {
  if (document.activeElement === hashtagsInput || document.activeElement === commentInput) {
    return;
  }

  if (document.querySelector('.error')) {
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageOverlay();
  }
}

function openImageOverlay() {
  if (!imageOverlay || !closeButton) {
    return;
  }

  imageOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', handleFormEscKeydown);
  closeButton.addEventListener('click', closeImageOverlay);
}

const handleFileInputChange = () => {
  const selectedFile = fileInput.files[0];
  const fileName = selectedFile.name.toLowerCase();

  const isValidType = ALLOWED_FILE_TYPES.some((type) => fileName.endsWith(type));

  if (isValidType) {
    previewImage.src = URL.createObjectURL(selectedFile);
    effectPreviews.forEach((previewElement) => {
      previewElement.style.backgroundImage = `url(${previewImage.src})`;
    });
    openImageOverlay();
  }
};

function initializeFormValidation() {
  if (!uploadForm || !hashtagsInput || !commentInput) {
    return;
  }

  if (typeof window.Pristine !== 'function') {
    return;
  }

  if (pristineInstance) {
    pristineInstance.destroy();
  }

  pristineInstance = new window.Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error'
  });

  pristineInstance.addValidator(
    hashtagsInput,
    validateHashtagsQuantity,
    `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`
  );

  pristineInstance.addValidator(
    hashtagsInput,
    validateHashtagsStructure,
    'Хэш-тег должен начинаться с # и содержать только буквы и цифры (до 20 символов)'
  );

  pristineInstance.addValidator(
    hashtagsInput,
    validateHashtagsUniqueness,
    'Хэш-теги не должны повторяться'
  );

  pristineInstance.addValidator(
    hashtagsInput,
    validateNonEmptyHashtag,
    'Хэш-тег не может состоять только из символа #'
  );

  pristineInstance.addValidator(
    commentInput,
    validateCommentLength,
    `Длина комментария не должна превышать ${MAX_COMMENT_SIZE} символов`
  );

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristineInstance.validate();

    if (isValid) {
      disableSubmitButton();
      sendData(
        () => {
          closeImageOverlay();
          showSuccessMessage();
          enableSubmitButton();
        },
        () => {
          showErrorMessage();
          enableSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
}

function configureAccessibility() {
  if (!hashtagsInput || !commentInput) {
    return;
  }
  hashtagsInput.setAttribute('aria-describedby', 'hashtags-error');
  commentInput.setAttribute('aria-describedby', 'comment-error');
}

function initImageUploadForm() {
  if (!uploadForm || !fileInput) {
    return;
  }

  if (!locateFormElements()) {
    return;
  }

  configureAccessibility();

  fileInput.addEventListener('change', handleFileInputChange);

  hashtagsInput.addEventListener('keydown', handleFieldKeydown);
  commentInput.addEventListener('keydown', handleFieldKeydown);

  initScale();
  initEffects();
  initializeFormValidation();
}

export { initImageUploadForm };
