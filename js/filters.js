const mapFilters = document.querySelector('.map__filters');
const filterElements = mapFilters.querySelectorAll('select, fieldset');

function addFiltersDisabled() {
  mapFilters.classList.add('map__filters--disabled');
  filterElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

addFiltersDisabled();

function removeFiltersDisabled() {
  mapFilters.classList.remove('map__filters--disabled');
  filterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
}

removeFiltersDisabled();

