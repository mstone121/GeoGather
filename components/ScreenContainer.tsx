import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Divider } from "react-native-paper";

type ScreenContainerProps = {
  title: string;
  children?: React.ReactElement;
};

export default function ScreenContainer({ title, children }: ScreenContainerProps) {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <Divider />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
