import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Signup: { screen: SignupScreen }
  }
);

export default AuthStack;