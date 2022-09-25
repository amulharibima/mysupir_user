import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IcNext} from '../../../assets';
import {fonts} from '../../../utils';

const List = ({name, onPress, next, line, bgWhite}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.list(line, bgWhite)}>
        <View style={styles.row}>
          <View>
            <Text style={styles.txtLabel}>{name}</Text>
          </View>
          <View>{next ? <IcNext /> : null}</View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  list: (line, bgWhite) => ({
    borderBottomWidth: line ? 1 : 0,
    borderBottomColor: line ? '#F1F3F6' : null,
    paddingVertical: 10,
    backgroundColor: bgWhite ? 'white' : null,
  }),
  txtLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
