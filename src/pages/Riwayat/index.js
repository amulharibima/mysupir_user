import React, {useState, useEffect} from 'react';
import {Header, Gap, Card} from '../../components';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';

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

const Riwayat = () => {
  const navigation = useNavigation();
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.get(
        'http://mysupir.com/api/order/ongoing',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (res) {
        console.log(res.data);
        setOrder(res.data.orders);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error, 'error');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const btnHistory = () => {
    navigation.navigate('PesananSelesai');
  };
  return (
    <>
      <Header
        history
        label="Pesanan Berjalan"
        onPress={() => navigation.goBack()}
        btnHistory={btnHistory}
        type="shadow"
      />
      <Gap height={10} />
      {!isLoading ? (
        <>
          <FlatList
            data={order}
            renderItem={({item}) => {
              return (
                <Card
                  type={`Base On ${item.type}`}
                  status={item.status}
                  waktu={moment(item.start_datetime).local(true).format('LLLL')}
                  location={item.start_location.name}
                  price={currencyFormat(item.transaction.total_price.split('.')[0])}
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{paddingBottom: 30}}
          />
        </>
      ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>Loading...</Text>
          </View>
      )}
    </>
  );
};

export default Riwayat;
