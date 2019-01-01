import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchScreen from '../screens/SearchScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        header: null
      }
    },
    SearchResults: { screen: SearchResultsScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <MaterialIcons
            name="chevron-left"
            size={35}
            color="#fefefe"
          />
        </TouchableOpacity>),
      headerStyle: {
        backgroundColor: '#1c4b44'
      }
    })
  }
);

export default SearchStack;