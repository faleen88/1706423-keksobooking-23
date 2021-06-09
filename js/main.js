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

const TITLE = [
  'Роскошный дворец',
  'Уютная квартира',
  'Гостевой дом',
  'Домик у моря',
  'Отель Европа',
];


const TYPE_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION_HOUSING = [
  'Все номера уникально оформлены в современном стиле.',
  'В апартаментах имеется балкон с видом на окружающую местность.',
  'В апартаментах имеется оборудованная кухня с микроволновой печью и холодильником.',
  'Во всех апартаментах обустроены гостиная и обеденная зоны.',
  'Комфортные номера для работы и отдыха с приятной атмосферой.',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_ADVERTISEMENT_QUANTITY = 10;

const avatars = [];

/**
 * Возвращает массив адресов аватарок
 *
 * @returns {Array} - массив адресов аватарок
 */

function createArray() {
  let image;
  for (let index = 1; index <= 10; index++) {
    if (index < 10) {
      // eslint-disable-next-line prefer-template
      image = 'img/avatars/user0' + index + '.png';
    } else {
      // eslint-disable-next-line prefer-template
      image = 'img/avatars/user' + index + '.png';
    }
    avatars.push(image);
  }
  return avatars;
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

let indexArr = 0;
createArray();
shuffle(avatars);

/**
 * Возвращает объект, описывающий автора
 *
 * @returns {Object}
 */

function createAuthor() {
  return {
    avatar: avatars[indexArr++],
  };
}

/**
 * Возвращает случайный элемент массива
 *
 * @param {Array} elements
 * @returns - случайный элемент массива
 */

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

/**
 * Возвращает объект, содержащий местоположение в виде географических координат
 *
 * @returns {Object}
 */

function createLocation() {
  return {
    lat: getRandomDecimal(35.65000, 35.70000, 5),
    lng: getRandomDecimal(139.70000, 139.80000, 5),
  };
}

const coordinates = createLocation();

/**
 * Возвращает объект, содержащий информацию об объявлении
 *
 * @returns {Object}
 */

function createOffer() {
  return {
    title: getRandomArrayElement(TITLE),
    // eslint-disable-next-line prefer-template
    address: coordinates.lat + ', ' + coordinates.lng,
    price: getRandomInteger(0, 1000000),
    type: getRandomArrayElement(TYPE_HOUSING),
    rooms: getRandomInteger(1, 5),
    guests: getRandomInteger(1, 5),
    checkin: getRandomArrayElement(TIME_CHECKIN_CHECKOUT),
    checkout: getRandomArrayElement(TIME_CHECKIN_CHECKOUT),
    features: FEATURES.slice(getRandomInteger(0, FEATURES.length - 3)),
    description: getRandomArrayElement(DESCRIPTION_HOUSING),
    photos: PHOTOS.slice(getRandomInteger(0, PHOTOS.length - 1)),
  };
}

/**
 * Возвращает объект. Описание объявления.
 *
 * @returns {Object}
 */

function createAdvertisement() {
  return {
    author: createAuthor(),
    offer: createOffer(),
    location: coordinates,
  };
}

const similarAdvertisements = new Array(SIMILAR_ADVERTISEMENT_QUANTITY).fill(null).map(() => createAdvertisement());

// Чтобы убрать ошибку ESLint
shuffle(similarAdvertisements);
