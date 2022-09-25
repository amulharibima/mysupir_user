import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {DummyProfile, IcMic, IcCallEnd, IcSpeaker} from '../../assets';
import {colors, fonts} from '../../utils';
import {Gap} from '../../components';

const FreeCall = () => {
  return (
    <View style={styles.page}>
      <Gap height={37} />
      <Text style={styles.fc}>FreeCall</Text>
      <Gap height={40} />
      <Text style={styles.name}>Hansley Stayaway</Text>
      <Gap height={5} />
      <Text style={styles.status}>Calling...</Text>
      <Gap height={40} />
      <Image source={DummyProfile} style={styles.img} />
      <Gap height={45} />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity>
          <View style={styles.btn}>
            <IcMic />
          </View>
        </TouchableOpacity>
        <Gap width={10} />
        <TouchableOpacity>
          <View style={[styles.btn, {backgroundColor: '#E8505B'}]}>
            <IcCallEnd />
          </View>
        </TouchableOpacity>
        <Gap width={10} />
        <TouchableOpacity>
          <View style={styles.btn}>
            <IcSpeaker />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FreeCall;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
  },
  fc: {
    fontSize: 18,
    fontFamily: fonts.primary[400],
    lineHeight: 23,
    color: colors.text.primary,
  },
  img: {
    width: 134,
    height: 134,
    borderRadius: 143 / 2,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    fontWeight: 'bold',
    lineHeight: 25,
    color: colors.text.primary,
  },
  status: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    lineHeight: 15,
    color: '#80807E',
  },
  btn: {
    height: 54,
    width: 54,
    borderRadius: 54 / 2,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
