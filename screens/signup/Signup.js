import React from "react";
import { View, Image, Text } from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";

import { TextInput } from "react-native-paper";

//path to logo
//the shade of white we are using
const WHITE = "white";

/**
 * Start screen component
 */
export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <View
      style={{
        backgroundColor: Color.paleGreenBackground,
        flex: 1,
        alignItems: "center",
        paddingTop: "40%",
      }}
    >
      <Text
        style={{ fontSize: 40, color: Color.titleBlue, fontFamily: "Roboto" }}
      >
        Sign Up
      </Text>
      <View style={{ width: "80%", marginTop: 30 }}>
        <TextInput
          style={{ marginVertical: "3%" }}
          label="Email"
          theme={{ colors: { primary: "white" } }}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{ marginVertical: "3%" }}
          label="Username"
          theme={{ colors: { primary: "white" } }}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Password"
          theme={{ colors: { primary: "white" } }}
          style={{ marginVertical: "3%" }}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          label="Confirm Password"
          theme={{ colors: { primary: "white" } }}
          style={{ marginVertical: "3%" }}
          secureTextEntry
        />
      </View>
      <View style={{ width: "50%", marginVertical: "10%" }}>
        <LoginButton
          onPress={() => navigation.push("signin")}
          color="white"
          text="sign up"
          background={Color.signUpBlue}
        />
      </View>
    </View>
  );
}
