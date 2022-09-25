import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Header, Gap, Button} from '../../../components';
import {colors, fonts} from '../../../utils';
import {ILSuksesLapor} from '../../../assets';
import { useSelector } from 'react-redux';

const SuksesLapor = ({navigation, route}) => {
  const en = useSelector((state) => state.language.english);
  return (
    <>
      <Header
        label="Laporkan Kerusakan"
        onPress={() => navigation.goBack()}
        type="shadow"
      />
      <View style={s.page}>
        <View style={s.imgContainer}>
          <Image source={ILSuksesLapor} style={s.img} />
        </View>
        <Text style={s.title}>{en ? 'Report Successfully Sent' : 'Laporan Berhasil Dikirim'}</Text>
        <Text style={s.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum
          tellus nec, at faucibus diam porta nisl quam.
        </Text>
        <Gap height={10} />
        <Button
          name="Kembali ke Rating"
          font={10}
          onPress={() =>
            navigation.replace('DetailRiwayat', {id: route.params.id, status: route.params.status})
          }
        />
      </View>
    </>
  );
};

export default SuksesLapor;

const s = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    width: 183,
    height: 157,
    marginBottom: 27,
  },
  img: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary[900],
    lineHeight: 23,
    color: colors.text.primary,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    lineHeight: 15,
    paddingTop: 10,
    color: colors.text.primary,
    textAlign: 'center',
    maxWidth: 256,
  },
});
