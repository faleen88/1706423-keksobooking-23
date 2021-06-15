import {getRandomDecimal, getRandomInteger, shuffle} from './util.js';

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

const SIMILAR_ADVERTISEMENTS_QUANTITY = 10;

/**
 * Возвращает массив адресов аватарок
 *
 * @returns {Array} - массив адресов аватарок
 */

function createArray(quantity) {
  const arrayImage = [];
  let image;
  for (let index = 1; index <= quantity; index++) {
    image = (index < 10) ? `img/avatars/user0${index}.png` : `img/avatars/user${index}.png`;
    arrayImage.push(image);
  }
  return arrayImage;
}

/**
 * Возвращает объект, описывающий автора
 *
 * @param {Array} array
 * @returns {Object}
 */

function createAuthor(array, indexArray) {
  return {
    avatar: array[indexArray++],
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

/**
 * Возвращает объект, содержащий информацию об объявлении
 *
 * @param {Array} location
 * @returns {Object}
 */

function createOffer(position) {
  return {
    title: getRandomArrayElement(TITLE),
    address: `${position.lat}, ${position.lng}`,
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
 * @param {Array} array
 * @returns {Object}
 */

function createAdvertisement(array, indexArray) {
  const coordinates = createLocation();
  return {
    author: createAuthor(array, indexArray),
    offer: createOffer(coordinates),
    location: coordinates,
  };
}

/**
 * Возвращает массив, похожих объявлений
 *
 * @returns {Array} - массив, похожих объявлений
 */

function getAdvertisements(quantity) {
  const avatars = shuffle(createArray(quantity));
  const similarAdvertisements = [];
  for (let index = 0; index < quantity; index++) {
    similarAdvertisements.push(createAdvertisement(avatars, index));
  }
  return similarAdvertisements;
}

export {getAdvertisements, SIMILAR_ADVERTISEMENTS_QUANTITY};
