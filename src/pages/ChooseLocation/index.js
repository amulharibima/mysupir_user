import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Header, Gap} from '../../components';
import {colors} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBqHYPUOXnXhE9CcUOgua9Ru6cv-IBWAB8';

const Lokasimu = ({navigation, route}) => {
  const [desc, setDesc] = useState('');
  const [coord, setCoord] = useState(null);
  const dispatch = useDispatch();

  return (
    <View style={styles.page}>
      <Header
        label={`Pilih ${route.params.title ? route.params.title : 'lokasi'}mu`}
        onPress={() => navigation.goBack()}
      />
      <Gap height={15} />

      <View style={styles.containerPage}>
        <GooglePlacesAutocomplete
          // listViewDisplayed={true}
          placeholder={
            route.params.title ? `Pilih ${route.params.title}mu` : 'Pilih lokasimu'
          }
          minLength={2}
          // GooglePlacesDetailsQuery={{fields: 'geometry'}}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'id', // 'en' language of the results
            // types: 'geocode',
          }}
          onPress={(data, details = null) => {
            console.log('ini details', data.description);
            // coord.push(details.geometry.location);
            setDesc(data.description);
            setCoord(details.geometry.location);
            if (route.params.type === 'start') {
              dispatch({
                type: 'SET_START',
                payload: {
                  coord: details.geometry.location,
                  desc: data.description,
                },
              });
            }
            if (['trip1', 'finish'].includes(route.params.type)) {
              dispatch({
                type: 'SET_TRIP1',
                payload: {
                  coord: details.geometry.location,
                  desc: data.description,
                },
              });

              dispatch({
                type: 'SET_FINISH',
                payload: {
                  coord: details.geometry.location,
                  desc: data.description,
                },
              });
            }
            if (route.params.type === 'trip2') {
              dispatch({
                type: 'SET_TRIP2',
                payload: {
                  coord: details.geometry.location,
                  desc: data.description,
                },
              });
            }
            console.log(details.geometry.location, data.description);

            navigation.goBack();
          }}
          fetchDetails={true}
          onFail={(error) => console.error(error)}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          autoFocus={true}
          // requestUrl={{
          //   url:
          //     'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          //   useOnPlatform: 'web',
          // }}
          styles={{
            container: {
              zIndex: 10,
              borderRadius: 10,
              width: '100%',
              backgroundColor: 'white',
            },
            textInputContainer: {
              width: '100%',
              padding: 5,
              borderRadius: 10,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: colors.border,
            },
            textInput: {
              borderRadius: 10,
              marginLeft: 0,
              marginRight: 0,
              height: '100%',
              width: '100%',
              color: '#5d5d5d',
              fontSize: 16,
              marginTop: -0.5,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            poweredContainer: {
              height: 0,
            },
            // powered: {
            //   backgroundColor: 'blue',
            //   height: 0,
            // },
            listView: {
              backgroundColor: 'white',
              width: '100%',
              marginTop: 20,
              //   position: 'absolute',
            },
            separator: {
              height: 5,
              backgroundColor: '#f5f5f5',
            },
          }}
        />
      </View>
      <Gap height={10} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerPage: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  verdivider: {
    backgroundColor: '#cecece',
    height: '80%',
    width: 1,
  },
  subtop: {
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 20,
    position: 'relative',
  },
  divider: {
    backgroundColor: '#EDEDED',
    height: 24,
  },
  page: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  btn: {
    paddingHorizontal: 20,
    bottom: 50,
    width: '100%',
  },
  bottom: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
  },
});

export default Lokasimu;
