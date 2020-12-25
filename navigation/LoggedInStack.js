import { createStackNavigator } from "@react-navigation/stack";
import { LoggedInStack } from "./navigation/LoggedInStack";
import {
    CardStyleInterpolators,
  } from '@react-navigation/stack';
import * as React from "react";

import MainScreen from "../screens/signup/Main";
import AccountScreen from "../screens/signup/Account";

const Stack = createStackNavigator();
export function LoggedInStack() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
        CardStyleInterpolators: CardStyleInterpolators.forVerticalIOS
      }}
    >
      <Stack.Screen name="main"
       component={MainScreen}
        />
      <Stack.Screen name="account"
       component={AccountScreen} 
      />
    </Stack.Navigator>
  );
}
