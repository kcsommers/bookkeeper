import axios from 'axios';
import { SecureStore } from 'expo';
import Environment from '../../../environment';

export default class AuthService {
  async _setJWToken(token) {
    return SecureStore.setItemAsync('bookkeeper_token', token, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED
    });
  }

  logUserIn(loginCreds) {
    const url = `${Environment.BASE_URL}/users/login`;
    return new Promise(async (resolve, reject) => {
      try {
        const loginResults = await axios.post(url, loginCreds);
        const { token, user, error } = loginResults.data;
        if (!error) {
          if (token) {
            this._setJWToken(token).then(() => {
              console.log('TOKEN SET');
              if (user) {
                resolve({ user });
              } else {
                reject(new Error('Error loggin in'));
              }
            }).catch((setTokenError) => {
              console.warn('ERROR SETTING TOKEN', setTokenError);
              reject(new Error(setTokenError));
            });
          }
        } else {
          console.warn('ERROR LOGGIN IN', error);
          reject(new Error(error));
        }
      } catch (loginError) {
        console.warn('AXIOS ERROR LOGGING IN', loginError);
        reject(new Error(loginError));
      }
    });
  }
}