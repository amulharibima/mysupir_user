import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from '../../components';
import {ListMenu} from '../../components';
import {colors, fonts} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const currencyFormat = (num) => {
  let number_string = num.toString(),
    sisa = number_string.length % 3,
    rupiah = number_string.substr(0, sisa),
    ribuan = number_string.substr(sisa).match(/\d{3}/g);
  let separator;

  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }
  return rupiah;
};

const Pembayaran = () => {
  const navigation = useNavigation();
  const price = useSelector((state) => state.order.price);
  const en = useSelector((state) => state.language.english);

  return (
    <View style={s.page}>
      <Header label="Pembayaran" onPress={() => navigation.goBack()} />
      <View style={s.container}>
        <Text style={s.desc}>{en ? 'Amount to be paid':'Jumlah yang harus dibayar'}</Text>
        <Text style={s.price}>Rp{currencyFormat(price)}</Text>
      </View>
      <ListMenu
        type="next"
        icon="card"
        name="Pembayaran"
        pad
        onPress={() => navigation.navigate('DetailPembayaran')}
      />
    </View>
  );
};

export default Pembayaran;

const s = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    height: 101,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: fonts.primary[400],
  },
  price: {
    color: colors.white,
    fontSize: 30,
    lineHeight: 38,
    fontFamily: fonts.primary[700],
  },
});
