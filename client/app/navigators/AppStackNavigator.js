import { createStackNavigator } from 'react-navigation';
import AppDrawerNavigator from './AppDrawerNavigator';

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