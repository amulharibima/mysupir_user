import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, StatusBar, TextInput} from 'react-native';
import {Header, Gap, Timer} from '../../components';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Button from '../../components/atoms/Button';
import OtpInputs from 'react-native-otp-inputs';
import AsyncStorage from '@react-native-community/async-storage';
import {getData, storeData} from '../../utils';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

const Verification = ({navigation, route}) => {
  const [otp, setOtp] = useState(0);
  const [loading, setLoading] = useState(false);
  const {name = '', phone = '', email} = route.params;
  const dispatch = useDispatch();
  const en = useSelector((state) => state.language.english);
  const fotoProfil = useSelector((state) => state.TripReducer.user_pict);

  const otpHandle = (value) => {
    if (isNaN(value)) {
      return;
    }
    if (value.length > 6) {
      return;
    }
    setOtp(value);
  };

  let auth;
  if (route.params.auth == 'register') {
    auth = 'register';
  } else {
    auth = 'login';
  }

    const resendOtp = async () => {
        try {
            const res = await Axios.post(
                `http://mysupir.com/api/auth/${auth}`,
                {
                    email,
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (res) {
                alert('OTP sudah dikirim ulang ke e-mail anda');
                setOtp(null);
            }
        } catch (error) {
            console.log(error, 'error');
            alert('Failed');
            setLoading(false);
        }

    };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await Axios.post(
        `http://mysupir.com/api/auth/${auth}/verify`,
        {
          email,
          phone_number: phone,
          name,
          otp_code: parseInt(otp, 10),
        },
      );

      console.log('data', res.data);
      await storeData('user', res.data.user);
      // storeData('token', res.data.access_token);
      await AsyncStorage.setItem('token', res.data.access_token);
      await dispatch({
        type: 'SET_USER',
        payload: {
          name: res.data.user.name,
          email: res.data.user.email,
          foto:
            'http://mysupir.com/get_image?img_path=' +
            res.data.user.foto,
          phone_number: res.data.user.phone_number,
        },
        username: res.data.user.name,
        user_pict:
            'http://mysupir.com/get_image?img_path=' +
            res.data.user.foto,
      });

      console.log('fotoProfil', fotoProfil);

      await dispatch({
        type: 'ID',
        user_id: res.data.user.id,
      });
      setLoading(false);
      navigation.navigate('Home', {phone: res.data.user.phone_number});
    } catch (error) {
      console.log(error, 'error');
      setLoading(false);
      alert('Failed');
    }
  };

  return (
    <View style={styles.page}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
        hidden={false}
      />
      <Header
        label="Verifikasi OTP"
        type="shadow"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{en ? 'Code has been sent to e-mail' : 'Kode telah dikirim ke e-mail'} {email}</Text>
        <Gap height={35} />
        <View style={styles.box}>
          <View style={styles.inputContainer}>
            <View style={styles.otpBoxesContainer}>
              <OtpInputs
                handleChange={(value) => otpHandle(value)}
                numberOfInputs={6}
                keyboardType="numeric"
                inputContainerStyles={styles.inputContainerStyles}
                inputStyles={styles.inputStyles}
                defaultValue={otp}
              />
            </View>
          </View>
        </View>
        <Gap height={50} />
        <Timer resendOtp={resendOtp} />
        <Gap height={30} />
        <Button name={en ? 'Login' : "Masuk"} onPress={handleVerify} />
      </View>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    textAlign: 'center',
  },
  otpBoxesContainer: {
    flexDirection: 'row',
    height: 50,
  },
  otpBox: {
    marginHorizontal: 2.5,
    borderRadius: 5,
    backgroundColor: colors.boxotp,
    flex: 1,
    fontSize: 18,
    fontFamily: fonts.primary[400],
    textAlign: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  inputContainerStyles: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyles: {
    backgroundColor: colors.boxotp,
    height: 49,
    width: 49,
    marginHorizontal: 3,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    borderRadius: 5.2,
  },
});
