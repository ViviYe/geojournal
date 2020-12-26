import React from "react";
import { View, Image, Text, SafeAreaView, ScrollView } from "react-native";
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
export default function StartScreen({ navigation }) {
  return (

    <ScrollView style={{backgroundColor: "#BCBFA7", flex: 1}}>
      <View style={{alignItems:"center", marginTop:'3%'}}>
      <Avatar
            size="large"
            rounded
            source={{
              uri: "https://placekitten.com/200/300",
            }}
          />
        <Text style={{ fontSize: 20, color: "#F6F5D4", fontFamily: "Roboto", marginVertical:'5%' }}>Name Placeholder</Text>
      </View>
      <View style={{backgroundColor}}>

      </View>
      
    </ScrollView>
  
  );
}
