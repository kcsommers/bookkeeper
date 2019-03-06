import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import ListScreen from '../screens/ListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchStack from './SearchStack.navigator';
import BookStack from './BookStack.navigator';

const HomeTabNavigator = createBottomTabNavigator({
  CurrentReads: {
    screen: BookStack,
    navigationOptions: {
      tabBarLabel: 'Current Reads',
      tabBarIcon: () => <Ionicons name="md-book" size={30} />
    }
  },
  List: {
    screen: ListScreen,
    navigationOptions: {
      tabBarLabel: 'Lists',
      tabBarIcon: () => <Ionicons name="md-bookmarks" size={30} />
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: () => <Ionicons name="md-person" size={30} />
    }
  },
  SearchStack: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: () => <Ionicons name="md-search" size={30} />
    }
  }
});

export default HomeTabNavigator;