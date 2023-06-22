import 'react-native-gesture-handler';
import React, {useRef, useEffect, useState} from 'react';
import StackNavigator from './src/navigators/StackNavigator';
import {useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {getToken} from './src/redux/action/TokenAction';
import NetInfo from '@react-native-community/netinfo';
import {Icons} from './src/theme/theme';

export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getToken());
    }, 1500);
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected ? (
    <StackNavigator />
  ) : (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
      <Image
        source={Icons.no_internet}
        style={{
          height: 50,
          width: 50,
          tintColor: Colors.grey,
        }}
      />
      <Text style={{alignSelf: 'center', fontSize: 16, color: Colors.black}}>
        No internet connection
      </Text>
    </View>
  );
}
