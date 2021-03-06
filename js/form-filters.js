import {mapFilters} from './state-forms.js';
import {createMarker, markerGroup} from './map.js';

const SIMILAR_ADVERTISEMENTS_QUANTITY = 10;

const onMapFiltersChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

const filterAdvertisement = (advertisement) => {
  const houseType = mapFilters.querySelector('#housing-type');
  const housePrice = mapFilters.querySelector('#housing-price');
  const quantityRooms = mapFilters.querySelector('#housing-rooms');
  const quantityGuests = mapFilters.querySelector('#housing-guests');
  const checkedFeatures = mapFilters.querySelectorAll('input[name="features"]:checked');

  const priceValue = {
    min: 10000,
    max: 50000,
  };

  let isType = true;
  let isPrice = true;
  let isRooms = true;
  let isGuests = true;
  let isFeatures = true;

  if (housePrice.value !== 'any') {
    const advertisementPrice = advertisement.offer.price;
    let price;
    if (advertisementPrice <= priceValue.min) {
      price = 'low';
    }
    if (advertisementPrice > priceValue.max) {
      price = 'high';
    }
    if (advertisementPrice <= priceValue.max && advertisementPrice > priceValue.min) {
      price = 'middle';
    }
    isPrice = price === housePrice.value;
  }

  if (houseType.value !== 'any') {
    isType = advertisement.offer.type === houseType.value;
  }

  if (quantityRooms.value !== 'any') {
    isRooms = advertisement.offer.rooms.toString() === quantityRooms.value;
  }

  if (quantityGuests.value !== 'any') {
    isGuests = advertisement.offer.guests.toString() === quantityGuests.value;
  }

  if (checkedFeatures.length) {
    checkedFeatures.forEach((feature) => {
      if (!advertisement.offer.features || !advertisement.offer.features.includes(feature.value)) {
        isFeatures = false;
      }
    });
  }

  return isType && isPrice && isRooms && isGuests && isFeatures;
};

const filterAdvertisements = (data) => {
  const filteredData = [];

  for (let i = 0; i < data.length; i++) {
    if (filterAdvertisement(data[i])) {
      filteredData.push(data[i]);
      if (filteredData.length === SIMILAR_ADVERTISEMENTS_QUANTITY) {
        break;
      }
    }
  }

  return filteredData;
};

const createSimilarAdvertisement = (advertisements) => {
  markerGroup.clearLayers();
  filterAdvertisements(advertisements).forEach((advertisement) => {
    createMarker(advertisement);
  });
};

export {createSimilarAdvertisement, onMapFiltersChange};
