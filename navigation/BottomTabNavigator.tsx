import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import AddDataScreen from "../screens/AddDataScreen";
import DataListScreen from "../screens/DataListScreen";
import EditDataScreen from "../screens/EditDataScreen";

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
        component={DataListNavigator}
        options={{
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

export type DataListStackParams = {
  DataList: undefined;
  EditData: { id: string };
};

const DataList = createStackNavigator<DataListStackParams>();

function DataListNavigator() {
  return (
    <DataList.Navigator initialRouteName="DataList" headerMode="none">
      <DataList.Screen
        name="DataList"
        component={DataListScreen}
        options={{ title: "Data List" }}
      />
      <DataList.Screen
        name="EditData"
        component={EditDataScreen}
        initialParams={{ id: undefined }}
        options={{ title: "Edit Data" }}
      />
    </DataList.Navigator>
  );
}
