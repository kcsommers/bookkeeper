import React from 'react';
import {
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation';
import HomeTabNavigator from './HomeTab.navigator';
import NotepadScreen from '../screens/NotepadScreen';

const HomeStack = createStackNavigator(
  {
    HomeTab: { screen: HomeTabNavigator },
    Notepad: { screen: NotepadScreen }
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