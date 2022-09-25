import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert, Image, StatusBar} from 'react-native';
import {IcStarSm, DummyProfile} from '../../../assets';
import {fonts, colors} from '../../../utils';
import {Button, Gap} from '../../atoms';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';

const DriverNotFound = ({
  found,
  setFound,
  setModalVisible,
  setOnCari,
  onPress,
  navigation,
  driverDatas,
}) => {
  const order = useSelector((state) => state.order);
  const en = useSelector((state) => state.language.english);
  return (
    <View style={s.centeredView}>
      <Modal
        style={s.view}
        animationType="slide"
        transparent={true}
        isVisible={found}
        onRequestClose={() => {
          Alert.alert(en ? 'Later ...' : 'Nanti Dulu Deh Ya..');
          setFound(!found);
          setOnCari(false);
        }}>
        <View style={s.centeredView}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
            barStyle="light-content"
          />
          <View style={s.modalView}>
            <Text style={s.modalTextTitle}>{en ? 'Driver Found!' : 'Pengemudi Ditemukan!'}</Text>
            <View style={s.imgContainer}>
              <Image
                source={{uri: order.driver_pict}}
                style={s.img}
                resizeMode={'contain'}
              />
            </View>
            <Text style={s.modalTextName}>{order.driver_name}</Text>
            <View style={s.desc}>
              <Text style={s.descText}>Rating {order.rating}</Text>
              <IcStarSm />
            </View>
            <Text style={s.sim}>SIM A</Text>
            <Gap height={25} />
            <Button
              name={en ? "Pay To Continue Order" : "Bayar Untuk Melanjutkan Pemesanan"}
              font={16}
              onPress={() => {
                setFound(false),
                  setOnCari(false),
                  navigation.navigate('Pembayaran');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DriverNotFound;

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
    color: colors.text.primary,
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 16,
    fontFamily: fonts.primary[400],
    maxWidth: 255,
  },
  modalTextTitle: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 25,
    fontFamily: fonts.primary[700],
    color: '#282828',
  },
  modalTextName: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 23,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
  },
  imgContainer: {
    height: 90,
    width: 90,
    marginVertical: 15,
    alignSelf: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 90 / 2,
  },
  desc: {
    justifyContent: 'center',
    marginTop: 8,
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
});
