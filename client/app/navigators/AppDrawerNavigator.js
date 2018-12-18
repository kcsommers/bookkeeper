import { createDrawerNavigator } from 'react-navigation';
import HomeStack from './HomeStackNavigator';
import EditProfileStack from './EditProfileStackNavigator';
import SettingsStack from './SettingsStackNavigator';

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeStack: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: () => null,
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