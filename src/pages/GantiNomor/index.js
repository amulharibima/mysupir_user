import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import {Header, Button} from '../../components';
import {colors, getData} from '../../utils';
import axios from 'axios';
import {useSelector} from 'react-redux';

const GantiNomor = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState(null);
  const handleInput = (text) => {
    if (text[0] !== '8') {
      Alert.alert('gunakan format 81234567890');
    } else {
      setPhone(text);
    }
  };
  const en = useSelector((state) => state.language.english);

  useEffect(() => {
    getData('token').then((res) => {
      const data = res;
      setToken(data);
    });
  }, []);

  console.log(token);

  const handleSubmit = () => {
    let data = new FormData();
    data.append('phone_number', phone);
    console.log('no telp', data)

    axios
      .post('http://mysupir.com/api/user/update/number', data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        navigation.navigate('VerifGanti', {phone: phone, token: token});
      })
      .catch((e) => {
        // Alert.alert(e.message);
        console.log(e);
      });
  };

  return (
    <>
      <Header
        label={en ? 'Change Phone Number' : 'Ubah nomor Telepon'}
        type="shadow"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>{en ? 'New number' : 'Nomor baru'}</Text>
          <TextInput
            type="phone"
            placeholder={en ? 'Enter a new number' : 'Masukkan nomor baru'}
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={(text) => handleInput(text)}
          />
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.btn}>
            <Button
              name={en ? 'Send' : 'Kirim'}
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default GantiNomor;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 24,
    // alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#6E6D6B',
  },
  input: {
    backgroundColor: colors.bgInput,
    padding: 16,
    borderRadius: 10,
    marginTop: 8,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
  },
  btn: {
    width: '60%',
  },
});
