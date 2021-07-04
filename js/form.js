const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE_VALUE = 0;
const MAX_PRICE_VALUE = 1000000;

const validCapaсities = [
  {
    rooms: '1',
    guests: ['1'],
    message: 'Только для 1-ого гостя.',
  },
  {
    rooms: '2',
    guests: ['1', '2'],
    message: 'Только для 1-ого или 2-х гостей.',
  },
  {
    rooms: '3',
    guests: ['1', '2', '3'],
    message: 'Только для 1-ого, 2-х или 3-х гостей.',
  },
  {
    rooms: '100',
    guests: ['0'],
    message: 'Только вариант не для гостей.',
  },
];

const minPrisesHousing = [
  {
    type: 'bungalow',
    prise: '0',
  },
  {
    type: 'flat',
    prise: '1000',
  },
  {
    type: 'hotel',
    prise: '3000',
  },
  {
    type: 'house',
    prise: '5000',
  },
  {
    type: 'palace',
    prise: '10000',
  },
];

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

function getValidCapacity(capaсities) {
  for (let index = 0; index < capaсities.length; index++) {
    if (userQuantityRooms.value === capaсities[index].rooms) {
      let isValueValid = false;
      capaсities[index].guests.forEach((value) =>{
        if (userCapacity.value === value) {
          isValueValid = true;
        }
      });
      if (isValueValid) {
        userCapacity.setCustomValidity('');
      } else {
        userCapacity.setCustomValidity(capaсities[index].message);
      }
    }
  }

  userQuantityRooms.reportValidity();
  userCapacity.reportValidity();
}

getValidCapacity(validCapaсities);
userQuantityRooms.addEventListener('change', () => {
  getValidCapacity(validCapaсities);
});
userCapacity.addEventListener('change', () => {
  getValidCapacity(validCapaсities);
});

const userTypeHousing = formAdvertisement.querySelector('#type');

const getMinPrice = (prices) => {
  for (let index = 0; index < prices.length; index++) {
    if (userTypeHousing.value === prices[index].type) {
      userPriceInput.placeholder = prices[index].prise;
      userPriceInput.min = prices[index].prise;
    }
  }
};

userTypeHousing.addEventListener('change', () => {
  getMinPrice(minPrisesHousing);
});

const userTimeIn = formAdvertisement.querySelector('#timein');
const userTimeOut = formAdvertisement.querySelector('#timeout');

const getTimeInOut = (valueTime1, valueTime2) => {
  valueTime2.value = valueTime1.value;
};

userTimeIn.addEventListener('change', () => {
  getTimeInOut(userTimeIn, userTimeOut);
});

userTimeOut.addEventListener('change', () => {
  getTimeInOut(userTimeOut, userTimeIn);
});

export {addFormDisabled, removeFormDisabled};
