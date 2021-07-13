import {addFormDisabled, removeFormDisabled, addFiltersDisabled, removeFiltersDisabled} from './state-forms.js';
import './form-validation.js';
import './form-submit.js';
import {setInit} from './map.js';
import {getData} from './api.js';
import {createSimilarAdvertisement, onTypeHouseChange} from './form-filters.js';

addFormDisabled();
addFiltersDisabled();

setInit(removeFormDisabled, removeFiltersDisabled);

getData((data) => {
  createSimilarAdvertisement(data);

  onTypeHouseChange(() => createSimilarAdvertisement(data));
});
