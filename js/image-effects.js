const FILTER_EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_FILTER = FILTER_EFFECTS[0];
let selectedEffect = DEFAULT_FILTER;

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects');
const sliderControl = document.querySelector('.effect-level__slider');
const sliderWrapper = document.querySelector('.img-upload__effect-level');
const effectValueElement = document.querySelector('.effect-level__value');

const isDefaultEffect = () => selectedEffect === DEFAULT_FILTER;

const displaySlider = () => {
  sliderWrapper.classList.remove('hidden');
};

const hideSlider = () => {
  sliderWrapper.classList.add('hidden');
};

const refreshSlider = () => {
  sliderControl.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    start: selectedEffect.max,
    step: selectedEffect.step,
  });

  if (isDefaultEffect()) {
    hideSlider();
  } else {
    displaySlider();
  }
};

const handleSliderUpdate = () => {
  const sliderValue = sliderControl.noUiSlider.get();
  if (isDefaultEffect()) {
    imagePreviewElement.style.filter = DEFAULT_FILTER.style;
  } else {
    imagePreviewElement.style.filter = `${selectedEffect.style}(${sliderValue}${selectedEffect.unit})`;
  }
  effectValueElement.value = parseFloat(sliderValue);
};

const handleEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  selectedEffect = FILTER_EFFECTS.find((effect) => effect.name === evt.target.value);
  imagePreviewElement.className = `effects__preview--${selectedEffect.name}`;
  refreshSlider();
  handleSliderUpdate();
};

const initEffects = () => {
  noUiSlider.create(sliderControl, {
    range: {
      min: DEFAULT_FILTER.min,
      max: DEFAULT_FILTER.max,
    },
    start: DEFAULT_FILTER.max,
    step: DEFAULT_FILTER.step,
    connect: 'lower',
  });
  hideSlider();

  effectsContainer.addEventListener('change', handleEffectChange);
  sliderControl.noUiSlider.on('update', handleSliderUpdate);
};

const resetEffects = () => {
  selectedEffect = DEFAULT_FILTER;
  refreshSlider();
};

export { initEffects, resetEffects };
