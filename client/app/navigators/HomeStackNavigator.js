import React from 'react';
import {
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation';
import HomeTabNavigator from './HomeTabNavigator';

const HomeStack = createStackNavigator(
  {
    HomeTab: { screen: HomeTabNavigator }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: (
        <View style={{ padding: 10 }}>
          <Ionicons
            name="md-menu"
            size={30}
            onPress={() => { navigation.toggleDrawer(); }}
          />
        </View>
      )
    })
  }
);

export default HomeStack;