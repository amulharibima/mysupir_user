import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    // const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
    console.log('eror store data: ', e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
    console.log('eror getData: ', e);
  }
};
