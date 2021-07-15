import {addFormDisabled, removeFormDisabled, addFiltersDisabled, removeFiltersDisabled} from './state-forms.js';
import './form-validation.js';
import {setUserFormSubmit, clearForm, setUserFormReset} from './form-submit.js';
import {setInit} from './map.js';
import {getData} from './api.js';
import {createSimilarAdvertisement, onMapFiltersChange} from './form-filters.js';
import {debounce} from './util.js';
import './photo-preview.js';

const RERENDER_DELAY = 500;

addFormDisabled();
addFiltersDisabled();

setInit(removeFormDisabled, removeFiltersDisabled);

getData((data) => {
  createSimilarAdvertisement(data);

  onMapFiltersChange(debounce(() => createSimilarAdvertisement(data)), RERENDER_DELAY);
  setUserFormSubmit(clearForm, () => createSimilarAdvertisement(data));
  setUserFormReset(() => createSimilarAdvertisement(data));
});
