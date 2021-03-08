import * as React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { BottomTabStackParams } from '../navigation/BottomTabNavigator';
import ScreenContainer from '../components/ScreenContainer';
import DataForm from '../components/DataForm';

export default function AddDataScreen({ navigation }: StackScreenProps<BottomTabStackParams, "AddData">) {
  return (
    <ScreenContainer title="Add Data" navigation={navigation}>
      <DataForm />
    </ScreenContainer >
  );
}