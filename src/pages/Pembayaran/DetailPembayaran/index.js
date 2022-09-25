import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Modal, Linking} from 'react-native';
import {Header, Gap, Button} from '../../../components';
import {Input} from '../../../components';
import {colors, fonts} from '../../../utils';
import CheckBox from '@react-native-community/checkbox';
import {useSelector, useDispatch} from 'react-redux';
import {ModalDetailPembayaran} from '../../../components';
import {convertDate} from '../../../utils';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import WebView from 'react-native-webview';
import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';

const currencyFormat = (num) => {
  let number_string = num.toString(),
    sisa = number_string.length % 3,
    rupiah = number_string.substr(0, sisa),
    ribuan = number_string.substr(sisa).match(/\d{3}/g);
  let separator;

  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }
  return rupiah;
};

const DetailPembayaran = ({navigation}) => {
  const [isSelected, setSelection] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const id = useSelector((state) => state.order.order_id);
  const [web, setWeb] = useState('');
  const order = useSelector((state) => state.order);
  const state = useSelector((state) => state.TripReducer);
  const en = useSelector((state) => state.language.english);

  // const broadcast = async () => {
  //   try {
  //     const tokens = await AsyncStorage.getItem('token');
  //     Pusher.logToConsole = true;
  //     const pusher = new Pusher('b18ddeb2c00212231da7', {
  //       authEndpoint: 'http://mysupir.omindtech.id/broadcasting/auth',
  //       auth: {
  //         headers: {
  //           Authorization: `Bearer ${tokens}`,
  //         },
  //       },
  //       cluster: 'ap1',
  //     });
  //     const echo = new Echo({
  //       broadcaster: 'pusher',
  //       client: pusher,
  //     });
  //     echo.private(`App.User.${states.user_id}`).notification((notif) => {
  //       if (notif.type === 'App\\Notifications\\DriverNotFoundNotification') {
  //         setModalVisible(false);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error, 'error');
  //   }
  // };

  // useEffect(() => {
  //   broadcast();
  // }, []);

  const payment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        `http://mysupir.com/api/order/proceed/payment/${id}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (res) {
        console.log(res.data);
        setWeb(res.data.web_pay_url);
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // const listen = async () => {
  //   const paymentStatus = await Linking.addListener('paid', (event) => navigation.navigate('HomeTrip'));
  //   console.log(paymentStatus);
  //   if (paymentStatus) {
  //     setModalVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   listen();
  // }, []);
  // useEffect(() => {
  //   payment();
  // }, [id]);

  return (
    <View style={s.page}>
      <Header
        label={en ? "Payment Details" : "Detail Pembayaran"}
        type="shadow"
        onPress={() => navigation.goBack()}
      />
      <View style={s.container}>
        <View style={s.wrapper}>
          <Text style={s.label}>
            {state.based === 'onTime' ? en ? 'Your Location' : 'Lokasi Anda' : en ? 'Trip Route' : 'Rute Perjalanan'}
          </Text>
          {/* <Text style={s.label} numberOfLines={2} ellipsizeMode={'clip'}>{state.start.desc}</Text> */}
          {/* {state.based == onTrip && (<Text>{state.finish.desc}</Text>)} */}
          <Input
            type="underline"
            placeholder={state.start.desc}
            value={state.start.desc}
            icon="locon"
            disable
          />
          {state.based === 'onTrip' ? (
            <Input
              type="underline"
              value={state.finish.desc}
              icon="dot"
              disable
            />
          ) : null}
          {state.perjalanan === 'multitrip' ? (
            <Input
              type="underline"
              value={state?.trip1.desc}
              icon="dot"
              disable
            />
          ) : null}
          <Gap height={25} />
          <Gap height={15} color={'#F5F5F5'} />
          {state.based === 'onTrip' ? (
            <View style={s.bayar}>
              <Text style={s.label}>
                {en ? 'Trip Price' : 'Tarif Perjalanan'}{' '}
                {state.perjalanan === 'multitrip' ? 'Multitrip' : null}
              </Text>
              <View style={s.list}>
                <Text style={s.priceList}>{en ? 'Base Price' : 'Tarif Dasar'}</Text>
                <Text style={s.priceList}>Rp {currencyFormat(order.price)}</Text>
              </View>
              {state.perjalanan === 'multitrip' ? (
                <View style={s.list}>
                  <Text style={s.priceList}>{en ? 'Base Price' : 'Tarif Perjalanan'} 2</Text>
                  <Text style={s.priceList}>Rp 25.000</Text>
                </View>
              ) : null}
              <Gap height={1} color={'#F5F5F5'} />
              <View style={s.total}>
                <Text style={s.totPrice}>{en ? 'Total Price' : 'Total Tarif'}</Text>
                <Text style={s.totPrice}>Rp {currencyFormat(order.price)}</Text>
              </View>
              <View style={s.checkboxContainer}>
                <CheckBox
                  value={isSelected}
                  onValueChange={(val) => setSelection(val)}
                  style={s.checkbox}
                />
                <Text style={s.tnc}>
                  {en ? 'I agree to everything' : 'Saya menyetujui segala'}{' '}
                  <Text style={s.spec}>
                    {en ? 'Terms & Conditions and Privacy Policy' : 'Syarat & Ketentuan dan Kebijakan Privasi'}
                  </Text>{' '}
                  {en ? 'from' : 'dari'} My Supir
                </Text>
              </View>
            </View>
          ) : (
            <View style={s.bayar}>
              <Text style={s.label}>{en ? 'Rent Date' : 'Tanggal Sewa'}</Text>
              <View style={{paddingHorizontal: 20}}>
                <Text style={{...s.priceList, color: '#7C7C7C'}}>
                  {en ? 'Start Time' : 'Tanggal Mulai'}
                </Text>
                <Text
                  style={{
                    ...s.priceList,
                    color: '#303030',
                    fontSize: 10,
                    fontWeight: '600',
                    fontFamily: fonts.primary[600],
                  }}>
                  {convertDate(state.tanggalMulai)} WIB
                </Text>
                <Gap height={10} />
                <Text style={{...s.priceList, color: '#7C7C7C'}}>
                  {en ? 'Finish Time' : 'Tanggal Selesai'}
                </Text>
                <Text
                  style={{
                    ...s.priceList,
                    color: '#303030',
                    fontSize: 10,
                    fontWeight: '600',
                    fontFamily: fonts.primary[600],
                  }}>
                  {convertDate(state.tanggalSelesai)} WIB
                </Text>
              </View>
              <Gap height={15} />
              <Gap height={15} color={'#F5F5F5'} />
              <Text style={s.label}>{en ? 'Trip Price' : 'Tarif Perjalanan'}</Text>
              <View style={s.list}>
                <Text style={s.priceList}>{en ? 'Rent Driver' : 'Sewa Pengemudi'}</Text>
                <Text style={s.priceList}>Rp {order.price}</Text>
              </View>
              <Gap height={1} color={'#F5F5F5'} />
              <View style={s.total}>
                <Text style={s.totPrice}>{en ? 'Total Price' : 'Total Tarif'}</Text>
                <Text style={s.totPrice}>Rp {order.price}</Text>
              </View>
              <View style={s.checkboxContainer}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={s.checkbox}
                />
                <Text style={s.tnc}>
                  {en ? 'I agree to everything' : 'Saya menyetujui segala'}{' '}
                  <Text style={s.spec}>
                    {en ? 'Terms & Conditions and Privacy Policy' : 'Syarat & Ketentuan dan Kebijakan Privasi'}
                  </Text>{' '}
                  {en ? 'from' : 'dari'} My Supir
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={{padding: 20}}>
        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <WebView
              source={{uri: web}}
              onNavigationStateChange={navState => {
                console.log(navState.url);
                if(navState.url === 'about:blank')
                  setModalVisible(false)
              }}

          />
        </Modal>
      </View>
      <View style={s.btnContainer}>
        <Button
          name={web !== '' ? en ? 'Continue Trip' : 'Lanjutkan Perjalanan' : en ? 'Continue Payment' : 'Lanjutkan Pembayaran'}
          onPress={() =>
            web !== '' ? navigation.navigate('HomeTrip') : payment()
          }
          font={16}
          disable={isSelected === false ? true : false}
        />
      </View>
    </View>
  );
};

export default DetailPembayaran;

const s = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    lineHeight: 18,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  labelLoc: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 6,
    fontFamily: fonts.primary[400],
  },
  btnContainer: {
    bottom: 15,
    paddingHorizontal: 20,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
    paddingTop: 5,
  },
  total: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 6,
    justifyContent: 'space-between',
  },
  priceList: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    lineHeight: 15,
    color: '#80807E',
  },
  totPrice: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    lineHeight: 15,
    color: '#80807E',
  },
  checkboxContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  checkbox: {
    alignSelf: 'center',
  },
  tnc: {
    fontSize: 10,
    fontFamily: fonts.primary[400],
    lineHeight: 15,
    color: '#3F3F3F',
    paddingRight: 18,
    alignSelf: 'flex-end',
  },
  spec: {
    fontSize: 10,
    fontFamily: fonts.primary[700],
    lineHeight: 15,
    color: '#3F3F3F',
    paddingRight: 18,
  },
});
