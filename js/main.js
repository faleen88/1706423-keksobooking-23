import {addFormDisabled, removeFormDisabled, addFiltersDisabled, removeFiltersDisabled} from './state-forms.js';
import './form-validation.js';
import './form-submit.js';
import {setInit} from './map.js';
import {getData} from './api.js';
import {createSimilarAdvertisement, onmMapFiltersChange} from './form-filters.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

addFormDisabled();
addFiltersDisabled();

setInit(removeFormDisabled, removeFiltersDisabled);

getData((data) => {
  createSimilarAdvertisement(data);

  onmMapFiltersChange(debounce(() => createSimilarAdvertisement(data)), RERENDER_DELAY);
});
