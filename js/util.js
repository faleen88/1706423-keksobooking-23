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

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomDecimal, getRandomInteger, shuffle, showAlert, isEscEvent, debounce};
