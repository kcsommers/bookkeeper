import React from 'react';
import {
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotepadScreen from '../../../../screens/Notepad.screen';
import ListScreen from '../../../../screens/List.screen';
import BookScreen from '../../../../screens/Book.screen';
import ProfileScreen from '../../../../screens/Profile.screen';

// In HomeTab
const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <View style={{ padding: 10 }}>
              <Ionicons
                name="md-menu"
                size={30}
                onPress={() => { navigation.toggleDrawer(); }}
              />
            </View>
          )
        };
      }
    },
    List: { screen: ListScreen },
    Book: { screen: BookScreen },
    Notepad: { screen: NotepadScreen }
  }
);

export default ProfileStack;