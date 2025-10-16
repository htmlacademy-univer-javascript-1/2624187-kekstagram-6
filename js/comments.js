import { getRandomNumber, getRandomItem } from './util.js';
import { MESSAGES, NAMES } from './data.js';

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

export { createComment };
