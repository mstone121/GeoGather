import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LinkingConfiguration from "./LinkingConfiguration";
import DataListNavigator from "./DataListNavigator";
import NotFoundScreen from "../screens/NotFoundScreen";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export type RootStackParams = {
  Root: undefined;
  NotFound: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Root" component={DataListNavigator} />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Not Found" }}
      />
    </RootStack.Navigator>
  );
}
