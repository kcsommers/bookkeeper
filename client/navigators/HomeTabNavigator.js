import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SearchStack from './SearchStackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => <Ionicons name="md-home" size={24} />
    }
  },
  SearchStack: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: () => <Ionicons name="md-search" size={24} />
    }
  }
});

export default HomeTabNavigator;