import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {Header, Input, List, Button} from '../../components';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {IcRingo, IcPlus} from '../../assets';

const Lokasimu = ({navigation}) => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.TripReducer);
  const en = useSelector((state) => state.language.english);
  const [trip, setTrip] = useState('');

  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.primary);
    navigation.navigate('ChooseLocation', {
      // type: 'trip1',
      type: 'finish',
      title: 'Tujuan',
    });
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };

  console.log();

  const nextStep = () => {
    dispatch({
      type: 'SET_TRIP2',
      payload: {
        desc: '',
        coord: null,
      },
    });

    if (Object.keys(states.finish.coord).length < 1) {
      alert(en ? 'Please choose the destination first' : 'Silahkan pilih tujuan terlebih dahulu')
    } else {
      dispatch({type: 'ONETRIP'});
      navigation.navigate('CreateTrack');
    }
  };

  return (
    <View style={styles.page}>
      <Header label="Pilih Tujuanmu" onPress={() => navigation.goBack()} />
      <View style={styles.top}>
        <View style={styles.subtop}>
          <View style={styles.container(border)}>
            <View style={styles.icon}>
              <IcRingo />
            </View>
            <View style={styles.divide} />
            <TextInput
              placeholder="Pilih Tujuanmu"
              onFocus={onFocusForm}
              onBlur={onBlurForm}
              style={styles.input}
              value={states.finish.desc}
              // editable={false}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Multitrip')}
              style={styles.iconPlus}>
              <IcPlus />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.divider} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bottom}>
        </View>
      </ScrollView>

      <View style={styles.btn}>
        <Button name="Selanjutnya" onPress={() => nextStep()} />
      </View>
    </View>
  );
};

export default Lokasimu;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingHorizontal: 36,
    paddingVertical: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  subtop: {
    marginBottom: 10,
  },
  divider: {
    backgroundColor: '#EDEDED',
    height: 24,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  btn: {
    paddingHorizontal: 20,
    bottom: 50,
    width: '100%',
  },
  input: {
    flex: 1,
    padding: 12,
    paddingRight: 20,
    fontSize: 14,
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
    paddingLeft: 20,

    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
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
