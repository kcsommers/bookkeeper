/* eslint-disable global-require */
/* eslint-disable no-else-return */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import {
  Font,
  Asset,
  AppLoading,
  // SecureStore
} from 'expo';
import { Image, YellowBox } from 'react-native';
import userReducer from './core/redux/reducers/userReducer';
import deviceInfoReducer from './core/redux/reducers/deviceInfoReducer';
import App from './App';

YellowBox.ignoreWarnings(['Require cycle:']);

const Merriweather = require('./assets/fonts/Merriweather-Regular.ttf');
const MerrItalic = require('./assets/fonts/Merriweather-Italic.ttf');
const Pacifico = require('./assets/fonts/Pacifico-Regular.ttf');


const allReducers = combineReducers({
  user: userReducer,
  deviceInfo: deviceInfoReducer
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
    };
    this.handleFinishLoading = this.handleFinishLoading.bind(this);
  }

  componentDidMount() {
    this.loadResourcesAsync().then(() => {
      this.setState({ isReady: true });
    }).catch((error) => {
      console.warn('ERROR LOADING SHIT', error);
    });
  }

  async loadResourcesAsync() {
    return Promise.all([
      cacheImages([
        require('./assets/images/logo.png'),
        require('./assets/images/page_backgrounds/searchBooks.jpg'),
        require('./assets/images/page_backgrounds/searchClubs.jpg'),
        require('./assets/images/page_backgrounds/searchUsers.jpg'),
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
        <App />
      </Provider>
    );
  }
}

export default AppInit;