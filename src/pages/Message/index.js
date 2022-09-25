import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {ChatItem, Header, Gap, InputChat} from '../../components';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {colors} from '../../utils';
import {DummyProfile} from '../../assets';
import Pusher from 'pusher-js/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Echo from 'laravel-echo';
import Axios from 'axios';
import moment from 'moment';
import {useSelector} from 'react-redux';

let chatVar = [];

const LiveMessages = ({route}) => {
  const [chatContent, setChatContent] = useState('');
  const navigation = useNavigation();
  const order = useSelector((state) => state.order);
  const id = route.params.id;
  const user_id = useSelector((state) => state.TripReducer.user_id);
  const [data, setData] = useState();
  const isFocused = useIsFocused();

  // const chatSend = (value) => {
  //   alert('chat send.!');
  // };

  const handleCallback = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.get(
        `http://mysupir.com/api/chat/conversation/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (res) {
        console.log(res.data.messages.data);
        setData(res.data.messages.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const messaging = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);

      const pusher = new Pusher('b18ddeb2c00212231da7', {
        authEndpoint: 'http://mysupir.com/broadcasting/auth',
        auth: {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
        cluster: 'ap1',
      });
      const echo = new Echo({
        broadcaster: 'pusher',
        client: pusher,
      });
      echo
        .private(`mc-chat-conversation.${id}`)
        .listen('.Musonza\\Chat\\Eventing\\MessageWasSent', handleCallback);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const onMessageChange = (val) => {
    setChatContent(val);
  };

  useEffect(() => {
    messaging();
  }, []);

  useEffect(() => {
    handleCallback();
  }, [isFocused]);

  const chatSend = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await Axios.post(
        `http://mysupir.com/api/chat/message/${id}`,
        {
          text: chatContent,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (res !== null) {
        console.log(res.data);
        // chatVar.push({
        //   id: 0,
        //   message: chatContent,
        //   type: 'SEND',
        //   time: '9:41',
        // });
        setChatContent('');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderItem = ({item}) => (
    <View
      style={[
        styles.chatBox,
        {
          backgroundColor: item.sender.id === user_id ? '#17273F' : '#FFFFFF',
          alignSelf: item.sender.id === user_id ? 'flex-end' : 'flex-start',
        },
      ]}>
      <Text
        style={[
          styles.chatTxt,
          {color: item.sender.id === user_id ? '#FFFFFF' : '#17273F'},
        ]}>
        {item.body}
      </Text>
      <Text
        style={[
          styles.chatTime,
          {color: item.sender.id === user_id ? '#FFFFFF' : '#17273F'},
        ]}>
        {moment(item.created_at).format('LL')}
      </Text>
    </View>
  );

  return (
    <View style={styles.page}>
      <Header
        photo={{uri: order.driver_pict}}
        name={order.driver_name}
        type="shadow-profile"
        label={order.driver_name}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Gap height={3} />
        {data !== undefined && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
      <View style={styles.iptChat}>
        <InputChat
          value={chatContent}
          onChangeText={(value) => setChatContent(value)}
          onButtonPress={chatSend}
        />
      </View>
    </View>
  );
};

export default LiveMessages;

const styles = StyleSheet.create({
  page: {flex: 1},
  content: {flex: 1},
  chatDate: {
    fontSize: 11,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingVertical: 20,
  },
  iptChat: {
    backgroundColor: colors.white,
  },
  chatBox: {
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 6,
    maxWidth: '70%',
  },
  chatTxt: {
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
    marginTop: 12,
    marginLeft: 15,
    textAlign: 'left',
    marginRight: 32,
  },
  chatTime: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '300',
    textAlign: 'right',
    marginHorizontal: 12,
    marginBottom: 6,
  },
});
