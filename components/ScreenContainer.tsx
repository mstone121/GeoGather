import React from "react";
import { View } from "react-native";
import { Appbar, Divider } from "react-native-paper";
import { ParamListBase } from "@react-navigation/routers";
import { StackNavigationProp } from "@react-navigation/stack";

type ScreenContainerProps = {
  title: string;
  navigation: StackNavigationProp<ParamListBase>;
  children?: React.ReactElement | Array<React.ReactElement>;
  noBack?: boolean;
};

export default function ScreenContainer({
  title,
  children,
  navigation,
  noBack,
}: ScreenContainerProps) {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        {!noBack && navigation.canGoBack() && (
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
        <Appbar.Content title={title} />
      </Appbar.Header>
      <Divider />
      {children}
    </View>
  );
}
