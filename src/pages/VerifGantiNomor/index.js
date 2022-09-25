import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {Header, Gap, MyModal, Timer} from '../../components';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Button from '../../components/atoms/Button';
import OtpInputs from 'react-native-otp-inputs';
import axios from 'axios';

const Verification = ({navigation, route}) => {
  const [otp, setOtp] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const phone = route.params.phone;
  const token = route.params.token;

  const otpHandle = (value) => {
    if (isNaN(value)) {
      return;
    }
    if (value.length > 6) {
      return;
    }
    setOtp(value);
  };

  const resendOtp = () => {
    setOtp(null);
    handleResendOTP();
  };

  const handleResendOTP = () => {
    let data = new FormData();
    data.append('phone_number', phone);

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
      })
      .catch((e) => console.log(e));
  };

  const handleVerify = () => {
    let data = new FormData();
    data.append('phone_number', phone);
    data.append('otp_code', otp);

    axios
      .post('http://mysupir.com/api/user/verify/number', data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setModalVisible(true);
      })
      .catch((e) => console.log(e));
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
        <Text style={styles.text}>
          Kode telah dikirim ke nomor 0854 2158 5545
        </Text>
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
        <Button name="Kirim" onPress={() => handleVerify()} />
        {modalVisible ? (
          <MyModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            navigation={navigation}
          />
        ) : null}
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
