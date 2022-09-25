import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {ILTimeManage} from '../../../assets';
import {fonts, colors} from '../../../utils';
import {Button, Gap} from '../../atoms';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import moment from 'moment';

const ModalHomeTrip = ({
  visible,
  setVisible,
  setTimeLeft,
  setIsEndedOnTime,
  timeLeft,
  title,
  upperPress,
  bottomPress,
  content,
}) => {
  const states = useSelector((state) => state.TripReducer);
  const different = moment(String(states.tanggalSelesai)).diff(
    moment(new Date()),
    'millisecond',
  );
  const days = Math.floor(different / (1000 * 60 * 60 * 24));
  const hours = Math.floor((different / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((different / 1000 / 60) % 60);
  const second = Math.floor((different / 1000) % 60);

  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(0);

  console.log('ini Lihat', days, hours, minute, second);

  if (days === 0 && hours === 0 && minutes === 15 && seconds === 0) {
    setTimeLeft(false);
    setIsEndedOnTime(true);
  }

  let myInterval = setInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(myInterval);
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }
  }, 1000);

  console.log('ini visible should false', visible);
  console.log('ini time left should false', timeLeft);

  useEffect(() => {
    if (visible === true) {
      myInterval;
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [visible, myInterval]);

  return (
    <>
      <Modal
        style={s.view}
        animationType="slide"
        transparent={true}
        isVisible={visible}
        onRequestClose={() => {
          alert('Nanti Dulu Deh Ya..');
        }}>
        <View style={s.centeredView}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
            barStyle="dark-content"
          />
          <View style={s.modalView}>
            <Text style={s.modalTextTitle}>{title}</Text>

            <Text style={s.km}>
              {minutes} Menit {seconds} Detik
            </Text>
            <Gap height={10} />
            <View style={s.imgContainer}>
              <Image
                source={ILTimeManage}
                style={s.img}
                resizeMode={'contain'}
              />
            </View>
            <View style={s.desc}>
              <Text style={s.descText}>{content}</Text>
            </View>
            <Gap height={25} />
            <Button
              name={'Tambah Waktu Perjalanan'}
              font={16}
              weight={600}
              onPress={() => upperPress()}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={() => bottomPress()}>
              <Text style={s.btnTitleStyle1}>Tidak, Terimakasih</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalHomeTrip;

const s = StyleSheet.create({
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
    fontSize: 12,
    color: '#535353',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: 16,
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
  imgContainer: {
    height: 192,
    width: 228,
    alignSelf: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 90 / 2,
  },
  desc: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sim: {
    alignSelf: 'center',
    marginTop: 7,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
    paddingHorizontal: 3,
    paddingVertical: 4,
    backgroundColor: '#EAEAEA',
    borderRadius: 2,
  },
  km: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 15,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.primary[600],
    fontWeight: '600',
    color: colors.text.primary,
  },
  btnTitleStyle1: {
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    fontSize: 16,
    lineHeight: 20,
    paddingBottom: 13,
    paddingTop: 23,
    textAlign: 'center',
  },
});
