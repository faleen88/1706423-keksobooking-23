import {getAdvertisements, SIMILAR_ADVERTISEMENTS_QUANTITY} from './data.js';
import {createCardAdvertisement} from './popup-advertisement.js';
import {addFormDisabled, removeFormDisabled} from './form.js';
import {addFiltersDisabled, removeFiltersDisabled} from './filters.js';

addFormDisabled();
addFiltersDisabled();

removeFormDisabled();
removeFiltersDisabled();

createCardAdvertisement(getAdvertisements(SIMILAR_ADVERTISEMENTS_QUANTITY)[0]);
