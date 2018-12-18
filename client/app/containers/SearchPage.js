import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import SearchInput from '../widgets/SearchInput';
import BackgroundImageFull from '../widgets/BackgroundImageFull';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    width: screenWidth,
    position: 'relative'
  }
});

class SearchPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchInput placeholder="Search Books By Title, Author or ISBN" />
        <BackgroundImageFull image={this.props.background} />
      </View>
    );
  }
}

export default SearchPage;