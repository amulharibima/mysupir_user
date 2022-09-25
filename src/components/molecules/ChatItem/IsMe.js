import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, colors} from '../../../utils';

const IsMe = ({text, time}) => {
  return (
    <View style={styles.container}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.date}>{time}</Text>
      </View>
    </View>
  );
};

export default IsMe;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingRight: 16,
    // flexDirection: 'row',
  },
  chatContent: {
    maxWidth: '60%',
    backgroundColor: colors.primary,
    padding: 12,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 6,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    lineHeight: 18,
    paddingRight: 22,
    color: colors.white,
  },
  date: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: fonts.primary[400],
    color: colors.white,
    alignSelf: 'flex-end',
  },
});
