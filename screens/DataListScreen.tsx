import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";

import ScreenContainer from "../components/ScreenContainer";
import { BottomTabStackParams } from "../navigation/BottomTabNavigator";

export default function DataListScreen({
  navigation,
}: StackScreenProps<BottomTabStackParams, "DataList">) {
  return (
    <ScreenContainer
      title="Data List"
      navigation={navigation}
    ></ScreenContainer>
  );
}
