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
export default function StartScreen({ navigation }) {
  return (

    <View style={{backgroundColor: "#BCBFA7", flex: 1, alignItems:"center", paddingTop: "60%"}}>
      <View>
      <Text style={{fontSize:40, color: "#F6F5D4", fontFamily: "Roboto"}}>Sign Up</Text>
      </View>
      <View style={{marginTop: "20%", width:"50%"}}>
      <LoginButton
          onPress={() => navigation.push("signup")}
          color="#5d6143"
          text="sign up"
          background="#F6F5D4"
        />
        <LoginButton
          onPress={() => navigation.push("signin")}
          color="white"
          text="sign in"
          background="#5d6143"
        />
        </View>
    </View>
  
  );
}
