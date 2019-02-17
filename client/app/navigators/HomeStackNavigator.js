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
            color="#f1f3ee"
            onPress={() => { navigation.toggleDrawer(); }}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: '#1c4b44',
        height: 50
      },
      headerTransparent: true
    })
  }
);

export default HomeStack;