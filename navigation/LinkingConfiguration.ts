import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          DataListTabs: {
            screens: {
              AddDataScreen: "AddData",
              DataListScreen: "DataList",
              SaveDataScreen: "SaveData"
            }
          },
          EditDataScreen: "EditData",
        }
      },
      NotFound: '*',
    },
  },
};
