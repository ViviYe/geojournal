import React from "react";
import { View, Image, Text, StyleSheet,SafeAreaView, Dimensions } from "react-native";
import MapView from 'react-native-maps';
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar, Icon } from 'react-native-elements';

//path to logo
//the shade of white we are using
const WHITE = "white";

export default function Main({navigation}) {
  return (

    <View
      style={{
        backgroundColor: "#BCBFA750",
        height:'100%'
      }}
    >
    <View style={{position:'absolute', zIndex: 100, width:'80%', alignSelf:'center', bottom: 40, left: 290}}>
     <Icon
            raised
            name='edit'
            color="grey"
            onPress={()=> console.log("modal")}  
          />
    </View>


    <View style={{position: 'absolute', justifyContent:'center', paddingHorizontal:'5%', flexDirection:"row", zIndex: 100, paddingVertical: 30}}>
    <Avatar
            size="large"
            rounded
            icon={{name: 'user', color: "grey", type: 'font-awesome'}}
            onPress={()=> navigation.push("account")}
          />
    <View style={{width: '60%'}}/>
    <Avatar
            size="large"
            rounded
            icon={{name: 'book', color: "grey", type: 'font-awesome'}}
            onPress={()=> console.log("modal")}
          />
     </View>

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
    height: 1000,//Dimensions.get('screen').height,
  },
});
