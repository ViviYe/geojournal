import React from "react";
import { View, Image, Text } from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";

//path to logo
//the shade of white we are using
const WHITE = "white";

/**
 * Start screen component
 */
export default function SignUp({ navigation }) {
  return (
    <View style={{backgroundColor: "#BCBFA7", flex: 1, padding: 20, alignItems:"center", paddingTop: "60%"}}>
      
      <Text style={{fontSize:40, color: "#F6F5D4", fontFamily: "Roboto"}}>This is the sign in page</Text>
    
    </View>
  );
}
