import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthStack from './AuthStackNavigator';
import AppStack from './AppStackNavigator';

const AppSwitchNavigator = createSwitchNavigator({
  Auth: { screen: AuthStack },
  App: { screen: AppStack }
}, {
    initialRouteName: 'Auth'
  });

export default createAppContainer(AppSwitchNavigator);