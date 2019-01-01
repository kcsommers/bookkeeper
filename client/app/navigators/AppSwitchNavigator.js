import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AppStack from './AppStackNavigator';
import AuthStack from './AuthStackNavigator';

const createRootNavigator = (isLoggedIn = false) => {
  return createAppContainer(createSwitchNavigator(
    {
      Auth: { screen: AuthStack },
      App: { screen: AppStack }
    },
    {
      initialRouteName: (isLoggedIn) ? 'App' : 'Auth'
    }
  ));
};

export default createRootNavigator;