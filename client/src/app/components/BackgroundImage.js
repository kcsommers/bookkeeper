import React from 'react';
import {
  ImageBackground,
} from 'react-native';

class BackgroundImage extends React.Component {
  render() {
    const source = (typeof this.props.image === 'string')
      ? { uri: this.props.image, cache: 'force-cache' } : this.props.image;
    return (
      <ImageBackground
        source={source}
        resizeMode="cover"
        style={[{
          width: '100%',
          height: '100%'
        }]}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default BackgroundImage;