import { Dimensions, PixelRatio, Platform } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export default class AppStyling {
  getAppStyles() {
    return {
      AppStyles: {
        h2: {
          fontSize: 24,
          fontFamily: 'MerrItalic'
        },
        h3: {
          fontSize: 20,
          fontFamily: 'Merriweather'
        },
        boxShadow: {
          shadowColor: '#333',
          shadowOpacity: 0.2,
          shadowOffset: { width: 1, height: 2 },
          shadowRadius: 2,
        }
      }
    };
  }

  normalizeFont(size) {
    console.log('NORMALIZING############################################');
    const newSize = size * scale;
    console.log('NEW SIZE', newSize);
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
