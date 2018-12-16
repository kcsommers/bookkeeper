import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import IntroScreen from '../screens/IntroScreen';

const AuthStack = createStackNavigator({
  Intro: { screen: IntroScreen },
  Login: { screen: LoginScreen }
}, {
    defaultNavigationOptions: {
      header: null
    }
  });

export default AuthStack;