import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Header, Gap, Button} from '../../components';
import {Input} from '../../components';
import {colors, fonts} from '../../utils';
import {useSelector} from 'react-redux';
import {IcLocOff} from "../../assets/icon";

const Multitrip = ({navigation}) => {
  const trip1 = useSelector((state) => state.TripReducer.trip1);
  const trip2 = useSelector((state) => state.TripReducer.trip2);
  const start = useSelector((state) => state.TripReducer.start);
  const en = useSelector((state) => state.language.english);

  const [border, setBorder] = useState('#F1F3F6');

  return (
    <View style={s.page}>
      <Header label={en ? 'Trip Details' : "Detail Perjalanan"} onPress={() => navigation.goBack()} />
      <View style={s.container}>
        <View style={s.wrapper}>
          <Text style={s.label}>Titik keberangkatan</Text>
          <Input
              type="underline"
              icon="ringo"
              value={start.desc}
          />
          <View style={s.subcontainer}>
            <View style={s.icon}>
              <IcLocOff />
            </View>
            <TextInput
                editable={false}
                style={s.input(border)}
                value={trip1.desc}
            />
          </View>
          <View style={s.subcontainer}>
            <View style={s.icon}>
              <IcLocOff />
            </View>
            <TextInput
                editable={false}
                style={s.input(border)}
                value={trip2.desc}
            />
          </View>
          <Gap height={40} />
        </View>
      </View>
    </View>
  );
};

export default Multitrip;

const s = StyleSheet.create({
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
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
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
  icon: {
    paddingRight: 10,
  },
});
