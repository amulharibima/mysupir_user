import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import {Header, Gap, Button} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {
  ILCheckSukses,
  DummyProfile,
  IcStartActive,
  IcStartInactive,
} from '../../assets';
import {fonts, colors} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
// import {Button} from 'react-native-elements';

const numStars = 5;

const Star = ({rate}) => {
  return rate ? (
    <View style={{marginHorizontal: 4.5}}>
      <IcStartActive />
    </View>
  ) : (
    <View style={{marginHorizontal: 4.5}}>
      <IcStartInactive />
    </View>
  );
};

const BeriNilai = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [border, setBorder] = useState(colors.border);
  const order = useSelector((state) => state.order);
  const en = useSelector((state) => state.language.english);

  const onFocusForm = () => {
    setBorder(colors.primary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };

  const onChangeText = (val) => {
    setNotes(val);
  };

  let stars = [];

  const handleRating = (id) => {
    return setRating(id);
  };

  for (let i = 1; i <= numStars; i++) {
    stars.push(
      <TouchableWithoutFeedback
        key={i}
        onPress={() => {
          handleRating(i);
        }}>
        <Animated.View>
          <Star rate={i <= rating ? true : false} />
        </Animated.View>
      </TouchableWithoutFeedback>,
    );
  }

  const sendRating = async () => {
    if(rating === 0){
      alert(en ? 'Rating must be filled' : 'Rating harus diisi');
      return
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        `http://mysupir.com/api/order/rating/${order.order_id}`,
        {
          rating: rating,
          notes: notes,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (res) {
        console.log(res);
        navigation.push('Home');
      }
    } catch (error) {
      console.log('error', error);
      alert(error.message);
    }
  };
  return (
    <View style={styles.page}>
      <Header
        label={en ? 'Rate' : 'Beri Nilai'}
        type="shadow"
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Gap height={18} />
          <Image source={ILCheckSukses} style={styles.image} />
          <Text style={styles.name}>{en ? 'Thank you!' : 'Terima Kasih!'}</Text>
          <Gap height={4} />
          <Text style={styles.label}>
            {en ? "How's Your Journey!" : 'Bagaimana Perjalanan Kamu!'}
          </Text>
        </View>
        <Gap height={28} />
        <View style={styles.driver}>
          <Gap height={20} />
          <Image source={{uri: order.driver_pict}} style={styles.imgDrier} />
          <Gap height={15} />
          <Text style={styles.name}>{order.driver_name}</Text>
          <Gap height={15} />
          <Text style={[styles.label, {color: '#8D8D8D'}]}>
            {en ? 'Rate Your Driver!' : 'Beri Nilai Supirmu!'}
          </Text>
          <Gap height={10} />
          <View style={[styles.star]}>{stars}</View>
          <Gap height={10} />
          <KeyboardAvoidingView>
            <View style={styles.textAreaContainer}>
              <Gap height={25} />
              <View style={styles.inputText(border)}>
                <TextInput
                  onFocus={onFocusForm}
                  onBlur={onBlurForm}
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder={
                    en
                      ? 'Tap to write message ...'
                      : 'Ketuk untuk menulis pesan...'
                  }
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
                  onChangeText={onChangeText}
                />
              </View>
              <Gap height={20} />
              <Button
                name={en ? 'Send' : 'Kirim'}
                font={16}
                weight={600}
                onPress={sendRating}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default BeriNilai;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: 63,
    width: 63,
  },
  container: {
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.primary[700],
    lineHeight: 23,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    lineHeight: 15,
    color: '#535353',
    textAlign: 'center',
  },
  driver: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    flex: 1,
  },
  imgDrier: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
  },
  star: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btnContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  textAreaContainer: {
    marginHorizontal: 20,
    justifyContent: 'flex-end',
  },
  inputText: (border) => ({
    borderRadius: 8,
    borderColor: border,
    borderWidth: 1,
  }),
  textArea: {
    paddingHorizontal: 12,
    height: 100,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
