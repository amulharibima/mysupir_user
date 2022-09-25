import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import {fonts, colors} from '../../../utils';
import Modal from 'react-native-modal';
import {Active, Button, Gap} from '../../atoms';
import {IcBack, IcNext} from '../../../assets';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const MyList = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listContainer}>
      <View style={styles.image}>
        <Icon
          name="credit-card"
          type="material-comunity"
          color="#000000"
          size={30}
        />
      </View>
      <View style={styles.cardName}>
        <View style={styles.cardDetail}>
          <Text style={styles.name}>KlikBCA</Text>
          <Text style={styles.cardDesk}>Bayar dengan akun KlikBCA anda</Text>
        </View>
        <Icon name="chevron-right" type="material-comunity" color="#e5e5e5e5" />
      </View>
    </TouchableOpacity>
  );
};

const ModalDetailPembayaran = ({modalVisible, setModalVisible, source}, props) => {
  const navigation = useNavigation();
  const [pilihan, setPilihan] = useState('onTrip');
  const [lanjut, setLanjut] = useState(false);
  const [selected, setSelected] = useState(false);
  const klik = (value) => {
    setPilihan(value);
  };

  return (
    <View style={s.centeredView}>
      <Modal
        style={s.view}
        isVisible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={props.onClose}>
        {/* <View style={s.centeredView}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
            barStyle="light-content"
          />
          <View style={s.modalView}>
            <View style={s.header}>
              {!lanjut && (
                <TouchableOpacity
                  style={s.icon}
                  onPress={() => setModalVisible(false)}>
                  <Icon name="close" type="material-comunity" color="#e5e5ee" />
                </TouchableOpacity>
              )}
              {lanjut && (
                <TouchableOpacity
                  style={s.icon}
                  onPress={() => setLanjut(false)}>
                  <Icon
                    name="chevron-left"
                    type="material-comunity"
                    color="#e5e5ee"
                  />
                </TouchableOpacity>
              )}
              <View style={s.divider} />
              <View style={s.headerTitle}>
                <Text style={s.mySupir}>My Supir</Text>
                <Text style={s.rincian}>Rincian Belanja</Text>
              </View>
            </View>
            {!lanjut && (
              <>
                <View style={s.container}>
                  <View style={s.totalContainer}>
                    <Text style={s.jum}>Jumlah</Text>
                    <View style={s.nominal}>
                      <Text style={s.rp}>Rp</Text>
                      <Text style={s.amount}>20.000</Text>
                    </View>
                  </View>
                  <View style={s.order}>
                    <Text style={s.txtOrder}>Order ID</Text>
                    <Text style={s.txtOrder}>73678925678390</Text>
                  </View>
                </View>
                <View style={styles.detail}>
                  <View style={styles.top}>
                    <View style={styles.subtop}>
                      <TouchableOpacity onPress={() => klik('onTrip')}>
                        <Text
                          style={styles.text(
                            pilihan === 'onTrip'
                              ? colors.text.primary
                              : '#c4c4c4',
                          )}>
                          Pesanan
                        </Text>
                      </TouchableOpacity>
                      <Active
                        type="on-off"
                        isActive={pilihan}
                        activeId="onTrip"
                      />
                    </View>
                    <View style={styles.subtop}>
                      <TouchableOpacity onPress={() => klik('onTime')}>
                        <Text
                          style={styles.text(
                            pilihan === 'onTime'
                              ? colors.text.primary
                              : '#c4c4c4',
                          )}>
                          Pengiriman
                        </Text>
                      </TouchableOpacity>
                      <Active
                        type="on-off"
                        isActive={pilihan}
                        activeId="onTime"
                      />
                    </View>
                  </View>
                  <View style={styles.listDetail}>
                    <View style={styles.list1}>
                      <Text style={styles.txtProd}>Produk</Text>
                      <Text style={styles.txtJum}>Jumlah</Text>
                    </View>
                    <View style={styles.list}>
                      <Text style={styles.txtKet}>
                        Taksi Mobil - Jemput Nanti
                      </Text>
                      <Text style={styles.txtAmount}>20.000</Text>
                    </View>
                  </View>
                </View>
              </>
            )}
            {lanjut && selected && (
              <>
                <View style={s.container}>
                  <View style={s.totalContainer}>
                    <Text style={s.jum}>Jumlah</Text>
                    <View style={s.nominal}>
                      <Text style={s.rp}>Rp</Text>
                      <Text style={s.amount}>20.000</Text>
                    </View>
                  </View>
                  <View style={s.order}>
                    <Text style={s.txtOrder}>Order ID</Text>
                    <Text style={s.txtOrder}>73678925678390</Text>
                  </View>
                </View>
                <View style={styles.detailCard}>
                  <TextInput
                    placeholder="Nomor kartu"
                    style={{paddingHorizontal: 10}}
                  />
                  <View style={s.HorizonalDivider} />
                  <View style={styles.cvv}>
                    <Text style={styles.txtLimit}>Berlaku Hingga</Text>
                    <View style={styles.sekat} />

                    <View style={styles.cvvHelp}>
                      <TextInput placeholder="CVV" />
                      <TouchableOpacity>
                        <Icon
                          name="help-outline"
                          type="material-comunity"
                          color="#e5e5ee"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#c4c4c4',
                    margin: 5,
                    borderRadius: 3,
                  }}>
                  <View style={{flexDirection: 'row', padding: 5}}>
                    <Icon
                      name="lock"
                      type="material-comunity"
                      color="#c4c4c4"
                      size={18}
                    />
                    <Text
                      style={{fontSize: 12, color: '#c4c4c4', paddingLeft: 5}}>
                      Pembayaran aman dengan MidTrans
                    </Text>
                  </View>
                  <View style={s.HorizonalDivider} />
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      justifyContent: 'space-around',
                    }}>
                    <Icon
                      name="credit-card"
                      type="material-comunity"
                      color="#000000"
                      size={30}
                    />
                    <Icon
                      name="credit-card"
                      type="material-comunity"
                      color="#000000"
                      size={30}
                    />
                    <Icon
                      name="credit-card"
                      type="material-comunity"
                      color="#000000"
                      size={30}
                    />
                    <Icon
                      name="credit-card"
                      type="material-comunity"
                      color="#000000"
                      size={30}
                    />
                    <Icon
                      name="credit-card"
                      type="material-comunity"
                      color="#000000"
                      size={30}
                    />
                  </View>
                </View>
                <View style={s.container}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.email}>budi@gmail.com</Text>
                  <Gap height={5} />
                  <View style={s.HorizonalDivider} />
                  <Gap height={5} />
                  <Text style={styles.label}>No Telp.</Text>
                  <Text style={styles.email}>+6281808466410</Text>
                </View>
              </>
            )}
            {lanjut && !selected && (
              <ScrollView style={s.container}>
                <MyList onPress={() => setSelected(true)} />
                <MyList onPress={() => setSelected(true)} />
                <MyList onPress={() => setSelected(true)} />
                <MyList onPress={() => setSelected(true)} />
                <MyList onPress={() => setSelected(true)} />
                <MyList onPress={() => setSelected(true)} />
                <MyList onPress={() => setSelected(true)} />
                <MyList onPress={() => setSelected(true)} />
                <MyList onPress={() => setSelected(true)} />
                <MyList onPress={() => setSelected(true)} />
                <MyList onPress={() => setSelected(true)} />
              </ScrollView>
            )}
          </View>
          {!lanjut && (
            <View style={s.btn}>
              <Button
                name="LANJUT"
                noRadius
                type="next"
                onPress={() => setLanjut(true)}
                opacity={0.9}
              />
            </View>
          )}
          {lanjut && selected && (
            <View style={s.btn}>
              <Button
                name="BAYAR SEKARANG"
                noRadius
                type="next"
                onPress={() => {
                  setLanjut(false);
                  setModalVisible(false);
                  navigation.navigate('ScreenPembayaran');
                }}
                opacity={0.9}
              />
            </View>
          )}
        </View> */}
        <WebView source={{uri: source}} />
      </Modal>
    </View>
  );
};

export default ModalDetailPembayaran;

const s = StyleSheet.create({
  order: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    elevation: 5,
  },
  txtOrder: {
    fontSize: 12,
    color: '#80807E',
    fontFamily: fonts.primary[600],
    lineHeight: 18,
  },
  //
  header: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  divider: {
    backgroundColor: '#c4c4c4',
    height: '100%',
    width: 1,
    marginHorizontal: 5,
  },
  HorizonalDivider: {
    backgroundColor: colors.border,
    width: '100%',
    height: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    flex: 1,
  },
  mySupir: {
    fontSize: 12,
    color: '#555555',
    textTransform: 'capitalize',
    fontFamily: fonts.primary[600],
  },
  rincian: {
    fontSize: 14,
    color: colors.text.primary,
    textTransform: 'capitalize',
    fontFamily: fonts.primary[700],
  },
  //
  container: {
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c4',
  },
  nominal: {
    flexDirection: 'row',
  },
  jum: {
    fontSize: 14,
    color: '#555555',
    textTransform: 'capitalize',
    fontFamily: fonts.primary[500],
  },
  rp: {
    fontSize: 16,
    color: '#555555',
    textTransform: 'capitalize',
    fontFamily: fonts.primary[500],
    paddingRight: 3,
  },
  amount: {
    fontSize: 30,
    color: colors.text.primary,
    textTransform: 'capitalize',
    fontFamily: fonts.primary[600],
    lineHeight: 38,
  },
  //
  view: {
    margin: 0,
  },
  centeredView: {
    flex: 1,
    paddingHorizontal: 20,
    borderRadius: 3,
    justifyContent: 'center',
  },
  modalView: {
    height: '75%',
    backgroundColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    elevation: 10,
  },
  modalTextTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
  },
  desc: {
    justifyContent: 'center',
    bottom: 0,
  },
});

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    height: 38,
    backgroundColor: colors.white,
  },
  text: (color) => ({
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: color,
    paddingTop: 10,
    paddingBottom: 6,
  }),
  subtop: {
    flex: 0.5,
    justifyContent: 'space-between',
  },
  detail: {
    marginHorizontal: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    elevation: 5,
  },
  detailCard: {
    marginHorizontal: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    elevation: 5,
  },
  listDetail: {
    paddingVertical: 20,
  },
  list1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 5,
    marginBottom: 10,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtProd: {
    fontSize: 10,
    color: '#80807E',
    fontFamily: fonts.primary[600],
    lineHeight: 16,
  },
  txtJum: {
    fontSize: 10,
    color: '#80807E',
    fontFamily: fonts.primary[600],
    lineHeight: 16,
  },
  txtKet: {
    fontSize: 13,
    color: '#555555',
    fontFamily: fonts.primary[400],
    lineHeight: 16,
  },
  txtAmount: {
    fontSize: 12,
    color: '#555555',
    fontFamily: fonts.primary[400],
    lineHeight: 16,
  },
  //
  listContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    padding: 10,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  image: {
    borderRadius: 10,
    marginRight: 16,
  },
  cardName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  cardDetail: {
    // backgroundColor: 'tomato',
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
  },
  cardDesk: {
    fontSize: 10,
    fontFamily: fonts.primary[100],
    color: colors.text.secondary,
  },
  //
  cvv: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cvvHelp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: 10,
  },
  txtLimit: {
    flex: 1,
    fontSize: 16,
    color: '#c4c4c4',
    fontFamily: 'Source Sans Pro',
  },
  sekat: {
    height: '100%',
    width: 1,
    backgroundColor: colors.border,
  },
  label: {
    fontSize: 12,
    color: colors.text.grey,
    fontFamily: fonts.primary[600],
  },
  email: {
    fontSize: 16,
    color: colors.text.darker,
    fontFamily: fonts.primary[600],
  },
});
