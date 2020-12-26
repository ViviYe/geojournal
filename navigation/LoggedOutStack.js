import { createStackNavigator } from "@react-navigation/stack";
import { LoggedInStack } from "./LoggedInStack";
import * as React from "react";

import startScreen from "../screens/signup/Start";
import SignIn from "../screens/signup/Signin";
import SignUp from "../screens/signup/Signup";

const Stack = createStackNavigator();
export function LoggedOutStack() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="start" component={startScreen} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="signedin" component={LoggedInStack} />


    </Stack.Navigator>
  );
}
