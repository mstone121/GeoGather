import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AddDataScreen from '../screens/AddDataScreen';
import DataListScreen from '../screens/DataListScreen';

const BottomTab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Data List">
      <BottomTab.Screen
        name="Add Data"
        component={AddDataScreen}
        options={{ tabBarIcon: ({ color }) => <TabBarIcon name="ios-add-sharp" color={color} /> }} />
      <BottomTab.Screen
        name="Data List"
        component={DataListScreen}
        options={{ tabBarIcon: ({ color }) => <TabBarIcon name="ios-list-sharp" color={color} /> }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
