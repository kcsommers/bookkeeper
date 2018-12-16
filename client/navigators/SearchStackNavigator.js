import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SearchScreen from '../screens/SearchScreen';

const SearchStack = createStackNavigator({
  Search: { screen: SearchScreen }
});

export default SearchStack;