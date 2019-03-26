import axios from 'axios';
import { SecureStore } from 'expo';
import Environment from '../../../environment';

export const AuthService = {
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
                resolve(user);
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
  },

  async getVerifiedToken() {
    return SecureStore.getItemAsync('bookkeeper_token').then((token) => {
      if (token) {
        return this._verifyToken(token);
      }
      return { isVerified: false, user: null };
    }).catch((error) => {
      console.error('ERROR GETTING TOKEN FROM STORAGE', error);
    });
  },

  async _setJWToken(token) {
    return SecureStore.setItemAsync('bookkeeper_token', token, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED
    });
  },

  async _verifyToken(token) {
    const url = `${Environment.BASE_URL}/users/verify`;
    const verify = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (verify.data.verified) {
      return { isVerified: true, user: verify.data.user };
    }
    return { isVerified: false, error: verify.data.error };
  }
};

// export default class AuthService {
//   logUserIn(loginCreds) {
//     const url = `${Environment.BASE_URL}/users/login`;
//     return new Promise(async (resolve, reject) => {
//       try {
//         const loginResults = await axios.post(url, loginCreds);
//         const { token, user, error } = loginResults.data;
//         if (!error) {
//           if (token) {
//             this._setJWToken(token).then(() => {
//               console.log('TOKEN SET');
//               if (user) {
//                 resolve({ user });
//               } else {
//                 reject(new Error('Error loggin in'));
//               }
//             }).catch((setTokenError) => {
//               console.warn('ERROR SETTING TOKEN', setTokenError);
//               reject(new Error(setTokenError));
//             });
//           }
//         } else {
//           console.warn('ERROR LOGGIN IN', error);
//           reject(new Error(error));
//         }
//       } catch (loginError) {
//         console.warn('AXIOS ERROR LOGGING IN', loginError);
//         reject(new Error(loginError));
//       }
//     });
//   }

//   async getJWToken() {
//     return SecureStore.getItemAsync('bookkeeper_token');
//   }

//   async getJWTokden() {
//     return SecureStore.getItemAsync('bookkeeper_token').then((token) => {
//       if (token) {
//         console.log('TOKEN', token);
//         this.verifyToken(token).then((result) => {
//           if (result.isVerified) {
//             initializeStore(result.user);
//             // this.setState({ loggedIn: true });
//             this.navigator.dispatch(NavigationActions.navigate({ routeName: 'App' }));
//           }
//         });
//       }
//     }).catch((error) => {
//       console.log('ERROR GETTING TOKEN', error);
//     });
//   }

//   async _setJWToken(token) {
//     return SecureStore.setItemAsync('bookkeeper_token', token, {
//       keychainAccessible: SecureStore.WHEN_UNLOCKED
//     });
//   }

//   async _verifyToken(token) {
//     const url = `${Environment.BASE_URL}/users/verify`;
//     const verify = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     if (verify.data.verified) {
//       return { isVerified: true, user: verify.data.user };
//     }
//     return { isVerified: false, error: verify.data.error };
//   }
// }