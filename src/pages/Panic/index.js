import React, {useState} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ILSOS} from '../../assets';
import {fonts} from '../../utils';
import {Gap, Header} from '../../components';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Panic = () => {
  const navigation = useNavigation();
  const id = useSelector((state) => state.order.order_id);
  const order = useSelector((state) => state.TripReducer);
  const [press, setPress] = useState(false);
  const [count, setCount] = useState(0);

  const panic = async () => {
    console.log('klik');
    setPress(true);
    setCount(count + 1);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        `http://mysupir.com/api/order/panic/${id}`,
        {
          location_latitude: order.start.coord.lat,
          location_longitude: order.start.coord.lng,
          location_name: order.start.desc,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (res) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  console.log(order);

  return (
    <>
      <Header
        label="Darurat"
        type="shadow"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.page}>
        <View style={styles.sos}>
          <TouchableOpacity activeOpacity={0.5} onPress={panic}>
            <ImageBackground
              source={ILSOS}
              style={{
                width: 250,
                height: 250,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.sosTxt}>S.O.S</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <Gap height={30} />
        <Text style={styles.descTxt}>
          PRESS BUTTON FOR EMERGENCY SITUATION!!!
          {press === true && (
            <Text>Anda Telah menenakan tombol ini {count} kali</Text>
          )}
        </Text>
      </View>
    </>
  );
};

export default Panic;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sos: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosTxt: {
    fontFamily: fonts.primary[700],
    fontWeight: 'bold',
    fontSize: 50,
    lineHeight: 63,
    textAlign: 'center',
    color: '#FFF',
  },
  descTxt: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    maxWidth: 216,
    color: '#F63F3F',
  },
});
