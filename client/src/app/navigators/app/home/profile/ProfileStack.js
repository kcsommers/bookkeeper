/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
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
import { appColors } from '../../../../../assets/styles/appStyles.styles';

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
                color={appColors.offWhite}
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
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: appColors.teal,
      },
      headerTintColor: appColors.offWhite
    }
  }
);

export default ProfileStack;