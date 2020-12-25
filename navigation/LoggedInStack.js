import { createStackNavigator } from "@react-navigation/stack";

import * as React from "react";

import MainScreen from "../screens/signup/Main";

const Stack = createStackNavigator();
export function LoggedInStack() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="main" component={MainScreen} />
    </Stack.Navigator>
  );
}
