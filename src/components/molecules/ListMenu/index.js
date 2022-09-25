import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {fonts, colors} from '../../../utils';
import {
  IcProfile,
  IcLang,
  IcHistory,
  IcAbout,
  IcHelp,
  IcNext,
  IcCard,
} from '../../../assets';

const ListMenu = ({profile, name, desc, type, onPress, icon, pad}) => {
  const Icon = () => {
    if (icon === 'edit-profile') {
      return <IcProfile />;
    }
    if (icon === 'language') {
      return <IcLang />;
    }
    if (icon === 'history') {
      return <IcHistory />;
    }
    if (icon === 'about') {
      return <IcAbout />;
    }
    if (icon === 'help') {
      return <IcHelp />;
    }
    if (icon === 'card') {
      return <IcCard />;
    }
    return <IcProfile />;
  };
  return (
    <TouchableOpacity style={styles.container(pad)} onPress={onPress}>
      {icon ? <Icon /> : <Image source={profile} style={styles.avatar} />}

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
      </View>

      {desc ? <Text style={styles.desc}>{desc}</Text> : null}
      {type === 'next' ? <IcNext /> : null}
    </TouchableOpacity>
  );
};

export default ListMenu;

const styles = StyleSheet.create({
  container: (pad) => ({
    flexDirection: 'row',
    borderBottomWidth: pad ? 1 : 0,
    borderBottomColor: pad ? colors.divider2 : null,
    padding: pad ? 16 : 0,
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  content: {flex: 1, paddingLeft: 16},
  avatar: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  desc: {
    fontFamily: fonts.primary[600],
    fontSize: 10,
    color: colors.text.primary,
    textTransform: 'capitalize',
    paddingRight: 5,
  },
});
