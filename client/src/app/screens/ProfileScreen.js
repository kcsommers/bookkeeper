import React from 'react';
import {
  StyleSheet,
  ScrollView,
  // View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class ProfileScreen extends React.Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <Text>Profile Screen</Text>
      </ScrollView>
    );
  }
}

export default ProfileScreen;