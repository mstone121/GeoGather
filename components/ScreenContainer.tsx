import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Divider } from "react-native-paper";
import { ParamListBase } from '@react-navigation/routers';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenContainerProps = {
  title: string;
  navigation: StackNavigationProp<ParamListBase>
  children?: React.ReactElement;
};

export default function ScreenContainer({ title, children, navigation }: ScreenContainerProps) {
  return (
    <View>
      <Appbar.Header>
        {navigation.canGoBack() && <Appbar.BackAction onPress={() => { navigation.goBack() }} />}
        <Appbar.Content title={title} />
      </Appbar.Header>
      <Divider />
      {children}
    </View>
  );
}
