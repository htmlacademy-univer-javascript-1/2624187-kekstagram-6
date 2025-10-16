import { generatePhotos } from './photos.js';

// Генерация данных
const photos = generatePhotos();

// Экспорт для использования в других модулях (если понадобится)
export { photos };

// Вывод в консоль для проверки
console.log('Всего фотографий:', photos.length);
console.log('Первая фотография:', photos[0]);
