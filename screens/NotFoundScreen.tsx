import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ParamListBase } from '@react-navigation/routers';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-paper';

import ScreenContainer from '../components/ScreenContainer';


export default function NotFoundScreen({
  navigation,
}: StackScreenProps<ParamListBase, 'NotFound'>) {
  return (
    <ScreenContainer title="Not found">
      <Button onPress={() => navigation.replace('Root')}>Go to home screen!</Button>
    </ScreenContainer>
  );
}
