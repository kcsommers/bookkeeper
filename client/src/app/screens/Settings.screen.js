import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import ImagePickerComponent from '../components/ImagePicker.component';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImagePickerComponent />
      </View>
    );
  }
}

export default SettingsScreen;