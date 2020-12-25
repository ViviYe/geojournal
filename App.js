import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoggedOutStack } from "./navigation/LoggedOutStack";
import { LoggedInStack } from "./navigation/LoggedInStack";
import { StartScreen } from "./screens/signup/Start";
import useCachedResources from "./hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return <NavigationContainer>
      {<LoggedInStack />}
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
