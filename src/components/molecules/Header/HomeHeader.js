import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {IcMenu, IcBell} from '../../../assets';
import {Gap} from '../../atoms';
import {getName} from '../../../utils';

const HomeHeader = ({name, onPress, btnNotif}) => {
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={onPress}>
          <IcMenu />
        </TouchableOpacity>
        <Gap width={15} />
        <Text style={styles.text}>
          Hay, <Text style={styles.name}>{name ? getName(name) : ''}</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={btnNotif}>
        <IcBell />
      </TouchableOpacity>
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
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary[400],
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.primary[700],
  },
});
