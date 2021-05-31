// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandom(min, max, simbolsAfterComma) {
  if (min >= max || min < 0 || max < 0) {
    throw 'Неверные параметры';
  }
  return (Math.random() * (max - min) + min).toFixed(simbolsAfterComma);
}

function getRandomInteger(min, max) {
  return Math.floor(getRandom(min, max));
}

getRandomInteger();
