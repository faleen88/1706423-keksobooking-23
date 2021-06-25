const formAdvertisement = document.querySelector('.ad-form');
const interactiveElements = formAdvertisement.querySelectorAll('fieldset');

function addFormDisabled() {
  formAdvertisement.classList.add('ad-form--disabled');
  interactiveElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

addFormDisabled();

function removeFormDisabled() {
  formAdvertisement.classList.remove('ad-form--disabled');
  interactiveElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
}

removeFormDisabled();
