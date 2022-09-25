import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from '../../components';
import {useNavigation} from '@react-navigation/native';

const Foto = ({route}) => {
  const navigation = useNavigation();
  const {foto, id} = route.params;
  console.log(foto, id);

  return (
    <View style={styles.page}>
      <Header label="Foto" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.imgContainer(foto)}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 34,
              fontWeight: 'bold',
              textAlign: 'center',
              maxWidth: 250,
              alignSelf: 'center',
            }}>
            This an Dummy Landpage for Detail Foto
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Foto;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: (color) => ({
    height: 244,
    width: 320,
    borderRadius: 10,
    backgroundColor: color,
  }),
});
