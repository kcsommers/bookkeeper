import { createStackNavigator } from 'react-navigation';
import HomeTabNavigator from './HomeTab.navigator';

// In AppDrawer
const HomeStack = createStackNavigator(
  {
    HomeTab: {
      screen: HomeTabNavigator,
      navigationOptions: {
        header: null
      }
    }
  }
);

export default HomeStack;