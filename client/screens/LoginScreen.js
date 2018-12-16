import axios from 'axios';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

class LoginScreen extends React.Component {
  async handleSubmit() {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=Moby Dick';
    try {
      const results = await axios.get(url);
      console.log('SEARCH RESULTS', results);
    } catch (err) {
      console.error('ERROR FINDING SEARCHRESULTS', err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login" onPress={() => { this.props.navigation.navigate('Home'); }} />

        <Button title="Search" onPress={() => { this.handleSubmit(); }} />
      </View>
    );
  }
}

export default LoginScreen;
