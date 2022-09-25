import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  BackHandler,
  DeviceEventEmitter,
  Image,
  Platform
} from 'react-native';
import {Header, Active, Input, ModalConection} from '../../components';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {IcMobil} from '../../assets';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {getData, storeData, getName} from '../../utils';
import {Icon} from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import ModalCari from '../../components/molecules/Modal/ModalCariDriver';
import BeriNilai from '../BeriNilai';
import sedan from '../../assets/icon/sedan.png';
import pickup from '../../assets/icon/pickup.png';
import minibus from '../../assets/icon/minibus.png';
import mobil from '../../assets/icon/mobil.png';

// const GOOGLE_MAPS_APIKEY = 'AIzaSyALvj15UY8dZ63ZGV2t_BSfRPa97Qh11LY';
const GOOGLE_MAPS_APIKEY = 'AIzaSyBqHYPUOXnXhE9CcUOgua9Ru6cv-IBWAB8';
// let mapView = null

const Home = ({navigation}) => {
  const based = useSelector((state) => state.TripReducer.based);
  const time = useSelector((state) => state.TripReducer.time);
  const [currentLocation, setCurrentLocation] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const dispatch = useDispatch();

  const username = useSelector((state) => state.TripReducer.username);

  const en = useSelector((state) => state.language.english);

  const [pilihan, setPilihan] = useState('onTrip');
  const [car, setCar] = useState('Sedan');

  const getCurrLocation = async () => {
    Geolocation.getCurrentPosition((info) => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });
  };

  useEffect(() => {
    getCurrLocation();
  }, []);

  const dummy = [
    {
      id: 1,
      title: 'Sedan',
      pic: sedan,
    },
    {
      id: 2,
      title: 'Pick Up',
      pic: pickup,
    },
    {
      id: 3,
      title: 'Minibus',
      pic: minibus,
    },
    {
      id: 4,
      title: 'SUV',
      pic: mobil,
    },
  ];

  const btnNotif = () => {
    navigation.navigate('Notifikasi');
  };

  const klik = (value) => {
    setPilihan(value);
  };

  const [inet, setInet] = useState(false);
  const [gps, setGps] = useState(false);
  const [modalGps, setModalGps] = useState(false);
  const [isOpenLocationServices, setIsOpenLocationServices] = useState(false);

  const [userDatas, setUserDatas] = useState({
    phone_number: '',
    name: '',
    email: '',
    foto: '',
  });

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      setUserDatas(data);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected === false) {
        setInet(true);
      }
    });
    unsubscribe();
  }, []);

  useEffect(() => {
    if(Platform.OS === 'android'){
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: '',
        ok: '',
        cancel: '',
        enableHighAccuracy: true,
        showDialog: false,
        openLocationServices: isOpenLocationServices,
        preventOutSideTouch: false,
        preventBackClick: false,
        providerListener: true,
      })
          .then(function (success) {
            setGps(true);
          })
          .catch((error) => {
            setGps(false);
          });
    }

    DeviceEventEmitter.addListener('locationProviderStatusChange', function (
      status,
    ) {
      setGps(status.enabled);
    });
    if (gps === false) {
      // setModalGps(true);
    } else {
      setModalGps(false);
    }
  }, [gps, isOpenLocationServices]);

  const handleRegionChange = (data) => {
    // setState({
    //   ...state,
    //   latitude: data.latitude,
    //   longitude: data.longitude,
    // });
    // setLatitude(data.latitude);
    // setLongitude(data.longitude);
    // setCurrentLocation(data);
  };

  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0122;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


  return (
    <>
      <View style={styles.mobil}>
        {dummy.map((item, i) => (
            <TouchableOpacity
                activeOpacity={1}
                key={i}
                style={[styles.satuan(
                    item.title === car ? colors.primary : colors.white,
                )]}
                onPress={() => {
                  setCar(item.title);
                  dispatch({type: 'SET_MOBIL', payload: item.id});
                }}>
              <Image source={item.pic} style={{width: 50, height: 50, alignSelf: 'center'}} resizeMode={'contain'} />
              <Text
                  style={styles.text1(
                      item.title === car ? colors.white : colors.text.tertiery,
                  )}>
                {item.title}
              </Text>
            </TouchableOpacity>
        ))}
      </View>
      <MapView
        region={{
          longitude: longitude,
          latitude: latitude,
          longitudeDelta: LONGITUDE_DELTA,
          latitudeDelta: LATITUDE_DELTA,
        }}
        style={StyleSheet.absoluteFillObject}
        onRegionChange={(data) => handleRegionChange(data)}
        provider={PROVIDER_GOOGLE}
        onPress={() => console.log('pressed  asda')}
        showsUserLocation={true}
      />
      <View>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle={'dark-content'}
          hidden={false}
        />

        <Header
          name={username}
          type="menu"
          onPress={() => navigation.toggleDrawer()}
          btnNotif={btnNotif}
        />

        <View style={styles.top}>
          <View style={styles.subtop}>
            <TouchableOpacity
              onPress={() => dispatch({type: 'SET_BASED', payload: 'onTrip'})}>
              <Text
                style={styles.text(
                  based === 'onTrip' ? colors.text.primary : '#c4c4c4',
                )}>
                Base on trip
              </Text>
            </TouchableOpacity>
            <Active isActive={based} activeId="onTrip" />
          </View>
          <View style={styles.subtop}>
            <TouchableOpacity
              onPress={() => dispatch({type: 'SET_BASED', payload: 'onTime'})}>
              <Text
                style={styles.text(
                  based === 'onTime' ? colors.text.primary : '#c4c4c4',
                )}>
                Base on time
              </Text>
            </TouchableOpacity>
            <Active isActive={based} activeId="onTime" />
          </View>
        </View>
      </View>
      {based === 'onTrip' ? (
        <View style={styles.kapan}>
          <View style={styles.time}>
            <View style={styles.orderTime}>
              <TouchableOpacity
                onPress={() =>
                  dispatch({type: 'SET_TIME', payload: 'sekarang'})
                }
                style={styles.btnTime}>
                <Text
                  style={styles.btnTimeTxt(
                    time === 'sekarang'
                      ? colors.text.primary
                      : colors.text.secondary,
                  )}>
                  {en ? 'Now' : 'Sekarang'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch({type: 'SET_TIME', payload: 'nanti'})}
                style={styles.btnTime}>
                <Text
                  style={styles.btnTimeTxt(
                    time === 'nanti'
                      ? colors.text.primary
                      : colors.text.secondary,
                  )}>
                  {en ? 'Later' : 'Nanti'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            {time === 'sekarang' && (
              <TouchableOpacity onPress={() => navigation.navigate('Lokasimu')}>
                <Input
                  placeholder={en ? "where do you want to drive?":"mau disupirin kemana nih?"}
                  icon="ringo"
                  type="no-border"
                  onChangeText={(text) => console.log(text)}
                  disable
                />
              </TouchableOpacity>
            )}
            {time === 'nanti' && (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PilihTujuanNanti')}>
                  <Input
                    placeholder={en ? "where do you want to drive?" : "mau disupirin kemana nih?"}
                    icon="ringo"
                    type="no-border"
                    onChangeText={(text) => console.log(text)}
                    disable
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PilihTujuanNanti')}>
                  <Input
                    placeholder={en ? "What time do you want?" : "mau jam berapa?"}
                    icon="time"
                    type="no-border"
                    onChangeText={(text) => console.log(text)}
                    disable
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.kapan}>
          <View style={styles.time}>
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('PilihTujuanNanti')}>
                <Input
                  placeholder={en ? 'Choose your location...' : "Pilih Lokasimu..."}
                  icon="loc"
                  type="no-border"
                  onChangeText={(text) => console.log(text)}
                  disable
                />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity
                onPress={() => navigation.navigate('PilihTujuanNanti')}>
                <Input
                  placeholder={en ? "What time do you want?" : "Mau Disupirin Jam Berapa?"}
                  icon="time"
                  type="no-border"
                  onChangeText={(text) => console.log(text)}
                  disable
                />
              </TouchableOpacity>
            </>
          </View>
        </View>
      )}

      <ModalConection
        modalVisible={inet}
        setModalVisible={setInet}
        type="wifi"
      />
      <ModalConection
        modalVisible={modalGps}
        setModalVisible={setIsOpenLocationServices}
        type="loc"
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    height: 38,
    backgroundColor: colors.white,
  },
  text: (color) => ({
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: color,
    paddingTop: 10,
    paddingBottom: 6,
  }),
  subtop: {
    flex: 0.5,
    justifyContent: 'space-between',
  },
  mobil: {
    height: 53,
    width: '100%',
    top: 125,
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 7,
    zIndex: 3
  },
  satuan: (color) => ({
    flex: 1,
    // height: 53,
    marginHorizontal: 2,
    backgroundColor: color,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 6,
  }),
  text1: (color) => ({
    fontSize: 11,
    fontFamily: fonts.primary[600],
    paddingTop: 4,
    color: color,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -10,
  }),
  kapan: {
    position: 'absolute',
    bottom: 50,
    width: '85%',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 6,
  },
  time: {
    // paddingLeft: 16,
  },
  orderTime: {
    flexDirection: 'row',
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    width: '100%',
  },
  btnTime: {
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 15,
  },
  btnTimeTxt: (color) => ({
    color: color,
    fontFamily: fonts.primary[600],
    fontSize: 12,
  }),
});
