import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

class IntroScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 2000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bookkeeper</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#71a7a9'
  },
  title: {
    fontFamily: 'Pacifico',
    color: '#fff',
    fontSize: 40
  }
});

export default IntroScreen;