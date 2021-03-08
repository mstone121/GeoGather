import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          AddDataScren: "AddData",
          DataListScreen: "DataList"
        }
      },
      NotFound: '*',
    },
  },
};
