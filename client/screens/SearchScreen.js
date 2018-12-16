import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

class SearchScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Search Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

export default SearchScreen;