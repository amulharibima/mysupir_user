import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {IcPerson, IcEmail, IcPhone} from '../../../assets';
import Noborder from './NoBorder';
import UnderlineInput from './UnderlineInput';

const Input = ({
  icon,
  value,
  onChangeText,
  secureTextEntry,
  disable,
  placeholder,
  type,
  small,
  plus,
  onPress,
  bordered,
  keyType,
}) => {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.primary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };

  const Icon = () => {
    if (icon === 'person') {
      return <IcPerson />;
    }
    if (icon === 'email') {
      return <IcEmail />;
    }
    if (icon === 'phone') {
      return <IcPhone />;
    }
    return <IcPerson />;
  };

  if (type === 'no-border') {
    return (
      <Noborder
        icon={icon}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        disable={disable}
        small={small}
        plus={plus}
        onPress={onPress}
        bordered={bordered}
      />
    );
  }

  if (type === 'underline') {
    return (
      <UnderlineInput
        icon={icon}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        disable={disable}
      />
    );
  }

  return (
    <View style={styles.container(border)}>
      <View style={styles.icon}>
        <Icon />
      </View>
      {type === 'phone' && <Text>+62</Text>}
      <TextInput
        placeholder={placeholder}
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
        keyboardType={keyType}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 12,
    paddingLeft: 3,
    color: '#000',
  },
  label: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 6,
    fontFamily: fonts.primary[400],
  },
  container: (border) => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
  }),
  icon: {
    paddingLeft: 20,
    paddingRight: 10,
  },
});
