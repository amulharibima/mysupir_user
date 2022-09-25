import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import {ILLogo1, ILPic1} from '../../assets';
import {colors} from '../../utils/colors';
import {Input, Gap} from '../../components/atoms';
import {fonts} from '../../utils/fonts';
import Button from '../../components/atoms/Button';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';

const Wellcome = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [imgHeight, setImgHeight] = useState('100%');
  const [bottomFlex, setBottomFlex] = useState(0.5);
  const en = useSelector((state) => state.language.english);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setImgHeight('50%');
          setBottomFlex(0.6);
        }
    );
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setImgHeight('100%');
          setBottomFlex(0.5);
        }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleInput = (text) => {
    setEmail(text);
  };

  const handleSubmitPress = async () => {
    setLoading(true);
    try {
      const res = await Axios.post(
        'http://mysupir.com/api/auth/login',
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
        navigation.navigate('Verifikasi', {email, auth: 'login'});
        setLoading(false);
      }
    } catch (error) {
      console.log(error, 'error');
      alert('Failed');
      setLoading(false);
    }
  };

  return (
    <>
      <Spinner
          visible={loading}
      />
      <KeyboardAvoidingView
          style={{flex: 1}}
          behavior="padding"
      >
      <View style={styles.page}>
        <StatusBar barStyle="dark-content" hidden={true} translucent={true} />
        <View style={styles.upper}>
          <View style={styles.logo}>
            <ILLogo1 />
          </View>
          <View style={styles.image}>
            <Image source={ILPic1} style={[styles.img, {height: imgHeight}]} resizeMode={'contain'} />
          </View>
        </View>
        <View style={[styles.bottom, {flex: bottomFlex}]}>
          <Gap height={30} />
          <Text style={styles.greeting}>{en ? 'Welcome' : 'Selamat Datang!'}</Text>
          <Text style={styles.text}>Masuk atau daftar</Text>
          <Gap height={30} />
          <Input
            type="email"
            value={email}
            placeholder="E-mail"
            icon="email"
            onChangeText={(text) => handleInput(text)}
          />
          <Gap height={15} />
          <Button
            name="Masuk"
            onPress={() => {
              handleSubmitPress();
            }}
          />
          <Gap height={10} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Daftar')}
            style={styles.link}>
            <Text>
              {en ? `Don't have an account?` : 'Tidak memiliki akun?'} <Text style={styles.textLink}>{en ? 'Register' : 'Daftar'}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Wellcome;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  upper: {
    flex: 0.5,
  },
  logo: {
    marginTop: 34,
    alignItems: 'center',
  },
  image: {
    marginTop: 45,
    marginBottom: 38,
    paddingHorizontal: 16,
    width: '100%',
    height: 160,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  bottom: {
    flex: 0.5,
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 25,
    fontFamily: fonts.primary[900],
    color: colors.text.primary,
  },
  text: {
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: fonts.primary[400],
  },
  link: {
    alignItems: 'center',
    color: colors.text.primary,
    fontSize: 12,
    fontFamily: fonts.primary[300],
  },
  textLink: {
    color: colors.text.primary,
    fontSize: 16,
    fontFamily: fonts.primary[700],
  },
});
