import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../../../screens/Settings.screen';

const SettingsStack = createStackNavigator(
  {
    Settings: { screen: SettingsScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerRight: (
        <Button title="Done" onPress={() => { navigation.navigate('HomeStack'); }} />
      )
    })
  }
);

export default SettingsStack;