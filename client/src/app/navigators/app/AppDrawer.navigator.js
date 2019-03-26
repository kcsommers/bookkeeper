import { createDrawerNavigator } from 'react-navigation';
import HomeStack from './home/HomeStack.navigator';
import EditProfileStack from './settings/EditProfileStack.navigator';
import SettingsStack from './settings/SettingsStack.navigator';

// In AppStack
const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeStack: {
      screen: HomeStack,
      navigationOptions: {
        title: 'Home'
      }
    },
    EditProfileStack: {
      screen: EditProfileStack,
      navigationOptions: {
        title: 'Edit Profile'
      }
    },
    SettingsStack: {
      screen: SettingsStack,
      navigationOptions: {
        title: 'Settings'
      }
    },
  }
);

export default AppDrawerNavigator;