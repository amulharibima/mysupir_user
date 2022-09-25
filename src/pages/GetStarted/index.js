import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Swapper} from '../../components';
import {fonts} from '../../utils/fonts';
import { useSelector } from 'react-redux';

const GetStarted = ({navigation}) => {
  const en = useSelector((state) => state.language.english);
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" hidden={true} translucent={true} />
      <Swapper navigation={navigation} />
      <TouchableOpacity
        onPress={() => navigation.replace('Wellcome')}
        style={{position: 'absolute', top: 45, right: 20}}>
        <Text style={styles.skip}>{en ? 'Skip' : 'Lewati'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  skip: {
    fontFamily: fonts.primary[700],
    fontSize: 14,
  },
});
