import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, Image, Platform} from 'react-native';
import {Colors, Icons, Fonts} from '../../theme/theme';
import normalize from '../../utils/Dimen';
import MyStatusBar from '../../utils/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {socialData} from '../../redux/action/AuthAction';
import Status from '../../utils/Status';
import {AUTH} from '../../redux/store/TypeConstants';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import onFacebookLogin from '../../utils/Facebook';

export default function Signup(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  //useEffect for initiate Google signin configure//

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '260309571072-c5dvt4rugamckltjprknon2t8400iq5v.apps.googleusercontent.com',
      // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId:
        '260309571072-8rrlfk4a6f1vh9gd6tnjiuvt95ff5v05.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)

      androidClientId:
        '260309571072-d96jjhniveg63ps8ikfsk98a3vptpv2n.apps.googleusercontent.com',
    });
  }, []);

  //Making an API request from facebook API then make a server request with facebook API response//
  const getUserDatafromFacebook = () => {
    onFacebookLogin()
      .then(res => {
        console.log(res);

        let obj = res;
        obj.provider = 'Facebook';

        dispatch(socialData(obj));
      })
      .catch(err => {
        console.log(err);
      });
  };

  //Making an API request from google API then make a server request with google API response//
  const getUserDatafromGoogle = () => {
    // const userResp = GoogleLogin();
    // let obj = userResp;
    // obj.provider = 'Google';
    // dispatch(socialData(obj));
    props.navigation.navigate('CreateAccount');
  };

  //function used for after successful login signing out from the google account login//
  const signOutGoogle = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };
  //Checking status of API response SUCCESS and FAILURE//
  Status(
    AuthReducer.status,
    AUTH.SOCIAL_DATA_REQUEST.type,
    () => {
      if (AuthReducer?.socialData) {
        signOutGoogle();
        props.navigation.navigate('CreateAccount');
      }
    },
    () => {},
  );

  return (
    <View style={{flex: 1}}>
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />
      <View
        style={{
          backgroundColor: Colors.primaryColor,
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: normalize(36),
            color: Colors.white,
            textAlign: 'center',

            fontFamily: Fonts.DMSans_Bold,
          }}>
          Sign Up
        </Text>
        <Text
          style={{
            fontSize: normalize(12),
            color: Colors.secondaryTextColor,
            textAlign: 'center',
            marginTop: normalize(40),
            fontFamily: Fonts.DMSans_Regular,
          }}>
          {'Please tap below to choose a social\nmedia to sign up with'}
        </Text>

        <View style={{marginTop: normalize(20)}}>
          <TouchableOpacity
            onPress={getUserDatafromGoogle}
            style={{
              height: normalize(40),
              width: '70%',
              backgroundColor: Colors.buttonColor,
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: normalize(20),
              marginTop: normalize(20),
            }}>
            <Image
              resizeMode="contain"
              source={Icons.google}
              style={{
                height: normalize(35),
                width: normalize(35),
              }}
            />
            <Text
              style={{
                marginLeft: normalize(5),
                fontFamily: Fonts.DMSans_Regular,
                color: Colors.black,
              }}>
              Sign up with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => getUserDatafromFacebook()}
            style={{
              height: normalize(40),
              width: '70%',
              backgroundColor: Colors.buttonColor,
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: normalize(20),
              marginTop: normalize(20),
            }}>
            <Image
              resizeMode="contain"
              source={Icons.facebook}
              style={{height: normalize(35), width: normalize(35)}}
            />
            <Text
              style={{
                fontFamily: Fonts.DMSans_Regular,
                color: Colors.black,
              }}>
              Sign up with Facebook
            </Text>
          </TouchableOpacity>
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={{
                height: normalize(40),
                width: '70%',
                backgroundColor: Colors.buttonColor,
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: normalize(20),
                marginTop: normalize(20),
              }}>
              <Image
                resizeMode="contain"
                source={Icons.apple}
                style={{height: normalize(20), width: normalize(20)}}
              />
              <Text
                style={{
                  marginLeft: normalize(10),
                  fontFamily: Fonts.DMSans_Regular,
                  color: Colors.black,
                }}>
                Sign up with Apple
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
