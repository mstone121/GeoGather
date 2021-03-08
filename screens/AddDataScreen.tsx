import * as React from 'react';

import ScreenContainer from '../components/ScreenContainer';
import DataForm from '../components/DataForm';

export default function AddDataScreen() {
  return (
    <ScreenContainer title="Add Data">
      <DataForm />
    </ScreenContainer>
  );
}