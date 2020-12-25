import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import MapView from 'react-native-maps';

//path to logo
//the shade of white we are using
const WHITE = "white";

export default function Main({navigation}) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      showsUserLocation
      showsBuildings/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
