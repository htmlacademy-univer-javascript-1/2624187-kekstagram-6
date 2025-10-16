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
