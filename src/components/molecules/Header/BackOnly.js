import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils/colors';
import {IcBack} from '../../../assets';

const HomeHeader = ({onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menu} onPress={onPress}>
        <IcBack />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 8,
    alignSelf: 'flex-start',
    opacity: 0.7,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
});
