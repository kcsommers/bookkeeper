import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import EditProfileScreen from '../screens/EditProfileScreen';

const EditProfileStack = createStackNavigator({
  Settings: { screen: EditProfileScreen }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerRight: (
        <Button title="Done" onPress={() => { navigation.navigate('Home') }}></Button>
      )
    })
  });

export default EditProfileStack;