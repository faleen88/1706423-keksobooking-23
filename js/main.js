import {addFormDisabled, removeFormDisabled} from './form.js';
import {addFiltersDisabled, removeFiltersDisabled} from './filters.js';
import {setInit} from './map.js';

addFormDisabled();
addFiltersDisabled();

setInit(removeFormDisabled(), removeFiltersDisabled());
