const popupAdvertisementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const ListHousing = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALASE: 'Дворец',
  HOTEL: 'Отель',
};

const getImage = (element, image) => {
  if (!image) {
    element.remove();
  } else {
    return element.src = image;
  }
};

const getTextElement = (element, value) => {
  if (!value) {
    element.remove();
  } else {
    return element.textContent = value;
  }
};

const getPrice = (element, value) => {
  if (!value) {
    element.remove();
  } else {
    return element.textContent = `${value} ₽/ночь`;
  }
};

const getHouseType = (element, value) => {
  if (!value) {
    element.remove();
  } else {
    return element.textContent = ListHousing[value];
  }
};

const getTextCapacity = (element, rooms, guests) => {
  if (!rooms || !guests) {
    element.remove();
  }

  let text = '';
  text += (rooms === 1) ? `${rooms} комната для ` : `${rooms} комнаты для `;
  text += (guests === 1) ? `${guests} гостя` : `${guests} гостей`;
  return element.textContent = text;
};

const getTimeCheckinCheckout = (element, timeCheckin, timeCheckout) => {
  if (!timeCheckin || !timeCheckout) {
    element.remove();
  }

  return element.textContent = `Заезд после ${timeCheckin}, выезд до ${timeCheckout}`;
};

const getFeatureList = (list, featureItems, values) => {
  if (!values) {
    list.remove();
  } else {
    const modifiers = values.map((value) => `popup__feature--${value}`);
    featureItems.forEach((item) => {
      const modifier = item.classList[1];

      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  }
};

const getPhotoList = (list, item, images) => {
  if (!images) {
    list.remove();
  } else {
    images.forEach((image) => {
      const photo = item.cloneNode(true);
      photo.src = image;
      list.appendChild(photo);
    });
  }
};

const createCardAdvertisement = (data) => {
  const advertisementElement = popupAdvertisementTemplate.cloneNode(true);

  const avatar = advertisementElement.querySelector('.popup__avatar');
  getImage(avatar, data.author.avatar);

  const title = advertisementElement.querySelector('.popup__title');
  getTextElement(title, data.offer.title);

  const address = advertisementElement.querySelector('.popup__text--address');
  getTextElement(address, data.offer.address);

  const price = advertisementElement.querySelector('.popup__text--price');
  getPrice(price, data.offer.price);

  const type = advertisementElement.querySelector('.popup__type');
  getHouseType(type, data.offer.type);

  const capacity = advertisementElement.querySelector('.popup__text--capacity');
  getTextCapacity(capacity, data.offer.rooms, data.offer.guests);

  const time = advertisementElement.querySelector('.popup__text--time');
  getTimeCheckinCheckout(time, data.offer.checkin, data.offer.checkout);

  const featureList = advertisementElement.querySelector('.popup__features');
  const featureItem = featureList.querySelectorAll('.popup__feature');
  getFeatureList(featureList, featureItem, data.offer.features);

  const description = advertisementElement.querySelector('.popup__description');
  getTextElement(description, data.offer.description);

  const photoList = advertisementElement.querySelector('.popup__photos');
  const photoItem = photoList.querySelector('.popup__photo');
  photoList.removeChild(photoItem);
  getPhotoList(photoList, photoItem, data.offer.photos);

  return advertisementElement;
};

export {createCardAdvertisement};
