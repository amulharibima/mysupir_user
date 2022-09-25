import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {ILMap, ILModalSucess} from '../../../assets';
import {fonts, colors} from '../../../utils';
import {Button, Gap} from '../../atoms';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';

const ModalHomeTrip = ({
  visible,
  setVisible,
  setEnded,
  ended,
  title,
  upperPress,
  bottomPress,
  content,
}) => {
  const en = useSelector((state) => state.language.english);
  return (
    <>
      <Modal
        style={s.view}
        animationType="slide"
        transparent={true}
        isVisible={visible}
        onRequestClose={() => {
          alert('Nanti Dulu Deh Ya..');
          //   setFound(!found);
          //   setOnCari(false);
        }}>
        <View style={s.centeredView}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
            barStyle="dark-content"
          />
          <View style={s.modalView}>
            <Text style={s.modalTextTitle}>{title}</Text>
            {!ended ? <Text style={s.km}>1 Km lagi</Text> : <Gap height={10} />}
            <View style={s.imgContainer}>
              <Image
                source={ended ? ILModalSucess : ILMap}
                style={s.img}
                resizeMode={'contain'}
              />
            </View>
            {ended && <Gap height={15} />}
            <View style={s.desc}>
              <Text style={s.descText}>{content}</Text>
            </View>
            <Gap height={25} />
            <Button
              name={ended ? en ? 'Yes' : 'Yakin' : en ? 'Add more Trip' : 'Tambah Tujuan Perjalanan'}
              font={16}
              weight={600}
              onPress={() => upperPress()}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={() => bottomPress()}>
              <Text style={s.btnTitleStyle1}>
                {ended ? en ? 'No, not yet' : 'Tidak, Belum Selesai' : en ? 'No, Thank you' : 'Tidak, Terimakasih'}
              </Text>
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
    textTransform: 'capitalize',
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
