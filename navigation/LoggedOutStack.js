import { createStackNavigator } from "@react-navigation/stack";

import * as React from "react";

import startScreen from "../screens/signup/Start.js";


const Stack = createStackNavigator();
export function LoggedOutStack() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="start" component={startScreen} />
    </Stack.Navigator>
  );
}
