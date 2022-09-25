import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';
import {IcBack, IcPhoneUp} from '../../../assets';

const HomeHeader = ({name, onPress, btnCall, photo}) => {
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={onPress}>
          <IcBack />
        </TouchableOpacity>
        <Gap width={13} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={photo} style={styles.pic} />
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 76,
    width: '100%',
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phone: {
    paddingBottom: 4,
  },
  name: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.primary[700],
    fontWeight: 'bold',
    color: '#151522',
    marginLeft: 10,
  },
  pic: {
    height: 38,
    width: 38,
    borderRadius: 38 / 2,
  },
});
