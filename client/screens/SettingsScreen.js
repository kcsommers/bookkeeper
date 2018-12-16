import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings Screen</Text>
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

export default SettingsScreen;