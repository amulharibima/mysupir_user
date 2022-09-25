import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Header, Input, List, Button} from '../../components';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {useDispatch} from 'react-redux';

const Lokasimu = ({navigation}) => {
  const [awal, setAwal] = useState('');
  const dispatch = useDispatch();

  const kirim = () => {
    navigation.navigate('Tujuanmu');
  };

  return (
    <View style={styles.page}>
      <Header label="Pilih Lokasimu" onPress={() => navigation.goBack()} />
      <View style={styles.top}>
        <View style={styles.subtop}>
          <Input
            placeholder="Pilih Lokasimu"
            icon="loc"
            type="no-border"
            bordered
            onChangeText={(text) => setAwal(text)}
          />
        </View>
        <View style={styles.subtop}>
          <Input
            placeholder="Pilih tujuanmu"
            icon="ringo"
            type="no-border"
            plus
            bordered
            onPress={() => navigation.navigate('Multitrip')}
          />
        </View>
      </View>

      <View style={styles.divider} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bottom}>
        </View>
      </ScrollView>

      <View style={styles.btn}>
        <Button name="Selanjutnya" onPress={() => kirim()} />
      </View>
    </View>
  );
};

export default Lokasimu;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingHorizontal: 36,
    paddingVertical: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  subtop: {
    borderRadius: 8,
    marginBottom: 10,
  },
  divider: {
    backgroundColor: '#EDEDED',
    height: 24,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  btn: {
    paddingHorizontal: 20,
    bottom: 50,
    width: '100%',
  },
});
