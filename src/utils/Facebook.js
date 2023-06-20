import React from 'react';
import {Platform} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

export default function onFacebookLogin() {
  return new Promise((resolve, reject) => {
    LoginManager.logOut();
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      // 'user_birthday',
    ])
      .then(result => {
        console.log(result, 'FACEBOOK');
        if (result.isCancelled) {
          reject(result);
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            let accessToken = data.accessToken;

            const responseInfoCallback = (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'id, name,  first_name, last_name,email',
                  },
                },
              },
              responseInfoCallback,
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
