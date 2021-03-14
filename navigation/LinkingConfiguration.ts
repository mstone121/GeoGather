import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          AddDataScreen: "AddData",
          DataList: {
            screens: {
              DataListScreen: "DataList",
              EditDataScreen: "EditData"
            }
          },
          SaveDataScreen: "SaveData"
        }
      },
      NotFound: '*',
    },
  },
};
