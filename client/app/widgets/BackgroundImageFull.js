import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageStyles: {
    width: '100%',
    height: '100%'
  }
});

class BackgroundImageFull extends React.Component {
  render() {
    return (
      <ImageBackground
        source={this.props.image}
        style={styles.imageStyles}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default BackgroundImageFull;