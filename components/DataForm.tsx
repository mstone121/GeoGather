import React, { useEffect, useState } from "react";
import { View } from "react-native";
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
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

type Location = {
  lat: number;
  long: number;
  accuracy: number | null;
};

export type FormValues = {
  location: Location | undefined;
  bores: number | undefined;
  canopyCondition: number | undefined;
  barkCondition: number | undefined;
  locationType: string | undefined;
  notes: string | undefined;
};

const padding8 = { padding: 8 };
const margin8 = { margin: 8 };

function Spacer() {
  return <Divider style={margin8} />;
}

const convertToInt = (value: string) =>
  parseInt(value.replace(/^\D+/g, "")) || undefined;

export default function DataForm({
  onSubmit,
  formValues,
}: {
  onSubmit: (formValues: FormValues) => any;
  formValues?: FormValues;
}) {
  const theme = useTheme();

  const [bores, setBores] = useState<number | undefined>();
  const [canopyCondition, setCanopyCondition] = useState<number | undefined>();
  const [barkCondition, setBarkCondition] = useState<number | undefined>();
  const [locationType, setLocationType] = useState<string | undefined>();
  const [notes, setNotes] = useState<string | undefined>();

  const [location, setLocation] = useState<Location | undefined>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setBores(formValues?.bores);
    setCanopyCondition(formValues?.canopyCondition);
    setBarkCondition(formValues?.barkCondition);
    setLocationType(formValues?.locationType);
    setNotes(formValues?.notes);
    setLocation(formValues?.location);
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
      bores,
      canopyCondition,
      barkCondition,
      locationType,
      notes,
    });
  };

  return (
    <View style={padding8}>
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

      <TextInput
        label="Bore Count"
        value={bores?.toString() ?? ""}
        onChangeText={(newValue) => setBores(convertToInt(newValue))}
        keyboardType="numeric"
      />

      <Caption>Canopy Condition</Caption>
      <Picker
        selectedValue={canopyCondition}
        onValueChange={setCanopyCondition}
      >
        <Picker.Item label="(n/a)" value={undefined} />
        <Picker.Item label="Full Canopy" value={0} />
        <Picker.Item label="Some Dead Branches" value={1} />
        <Picker.Item label="Mostly Dead" value={2} />
        <Picker.Item label="Completely Dead" value={3} />
      </Picker>

      <Spacer />

      <Caption>Bark Condition</Caption>
      <Picker selectedValue={barkCondition} onValueChange={setBarkCondition}>
        <Picker.Item label="(n/a)" value={undefined} />
        <Picker.Item label="Intact" value={0} />
        <Picker.Item label="Light Damage" value={1} />
        <Picker.Item label="Heavy Damage" value={2} />
      </Picker>

      <Caption>Location Type</Caption>
      <Picker selectedValue={locationType} onValueChange={setLocationType}>
        <Picker.Item label="(n/a)" value={undefined} />
        <Picker.Item label="Forested Area" value="forest" />
        <Picker.Item label="City Park" value="park" />
        <Picker.Item label="Street" value="street" />
      </Picker>

      <Spacer />

      <TextInput
        label="Notes"
        value={notes ?? ""}
        onChangeText={(newNotes) => setNotes(newNotes)}
      />

      <Spacer />

      <Button onPress={submitForm} mode="contained">
        Save
      </Button>
    </View>
  );
}
