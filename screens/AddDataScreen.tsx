import * as React from "react";
import { useDispatch } from "react-redux";
import { StackScreenProps } from "@react-navigation/stack";

import { BottomTabStackParams } from "../navigation/BottomTabNavigator";
import ScreenContainer from "../components/ScreenContainer";
import DataForm, { FormValues } from "../components/DataForm";
import { addData } from "../reducers/dataSlice";

export default function AddDataScreen({
  navigation,
}: StackScreenProps<BottomTabStackParams, "AddData">) {
  const dispatch = useDispatch();

  const onSubmit = (formValues: FormValues) => {
    dispatch(addData(formValues));
    navigation.navigate("DataList");
  };

  return (
    <ScreenContainer title="Add Data" navigation={navigation}>
      <DataForm onSubmit={onSubmit} />
    </ScreenContainer>
  );
}
