import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fonts} from '../../../utils';

const ListProfile = ({label, name, onPress, ubah}) => {
  return (
    <View style={styles.list}>
      <View style={styles.row}>
        <View>
          <Text style={styles.txtLabel}>{label}</Text>
          <Text style={styles.txtDesc}>{name}</Text>
        </View>
        {ubah && (
          <TouchableOpacity onPress={onPress} style={styles.btn}>
            <Text style={styles.txtUbah}>Ubah Nomor</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ListProfile;

const styles = StyleSheet.create({
  list: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F6',
    paddingVertical: 10,
  },
  txtLabel: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
  },
  txtDesc: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtUbah: {
    fontSize: 12,
    fontFamily: fonts.primary[700],
  },
  btn: {
    alignSelf: 'flex-end',
  },
});
