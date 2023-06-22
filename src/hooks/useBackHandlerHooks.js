import {BackHandler, Platform} from 'react-native';
import showErrorAlert from '../utils/Toast';

let currentCount = 0;
export const useDoubleBackPressExit = () => {
  if (Platform.OS === 'ios') {
    return;
  }
  const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
    if (currentCount === 1) {
      BackHandler.exitApp();
      subscription.remove();
      return true;
    }
    backPressHandler();
    return true;
  });
};

const backPressHandler = () => {
  if (currentCount < 1) {
    currentCount += 1;
    showErrorAlert('Press again to close!');
  }
  setTimeout(() => {
    currentCount = 0;
  }, 2000);
};
