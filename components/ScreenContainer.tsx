import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

type ScreenContainerProps = {
  title: string;
  children?: React.ReactElement;
};

export default function ScreenContainer({ title, children }: ScreenContainerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
