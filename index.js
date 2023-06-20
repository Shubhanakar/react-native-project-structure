/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './src/redux/store/index';
import {Provider} from 'react-redux';

LogBox.ignoreAllLogs();

function DryWall() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => DryWall);
