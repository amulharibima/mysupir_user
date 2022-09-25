import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, Gap, Card} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import moment from 'moment';
import {FlatList} from 'react-native-gesture-handler';

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

const RiwayatOrder = () => {
  const navigation = useNavigation();
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.get(
        'http://mysupir.com/api/order/history',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (res) {
        let tmp_orders = res.data.orders;

        tmp_orders = tmp_orders.filter(v => {
          return v.status !== 'sedang berjalan'
        });

        setOrder(tmp_orders);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header
        label="Riwayat Order"
        onPress={() => navigation.goBack()}
        type="shadow"
      />
      <Gap height={10} />
      {!isLoading ? (
        <FlatList
          data={order}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <Card
              type={item.type}
              status={item.status}
              waktu={moment(item.created_at).format('LLLL')}
              location={item.start_location.name}
              price={currencyFormat(item.transaction.total_price)}
              onPress={() =>
                navigation.navigate('DetailRiwayat', {
                  id: item.id,
                  status: item.status,
                })
              }
            />
          )}
          contentContainerStyle={{
            paddingBottom: 30,
            paddingTop: 20,
          }}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      )}
    </>
  );
};

export default RiwayatOrder;

const styles = StyleSheet.create({});
