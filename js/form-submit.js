import {formAdvertisement, mapFilters} from './state-forms.js';
import {getUserLocation} from './form-validation.js';
import {centerTokioCoordinates, resetMarker} from './map.js';
import {isEscEvent} from './util.js';
import {sendData} from './api.js';
import {removeAvatar, removePhoto} from './photo-preview.js';

const resetButton = formAdvertisement.querySelector('.ad-form__reset');

const clearForm = () => {
  formAdvertisement.reset();
  getUserLocation(centerTokioCoordinates);
  resetMarker();
  mapFilters.reset();
  removeAvatar();
  removePhoto();
};

const setUserFormReset = (cb) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearForm();
    cb();
  });
};

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const messageSuccess = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const messageError = errorMessageTemplate.cloneNode(true);
const body = document.querySelector('body');
const errorButton = errorMessageTemplate.querySelector('.error__button');

const onPopupEscKeydownSuccess = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessageSuccess(); // eslint-disable-line no-use-before-define
  }
};

const onPopupClickSuccess = (evt) => {
  evt.preventDefault();
  closeMessageSuccess(); // eslint-disable-line no-use-before-define
};

const showMessageSuccess = () => {
  body.appendChild(messageSuccess);

  document.addEventListener('keydown', onPopupEscKeydownSuccess);
  window.addEventListener('click', onPopupClickSuccess);
};

const closeMessageSuccess = () => {
  messageSuccess.remove();

  document.removeEventListener('keydown', onPopupEscKeydownSuccess);
  window.removeEventListener('click', onPopupClickSuccess);
};

const onPopupEscKeydownError = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessageError(); // eslint-disable-line no-use-before-define
  }
};

const onPopupClickError = (evt) => {
  evt.preventDefault();
  closeMessageError(); // eslint-disable-line no-use-before-define
};

const showMessageError = () => {
  body.appendChild(messageError);

  document.addEventListener('keydown', onPopupEscKeydownError);
  window.addEventListener('click', onPopupClickError);
  errorButton.addEventListener('click', onPopupClickError);
};

const closeMessageError = () => {
  messageError.remove();

  document.removeEventListener('keydown', onPopupEscKeydownError);
  window.removeEventListener('click', onPopupClickError);
  errorButton.removeEventListener('click', onPopupClickError);
};

const setUserFormSubmit = (onSuccess, cb) => {
  formAdvertisement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {onSuccess();
        showMessageSuccess();
        cb();
      },
      () => showMessageError(),
      new FormData(evt.target),
    );
  });
};

export {setUserFormReset, setUserFormSubmit, clearForm};
