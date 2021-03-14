import React from "react";
import { useDispatch } from "react-redux";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "react-native-paper";

import { BottomTabStackParams } from "../navigation/BottomTabNavigator";
import ScreenContainer from "../components/ScreenContainer";
import DataForm, { FormValues } from "../components/DataForm";
import { addData } from "../reducers/dataSlice";

export default function SaveData({
  navigation,
}: StackScreenProps<BottomTabStackParams, "SaveData">) {
  const dispatch = useDispatch();

  const onSubmit = (formValues: FormValues) => {
    dispatch(addData(formValues));
    navigation.navigate("DataList");
  };

  return (
    <ScreenContainer title="Save Data" navigation={navigation}>
      <Button>Save Data to File</Button>
    </ScreenContainer>
  );
}
