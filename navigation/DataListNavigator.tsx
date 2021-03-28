import React from "react";
import { useTheme } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";
import EditDataScreen from "../screens/EditDataScreen";

export type DataListStackParams = {
  DataListTabs: undefined;
  EditData: { id: string };
};

const DataList = createStackNavigator<DataListStackParams>();

export default function DataListNavigator() {
  const theme = useTheme();

  return (
    <DataList.Navigator
      initialRouteName="DataListTabs"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "#fff",
      }}
    >
      <DataList.Screen
        name="DataListTabs"
        component={BottomTabNavigator}
        options={{ title: "Data List", headerShown: false }}
      />
      <DataList.Screen
        name="EditData"
        component={EditDataScreen}
        options={{ title: "Edit Data" }}
      />
    </DataList.Navigator>
  );
}
