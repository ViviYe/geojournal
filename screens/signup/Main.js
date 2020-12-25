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
export default function Main({ navigation }) {
  return (
    <View
      style={{
        backgroundColor: "#BCBFA7",
        flex: 1,
        alignItems: "center",
        paddingTop: "60%",
      }}
    >
      <View>
        <Text style={{ fontSize: 40, color: "#F6F5D4", fontFamily: "Roboto" }}>
          Main page
        </Text>
      </View>
    </View>
  );
}
