import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Button,
  Caption,
  Divider,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import {
  hasServicesEnabledAsync,
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export type Location = {
  lat: number;
  long: number;
  accuracy: number | null;
};

export type PickerOption<ValueType> = {
  label: string;
  value: ValueType;
};

export const LocationTypeOptions = new Array<PickerOption<string>>(
  { label: "Forested Area", value: "forest" },
  { label: "City Park", value: "park" },
  { label: "Street", value: "street" }
);

export const SpeciesOptions = new Array<PickerOption<string>>(
  { label: "White Ash", value: "white" },
  { label: "Green Ash", value: "green" },
  { label: "Black Ash", value: "black" },
  { label: "Blue Ash", value: "blue" }
);

export const CanopyConditionOptions = new Array<PickerOption<number>>(
  { label: "Full Canopy", value: 1 },
  { label: "Some Dead Branches", value: 2 },
  { label: "Mostly Dead", value: 3 },
  { label: "Completely Dead", value: 4 }
);

export const BarkConditionOptions = new Array<PickerOption<number>>(
  { label: "Intact", value: 1 },
  { label: "Light Damage", value: 2 },
  { label: "Heavy Damage", value: 3 }
);

export type FormValues = {
  location: Location | undefined;
  locationType: string | undefined;
  species: string | undefined;
  canopyCondition: number | undefined;
  barkCondition: number | undefined;
  bores: number | undefined;
  trunkCirc: number | undefined;
  notes: string | undefined;
};

const padding8 = { padding: 8 };
const margin8 = { margin: 8 };

function Spacer() {
  return <Divider style={margin8} />;
}

const convertToInt = (value: string) =>
  parseInt(value.replace(/\D+/g, "")) || undefined;

export default function DataForm({
  onSubmit,
  formValues,
}: {
  onSubmit: (formValues: FormValues) => void;
  formValues?: FormValues;
}) {
  const theme = useTheme();

  const [location, setLocation] = useState<Location | undefined>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const [locationType, setLocationType] = useState<string | undefined>();
  const [species, setSpecies] = useState<string | undefined>();
  const [canopyCondition, setCanopyCondition] = useState<number | undefined>();
  const [barkCondition, setBarkCondition] = useState<number | undefined>();
  const [bores, setBores] = useState<number | undefined>();
  const [trunkCirc, setTrunkCirc] = useState<number | undefined>();
  const [notes, setNotes] = useState<string | undefined>();

  useEffect(() => {
    setLocation(formValues?.location);
    setLocationType(formValues?.locationType);
    setSpecies(formValues?.species);
    setCanopyCondition(formValues?.canopyCondition);
    setBarkCondition(formValues?.barkCondition);
    setBores(formValues?.bores);
    setTrunkCirc(formValues?.trunkCirc);
    setNotes(formValues?.notes);
  }, [formValues]);

  const getLocation = () => {
    setLoading(true);
    setLocation(undefined);

    (async () => {
      if ((await requestPermissionsAsync()).status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }
      if (!(await hasServicesEnabledAsync())) {
        setErrorMsg("Permission service unavailable");
        setLoading(false);
      }
      setErrorMsg(undefined);

      const { coords } = await getCurrentPositionAsync();
      setLocation({
        lat: coords.latitude,
        long: coords.longitude,
        accuracy: coords.accuracy,
      });
      setLoading(false);
    })();
  };

  const submitForm = () => {
    onSubmit({
      location,
      locationType,
      species,
      canopyCondition,
      barkCondition,
      bores,
      trunkCirc,
      notes,
    });

    // reset form
    setLocation(undefined);
    setErrorMsg(undefined);
    setLoading(false);

    setSpecies(undefined);
    setLocationType(undefined);
    setCanopyCondition(undefined);
    setBarkCondition(undefined);
    setBores(undefined);
    setTrunkCirc(undefined);
    setNotes(undefined);
  };

  return (
    <ScrollView style={{ ...padding8, paddingBottom: 0 }}>
      <Button
        disabled={loading}
        onPress={getLocation}
        mode="outlined"
        style={{ marginBottom: 8 }}
      >
        Get Location
      </Button>

      {errorMsg && (
        <Caption style={{ color: theme.colors.error }}>{errorMsg}</Caption>
      )}

      <Text>{`Latitude: ${location?.lat ?? ""}`}</Text>
      <Text>{`Longitude: ${location?.long ?? ""}`}</Text>
      {location?.accuracy && (
        <Text>{`Accuracy: ${location.accuracy} meters`}</Text>
      )}

      <Spacer />

      <PickerInput
        caption="Location Type"
        value={locationType}
        onChange={setLocationType}
        items={LocationTypeOptions}
      />

      <Spacer />

      <PickerInput
        caption="Species"
        value={species}
        onChange={setSpecies}
        items={SpeciesOptions}
      />

      <Spacer />

      <PickerInput
        caption="Canopy Condition"
        value={canopyCondition}
        onChange={setCanopyCondition}
        items={CanopyConditionOptions}
      />

      <Spacer />

      <PickerInput
        caption="Bark Condition"
        value={barkCondition}
        onChange={setBarkCondition}
        items={BarkConditionOptions}
      />

      <Spacer />

      <TextInput
        label="Bore Count"
        value={bores?.toString() ?? ""}
        onChangeText={(newValue) => setBores(convertToInt(newValue))}
        keyboardType="numeric"
      />

      <Spacer />

      <TextInput
        label="Trunk Circumference (cm) at 1m"
        value={trunkCirc?.toString() ?? ""}
        onChangeText={(newValue) => setTrunkCirc(convertToInt(newValue))}
        keyboardType="numeric"
      />

      <Spacer />

      <TextInput
        label="Notes"
        value={notes ?? ""}
        onChangeText={(newNotes) => setNotes(newNotes)}
        multiline
      />

      <Spacer />

      <Button onPress={submitForm} mode="contained">
        Save
      </Button>

      <Spacer />
    </ScrollView>
  );
}

function PickerInput<ValueType>({
  caption,
  value,
  onChange,
  items,
}: {
  caption: string;
  value: ValueType | undefined;
  onChange: (value: ValueType | undefined) => void;
  items: Array<PickerOption<ValueType>>;
}) {
  return (
    <>
      <Caption>{caption}</Caption>
      <Picker selectedValue={value} onValueChange={onChange}>
        <Picker.Item label="(n/a)" value={undefined} />
        {items.map((option: PickerOption<ValueType>) => (
          <Picker.Item
            key={`${option.value}_${option.label}`}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </>
  );
}
