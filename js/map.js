import {createCardAdvertisement} from './popup-advertisement.js';
import {getUserLocation} from './form-validation.js';

const centerTokioCoordinates = {
  lat: 35.681700,
  lng: 139.753891,
};

const mainPinParameters = {
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};

const pinParameters = {
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 40,
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
  iconSize: [mainPinParameters.width, mainPinParameters.height],
  iconAnchor: [mainPinParameters.anchorX, mainPinParameters.anchorY],
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

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {location} = point;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [pinParameters.width, pinParameters.height],
    iconAnchor: [pinParameters.anchorX, pinParameters.anchorY],
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
    .addTo(markerGroup)
    .bindPopup(
      createCardAdvertisement(point),
      {
        keepInView: true,
      },
    );
};

export {setInit, centerTokioCoordinates, resetMarker, createMarker, markerGroup};
