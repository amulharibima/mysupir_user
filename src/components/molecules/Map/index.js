import React, {useContext} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';

const Map = () => {
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -6.21687,
          longitude: 106.597245,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={{
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {/* <Polyline coordinates={points} /> */}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});
