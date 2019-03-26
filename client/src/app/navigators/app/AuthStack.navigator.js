import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from '../../screens/Login.screen';
import SignupScreen from '../../screens/Signup.screen';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Signup: { screen: SignupScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <MaterialIcons
            name="chevron-left"
            size={35}
            color="#fefefe"
          />
        </TouchableOpacity>),
      headerStyle: {
        backgroundColor: '#1c4b44'
      }
    })
  }
);

export default AuthStack;