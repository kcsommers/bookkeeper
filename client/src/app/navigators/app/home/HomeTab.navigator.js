import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation';
import SearchStack from './SearchStack.navigator';
import ProfileStack from './profile/ProfileStack';

const HomeTabNavigator = createBottomTabNavigator({
  ProfileStack: {
    screen: ProfileStack,
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