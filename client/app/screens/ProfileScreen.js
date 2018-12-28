import React from 'react';
import {
  StyleSheet,
  ScrollView,
  // View,
  Text,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ModelForm from '../components/forms/ModelForm';

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
        <ModelForm
          model="lists"
          modelData={{ userId: 1 }}
          submitTitle="Create List"
        />
        <KeyboardSpacer />
      </ScrollView>
    );
  }
}

export default ProfileScreen;