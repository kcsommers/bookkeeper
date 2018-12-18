import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';

const SettingsStack = createStackNavigator(
  {
    Settings: { screen: SettingsScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerRight: (
        <Button title="Done" onPress={() => { navigation.navigate('Home'); }} />
      )
    })
  }
);

export default SettingsStack;