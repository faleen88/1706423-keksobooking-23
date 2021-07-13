const formAdvertisement = document.querySelector('.ad-form');
const interactiveElements = formAdvertisement.querySelectorAll('fieldset');

const addFormDisabled = () => {
  formAdvertisement.classList.add('ad-form--disabled');
  interactiveElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const removeFormDisabled = () => {
  formAdvertisement.classList.remove('ad-form--disabled');
  interactiveElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const mapFilters = document.querySelector('.map__filters');
const filterElements = mapFilters.querySelectorAll('select, fieldset');

const addFiltersDisabled = () => {
  mapFilters.classList.add('map__filters--disabled');
  filterElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const removeFiltersDisabled = () => {
  mapFilters.classList.remove('map__filters--disabled');
  filterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

export {addFormDisabled, removeFormDisabled, addFiltersDisabled, removeFiltersDisabled, formAdvertisement, mapFilters};

