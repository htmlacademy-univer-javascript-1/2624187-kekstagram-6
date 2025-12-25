import { isEscapeKey } from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const displayMessage = (template, buttonSelector) => {
  const messageElement = template.cloneNode(true);
  const closeButton = messageElement.querySelector(buttonSelector);

  document.body.append(messageElement);

  const removeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', handleMessageEscKeydown);
    document.removeEventListener('click', handleOutsideClick);
  };

  function handleMessageEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      removeMessage();
    }
  }

  function handleOutsideClick(evt) {
    if (evt.target === messageElement) {
      removeMessage();
    }
  }

  closeButton.addEventListener('click', removeMessage);
  document.addEventListener('keydown', handleMessageEscKeydown);
  document.addEventListener('click', handleOutsideClick);
};

const showSuccessMessage = () => {
  displayMessage(successMessageTemplate, '.success__button');
};

const showErrorMessage = () => {
  displayMessage(errorMessageTemplate, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
