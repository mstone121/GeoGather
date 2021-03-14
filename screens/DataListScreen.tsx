import React, { useCallback } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Card, List } from "react-native-paper";

import { DataListStackParams } from "../navigation/BottomTabNavigator";
import { RootState } from "../reducers";
import { Data } from "../reducers/dataSlice";
import {
  PickerOption,
  CanopyConditionOptions,
  BarkConditionOptions,
  LocationTypeOptions,
} from "../components/DataForm";

const getOptionsLabel = <ValueType,>(
  options: Array<PickerOption<ValueType>>,
  value: ValueType
) =>
  options.find((option: PickerOption<ValueType>) => option.value === value)
    ?.label ?? "(n/a)";

export default function DataListScreen({
  navigation,
}: StackScreenProps<DataListStackParams, "DataList">) {
  const dataList = useSelector((state: RootState) => state.data);

  const editItem = useCallback(
    (id: string) => navigation.navigate("EditData", { id }),
    [navigation]
  );

  return (
    <View>
      <List.Section>
        {dataList.map((data: Data) => (
          <DataListItem key={data.id} data={data} editItem={editItem} />
        ))}
      </List.Section>
    </View>
  );
}

const DataListItem = React.memo(
  ({ data, editItem }: { data: Data; editItem: (id: string) => void }) => {
    return (
      <List.Accordion title={new Date(data.createdAt).toString()}>
        <Card>
          <List.Item
            title="Location"
            description={
              data.formValues.location
                ? `${data.formValues.location?.lat}, ${data.formValues.location?.long}`
                : ""
            }
          />
          <List.Item
            title="Bores"
            description={data.formValues.bores ?? "(n/a)"}
          />
          <List.Item
            title="Trunk Circumference at 1m (cm)"
            description={data.formValues.trunkCirc ?? "(n/a)"}
          />
          <List.Item
            title="Canopy Condition"
            description={getOptionsLabel(
              CanopyConditionOptions,
              data.formValues.canopyCondition
            )}
          />
          <List.Item
            title="Bark Condition"
            description={getOptionsLabel(
              BarkConditionOptions,
              data.formValues.barkCondition
            )}
          />
          <List.Item
            title="Location Type"
            description={getOptionsLabel(
              LocationTypeOptions,
              data.formValues.locationType
            )}
          />
          <List.Item
            title="Notes"
            description={data.formValues.notes ?? "(n/a)"}
          />
          <List.Item
            title={<Button mode="contained">Edit</Button>}
            onPress={() => editItem(data.id)}
          />
        </Card>
      </List.Accordion>
    );
  }
);
