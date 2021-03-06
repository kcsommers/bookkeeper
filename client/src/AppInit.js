/* eslint-disable global-require */
/* eslint-disable no-else-return */
import React from 'react';
import { Provider } from 'react-redux';
import {
  Font,
  Asset,
  AppLoading,
  // SecureStore
} from 'expo';
import { Image, YellowBox } from 'react-native';
import { store } from './core/redux/store';
import App from './App';

YellowBox.ignoreWarnings(['Require cycle:']);

const Merriweather = require('./assets/fonts/Merriweather/Merriweather-Regular.ttf');
const MerrItalic = require('./assets/fonts/Merriweather/Merriweather-Italic.ttf');
const Pacifico = require('./assets/fonts/Pacifico/Pacifico-Regular.ttf');
const Lato = require('./assets/fonts/Lato/Lato-Regular.ttf');
const LatoItalic = require('./assets/fonts/Lato/Lato-Italic.ttf');

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
        Merriweather, MerrItalic, Pacifico, Lato, LatoItalic
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
    // SecureStore.deleteItemAsync('bookkeeper_token');
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