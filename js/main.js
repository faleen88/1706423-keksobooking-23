// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomDecimal(min, max, simbolsAfterComma = 0) {
  if (min >= max || min < 0 || max < 0) {
    throw 'Неверные параметры';
  }
  const randomNumber = (Math.random() * (max - min) + min).toFixed(simbolsAfterComma);
  return Number(randomNumber);
}

function getRandomInteger(min, max) {
  return Math.floor(getRandomDecimal(min, max));
}

getRandomInteger(1, 10);
