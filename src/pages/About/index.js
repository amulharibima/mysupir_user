import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {Header, List, Gap} from '../../components';
import {fonts} from '../../utils/fonts';
import {useSelector} from 'react-redux';
// import List from '../../components/molecules/List/List';

const About = ({navigation}) => {
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
        <Gap height={5} />
        <List
          name={en === true ? 'About MySupir' : 'Tentang MySupir'}
          type="biasa"
          line
          bgWhite
          next
          onPress={() => navigation.navigate('AboutMysupir')}
        />
        <Gap height={5} />
        <List
          name={en === true ? 'Privacy Policy' : 'Kebijakan Privasi'}
          type="biasa"
          line
          bgWhite
          next
          onPress={() => navigation.navigate('AboutKebijakan')}
        />
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  container: {
    justifyContent: 'center',
  },
  list: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F6',
    paddingVertical: 10,
  },
  txt: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
