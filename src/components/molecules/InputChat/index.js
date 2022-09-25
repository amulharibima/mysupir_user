import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';

const InputChat = ({value, onChangeText, onButtonPress}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tulis pesan untuk Hansley..."
        value={value}
        onChangeText={onChangeText}
      />
      <Button
        disable={value.length < 1}
        type="btn-icon-send"
        onPress={onButtonPress}
      />
    </View>
  );
};

export default InputChat;

const styles = StyleSheet.create({
  container: {padding: 16, flexDirection: 'row'},
  input: {
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontFamily: fonts.primary[400],
    fontSize: 14,
    maxHeight: 45,
  },
});
