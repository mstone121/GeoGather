import React, { useCallback, useState } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Card, List, useTheme } from "react-native-paper";

import { BottomTabStackParams } from "../navigation/BottomTabNavigator";
import { RootState } from "../reducers";
import { Data, removeData } from "../reducers/dataSlice";
import {
  PickerOption,
  CanopyConditionOptions,
  BarkConditionOptions,
  LocationTypeOptions,
  SpeciesOptions,
} from "../components/DataForm";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ScreenContainer from "../components/ScreenContainer";

const getOptionsLabel = <ValueType,>(
  options: Array<PickerOption<ValueType>>,
  value: ValueType
) =>
  options.find((option: PickerOption<ValueType>) => option.value === value)
    ?.label ?? "(n/a)";

export default function DataListScreen({
  navigation,
}: StackScreenProps<BottomTabStackParams, "DataList">) {
  const dispatch = useDispatch();
  const dataList = useSelector((state: RootState) => state.data);
  const [toDelete, setToDelete] = useState<undefined | string>();

  const editItem = useCallback(
    (id: string) => navigation.navigate("EditData", { id }),
    [navigation]
  );

  const deleteData = () => {
    if (toDelete) {
      dispatch(removeData(toDelete));
      setToDelete(undefined);
    }
  };

  return (
    <ScreenContainer title="Data List" navigation={navigation}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ padding: 8 }}>
          <List.Section>
            {dataList.map((data: Data) => (
              <DataListItem
                key={data.id}
                data={data}
                editItem={editItem}
                setToDelete={setToDelete}
              />
            ))}
          </List.Section>
        </ScrollView>
      </View>
      <ConfirmDeleteModal
        visible={Boolean(toDelete)}
        deleteString="this observation"
        cancelDelete={() => setToDelete(undefined)}
        confirmDelete={() => deleteData()}
      />
    </ScreenContainer>
  );
}

const DataListItem = React.memo(
  ({
    data,
    editItem,
    setToDelete,
  }: {
    data: Data;
    editItem: (id: string) => void;
    setToDelete: (toDelete: string) => void;
  }) => {
    const theme = useTheme();

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
            title="Location Type"
            description={getOptionsLabel(
              LocationTypeOptions,
              data.formValues.locationType
            )}
          />
          <List.Item
            title="Species"
            description={getOptionsLabel(
              SpeciesOptions,
              data.formValues.species
            )}
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
            title="Bores"
            description={data.formValues.bores ?? "(n/a)"}
          />
          <List.Item
            title="Trunk Circumference at 1m (cm)"
            description={data.formValues.trunkCirc ?? "(n/a)"}
          />
          <List.Item
            title="Notes"
            description={data.formValues.notes ?? "(n/a)"}
          />
          <List.Item
            title={
              <View style={{ flexDirection: "row" }}>
                <Button mode="contained" onPress={() => editItem(data.id)}>
                  Edit
                </Button>
                <Button
                  mode="contained"
                  onPress={() => setToDelete(data.id)}
                  color={theme.colors.error}
                  style={{ marginLeft: 16 }}
                >
                  Delete
                </Button>
              </View>
            }
          />
        </Card>
      </List.Accordion>
    );
  }
);
