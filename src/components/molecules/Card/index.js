import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';

const Card = ({type, status, waktu, price, location, onPress}) => {
  // const Reprice = price.split('.')[0];
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={s.container}
        activeOpacity={0.9}>
        <View style={s.card}>
          <View style={s.card_header}>
            <Text style={s.txtTitle}>{type}</Text>
            <Text
              style={s.txtDesc(
                status.toLowerCase() === 'selesai' ? '#55B747' : '#404040',
              )}>
              {status}
            </Text>
          </View>
          <View style={s.card_content}>
            <View style={s.left}>
              <Text style={s.txtKet}>Tanggal Mulai</Text>
              <Text style={s.txtDesc1}>{waktu} WIB</Text>
              <Text style={s.txtKet}>Lokasi</Text>
              <Text style={s.txtDesc1} ellipsizeMode={'clip'} numberOfLines={2}>{location}</Text>
            </View>
            <View style={s.right}>
              <Text style={s.price}>Rp.{price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Card;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 6,
  },
  left: {
    maxWidth: '50%',
  },
  card_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    paddingBottom: 5,
    marginBottom: 5,
  },
  card_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 10,
  },
  txtTitle: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: '#8F8F8F',
    lineHeight: 15,
  },
  txtDesc: (warna) => ({
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: warna,
    lineHeight: 15,
  }),
  txtKet: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: '#7C7C7C',
    lineHeight: 15,
    paddingTop: 5,
  },
  txtDesc1: {
    fontSize: 10,
    fontFamily: fonts.primary[600],
    color: '#303030',
    lineHeight: 15,
  },
  price: {
    fontSize: 18,
    fontFamily: fonts.primary[900],
    color: colors.text.primary,
    lineHeight: 23,
  },
});
