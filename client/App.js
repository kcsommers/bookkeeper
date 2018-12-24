/* eslint-disable global-require */
/* eslint-disable no-else-return */
import React from 'react';
// import { Provider } from 'react-redux';
import { Font, Asset, AppLoading } from 'expo';
import { Image } from 'react-native';
import AppSwitchNavigator from './app/navigators/AppSwitchNavigator';

const Merriweather = require('./assets/fonts/Merriweather-Regular.ttf');
const MerrItalic = require('./assets/fonts/Merriweather-Italic.ttf');
const Pacifico = require('./assets/fonts/Pacifico-Regular.ttf');

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));
const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async cacheResourcesAsync() {
    const fontAssets = cacheFonts([{ Merriweather }, { MerrItalic }, { Pacifico }]);
    const imageAssets = cacheImages([
      require('./assets/images/page_backgrounds/searchBooks.jpg'),
      require('./assets/images/page_backgrounds/searchClubs.jpg'),
      require('./assets/images/page_backgrounds/searchUsers.jpg'),
      'http://books.google.com/books/content?id=XV8XAAAAYAAJ&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api'
    ]);

    await Promise.all([...fontAssets, ...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => { console.log('FINISHED'); this.setState({ isReady: true }); }}
          onError={console.warn}
        />
      );
    }

    return <AppSwitchNavigator />;
  }
}

export default App;