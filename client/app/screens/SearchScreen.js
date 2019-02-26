import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
});

class SearchScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled={true}
          horizontal={true}
        />
      </View>
    );
  }
}

export default SearchScreen;