import * as React from "react";
import { useSelector } from "react-redux";
import { StackScreenProps } from "@react-navigation/stack";
import { List } from "react-native-paper";

import { DataListStackParams } from "../navigation/BottomTabNavigator";
import { RootState } from "../reducers";
import { Data } from "../reducers/dataSlice";
import ScreenContainer from "../components/ScreenContainer";

export default function DataListScreen({
  navigation,
}: StackScreenProps<DataListStackParams, "DataList">) {
  const dataList = useSelector((state: RootState) => state.data);

  const editItem = (id: string) => navigation.navigate("EditData", { id });

  return (
    <ScreenContainer title="Data List" navigation={navigation}>
      <List.Section>
        {dataList.map((data: Data) => (
          <DataListItem key={data.id} data={data} editItem={editItem} />
        ))}
      </List.Section>
    </ScreenContainer>
  );
}

function DataListItem({
  data,
  editItem,
}: {
  data: Data;
  editItem: (id: string) => void;
}) {
  return (
    <List.Accordion
      title={new Date(data.createdAt).toString()}
      style={{ paddingLeft: 8 }}
    >
      <List.Item
        title="Location"
        description={
          data.formValues.location
            ? `${data.formValues.location?.lat}, ${data.formValues.location?.long}`
            : ""
        }
      />
      <List.Item title="Bores" description={data.formValues.bores ?? "(n/a)"} />
      <List.Item
        title="Canopy Condition"
        description={data.formValues.canopyCondition ?? "(n/a)"}
      />
      <List.Item
        title="Bark Condition"
        description={data.formValues.barkCondition ?? "(n/a)"}
      />
      <List.Item
        title="Location Type"
        description={data.formValues.locationType ?? "(n/a)"}
      />
      <List.Item title="Notes" description={data.formValues.notes ?? "(n/a)"} />
      <List.Item title="Edit" onPress={() => editItem(data.id)} />
    </List.Accordion>
  );
}
