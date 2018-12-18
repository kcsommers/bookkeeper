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

class EditProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Edit Profile Screen</Text>
      </View>
    );
  }
}

export default EditProfileScreen;