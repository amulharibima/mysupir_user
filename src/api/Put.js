import axios from 'axios';
import {RootPath} from './Config';
import {getData} from '../utils';

const Put = (path, data = null) => {
  if (!(data instanceof FormData)) {
    let form_data = new FormData();
    for (let key in data) {
      form_data.append(key, data[key]);
    }
    data = form_data;
  }

  let token = getData('token');
  console.log('token nih', token);
  let axiosHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('headers nih', axiosHeaders);

  const promise = new Promise((resolve, reject) => {
    axios.put(`${RootPath}/${path}`, data, Headers).then(
      (result) => {
        console.log('ini result PUT', result);
        resolve(result.data);
      },
      (error) => {
        console.log('ini error PUT', error);
        reject(error);
      },
    );
  });

  return promise;
};

export default Put;
