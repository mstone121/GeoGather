import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AddDataScreen from "../screens/AddDataScreen";
import DataListScreen from "../screens/DataListScreen";

export type BottomTabStackParams = {
  AddData: undefined;
  DataList: undefined;
};
const BottomTab = createMaterialBottomTabNavigator<BottomTabStackParams>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="DataList">
      <BottomTab.Screen
        name="AddData"
        component={AddDataScreen}
        options={{
          title: "Add Data",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-add-sharp" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="DataList"
        component={DataListScreen}
        options={{
          title: "Data List",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-list-sharp" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
