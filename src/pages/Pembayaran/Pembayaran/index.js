import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {Header, Gap} from '../../../components';
import {colors, fonts, convertDate} from '../../../utils';
import {IcBCA} from '../../../assets';
import {Button as ButtonPage, Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {Input} from '../../../components/';
import {Button as ButtonOutline} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

const MyDetailModal = ({visible, setVisible}) => {
  const states = useSelector((state) => state.TripReducer);

  return (
    <View style={s.centeredView}>
      <Modal
        style={s.view}
        animationType="slide"
        transparent={true}
        isVisible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={s.centeredView}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
            barStyle="light-content"
          />
          <View style={s.modalView}>
            <View style={s.padHor}>
              <View style={s.rows}>
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => setVisible(false)}>
                  <Icon
                    name="close"
                    size={24}
                    type="material-comunity"
                    color="#212121"
                  />
                </TouchableOpacity>
                <Text style={s.modalTextTitle}>Detail Pembayaran</Text>
              </View>
              <Gap height={15} />
              <View style={s.row}>
                <View style={s.col}>
                  <Text style={s.label}>Metode Pembayaran</Text>
                  <Text style={s.isi}>BCA Virtual Account</Text>
                </View>
                <IcBCA />
              </View>
            </View>
            {/* end */}
            <Gap height={10} />
            <Gap height={15} color="#F5F5F5" />
            <Gap height={10} />
            <View style={s.bayar}>
              <Text style={s.label}>Tarif Perjalanan</Text>
              {states.based === 'onTrip' ? (
                <>
                  <View style={s.list}>
                    <Text style={s.priceList}>Tarif Dasar (5km)</Text>
                    <Text style={s.priceList}>Rp 25.000</Text>
                  </View>
                  {states.perjalanan === 'multitrip' ? (
                    <View style={s.list}>
                      <Text style={s.priceList}>Tarif Perjalanan 2</Text>
                      <Text style={s.priceList}>Rp 25.000</Text>
                    </View>
                  ) : null}
                </>
              ) : (
                <View style={s.list}>
                  <Text style={s.priceList}>Sewa Pengemudi</Text>
                  <Text style={s.priceList}>Rp 225.000</Text>
                </View>
              )}
              <Gap height={2} color={'#F5F5F5'} />
              <View style={s.total}>
                <Text style={s.totPrice}>Total Tarif</Text>
                <Text style={s.totPrice}>Rp 25.000</Text>
              </View>
            </View>
            {/* end */}
            <Gap height={10} />
            <Gap height={15} color="#F5F5F5" />
            <Gap height={10} />
            {states.based === 'onTime' ? (
              <>
                <Text style={{...s.label, paddingLeft: 20}}>Tanggal Sewa</Text>
                <View style={{paddingHorizontal: 20}}>
                  <Text style={{...s.priceList, color: '#232323'}}>
                    Tanggal Mulai
                  </Text>
                  <Text
                    style={{
                      ...s.priceList,
                      color: '#303030',
                      fontSize: 10,
                      fontWeight: '600',
                      fontFamily: fonts.primary[600],
                    }}>
                    {convertDate(states.tanggalMulai)} WIB
                  </Text>
                  <Gap height={10} />
                  <Text style={{...s.priceList, color: '#232323'}}>
                    Tanggal Selesai
                  </Text>
                  <Text
                    style={{
                      ...s.priceList,
                      color: '#303030',
                      fontSize: 10,
                      fontWeight: '600',
                      fontFamily: fonts.primary[600],
                    }}>
                    {convertDate(states.tanggalSelesai)} WIB
                  </Text>
                </View>
              </>
            ) : (
              <>
                <Text style={{...s.label, paddingLeft: 20}}>
                  Rute Perjalanan
                </Text>
                <Input
                  type="underline"
                  placeholder={states.start}
                  icon="locon"
                  disable
                />
                <Input
                  type="underline"
                  value={states.trip1}
                  icon="dot"
                  disable
                />
                {states.perjalanan === 'multitrip' ? (
                  <Input
                    type="underline"
                    value={states.trip2}
                    icon="dot"
                    disable
                  />
                ) : null}
              </>
            )}
            <Gap height={20} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Pembayaran = ({navigation}) => {
  const [paid, setPaid] = useState(false);
  const [visible, setVisible] = useState(false);

  const [accountNumber, setAccountNumber] = useState('215615616465459');
  const [totalAmount, setTotalAmount] = useState('25.000');
  // const totalAmount = useSelector((state) => state.order.price);
  const [clipText, setClipText] = useState('');

  const [photo, setPhoto] = useState(null);
  const en = useSelector((state) => state.language.english);

  const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const getImage = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = await {uri: response.uri};
        setPhoto(source);
        setTimeout(() => {
          Alert.alert('uploaded sukses');
        }, 1000);
      }
    });
  };

  // useEffect(() => {
  //   setPaid(true);
  // }, [paid]);

  const copyToClipboard = (value) => {
    setClipText(value);
    Clipboard.setString(clipText);
    Alert.alert('Salin & tempel');
  };

  // const upload = () => {
  //   getImage();
  //   console.log(photo);
  //   if (photo !== null) {
  //     setTimeout(() => {
  //       alert('uploaded sukses');
  //     }, 2000);
  //   }
  // };

  return (
    <View style={s.page}>
      {/* dummy btn */}
      <View
        style={{position: 'absolute', left: 3, bottom: 200}}
        activeOpacity={0.5}>
        <ButtonOutline
          onPress={() => setPaid(!paid)}
          title="set dibayar"
          containerStyle={{width: 150}}
        />
      </View>
      {/*  */}
      <Header label="Pembayaran" onPress={() => navigation.goBack()} />
      <View style={s.container}>
        <Text style={s.desc}>{en ? 'Payment Deadline' : 'Batas Waktu Pembayaran'}</Text>
        <Text style={s.date}>Senin, 10 Maret 2020, 13:29 WIB</Text>
      </View>
      <Gap height={15} color="#F5F5F5" />
      <Gap height={15} />
      <View style={s.content}>
        <View style={s.row}>
          <Text style={s.bankName}>BCA Virtual Account</Text>
          <IcBCA />
        </View>
        <Gap height={10} />
        <Gap height={1} color="#DFDFDF" />
        <Gap height={10} />
        <View style={s.row}>
          <View style={s.col}>
            <Text style={s.label}>{en ? 'Virtual Account Number' : 'Nomor Virtual Account'}</Text>
            <Text style={s.isi}>{accountNumber}</Text>
          </View>
          <TouchableOpacity onPress={() => copyToClipboard(accountNumber)}>
            <Text style={s.link}>{en ? 'Copy' : 'Salin'}</Text>
          </TouchableOpacity>
        </View>
        <Gap height={15} />
        <View style={s.row}>
          <View style={s.col}>
            <Text style={s.label}>{en ? 'Total payable' : 'Total yang harus dibayarkan'}</Text>
            <Text style={s.isi}>{`Rp${totalAmount}`}</Text>
          </View>
          <TouchableOpacity onPress={() => copyToClipboard(totalAmount)}>
            <Text style={s.link}>Salin</Text>
          </TouchableOpacity>
        </View>
        <Gap height={15} />
        <View style={s.row}>
          <View style={s.col}>
            <Text style={s.label}>{en ? 'Payment Status' : 'Status Pembayaran'}</Text>
            <Text style={s.pay(paid)}>
              {paid ? en ? 'Payed' : 'Dibayar' : en ? 'Waiting Payment' : 'Menunggu Pembayaran'}
            </Text>
          </View>
        </View>
        <Gap height={20} />
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text style={{...s.link, textAlign: 'center'}}>
            {en ? 'See payment Details' : 'Lihat Detail Pembayaran'}
          </Text>
        </TouchableOpacity>
      </View>
      <MyDetailModal visible={visible} setVisible={setVisible} />
      <View style={s.btn}>
        <ButtonPage
          title={en ? "Upload Proof of Payment" : "Upload Bukti Bayar"}
          buttonStyle={s.btnStyle}
          titleStyle={s.btnTitleStyle}
          disabled={paid}
          onPress={() => getImage()}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          disabled={!paid}
          onPress={() => navigation.navigate('HomeTrip')}>
          <Text style={s.btnTitleStyle1(paid)}>{en ? 'Continue Order' : 'Lanjutkan Pemesanan'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pembayaran;

const s = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    height: 101,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  desc: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: fonts.primary[400],
    marginBottom: 3,
  },
  date: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 25,
    fontFamily: fonts.primary[700],
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  col: {},
  label: {
    color: '#858585',
    fontSize: 12,
    lineHeight: 15,
    fontFamily: fonts.primary[400],
    paddingBottom: 2,
  },
  isi: {
    color: '#232323',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.primary[700],
    fontWeight: 'bold',
  },
  link: {
    color: '#112D41',
    fontSize: 12,
    lineHeight: 15,
    fontFamily: fonts.primary[400],
    textDecorationLine: 'underline',
  },
  bankName: {
    color: '#232323',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.primary[600],
    fontWeight: 'bold',
  },
  pay: (paid) => ({
    color: paid ? '#55B947' : '#F63F3F',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.primary[700],
    fontWeight: 'bold',
  }),
  btn: {
    position: 'absolute',
    width: '100%',
    bottom: 15,
  },
  btnTitleStyle: {
    color: '#fff',
    fontFamily: fonts.primary[600],
    fontSize: 16,
    lineHeight: 20,
  },
  btnTitleStyle1: (paid) => ({
    color: paid ? colors.text.primary : '#ADADAD',
    fontFamily: fonts.primary[600],
    fontSize: 16,
    lineHeight: 20,
    paddingBottom: 13,
    paddingTop: 23,
    textAlign: 'center',
  }),
  btnStyle: {
    marginHorizontal: 20,
    borderRadius: 6,
    backgroundColor: '#17273F',
  },
  //   MODAL
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  centeredView: {
    flex: 1,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  modalView: {
    bottom: 0,
    // paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 15,
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  descText: {
    fontSize: 12,
    color: colors.text.primary,
    justifyContent: 'center',
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 16,
    fontFamily: fonts.primary[400],
    maxWidth: 255,
  },
  modalTextTitle: {
    fontSize: 18,
    lineHeight: 23,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
    paddingLeft: 5,
  },
  modalTextName: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 23,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
  },
  imgContainer: {
    height: 90,
    width: 90,
    marginVertical: 15,
    alignSelf: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 90 / 2,
  },
  descModal: {
    justifyContent: 'center',
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sim: {
    alignSelf: 'center',
    marginTop: 7,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
    paddingHorizontal: 3,
    paddingVertical: 4,
    backgroundColor: '#EAEAEA',
    borderRadius: 2,
  },
  padHor: {
    paddingHorizontal: 20,
  },
  //
  bayar: {
    paddingHorizontal: 20,
  },
  btnContainer: {
    bottom: 15,
    paddingHorizontal: 20,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingTop: 15,
  },
  total: {
    flexDirection: 'row',
    paddingVertical: 6,
    justifyContent: 'space-between',
  },
  priceList: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    lineHeight: 18,
    color: '#262626',
  },
  totPrice: {
    fontSize: 14,
    fontFamily: fonts.primary[700],
    lineHeight: 18,
    color: '#212121',
    fontWeight: 'bold',
  },
});
