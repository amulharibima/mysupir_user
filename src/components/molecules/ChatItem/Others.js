import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts, colors} from '../../../utils';

const Others = ({text, time}) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.chatContent}>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.date}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default Others;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingLeft: 16,
    flexDirection: 'row',
  },
  avatar: {height: 30, width: 30, borderRadius: 30 / 2, marginRight: 12},
  chatContent: {
    maxWidth: '80%',
    backgroundColor: colors.white,
    paddingTop: 12,
    paddingRight: 10,
    paddingLeft: 14,
    paddingBottom: 6,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
    paddingRight: 22,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
    alignSelf: 'flex-end',
  },
});
