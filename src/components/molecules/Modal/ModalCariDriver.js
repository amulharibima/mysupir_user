import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert, Image, StatusBar} from 'react-native';
import {ILSearch, IconClose} from '../../../assets';
import {fonts, colors} from '../../../utils';
import {Icon, Button as ButtonOutline} from 'react-native-elements';
// import MultiSwitch from 'rn-slider-switch';
import Modal from 'react-native-modal';
import SwipeButton from 'rn-swipe-button';
import {Gap} from '../../atoms';
import {useSelector} from 'react-redux';

const ModalCari = ({
  modalVisible,
  setModalVisible,
  setOnCari,
  setFound,
  cancel,
  setNotFound,
}) => {
  const [jadi, setJadi] = useState(true);
  const en = useSelector((state) => state.language.english);

  const handleCancel = () => {
    setJadi(false);
    setModalVisible(false);
    setOnCari(false);
    setFound(false);
    // if (jadi === false) {
    // } else if (jadi === true) {
    //   setModalVisible(false);
    //   setOnCari(true);
    //   setFound(true);
    // }
  };

  return (
    <View style={s.centeredView}>
      <Modal
        style={s.view}
        isVisible={modalVisible}
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
              {en ? 'Looking for a Driver!' : 'Sedang Mencari Pengemudi!'}
            </Text>
            <View style={s.desc}>
              <Text style={s.descText}>
                {en
                  ? 'It may take a few minutes'
                  : 'Mungkin akan memakan waktu beberapa menit'}
              </Text>
            </View>
            <View style={s.imgContainer}>
              <Image source={ILSearch} style={s.img} resizeMode={'contain'} />
            </View>

            {/* <MultiSwitch
              currentStatus={'Open'}
              disableScroll={(value) => {}}
              isParentScrollEnabled={false}
              setJadi={setJadi}
              setFound={setFound}
            /> */}
            <SwipeButton
              height={46}
              thumbIconBackgroundColor="#FFFFFF"
              thumbIconImageSource={IconClose}
              title={en ? 'Slide to cancel' : 'Geser untuk membatalkan'}
              titleStyles={{
                color: 'rgba(244, 244, 244, 0.89)',
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: fonts.primary[400],
              }}
              thumbIconStyles={{
                padding: 20,
              }}
              railBackgroundColor="rgba(23, 39, 63, 0.68)"
              // railFillBackgroundColor='rgba(23, 39, 63, 0.68)'
              onSwipeSuccess={cancel}
            />
          </View>
        </View>
        {/*  */}
        {/* <View style={{}} activeOpacity={0.5}>
          <ButtonOutline
            onPress={() => {
              setModalVisible(false);
              setFound(false);
              setOnCari(true);
              setNotFound(true);
            }}
            title="ga dapet"
            containerStyle={{width: '100%'}}
          />
        </View>
        <Gap height={1} color="#000" />
        <View style={{}} activeOpacity={0.5}>
          <ButtonOutline
            onPress={() => {
              setModalVisible(false);
              setOnCari(true);
              setFound(true);
            }}
            title="dapet nih"
            containerStyle={{width: '100%'}}
          />
        </View> */}
      </Modal>
    </View>
  );
};

export default ModalCari;

const s = StyleSheet.create({
  view: {
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
    maxWidth: 150,
  },
  modalTextTitle: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 20,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
  },
  imgContainer: {
    height: 73,
    width: 69,
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
