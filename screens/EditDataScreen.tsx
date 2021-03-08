import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StackScreenProps } from "@react-navigation/stack";

import { DataListStackParams } from "../navigation/BottomTabNavigator";
import ScreenContainer from "../components/ScreenContainer";
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
    <ScreenContainer title="Update Data" navigation={navigation}>
      <DataForm onSubmit={onSubmit} formValues={formValues} />
    </ScreenContainer>
  );
}
