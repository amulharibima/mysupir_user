import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, colors} from '../../../utils';

const Verification = ({onPress}) => {
  return (
    <>
      <View style={styles.content}>
        <Text style={styles.text}>
          Kode telah dikirim ke nomor 0854 2158 5545
        </Text>
        <Gap height={35} />
        <View style={styles.box}>
          <View style={styles.boxes} />
          <View style={styles.boxes} />
          <View style={styles.boxes} />
          <View style={styles.boxes} />
          <View style={styles.boxes} />
          <View style={styles.boxes} />
        </View>
        <Gap height={50} />
        <Text style={styles.text1}>Kirim ulang setelah 01:00</Text>
        <Gap height={30} />
        <Button name="Masuk" onPress={onPress} />
      </View>
    </>
  );
};

export default Verification;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    // alignItems: 'center',
    marginTop: 30,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    textAlign: 'center',
  },
  text1: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  box: {
    flexDirection: 'row',
    // flex: 6,
    width: '100%',
  },
  boxes: {
    flex: 1,
    height: 50,
    width: '100%',
    marginHorizontal: 2.5,
    backgroundColor: colors.boxotp,
    borderRadius: 5,
  },
});
