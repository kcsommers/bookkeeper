import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import SearchStack from './SearchStack.navigator';
import ProfileStack from './profile/ProfileStack';
import BkTabBar from '../../../components/BkTabBar.component';

const HomeTabNavigator = createBottomTabNavigator({
  ProfileStack: {
    screen: ProfileStack
  },
  SearchStack: {
    screen: SearchStack
  }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarComponent: () => <BkTabBar navigation={navigation} />
  })
});

export default HomeTabNavigator;