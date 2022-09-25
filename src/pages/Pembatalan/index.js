import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {Header, Gap, Button} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../../utils';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

const options = [
  {
    key: 1,
    text: 'Terlalu lama',
  },
  {
    key: 2,
    text: 'Pengemudi tidak ada',
  },
  {
    key: 3,
    text: 'Pengemudi berisik',
  },
  {
    key: 4,
    text: 'Pengemudi belum mandi',
  },
  {
    key: 5,
    text: 'Pengemudi ngantuk',
  },
  {
    key: 6,
    text: 'Lainnya',
  },
];

const MyRadioButton = ({items, setSelected, selected, onChangeText}) => {

  const [select, setSelect] = useState(0);

  return (
    <>
      {items.map((item) => {
        return (
          <View key={item.key} style={styles.container}>
            <View style={styles.circle}>
              {select === item.key && <View style={styles.checkedCircle} />}
            </View>
            <TouchableOpacity
              onPress={() => {
                setSelected(item.text)
                setSelect(item.key);
              }}
              style={styles.buttonContainer}>
              <Text style={styles.txtOptions}>{item.text}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      {selected === 6 && (
        <View
          style={{
            paddingLeft: 60,
            marginTop: -30,
          }}>
          <TextInput
            placeholder="Tulis alasan lain disini..."
            style={styles.txtOptions}
            onChangeText={(event) => onChangeText(event)}
          />
        </View>
      )}
    </>
  );
};

const Pembatalan = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const id = useSelector((state) => state.order.order_id);
  const [text, setText] = useState('');
  const en = useSelector((state) => state.language.english);

  const cancel = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        `http://mysupir.com/api/order/cancel/${id}`,
        {
          cancel_notes: selected !== null ? selected : text,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
            accept: 'applicaton/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (res) {
        console.log(res.data);
        Alert.alert('Maaf atas Ketidak nyamanannya ya, yuk Order lagi..');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  console.log(selected);

  return (
    <>
      <View style={styles.page}>
        <Header
          label={en ? "Reason for Cancellation" : "Alasan Pembatalan"}
          onPress={() => navigation.goBack()}
          type="shadow"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={20} />
          <MyRadioButton
            items={options}
            selected={selected}
            setSelected={setSelected}
            onChangeText={setText}
          />
        </ScrollView>
        <View style={styles.btnContainer}>
          <Button name={en ? 'Send' : "Kirim"} font={16} onPress={cancel} />
        </View>
      </View>
    </>
  );
};

export default Pembatalan;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  txtOptions: {
    marginRight: 20,
    // flex: 1,
    width: '90%',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.primary[600],
    fontWeight: '600',
    color: '#9D9D9D',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D1D1',
    paddingBottom: 5,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    backgroundColor: '#E8E8E8',
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#794F9B',
  },
  btnContainer: {
    paddingHorizontal: 20,
    bottom: 15,
    justifyContent: 'flex-end',
    flex: 1,
  },
});
