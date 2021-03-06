import { createStackNavigator } from 'react-navigation';
import AppDrawerNavigator from './AppDrawer.navigator';

// In AppSwitch
const AppStack = createStackNavigator(
  {
    AppDrawer: {
      screen: AppDrawerNavigator,
      navigationOptions: {
        header: null
      }
    }
  }
);

export default AppStack;