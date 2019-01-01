import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

import { SCREEN_HEIGHT } from '../../assets/styles/appStyles';

const styles = {
  large: StyleSheet.create({
    image: {
      width: (SCREEN_HEIGHT * 0.5) * 0.649,
      height: (SCREEN_HEIGHT * 0.5),
    }
  })
};

class BookImage extends React.Component {
  render() {
    return (
      <View>
        <Image
          style={[styles[this.props.size].image, {
            borderWidth: 2,
            borderColor: '#fff',
            borderRadius: 5
          }]}
          source={{ uri: this.props.source, cache: 'force-cache' }}
          resizeMode="cover"
        />
      </View>
    );
  }
}

export default BookImage;