import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Header, Input, List, Button} from '../../components';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

const Lokasimu = ({navigation}) => {
  const [note, setNote] = useState('');
  const dispatch = useDispatch();
  const [loc, setLoc] = useState('');
  const [state, setState] = useState({
    latitude: 0,
    longitude: 0,
    desc: '',
  });
  const based = useSelector((state) => state.TripReducer.based);
  const startTrip = useSelector((state) => state.TripReducer.start);
  const states = useSelector((state) => state.TripReducer);
  const en = useSelector((state) => state.language.english);

  const getCurrLocation = async () => {
    Geolocation.getCurrentPosition((info) => {
      setState({
        ...state,
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
      console.log(info);
    });
  };

  useEffect(() => {
    getCurrLocation();
  }, []);

  const kirim = () => {
    if (based === 'onTime') {
      dispatch({type: 'SET_NOTES', notes: note});
      navigation.navigate('CreateTrack');
    } else {
      dispatch({type: 'SET_NOTES', notes: note});
      navigation.navigate('Tujuanmu');
    }
  };


  return (
    <View style={styles.page}>
      <Header label={en ? 'Choose your location' : "Pilih Lokasimu"} onPress={() => navigation.goBack()} />
      <View style={styles.top}>
        <TouchableOpacity
          style={styles.subtop}
          onPress={() =>
            navigation.navigate('ChooseLocation', {type: 'start'})
          }>
          <Input
            placeholder={en ? 'Choose your location' : "Pilih lokasimu"}
            value={startTrip.desc !== null ? startTrip.desc : 'Lokasi'}
            icon="loc"
            type="no-border"
            bordered
            disable
          />
        </TouchableOpacity>
        {based === 'onTrip' ? (
          <View style={styles.subtop}>
            <Input
              placeholder={en ? 'Add Notes' : "Tambah catatan"}
              icon="stack"
              type="no-border"
              small
              bordered
              value={note}
              onChangeText={(text) => setNote(text)}
            />
          </View>
        ) : null}
      </View>

      <View style={styles.divider} />
      <View style={styles.btn}>
        <Button name="Selanjutnya" onPress={() => kirim()} />
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
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'white',
    height: 50,
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
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 50,
    width: '100%',
  },
});
