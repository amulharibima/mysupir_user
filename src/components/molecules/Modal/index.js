import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Alert, Image, StatusBar} from 'react-native';
import {ILModalSucess} from '../../../assets';
import {fonts, colors} from '../../../utils';
import Modal from 'react-native-modal';

const MyModal = ({modalVisible, setModalVisible, navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Profile');
      setModalVisible(false);
    }, 1500);
  }, [navigation, setModalVisible]);

  return (
    <View style={s.centeredView}>
      <Modal
        style={s.view}
        isVisible={true}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={s.centeredView}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
            barStyle="light-content"
          />
          <View style={s.modalView}>
            <View style={s.imgContainer}>
              <Image source={ILModalSucess} style={s.img} />
            </View>
            <Text style={s.modalTextTitle}>Berhasil!</Text>
            <View style={s.desc}>
              <Text style={s.descText}>
                Anda telah mengubah nomor Telepon Anda
              </Text>
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
    fontSize: 14,
    color: colors.text.primary,
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: fonts.primary[400],
  },
  modalTextTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
  },
  imgContainer: {
    height: 193,
    width: 174,
    marginBottom: 15,
  },
  img: {
    height: 193,
    width: 174,
  },
  desc: {
    justifyContent: 'center',
    marginTop: 8,
  },
});
