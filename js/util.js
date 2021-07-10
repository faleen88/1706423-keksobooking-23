const ALERT_SHOW_TIME = 5000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '100px';
  alertContainer.style.top = '200px';
  alertContainer.style.right = '100px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.fontWeight = 'bold';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.border = '5px solid red';
  alertContainer.style.borderRadius = '20px';
  alertContainer.style.backgroundColor = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


export {getRandomDecimal, getRandomInteger, shuffle, showAlert, isEscEvent};
