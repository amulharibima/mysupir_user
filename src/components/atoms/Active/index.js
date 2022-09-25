import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../utils/colors';
import ActiveOnOF from './Active';

const Active = ({isActive, activeId, type}) => {
  if (type === 'on-off') {
    return <ActiveOnOF isActive={isActive} activeId={activeId} />;
  }

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
    height: 5,
    width: '100%',
    backgroundColor: colors.primary,
  },
  off: {
    height: 5,
    width: '100%',
  },
});
