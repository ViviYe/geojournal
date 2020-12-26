import React from "react";
import { View, Image, Text, SafeAreaView } from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { Avatar } from 'react-native-elements';

//path to logo
//the shade of white we are using
const WHITE = "white";

/**
 * Start screen component
 */
export default function Main({ navigation }) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#BCBFA7",
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
            onPress={()=> console.log("modal")}
          />
     </View>
      <View style={{alignItems: "center"}}>
        <Text style={{ fontSize: 40, color: "#F6F5D4", fontFamily: "Roboto" }}>
          Map
        </Text>
      </View>
    </SafeAreaView>
  );
}
