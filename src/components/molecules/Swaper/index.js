import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {ILPic1, ILPic2} from '../../../assets';
import {colors} from '../../../utils/colors';
import {fonts} from '../../../utils/fonts';

const data = [
  {
    id: '1',
    title: ['Bingung mau cari supir?', 'yuk My Supir in aja!'],
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam metus enim, dignissim sit amet condimentum ut, fermentum ac magna.',
    image: ILPic1,
  },
  {
    id: '2',
    title: ['Punya mobil', 'tapi gapunya supir?'],
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam metus enim, dignissim sit amet condimentum ut, fermentum ac magna.',
    image: ILPic2,
  },
];

export default class Swapper extends React.Component {
  _renderItem = ({item}) => {
    return (
      <View
        style={{flex: 1, backgroundColor: colors.white, paddingHorizontal: 16}}>
        <SafeAreaView style={styles.slide}>
          <Text style={styles.title}>{item.title[0]}</Text>
          <Text style={styles.title}>{item.title[1]}</Text>
          <View style={styles.image}>
            <Image
              source={item.image}
              style={{width: '100%', height: '100%'}}
              resizeMode={'contain'}
            />
          </View>
          <Text style={styles.text}>{item.text}</Text>
        </SafeAreaView>
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Selanjutnya</Text>
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.replace('Wellcome')}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Selanjutnya</Text>
      </TouchableOpacity>
    );
  };

  _keyExtractor = (item) => item.id;

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          renderNextButton={this._renderNextButton}
          renderDoneButton={this._renderDoneButton}
          dotStyle={{
            backgroundColor: colors.dotInactive,
            width: 10,
            height: 10,
            borderRadius: 10 / 2,
          }}
          activeDotStyle={{
            backgroundColor: colors.primary,
            width: 56,
            height: 10,
          }}
          showDoneButton={true}
          showNextButton={true}
          data={data}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 160,
    marginVertical: 30,
    // backgroundColor: 'green',
  },
  title: {
    color: colors.text.primary,
    fontFamily: fonts.primary[700],
    textAlign: 'left',
    fontSize: 25,
  },
  text: {
    color: colors.text.primary,
    fontFamily: fonts.primary[400],
    marginTop: 50,
    textAlign: 'left',
    fontSize: 16,
    maxWidth: '60%',
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    fontSize: 14,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 13,
    fontFamily: fonts.primary[600],
    fontSize: 18,
  },
});
