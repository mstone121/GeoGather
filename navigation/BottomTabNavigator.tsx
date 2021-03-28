import React from "react";
import { useTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import AddDataScreen from "../screens/AddDataScreen";
import SaveDataScreen from "../screens/SaveDataScreen";
import DataListScreen from "../screens/DataListScreen";
import EditDataScreen from "../screens/EditDataScreen";

export type BottomTabStackParams = {
  AddData: undefined;
  DataList: undefined;
  SaveData: undefined;
};
const BottomTab = createMaterialBottomTabNavigator<BottomTabStackParams>();

export default function BottomTabNavigator() {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="DataList"
      barStyle={{ backgroundColor: theme.colors.primary }}
    >
      <BottomTab.Screen
        name="AddData"
        component={AddDataScreen}
        options={{
          title: "Add Data",
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => <TabBarIcon name="add" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="DataList"
        component={DataListNavigator}
        options={{
          title: "Data List",
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="SaveData"
        component={SaveDataScreen}
        options={{
          title: "Save Data",
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="save-alt" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={24} {...props} />;
}

export type DataListStackParams = {
  DataList: undefined;
  EditData: { id: string };
};

const DataList = createStackNavigator<DataListStackParams>();

function DataListNavigator() {
  const theme = useTheme();

  return (
    <DataList.Navigator
      initialRouteName="DataList"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "#fff",
      }}
    >
      <DataList.Screen
        name="DataList"
        component={DataListScreen}
        options={{ title: "Data List" }}
      />
      <DataList.Screen
        name="EditData"
        component={EditDataScreen}
        options={{ title: "Edit Data" }}
      />
    </DataList.Navigator>
  );
}
