import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthStack from './AuthStackNavigator';
import AppStack from './AppStackNavigator';

class AppSwitchNavigator extends React.Component {
  render() {
    const switchNavigator = createSwitchNavigator(
      {
        Auth: { screen: AuthStack },
        App: { screen: AppStack }
      },
      {
        initialRouteName: this.props.initialRoute
      }
    );

    const AppContainer = createAppContainer(switchNavigator);

    return (
      <AppContainer />
    );
  }
}

export default AppSwitchNavigator;