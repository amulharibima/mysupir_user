import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert, Image, StatusBar} from 'react-native';
import {ILNotFound} from '../../../assets';
import {fonts, colors} from '../../../utils';
import {Button, Gap} from '../../atoms';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';

const DriverNotFound = (props) => {
  const en = useSelector((state) => state.language.english);
  return (
    <View style={s.centeredView}>
      <Modal
        style={s.view}
        isVisible={props.notFound}
        animationType="slide"
        transparent={true}
        // visible={found}
        onBackButtonPress={props.onClose}
        onRequestClose={props.onClose}>
        <View style={s.centeredView}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
            barStyle="light-content"
          />
          <View style={s.modalView}>
            <View style={s.imgContainer}>
              <Image source={ILNotFound} style={s.img} resizeMode={'contain'} />
            </View>
            <Text style={s.modalTextTitle}>{en ? 'Driver not found!' :'Pengemudi tidak ditemukan!'}</Text>
            <View style={s.desc}>
              <Text style={s.descText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Fermentum tellus nec, at faucibus
              </Text>
            </View>
            <Gap height={25} />
            <Button name={en ? 'Search Again' : "Cari Lagi"} font={16} onPress={props.again} />
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
    fontSize: 18,
    lineHeight: 20,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
  },
  imgContainer: {
    height: 137,
    width: 120,
    marginVertical: 15,
    alignSelf: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  desc: {
    justifyContent: 'center',
    marginTop: 8,
    alignItems: 'center',
  },
});
