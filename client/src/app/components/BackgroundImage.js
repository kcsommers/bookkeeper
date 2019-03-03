import React from 'react';
import {
  ImageBackground,
} from 'react-native';

const styles = {
  full: {
    width: '100%',
    height: '100%'
  }
};

class BackgroundImage extends React.Component {
  render() {
    return (
      <ImageBackground
        source={this.props.image}
        style={[styles.full]}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default BackgroundImage;