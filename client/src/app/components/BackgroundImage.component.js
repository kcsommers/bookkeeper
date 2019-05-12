import React from 'react';
import {
  ImageBackground
} from 'react-native';

class BackgroundImage extends React.Component {
  render() {
    const source = (typeof this.props.image === 'string')
      ? { uri: this.props.image, cache: 'force-cache' } : this.props.image;
    const position = this.props.children ? 'relative' : 'absolute';
    return (
      <ImageBackground
        source={source}
        resizeMode="cover"
        style={[{
          maxHeight: this.props.height || '100%',
          width: '100%',
          flex: 1,
          position,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }]}
      >
        {this.props.children ? this.props.children : null}
      </ImageBackground>
    );
  }
}

export default BackgroundImage;