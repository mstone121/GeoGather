import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackScreenProps } from "@react-navigation/stack";

import { DataListStackParams } from "../navigation/BottomTabNavigator";
import { RootState } from "../reducers";
import { Data, updateData } from "../reducers/dataSlice";
import DataForm, { FormValues } from "../components/DataForm";

export default function EditDataScreen({
  id,
  navigation,
}: StackScreenProps<DataListStackParams, "EditData">) {
  const dispatch = useDispatch();

  const formValues = useSelector(
    (state: RootState) =>
      state.data.find((data: Data) => data.id === id)?.formValues
  );

  const onSubmit = (formValues: FormValues) => {
    dispatch(updateData({ id, formValues }));
    navigation.navigate("DataList");
  };

  return (
    <View>
      <DataForm onSubmit={onSubmit} formValues={formValues} />
    </View>
  );
}
