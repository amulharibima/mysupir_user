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
import {IcRingo, IcLocOff, IcLocOn, IcDarkDotBg} from '../../../assets';

const Input = ({icon, value, onChangeText, placeholder, disable}) => {
  const [border, setBorder] = useState('#F1F3F6');
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
    if (icon === 'locof') {
      return <IcLocOff />;
    }
    if (icon === 'locon') {
      return <IcLocOn />;
    }
    if (icon === 'dot') {
      return <IcDarkDotBg />;
    }
    return <IcLocOff />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon />
      </View>
      <TextInput
        placeholder={placeholder}
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        editable={!disable}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: (border) => ({
    flex: 1,
    paddingTop: 15,
    paddingBottom: 5,
    paddingRight: 20,
    marginRight: 20,
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: border,
    fontFamily: fonts.primary[400],
  }),
  label: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 6,
    fontFamily: fonts.primary[400],
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  icon: {
    paddingRight: 10,
  },
  divide: {
    height: '50%',
    width: 1,
    backgroundColor: '#cecece',
  },
});
