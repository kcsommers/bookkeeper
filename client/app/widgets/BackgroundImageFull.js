import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageStyles: {
    position: 'absolute',
    zIndex: -1000
  }
});

class BackgroundImageFull extends React.Component {
  render() {
    return (
      <Image
        source={this.props.image}
        style={styles.imageStyles}
        height="100%"
        width="100%"
      />
    );
  }
}

export default BackgroundImageFull;