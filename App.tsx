import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import { store, persistor } from "./reducers/store";
import Navigation from "./navigation";
import { PersistGate } from "redux-persist/integration/react";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#347227",
    accent: "#61c7dd",
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StoreProvider store={store}>
          <PersistGate persistor={persistor}>
            <PaperProvider theme={theme}>
              <Navigation />
              <StatusBar />
            </PaperProvider>
          </PersistGate>
        </StoreProvider>
      </SafeAreaProvider>
    );
  }
}
