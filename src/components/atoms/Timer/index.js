import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {fonts} from '../../../utils';
import {useNavigation} from '@react-navigation/native';

const Timer = ({resendOtp}) => {
  const initialMinute = 1;
  const initialSeconds = 40;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [expired, setExpired] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (expired) {
            navigation.navigate('Wellcome');
          }
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [expired, minutes, navigation, seconds]);

  const resend = () => {
    if (expired) {
      Alert.alert('Maaf, waktu habis.!');
      navigation.navigate('Wellcome');
    } else {
      resendOtp();
      setMinutes(2);
      setSeconds(40);
      setExpired(true);
    }
  };

  return (
    <View>
      {minutes === 0 && seconds === 0 ? (
        <TouchableOpacity onPress={resend}>
          <Text style={s.textOTP}>Kirim ulang OTP</Text>
        </TouchableOpacity>
      ) : (
        <Text style={s.text}>
          Kirim ulang setelah {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      )}
    </View>
  );
};

export default Timer;

const s = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  textOTP: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
