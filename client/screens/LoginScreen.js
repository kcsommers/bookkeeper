import React from 'react';
import {
  StyleSheet,
  View,
  Button
} from 'react-native'

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="Login" onPress={() => { this.props.navigation.navigate('Home') }} />
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

export default LoginScreen;