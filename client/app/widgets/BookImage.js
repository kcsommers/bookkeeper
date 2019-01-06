import React from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';

import { SCREEN_HEIGHT, AppStyling } from '../../assets/styles/appStyles';

const appStyles = new AppStyling().getAppStyles();
const styles = {
  large: StyleSheet.create({
    image: {
      width: (SCREEN_HEIGHT * 0.45) * 0.649,
      height: (SCREEN_HEIGHT * 0.45),
    }
  })
};

class BookImage extends React.Component {
  render() {
    return (
      <Image
        style={[styles[this.props.size].image,
          appStyles.boxShadow,
          {
            borderWidth: 2,
            borderColor: '#fff',
            borderRadius: 5
          }]}
        source={{ uri: this.props.source, cache: 'force-cache' }}
        resizeMode="cover"
      />
    );
  }
}

export default BookImage;