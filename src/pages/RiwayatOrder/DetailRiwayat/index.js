import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Header, Gap} from '../../../components';
import {IcStarBig, DummyProfile, IcStarSm} from '../../../assets';
import {fonts, colors} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import moment from 'moment';
import StarRating from 'react-native-star-rating';
import { useSelector } from 'react-redux';

const currencyFormat = (num) => {
  let number_string = num.toString(),
    sisa = number_string.length % 3,
    rupiah = number_string.substr(0, sisa),
    ribuan = number_string.substr(sisa).match(/\d{3}/g);
  let separator;

  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }
  return rupiah;
};

const DetailRiwayat = ({route}) => {
  const navigation = useNavigation();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const id = route.params.id;
  const status = route.params.status;
  const en = useSelector((state) => state.language.english);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.get(
        `http://mysupir.com/api/order/detail/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (res) {
        console.log(res.data);
        console.log(res.data.order.rating);
        setOrder(res.data.order);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <Header
        label="Detail Riwayat Order"
        onPress={() => navigation.goBack()}
        type="shadow"
      />
      {!isLoading ? (
        <>
          {order !== null && (
            <View style={s.page}>
              <View style={s.container}>
                <Text style={s.title}>Based On {order.type}</Text>
                <View style={s.star}>
                  <StarRating
                    disabled={true}
                    rating={
                      order.rating === null || order.rating === undefined
                        ? 0
                        : order.rating.rating
                    }
                    starSize={20}
                    emptyStarColor={'#999b84'}
                    fullStarColor={'#fdb827'}
                    halfStar={'#fdb827'}
                  />
                </View>
                <Text style={s.subTitle}>{en ? 'Your Driver' : 'Pengemudi anda'}</Text>
                <View style={s.driver}>
                  <View style={s.imgContainer}>
                    <Image
                      source={{
                        uri:
                          'http://mysupir.com/get_image?img_path=' +
                          order.driver.foto,
                      }}
                      style={{width: 50, height: 50, borderRadius: 50}}
                    />
                  </View>
                  <View>
                    <Text style={s.name}>{order.driver.name}</Text>
                    <Text style={s.desc}>
                      {order.driver.finished_orders.length} Drive Completed
                    </Text>
                    <Text style={s.id}>
                      {order.driver.licenses[0].name.toUpperCase()}
                    </Text>
                  </View>
                  <View style={s.rated}>
                    <View style={s.rate}>
                      <Text style={s.point}>
                        {order.rating === null || order.rating === undefined ? 0 : order.rating.rating}.0
                      </Text>
                      <IcStarSm />
                    </View>
                  </View>
                </View>
              </View>
              <Gap height={15} color={'#EDEDED'} />
              <View style={s.container}>
                <Text style={s.subTitle}>{en ? 'Trip Route' : 'Rute perjalanan'}</Text>
                <Text style={s.txtKet}>{en ? 'Start Time' : 'Tanggal Mulai'}</Text>
                <Text style={s.txtDesc1}>
                  {moment(order.start_location.created_at).format('LLLL')}
                </Text>
                {status == 'selesai' ? (
                  <>
                    <Text style={s.txtKet}>{en ? 'Finish Time' : 'Tanggal Selesai'}</Text>
                    <Text style={s.txtDesc1}>
                      {moment(order.finish_location.created_at).format('LLLL')}
                    </Text>
                  </>
                ) : (
                  <View>
                    <Text>{en ? 'Order is still in process' : 'Order masih dalam proses'}</Text>
                  </View>
                )}
              </View>
              <Gap height={15} color={'#EDEDED'} />
              <View style={s.container}>
                <Text style={s.subTitle}>{en ? 'Trip Price' : 'Tarif perjalanan'}</Text>
                <View style={s.trf}>
                  <Text style={s.txtTrf}>
                    {order.transaction.details[0].name}
                  </Text>
                  <Text style={s.txtPrice}>
                    Rp.{currencyFormat(order.transaction.details[0].price)}
                  </Text>
                </View>
                <View style={s.tot}>
                  <Text style={s.txtTot}>{en ? 'Total Price' : 'Total Tarif'}</Text>
                  <Text style={s.totPrice}>
                    Rp.
                    {currencyFormat(
                      order.transaction.total_price.split('.')[0],
                    )}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.push('LaporKerusakan', {id: id, status: status})}
        style={s.btn}>
        <Text style={s.btnTxt}>{en ? 'Report' : 'Laporkan Kerusakan'}</Text>
      </TouchableOpacity>
    </>
  );
};

export default DetailRiwayat;

const s = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary[700],
    lineHeight: 23,
    color: colors.text.primary,
  },
  star: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    lineHeight: 18,
    color: colors.text.primary,
    paddingVertical: 5,
  },
  driver: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  imgContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 10,
  },
  rated: {
    flexDirection: 'row',
    paddingLeft: 15,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[700],
    lineHeight: 20,
    color: colors.text.primary,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    lineHeight: 20,
    color: '#8d8d8d',
  },
  id: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    lineHeight: 15,
    backgroundColor: '#eaeaea',
    padding: 4,
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  point: {
    fontSize: 16,
    fontFamily: fonts.primary[900],
    lineHeight: 20,
    color: '#7d7d7d',
    paddingHorizontal: 5,
  },
  rate: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  txtKet: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: '#7C7C7C',
    lineHeight: 15,
    paddingTop: 10,
  },
  txtDesc1: {
    fontSize: 10,
    fontFamily: fonts.primary[600],
    color: '#303030',
    lineHeight: 15,
  },
  trf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#F1F3F6',
    paddingBottom: 10,
  },
  txtTrf: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: '#80807E',
    lineHeight: 15,
    paddingTop: 10,
  },
  txtPrice: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: '#80807E',
    lineHeight: 18,
    paddingTop: 10,
  },
  tot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  txtTot: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: '#80807E',
    lineHeight: 15,
    paddingTop: 10,
  },
  totPrice: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: '#80807E',
    lineHeight: 18,
    paddingTop: 10,
  },
  btn: {
    alignSelf: 'center',
    bottom: 50,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
  btnTxt: {
    textDecorationLine: 'underline',
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
