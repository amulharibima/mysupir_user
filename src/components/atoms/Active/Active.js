import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../utils/colors';

const Active = ({isActive, activeId}) => {
  return (
    <>
      {isActive === activeId ? (
        <View style={styles.on} />
      ) : (
        <View style={styles.off} />
      )}
    </>
  );
};

export default Active;

const styles = StyleSheet.create({
  on: {
    height: 3,
    width: '100%',
    backgroundColor: colors.primary,
  },
  off: {
    height: 3,
    width: '100%',
    backgroundColor: '#e5e5e5',
  },
});
