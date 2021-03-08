import React, { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";

type formValues = {
  bores: number | undefined;
  canopyCondition: number | undefined;
  barkCondition: number | undefined;
};

const convertToInt = (value: string) =>
  parseInt(value.replace(/^\D+/g, "")) || undefined;

export default function DataForm({ formValues }: { formValues?: formValues }) {
  const [bores, setBores] = useState<number | undefined>();
  const [canopyCondition, setCanopyCondition] = useState<number | undefined>();
  const [barkCondition, setBarkCondition] = useState<number | undefined>();

  return (
    <View>
      <TextInput
        label="Bore Count"
        value={bores?.toString() ?? ""}
        onChangeText={(newValue) => setBores(convertToInt(newValue))}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={canopyCondition}
        onValueChange={setCanopyCondition}
      >
        <Picker.Item label="" value={undefined} />
        <Picker.Item label="Full Canopy" value={0} />
        <Picker.Item label="Some Dead Branches" value={1} />
        <Picker.Item label="Mostly Dead" value={2} />
        <Picker.Item label="Completely Dead" value={3} />
      </Picker>

      <Picker selectedValue={barkCondition} onValueChange={setBarkCondition}>
        <Picker.Item label="" value={undefined} />
        <Picker.Item label="Intact" value={0} />
        <Picker.Item label="Light Damage" value={1} />
        <Picker.Item label="Heavy Damage" value={2} />
      </Picker>
    </View>
  );
}
