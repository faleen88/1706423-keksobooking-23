import {getAdvertisements, SIMILAR_ADVERTISEMENTS_QUANTITY} from './data.js';
import {createCardAdvertisement} from './popups-advertisements.js';
import './form.js';
import './filters.js';

createCardAdvertisement(getAdvertisements(SIMILAR_ADVERTISEMENTS_QUANTITY));
