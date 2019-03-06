import { createDrawerNavigator } from 'react-navigation';
import HomeStack from './HomeStack.navigator';
import EditProfileStack from './EditProfileStack.navigator';
import SettingsStack from './SettingsStack.navigator';

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
    }
  }
);

export default AppDrawerNavigator;