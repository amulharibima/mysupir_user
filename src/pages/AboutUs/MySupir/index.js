import React from 'react';
import {StyleSheet, View, StatusBar, Text} from 'react-native';
import {Header, Gap} from '../../../components';
import {colors, fonts} from '../../../utils';
import {ILMySopir} from '../../../assets';
import {useSelector} from 'react-redux';

const MySupir = ({navigation}) => {
  const en = useSelector((state) => state.language.english);
  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <Header
        label={en === true ? 'About Us' : 'Tentang Kami'}
        type="shadow"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{en === true ? 'About' : 'Tentang'}</Text>
          <ILMySopir />
        </View>
        <View style={styles.content}>
          <Text style={styles.txt}>
            {en ? 'MySupir is one type of ride healing application, but this application is intended to hire the services of a driver, the rental can be done through 2 methods, namely based on distance and based on time. In this application there is also a panic botton that can be used as an anticipation for customer protection during the trip. This feature is also connected to the central admin and also a location detector so that when this feature is used, mySupir will immediately go to the location of the incident.' : 'MySupir merupakan salah satu jenis aplikasi ride healing, namun aplikasi ini diperuntukan untuk menyewa jasa seorang supir, penyewaan dapat dilakukan melalui 2 metode yaitu berdasarkan jarak dan berdasarkan waktu. Didalam aplikasi ini juga terdapat panic botton yang dapat digunakan sebagai salah satu antisipasi perlindungan customer selama diperjalanan. Fitur ini juga terkoneksi ke admin pusat dan juga pendeteksi lokasi sehingga ketika fitur ini digunakan pihak MySupir akan segera mendatangi lokasi kejadian.'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MySupir;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    // justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    paddingRight: 5,
  },
  txt: {
    fontSize: 12,
    textAlign: 'justify',
    lineHeight: 15,
    fontFamily: fonts.primary[400],
  },
  content: {
    paddingTop: 20,
  },
});
