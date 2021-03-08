import React, { useState, ReactChildren } from "react";
import { Text, TextInput, View } from 'react-native';

type formValues = {
  bores: number
}

const convertToInt = (value: string) => parseInt(value.replace(/^\D+/g, '')) || undefined

export default function DataForm({ formValues }: { formValues?: formValues }) {
  const [bores, setBores] = useState<number | undefined>();

  return (
    <View>
      <InputLabel>Bores</InputLabel>
      <TextInput
        value={bores?.toString() ?? ''}
        onChangeText={newValue => setBores(convertToInt(newValue))}
        keyboardType="numeric" />
    </View>
  );
}

function InputLabel({ children }: { children: string }) {
  return <Text>{children}</Text>
}
