import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../components';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import List from '../../components/molecules/List/List';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'react-native-elements';

const Bahasa = ({navigation}) => {
  const dispatch = useDispatch();
  const en = useSelector((state) => state.language.english);

  const langChange = async (lang) => {
    if (lang == 'Indo') {
      await AsyncStorage.setItem('bahasa', '0');
      dispatch({type: 'INDONESIA'});
    } else if (lang == 'Eng') {
      await AsyncStorage.setItem('bahasa', '1');
      dispatch({type: 'ENGLISH'});
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" translucent={true} />
        <Header
          label={en ? 'Language' : 'Bahasa'}
          type="shadow"
          onPress={() => navigation.goBack()}
        />
        <TouchableOpacity onPress={() => langChange('Indo')}>
          <View style={[styles.button, {marginTop: 15}]}>
            <Text style={styles.text}>
              {en === true ? 'Indonesian' : 'Bahasa Indonesia'}
            </Text>
            {en === false && (
              <Icon
                type="material-community"
                name="check"
                color="#17273F"
                size={20}
                containerStyle={{marginVertical: 13}}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => langChange('Eng')}>
          <View style={styles.button}>
            <Text style={styles.text}>
              {en === true ? 'English' : 'Bahasa Inggris'}
            </Text>
            {en === true && (
              <Icon
                type="material-community"
                name="check"
                color="#17273F"
                size={20}
                containerStyle={{marginVertical: 13}}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Bahasa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#17273F',
    marginVertical: 13,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ECECEC',
    paddingBottom: 5,
    marginBottom: 5,
    alignContent: 'center',
  },
});
