import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { StackScreenProps } from "@react-navigation/stack";
import { View, ScrollView } from "react-native";
import {
  Button,
  IconButton,
  List,
  Modal,
  Text,
  Title,
  useTheme,
} from "react-native-paper";
import {
  documentDirectory,
  deleteAsync,
  getInfoAsync,
  makeDirectoryAsync,
  readDirectoryAsync,
  readAsStringAsync,
  writeAsStringAsync,
} from "expo-file-system";

import { BottomTabStackParams } from "../navigation/BottomTabNavigator";
import ScreenContainer from "../components/ScreenContainer";
import { RootState } from "../reducers";
import { replaceData } from "../reducers/dataSlice";

const dataDir = `${documentDirectory}data`;

export default function SaveData({
  navigation,
}: StackScreenProps<BottomTabStackParams, "SaveData">) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const data = useSelector((state: RootState) => state.data);

  const [files, setFiles] = useState<Array<string>>([]);
  const [error, setError] = useState<string | undefined>();

  const [toDelete, setToDelete] = useState<string | undefined>();
  const [toLoad, setToLoad] = useState<string | undefined>();

  const checkForDataDir = useCallback(async () => {
    const { exists, isDirectory } = await getInfoAsync(dataDir);
    if (!exists) {
      makeDirectoryAsync(dataDir);
    } else {
      if (!isDirectory) {
        throw new Error("Data path exists and is not a directory");
      }
    }
  }, []);

  const refreshFileList = useCallback(
    async (skipCheck: boolean = false) => {
      setError(undefined);
      try {
        if (!skipCheck) await checkForDataDir();
        setFiles(await readDirectoryAsync(dataDir));
      } catch (error) {
        setError("Could not retrieve files");
        console.error(error);
      }
    },
    [checkForDataDir, setError, setFiles]
  );

  const saveCurrentData = useCallback(async () => {
    setError(undefined);
    try {
      await checkForDataDir();
      await writeAsStringAsync(
        `${dataDir}/${new Date().toISOString()}_GeoGatherData.json`,
        JSON.stringify(data)
      );
      await refreshFileList(true);
    } catch (error) {
      setError("Could not save current data");
      console.error(error);
    }
  }, [data, setError, checkForDataDir, refreshFileList]);

  const confirmDelete = useCallback(async () => {
    setError(undefined);
    if (toDelete) {
      try {
        await checkForDataDir();
        await deleteAsync(`${dataDir}/${toDelete}`);
        await refreshFileList(true);
      } catch (error) {
        setError("Could not delete file");
        console.error(error);
      }
    }
    setToDelete(undefined);
  }, [toDelete, setError, checkForDataDir, refreshFileList]);

  const confirmLoad = useCallback(async () => {
    setError(undefined);
    if (toLoad) {
      try {
        await checkForDataDir();
        const data = await readAsStringAsync(`${dataDir}/${toLoad}`);
        dispatch(replaceData(JSON.parse(data)));
      } catch (error) {
        setError("Could not load file");
        console.error(error);
      }
    }
    setToLoad(undefined);
  }, [toLoad, dispatch, setError, setToLoad, checkForDataDir]);

  useEffect(() => {
    refreshFileList();
  }, []);

  return (
    <>
      <ScreenContainer title="Save Data" navigation={navigation}>
        <Button
          mode="outlined"
          style={{ marginTop: 16, marginLeft: 8, marginRight: 8 }}
          onPress={() => saveCurrentData()}
        >
          Save Current Data to File
        </Button>
        <View style={{ padding: 8, paddingBottom: 0, flex: 1 }}>
          {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Title style={{ paddingLeft: 8 }}>Saved Files</Title>
            <IconButton icon="refresh" onPress={() => refreshFileList()} />
          </View>
          <ScrollView>
            <FileList
              files={files}
              setToDelete={setToDelete}
              setToLoad={setToLoad}
            />
          </ScrollView>
        </View>
      </ScreenContainer>
      <ConfirmDeleteModal
        toDelete={toDelete}
        setToDelete={setToDelete}
        confirmDelete={confirmDelete}
      ></ConfirmDeleteModal>
      <ConfirmLoadModal
        toLoad={toLoad}
        setToLoad={setToLoad}
        confirmLoad={confirmLoad}
      ></ConfirmLoadModal>
    </>
  );
}

const FileList = React.memo(
  ({
    files,
    setToLoad,
    setToDelete,
  }: {
    files: string[];
    setToLoad: (toLoad: string | undefined) => any;
    setToDelete: (toDelete: string | undefined) => any;
  }) => (
    <List.Section>
      {files.map((fileName: string) => (
        <List.Accordion
          key={fileName}
          title={fileName}
          style={{ marginTop: 8 }}
        >
          <View style={{ flexDirection: "row" }}>
            <IconButton
              icon="file-upload"
              onPress={() => setToLoad(fileName)}
            />
            <IconButton icon="delete" onPress={() => setToDelete(fileName)} />
          </View>
        </List.Accordion>
      ))}
    </List.Section>
  )
);

const ConfirmDeleteModal = React.memo(
  ({
    toDelete,
    setToDelete,
    confirmDelete,
  }: {
    toDelete: string | undefined;
    setToDelete: (toDelete: string | undefined) => any;
    confirmDelete: () => any;
  }) => {
    const theme = useTheme();
    return (
      <Modal
        visible={Boolean(toDelete)}
        onDismiss={() => setToDelete(undefined)}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          margin: 16,
        }}
      >
        <Text style={{ textAlign: "center", marginBottom: 16 }}>
          Are you sure you want to delete {toDelete}?
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
            onPress={() => setToDelete(undefined)}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    );
  }
);

const ConfirmLoadModal = React.memo(
  ({
    toLoad,
    setToLoad,
    confirmLoad,
  }: {
    toLoad: string | undefined;
    setToLoad: (toLoad: string | undefined) => any;
    confirmLoad: () => any;
  }) => {
    const theme = useTheme();
    return (
      <Modal
        visible={Boolean(toLoad)}
        onDismiss={() => setToLoad(undefined)}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          margin: 16,
        }}
      >
        <Text style={{ textAlign: "center", marginBottom: 16 }}>
          Are you sure you want to load {toLoad}? This will overwrite the
          current data.
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            mode="contained"
            color={theme.colors.error}
            style={{ margin: 8 }}
            onPress={() => confirmLoad()}
          >
            Load
          </Button>
          <Button
            mode="outlined"
            style={{ margin: 8 }}
            onPress={() => setToLoad(undefined)}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    );
  }
);
