/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {ILLogo} from '../../assets';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const index = ({navigation}) => {
  const dispatch = useDispatch();

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token !== null) {
      try {
        const res = await Axios.get('http://mysupir.com/api/user', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        if (res !== null) {
          dispatch({
            type: 'SET_USER',
            payload: {
              name: res.data.user.name,
              foto:
                'http://mysupir.com/get_image?img_path=' +
                res.data.user.foto,
              phone_number: res.data.user.phone_number,
              email: res.data.user.email,
            },
            username: res.data.user.name,
            user_pict:
              'http://mysupir.com/get_image?img_path=' +
              res.data.user.foto,
          });
          dispatch({
            type: 'ID',
            user_id: res.data.user.id,
          });
          console.log(res.data);
          navigation.replace('Home');
        }
      } catch (error) {
        console.log('error', error);
        navigation.replace('GetStarted');
      }
    } else {
      navigation.replace('GetStarted');
    }
  };

  const getBahasa = async () => {
    const bahasa = await AsyncStorage.getItem('bahasa');
    if (bahasa === '1') {
      dispatch({type: 'ENGLISH'});
    } else {
      dispatch({type: 'INDONESIA'});
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 2000);
    getBahasa();
  }, []);

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" hidden={true} translucent={true} />
      <ILLogo />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17273F',
  },
});
