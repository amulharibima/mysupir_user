/* eslint-disable no-eval */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {Input, Gap} from '../../components';
import Button from '../../components/atoms/Button';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const Daftar = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const en = useSelector((state) => state.language.english);

  const checInput = (input, alias = null) => {
    if (alias === null) {
      alias = input;
    }
    return eval(input) ? null : `${alias} harus diisi`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await Axios.post(
        'http://mysupir.com/api/auth/register',
        {
          phone_number: phone,
          name: name,
          email: email,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (res) {
        console.log(res.data);
        setIsSubmitting(false);
        navigation.navigate('Verifikasi', {
          phone: phone,
          auth: 'register',
          email: email,
          name: name,
        });
      }
    } catch (error) {
      let errors = error.response.data.errors;
      let msg = '';

      Object.values(errors).forEach(val => msg += `- ${val} \n`);

      alert(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.page}>
      <Spinner visible={isSubmitting}/>
      <View style={styles.upper}>
        <Text style={styles.title}>{en ? 'Register' : 'Daftar'}</Text>
        <Text style={styles.text}>Silahkan mendaftar.</Text>
      </View>
      <View style={styles.bottom}>
        <Gap height={40} />
        <Input
          placeholder="Nama"
          icon="person"
          onChangeText={(txt) => setName(txt)}
        />
        <Gap height={15} />
        <Input
          placeholder="Email"
          icon="email"
          keyType="email-address"
          onChangeText={(txt) => setEmail(txt)}
        />
        <Gap height={15} />
        <Input
          type="phone"
          placeholder="No Handphone"
          icon="phone"
          keyType="phone-pad"
          onChangeText={(txt) => setPhone(txt)}
        />
        <View style={styles.btn}>
          <Button name="Daftar" onPress={() => handleSubmit()} />
        </View>
      </View>
    </View>
  );
};

export default Daftar;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  upper: {
    flex: 0.2,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.primary[600],
    color: colors.white,
    marginTop: 34,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.white,
  },
  bottom: {
    flex: 0.8,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  btn: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 40,
  },
});
