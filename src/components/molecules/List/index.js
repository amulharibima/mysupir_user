import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fonts, colors} from '../../../utils';
import {IcCall, IcMail, IcChat} from '../../../assets';
import List from './List';

const ListAddress = ({
  name,
  address,
  type,
  icon,
  line,
  onPress,
  next,
  bgWhite,
  fetchDetails,
}) => {
  const Icon = () => {
    if (icon === 'call') {
      return <IcCall />;
    }
    if (icon === 'mail') {
      return <IcMail />;
    }
    if (icon === 'chat') {
      return <IcChat />;
    }
    return <IcCall />;
  };

  if (type === 'biasa') {
    return (
      <List
        line={line}
        onPress={onPress}
        name={name}
        next={next}
        bgWhite={bgWhite}
      />
    );
  }

  console.log('fetDetails', fetchDetails);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container(type)}>
      {icon ? (
        <View style={styles.image}>
          <Icon />
        </View>
      ) : null}
      <View>
        <Text style={styles.title(type)}>{name}</Text>
        <Text style={styles.alamat(type)}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListAddress;

const styles = StyleSheet.create({
  container: (type) => ({
    flexDirection: 'row',
    borderBottomWidth: type === 'help' ? 0 : 1,
    borderBottomColor: type === 'help' ? null : colors.border,
    padding: 16,
    alignItems: 'center',
    backgroundColor: type === 'help' ? colors.white : null,
  }),
  image: {
    borderRadius: 10,
    marginRight: 16,
  },
  title: (type) => ({
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: type === 'help' ? colors.text.primary : colors.text.secondary,
  }),
  alamat: (type) => ({
    fontSize: type === 'help' ? 12 : 10,
    fontFamily: fonts.primary[100],
    color: type === 'help' ? colors.text.primary : colors.text.secondary,
    marginRight: 50
  }),
});
