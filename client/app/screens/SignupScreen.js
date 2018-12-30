import { SecureStore } from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ModelForm from '../components/forms/ModelForm';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#71a7a9'
  },
});

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._setToken = this._setToken.bind(this);
  }

  async _setToken(token) {
    return SecureStore.setItemAsync('token', token, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED
    });
  }

  _handleSubmit(token) {
    if (!token.error) {
      this._setToken(token.token).then(() => {
        console.log('TOKEN SET');
        this.props.navigation.navigate('HomeStack');
      }).catch((error) => {
        console.log('ERROR SETTING TOKEN', error);
      });
    } else {
      console.log('ERROR HANDLING SUBMIT', token.error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ModelForm
          model="user"
          submitTitle="Sign up"
          modelData={{ userId: 1 }}
          onSubmit={this._handleSubmit}
        />
      </View>
    );
  }
}

export default SignupScreen;
