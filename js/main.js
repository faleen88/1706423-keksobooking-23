import {addFormDisabled, removeFormDisabled, addFiltersDisabled, removeFiltersDisabled} from './state-forms.js';
import './form-validation.js';
import './form-submit.js';
import {setInit, createSimialrAdvertisement} from './map.js';
import {getData} from './api.js';

const SIMILAR_ADVERTISEMENTS_QUANTITY = 10;

addFormDisabled();
addFiltersDisabled();

setInit(removeFormDisabled(), removeFiltersDisabled());

getData((data) => {
  createSimialrAdvertisement(data.slice(0, SIMILAR_ADVERTISEMENTS_QUANTITY));
});
