import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-paper";

import { RootStackParams } from "../navigation";
import ScreenContainer from "../components/ScreenContainer";

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<RootStackParams, "NotFound">) {
  return (
    <ScreenContainer title="Not found" navigation={navigation}>
      <Button onPress={() => navigation.replace("Root")}>
        Go to home screen!
      </Button>
    </ScreenContainer>
  );
}
