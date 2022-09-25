import React from 'react';
import {StyleSheet, View, StatusBar, Text} from 'react-native';
import {Header, Gap} from '../../../components';
import {colors, fonts} from '../../../utils';
import {useSelector} from 'react-redux';

const SnK = ({navigation}) => {
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
          <Text style={styles.title}>
            {en === true ? 'Terms and conditions' : 'Syarat & Ketentuan'}
          </Text>
          <Text style={styles.desc}>
            {en === true
              ? 'SITE SERVICES USE AGREEMENT'
              : 'PERJANJIAN PENGGUNAAN LAYANAN SITUS'}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.txt}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis
            fames mauris, pellentesque maecenas morbi pretium. Enim et tristique
            in facilisis nisi, eget venenatis. Mattis cursus est semper in
            tempor malesuada. Sit arcu molestie auctor nullam.
          </Text>
          <Gap height={10} />
          <Text style={styles.txt}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis
            fames mauris, pellentesque maecenas morbi pretium. Enim et tristique
            in facilisis nisi, eget venenatis. Mattis cursus est semper in
            tempor malesuada. Sit arcu molestie auctor nullam.
          </Text>
          <Gap height={10} />
          <Text style={styles.txt}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis
            fames mauris, pellentesque maecenas morbi pretium. Enim et tristique
            in facilisis nisi, eget venenatis. Mattis cursus est semper in
            tempor malesuada. Sit arcu molestie auctor nullam.
          </Text>
          <Gap height={10} />
          <Text style={styles.txt}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis
            fames mauris, pellentesque maecenas morbi pretium. Enim et tristique
            in facilisis nisi, eget venenatis. Mattis cursus est semper in
            tempor malesuada. Sit arcu molestie auctor nullam.
          </Text>
          <Gap height={10} />
          <Text style={styles.txt}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis
            fames mauris, pellentesque maecenas morbi pretium. Enim et tristique
            in facilisis nisi, eget venenatis. Mattis cursus est semper in
            tempor malesuada. Sit arcu molestie auctor nullam.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SnK;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  titleWrapper: {
    // alignItems: 'center',
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
  desc: {
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 20,
    fontFamily: fonts.primary[400],
  },
});
