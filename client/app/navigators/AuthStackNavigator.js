import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator(
  {
    Login: { screen: LoginScreen }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default AuthStack;