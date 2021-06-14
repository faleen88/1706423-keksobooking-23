/**
 * Возвращает случайное число с плавающей точкой
 * Функция взята с сайта https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *
 * @param {Number} min - минимальное значение
 * @param {Number} max - максимальное значение
 * @param {Number} simbolsAfterComma - колличество знаков после запятой
 * @returns {Number} - случайное число с плавающей точкой
 */

function getRandomDecimal(min, max, simbolsAfterComma = 0) {
  if (min >= max || min < 0 || max < 0) {
    throw 'Неверные параметры';
  }
  const randomNumber = (Math.random() * (max - min) + min).toFixed(simbolsAfterComma);
  return Number(randomNumber);
}

/**
 * Возвращает случайное целое число
 *
 * @param {Number} min - минимальное значение
 * @param {Number} max - максимальное значение
 * @returns {Number} - случайное целое число
 */

function getRandomInteger(min, max) {
  return Math.floor(getRandomDecimal(min, max));
}

/**
 * Возвращает перемешанный массив
 *
 * @param {Array} array - массив, значения которого нужно перемешать
 * @returns {Array} - перемешанный массив
 */
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

export {getRandomDecimal, getRandomInteger, shuffle};
