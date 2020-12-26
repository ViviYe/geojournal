import React from "react";
import { View, Image, Text, StyleSheet,SafeAreaView, Dimensions } from "react-native";
import MapView from 'react-native-maps';
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar } from 'react-native-elements';

//path to logo
//the shade of white we are using
const WHITE = "white";

export default function Main({navigation}) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#BCBFA750",
        flex: 1,
      }}
    >
    <View style={{height: "20%", justifyContent:'center', paddingHorizontal:'5%', flexDirection:"row"}}>
    <Avatar
            size="large"
            rounded
            icon={{name: 'user', type: 'font-awesome'}}
            onPress={()=> navigation.push("account")}
          />
    <View style={{width: '60%'}}/>
    <Avatar
            size="large"
            rounded
            icon={{name: 'book', type: 'font-awesome'}}
            onPress={()=> navigation.push("account")}
          />
     </View>

     <MapView style={styles.map} 
      showsUserLocation
      showsBuildings/>
    </SafeAreaView>
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
    height: 1000,//Dimensions.get('screen').height,
  },
});
