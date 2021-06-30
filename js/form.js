const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE_VALUE = 0;
const MAX_PRICE_VALUE = 1000000;

const formAdvertisement = document.querySelector('.ad-form');
const interactiveElements = formAdvertisement.querySelectorAll('fieldset');

function addFormDisabled() {
  formAdvertisement.classList.add('ad-form--disabled');
  interactiveElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
}

function removeFormDisabled() {
  formAdvertisement.classList.remove('ad-form--disabled');
  interactiveElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
}

const userTitleInput = formAdvertisement.querySelector('#title');

userTitleInput.addEventListener('input', () => {
  const valueLength = userTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    userTitleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    userTitleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    userTitleInput.setCustomValidity('');
  }

  userTitleInput.reportValidity();
});

const userPriceInput = formAdvertisement.querySelector('#price');

userPriceInput.addEventListener('input', () => {
  const valuePrice = userPriceInput.value;

  if (valuePrice < MIN_PRICE_VALUE) {
    userPriceInput.setCustomValidity('Вводите только положительное значение.');
  } else if (valuePrice > MAX_PRICE_VALUE) {
    userPriceInput.setCustomValidity('Слишком дорого.');
  } else {
    userPriceInput.setCustomValidity('');
  }

  userPriceInput.reportValidity();
});

const userQuantityRooms = formAdvertisement.querySelector('#room_number');
const userCapacity = formAdvertisement.querySelector('#capacity');

function getValidCapacity() {
  switch(userQuantityRooms.value) {
    case '1':
      if (userCapacity.value === '2' || userCapacity.value === '3' || userCapacity.value === '0') {
        userCapacity.setCustomValidity('Только для 1-ого гостя.');
      } else {
        userCapacity.setCustomValidity('');
      }
      break;
    case '2':
      if (userCapacity.value === '3' || userCapacity.value === '0') {
        userCapacity.setCustomValidity('Только для 1-ого или 2-х гостей.');
      } else {
        userCapacity.setCustomValidity('');
      }
      break;
    case '3':
      if (userCapacity.value === '0') {
        userCapacity.setCustomValidity('Только для 1-ого, 2-х или 3-х гостей.');
      } else {
        userCapacity.setCustomValidity('');
      }
      break;
    case '100':
      if (userCapacity.value === '1' || userCapacity.value === '2' || userCapacity.value === '3') {
        userCapacity.setCustomValidity('Только вариант не для гостей.');
      } else {
        userCapacity.setCustomValidity('');
      }
  }

  userQuantityRooms.reportValidity();
  userCapacity.reportValidity();
}

getValidCapacity();
userQuantityRooms.addEventListener('change', () => {
  getValidCapacity();
});
userCapacity.addEventListener('change', () => {
  getValidCapacity();
});

export {addFormDisabled, removeFormDisabled};
