import {showAlert} from './util.js';
import {addFiltersDisabled} from './state-forms.js';

const URL_GETTING = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_DISPATCH = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(URL_GETTING)
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
    URL_DISPATCH,
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
