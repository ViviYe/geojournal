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
export default function StartScreen({ navigation }) {
  return (

    <SafeAreaView style={{backgroundColor: "#BCBFA7", flex: 1}}>
      <View style={{alignItems:"center"}}>
      <Avatar
            size="large"
            rounded
            source={{
              uri: "https://placekitten.com/200/300",
            }}
          />
        <Text style={{alignItems:"center"}}>Name Placeholder</Text>
      </View>

      
    </SafeAreaView>
  
  );
}
