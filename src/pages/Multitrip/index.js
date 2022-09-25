import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import {Header, Gap, Button} from '../../components';
import {Input} from '../../components';
import {colors, fonts} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {IcLocOff} from '../../assets';

const Multitrip = ({navigation}) => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.TripReducer);
  const en = useSelector((state) => state.language.english);

  const nextStep = () => {
    if(states.trip2.desc){
      dispatch({type: 'MULTITRIP'});
      navigation.navigate('CreateTrack');
    }
    else
      Alert.alert('Error', en ? 'Please fill the second trip' : 'Trip kedua harus diisi');
  };

  const [border, setBorder] = useState('#F1F3F6');

  const onBlurForm = () => {
    setBorder(colors.border);
  };

  return (
    <View style={s.page}>
      <Header label="Tambah Titik" onPress={() => navigation.goBack()} />
      <View style={s.container}>
        <View style={s.wrapper}>
          <Text style={s.label}>Titik keberangkatan</Text>
          <Input
            type="underline"
            placeholder="Grogol, Jakarta"
            icon="ringo"
            value={states.start.desc}
          />
          <View style={styles.container}>
            <View style={styles.icon}>
              <IcLocOff />
            </View>
            <TextInput
              placeholder="Tambahkan"
              onFocus={() => {
                setBorder(colors.primary);
                navigation.navigate('ChooseLocation', {
                  type: 'trip1',
                  title: 'Tujuan',
                });
              }}
              onBlur={onBlurForm}
              style={styles.input(border)}
              value={states.trip1.desc}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.icon}>
              <IcLocOff />
            </View>
            <TextInput
              placeholder="Tambahkan"
              onFocus={() => {
                setBorder(colors.primary);
                navigation.navigate('ChooseLocation', {
                  type: 'trip2',
                  title: 'Tujuan',
                });
              }}
              onBlur={onBlurForm}
              style={styles.input(border)}
              value={states.trip2.desc}
            />
          </View>
          <Gap height={40} />
        </View>
      </View>

      <View style={s.btnContainer}>
        <Button name="Selanjutnya" onPress={() => nextStep()} />
      </View>
    </View>
  );
};

export default Multitrip;

const s = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    lineHeight: 18,
    marginLeft: 50,
    marginTop: 20,
    marginBottom: -20,
  },
  btnContainer: {
    bottom: 50,
    paddingHorizontal: 20,
  },
});

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
