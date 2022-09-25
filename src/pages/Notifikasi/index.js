import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Header, Gap} from '../../components';
import {colors, fonts} from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

const Notifikasi = ({navigation}) => {
  const [data, setData] = useState();
  const isFocused = useIsFocused();

  const getNotif = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.get(
        'http://mysupir.com/api/notification/all',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (res) {
        // console.log(res.data);
        setData(res.data.notifications);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getNotif();
  }, [isFocused]);

  // let items = [
  //   {
  //     id: 'njsdk',
  //     judul: 'Refund Dana',
  //     ket: 'Halo Jane yuk ke kantor untuk menyesatkan orang.',
  //   },
  //   {
  //     id: 'dsdjc',
  //     judul: 'Laporan Kerusakan',
  //     ket: 'Halo Jane, kami akan review laporan kamu. Terimakasih.',
  //   },
  //   {
  //     id: 'asdfs',
  //     judul: 'Beri Bintang',
  //     ket: 'Halo Jane, jangan lupa kasih bintang ke supir-mu tadi.',
  //   },
  // ];
  //   let inisial = judul.charAt(0);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('DetailPanic', {data: item});
        }}
        style={s.card}
        key={item.id}>
        <View style={s.initialContainer}>
          <Text style={s.initial}>{item.data.title.charAt(0)}</Text>
        </View>
        <View style={s.desc}>
          <Text style={s.title}>{item.data.title}</Text>
          <Text ellipsizeMode="tail" numberOfLines={1} style={s.text}>
            {item.data.body}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={s.page}>
      <Header
        label="Notifikasi"
        onPress={() => navigation.goBack()}
        type="shadow"
      />
      <Gap height={10} />
      <View style={s.container}>
        {data !== undefined ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator
              size={'large'}
              color={'black'}
              style={{flex: 1, alignSelf: 'center'}}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Notifikasi;

const s = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    paddingHorizontal: 27,
  },
  card: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginVertical: 5,
  },
  initialContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  initial: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: fonts.primary[600],
    color: colors.white,
  },
  desc: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fonts.primary[600],
    color: '#292929',
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: fonts.primary[400],
    color: '#898989',
  },
});
