import React, {useState} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ILSOS} from '../../assets';
import {fonts} from '../../utils';
import {Gap, Header} from '../../components';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DetailPanic = ({route}) => {
  const navigation = useNavigation();

  console.log(route.params);

  return (
    <>
      <Header
        label="Detail Riwayat Panic"
        type="shadow"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.page}>
        {route.params !== undefined && (
          <Text style={styles.title}>{route.params.data.data.title}</Text>
        )}
        <View style={styles.sos}>
          <ImageBackground
            source={ILSOS}
            style={{
              width: 100,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.sosTxt}>S.O.S</Text>
          </ImageBackground>
        </View>
        <Gap height={30} />
        {route.params !== undefined && (
          <Text style={styles.descTxt}>{route.params.data.data.body}</Text>
        )}
      </View>
    </>
  );
};

export default DetailPanic;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#FFF',
  },
  sos: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  sosTxt: {
    fontFamily: fonts.primary[700],
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF',
  },
  descTxt: {
    fontFamily: fonts.primary[400],
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginHorizontal: 20,
  },
  title: {
    fontFamily: fonts.primary[500],
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginHorizontal: 20,
  },
});
