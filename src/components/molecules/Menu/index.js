import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import s from '../../../assets/styles';
import {DummyProfile, ILNullPhoto} from '../../../assets';
import {colors, getData} from '../../../utils';
import ListMenu from '../ListMenu';
import {Button} from '../../atoms';
import AsyncStorage from '@react-native-community/async-storage';
import {DrawerActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
// import s from '../../../assets/styles';

const MyDrawer = (props, {navigation}) => {
  // const [userDatas, setUserDatas] = useState({
  //   phone_number: '',
  //   name: '',
  //   email: '',
  // });


  const username = useSelector((state) => state.TripReducer.username);
  const fotoProfil = useSelector((state) => state.TripReducer.user_pict);
  const en = useSelector((state) => state.language.english);

  // useEffect(() => {
  //   getData('user').then((res) => {
  //     if (res !== null) {
  //       const data = res;
  //       setUserDatas(data);
  //     } else {
  //       navigation.navigate('GetStarted');
  //     }
  //   });
  // }, [userDatas]);

  // const clearAppData = async () => {
  // try {
  //   const keys = await AsyncStorage.getAllKeys();
  //   console.log('ini key', keys);
  //   await AsyncStorage.multiRemove(keys);
  // } catch (error) {
  //   console.error('Error clearing app data.');
  // }
  // };
  const removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem('token');
      return true;
    } catch (exception) {
      return false;
    }
  };

  console.log('ini userDatasssss', fotoProfil);

  return (
    <>
      <View style={s.container}>
        <View style={s.bgContainer}>
          <View style={s.userContainer}>
            <Image
              style={s.userImage}
              source={
                fotoProfil !== ILNullPhoto ? {uri: fotoProfil} : ILNullPhoto
              }
            />
          </View>
          <View style={s.userData}>
            <Text style={s.userName}>{username}</Text>
            {/* <Text style={s.userGender}>Perempuan</Text> */}
          </View>
        </View>

        <View style={s.prof}>
          <ListMenu
            icon="edit-profile"
            name="Profile"
            type="next"
            desc="Lihat Detail"
            onPress={() => props.navigation.navigate('Profile')}
          />
        </View>
        <View style={s.list}>
          <ListMenu
            icon="language"
            name={en ? 'Change Language' : "Ubah Bahasa"}
            type="next"
            pad
            onPress={() => props.navigation.navigate('Ubah Bahasa')}
          />
          <ListMenu
            icon="history"
            name={en ? 'Orders History' : "Riwayat Order"}
            type="next"
            pad
            onPress={() => props.navigation.navigate('Riwayat Order')}
          />
          <ListMenu
            icon="about"
            name={en ? 'About Us' : "Tentang Kami"}
            type="next"
            pad
            onPress={() => props.navigation.navigate('Tentang Kami')}
          />
          <ListMenu
            icon="help"
            name={en ? 'Help' : "Bantuan"}
            type="next"
            pad
            onPress={() => props.navigation.navigate('Bantuan')}
          />
        </View>
      </View>
      <View style={styles.btn}>
        <Button
          name={en ? 'Logout' : "Keluar"}
          onPress={() => {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'GetStarted'}],
            });
            AsyncStorage.clear();
            props.navigation.dispatch(DrawerActions.closeDrawer());
          }}
        />
      </View>
    </>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({
  btn: {
    bottom: 20,
    paddingHorizontal: 42,
  },
});
