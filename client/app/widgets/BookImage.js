import React from 'react';
import {
  Image
} from 'react-native';

import { AppStyling } from '../../assets/styles/appStyles';

const appStyles = new AppStyling().getAppStyles();

class BookImage extends React.Component {
  render() {
    return (
      <Image
        style={[appStyles.boxShadow,
          {
            borderWidth: 2,
            borderColor: '#fff',
            borderRadius: 5,
            width: this.props.width,
            height: this.props.height
          }]}
        source={{ uri: this.props.source, cache: 'force-cache' }}
        resizeMode="cover"
      />
    );
  }
}

export default BookImage;