/* eslint-disable global-require */
/* eslint-disable no-else-return */
import axios from 'axios';
import { SecureStore } from 'expo';
import React from 'react';
import { NativeModules } from 'react-native';
import { connect } from 'react-redux';
import Environment from '../environment';
import createRootNavigator from './app/navigators/AppSwitchNavigator';
import { setUser } from './core/redux/actions/userActions';
import { setStatusBarHeight } from './core/redux/actions/deviceInfoActions';

const { StatusBarManager } = NativeModules;
const mapStateToProps = (state) => state;
const mapActionsToProps = { setUser, setStatusBarHeight };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync('bookkeeper_token').then((token) => {
      if (token) {
        this.verifyToken(token).then((result) => {
          if (result.isVerified) {
            this.props.setUser(result.user);
            this.setState({ loggedIn: true });
          }
        });
      }
    }).catch((error) => {
      console.log('ERROR GETTING TOKEN', error);
    });

    StatusBarManager.getHeight((statusBarHeight) => {
      this.props.setStatusBarHeight(statusBarHeight.height);
    });
  }

  _logUserIn(user) {
    this.props.setUser(user);
    this.setState({ loggedIn: true });
  }

  async verifyToken(token) {
    const url = `${Environment.BASE_URL}/users/verify`;
    const verify = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (verify.data.verified) {
      return { isVerified: true, user: verify.data.user };
    } else {
      return { isVerified: false, error: verify.data.error };
    }
  }

  render() {
    const RootNavigator = createRootNavigator(this.state.loggedIn);
    return (
      <RootNavigator screenProps={{
        logUserIn: (user) => { this._logUserIn(user); }
      }}
      />
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(App);