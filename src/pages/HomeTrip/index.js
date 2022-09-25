import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Linking,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Overlay,
  Clipboard,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Icon, Button as ButtonOutline} from 'react-native-elements';
// import FastImage from 'react-native-fast-image';
import {
  TouchableWithoutFeedback,
  RotationGestureHandler,
  FlatList,
} from 'react-native-gesture-handler';
// import {Modal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import MyModalReminder from '../../components/molecules/Modal/ModalHomeTrip';
import MyModalReminderOnTime from '../../components/molecules/Modal/ModalHomeOnTime';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  IcMessages,
  IcCallPhone,
  DummyProfile,
  IcStarSm,
  ILPancic,
  IcMobil,
  IcCar,
  IcLocOn,
  ILTimeEnd,
} from '../../assets';
import {Header, Gap, Button} from '../../components';
import CountDown from 'react-native-countdown-component';
import {fonts, colors, convertDate} from '../../utils';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';
import Geolocation from "@react-native-community/geolocation";

const HomeTrip = () => {
  // const origin = {latitude: -6.160824226780151, longitude: 106.555384285748};
  // const destination = {
  //   latitude: -6.165706965193671,
  //   longitude: 106.55869413167238,
  // };

  const origin = useSelector((state) => state.TripReducer.start.coord);
  const destination = useSelector((state) => state.TripReducer.finish.coord);

  // const GOOGLE_MAPS_APIKEY = 'AIzaSyALvj15UY8dZ63ZGV2t_BSfRPa97Qh11LY'; //APIKEY sementara
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBqHYPUOXnXhE9CcUOgua9Ru6cv-IBWAB8';
  const [modal, setModal] = useState(false);
  const [ended, setEnded] = useState(false);
  const [driverArrived, setDriverArrived] = useState(false);
  const [isArrived, setIsArrived] = useState(false);
  const [lanjut, setLanjut] = useState(false);
  const [currLat, setCurrLat] = useState(origin.lat);
  const [currLng, setCurrLng] = useState(origin.lng);
  const [currDistance, setCurrDistance] = useState(9999);
  const [isNearReminded, setIsNearReminded] = useState(false); // apakah sudah diingatkan kalau dekat (1 km)?
  const navigation = useNavigation();
  const states = useSelector((state) => state.TripReducer);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.order.order_id);
  const order = useSelector((state) => state.order);
  const [images, setImages] = useState([]);
  const [chatId, setChatId] = useState(0);
  const en = useSelector((state) => state.language.english);
  const [status, setStatus] = useState(false);

  const [timeLeft, setTimeLeft] = useState(false);
  const [isEndedOnTime, setIsEndedOnTime] = useState(false);
  const [isAddTimeEnded, setIsAddTimeEnded] = useState(false);

  console.log(order);

  //
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  console.log(origin, destination);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getImage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.get(
        `http://mysupir.com/api/order/detail/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (res) {
        setImages(res.data.data.order.initial_photo);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const getDistance = async (origins, destinations) => {
    try {
      const {data} = await Axios.get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?key=${GOOGLE_MAPS_APIKEY}&origins=${origins}&destinations=${destinations}`
      );
      if (data) {
        console.log('jarak', data);
        let currDist = data.rows[0].elements[0].distance.value;

        setCurrDistance(currDist);

        console.log('isNearReminded', isNearReminded);
        if(currDist <= 1000){
          if(isNearReminded === false){
            setModal(true);
            setIsNearReminded(true);
          }
        }
      }
    } catch (error) {
      console.log(error, 'error');
    }
  }

  const different = useMemo(() => {
    if (order.order_type === 'time') {
      return moment(order.end_dateTime).diff(
        moment(order.start_dateTime),
        'second',
      );
    } else {
      return 0;
    }
  }, [order]);

  console.log(order.end_dateTime);

  console.log(different);

  const triggerStart = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        `http://mysupir.com/api/order/trigger-start/${id}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (res) {
        console.log(res);
        setStatus(true);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const getOrder = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.get(
        `http://mysupir.com/api/order/detail/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (res) {
        console.log(res.data.order.conversation_id);
        setChatId(res.data.order.conversation_id);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };
  useEffect(() => {
    if (images.length < 0) {
      setInterval(() => {
        getImage();
      }, 10000);
    }
  }, [images, getImage]);

  const watchLocation = () => {
    Geolocation.watchPosition(pos => {
      let {latitude, longitude} = pos.coords;
      console.log(pos);

      setCurrLat(latitude);
      setCurrLng(longitude);

      getDistance(`${latitude}, ${longitude}`,`${destination.lat}, ${destination.lng}`)
    }, error => {
      console.log('error', error);
    })
  }

  useEffect(() => {
    triggerStart();
    watchLocation();
    getDistance(`${origin.lat}, ${origin.lng}`,`${destination.lat}, ${destination.lng}`);
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleAddTime = async () => {
    setIsAddTimeEnded(false);
    // dispatch({
    //   type: 'SET_ENDTIME',
    //   payload: moment(date).format('YYYY-MM-DD HH:mm'),
    // });
    // navigation.navigate('Pembayaran');
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        `http://mysupir.com/api/order/time/additional/${id}`,
        {
          lat_start: destination.lat,
          long_start: destination.lng,
          name_start: states.finish.desc,
          finish_date: moment(date).format('DD-MM-YYYY'),
          finish_time: moment(date).format('HH:mm'),
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      if (res) {
        navigation.navigate('Pembayaran');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const handleDetailFoto = (color, id) => {
    navigation.navigate('DetailFoto', {foto: color, id});
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
        if (notif.type == 'App\\Notifications\\OrderFinishedNotification') {
          navigation.navigate('BeriNilai');
        }
        else if (notif.type == 'App\\Notifications\\OrderStartedNotification') {
          setIsArrived(true);
        }
      });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    broadcast();
    getOrder();
  }, []);

  const finish = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        `http://mysupir.com/api/order/trigger-finish/${id}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (res) {
        alert(
          'Permintaan Selesai anda sudah di terima \n Mohon tunggu driver untuk konfirmasi ya',
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const openGps = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${origin.lat},${origin.lng}`;
    const label = 'Open Google Map';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  const {width, height} = Dimensions.get('window');
  const aspectRatio = width / height;
  const latitudeDelta = 0.0822;
  const longitudeDelta = latitudeDelta * aspectRatio;

  return (
    <>
      <View style={styles.container}>
        <MapView
          region={{
            latitude: currLat,
            longitude: currLng,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
          style={styles.map}
          provider={PROVIDER_GOOGLE}>
          {states.based == 'onTrip' && (
            <>
              <Marker
                coordinate={{
                  latitude: destination.lat,
                  longitude: destination.lng,
                  latitudeDelta: latitudeDelta,
                  longitudeDelta: longitudeDelta,
                }}>
                <View style={styles.labelContainer}>
                  <Text
                    style={styles.labelText}
                    numberOfLines={1}
                    ellipsizeMode={'clip'}>
                    {states.finish.desc}
                  </Text>
                </View>
                <Icon
                  type="material-community"
                  name="map-marker"
                  size={30}
                  color="#17273F"
                />
              </Marker>
            </>
          )}
          <Marker
            coordinate={{
              latitude: currLat,
              longitude: currLng,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            }}>
            {status === true ? (
              <View>
                <IcCar />
              </View>
            ) : (
              <>
                {states.based == 'onTrip' && (
                  <>
                    <View style={styles.labelContainer}>
                      <Text
                        style={styles.labelText}
                        numberOfLines={1}
                        ellipsizeMode={'clip'}>
                        {states.finish.desc}
                      </Text>
                    </View>
                    <Icon
                      type="material-community"
                      name="account"
                      size={24}
                      color="#FFF"
                      containerStyle={{
                        backgroundColor: '#17273F',
                        borderRadius: 100,
                        alignSelf: 'center',
                      }}
                    />
                  </>
                )}
              </>
            )}
          </Marker>
          {states.based == 'onTrip' && (
            <MapViewDirections
              origin={{
                latitude: currLat,
                longitude: currLng,
              }}
              destination={{
                latitude: destination.lat,
                longitude: destination.lng,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="#17273F"
            />
          )}
        </MapView>

        {/* DUMMY BUTTON TO SET isARRIVED TRUE
        {states.based === 'onTrip' ? (
          <>
            <View
              style={{position: 'absolute', left: 3, top: 200}}
              activeOpacity={0.5}>
              <ButtonOutline
                onPress={() => setIsArrived(!modal)}
                title="sampai"
                containerStyle={{width: 150}}
              />
            </View>
            <View
              style={{position: 'absolute', left: 3, top: 240}}
              activeOpacity={0.5}>
              <ButtonOutline
                onPress={() => setModal(!modal)}
                title="1 km lagi"
                containerStyle={{width: 150}}
              />
            </View>
          </>
        ) : (
          <>
            <View
              style={{position: 'absolute', left: 3, top: 200}}
              activeOpacity={0.5}>
              <ButtonOutline
                onPress={() => setIsEndedOnTime(!modal)}
                title="Selesai"
                containerStyle={{width: 150}}
              />
            </View>
            <View
              style={{position: 'absolute', left: 3, top: 240}}
              activeOpacity={0.5}>
              <ButtonOutline
                onPress={() => setTimeLeft(!timeLeft)}
                title="15 mnt lagi"
                containerStyle={{width: 150}}
              />
            </View>
          </>
        )}*/}
        <Overlay style={{width: '100%', bottom: 0}}>
          {lanjut === true && states.based === 'onTime' ? (
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
                {states.carType}
              </Text>
              <Text style={[s.txttitle, {paddingBottom: 0}]}>
                {en ? 'Location' : 'Lokas'}i
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
                <View>
                  <Text style={s.txttitle}>
                    {en ? 'Total Price' : 'Total Pembayaran'}
                  </Text>
                  <Text
                    style={[
                      s.txttitle,
                      {
                        fontSize: 10,
                        color: '#2BA91B',
                        paddingVertical: 0,
                        maxWidth: 126,
                      },
                    ]}>
                    {en
                      ? 'Pembayaran Berhasil, Silahkan lanjutkan pesanan'
                      : 'Pembayaran Berhasil, Silahkan lanjutkan pesanan'}
                  </Text>
                </View>
                <Text style={s.amount}>Rp 225.000</Text>
              </View>
              <Button
                name="Lanjut"
                type="next"
                font={16}
                onPress={() => setLanjut(false)}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.panic}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Panic')}>
                <Image source={ILPancic} style={styles.panicImage} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.google}
                onPress={openGps}>
                <Text style={styles.googleText}>
                  {en ? 'See at Google Maps' : 'Lihat di Google Maps'}
                </Text>
              </TouchableOpacity>
              <View style={styles.customerCard}>
                <View style={styles.customer}>
                  <View style={styles.customerInfo}>
                    <Image
                      source={{
                        uri: order.driver_pict,
                      }}
                      style={styles.customerImage}
                    />
                    <View style={styles.custCol}>
                      <View style={styles.custRow}>
                        <Text style={styles.customerName}>
                          {order.driver_name}
                        </Text>
                        <Text style={styles.rate}>{order.rating}</Text>
                        <IcStarSm />
                      </View>
                      <Text style={styles.statusDriver}>
                        {driverArrived
                          ? `${en ? "It's here" : 'Sudah sampai nih'}`
                          : `${
                              en
                                ? 'The driver is at your place'
                                : 'Pengemudi sedang ketempatmu'
                            }`}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.contact}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() =>
                        navigation.navigate('ChatScreen', {id: chatId})
                      }>
                      <IcMessages />
                    </TouchableOpacity>
                    <Gap width={10} />
                  </View>
                </View>
                {images.length !== 0 ? (
                  <>
                    <Gap height={15} />
                    <Gap height={3} color={'#EFEFEF'} />
                    <View style={{paddingHorizontal: 20}}>
                      <Gap height={10} />
                      <Text style={styles.fotoTitle}>
                        {en ? 'Car Picture' : 'Foto Mobil'}
                      </Text>
                      <Gap height={5} />
                      <View style={styles.imgContainer}>
                        <FlatList
                          data={images}
                          renderItem={({item, index}) => (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              key={String(item.id)}
                              onPress={() =>
                                handleDetailFoto(item.color, item.id)
                              }>
                              <View style={styles.image(item.color)} />
                            </TouchableOpacity>
                          )}
                          horizontal={true}
                          initialNumToRender={5}
                        />
                      </View>
                    </View>
                  </>
                ) : null}

                {!isArrived ? (
                  <View style={styles.btnContainer}>
                    <ButtonOutline
                      title={en ? 'Cancel Driver' : 'Batalkan Pengemudi'}
                      type="outline"
                      buttonStyle={{
                        borderColor: '#F45263',
                        borderRadius: 6,
                        height: 46,
                      }}
                      titleStyle={{
                        color: '#F45263',
                        paddingVertical: 13,
                        fontSize: 16,
                      }}
                      onPress={() => navigation.navigate('Pembatalan')}
                    />
                    <Gap height={15} />
                  </View>
                ) : (
                  <View style={styles.btnContainer}>
                    <Button
                      name={en ? 'Finish Trip' : 'Perjalanan Selesai'}
                      font={16}
                      weight={600}
                      onPress={() => setEnded(true)}
                    />
                    <Gap height={15} />
                  </View>
                )}
              </View>
            </>
          )}
        </Overlay>
        <Overlay>
          <Header type="back-only" onPress={() => navigation.goBack()} />
        </Overlay>
        {states.based === 'onTrip' ? (
          <View style={{marginHorizontal: 15}}>
            <View style={styles.destinationInfo}>
              <View style={styles.desIcon}>
                <Icon
                  type="material-community"
                  name="map-marker"
                  size={20}
                  color="#17273F"
                />
                <Icon
                  type="material-community"
                  name="circle"
                  size={4}
                  color="#C4C4C4"
                  containerStyle={styles.icon}
                />
                <Icon
                  type="material-community"
                  name="circle"
                  size={2}
                  color="#C4C4C4"
                  containerStyle={styles.icon}
                />
                <Icon
                  type="material-community"
                  name="circle"
                  size={2}
                  color="#C4C4C4"
                  containerStyle={styles.icon}
                />
                <Icon
                  type="material-community"
                  name="circle"
                  size={2}
                  color="#C4C4C4"
                  containerStyle={styles.icon}
                />
                <Icon
                  type="material-community"
                  name="circle"
                  size={2}
                  color="#C4C4C4"
                  containerStyle={styles.icon}
                />
                <Icon
                  type="material-community"
                  name="circle"
                  size={10}
                  color="#17273F"
                  containerStyle={{marginTop: 2}}
                />
              </View>
              <View style={styles.des}>
                <View style={styles.palace}>
                  <Text style={styles.desText}>{states.start.desc}</Text>
                </View>
                <View style={[styles.palace, {marginBottom: 10}]}>
                  <Text style={styles.desText}>{states.finish.desc}</Text>
                </View>
                {states.perjalanan === 'multitrip' ? (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => Alert.alert('Oops,.blm ada!')}>
                    <Text style={styles.linkDetail}>
                      {en ? 'See Details' : 'Lihat Detail'}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        ) : (
          // <CountDown
          //   setTimeLeft={setTimeLeft}
          //   setIsEndedOnTime={setIsEndedOnTime}
          // />
          <CountDown
            until={different}
            size={20}
            style={{
              marginTop: 65,
            }}
            onFinish={() => {
              setIsEndedOnTime(true);
            }}
            onChange={() => {
              if (different === 900) {
                setTimeLeft(true);
              }
            }}
            digitStyle={{backgroundColor: '#FFFF'}}
            running={status}
            timeLabelStyle={styles.labelDigit}
            timeLabels={{
              m: en === true ? 'Minute' : 'Menit',
              s: en === true ? 'Second' : 'Detik',
              d: en === true ? 'Day' : 'Hari',
              h: en === true ? 'Hour' : 'Jam',
            }}
            digitTxtStyle={styles.digit}
          />
        )}
      </View>
      {timeLeft && (
        <MyModalReminderOnTime
          visible={timeLeft}
          setTimeLeft={setTimeLeft}
          setIsEndedOnTime={setIsEndedOnTime}
          timeLeft={timeLeft}
          modal
          title={en ? 'Your Time Is Running Out' : 'Waktu Anda Hampir Habis'}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum tellus nec, at faucibus diam porta nisl quam."
          upperPress={() => {
            setIsAddTimeEnded(true);
            setTimeLeft(false);
          }}
          bottomPress={() => {
            setTimeLeft(false);
          }}
        />
      )}
      <MyModalReminder
        visible={modal}
        setVisible={setModal}
        setEnded={setEnded}
        modal
        title={en ? 'Your trip will be over' : 'Perjalanan Anda Akan Selesai'}
        content=""
        upperPress={() => {
          navigation.navigate('PilihTujuanLagi');
          setModal(false);
        }}
        bottomPress={() => {
          setModal(false);
          console.log('isNearReminded from modalee', isNearReminded);
        }}
      />
      <MyModalReminder
        visible={ended}
        setEnded={setEnded}
        ended
        title={
          en
            ? 'Are You Sure You Will End the Trip?'
            : 'Anda Yakin Akan Menyelesaikan Perjalanan?'
        }
        content={
          en
            ? 'Your trip is over. Thank you for taking the trip with MySupir!'
            : 'Perjalanan anda sudah berakhir. Terimakasih sudah melakukan perjalanan dengan MySupir!'
        }
        upperPress={() => {
          setEnded(false);
          finish();
        }}
        bottomPress={() => setEnded(false)}
      />
      <Modal
        style={s.view}
        isVisible={isEndedOnTime}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={s.centeredView}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
            barStyle="light-content"
          />
          <View style={s.modalView}>
            <Text style={s.modalTextTitle}>
              {en ? 'Your time is out' : 'Waktu Anda Telah Habis'}
            </Text>
            <Gap height={20} />
            <View style={s.imgModalContainer}>
              <Image source={ILTimeEnd} style={s.img} />
            </View>
            <Gap height={34} />
            <View style={s.desc}>
              <Text style={s.descText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Fermentum tellus nec, at faucibus diam porta nisl quam.
              </Text>
            </View>
            <Gap height={35} />
            <ButtonOutline
              title="Selesai"
              type="outline"
              buttonStyle={{
                borderColor: '#17273F',
                borderRadius: 6,
                height: 46,
              }}
              titleStyle={{
                color: '#17273F',
                paddingVertical: 13,
                fontSize: 16,
              }}
              onPress={() => {
                setIsEndedOnTime(false);
                finish();
              }}
            />
            <Gap height={15} />
          </View>
        </View>
      </Modal>
      <Modal
        style={s.view}
        isVisible={isAddTimeEnded}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={s.centeredView}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
            barStyle="light-content"
          />
          <View style={s.modalView}>
            <Text style={s.modalTextTitle}>
              {en ? 'Set Finish time' : 'Atur Waktu Selesai'}
            </Text>
            <Gap height={20} />
            <View style={styles.dateContainer}>
              <View style={styles.date}>
                <Icon
                  type="material-community"
                  name="calendar-blank"
                  size={20}
                  color="#6C6C6C"
                />
                <TouchableOpacity onPress={showDatepicker}>
                  <Text style={{paddingLeft: 5, color: '#c4c4c4'}}>
                    {states.tanggalSelesai === null ? (
                      en ? (
                        'Choose Date'
                      ) : (
                        'Pilih Tanggal'
                      )
                    ) : (
                      <Text style={{paddingLeft: 5, color: '#151515'}}>
                        {moment(date).format('DD-MM-YYYY')}
                      </Text>
                    )}
                  </Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                    timeZoneOffsetInMinutes={60 * 7}
                    format="YYYY-MM-DD HH:mm"
                  />
                )}
              </View>
              <Gap width={10} />
              <View style={styles.time}>
                <Icon
                  type="material-community"
                  name="timer-outline"
                  size={20}
                  color="#6C6C6C"
                />
                <TouchableOpacity onPress={showTimepicker}>
                  <Text style={{paddingLeft: 5, color: '#c4c4c4'}}>
                    {states.tanggalSelesai === null ? (
                      'Jam'
                    ) : (
                      <Text style={{paddingLeft: 5, color: '#151515'}}>
                        {moment(date).format('HH:mm')}
                      </Text>
                    )}
                  </Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                    timeZoneOffsetInMinutes={60 * 7}
                    format="YYYY-MM-DD HH:mm"
                  />
                )}
              </View>
            </View>
            <Gap height={35} />
            <Button
              name="Lanjut Pembayaran"
              font={16}
              weight={600}
              onPress={() => {
                handleAddTime();
              }}
            />
            <Gap height={15} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HomeTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelDigit: {
    fontFamily: 'Roboto',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#17273F',
    position: 'absolute',
    bottom: 0,
  },
  digit: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 26,
    color: '#17273F',
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    marginTop: 2,
  },
  finish: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 17,
    borderColor: '#F1F3F6',
    marginHorizontal: 20,
    paddingBottom: 15,
  },
  finishImage: {
    width: 180,
    height: 120,
    alignSelf: 'center',
    marginTop: 47,
  },
  finishButton: {
    marginHorizontal: 70,
    borderRadius: 8,
    marginTop: 5,
  },
  finishTitle: {
    fontSize: 18,
    fontFamily: 'Source Sans Pro',
    fontWeight: 'bold',
    color: '#17273F',
    textAlign: 'center',
    maxWidth: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  finishButtonTitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  finishMessage: {
    fontFamily: 'Source Sans Pro',
    fontSize: 12,
    color: '#535353',
    textAlign: 'center',
    marginHorizontal: 32,
    marginVertical: 10,
  },
  modalButton: {
    marginTop: 5,
    marginHorizontal: 70,
    marginBottom: 15,
    borderRadius: 8,
  },
  photo: {
    width: 181,
    height: 79,
    marginTop: 34,
    alignSelf: 'center',
  },
  car: {
    width: undefined,
    height: 31,
    aspectRatio: 2 / 3,
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: (warna) => ({
    width: 63,
    height: 63,
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 10,
    backgroundColor: warna,
  }),
  modalButtonTitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 12,
    fontFamily: 'Source Sans Pro',
    color: '#80807E',
    textAlign: 'center',
    marginHorizontal: 31,
    marginTop: 6,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#F1F3F6',
    marginHorizontal: 20,
  },
  back: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.25,
    elevation: 4,
    marginLeft: 15,
    marginTop: 40,
  },
  label: {
    width: 117,
    height: 29,
    position: 'absolute',
  },
  panic: {
    marginBottom: 10,
    marginRight: 20,
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    alignSelf: 'flex-end',
    backgroundColor: 'yellow',
    right: 5,
  },
  panicImage: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
  },
  labelText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 10,
    color: '#000',
    marginVertical: 4,
    marginLeft: 7,
    paddingRight: 9,
    marginRight: 8,
    maxWidth: 120,
  },
  desText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 13,
    fontWeight: '600',
    color: '#80807E',
  },
  palace: {
    marginTop: 17,
  },
  des: {
    marginLeft: 12,
    width: '88%',
    paddingRight: 15,
    paddingBottom: 5,
    marginRight: 20,
  },
  desIcon: {
    alignSelf: 'flex-start',
    marginTop: 15,
    marginLeft: 14,
  },
  destinationInfo: {
    flexDirection: 'row',
    marginTop: 85,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F1F3F6',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 5,
    },
    elevation: 5,
    width: '100%',
  },
  priceTitle: {
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    color: '#636363',
    marginLeft: 20,
  },
  buttonTitle: {
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    color: '#FFF',
  },
  button: {
    borderRadius: 5,
    marginHorizontal: 28,
    marginVertical: 23,
  },
  priceNum: {
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#17273F',
    marginRight: 52,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    marginTop: 21,
    paddingVertical: 7,
  },
  customerImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 10,
  },
  customer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 16,
  },
  custRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  statusDriver: {
    fontFamily: 'Source Sans Pro',
    fontSize: 12,
    lineHeight: 15,
    color: '#8D8D8D',
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerName: {
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#17273F',
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerCard: {
    backgroundColor: '#FFF',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: {
      width: 5,
      height: 10,
    },
    elevation: 8,
  },
  googleText: {
    fontSize: 12,
    fontFamily: 'Source Sans Pro',
    fontWeight: '600',
    color: '#3685DE',
    textAlign: 'center',
  },
  google: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  rate: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Source Sans Pro',
    fontWeight: '600',
    color: '#7D7D7D',
    marginHorizontal: 5,
  },
  fotoTitle: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fonts.primary[600],
    fontWeight: '600',
    color: colors.text.primary,
  },
  btnContainer: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  linkDetail: {
    alignSelf: 'flex-end',
    fontSize: 12,
    lineHeight: 15,
    color: '#80807E',
    fontFamily: fonts.primary[400],
  },
  dateContainer: {
    flexDirection: 'row',
  },
  date: {
    flex: 2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    // width: 208,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  time: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    // width: 102,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
});

const s = StyleSheet.create({
  wrapper: {
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
  // modal
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  centeredView: {
    flex: 1,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  modalView: {
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
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
  descText: {
    fontSize: 14,
    color: '#535353',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: fonts.primary[400],
    maxWidth: 255,
  },
  modalTextTitle: {
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 31,
    fontFamily: fonts.primary[700],
    color: '#17273F',
  },
  modalTextName: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 23,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
  },
  imgModalContainer: {
    height: 174,
    width: 174,
    alignSelf: 'center',
    backgroundColor: 'rgba(194, 206, 224, 0.41)',
    borderRadius: 87,
    alignItems: 'center',
  },
  img: {
    height: 164,
    width: 105,
    bottom: -25,
  },
  desc: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
