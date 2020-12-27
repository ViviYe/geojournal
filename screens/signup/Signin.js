import React from "react";
import { View, Image, Text } from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import Color from "../../constants/Colors";
import { login } from "../../api/auth"
import { TextInput } from "react-native-paper";

//path to logo
//the shade of white we are using
const WHITE = "white";

/**
 * Start screen component
 */
export default function SignIn({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onLogin = async () => {
      login(email, password).then(res => navigation.push("signedin"))
      .catch(err=> 
        showToast(err.error));
  };

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
        Sign In
      </Text>
      <View style={{ width: "80%", marginTop: 30 }}>
        <TextInput
          style={{ marginVertical: "3%" }}
          label="Email"
          theme={{ colors: { primary: "grey" } }}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Password"
          theme={{ colors: { primary: "grey" } }}
          style={{ marginVertical: "3%" }}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={{ width: "50%", marginVertical: "10%" }}>
        <LoginButton
          onPress={onLogin}
          color="white"
          text="sign in"
          background="#5d6143"
        />
      </View>
    </View>
  );
}
