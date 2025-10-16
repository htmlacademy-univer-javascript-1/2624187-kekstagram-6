function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

export { getRandomNumber, getRandomItem };
