import axios from 'axios';
import {RootPath} from './Config';
import AsyncStorage from '@react-native-community/async-storage';
import {getData} from '../utils';

const Post = async (path, data = null) => {
  if (!(data instanceof FormData)) {
    let form_data = new FormData();
    for (let key in data) {
      form_data.append(key, data[key]);
    }
    data = form_data;
  }

  // let token = await AsyncStorage.getItem('token');
  let axiosHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${AsyncStorage.getItem('token')}`,
    },
  };
  console.log('headers nih ya', axiosHeaders);

  const promise = new Promise((resolve, reject) => {
    axios.post(`${RootPath}/${path}`, data, axiosHeaders).then(
      (result) => {
        console.log('ini result Post', result);
        resolve(result.data);
      },
      (error) => {
        console.log('ini error post', error);
        reject(error);
      },
    );
  });

  return promise;
};

export default Post;
