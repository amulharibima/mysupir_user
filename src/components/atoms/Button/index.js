import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {IcNextWhite} from '../../../assets';
import BtnIconSend from './BtnIconSend';

const Button = (props) => {
  const [disabled, setDisabled] = useState(props.disable);

  useEffect(() => {
    setDisabled(props.disable);
  }, [props.disable]);

  if (props.type === 'btn-icon-send') {
    return <BtnIconSend disable={disabled} onPress={props.onPress} />;
  }
  return (
    <KeyboardAvoidingView enabled={false}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={props.opacity ? props.opacity : 0.5}
        onPress={props.onPress}
        style={styles.container(props.type, props.noRadius)}>
        <Text style={styles.text(props.font, props.weight)}>{props.name}</Text>
        {props.type === 'next' ? <IcNextWhite /> : null}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (type, noRadius) => ({
    backgroundColor: colors.primary,
    borderRadius: noRadius ? 0 : 10,
    padding: 13,
    alignItems: 'center',
    flexDirection: type === 'next' ? 'row' : null,
    justifyContent: type === 'next' ? 'space-between' : 'center',
  }),
  text: (font, weight) => ({
    fontSize: font ? font : 18,
    fontFamily: fonts.primary[weight ? weight : 700],
    color: colors.white,
  }),
});
