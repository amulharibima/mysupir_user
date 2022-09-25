import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';
import {
  IcPerson,
  IcRingo,
  IcTime,
  IcLocOn,
  IcStack,
  IcPlus,
} from '../../../assets';

const Input = ({
  icon,
  value,
  onChangeText,
  secureTextEntry,
  disable,
  placeholder,
  small,
  plus,
  onPress,
  bordered,
}) => {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.primary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };

  const Icon = () => {
    if (icon === 'ringo') {
      return <IcRingo />;
    }
    if (icon === 'time') {
      return <IcTime />;
    }
    if (icon === 'loc') {
      return <IcLocOn />;
    }
    if (icon === 'stack') {
      return <IcStack />;
    }
    return <IcPerson />;
  };

  return (
    <View style={styles.container(border, bordered)}>
      <View style={styles.icon}>
        <Icon />
      </View>
      <View style={styles.divide} />
      <TextInput
        placeholder={placeholder}
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(small)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
      />
      {plus ? (
        <TouchableOpacity onPress={onPress} style={styles.iconPlus}>
          <IcPlus />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: (small) => ({
    flex: 1,
    padding: small ? 5 : 12,
    paddingRight: 20,
    fontSize: small ? 12 : 14,
  }),
  label: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 6,
    fontFamily: fonts.primary[400],
  },
  container: (border, bordered) => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,

    borderWidth: bordered ? 1 : 0,
    borderColor: bordered ? border : null,
    borderRadius: bordered ? 10 : 0,
  }),
  icon: {
    paddingRight: 10,
  },
  iconPlus: {
    paddingRight: 18,
  },
  divide: {
    height: '50%',
    width: 1,
    backgroundColor: '#cecece',
  },
});
