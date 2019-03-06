
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AppStack from './AppStack.navigator';
import AuthStack from './AuthStack.navigator';

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