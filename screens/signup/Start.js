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
    <View
      style={{
        backgroundColor: Color.paleGreenBackground,
        flex: 1,
        alignItems: "center",
        paddingTop: "60%",
      }}
    >
      <Image
        style={{ width: 120, height: 120 }}
        source={require("../../assets/earth.png")}
      />
      <View style={{ marginTop: "2%" }}>
        <Text
          style={{ fontSize: 45, color: Color.titleBlue, fontFamily: "Roboto" }}
        >
          geo•journal
        </Text>
      </View>
      <View style={{ marginTop: "20%", width: "50%" }}>
        <LoginButton
          onPress={() => navigation.push("signup")}
          color="white"
          text="sign up"
          background={Color.signUpBlue}
        />
        <LoginButton
          onPress={() => navigation.push("signin")}
          color="#5d6143"
          text="sign in"
          background="#F6F5D4"
        />
      </View>
    </View>
  );
}
