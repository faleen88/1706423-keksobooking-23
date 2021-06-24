const mapCanvas = document.querySelector('.map__canvas');
const popupAdvertisementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const LIST_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

function checkElement(item, element) {
  if (!element) {
    item.remove();
  } else {
    return element;
  }
}

function getHouseType(item, element) {
  checkElement(item, element);
  return LIST_HOUSING[element];
}

function getTextCapacity(item, rooms, guests) {
  if (!rooms || !guests) {
    item.remove();
  }

  let text = '';
  text += (rooms === 1) ? `${rooms} комната для ` : `${rooms} комнаты для `;
  text += (guests === 1) ? `${guests} гостя` : `${guests} гостей`;
  return text;
}

function getTimeCheckinCheckout(item, timeCheckin, timeCheckout) {
  if (!timeCheckin || !timeCheckout) {
    item.remove();
  }

  return `Заезд после ${timeCheckin}, выезд до ${timeCheckout}`;
}

function getFeatureList(list, items, listElements) {
  if (!listElements) {
    list.remove();
  } else {
    const modifiers = listElements.map((element) => `popup__feature--${element}`);
    items.forEach((item) => {
      const modifier = item.classList[1];

      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  }
}

function getPhotoList(list, item, element) {
  if (!element) {
    list.remove();
  } else {
    for (let index = 0; index < element.length; index++) {
      const photo = item.cloneNode(true);
      photo.src = element[index];
      list.appendChild(photo);
    }
  }
}

function createCardAdvertisement(data) {

  data.forEach(({author, offer}) => {
    const advertisementElement = popupAdvertisementTemplate.cloneNode(true);

    const avatar = advertisementElement.querySelector('.popup__avatar');
    avatar.src =  checkElement(avatar, author.avatar);

    const title = advertisementElement.querySelector('.popup__title');
    title.textContent = checkElement(title, offer.title);

    const address = advertisementElement.querySelector('.popup__text--address');
    address.textContent = checkElement(address, offer.address);

    const price = advertisementElement.querySelector('.popup__text--price');
    price.textContent = `${checkElement(price, offer.price)} ₽/ночь`;

    const type = advertisementElement.querySelector('.popup__type');
    type.textContent = getHouseType(type, offer.type);

    const capacity = advertisementElement.querySelector('.popup__text--capacity');
    capacity.textContent = getTextCapacity(capacity, offer.rooms, offer.guests);

    const time = advertisementElement.querySelector('.popup__text--time');
    time.textContent = getTimeCheckinCheckout(time, offer.checkin, offer.checkout);

    const featureList = advertisementElement.querySelector('.popup__features');
    const featureItem = featureList.querySelectorAll('.popup__feature');
    getFeatureList(featureList, featureItem, offer.features);

    const description = advertisementElement.querySelector('.popup__description');
    description.textContent = checkElement(description, offer.description);

    const photoList = advertisementElement.querySelector('.popup__photos');
    const photoItem = photoList.querySelector('.popup__photo');
    photoList.removeChild(photoItem);
    getPhotoList(photoList, photoItem, offer.photos);

    mapCanvas.appendChild(advertisementElement);
  });

}

export {createCardAdvertisement};
