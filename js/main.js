import {getAdvertisements, SIMILAR_ADVERTISEMENTS_QUANTITY} from './data.js';
import {createCardAdvertisement} from './popup-advertisement.js';
import {addFormDisabled, removeFormDisabled} from './form.js';
import {addFiltersDisabled, removeFiltersDisabled} from './filters.js';

addFormDisabled();
addFiltersDisabled();

removeFormDisabled();
removeFiltersDisabled();

getAdvertisements(SIMILAR_ADVERTISEMENTS_QUANTITY).forEach((index) => {
  createCardAdvertisement(index);
});
