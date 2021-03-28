import React from "react";
import { View } from "react-native";
import { Button, Modal, Text, useTheme } from "react-native-paper";

function ConfirmDeleteModal({
  visible,
  deleteString,
  cancelDelete,
  confirmDelete,
}: {
  visible: boolean;
  deleteString: string | undefined;
  cancelDelete: () => void;
  confirmDelete: () => void;
}) {
  const theme = useTheme();
  return (
    <Modal
      visible={visible}
      onDismiss={() => cancelDelete()}
      contentContainerStyle={{
        backgroundColor: "white",
        padding: 20,
        margin: 16,
      }}
    >
      <Text style={{ textAlign: "center", marginBottom: 16 }}>
        Are you sure you want to delete
        {deleteString ? ` ${deleteString}` : " this item"}?
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button
          mode="contained"
          color={theme.colors.error}
          style={{ margin: 8 }}
          onPress={() => confirmDelete()}
        >
          Delete
        </Button>
        <Button
          mode="outlined"
          style={{ margin: 8 }}
          onPress={() => cancelDelete()}
        >
          Cancel
        </Button>
      </View>
    </Modal>
  );
}

export default React.memo(ConfirmDeleteModal);
