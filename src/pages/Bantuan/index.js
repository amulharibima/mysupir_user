import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Linking,
  Platform,
} from 'react-native';
import {Header, List, Gap} from '../../components';
import {fonts} from '../../utils/fonts';
import {useSelector} from 'react-redux';

const Bantuan = ({navigation}) => {
  const en = useSelector((state) => state.language.english);
  const dialCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:081717736373`;
    } else {
      phoneNumber = `telprompt:081717736373`;
    }
    Linking.openURL(phoneNumber);
  };

  const sendWhatsApp = () => {
    let msg = 'Hay, MySupir..';
    let mobile = 81717736373;
    if (mobile) {
      if (msg) {
        // Kode negara 62 = Indonesia
        let url = 'whatsapp://send?text=' + msg + '&phone=62' + mobile;
        Linking.openURL(url)
          .then((data) => {
            console.log('WhatsApp Opened');
          })
          .catch(() => {
            alert('Make sure Whatsapp installed on your device');
          });
      } else {
        alert('Please insert message to send');
      }
    } else {
      alert('Please insert mobile no');
    }
  };

  const sendEmail = () => {
    Linking.openURL(
      'mailto:mysupir.haribima21@gmail.com?subject=Help/Support&body=This is Description',
    );
  };

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <Header
        label={en === true ? 'Help' : 'Bantuan'}
        type="shadow"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text style={styles.txt}>
          {en === true
            ? 'We are ready to serve you 24 hours every day. Select one of the following services to start asking questions.'
            : 'Kami siap melayani kamu 24 jam setiap hari. Pilih salah satu layanan berikut untuk mulai bertanya.'}
        </Text>

        <List
          name={en === true ? "Telephone" : "Telepon"}
          address="081717736373"
          icon="call"
          type="help"
          onPress={() => dialCall()}
        />
        <Gap height={10} />
        <List
          name="Mail"
          address="mysupir.haribima21@gmail.com"
          icon="mail"
          type="help"
          onPress={() => sendEmail()}
        />
        <Gap height={10} />
        <List
          name="Chat"
          address="Chat langsung dengan customer care melalui Whatsapp"
          icon="chat"
          type="help"
          onPress={() => sendWhatsApp()}
        />
      </View>
    </View>
  );
};

export default Bantuan;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  container: {
    justifyContent: 'center',
  },
  list: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F6',
    paddingVertical: 10,
  },
  txt: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
