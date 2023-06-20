import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
export default async function GoogleLogin() {
  try {
    const userInfo = await GoogleSignin.signIn();

    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('sign in cancelled');
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('sign in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('play service not available');
      // play services not available or outdated
    } else {
      console.log('unknown error', error.code);
      alert('Error Code ' + error.code);
    }
  }
}
