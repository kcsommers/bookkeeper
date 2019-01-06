import React from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from 'react-navigation';
import ListScreen from '../screens/ListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchStack from './SearchStackNavigator';
import CurrentReadsScreen from '../screens/CurrentReadsScreen';

const HomeTabNavigator = createBottomTabNavigator({
  CurrentReads: {
    screen: CurrentReadsScreen,
    navigationOptions: {
      tabBarLabel: 'Current Reads',
      tabBarIcon: () => <Icon name="book-open-page-variant" size={30} />
    }
  },
  List: {
    screen: ListScreen,
    navigationOptions: {
      tabBarLabel: 'Lists',
      tabBarIcon: () => <Icon name="library-books" size={30} />
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: () => <Ionicon name="md-person" size={30} />
    }
  },
  SearchStack: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: () => <Ionicon name="md-search" size={30} />
    }
  }
});

export default HomeTabNavigator;