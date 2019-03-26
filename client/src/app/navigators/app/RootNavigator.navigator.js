
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AppStack from './AppStack.navigator';
import AuthStack from './AuthStack.navigator';

const RootNavigator = createAppContainer(createSwitchNavigator(
  {
    Auth: { screen: AuthStack },
    App: { screen: AppStack }
  }
));

export default RootNavigator;