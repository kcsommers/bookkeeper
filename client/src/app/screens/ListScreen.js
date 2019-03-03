import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

class ListScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>List Screen</Text>
      </View>
    );
  }
}

export default ListScreen;