import {getAdvertisements, SIMILAR_ADVERTISEMENTS_QUANTITY} from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const popupAdvertisementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAdvertisements = getAdvertisements(SIMILAR_ADVERTISEMENTS_QUANTITY);

similarAdvertisements.forEach(({author, offer}) => {
  const advertisementElement = popupAdvertisementTemplate.cloneNode(true);

  const avatar = advertisementElement.querySelector('.popup__avatar');
  (author.avatar) ? avatar.src = author.avatar : avatar.remove();

  const title = advertisementElement.querySelector('.popup__title');
  title.textContent = offer.title;

  const address = advertisementElement.querySelector('.popup__text--address');
  (offer.address) ? address.textContent = offer.address : address.remove();

  const price = advertisementElement.querySelector('.popup__text--price');
  (offer.price) ? price.textContent = `${offer.price} ₽/ночь` : price.remove();

  const type = advertisementElement.querySelector('.popup__type');
  if (!offer.type) {
    type.remove();
  }
  switch(offer.type) {
    case 'flat':
      offer.type = 'Квартира';
      break;

    case 'bungalow':
      offer.type = 'Бунгало';
      break;

    case 'house':
      offer.type = 'Дом';
      break;

    case 'palace':
      offer.type = 'Дворец';
      break;

    case 'hotel':
      offer.type = 'Отель';
      break;
  }
  type.textContent = offer.type;

  const capacity = advertisementElement.querySelector('.popup__text--capacity');
  (!offer.rooms || !offer.guests) ? capacity.remove() : capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  const time = advertisementElement.querySelector('.popup__text--time');
  (!offer.checkin || !offer.checkout) ? time.remove() : time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featureList = advertisementElement.querySelector('.popup__features');
  const featureItem = featureList.querySelectorAll('.popup__feature');
  if (!offer.features) {
    featureList.remove();
  } else {
    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
    featureItem.forEach((item) => {
      const modifier = item.classList[1];

      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  }

  const description = advertisementElement.querySelector('.popup__description');
  (offer.description) ? description.textContent = offer.description : description.remove();

  const photoList = advertisementElement.querySelector('.popup__photos');
  const photoItem = photoList.querySelector('.popup__photo');
  photoList.removeChild(photoItem);
  if (!offer.photos) {
    photoList.remove();
  } else {
    for (let index = 0; index < offer.photos.length; index++) {
      const photo = photoItem.cloneNode(true);
      photo.src = offer.photos[index];
      photoList.appendChild(photo);
    }
  }

  mapCanvas.appendChild(advertisementElement);
});
