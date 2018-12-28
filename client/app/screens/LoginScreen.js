import axios from 'axios';
import React from 'react';
import { SecureStore } from 'expo';
import {
  TouchableOpacity, Button, StyleSheet, View, Text
} from 'react-native';
import Input from '../widgets/Input';
import Environment from '../../environment';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#71a7a9',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loginFormContainer: {
    alignSelf: 'stretch',
    paddingLeft: 50,
    paddingRight: 50
  },
  submitBtn: {
    backgroundColor: '#a9c5e8',
    alignSelf: 'stretch',
    padding: 10,
    alignItems: 'center'
  },
  submitBtnText: {
    // color: '#fefefe',
  }
});

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  // async handleSubmit() {
  //   const url = 'https://www.googleapis.com/books/v1/volumes?q=Moby Dick';
  //   try {
  //     const results = await axios.get(url);
  //     console.log('SEARCH RESULTS', results);
  //   } catch (err) {
  //     console.error('ERROR FINDING SEARCHRESULTS', err);
  //   }
  // }

  async _setToken(token) {
    console.log('SETTING TOKEN', token);
    return SecureStore.setItemAsync('token', token, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED
    });
  }

  async _handleSubmit() {
    const url = `${Environment.BASE_URL}/users/login`;
    const { username, password } = this.state;
    try {
      const loginResults = await axios.post(url, { username, password });
      if (loginResults.data.token) {
        this._setToken(loginResults.data.token).then(() => {
          console.log('TOKEN SET');
          this.props.navigation.navigate('HomeStack');
        }).catch((error) => {
          console.log('ERROR SETTING TOKEN', error);
        });
      } else {
        console.log('ERROR LOGGING IN', loginResults.data.error);
      }
    } catch (error) {
      console.warn('ERROR LOGGING IN');
    }
  }

  _handleChange(value, field) {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={{ fontFamily: 'Pacifico', fontSize: 24 }}>Bookkkeeper</Text>
        </View>

        <View style={styles.loginFormContainer}>
          <Input
            field="username"
            placeholder="Username"
            handleChange={($value, field) => { this._handleChange($value, field); }}
            isPassword={false}
            isEmail={false}
            keyboardType="default"
            textContentType="username"
          />

          <Input
            field="password"
            placeholder="Password"
            handleChange={($value, field) => { this._handleChange($value, field); }}
            isPassword={true}
            isEmail={false}
            keyboardType="default"
            textContentType="password"
          />

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={this._handleSubmit}
          >
            <Text style={styles.submitBtnText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text>{'Don\'t have an account?'}</Text>
          <Button
            title="Sign up"
            onPress={() => { this.props.navigation.navigate('Signup'); }}
          />
        </View>

      </View>
    );
  }
}

export default LoginScreen;
