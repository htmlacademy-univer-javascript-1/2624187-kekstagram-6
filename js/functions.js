function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

// Cтрока короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false


function isPalindrome(string) {
  const cleanString = string.toLowerCase().replace(/\s/g, '');
  return cleanString === cleanString.split('').reverse().join('');
}

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс');  // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true


/**
 * Проверяет, укладывается ли встреча в рамки рабочего дня
 * @param {string} workStart - начало рабочего дня в формате 'часы:минуты'
 * @param {string} workEnd - конец рабочего дня в формате 'часы:минуты'
 * @param {string} meetingStart - начало встречи в формате 'часы:минуты'
 * @param {number} meetingDuration - продолжительность встречи в минутах
 * @returns {boolean} true если встреча укладывается в рабочий день, false если нет
 */
function checkMeeting(workStart, workEnd, meetingStart, meetingDuration) {
  // Функция для преобразования времени в минуты
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Преобразуем все времена в минуты
  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);

  // Вычисляем время окончания встречи
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  // Проверяем условия:
  // 1. Встреча начинается не раньше начала рабочего дня
  // 2. Встреча заканчивается не позже конца рабочего дня
  return meetingStartMinutes >= workStartMinutes &&
         meetingEndMinutes <= workEndMinutes;
}

// Примеры использования
console.log(checkMeeting('08:00', '17:30', '14:00', 90)); // true
console.log(checkMeeting('8:0', '10:0', '8:0', 120)); // true
console.log(checkMeeting('08:00', '14:30', '14:00', 90)); // false
console.log(checkMeeting('14:00', '17:30', '08:0', 90)); // false
console.log(checkMeeting('8:00', '17:30', '08:00', 900)); // false
