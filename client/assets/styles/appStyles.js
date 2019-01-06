import { Dimensions, PixelRatio, Platform } from 'react-native';

export const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export class AppStyling {
  getAppStyles() {
    return {
      h2: {
        fontSize: this.normalizeFont(24),
        fontFamily: 'MerrItalic'
      },
      h3: {
        fontSize: this.normalizeFont(20),
        fontFamily: 'Merriweather'
      },
      boxShadow: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 2,
      },
      paddingSm: {
        paddingTop: SCREEN_HEIGHT * 0.007,
        paddingBottom: SCREEN_HEIGHT * 0.007
      },
      paddingMd: {

      },
      paddingLg: {

      }
    };
  }

  normalizeFont(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
