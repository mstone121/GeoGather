import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AddDataScreen from '../screens/AddDataScreen';
import DataListScreen from '../screens/DataListScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Data List"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Add Data"
        component={AddDataScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-add-sharp" color={color} />
        }} />
      <BottomTab.Screen
        name="Data List"
        component={DataListScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-list-sharp" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
