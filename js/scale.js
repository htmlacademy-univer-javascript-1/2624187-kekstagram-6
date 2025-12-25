const Scale = {
  DEFAULT: 100,
  MAX: 100,
  MIN: 25,
  STEP: 25
};

const scaleValueInput = document.querySelector('.scale__control--value');
const increaseButton = document.querySelector('.scale__control--bigger');
const reduceButton = document.querySelector('.scale__control--smaller');
const previewImage = document.querySelector('.img-upload__preview img');

const applyScale = (scalePercentage) => {
  previewImage.style.transform = `scale(${scalePercentage / 100})`;
  scaleValueInput.value = `${scalePercentage}%`;
};

const handleReduceClick = () => {
  const currentScale = parseInt(scaleValueInput.value, 10);
  let newScale = currentScale - Scale.STEP;
  if (newScale < Scale.MIN) {
    newScale = Scale.MIN;
  }
  applyScale(newScale);
};

const handleIncreaseClick = () => {
  const currentScale = parseInt(scaleValueInput.value, 10);
  let newScale = currentScale + Scale.STEP;
  if (newScale > Scale.MAX) {
    newScale = Scale.MAX;
  }
  applyScale(newScale);
};

const resetScale = () => {
  applyScale(Scale.DEFAULT);
};

const initScale = () => {
  reduceButton.addEventListener('click', handleReduceClick);
  increaseButton.addEventListener('click', handleIncreaseClick);
};

export { resetScale, initScale };
