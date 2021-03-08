import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          AddDataScren: "Add%20Data",
          DataListScreen: "Data%20List"
        }
      },
      NotFound: '*',
    },
  },
};
