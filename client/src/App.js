import React from 'react';
import { NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import RootNavigator from './app/navigators/app/RootNavigator.navigator';
import { setStatusBarHeight } from './core/redux/actions/deviceInfo.actions';
import { initializeStore } from './core/redux/store';
import { AuthService } from './core/services/AuthService';

const auth = Object.create(AuthService);
const { StatusBarManager } = NativeModules;
const mapStateToProps = (state) => state;
const mapActionsToProps = { setStatusBarHeight };

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   loggedIn: false,
    // };
  }

  componentWillMount() {
    auth.getVerifiedToken().then((result) => {
      if (result.isVerified) {
        initializeStore(result.user);
        this.navigator.dispatch(NavigationActions.navigate({ routeName: 'App' }));
      }
    }).catch((error) => {
      console.error('ERROR VERIFYING TOKEN', error);
    });

    StatusBarManager.getHeight((statusBarHeight) => {
      this.props.setStatusBarHeight(statusBarHeight.height);
    });
  }

  // _logUserIn(user) {
  //   initializeStore(user);
  //   this.setState({ loggedIn: true });
  // }

  render() {
    return (
      <RootNavigator
        ref={nav => { this.navigator = nav; }}
      // screenProps={{
      //   logUserIn: (user) => { this._logUserIn(user); }
      // }}
      />
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(App);