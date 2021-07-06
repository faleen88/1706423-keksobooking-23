import {getAdvertisements, SIMILAR_ADVERTISEMENTS_QUANTITY} from './data.js';
import {createCardAdvertisement} from './popup-advertisement.js';
import {getUserLocation} from './form.js';

const CENTER_TOKIO_COORDINATES = {
  lat: 35.681700,
  lng: 139.753891,
};

const map = L.map('map-canvas',
  {
    scrollWheelZoom: false,
  })
  .setView(CENTER_TOKIO_COORDINATES, 12);

const setInit = (activForm, activFilter) => {
  map.on('load', activForm, activFilter);
};

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  CENTER_TOKIO_COORDINATES,
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
  mainPinMarker.setLatLng(CENTER_TOKIO_COORDINATES);
  map.setView(CENTER_TOKIO_COORDINATES, 12);
};

const points = getAdvertisements(SIMILAR_ADVERTISEMENTS_QUANTITY);

const createMarker = (point) => {
  const {location} = point;

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
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

points.forEach((point) => {
  createMarker(point);
});

export {setInit, CENTER_TOKIO_COORDINATES, resetMarker};
