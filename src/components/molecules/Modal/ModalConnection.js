import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Alert, Image, StatusBar} from 'react-native';
import {ILWifi, ILLocation} from '../../../assets';
import {fonts, colors} from '../../../utils';
import Modal from 'react-native-modal';
import {Button, Gap} from '../../atoms';
import {useSelector} from 'react-redux';

const MyModal = ({modalVisible, setModalVisible, navigation, type}) => {
  let ILImage = ILWifi;
  if (type === 'wifi') {
    ILImage = ILWifi;
  }
  if (type === 'loc') {
    ILImage = ILLocation;
  }

  const en = useSelector((state) => state.language.english);

  return (
    <View style={s.centeredView}>
      <Modal
        style={s.view}
        isVisible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          null;
        }}>
        <View style={s.centeredView}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
            barStyle="light-content"
          />
          <View style={s.modalView}>
            <View style={s.imgContainer(type)}>
              <Image source={ILImage} style={s.img} />
            </View>
            <Text style={s.modalTextTitle}>
              {type === 'wifi'
                ? en
                  ? 'Oops, your network is disconnected!'
                  : 'Oops, Jaringan Kamu Terputus!'
                : en
                ? "Oops, let's activate the location"
                : 'Oops, ayo aktifkan lokasinya'}
            </Text>
            <View style={s.desc}>
              <Text style={s.descText}>
                {type === 'wifi'
                  ? en
                    ? "We can't access you. Let's activate your Internet connection first, hehe "
                    : 'Kami gabisa mengakses kamu nih. Ayo aktifin dulu dong Koneksi Internet kamu hehe'
                  : en
                  ? "We can't access your location. Let's activate the service location first hehe"
                  : 'Kami gabisa mengakses lokasi kamu nih. Ayo aktifin dulu dong lokasi servisnya hehe'}
              </Text>
              <Gap height={25} />
              <Button
                name={
                  type === 'wifi'
                    ? en
                      ? 'Enable Internet Connection'
                      : 'Aktifkan Internet'
                    : en
                    ? 'Enable Location'
                    : 'Aktifkan Lokasi'
                }
                font={14}
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyModal;

const s = StyleSheet.create({
  view: {
    margin: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    elevation: 10,
  },
  descText: {
    fontSize: 12,
    color: '#727272',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: fonts.primary[400],
  },
  modalTextTitle: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 23,
    fontFamily: fonts.primary[600],
    fontWeight: '600',
    color: '#1C1C1C',
  },
  imgContainer: (type) => ({
    height: type === 'wifi' ? 148 : 134,
    width: type === 'wifi' ? 148 : 123,
    marginBottom: 15,
  }),
  img: {
    height: '100%',
    width: '100%',
  },
  desc: {
    justifyContent: 'center',
    marginTop: 8,
  },
});
