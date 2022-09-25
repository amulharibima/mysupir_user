import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IcBack, IcHistory} from '../../../assets';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {Gap} from '../../atoms';
import HomeHeader from './HomeHeader';
import HeaderWithPhoto from './HeaderPhoto';
import BackOnly from './BackOnly';

const Header = ({
  label,
  onPress,
  type,
  name,
  btnNotif,
  btnEdit,
  edit,
  history,
  btnHistory,
  btnCall,
  photo,
}) => {
  if (type === 'menu') {
    return <HomeHeader name={name} onPress={onPress} btnNotif={btnNotif} />;
  }
  if (type === 'shadow-profile') {
    return (
      <HeaderWithPhoto
        name={name}
        onPress={onPress}
        btnCall={btnCall}
        photo={photo}
      />
    );
  }
  if (type === 'back-only') {
    return <BackOnly onPress={onPress} />;
  }

  return (
    <View style={styles.container(type)}>
      <View style={styles.right}>
        <TouchableOpacity onPress={onPress}>
          <IcBack />
        </TouchableOpacity>
        <Gap width={15} />
        <Text style={styles.text}>{label}</Text>
      </View>
      {edit ? (
        <TouchableOpacity onPress={btnEdit}>
          <Text style={styles.text1}>{edit}</Text>
        </TouchableOpacity>
      ) : null}
      {history && (
        <TouchableOpacity onPress={btnHistory}>
          <IcHistory />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: (type) => ({
    flexDirection: 'row',
    height: 76,
    width: '100%',
    alignItems: 'flex-end',
    paddingBottom: 15,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    shadowColor: type === 'shadow' ? '#000' : null,
    shadowOffset: type === 'shadow' ? {width: 0, height: 5} : null,
    shadowOpacity: type === 'shadow' ? 0.8 : null,
    shadowRadius: type === 'shadow' ? 5 : null,
    elevation: type === 'shadow' ? 6 : null,
  }),
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
  },
  text1: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
  },
});
