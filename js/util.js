const ALERT_DISPLAY_TIME = 5000;

export function getRandomInteger(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

export function generateUniqueIdentifiers(amount, minValue, maxValue) {
  const identifiers = new Set();
  while (identifiers.size < amount) {
    identifiers.add(getRandomInteger(minValue, maxValue));
  }
  return Array.from(identifiers);
}

export function isEscapeKey(keyboardEvent) {
  return keyboardEvent.key === 'Escape';
}

export function debounce(callbackFunction, delay = 500) {
  let timeoutIdentifier;
  return (...args) => {
    clearTimeout(timeoutIdentifier);
    timeoutIdentifier = setTimeout(() => callbackFunction.apply(this, args), delay);
  };
}

export function throttle(callbackFunction, frameDelay) {
  let previousTime = 0;
  return (...args) => {
    const currentTime = new Date();
    if (currentTime - previousTime >= frameDelay) {
      callbackFunction.apply(this, args);
      previousTime = currentTime;
    }
  };
}

export const showAlert = (alertMessage) => {
  const alertElement = document.createElement('div');
  alertElement.style.zIndex = '100';
  alertElement.style.position = 'absolute';
  alertElement.style.left = '0';
  alertElement.style.top = '0';
  alertElement.style.right = '0';
  alertElement.style.padding = '10px 3px';
  alertElement.style.fontSize = '30px';
  alertElement.style.textAlign = 'center';
  alertElement.style.backgroundColor = 'red';
  alertElement.classList.add('data-error');

  alertElement.textContent = alertMessage;

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_DISPLAY_TIME);
};
