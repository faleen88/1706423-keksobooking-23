import {createCardAdvertisement} from './popup-advertisement.js';
import {getUserLocation} from './form-validation.js';

const centerTokioCoordinates = {
  lat: 35.681700,
  lng: 139.753891,
};

const map = L.map('map-canvas',
  {
    scrollWheelZoom: false,
  })
  .setView(centerTokioCoordinates, 12);

const setInit = (activateForm, activateFilter) => {
  map.on('load', activateForm(), activateFilter());
};

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  centerTokioCoordinates,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  getUserLocation(coordinates);
});

const resetMarker = () => {
  mainPinMarker.setLatLng(centerTokioCoordinates);
  map.setView(centerTokioCoordinates, 12);
};

const createMarker = (point) => {
  const {location} = point;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const lat = location.lat;
  const lng = location.lng;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCardAdvertisement(point),
      {
        keepInView: true,
      },
    );
};

const createSimialrAdvertisement = (advertisements) => {
  advertisements.forEach((advertisement) => {
    createMarker(advertisement);
  });
};

export {setInit, centerTokioCoordinates, resetMarker, createSimialrAdvertisement};
