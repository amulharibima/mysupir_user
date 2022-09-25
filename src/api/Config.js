import AsyncStorage from '@react-native-community/async-storage';
import {getData} from '../utils';
export const RootPath = 'http://mysupir.com/api';

let token = AsyncStorage.getItem('token');

console.log('token Config', token);

export const Headers = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
};
