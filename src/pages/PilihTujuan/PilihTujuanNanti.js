import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput, Alert,
} from 'react-native';
import {Header, Input, List, Button, Gap} from '../../components';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Lokasimu = () => {
  const en = useSelector((state) => state.language.english);
  const navigation = useNavigation();
  const states = useSelector((state) => state.TripReducer);
  const based = useSelector((state) => state.TripReducer.based);
  const time = useSelector((state) => state.TripReducer.time);
  const tanggalMulai = useSelector((state) => state.TripReducer.tanggalMulai);
  const tanggalSelesai = useSelector(
    (state) => state.TripReducer.tanggalSelesai,
  );
  const [awal, setAwal] = useState('');
  const [trip1, setTrip1] = useState('');
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [STime, setSTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [FTime, setFTime] = useState(new Date());

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showSTime, setShowSTime] = useState(false);

  const [modeEnd, setModeEnd] = useState('date');
  const [showEnd, setShowEnd] = useState(false);
  const [showEndFTime, setShowEndFTime] = useState(false);

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShow(false);
    setDate(currentDate);
    dispatch({
      type: 'SET_STARTDATE',
      payload: moment(currentDate).format('YYYY-MM-DD'),
    });

    let test = moment(`${moment(endDate).format('YYYY-MM-DD')} ${moment(FTime).format('HH:mm')}`)
        .diff(moment(`${moment(currentDate).format('YYYY-MM-DD')} ${moment(STime).format('HH:mm')}`));

    if(test <= 0){
      dispatch({
        type: 'SET_ENDDATE',
        payload: null,
      });

      dispatch({
        type: 'SET_ENDTIME',
        payload: null,
      });
    }
  };

  const onChangeSTime = (selectedDate) => {
    const currentDate = selectedDate || new Date();

    if(moment(`${tanggalMulai} ${moment(currentDate).format('HH:mm')}`).diff(moment()) > 0){
      setShowSTime(false);
      setSTime(currentDate);
      dispatch({
        type: 'SET_STARTTIME',
        payload: moment(currentDate).format('HH:mm'),
      });
    }
    else{
      setShowSTime(false);
      Alert.alert('Error', en ? 'Time must more than current time' : 'Jam harus lebih dari jam sekarang');
    }

  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    if(tanggalMulai){
      console.log('showtime');
      setShowSTime(true);
    }
    else
      Alert.alert('Error', en ? 'Choose start rent date first' : 'Pilih tanggal mulai sewa dahulu');
  };

  const onChangeEnd = (selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEnd(Platform.OS === 'ios');
    setEndDate(currentDate);
    dispatch({
      type: 'SET_ENDDATE',
      payload: moment(currentDate).format('YYYY-MM-DD'),
    });
  };

  const onChangeEndFTime = (selectedDate) => {
    const currentDate = selectedDate || FTime;

    if(moment(`${moment(endDate).format('YYYY-MM-DD')} ${moment(currentDate).format('HH:mm')}`)
        .diff(moment(`${tanggalMulai} ${moment(STime).format('HH:mm')}`)) > 0){
      setShowEndFTime(Platform.OS === 'ios');
      setFTime(currentDate);
      dispatch({
        type: 'SET_ENDTIME',
        payload: moment(currentDate).format('HH:mm'),
      });
    }
    else{
      setShowEndFTime(Platform.OS === 'ios');
      Alert.alert('Error', en ? 'End rent time not less than start rent time' : 'Waktu selesai sewa tidak boleh kurang dari waktu mulai sewa');
    }
  };

  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setModeEnd(currentMode);
  };

  const showDatepickerEnd = () => {
    if(tanggalMulai && states.jamMulai)
      showModeEnd('date');
    else
      Alert.alert('Error', en ? 'Choose start rent date & time first' : 'Pilih tanggal & waktu mulai sewa dahulu');
  };

  const showTimepickerEnd = () => {
    if(tanggalMulai && states.jamMulai)
      if(states.tanggalSelesai)
        setShowEndFTime(true);
      else
        Alert.alert('Error', en ? 'Choose end rent first' : 'Pilih tanggal selesai sewa dahulu');
    else
      Alert.alert('Error', en ? 'Choose start rent date & time first' : 'Pilih tanggal & waktu mulai sewa dahulu');
  };

  const onTime = async () => {

    if(!states.start.coord){
      Alert.alert('Error', en ? 'Please fill location first' : 'Pilih lokasi terlebih dahulu');
      return ;
    }

    if(!tanggalMulai) {
      Alert.alert('Error', en ? 'Please fill start rent date first' : 'Pilih tanggal mulai sewa dahulu');
      return ;
    }

    if(!states.jamMulai) {
      Alert.alert('Error', en ? 'Please fill start rent time first' : 'Pilih waktu mulai sewa dahulu');
      return ;
    }

    if(!endDate) {
      Alert.alert('Error', en ? 'Please fill end rent date first' : 'Pilih tanggal selesai sewa dahulu');
      return ;
    }

    if(!FTime) {
      Alert.alert('Error', en ? 'Please fill end rent time first' : 'Pilih waktu selesai sewa dahulu');
      return ;
    }

    const data = {
      car_type_id: states.carType,
      lat_start: states.start.coord.lat,
      long_start: states.start.coord.lng,
      name_start: states.start.desc,
      start_date: tanggalMulai,
      start_time: states.jamMulai,
      finish_date: moment(endDate).format('YYYY-MM-DD'),
      finish_time: moment(FTime).format('HH:MM'),
    };
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        'http://mysupir.com/api/order/time/check',
        data,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (res) {
        dispatch({type: 'SET_BASED', payload: 'onTime'});
        dispatch({type: 'SET_PRICE', payload: res.data.total_price});
        console.log(res.data);
        navigation.navigate('CreateTrack', {onTime: data});
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  console.log(states.start);

  const kirim = () => {
      console.log('BASED : ', based);
      console.log('TIME : ', time);
      console.log('TIME : ', time);
      console.log('states.trip1 : ', states.trip1);

    if (based === 'onTime') {
      onTime();
    }
    else if(based === 'onTrip'){
      if(!states.start){
        Alert.alert('Error', en ? 'Please fill the location' : 'Lokasi harus diisi');
        return;
      }

      if(!states.trip1){
        Alert.alert('Error', en ? 'Please fill the destination' : 'Tujuan harus diisi');
        return;
      }

      if(!states.tanggalMulai){
        Alert.alert('Error', en ? 'Please fill the rent date' : 'Tanggal sewa harus diisi');
        return;
      }

      if(!states.jamMulai){
        Alert.alert('Error', en ? 'Please fill the rent time' : 'Waktu sewa harus diisi');
        return;
      }

      navigation.navigate('Tujuanmu');
    }
    else {
      navigation.navigate('Tujuanmu');
    }
  };

  console.log('date', date);
  console.log('STime', STime);
  console.log('tanngalMulai', tanggalMulai);
  console.log('jamMulai', states.jamMulai);
  console.log(
    moment(endDate).format('YYYY-MM-DD'),
    moment(FTime).format('HH:MM'),
  );
  // console.log('STATES: ', states);

  return (
    <View style={styles.page}>
      <Header
        label={based === 'onTrip' ? 'Based on Trip' : 'Based on Time'}
        type="shadow"
        onPress={() => {
          navigation.goBack();
          dispatch({type: 'RESET'});
        }}
      />
      <View style={styles.top}>
        <Gap height={30} />
        <Text style={styles.title}>
          {based === 'onTrip' ? 'Pilih Tujuan' : 'Pilih Lokasi'}
        </Text>
        <Gap height={10} />
        <TouchableOpacity
          style={styles.subtop}
          onPress={() =>
            navigation.navigate('ChooseLocation', {
              type: 'start',
              title: 'Lokasi',
            })
          }>
          <Input
            placeholder="Pilih lokasimu"
            icon="loc"
            type="no-border"
            bordered
            disable
            value={states.start.desc}
          />
        </TouchableOpacity>
        {based === 'onTrip' ? (
          <TouchableOpacity
            style={styles.subtop}
            onPress={() =>
              navigation.navigate('ChooseLocation', {
                type: 'trip1',
                title: 'Tujuan',
              })
            }>
            <Input
              placeholder={en ? 'Choose your destination' : "Pilih tujuanmu"}
              icon="ringo"
              type="no-border"
              bordered
              disable
              value={states.trip1.desc}
            />
          </TouchableOpacity>
        ) : null}
        <Gap height={10} />
        <Text style={styles.title}>
          {based === 'onTrip' ? 'Tanggal Sewa' : 'Waktu Mulai'}
        </Text>
        <Gap height={10} />

        <View style={styles.dateContainer}>
          <View style={styles.date}>
            <Icon
              type="material-community"
              name="calendar-blank"
              size={20}
              color="#6C6C6C"
            />
            <TouchableOpacity onPress={showDatepicker}>
              {tanggalMulai === null ? (
                <Text style={{paddingLeft: 5, color: '#c4c4c4'}}>
                  Pilih Tanggal
                </Text>
              ) : (
                <Text style={{paddingLeft: 5, color: '#151515'}}>
                  {moment(date).format('DD-MM-YYYY')}
                </Text>
              )}
            </TouchableOpacity>
            <DateTimePicker
                minimumDate={new Date()}
                isVisible={show}
                date={date}
                mode={mode}
                is24Hour={false}
                timeZoneOffsetInMinutes={60 * 7}
                onConfirm={onChange}
                onCancel={() => {setShow(false)}}
            />
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
              {states.jamMulai == null ? (
                <Text style={{paddingLeft: 5, color: '#c4c4c4'}}>Jam</Text>
              ) : (
                <Text style={{paddingLeft: 5, color: '#151515'}}>
                  {/* {moment(STime).format('HH:mm')} */}
                  {states.jamMulai}
                </Text>
              )}
            </TouchableOpacity>
            <DateTimePicker
                minimumDate={new Date()}
                isVisible={showSTime}
                date={STime}
                mode="time"
                is24Hour={false}
                onConfirm={onChangeSTime}
                onCancel={() => {setShowSTime(false)}}
                timeZoneOffsetInMinutes={60 * 7}
            />
          </View>
        </View>
        {based === 'onTime' ? (
          <>
            <Gap height={25} />
            <Text style={styles.title}>Waktu Selesai</Text>
            <Gap height={10} />

            <View style={styles.dateContainer}>
              <View style={styles.date}>
                <Icon
                  type="material-community"
                  name="calendar-blank"
                  size={20}
                  color="#6C6C6C"
                />
                <TouchableOpacity onPress={showDatepickerEnd}>
                  <Text style={{paddingLeft: 5, color: '#c4c4c4'}}>
                    {tanggalSelesai === null ? (
                      'Pilih Tanggal'
                    ) : (
                      <Text style={{paddingLeft: 5, color: '#151515'}}>
                        {moment(endDate).format('DD-MM-YYYY')}
                      </Text>
                    )}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                    minimumDate={date}
                    isVisible={showEnd}
                    date={endDate}
                    mode={mode}
                    is24Hour={false}
                    timeZoneOffsetInMinutes={60 * 7}
                    onConfirm={onChangeEnd}
                    onCancel={() => {setShowEnd(false)}}
                />
              </View>
              <Gap width={10} />
              <View style={styles.time}>
                <Icon
                  type="material-community"
                  name="timer-outline"
                  size={20}
                  color="#6C6C6C"
                />
                <TouchableOpacity onPress={showTimepickerEnd}>
                  <Text style={{paddingLeft: 5, color: '#c4c4c4'}}>
                    {states.jamSelesai === null ? (
                      'Jam'
                    ) : (
                      <Text style={{paddingLeft: 5, color: '#151515'}}>
                        {/* {moment(FTime).format('HH:mm')} */}
                        {states.jamSelesai}
                      </Text>
                    )}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={showEndFTime}
                    date={FTime}
                    mode='time'
                    is24Hour={false}
                    timeZoneOffsetInMinutes={60 * 7}
                    onConfirm={onChangeEndFTime}
                    onCancel={() => {setShowEndFTime(false)}}
                />
              </View>
            </View>
          </>
        ) : null}
      </View>
      <View style={styles.btn}>
        <Button name="Cari Pengemudi" onPress={() => kirim()} />
      </View>
    </View>
  );
};

export default Lokasimu;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingHorizontal: 36,
    paddingVertical: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  subtop: {
    borderRadius: 8,
    marginBottom: 10,
  },
  divider: {
    backgroundColor: '#EDEDED',
    height: 24,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  btn: {
    position: 'absolute',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    bottom: 50,
    width: '100%',
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.primary[600],
    fontWeight: '600',
    color: '#151515',
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
