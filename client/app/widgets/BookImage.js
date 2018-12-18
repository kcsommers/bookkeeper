import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 462,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5
  }
});

class BookImage extends React.Component {
  render() {
    return (
      <View>
        <Image
          style={styles.image}
          source={{ uri: this.props.source }}
          resizeMode="cover"
        />
      </View>
    );
  }
}

export default BookImage;