import React from "react";
import { View, Image, Text } from "react-native";
import { StartScreenStyle } from "../../constants/Style";
import LoginButton from "../../components/Buttons/loginButton";
import { register } from "../../api/auth";
import Color from "../../constants/Colors";
import { validate } from "validate.js";
import constraints from "../../utils/constraints";
import { showToast } from "../../utils/helpers";
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
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const onRegister = async () => {
    let data = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    const validationResult = validate(data, constraints, { format: "flat" });
    if (validationResult) {
      showToast(validationResult[0]);
    } else {
      register(email, password)
        .then((res) => navigation.push("signedin"))
        .catch((err) => showToast(err.error));
    }
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
          label="Password"
          theme={{ colors: { primary: "white" } }}
          style={{ marginVertical: "3%" }}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          label="Confirm Password"
          theme={{ colors: { primary: "white" } }}
          style={{ marginVertical: "3%" }}
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <View style={{ width: "50%", marginVertical: "10%" }}>
        <LoginButton
          onPress={onRegister}
          color="white"
          text="sign up"
          background={Color.signUpBlue}
        />
      </View>
    </View>
  );
}
