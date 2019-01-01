/* eslint-disable global-require */
/* eslint-disable no-else-return */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import {
  Font,
  Asset,
  AppLoading,
  SecureStore
} from 'expo';
import { Image, YellowBox } from 'react-native';
import axios from 'axios';
import App from './App';
import Environment from '../environment';
import userReducer from './redux/reducers/userReducer';


YellowBox.ignoreWarnings(['Require cycle:']);

const Merriweather = require('../assets/fonts/Merriweather-Regular.ttf');
const MerrItalic = require('../assets/fonts/Merriweather-Italic.ttf');
const Pacifico = require('../assets/fonts/Pacifico-Regular.ttf');


const allReducers = combineReducers({
  user: userReducer
});
const store = createStore(allReducers);

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

class AppInit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      initialRoute: ''
    };
    this.handleFinishLoading = this.handleFinishLoading.bind(this);
  }

  componentDidMount() {
    this.loadResourcesAsync().then(() => {
      SecureStore.getItemAsync('token').then((token) => {
        if (token) {
          this.verifyToken(token).then((result) => {
            if (result.isVerified) {
              this.setState({ isReady: true, initialRoute: 'App' });
            } else {
              this.setState({ isReady: true, initialRoute: 'Auth' });
            }
          });
        } else {
          this.setState({ isReady: true, initialRoute: 'Auth' });
        }
      }).catch((error) => {
        console.log('ERROR GETTING TOKEN', error);
      });
    }).catch((error) => {
      console.warn('ERROR LOADING SHIT', error);
    });
  }

  async verifyToken(token) {
    console.log('VERIFYING TOKEN', token);
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

  async loadResourcesAsync() {
    return Promise.all([
      cacheImages([
        require('../assets/images/logo.png'),
        require('../assets/images/page_backgrounds/searchBooks.jpg'),
        require('../assets/images/page_backgrounds/searchClubs.jpg'),
        require('../assets/images/page_backgrounds/searchUsers.jpg'),
        'http://books.google.com/books/content?id=XV8XAAAAYAAJ&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'
      ]),
      Font.loadAsync({
        Merriweather, MerrItalic, Pacifico
      })
    ]);
  }

  handleLoadingError(error) {
    console.warn('ERROR LOADING SHIT', error);
  }

  handleFinishLoading() {
    this.setState({ isReady: true });
  }

  render() {
    // SecureStore.deleteItemAsync('token');
    if (!this.state.isReady) {
      return (
        <AppLoading />
      );
    }

    return (
      <Provider store={store}>
        <App initialRoute={this.state.initialRoute} />
      </Provider>
    );
  }
}

export default AppInit;