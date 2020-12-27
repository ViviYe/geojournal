import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoggedOutStack } from "./navigation/LoggedOutStack";
import { LoggedInStack } from "./navigation/LoggedInStack";
import { StartScreen } from "./screens/signup/Start";
import { isSignedIn } from "./api/auth"
import useCachedResources from "./hooks/useCachedResources";

export default function App() {
  const [checkedSignIn, setChecked] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);
  const isLoadingComplete = useCachedResources();

  /** If user token is present, go directly to Logged in view */
  React.useEffect(() => {
    isSignedIn()
      .then((res) => {
        setChecked(true);
        setSignedIn(res);
      })
      .catch((err) => alert("An error occurred"));
  }, []);

  if (!isLoadingComplete || !checkedSignIn) {
    return null;
  } else {
    return <NavigationContainer>
      {signedIn ? <LoggedInStack /> : <LoggedOutStack />}
      </NavigationContainer>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
