const API_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getData = (successCallback, errorCallback) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      successCallback(data);
    })
    .catch(() => {
      errorCallback();
    });
};

const sendData = (successCallback, errorCallback, formBody) => {
  fetch(`${API_URL}/`, {
    method: 'POST',
    body: formBody,
  })
    .then((response) => {
      if (response.ok) {
        successCallback();
      } else {
        errorCallback();
      }
    })
    .catch(() => {
      errorCallback();
    });
};

export { getData, sendData };
