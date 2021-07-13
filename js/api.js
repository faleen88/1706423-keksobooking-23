import {showAlert} from './util.js';
import {addFiltersDisabled} from './state-forms.js';

const URL = 'https://23.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess) => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert('Ошибка при загрузке данных с сервера!');
      addFiltersDisabled();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
