import React, {useState, useEffect, useMemo} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity, Image,
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Header, Button, DriverNotFound, DriverFound} from '../../components';
import {IcLocOn, IcDarkDotBg, IcRingo} from '../../assets';
import {colors, fonts, getData, getDistance, formatRp} from '../../utils';
import ModalCari from '../../components/molecules/Modal/ModalCariDriver';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Pusher from 'pusher-js/react-native';

import {useDispatch, useSelector} from 'react-redux';
import {convertDate} from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Echo from 'laravel-echo';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBqHYPUOXnXhE9CcUOgua9Ru6cv-IBWAB8';

const CreateTrack = ({navigation, route}) => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.TripReducer);

  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = states.start.coord.lat;
  const LONGITUDE = states.start.coord.lng;
  const LATITUDE_DELTA = 0.055;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const en = useSelector((state) => state.language.english);

  // console.log('tipe', states.jenisPerjalanan);
  // console.log('start', states.start);
  // console.log('fin', states.trip1);
  // console.log('tglMulai', convertDate(states.tanggalMulai));
  // console.log('tglSelesi', states.tanggalSelesai);

  let initialCoordinates = null;

  if (states.finish.coord) {
    initialCoordinates = [
      {
        latitude: states.start.coord.lat,
        longitude: states.start.coord.lng,
      },
      {
        latitude: states.finish.coord.lat,
        longitude: states.finish.coord.lng,
      },
    ];

    if(states.trip2.coord)
      initialCoordinates.push({
        latitude: states.trip2.coord.lat,
        longitude: states.trip2.coord.lng,
      });
  }

  const [coordinates] = useState(initialCoordinates);
  const [onCari, setOnCari] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [found, setFound] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [token, setToken] = useState(null);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  const [driverDatas, setDriverDatas] = useState([]);
  const [price, setPrice] = useState(0);

  const [error, setError] = useState('');

  const [origin, setOrigin] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        console.log('ini POS', pos);
        setError('');
        setOrigin({
          ...origin,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (e) => setError(e.message),
    );
  }, []);

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('token');
    console.log(tokens);
    setToken(tokens);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    console.log('states.trip2.coord : ', states.trip2.coord);
    let p =
      Object.keys(states.finish).length === 0
        ? getDistance(states.start.coord, states.trip1.coord)
        : getDistance(states.start.coord, states.finish.coord);

    if(states.trip2.coord)
      p += getDistance(states.trip1.coord, states.trip2.coord);

    let lat_finish = states.finish.coord !== []
        ? [states.finish.coord.lat]
        : [states.trip1.coord.lat];

    let long_finish = states.finish.coord !== []
        ? [states.finish.coord.lng]
        : [states.trip1.coord.lng];

    let name_finish = [states.trip1.desc];

    if(states.trip2.coord){
      lat_finish.push(states.trip2.coord.lat);
      long_finish.push(states.trip2.coord.lng);
      name_finish.push(states.trip2.desc);
    }

    setDistance(p);
    const data = {
      car_type_id: states.carType,
      lat_start: states.start.coord.lat,
      long_start: states.start.coord.lng,
      name_start: states.start.desc,
      notes: states.notes,
      lat_finish,
      long_finish,
      name_finish,
      total_distance: distance,
    };
    console.log('data', data);
    axios
      .post('http://mysupir.com/api/order/trip/check', data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('res cek harga', res);
        dispatch({type: 'SET_PRICE', payload: res.data.total_price});
        setPrice(res.data.total_price);
      })
      .catch((e) => console.log(e.response.data));
  }, [
    dispatch,
    distance,
    states.carType,
    states.notes,
    states.start.coord,
    states.start.desc,
    states.finish.coord,
    states.finish.desc,
    states.trip1.coord,
    states.trip1.desc,
    token,
  ]);

  // const getPrice = () => {

  // };

  console.log(token);
  console.log('harga', price);

  const getDriver = () => {
    axios
      .get(
        `http://mysupir.com/api/driver-location?lat=${origin.latitude}&long=${origin.longitude}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log('res', res.data);
        setDriverDatas(res.data);
        setModalVisible(false);
        setOnCari(true);
        setFound(true);
      })
      .catch((e) => {
        console.log(e);
        setModalVisible(false);
        setFound(false);
        setOnCari(true);
        setNotFound(true);
      });
  };

  const orderTime = async () => {
    try {
      // const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        'http://mysupir.com/api/order/time',
        route.params.onTime,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (res) {
        console.log(res.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const broadcast = async () => {
    try {
      const tokens = await AsyncStorage.getItem('token');
      Pusher.logToConsole = true;
      const pusher = new Pusher('b18ddeb2c00212231da7', {
        authEndpoint: 'http://mysupir.com/broadcasting/auth',
        auth: {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        },
        cluster: 'ap1',
      });
      const echo = new Echo({
        broadcaster: 'pusher',
        client: pusher,
      });
      echo.private(`App.User.${states.user_id}`).notification((notif) => {
        if (notif.type === 'App\\Notifications\\DriverNotFoundNotification') {
          setNotFound(true);
          setOnCari(false);
          setModalVisible(false);
        } else if (
          notif.type === 'App\\Notifications\\DriverFoundNotification'
        ) {
          console.log('found');
          setModalVisible(false);
          setOnCari(false);
          setFound(true);
          dispatch({
            type: 'ORDER',
            order_id: notif.order.id,
            driver_id: notif.driver.id,
            driver_name: notif.driver.name,
            car_type: notif.order.car_type_id,
            notes: notif.order.notes,
            total_distance: notif.order.total_distance,
            payment_status: notif.order.transaction.status,
            price: notif.order.transaction.total_price,
            driver_pict:
              'http://mysupir.com/get_image?img_path=' +
              notif.driver.foto,
            driver_phone: notif.driver.phone_number,
            order_type: notif.order.type,
            rating: notif.driver_rating,
            start_dateTime: notif.order.start_datetime,
            end_dateTime: notif.order.finish_datetime,
          });
        }
      });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    broadcast();
  }, []);

  const cancelOrder = async (id) => {
    setModalVisible(false);
    setOnCari(false);
    setFound(false);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        `http://mysupir.com/api/order/cancel-search/${orderId}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
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

  const createOrder = async () => {
    const formData = new FormData();
    formData.append('car_type_id', states.carType);
    formData.append('lat_start', states.start.coord.lat);
    formData.append('long_start', states.start.coord.lng);
    formData.append('name_start', states.start.desc);
    formData.append('notes', states.notes);
    formData.append('lat_finish[0]', states.finish.coord.lat);
    formData.append('long_finish[0]', states.finish.coord.lng);
    formData.append('name_finish[0]', states.finish.desc);
    formData.append('distance[0]', distance);
    formData.append('total_distance', distance);
    try {
      // const tokens = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        'http://mysupir.com/api/order/trip',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (res !== null) {
        console.log(res.data);
        setOrderId(res.data.order.id);
        setTime(60);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log(orderId);

  useMemo(() => {
    if (time > 0 && onCari === true) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time < 1 && onCari === true) {
      cancelOrder();
      setNotFound(true);
    }
  }, [time]);

  const notification = () => {
    if (modalVisible) {
      return (
        <ModalCari
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          setOnCari={setOnCari}
          setFound={setFound}
          setNotFound={setNotFound}
          cancel={cancelOrder}
        />
      );
    }
    if (notFound) {
      return (
        <DriverNotFound
          notFound={notFound}
          again={() => {
            createOrder();
            setOnCari(true);
            setModalVisible(true);
            setNotFound(false);
          }}
          onClose={() => {
            setNotFound(false);
            setOnCari(false);
            setModalVisible(false);
            navigation.navigate('Home');
          }}
        />
      );
    }
    if (found) {
      return (
        <DriverFound
          setFound={setFound}
          found={found}
          setNotFound={setNotFound}
          setOnCari={setOnCari}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          onPress={() => {
            navigation.navigate('Pembayaran');
            setFound(false);
            setOnCari(false);
            setModalVisible(false);
            setNotFound(false);
          }}
          navigation={navigation}
          driverDatas={driverDatas}
        />
      );
    }
  };

  let mapView = null;

  return (
    <>
      <View style={styles.container}>
        <MapView
          initialRegion={origin}
          style={StyleSheet.absoluteFill}
          ref={(c) => (mapView = c)}>
          {states.based === 'onTrip' &&
            coordinates.map((coordinate, index) => (
              index === 0 ?
                <MapView.Marker
                  key={`coordinate_${index}`}
                  coordinate={coordinate}
                >
                  <IcRingo/>
                </MapView.Marker>:
                <MapView.Marker
                    key={`coordinate_${index}`}
                    coordinate={coordinate}
                />
            ))}
          {states.based === 'onTrip' && (
            <>
              <MapViewDirections
                  origin={{
                    latitude: states.start.coord.lat,
                    longitude: states.start.coord.lng,
                  }}
                  destination={{
                    latitude: states.finish.coord.lat,
                    longitude: states.finish.coord.lng,
                  }}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="#17273F"
                  optimizeWaypoints={true}
                  onStart={(params) => {
                    console.log(
                        `Started routing between "${params.origin}" and "${params.destination}"`,
                    );
                  }}
                  onError={(errorMessage) => {
                    console.log('GOT AN ERROR', errorMessage);
                    console.log(errorMessage);
                  }}
              />
              {states.perjalanan === 'multitrip' &&
                <MapViewDirections
                    origin={{
                      latitude: states.trip1.coord.lat,
                      longitude: states.trip1.coord.lng,
                    }}
                    destination={{
                      latitude: states.trip2.coord.lat,
                      longitude: states.trip2.coord.lng,
                    }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="#17273F"
                    optimizeWaypoints={true}
                    onStart={(params) => {
                      console.log(
                          `Started routing between "${params.origin}" and "${params.destination}"`,
                      );
                    }}
                    onError={(errorMessage) => {
                      console.log('GOT AN ERROR', errorMessage);
                      console.log(errorMessage);
                    }}
                />
              }
            </>
          )}
        </MapView>
        <Header type="back-only" onPress={() => navigation.goBack()} />
        {states.based === 'onTime'
          ? !onCari && (
              <View style={s.wrapper}>
                <View style={s.div} />
                <Text style={[s.txttitle, {paddingBottom: 0}]}>
                  {en ? 'Car Type' : 'Tipe Mobil'}
                </Text>
                <Text
                  style={[
                    s.txttitle,
                    {fontSize: 12, color: '#303030', paddingTop: 3},
                  ]}>
                  {states.carType === 1 ? 'Sedan' :
                      states.carType === 2 ? 'Pickup' :
                      states.carType === 3 ? 'Minibus' :
                      states.carType === 4 ? 'Berat' : ''
                  }
                </Text>
                <Text style={[s.txttitle, {paddingBottom: 0}]}>
                  {en ? 'Location' : 'Lokasi'}
                </Text>
                <View style={s.from}>
                  <IcLocOn />
                  <View style={s.rows}>
                    <Text style={s.input}>{states.start.desc}</Text>
                  </View>
                </View>
                <Text style={[s.txttitle, {paddingBottom: 0}]}>
                  {en ? 'Rent Date' : 'Tanggal Sewa'}
                </Text>
                <View style={{...s.from, justifyContent: 'space-between'}}>
                  <View>
                    <Text
                      style={[
                        s.txttitle,
                        {fontSize: 10, color: '#7C7C7C', paddingVertical: 0},
                      ]}>
                      {en ? 'Start Time' : 'Tanggal Mulai'}
                    </Text>
                    <Text
                      style={[
                        s.txttitle,
                        {fontSize: 10, color: '#303030', paddingVertical: 0},
                      ]}>
                      {convertDate(states.tanggalMulai)} WIB
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        s.txttitle,
                        {fontSize: 10, color: '#7C7C7C', paddingVertical: 0},
                      ]}>
                      {en ? 'Finish Time' : 'Tanggal Selesai'}
                    </Text>
                    <Text
                      style={[
                        s.txttitle,
                        {fontSize: 10, color: '#303030', paddingVertical: 0},
                      ]}>
                      {convertDate(states.tanggalSelesai)} WIB
                    </Text>
                  </View>
                </View>
                <View style={s.pricing}>
                  <Text style={s.txttitle}>
                    {en ? 'Total Price' : 'Total Pembayaran'}
                  </Text>
                  <Text style={s.amount}>Rp {formatRp(states.totPrice)}</Text>
                </View>
                <Button
                  name={en ? 'Search Driver' : 'Cari Pengemudi'}
                  type="next"
                  font={16}
                  onPress={() => {
                    setOnCari(true);
                    setModalVisible(true);
                    // setFound(false);
                    orderTime();
                  }}
                />
              </View>
            )
          : !onCari && (
              <View style={s.wrapper}>
                <View style={s.div} />
                <Text style={s.txttitle}>
                  {en ? 'Destination Trip' : 'Tujuan Perjalanan'}{' '}
                  {states.perjalanan === 'multitrip' ? ' - Multitrip' : null}
                </Text>
                <View style={s.from}>
                  <IcLocOn />
                  <View style={s.rows}>
                    <Text style={s.input}>{states.start.desc}</Text>
                  </View>
                </View>
                <View style={s.from}>
                  <IcDarkDotBg />
                  <View style={s.rows}>
                    <Text style={s.input}>{states.finish.desc}</Text>
                  </View>
                </View>
                {states.perjalanan === 'multitrip' &&
                  <View style={s.from}>
                    <IcDarkDotBg />
                    <View style={s.rows}>
                      <Text style={s.input}>{states.trip2.desc}</Text>
                      <TouchableOpacity
                          onPress={() => navigation.navigate('DetailPerjalanan')}>
                        <Text style={s.detail}>
                          {en ? 'See Detail' : 'Lihat detail'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
                <View style={s.pricing}>
                  <Text style={s.txttitle}>
                    {en ? 'Total Pricet' : 'Total Pembayaran'}
                  </Text>
                  <Text style={s.amount}>Rp {formatRp(states.totPrice)}</Text>
                </View>
                <Button
                  name={en ? 'Search Driver' : 'Cari Pengemudi'}
                  type="next"
                  font={16}
                  onPress={() => {
                    // getDriver();
                    setOnCari(true);
                    setModalVisible(true);
                    // setFound(false);
                    createOrder();
                  }}
                />
              </View>
            )}

        {notification()}
      </View>
    </>
  );
};

export default CreateTrack;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const s = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  input: {
    fontSize: 14,
    color: '#80807E',
    fontFamily: fonts.primary[400],
    lineHeight: 18,
    paddingBottom: 3,
    flex: 1,
  },
  txttitle: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    fontWeight: '600',
    lineHeight: 18,
    paddingVertical: 8,
    color: '#282828',
  },
  from: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  amount: {
    fontSize: 18,
    fontFamily: fonts.primary[700],
    lineHeight: 23,
    paddingVertical: 8,
    color: colors.text.primary,
  },
  div: {
    height: 2,
    width: 40,
    backgroundColor: '#c4c4c4',
    alignSelf: 'center',
    marginBottom: 10,
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F6',
    marginHorizontal: 10,
  },
  detail: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    lineHeight: 18,
    textDecorationLine: 'underline',
  },
});
